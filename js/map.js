//var query_geocoder = 0;
//var query_tracker = 0;

function formatDate(date) {

   var dd = date.getDate();
   if (dd < 10) dd = '0' + dd;

   var mm = date.getMonth() + 1;
   if (mm < 10) mm = '0' + mm;

   var yy = date.getFullYear() % 100;
   if (yy < 10) yy = '0' + yy;

   return dd + '-' + mm + '-' + yy;
}

//increment_query ('track')
//increment_query ('geo')
// Инкрементатор счётчика запросов к яндексу для ведения статистики
function increment_query(type) {
   var file_name = formatDate(new Date);
   $.ajax({
      type: "POST",
      url: "/comp_map/storage/increment_query.php",
      data: "type=" + type,
      success: function (data) {
         //console.log (data);
      }
   });
}

//функция униканилизации массива (удаление дубликатов)
function unique(arr) {
   var result = [];

   nextInput:
   for (var i = 0; i < arr.length; i++) {
      var str = arr[i]; // для каждого элемента
      for (var j = 0; j < result.length; j++) { // ищем, был ли он уже?
         if (result[j] == str) continue nextInput; // если да, то следующий
      }
      result.push(str);
   }

   return result;
}

//минимальное значение в массиве и его индекс:
function getMin(arr) {
   var arrLen = arr.length,
      index = 0;
   minEl = arr[0];
   for (var i = 0; i < arrLen; i++) {
      if (minEl > arr[i]) {
         minEl = arr[i];
         index = i;
      }
   }
   return { value: minEl, index: index };
}

//максимальное значение в массиве и его индекс:
function getMax(arr) {
   var arrLen = arr.length,
      index = 0;
   maxEl = arr[0];
   for (var i = 0; i < arrLen; i++) {
      if (maxEl < arr[i]) {
         maxEl = arr[i];
         index = i;
      }
   }
   return { value: maxEl, index: index };
}

/*
 * функция поиска точки пересечения отрезков:
 * координаты первого: ([x1,y1], [x2,y2])
 * координаты второго: ([x3,y3], [x4,y4])
 * функция возвращает объект {x,y} с координатами точки пересечения, либо false, если отрезки не пересекаются
 */

function getPointOfIntersection(x1, x2, x3, x4, y1, y2, y3, y4) {
   var d = parseFloat((x1 - x2) * (y4 - y3) - (y1 - y2) * (x4 - x3));
   var da = parseFloat((x1 - x3) * (y4 - y3) - (y1 - y3) * (x4 - x3));
   var db = parseFloat((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3));

   var ta = parseFloat(da / d);
   var tb = parseFloat(db / d);

   if ((ta >= 0) && (ta <= 1) && (tb >= 0) && (tb <= 1)) {
      var dx = parseFloat(x1 + ta * (x2 - x1));
      var dy = parseFloat(y1 + ta * (y2 - y1));

      return { x: dx, y: dy };
   } else {
      return false;
   }
}

//** предыдущий адрес залить на бой**/
function setPrevAdres(el) {
   address = $(el).text().trim();
   $('.ymap-search').val(address);
   $('.ymap-search-submit').click();
}

//** ---предыдущий адрес залить на бой**/

// необходимые для работы скрипта глобальные переменные
var myMap, myPointsColection, myGeoObjectsCollection, myLinesCollection;

/*
 * функция отображения карты зон доставок:
 * -map_type - идентификатор карты (например, delivery_spb)
 * -map_id - ID html элемента, где будет отображаться карта
 * -address_id - ID input элемента, где будет отображаться точный адрес
 * -delivery_zone_id - ID input элемента, где будет отображаться зона доставки
 */
function viewDeliveryMap(map_type, map_id, address_id, delivery_zone_id, nearest_lenght) {
   //var map_type = 'all_spb_zone';
   var map_type = 2;
   //получаем json представление карты:
   $.ajax({
      type: "POST",
      url: pathComponent + "/get_map.php",
      data: {
         map_id: map_type
      }, // delivery_spb - идентификатор карты
      dataType: 'json',
      success: function (data) {
         show_map(data, 'sem_order_maps', address_id, 'delivery_zone_id', nearest_lenght, map_type);
      }
   });
}

function show_map(data, map_id, address_id, delivery_zone_id, nearest_lenght, map_type) {
   ymaps.ready(function () {

      // Создание экземпляра карты и его привязка к контейнеру с id = map_id
      var center = data[0].map.center;
      var zoom = data[0].map.zoom;

      myMap = new ymaps.Map(map_id, {
         center: center,
         zoom: zoom,
         behaviors: ["default"]
      });

      //добавим полосу масштаба и пр.
      //myMap.controls.add('scaleLine').add('zoomControl');

      // Создание коллекций геообъектов
      //в этой коллекции хранятся точки на карте
      myPointsCollection = new ymaps.GeoObjectCollection();
      /*РОУТИНГ маршрута new!*/
      //myLinesCollection - коллекция, содержащая линии маршрута от точки вне областей доставки, до ближайшей области доставки
      myLinesCollection = new ymaps.GeoObjectCollection();
      /*--РОУТИНГ маршрута new!*/
      //в этой коллекции хранятся зоны доставки (полигоны)
      myGeoObjectsCollection = new ymaps.GeoObjectCollection();

      /*
       * добавим в коллекция myGeoObjectsCollection полигоны из массива data
       */
      for (var k = 0; k < data[0].delivery_areas.length; k++) {
         var areaCoord = data[0].delivery_areas[k].area_coordinates;
         var areaColor = data[0].delivery_areas[k].settings.color;
         var areaTitle = data[0].delivery_areas[k].settings.title;
         var polygonCode = data[0].delivery_areas[k].settings.polygonCode;
         /*
          myGeoObjectsCollection.add(new ymaps.Polygon(areaCoord,
          {pointColor: areaColor, deliveryZone: areaTitle, hintContent: areaTitle}, {fillColor: areaColor, opacity: 0.5}));
          */

         // добавление без раскраски (просто сделаем высокую прозрачность):
         myGeoObjectsCollection.add(new ymaps.Polygon(areaCoord, {
            pointColor: areaColor,
            deliveryZone: areaTitle,
            polygonCode: polygonCode
         }, { fillColor: areaColor, opacity: 0.5 }));
      }
      // Устанавливаем опции всем геообъектам в коллекции прямо через коллекцию
      myGeoObjectsCollection.options
         .set({
            draggable: false,
            inderactive: 'none'
         });

      // Добавление коллекций геообъектов на карту
      myMap.geoObjects
         .add(myGeoObjectsCollection)
         .add(myPointsCollection)
         /*РОУТИНГ маршрута new!*/
         .add(myLinesCollection);
      /*РОУТИНГ маршрута new!*/

      //searchZoneIsAddress('Санкт-Петербург, Моховая 27');
      //
      function searchZoneIsAddress($addressLine) {
         myMap.behaviors.enable('scrollZoom');
         var myGeocoder = ymaps.geocode($addressLine, { results: 20 });

         myGeocoder.then(
            function (res) {
               //increment_query('geo');
               res.geoObjects.each(function (obj) {
                  //var Coordinates = obj.geometry.getCoordinates()[0]+','+obj.geometry.getCoordinates()[1];
                  set_delivery_area_point([
                     obj.geometry.getCoordinates()[0],
                     obj.geometry.getCoordinates()[1]
                  ]);
               });
            });
      }

      // функция отображения точки внутри зоны доставки
      function set_delivery_area_point(coord) {
         //обратное геокодирование:
         var myReverseGeocoder = ymaps.geocode(coord);
         myReverseGeocoder.then(
            function (res) {
               var names = [];

               //страна, город, улица, дом, полный адрес
               var country, city, street, house, address, district, region, area;

               district = '';

               var is_write_locality = false;
               var is_write_street = false;
               var is_write_region = false;

               //в res хранится текстовое представление адреса той точки, которую кликнули. добавим каждый фрагмент адреса в массив:
               res.geoObjects.each(function (obj) {

                  names.push(obj.properties.get('name'));

                  //запишем страну, город, улицу и дом:

                  // ############################ Измененный код от 12.08.2019 ################################
                  if (obj.properties.get('metaDataProperty').GeocoderMetaData.kind == 'country') {
                     country = obj.properties.get('name');
                  } else {
                     country = 'Россия';
                  }
                  // ###########################################################################################

                  // region
                  if (obj.properties.get('metaDataProperty').GeocoderMetaData.kind == 'province') {
                     if (is_write_region === false) {
                        region = obj.properties.get('name');
                        is_write_region = true;
                     }
                  }

                  if (obj.properties.get('metaDataProperty').GeocoderMetaData.kind == 'locality') {
                     if (is_write_locality === false) {
                        city = obj.properties.get('name');
                        is_write_locality = true;
                     }
                  }
                  if (obj.properties.get('metaDataProperty').GeocoderMetaData.kind == 'street') {
                     if (is_write_street === false) {
                        street = obj.properties.get('name');
                        is_write_street = true;
                     }
                  }
                  if (obj.properties.get('metaDataProperty').GeocoderMetaData.kind == 'house') {
                     house = obj.properties.get('name');
                  }
                  if (obj.properties.get('metaDataProperty').GeocoderMetaData.kind == 'district') {
                     if (district !== undefined && district !== '') {
                        district = district + '|' + obj.properties.get('name');
                     } else {
                        district = obj.properties.get('name');
                     }
                  }

                  // ############################ Измененный код от 12.08.2019 ################################
                  if (obj.properties.get('metaDataProperty').GeocoderMetaData.kind == 'area') {
                     area = obj.properties.get('name');
                  }
                  // ##########################################################################################

               });

               //####################################################################################################
               names = names.reverse();
               names = unique(names);
               address = country + ", " + city + ", " + street + ', ' + house + ", " + district;

               //при клике по зоне доставки удалим все точки и маршруты из соответствующих коллекций:
               myPointsCollection.removeAll();
               myLinesCollection.removeAll();

               //добавим точку на карту в те координаты, по которым кликнули:
               myPointsCollection.add(new ymaps.Placemark(coord, {
                  iconContent: names[names.length - 1],
                  balloonContent: address
               }));

               //Проверяем попадание в область геометрии геообъектов из коллекции myGeoObjectsCollection всех точек из коллекции myPointsCollection
               //(в данном случае точка из myPointsCollection - одна - та, на которую кликнули)

               var cppc = 0;
               myGeoObjectsCollection.each(function (object) {
                  myPointsCollection.each(function (point) {
                     //если точка попадает в какую-либо область доставки, нарисуем её и
                     // отобразим данные по адресу и области доставки
                     if (object.geometry.contains(point.geometry.getCoordinates())) {

                        if (cppc == 0) {
                           point.options.set({ preset: 'twirl#blackStretchyIcon' });
                           $("#delivery_zone_id").val(object.properties.get('polygonCode'));
                           $("#zone_delivery_text").val(object.properties.get('deliveryZone'));
                           cppc++;
                        }
                        //console.log(point.geometry.getCoordinates());
                     }
                  });
               });
            },
            function (err) {
               //console.log('Ошибка');
            }
         );

      }

      // функция отображения точки вне зоны доставки
      function set_point(coord) {

         //обратное геокодирование:
         var myReverseGeocoder = ymaps.geocode(coord);
         myReverseGeocoder.then(
            function (res) {

               //query_geocoder++;
               //console.log ('query geocoder count is '+query_geocoder);
               // increment_query('geo');

               var names = [];
               //страна, город, улица, дом, полный адрес
               var country, city, street, house, address, district, region;

               district = '';

               var is_write_locality = false;
               var is_write_street = false;
               var is_write_region = false;

               //console.log (res.geoObjects.get(0));

               res.geoObjects.each(function (obj) {
                  names.push(obj.properties.get('name'));

                  //запишем страну, город, улицу и дом:
                  if (obj.properties.get('metaDataProperty').GeocoderMetaData.kind == 'country') {
                     country = obj.properties.get('name');
                  }

                  //region
                  if (obj.properties.get('metaDataProperty').GeocoderMetaData.kind == 'province') {
                     if (is_write_region === false) {
                        region = obj.properties.get('name');
                        is_write_region = true;
                     }
                  }

                  if (obj.properties.get('metaDataProperty').GeocoderMetaData.kind == 'locality') {
                     if (is_write_locality === false) {
                        city = obj.properties.get('name');
                        is_write_locality = true;
                     }
                  }
                  if (obj.properties.get('metaDataProperty').GeocoderMetaData.kind == 'street') {
                     if (is_write_street === false) {
                        street = obj.properties.get('name');
                        is_write_street = true;
                     }
                  }
                  if (obj.properties.get('metaDataProperty').GeocoderMetaData.kind == 'house') {
                     house = obj.properties.get('name');
                  }
                  if (obj.properties.get('metaDataProperty').GeocoderMetaData.kind == 'district') {
                     if (district !== undefined && district !== '') {
                        district = district + '|' + obj.properties.get('name');
                     } else {
                        district = obj.properties.get('name');
                     }
                  }
               });

               // #################################### Измененный код от 12.08.2019 ##################################
               names = names.reverse();
               names = unique(names);
               address = country + ", " + city + ", " + street + ', ' + house + ", " + district;
               // ###################################################################################################


               myPointsCollection.removeAll();
               /*РОУТИНГ маршрута new!*/
               myLinesCollection.removeAll();
               /*--РОУТИНГ маршрута new!*/
               myPointsCollection.add(new ymaps.Placemark(coord, {
                  iconContent: names[names.length - 1],
                  balloonContent: address
               }));

               var index;

               //добавим preset для точки, на которую кликнули, отобразим адрес и укажем, что кликнули на точку вне областей доставки:
               myPointsCollection.each(function (point) {
                  point.options.set('preset', 'twirl#blackStretchyIcon');
                  /*
                   $('#'+address_id).val(address);
                   $('#'+delivery_zone_id).val('Не отмеченная на карте зона доставки');
                   */
                  $('#city_text').val(city);
                  $('#street_text').val(street);
                  if (house !== undefined) {
                     var house_input = house.split(', ');
                     $('#house_text').val(house_input[1]);
                  } else {
                     $('#house_text').val();
                  }
                  $('#zone_delivery_text').val('');
                  $('#' + delivery_zone_id).val('');
                  $('#district').val(district);
               });

               /*--РОУТИНГ маршрута new!*/
               //ищем расстояние до ближайшего полигона:
               //nearest_points - массив ближайших до полигонов точек:
               var nearest_points = [];
               //nearest_points_lenghts - массив длин отрезков от точки, куда кликнули, до ближайших точек на полигонах:
               var nearest_points_lenghts = [];
               //перебираем все полигоны и заполняем массив ближайших до полигонов точек:
               myGeoObjectsCollection.each(function (object) {
                  nearest_points.push(object.geometry.getClosest(coord));
               });
               //теперь заполняем массив длин отрезков от точки, куда кликнули, до ближайших точек на полигонах
               for (var i = 0; i < nearest_points.length; i++) {
                  nearest_points_lenghts.push(nearest_points[i].distance);
               }
               //ищем индекс того полигона, расстояние до которого минимально:
               var ourAreaIndex = getMin(nearest_points_lenghts).index;

               //найдём геометрический центр этого полигона:
               //index - это просто счётчик перебора гео объектов из коллекции myGeoObjectsCollection
               var index = 0;
               //сюда запишем координаты геометрического центра ближайшего полигона:
               var center = [];
               /*
                * перебираем гео объекты из коллекции myGeoObjectsCollection и ищем тот, расстояние до которого минимально:
                * ourAreaIndex = center
                */
               myGeoObjectsCollection.each(function (object) {
                  if (ourAreaIndex == index) {
                     //получаем координаты вершин полигона
                     var object_coordinates = object.geometry.getCoordinates();
                     //массив координат x и y всех вершин полигона:
                     var x = [];
                     var y = [];
                     //заполним их:
                     for (var i = 0; i < object_coordinates.length; i++) {
                        for (var j = 0; j < object_coordinates[i].length; j++) {
                           x.push(object_coordinates[i][j][0]);
                           y.push(object_coordinates[i][j][1]);
                        }
                     }
                     //заполним координаты центра полигона:
                     center.push(getMin(x).value + (getMax(x).value - getMin(x).value) / 2);
                     center.push(getMin(y).value + (getMax(y).value - getMin(y).value) / 2);
                     //console.log (center);
                  }
                  index++;
               });


               //составляем маршрут между центром полигона и кликом
               ymaps.route([
                  center,	//центр полигона
                  coord   //координаты точки, куда кликнули
               ]).then(function (route) {

                  //query_tracker++;
                  //console.log ('query tracking count is '+query_tracker);
                  //increment_query('track');

                  //составляем коллекцию сегментов пути
                  var pathsObjects = route.getPaths(),
                     //координаты линий-отрезков:
                     edges = [],
                     //координаты линий искомого маршрута:
                     required_edges = [];

                  //переберём сегменты, разобьём их на отрезки-линии и заполним массив координат линий-отрезков:
                  pathsObjects.each(function (path) {
                     var coordinates = path.geometry.getCoordinates();
                     for (var i = 1, l = coordinates.length; i < l; i++) {
                        edges.push([coordinates[i], coordinates[i - 1]]);
                     }
                  });

                  /*
                   * проверяем каждую линию-отрезок на принадлежность к нашему полигону:
                   */
                  var index = 0;
                  //инветрируем массив, чтобы отрисовка начиналась с той точки, в которую кликнули:
                  edges.reverse();
                  // будем работать с тем полигоном, расстояние до которого минимально: ourAreaIndex==index
                  myGeoObjectsCollection.each(function (object) {
                     if (ourAreaIndex == index) {
                        //переменная, сообщающая нам о том, что при переборе edges мы столкнулис с такой линией, которая лежит/частично лежит внутри полигона
                        var stop = false;
                        //перебираем все линии edges, находим те, которые лежат внутри полигона и те, которые не лежат:
                        for (var i = 0; i < edges.length; i++) {
                           //если линии пока лежат внутри полигона:
                           if (stop == false) {
                              //если левая и правая точка - ВНЕ полигона - добавим эту линию в искомый массив линий (required_edges)
                              if ((object.geometry.contains(edges[i][0]) != true) && (object.geometry.contains(edges[i][1]) != true)) {
                                 required_edges.push(edges[i]);
                              } else {
                                 /*
                                  * опа! мы столкнулись с линией, которая пересекает наш полигон!
                                  * теперь нам нужно найти точку пересечения этой линии с полигоном!
                                  */
                                 //укажем, что дальнейший перебор не будет добавлять в required_edges данные
                                 stop = true;
                                 /*
                                  * перебираем все рёбра object-a (полигона) и проверяем, пересекает ли ребро нашу линию edges[i]
                                  */
                                 //берём внешний контур:
                                 var coordinates = object.geometry.getCoordinates()[0];
                                 for (var j = 0; j < coordinates.length - 1; j++) {
                                    var point = getPointOfIntersection(edges[i][0][0], edges[i][1][0], coordinates[j][0], coordinates[j + 1][0], edges[i][0][1], edges[i][1][1], coordinates[j][1], coordinates[j + 1][1]);
                                    /*
                                     * как только нашли ребро, пересекающее нашу линию edges[i], добавим в искомый массив required_edges отрезок
                                     * [edges[i][0], координаты точки пересечения]
                                     */
                                    if (point) {
                                       required_edges.push([edges[i][0], [point.x, point.y]]);
                                    }
                                 }

                              }
                           } else {

                           }
                        }
                     }
                     index++;
                  });

                  //посчитаем суммарную длину каждого искомого отрезка (в метрах)
                  var distance = 0;
                  for (var i = 0; i < required_edges.length; i++) {
                     distance = distance + ymaps.coordSystem.geo.getDistance(required_edges[i][0], required_edges[i][1]);
                  }

                  //нарисуем искомую линию маршрута от точки куда кликнули, до полигона
                  /*
                   for (var i = 0; i < required_edges.length; i++) {
                   myLinesCollection.add(new ymaps.Polyline(required_edges[i], {}, {strokeWidth: 4}));
                   }
                   */

                  //на точке пересечения полигона и маршрута укажем дистанцию:
                  //myPointsCollection.add(new ymaps.Placemark(required_edges[required_edges.length-1][1], {iconContent: Math.round(distance)+' метров'}, {preset: 'twirl#blackStretchyIcon'}));

                  //добавляем в input с id = nearest_lenght расстояние:
               });
               /*--РОУТИНГ маршрута new!*/
            },
            function (err) {
               //console.log('Ошибка');
            }
         );
      }

      //добавляем обработку клика вне полигонов
      myMap.events.add('click', function (e) {
         myMap.behaviors.enable('scrollZoom');
         set_point(e.get('coords'));
      });

      //добавляем обработку клика на всех полигонах карты
      myGeoObjectsCollection.each(function (object) {
         object.events.add('click', function (e) {
            myMap.behaviors.enable('scrollZoom');

            set_delivery_area_point(e.get('coords'));
         });
      });

      var $container = $(document.getElementById('address_multiple_fields'));
      var $city = $container.find('[name="city"]');
      var $street = $container.find('[name="street"]');
      var $house = $container.find('[name="house"]');
      $()
         .add($city)
         .add($street)
         .add($house)
         .fias({
            parentInput: $container,
            verify: true,
            select: function (obj) {

               setLabel($(this), obj.type);

               if ($("input[name='street']").val() != '') {
                  searchZoneIsAddress($("input[name='city']").val() + ', ' + $("input[name='street']").val());
               }

               // добавим тег куда передаем индекс
               if ($("#address_multiple_fields").find("input[name='zip']").length == 0) {
                  $("#address_multiple_fields").append('<input type="hidden" name="zip" value="' + obj.zip + '">');
               } else {
                  $("#address_multiple_fields input[name='zip']").val(obj.zip);
               }
            },
            check: function (obj) {
               var $input = $(this);
               if (obj) {
                  setLabel($input, obj.type);
                  $tooltip.hide();
               } else {
                  showError($input, 'Ошибка');
               }
            },
            checkBefore: function () {
               var $input = $(this);

               if (!$.trim($input.val())) {
                  return false;
               }
            }
         });
      $city.fias('type', $.fias.type.city);
      $street.fias('type', $.fias.type.street);
      $house.fias('type', $.fias.type.building);
      $city.fias('withParents', true);
      $street.fias('withParents', true);
      $house.fias('verify', false);

      function setLabel($input, text) {
         text = text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
         $input.parent().find('label').text(text);
      }

      function showError($input, message) {
         $tooltip.find('span').text(message);
         var inputOffset = $input.offset(),
            inputWidth = $input.outerWidth(),
            inputHeight = $input.outerHeight();
         var tooltipHeight = $tooltip.outerHeight();
         var tooltipWidth = $tooltip.outerWidth();
         $tooltip.css({
            left: (inputOffset.left + inputWidth - tooltipWidth) + 'px',
            top: (inputOffset.top + (inputHeight - tooltipHeight) / 2 - 1) + 'px'
         });
         $tooltip.fadeIn();
      }
   });
}

$(document).ready(function () {
   viewDeliveryMap();
});