/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isWebp": () => (/* binding */ isWebp)
/* harmony export */ });
// проверка поддержки webp, добавление класса webp или no-webp
function isWebp() {
   //проверка поддержки webp
   function testWebP(callback) {

      var webP = new Image();
      webP.onload = webP.onerror = function () {
         callback(webP.height == 2);
      };
      webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
   }

   //добавление класса
   testWebP(function (support) {
      if (support == true) {
         document.querySelector('body').classList.add('webp');
      } else {
         document.querySelector('body').classList.add('no-webp');
      }
   });
}

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_functions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


_modules_functions_js__WEBPACK_IMPORTED_MODULE_0__.isWebp();

// Функция для добавления и удаления классов
function toggleClass(element, className, action = 'add') {
   if (element) {
      element.classList[action](className);
   }
}
/*------------------------------Открытие/закрытие фильтра---------------------------*/
document.addEventListener('DOMContentLoaded', function () {
   const filterButton = document.querySelector('.filter__button');
   const filterContent = document.querySelector('.filter__content');
   const filterClose = document.querySelector('.filter__close');
   const filterBody = document.querySelector('.filter__body');
   const body = document.body;

   if (filterButton && filterContent && filterClose && filterBody) {
      filterButton.addEventListener('click', function (e) {
         e.stopPropagation();
         toggleClass(filterContent, 'opened', 'add');
         toggleClass(filterButton, 'active', 'add');
         toggleClass(body, 'no-scroll', 'add');
      });

      filterClose.addEventListener('click', function () {
         toggleClass(filterContent, 'opened', 'remove');
         toggleClass(filterButton, 'active', 'remove');
         toggleClass(body, 'no-scroll', 'remove');
      });

      document.addEventListener('click', function (e) {
         if (!filterBody.contains(e.target) && !filterButton.contains(e.target)) {
            toggleClass(filterContent, 'opened', 'remove');
            toggleClass(filterButton, 'active', 'remove');
            toggleClass(body, 'no-scroll', 'remove');
         }
      });

      filterBody.addEventListener('click', function (e) {
         e.stopPropagation();
      });
   }
});
/*------------------------------Кастомный Dropdown---------------------------*/
function initializeDropdowns() {
   document.querySelectorAll('.s-dropdown').forEach(function (dropDownWrapper) {
      const dropDownBtn = dropDownWrapper.querySelector('.dropdown__button');
      const dropDownText = dropDownBtn.querySelector('span');
      const dropDownList = dropDownWrapper.querySelector('.dropdown__list');
      const dropDownListItems = dropDownList.querySelectorAll('.dropdown__list-item');
      const dropDownInput = dropDownWrapper.querySelector('.dropdown__input-hidden');

      dropDownBtn.addEventListener('click', function (e) {
         toggleClass(dropDownList, 'dropdown__list--visible', dropDownList.classList.contains('dropdown__list--visible') ? 'remove' : 'add');
         toggleClass(this, 'dropdown__button--active', this.classList.contains('dropdown__button--active') ? 'remove' : 'add');
      });

      dropDownListItems.forEach(function (listItem) {
         listItem.addEventListener('click', function (e) {
            e.stopPropagation();
            dropDownText.innerText = this.innerText;
            dropDownBtn.focus();
            dropDownBtn.classList.add('selected');
            dropDownInput.value = this.dataset.value;
            toggleClass(dropDownList, 'dropdown__list--visible', 'remove');
            toggleClass(dropDownBtn, 'dropdown__button--active', 'remove');
         });
      });

      document.addEventListener('click', function (e) {
         if (!dropDownWrapper.contains(e.target) && !dropDownList.contains(e.target)) {
            toggleClass(dropDownBtn, 'dropdown__button--active', 'remove');
            toggleClass(dropDownList, 'dropdown__list--visible', 'remove');
         }
      });
   });
}
document.addEventListener('DOMContentLoaded', initializeDropdowns);

/*------------------------------Пересортировка---------------------------*/
document.querySelectorAll('.checkbox-input').forEach(function (checkbox) {
   checkbox.addEventListener('change', function () {
      const parent = this.closest('.filter__checkboxes');
      const checkboxItem = this.closest('.filter__checkboxes-item');
      const resetButton = document.querySelector('.filter__reset');
      if (this.checked) {
         parent.prepend(checkboxItem);
      } else {
         parent.append(checkboxItem);
      }
      const anyChecked = document.querySelectorAll('.checkbox-input:checked').length > 0;
      resetButton.disabled = !anyChecked;
   });
});

// Функция для сообщений 
function showMessage(messageClass, timeoutVar) {
   const message = document.querySelector(messageClass);
   if (message) {
      clearTimeout(timeoutVar);
      message.classList.add('active');
      timeoutVar = setTimeout(function () {
         message.classList.remove('active');
      }, 2000);
   }
   return timeoutVar;
}

/*------------------------------Слайдер в превью товара---------------------------*/
document.addEventListener('DOMContentLoaded', function () {
   document.querySelectorAll('.product-preview__slider').forEach(function (slider) {
      const swiperInstance = new Swiper(slider, {
         loop: true,
         pagination: {
            el: slider.querySelector('.product-preview-pagination'),
            clickable: true,
            type: 'bullets',
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
            renderBullet: function (index, className) {
               return `<span class="${className}"></span>`;
            },
         },
      });
      let lastMouseX = null;
      slider.addEventListener('mousemove', function (event) {
         if (lastMouseX !== null) {
            event.clientX > lastMouseX ? swiperInstance.slideNext() : swiperInstance.slidePrev();
         }
         lastMouseX = event.clientX;
      });
      slider.addEventListener('mouseleave', function () {
         lastMouseX = null;
      });
   });
});


/*------------------------------Добавить в коризну в превью товара---------------------------*/
let messageTimeout, wishlistTimeout;
document.querySelectorAll('.product-preview__add-cart, .product__add-cart').forEach(function (button) {
   button.addEventListener('click', function () {
      this.classList.add('added');
      messageTimeout = showMessage('.add-to-cart-message', messageTimeout);
   });
});
document.querySelectorAll('.product-preview__add-wishlist, .product__add-wishlist').forEach(function (button) {
   button.addEventListener('click', function () {
      this.classList.add('added');
      wishlistTimeout = showMessage('.add-to-wishlist-message', wishlistTimeout);
   });
});

/*------------------------------Карусель с переносом---------------------------*/
const sliders = document.querySelectorAll('.carousel__slider');

function initializeSwiper() {
   sliders.forEach((sliderElement) => {
      if (window.innerWidth >= 500) {
         if (!sliderElement.classList.contains('swiper-initialized')) {
            const swiper = new Swiper(sliderElement, {
               simulateTouch: false,
               allowTouchMove: false,
               breakpoints: {
                  320: {
                     slidesPerView: 2.2,
                     spaceBetween: 10,
                  },
                  768: {
                     slidesPerView: 3,
                     spaceBetween: 20,
                  },
                  921: {
                     slidesPerView: 4,
                     spaceBetween: 20,
                  },
               },
               loop: true,
               navigation: {
                  nextEl: sliderElement.closest('.carousel').querySelector('.carousel__slide-next'),
                  prevEl: sliderElement.closest('.carousel').querySelector('.carousel__slide-prev'),
               },
            });
         }
      } else {
         if (sliderElement.classList.contains('swiper-initialized')) {
            sliderElement.classList.remove('swiper', 'swiper-container');
         }
      }
   });
}

initializeSwiper();
window.addEventListener('resize', initializeSwiper);

/*------------------------------Карусель без переноса---------------------------*/
const slidersNoWrap = document.querySelectorAll('.carousel__slider-no-wrap');

slidersNoWrap.forEach((sliderElement) => {
   const swiper = new Swiper(sliderElement, {
      simulateTouch: true,
      allowTouchMove: true,
      breakpoints: {
         320: {
            slidesPerView: 2.2,
            spaceBetween: 10,
         },
         768: {
            slidesPerView: 3,
            spaceBetween: 20,
         },
         921: {
            slidesPerView: 4,
            spaceBetween: 20,
         },
      },
      loop: true,
      navigation: {
         nextEl: sliderElement.closest('.carousel').querySelector('.carousel__slide-next'),
         prevEl: sliderElement.closest('.carousel').querySelector('.carousel__slide-prev'),
      },
   });
});

/*------------------------------Карусель без переноса---------------------------*/
const slidersNoWrapSm = document.querySelectorAll('.carousel__slider-no-wrap-sm');

slidersNoWrapSm.forEach((sliderElement) => {
   const swiper = new Swiper(sliderElement, {
      simulateTouch: false,
      allowTouchMove: false,
      breakpoints: {
         320: {
            slidesPerView: 2.6,
            spaceBetween: 10,
         },
         370: {
            slidesPerView: 3.2,
            spaceBetween: 10,
         },
         768: {
            slidesPerView: 4,
            spaceBetween: 20,
         },
         1024: {
            slidesPerView: 6,
            spaceBetween: 20,
         }
      },
      loop: true,
      navigation: {
         nextEl: sliderElement.closest('.carousel').querySelector('.carousel__slide-next'),
         prevEl: sliderElement.closest('.carousel').querySelector('.carousel__slide-prev'),
      },
   });
});

/*------------------------------Карусель Корзина---------------------------*/
const slidersCart = document.querySelectorAll('.cart-carousel__slider');

slidersCart.forEach((sliderElement) => {
   const swiper = new Swiper(sliderElement, {
      loop: false,
      slidesPerView: 2.2,
      spaceBetween: 10,
      navigation: {
         nextEl: sliderElement.closest('.quantity-carousel').querySelector('.cart-carousel__slide-next'),
         prevEl: sliderElement.closest('.quantity-carousel').querySelector('.cart-carousel__slide-prev'),
      },
   });
});


/*------------------------------Слайдер опции---------------------------*/
const swiper = new Swiper('.options__slider', {
   slidesPerView: "auto",
   spaceBetween: 8,
   freeMode: true,
});

/*------------------------------Опции фильтра---------------------------*/
document.addEventListener('click', function (event) {
   const filterMobile = document.querySelector('.filter-mobile');
   const activeItem = document.querySelector('.filter-mobile__item.active');
   const isClickInsideActiveItem = event.target.closest('.filter-mobile__item');
   const isClickInsideOptions = event.target.closest('.options__slide');
   if (filterMobile && !isClickInsideActiveItem && !isClickInsideOptions) {
      filterMobile.classList.remove('opened');
      document.body.classList.remove('options-opened');
      activeItem?.classList.remove('active');
   }
});
document.querySelectorAll('.options__slide').forEach(function (slide) {
   slide.addEventListener('click', function (event) {
      event.stopPropagation();
      const filter = slide.getAttribute('data-filter');
      const filterMobile = document.querySelector('.filter-mobile');
      if (filterMobile) {
         filterMobile.classList.add('opened');
         document.body.classList.add('options-opened');
      }
      document.querySelectorAll('.filter-mobile__item').forEach(function (item) {
         item.classList.toggle('active', item.getAttribute('data-filter') === filter);
      });
      const activeInputs = document.querySelectorAll('.filter-mobile__item.active input');
      activeInputs.forEach(function (input) {
         input.addEventListener('change', function () {
            updateSlideCheckedState(filter);
         });
      });
   });
});

function updateSlideCheckedState(filter) {
   const slide = document.querySelector(`.options__slide[data-filter="${filter}"]`);
   const inputs = document.querySelectorAll(`.filter-mobile__item[data-filter="${filter}"] input`);
   if (slide && inputs.length) {
      const isChecked = Array.from(inputs).some(input => input.checked);
      slide.classList.toggle('checked', isChecked);
      if (isChecked) {
         moveSlideToTop(slide);
      }
   }
}

function moveSlideToTop(slide) {
   const parent = slide.parentNode;
   parent?.prepend(slide);
}

/*------------------------------Слайдер продукта---------------------------*/
var productGallerySlider = document.querySelector(".product__gallery-slider");
var productGallerySlider2 = document.querySelector(".product__gallery-slider-2");

if (productGallerySlider && productGallerySlider2) {
   var carSwiper = new Swiper(productGallerySlider, {
      spaceBetween: 16,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
      breakpoints: {
         320: {
            slidesPerView: 2.8,
            spaceBetween: 12,
         },
         600: {
            slidesPerView: 4,
            spaceBetween: 16,
         },
      },
   });

   var carSwiper2 = new Swiper(productGallerySlider2, {
      spaceBetween: 16,
      thumbs: {
         swiper: carSwiper,
      },
   });
}

/*------------------------------Галерея продукта---------------------------*/
const productImgSelector = ".product__gallery-item img";
const sliderImgs2 = document.querySelectorAll(productImgSelector);

if (sliderImgs2.length > 0) {
   const dynamicEl = [...sliderImgs2].map((sliderImg) => {
      return {
         src: sliderImg.src,
         thumb: sliderImg.src,
         subHtml: ''
      };
   });
   const dynamicGallery = document.querySelector(".dynamic-gallery-button");
   const popup = lightGallery(dynamicGallery, {
      dynamic: true,
      download: false,
      dynamicEl,

      plugins: [lgThumbnail],
      mobileSettings: {
         showCloseIcon: true,
      },
   });
   dynamicGallery.addEventListener("click", () => {
      popup.openGallery(0);
   });
   [...document.querySelectorAll(".product__gallery-item")].map((slide, idx) => {
      slide.addEventListener("click", () => {
         popup.openGallery(idx);
      });
   });
}


/*--------------------------Перемещение кнопок-------------------------------*/
function moveButtons() {
   const buyClickButton = document.querySelector('.buy-click');
   const addCartButton = document.querySelector('.product__add-cart');
   const productRating = document.querySelector('.product__rating');
   const buyBlockButtons = document.querySelector('.buy-block__buttons');
   const buyBlockPrices = document.querySelector('.buy-block__prices');

   if (buyClickButton && addCartButton && productRating && buyBlockButtons && buyBlockPrices) {
      if (window.innerWidth < 600) {
         if (!productRating.contains(buyClickButton)) {
            productRating.appendChild(buyClickButton);
         }
         if (!buyBlockPrices.contains(addCartButton)) {
            buyBlockPrices.appendChild(addCartButton);
         }
      } else {
         if (!buyBlockButtons.contains(buyClickButton)) {
            buyBlockButtons.appendChild(buyClickButton);
         }
         if (!buyBlockButtons.contains(addCartButton)) {
            buyBlockButtons.appendChild(addCartButton);
         }
      }
   }
}

window.addEventListener('resize', moveButtons);
window.addEventListener('DOMContentLoaded', moveButtons);

/*------------------------------Видео---------------------------*/
var videoContainers = document.querySelectorAll('.video-container');

if (videoContainers.length > 0) {
   videoContainers.forEach(function (container) {
      var playButton = container.querySelector('.video-play-button');
      var video = container.querySelector('.video');
      var cover = container.querySelector('.video-cover');

      cover.addEventListener('click', function () {
         cover.style.display = 'none';
         video.play();
      });
   });
}

/*------------------------------Табы продукта---------------------------*/
document.addEventListener('DOMContentLoaded', function () {
   const tabs = document.querySelectorAll('.product__tab');
   const tabTitles = document.querySelectorAll('.product__tab-title');
   const productContents = document.querySelector('.product__contents');

   if (!tabs.length || !tabTitles.length || !productContents) {
      return;
   }

   function moveTabContent() {
      if (window.innerWidth > 1000) {
         tabs.forEach(tab => {
            const tabContent = tab.querySelector('.product__tab-content');
            if (tabContent) {
               productContents.appendChild(tabContent);
            }
         });
      } else {
         tabs.forEach(tab => {
            const tabContent = productContents.querySelector(`.product__tab-content[data-tab="${tab.dataset.tab}"]`);
            if (tabContent) {
               tab.appendChild(tabContent);
            }
         });
      }
   }

   function switchTab(targetTab) {
      const activeTab = document.querySelector(`.product__tab[data-tab="${targetTab}"]`);
      const allContents = document.querySelectorAll('.product__tab-content');

      tabs.forEach(tab => tab.classList.remove('active'));
      allContents.forEach(content => content.classList.remove('active'));

      if (activeTab) activeTab.classList.add('active');

      const activeContent = window.innerWidth > 1000
         ? productContents.querySelector(`.product__tab-content[data-tab="${targetTab}"]`)
         : activeTab.querySelector(`.product__tab-content[data-tab="${targetTab}"]`);

      if (activeContent) activeContent.classList.add('active');
   }

   if (tabs.length && tabTitles.length) {
      tabTitles.forEach((title) => {
         title.addEventListener('click', function () {
            const targetTab = title.getAttribute('data-tab');
            const currentActiveTab = document.querySelector('.product__tab.active');

            if (window.innerWidth < 1000 && currentActiveTab && currentActiveTab.dataset.tab === targetTab) {
               currentActiveTab.classList.remove('active');
               const currentActiveContent = currentActiveTab.querySelector('.product__tab-content');
               if (currentActiveContent) {
                  currentActiveContent.classList.remove('active');
               }
            } else {
               switchTab(targetTab);
            }
         });
      });
   }

   moveTabContent();
   window.addEventListener('resize', moveTabContent);
});


/*------------------------------Карусел доп количества---------------------------*/
const slidersQuantity = document.querySelectorAll('.quantity-carousel__slider');

slidersQuantity.forEach((sliderElement) => {
   const swiper = new Swiper(sliderElement, {
      loop: false,
      breakpoints: {
         320: {
            slidesPerView: 2.6,
            spaceBetween: 10,
         },
         370: {
            slidesPerView: 3.2,
            spaceBetween: 10,
         },
         768: {
            slidesPerView: 4,
            spaceBetween: 20,
         },
         1024: {
            slidesPerView: 6,
            spaceBetween: 20,
         }
      },
      navigation: {
         nextEl: sliderElement.closest('.quantity-carousel').querySelector('.quantity-carousel__slide-next'),
         prevEl: sliderElement.closest('.quantity-carousel').querySelector('.quantity-carousel__slide-prev'),
      },
   });
});

/*------------------------------Карусел доп количества---------------------------*/
const slidersQuantityXl = document.querySelectorAll('.quantity-carousel__slider-xl');

slidersQuantityXl.forEach((sliderElement) => {
   const swiper = new Swiper(sliderElement, {
      loop: false,
      breakpoints: {
         320: {
            slidesPerView: 2.2,
            spaceBetween: 10,
         },
         370: {
            slidesPerView: 2.2,
            spaceBetween: 10,
         },
         580: {
            slidesPerView: 3,
            spaceBetween: 20,
         },
         768: {
            slidesPerView: 4,
            spaceBetween: 20,
         },
         1024: {
            slidesPerView: 6,
            spaceBetween: 20,
         }
      },
      navigation: {
         nextEl: sliderElement.closest('.quantity-carousel').querySelector('.quantity-carousel__slide-next'),
         prevEl: sliderElement.closest('.quantity-carousel').querySelector('.quantity-carousel__slide-prev'),
      },
   });
});

/*------------------------------Карусел доп количества---------------------------*/
const slidersQuantityM = document.querySelectorAll('.quantity-carousel__slider-m');

slidersQuantityM.forEach((sliderElement) => {
   const swiper = new Swiper(sliderElement, {
      loop: false,
      breakpoints: {
         320: {
            slidesPerView: 2.2,
            spaceBetween: 10,
         },
         370: {
            slidesPerView: 2.2,
            spaceBetween: 10,
         },
         580: {
            slidesPerView: 3,
            spaceBetween: 12,
         },
         768: {
            slidesPerView: 4,
            spaceBetween: 12,
         },
         1024: {
            slidesPerView: 5,
            spaceBetween: 12,
         }
      },
      navigation: {
         nextEl: sliderElement.closest('.quantity-carousel').querySelector('.quantity-carousel__slide-next'),
         prevEl: sliderElement.closest('.quantity-carousel').querySelector('.quantity-carousel__slide-prev'),
      },
   });
});

/*------------------------------Слайдер отзывы---------------------------*/
document.addEventListener('DOMContentLoaded', function () {
   var testimonialsSlider = document.querySelector('.product__testimonials-slider');

   if (testimonialsSlider) {
      var swiper = new Swiper('.product__testimonials-slider', {
         loop: false,
         speed: 500,
         navigation: {
            nextEl: '.product__testimonials-next',
            prevEl: '.product__testimonials-prev',
         },
         pagination: {
            el: '.swiper-pagination',
            clickable: true,
         },
         breakpoints: {
            320: {
               slidesPerView: 1.2,
               spaceBetween: 10,
            },
            640: {
               slidesPerView: 2.2,
               spaceBetween: 10,
            },
            768: {
               slidesPerView: 2.8,
               spaceBetween: 20,
            },
            1024: {
               slidesPerView: 3,
               spaceBetween: 20,
            },
         }
      });
   }
});

/*------------------------------Отзыв---------------------------*/
document.addEventListener('DOMContentLoaded', function () {
   const testimonials = document.querySelectorAll('.testimonial__body');

   testimonials.forEach(testimonial => {
      const textElement = testimonial.querySelector('.testimonial__text');
      const toggleButton = testimonial.querySelector('.testimonial__toggle');
      const imageElement = testimonial.querySelector('.testimonial__image');
      const isImagePresent = imageElement !== null;
      let lineClamp = isImagePresent ? 2 : 4;
      textElement.style.webkitLineClamp = lineClamp;
      const originalHeight = textElement.scrollHeight;
      textElement.style.display = '-webkit-box';
      const clampedHeight = textElement.offsetHeight;

      if (originalHeight <= clampedHeight) {
         toggleButton.style.display = 'none';
      }

      toggleButton.addEventListener('click', function () {
         const isExpanded = textElement.classList.contains('expanded');
         if (isExpanded) {
            textElement.classList.remove('expanded');
            textElement.style.webkitLineClamp = lineClamp;
            this.textContent = 'ещё';
         } else {
            textElement.classList.add('expanded');
            textElement.style.webkitLineClamp = 'unset';
            this.textContent = 'свернуть';
         }
      });
   });
});

/*------------------------------Открыть Фото отзыва---------------------------*/
document.addEventListener("DOMContentLoaded", function () {
   const galleryItems = document.querySelectorAll('.testimonial__image');

   if (galleryItems.length > 0) {
      galleryItems.forEach(function (item) {
         lightGallery(item, {
            selector: 'a',
            download: false,
            mobileSettings: {
               showCloseIcon: true,
            },
         });
      });
   }
});

/*------------------------------Маска номера---------------------------*/
document.addEventListener('DOMContentLoaded', function () {
   const maskOptions = {
      mask: '+{7} (000) 000-00-00'
   };

   const elements = document.querySelectorAll('.tel-mask');
   elements.forEach(function (element) {
      IMask(element, maskOptions);
   });
});

/*------------------------------Попап купить в 1 клик---------------------------*/
document.addEventListener('DOMContentLoaded', function () {
   const openButtons = document.querySelectorAll('.open-1click-popup');
   const popup = document.querySelector('.one-click__popup');
   const popupBody = document.querySelector('.one-click__body');
   const closeButton = document.querySelector('.one-click__close');
   const body = document.body;

   if (openButtons.length > 0 && popup) {
      openButtons.forEach(button => {
         button.addEventListener('click', function () {
            popup.classList.add('opened');
            body.style.overflow = 'hidden';
         });
      });

      const closePopup = function () {
         popup.classList.remove('opened');
         body.style.overflow = '';
      };

      if (closeButton) {
         closeButton.addEventListener('click', closePopup);
      }

      popup.addEventListener('click', function (event) {
         if (!popupBody.contains(event.target)) {
            closePopup();
         }
      });
   }
});


/*------------------------------Попап новый отзыв---------------------------*/
document.addEventListener('DOMContentLoaded', function () {
   const openButtons = document.querySelectorAll('.open-new-testimonial-popup');
   const popup = document.querySelector('.new-testimonial__popup');
   const popupBody = document.querySelector('.new-testimonial__body');
   const closeButton = document.querySelector('.new-testimonial__close');
   const body = document.body;

   if (openButtons.length > 0 && popup) {
      openButtons.forEach(button => {
         button.addEventListener('click', function () {
            popup.classList.add('opened');
            body.style.overflow = 'hidden';
         });
      });

      const closePopup = function () {
         popup.classList.remove('opened');
         body.style.overflow = '';
      };

      if (closeButton) {
         closeButton.addEventListener('click', closePopup);
      }

      popup.addEventListener('click', function (event) {
         if (!popupBody.contains(event.target)) {
            closePopup();
         }
      });
   }
});

/*------------------------------Quantity input---------------------------*/
document.addEventListener('DOMContentLoaded', function () {
   const quantityContainers = document.querySelectorAll('.quantity-input');

   quantityContainers.forEach(container => {
      const quantityInput = container.querySelector('input');
      const minusBtn = container.querySelector('.quantity-input-minus');
      const removeBtn = container.querySelector('.quantity-input-remove');
      const plusBtn = container.querySelector('.quantity-input-plus');

      if (quantityInput && minusBtn && plusBtn) {
         removeBtn.style.display = 'none';

         function updateButtons() {
            const currentValue = parseInt(quantityInput.value, 10);

            if (currentValue > 1) {
               minusBtn.style.display = 'inline-block';
               removeBtn.style.display = 'none';
            } else {
               minusBtn.style.display = 'none';
               removeBtn.style.display = 'inline-block';
            }
         }

         plusBtn.addEventListener('click', function () {
            quantityInput.value = parseInt(quantityInput.value, 10) + 1;
            updateButtons();
         });

         minusBtn.addEventListener('click', function () {
            if (parseInt(quantityInput.value, 10) > 1) {
               quantityInput.value = parseInt(quantityInput.value, 10) - 1;
            }
            updateButtons();
         });

         updateButtons();
      }
   });
});



/*------------------------------Загрузить аватар---------------------------*/
const uploadAuthorImageInput = document.getElementById('upload-author-image');
if (uploadAuthorImageInput) {
   uploadAuthorImageInput.addEventListener('change', function (event) {
      const preview = document.getElementById('preview-author-image');
      if (preview) {
         preview.innerHTML = '';
         const files = event.target.files;
         Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = function (e) {
               const img = document.createElement('img');
               img.src = e.target.result;
               preview.appendChild(img);
            };
            reader.readAsDataURL(file);
         });
      }
   });
}

/*------------------------------Загрузить изображения---------------------------*/
const uploadImagesInput = document.getElementById('upload-images');
if (uploadImagesInput) {
   uploadImagesInput.addEventListener('change', function (event) {
      const preview = document.getElementById('preview-images');
      if (preview) {
         preview.innerHTML = '';
         const files = event.target.files;
         Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = function (e) {
               const img = document.createElement('img');
               img.src = e.target.result;
               preview.appendChild(img);
            };
            reader.readAsDataURL(file);
         });
      }
   });
}


/*------------------------------Корзина---------------------------*/
document.addEventListener('DOMContentLoaded', function () {
   const openCartButtons = document.querySelectorAll('.open-cart-btn');
   const cartPopup = document.querySelector('.cart-popup');
   const cartCloseButton = document.querySelector('.cart-popup__close');
   const body = document.body;

   if (openCartButtons.length > 0 && cartPopup && cartCloseButton) {
      function openCart() {
         cartPopup.classList.add('opened');
         body.classList.add('cart-opened');
      }
      function closeCart() {
         cartPopup.classList.remove('opened');
         body.classList.remove('cart-opened');
      }
      openCartButtons.forEach(button => {
         button.addEventListener('click', openCart);
      });
      cartCloseButton.addEventListener('click', closeCart);
      document.addEventListener('click', function (event) {
         if (!cartPopup.contains(event.target) && !event.target.closest('.open-cart-btn')) {
            closeCart();
         }
      });
      let startY = 0;
      cartPopup.addEventListener('touchstart', (event) => {
         startY = event.touches[0].clientY;
      });
      cartPopup.addEventListener('touchend', (event) => {
         const endY = event.changedTouches[0].clientY;
         const swipeDistance = endY - startY;
         if (swipeDistance > 50 && cartPopup.scrollTop === 0 && window.innerWidth < 432) {
            closeCart();
         }
      });
   }
});


/*------------------------------Удаление товара из корзины---------------------------*/
const removeButtons = document.querySelectorAll('.quantity-input-remove');

if (removeButtons.length > 0) {
   removeButtons.forEach(button => {
      button.addEventListener('click', function (event) {
         event.stopPropagation();
         const cartProduct = this.closest('.cart-product');
         if (cartProduct) {
            cartProduct.remove();
         }
      });
   });
}

/*------------------------------Оформление табы и валидация---------------------------*/
document.addEventListener('DOMContentLoaded', () => {
   const steps = document.querySelectorAll('.checkout__step');
   const tabs = document.querySelectorAll('.checkout__tab');
   let currentStep = 1;

   function openTab(step) {
      if (steps.length && tabs.length) {
         steps.forEach(stepDiv => stepDiv.classList.remove('opened'));
         tabs.forEach(tab => tab.classList.remove('opened', 'previous-tab', 'next-tab'));

         const stepDiv = document.querySelector(`.checkout__step[data-step="${step}"]`);
         if (stepDiv) {
            stepDiv.classList.add('opened');
         }

         const activeTab = document.querySelector(`.checkout__tab[data-step="${step}"]`);
         if (activeTab) {
            activeTab.classList.add('opened');
         }

         tabs.forEach(tab => {
            const tabStep = parseInt(tab.getAttribute('data-step'), 10);
            if (tabStep < step) {
               tab.classList.add('completed');
            }
         });

         const previousTab = document.querySelector(`.checkout__tab[data-step="${step - 1}"]`);
         const nextTab = document.querySelector(`.checkout__tab[data-step="${step + 1}"]`);

         if (previousTab) {
            previousTab.classList.add('previous-tab');
         }
         if (nextTab) {
            nextTab.classList.add('next-tab');
         }
      }

      if (step === 1 || step === 2) {
         checkStepCompletion(step);
      }
   }

   function checkStepCompletion(step) {
      const nextButton = document.querySelector(`.checkout__step[data-step="${step}"] .checkout-next`);
      let isStepComplete = false;

      if (nextButton) {
         if (step === 1) {
            const name = document.querySelector('.checkout__step[data-step="1"] input[name="name"]');
            const phone = document.querySelector('.checkout__step[data-step="1"] input[name="telephone"]');
            const email = document.querySelector('.checkout__step[data-step="1"] input[name="email"]');
            const agreement = document.querySelector('#agreement');
            isStepComplete = name && name.value.trim() && phone && phone.value.trim() && email && email.value.trim() && agreement && agreement.checked;
         } else if (step === 2) {
            const address = document.querySelector('.checkout__step[data-step="2"] input[name="address"]');
            const date = document.querySelector('.checkout__step[data-step="2"] input[type="text"]');
            isStepComplete = address && address.value.trim() && date && date.value;
         }

         if (isStepComplete) {
            nextButton.removeAttribute('disabled');
         } else {
            nextButton.setAttribute('disabled', 'disabled');
         }
      }
   }

   function setUpStepNavigation() {
      if (steps.length) {
         steps.forEach(step => {
            const prevButton = step.querySelector('.checkout-prev');
            const nextButton = step.querySelector('.checkout-next');

            if (prevButton) {
               prevButton.addEventListener('click', (event) => {
                  event.stopPropagation();
                  if (currentStep > 1) {
                     currentStep -= 1;
                     openTab(currentStep);
                  }
               });
            }

            if (nextButton) {
               nextButton.addEventListener('click', (event) => {
                  event.stopPropagation();
                  if (currentStep < steps.length) {
                     currentStep += 1;
                     openTab(currentStep);
                  }
               });
            }
         });
      }
   }

   function setUpInputListeners() {
      steps.forEach(step => {
         const inputs = step.querySelectorAll('input');
         inputs.forEach(input => {
            input.addEventListener('input', () => checkStepCompletion(currentStep));
            input.addEventListener('change', () => checkStepCompletion(currentStep));
         });
      });
   }

   if (window.innerWidth < 1000) {
      tabs.forEach(tab => {
         tab.addEventListener('click', () => {
            if (tab.classList.contains('previous-tab')) {
               const tabStep = parseInt(tab.getAttribute('data-step'), 10);
               currentStep = tabStep;
               openTab(currentStep);
            }
         });
      });
   }

   openTab(currentStep);
   setUpStepNavigation();
   setUpInputListeners();
});


/*----------------------------Другой получатель-----------------------------*/
document.addEventListener("DOMContentLoaded", function () {
   const checkbox = document.getElementById("recipient-other");
   const recipientOtherBlock = document.getElementById("recipient-other-block");
   if (checkbox && recipientOtherBlock) {
      function toggleRecipientOtherBlock() {
         recipientOtherBlock.style.display = checkbox.checked ? "flex" : "none";
      }
      checkbox.addEventListener("change", toggleRecipientOtherBlock);
      toggleRecipientOtherBlock();
   }
});

/*------------------------------Посказка города---------------------------*/
function elementExists(id) {
   return document.getElementById(id) !== null;
}
var form1Options =
{
   fields:
      [
         { id: 'address_city', levels: ['Region', 'District', 'City'], limit: 4 }
      ]
};
if (elementExists('address_city')) {
   AhunterSuggest.Address.Discrete(form1Options);
}

/*------------------------------Посказка полного адреса---------------------------*/
var options = { id: 'address-full' };
if (document.getElementById(options.id)) {
   AhunterSuggest.Address.Solid(options);
}


/*------------------------------Перемещение checkout---------------------------*/
document.addEventListener('DOMContentLoaded', function () {
   const checkoutForm = document.querySelector('.checkout__form');
   if (!checkoutForm) return;

   const steps = Array.from(checkoutForm.querySelectorAll('.checkout__step'));
   const tabs = Array.from(checkoutForm.querySelectorAll('.checkout__tab'));
   const stepsContainer = checkoutForm.querySelector('.checkout__steps');

   let resizeTimeout;
   let isInputFocused = false;

   function moveStepsToTabs() {
      if (steps.length && tabs.length) {
         steps.forEach(step => {
            const stepNumber = step.getAttribute('data-step');
            const targetTab = checkoutForm.querySelector(`.checkout__tab[data-step="${stepNumber}"] .checkout__tab-content`);
            if (targetTab) {
               targetTab.appendChild(step);
            }
         });
      }
   }

   function moveStepsBackToContainer() {
      if (stepsContainer && steps.length) {
         steps.forEach(step => {
            stepsContainer.appendChild(step);
         });
      }
   }

   function handleResize() {
      if (isInputFocused) return;

      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
         if (window.innerWidth <= 1000) {
            moveStepsToTabs();
         } else {
            moveStepsBackToContainer();
         }
      }, 300);
   }

   document.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('focus', () => {
         isInputFocused = true;
      });

      input.addEventListener('blur', () => {
         isInputFocused = false;
         handleResize();
      });
   });

   handleResize();
   window.addEventListener('resize', handleResize);
});


/*------------------------------ПВЗ скрытие доп полей---------------------------*/
document.addEventListener('DOMContentLoaded', function () {
   const pvzDeliveryInputs = document.querySelectorAll('input.pvz-delivery');
   const courierDeliveryInputs = document.querySelectorAll('input.courier-delivery');
   const dynamicSections = document.querySelectorAll('.checkout__dynamic');
   if (dynamicSections.length === 0 || (pvzDeliveryInputs.length === 0 && courierDeliveryInputs.length === 0)) return;
   function toggleAddressDisplay() {
      let isPvzSelected = false;
      pvzDeliveryInputs.forEach(input => {
         if (input.checked) {
            isPvzSelected = true;
         }
      });
      dynamicSections.forEach(section => {
         section.style.display = isPvzSelected ? 'none' : 'block';
      });
   }
   pvzDeliveryInputs.forEach(input => {
      input.addEventListener('change', toggleAddressDisplay);
   });
   courierDeliveryInputs.forEach(input => {
      input.addEventListener('change', toggleAddressDisplay);
   });
   toggleAddressDisplay();
});


/*------------------------------
Войти и регистрация
---------------------------*/
document.addEventListener('DOMContentLoaded', () => {
   const tabsContainer = document.querySelector('.login__tabs');
   const tabs = document.querySelectorAll('.login__tab');
   const contents = document.querySelectorAll('.login__content');
   if (!tabsContainer || tabs.length === 0 || contents.length === 0) {
      return;
   }
   tabs[0].classList.add('active');
   contents[0].classList.add('active');
   tabsContainer.addEventListener('click', (event) => {
      const clickedTab = event.target.closest('.login__tab');
      if (!clickedTab) return;
      const tabName = clickedTab.dataset.tab;
      tabs.forEach(tab => tab.classList.remove('active'));
      contents.forEach(content => content.classList.remove('active'));
      clickedTab.classList.add('active');
      const activeContent = document.querySelector(`.login__content[data-tab="${tabName}"]`);
      if (activeContent) {
         activeContent.classList.add('active');
      }
   });
});

/*------------------------------Видимость пароля---------------------------*/
document.addEventListener('DOMContentLoaded', () => {
   const passwordInput = document.getElementById('password');
   const eyeToggle = document.querySelector('.login__eye');
   if (!passwordInput || !eyeToggle) {
      return;
   }
   const eyeOpenIcon = eyeToggle.querySelector('.login__eye-open');
   const eyeCloseIcon = eyeToggle.querySelector('.login__eye-close');
   if (!eyeOpenIcon || !eyeCloseIcon) {
      return;
   }
   eyeToggle.addEventListener('click', () => {
      const isPasswordVisible = passwordInput.type === 'text';
      passwordInput.type = isPasswordVisible ? 'password' : 'text';
      eyeToggle.classList.toggle('active', !isPasswordVisible);
      eyeOpenIcon.style.display = isPasswordVisible ? 'block' : 'none';
      eyeCloseIcon.style.display = isPasswordVisible ? 'none' : 'block';
   });
});

/*------------------------------Валидация полей Войти И Регистрация---------------------------*/
// Функция для проверки совпадения паролей
function validatePasswords() {
   const regPassword = document.getElementById('regPassword');
   const regPassword2 = document.getElementById('regPassword2');

   if (regPassword.value !== regPassword2.value || !regPassword.value || !regPassword2.value) {
      regPassword2.setCustomValidity('Пароли не совпадают');
   } else {
      regPassword2.setCustomValidity('');
   }
}

function checkElementsExist(form) {
   const requiredElements = form.querySelectorAll('[required]');
   return Array.from(requiredElements).every(element => element);
}

function validateForm() {
   const loginForm = document.getElementById('loginForm');
   const registrationForm = document.getElementById('registrationForm');
   const loginInputs = loginForm ? loginForm.querySelectorAll('input') : [];
   const registrationInputs = registrationForm ? registrationForm.querySelectorAll('input') : [];
   const loginSubmitButton = loginForm ? loginForm.querySelector('button[type="submit"]') : null;
   const registrationSubmitButton = registrationForm ? registrationForm.querySelector('button[type="submit"]') : null;
   const loginCheckbox = loginForm ? loginForm.querySelector('#remember') : null;
   const registrationCheckbox = registrationForm ? registrationForm.querySelector('#policy') : null;
   if (!checkElementsExist(loginForm) || !checkElementsExist(registrationForm)) {
      return;
   }
   const isLoginValid = Array.from(loginInputs).every(input => input.value && (input.type !== 'checkbox' || input.checked));
   loginSubmitButton.disabled = !isLoginValid || !loginCheckbox.checked;
   const isRegistrationValid = Array.from(registrationInputs).every(input => input.value && (input.type !== 'checkbox' || input.checked));
   validatePasswords();
   registrationSubmitButton.disabled = !isRegistrationValid || !registrationCheckbox.checked || regPassword2.validationMessage;
}
document.querySelectorAll('.login__form input').forEach(input => {
   input.addEventListener('input', validateForm);
});
document.querySelectorAll('.login__form input[type="checkbox"]').forEach(checkbox => {
   checkbox.addEventListener('change', validateForm);
});

/*------------------------------Открытие восстановления пароля---------------------------*/
const loginForgetButton = document.querySelector('.login__forget');
const recoverPassword = document.querySelector('.recover-password');
const closeRecoverButton = document.querySelector('.recover-password__close');
if (loginForgetButton && recoverPassword) {
   loginForgetButton.addEventListener('click', () => {
      recoverPassword.classList.add('opened');
   });
}
if (closeRecoverButton && recoverPassword) {
   closeRecoverButton.addEventListener('click', () => {
      recoverPassword.classList.remove('opened');
   });
}

/*---------------------------Выбор метода восстановления пароля------------------------------*/
document.addEventListener('DOMContentLoaded', () => {
   const emailForm = document.getElementById('recover-password-email');
   const telephoneForm = document.getElementById('recover-password-telephone');
   const changeMethodButtons = document.querySelectorAll('.change-method');
   if (emailForm && telephoneForm) {
      emailForm.classList.add('active');
      telephoneForm.classList.remove('active');
      changeMethodButtons.forEach(button => {
         button.addEventListener('click', () => {
            emailForm.classList.toggle('active');
            telephoneForm.classList.toggle('active');
         });
      });
   }
});


/*------------------------------Загрузка фото---------------------------*/
const photoInput = document.getElementById('photo-input');
const userPhoto = document.getElementById('user-photo');
if (photoInput && userPhoto) {
   photoInput.addEventListener('change', function () {
      const file = this.files[0];
      if (file) {
         const reader = new FileReader();
         reader.onload = function (e) {
            userPhoto.src = e.target.result;
         };
         reader.readAsDataURL(file);
      }
   });
}


/*---------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
   const passwordInputs = document.querySelectorAll(".password-input");
   const toggleEyes = document.querySelectorAll(".password__eye");
   toggleEyes.forEach(eye => {
      eye.addEventListener("click", () => {
         const input = eye.parentElement.querySelector(".password-input");
         const isPasswordVisible = input.type === "password";

         input.type = isPasswordVisible ? "text" : "password";

         eye.querySelector(".password__eye-open").style.display = isPasswordVisible ? "none" : "inline";
         eye.querySelector(".password__eye-close").style.display = isPasswordVisible ? "inline" : "none";
      });
   });
   const validatePasswords = () => {
      const password = document.getElementById("profilePassword");
      const confirmPassword = document.getElementById("profilePassword2");
      if (password.value && confirmPassword.value) {
         if (password.value !== confirmPassword.value) {
            confirmPassword.setCustomValidity("Пароли не совпадают.");
         } else {
            confirmPassword.setCustomValidity("");
         }
      } else {
         confirmPassword.setCustomValidity("");
      }
   };
   passwordInputs.forEach(input => {
      input.addEventListener("input", validatePasswords);
   });
});


/*------------------------------
Профиль валидация формы
---------------------------*/
const profileForm = document.getElementById('profileForm');
if (profileForm) {
   const submitButton = profileForm.querySelector('button');
   if (submitButton) {
      const initialValues = {};
      Array.from(profileForm.elements).forEach(input => {
         if (input.type !== "submit" && input.type !== "button") {
            initialValues[input.name || input.id] = input.value;
         }
      });
      function checkFormChanges() {
         let formChanged = false;
         Array.from(profileForm.elements).forEach(input => {
            if (input.type !== "submit" && input.type !== "button") {
               if (input.value !== initialValues[input.name || input.id]) {
                  formChanged = true;
               }
            }
         });
         submitButton.disabled = !formChanged;
      }
      profileForm.addEventListener('input', checkFormChanges);
   }
}


/*------------------------------Кабинет слайдер меню---------------------------*/
let menuSwiper;
function initSwiper() {
   const sliderElement = document.querySelector('.cabinet__menu-slider');
   if (!sliderElement) return;
   const activeLink = sliderElement.querySelector('.cabinet__menu-link.active');
   const activeSlide = activeLink ? activeLink.closest('.swiper-slide') : null;
   const activeIndex = activeSlide ? Array.from(activeSlide.parentNode.children).indexOf(activeSlide) : 0;

   if (window.innerWidth < 920) {
      if (!menuSwiper) {
         menuSwiper = new Swiper(sliderElement, {
            slidesPerView: 'auto',
            spaceBetween: 8,
            initialSlide: activeIndex,
         });
      }
   } else {
      if (menuSwiper) {
         menuSwiper.destroy(true, true);
         menuSwiper = null;
      }
   }
}
window.addEventListener('resize', initSwiper);
document.addEventListener('DOMContentLoaded', initSwiper);

/*------------------------------Добавление даты---------------------------*/
function initializeDatepickers() {
   const datepickerElements = document.querySelectorAll('.datepicker');

   datepickerElements.forEach(function (datepickerElement) {
      new AirDatepicker(datepickerElement, {
         autoClose: true,
         dateFormat: 'dd.MM.yyyy',
         onSelect({ date, formattedDate }) {
            console.log('Selected date:', formattedDate);
         }
      });

      datepickerElement.classList.add('initialized');
   });
}

document.addEventListener('DOMContentLoaded', function () {
   initializeDatepickers();
});

const addDateButton = document.querySelector('.add-date');
if (addDateButton) {
   addDateButton.addEventListener('click', function () {
      const form = document.getElementById('datesForm');
      if (!form) return;

      const buttonRow = form.querySelector('.cabinet__profile-buttons');
      const existingRow = form.querySelector('.cabinet__profile-row');
      const editDate = form.querySelector('.edit-date');
      const saveDate = form.querySelector('.save-date');

      if (!buttonRow || !existingRow || !editDate || !saveDate) return;

      const newRow = existingRow.cloneNode(true);
      newRow.classList.remove('_lock');

      editDate.style.display = 'none';
      saveDate.style.display = 'flex';

      const dateInput = newRow.querySelector('input.datepicker');
      const occasionButton = newRow.querySelector('.dropdown__button span');
      const occasionInput = newRow.querySelector('.dropdown__input-hidden');
      const whomButton = newRow.querySelectorAll('.dropdown__button span')[1];
      const whomInput = newRow.querySelectorAll('.dropdown__input-hidden')[1];

      if (dateInput) dateInput.value = "";
      if (occasionButton) occasionButton.textContent = "Событие";
      if (occasionInput) occasionInput.value = "";
      if (whomButton) whomButton.textContent = "Чье";
      if (whomInput) whomInput.value = "";

      form.insertBefore(newRow, buttonRow);

      if (typeof initializeDropdowns === 'function') {
         initializeDropdowns();
      }

      initCheckboxToggle();

      // Повторная инициализация для новых элементов
      initializeDatepickers();
   });
}

const editDateButton = document.querySelector('.edit-date');
if (editDateButton) {
   editDateButton.addEventListener('click', function () {
      const form = document.getElementById('datesForm');
      if (!form) return;

      const saveDate = form.querySelector('.save-date');
      const editDate = form.querySelector('.edit-date');

      editDate.style.display = 'none';
      saveDate.style.display = 'flex';

      const lockedRows = form.querySelectorAll('._lock');
      if (lockedRows.length > 0) {
         lockedRows.forEach(row => {
            row.classList.remove('_lock');
         });
      }
   });
}
/*----------------------Копировать промокод-----------------------------------*/
document.querySelectorAll('.cabinet__promo-copy').forEach(button => {
   button.addEventListener('click', () => {
      const promoValue = button.closest('.cabinet__promo-input').querySelector('.cabinet__promo-value');
      const textToCopy = promoValue.textContent || promoValue.innerText;

      navigator.clipboard.writeText(textToCopy).then(() => {
         button.classList.add('copied');
         setTimeout(() => button.classList.remove('copied'), 2000);
      });
   });
});


/*------------------------------Checkbox---------------------------*/
function initCheckboxToggle() {
   document.querySelectorAll('.checkbox input[type="checkbox"]').forEach(checkbox => {
      const parent = checkbox.closest('.checkbox');
      if (checkbox.checked) {
         parent.classList.add('checked');
      }
      checkbox.addEventListener('change', function () {
         if (this.checked) {
            parent.classList.add('checked');
         } else {
            parent.classList.remove('checked');
         }
      });
   });
}
document.addEventListener('DOMContentLoaded', () => {
   initCheckboxToggle();
});

/*------------------------------Попапы получателей---------------------------*/
function togglePopup(popup, action) {
   const body = document.body;
   if (action === 'open') {
      popup.classList.add('opened');
      body.classList.add('no-scroll');
   } else if (action === 'close') {
      popup.classList.remove('opened');
      body.classList.remove('no-scroll');
   }
}

function setupPopupListeners(buttons, popup, closeButton) {
   if (buttons.length && popup && closeButton) {
      buttons.forEach(button => {
         button.addEventListener('click', (event) => {
            togglePopup(popup, 'open');
            event.stopPropagation();
         });
      });
      closeButton.addEventListener('click', () => {
         togglePopup(popup, 'close');
      });
   }
}
const editButtonsRec = document.querySelectorAll('.cabinet__recipient-edit');
const editPopupRec = document.querySelector('.edit-recipient');
const closePopupRec = document.querySelector('.edit-recipient__close');
setupPopupListeners(editButtonsRec, editPopupRec, closePopupRec);
const addButtonsRec = document.querySelectorAll('.cabinet__recipient-add');
const addPopupRec = document.querySelector('.add-recipient');
const closeAddPopupRec = document.querySelector('.add-recipient__close');
setupPopupListeners(addButtonsRec, addPopupRec, closeAddPopupRec);


/*------------------------------Благодарности галерея---------------------------*/
document.addEventListener("DOMContentLoaded", function () {
   const thanksItems = document.querySelectorAll('.gratitude__item');

   if (thanksItems.length > 0) {
      thanksItems.forEach(function (item) {
         lightGallery(item, {
            selector: '.gratitude__image',
            download: false,
            counter: false,
            addClass: 'gratitude-gallery',
            mobileSettings: {
               showCloseIcon: true,
            },
         });
      });
   }
});

/*------------------------------Франщиза галерея---------------------------*/
document.addEventListener("DOMContentLoaded", function () {
   const thanksItems = document.querySelectorAll('.franchise__images');

   if (thanksItems.length > 0) {
      thanksItems.forEach(function (item) {
         lightGallery(item, {
            selector: '.franchise__image',
            download: false,
            counter: false,
            addClass: 'franchise-gallery',
            mobileSettings: {
               showCloseIcon: true,
            },
         });
      });
   }
});


/*------------------------------
Upload file
---------------------------*/
document.addEventListener("DOMContentLoaded", () => {
   const uploadContainer = document.querySelector(".callback__upload");

   if (!uploadContainer) return;

   const fileInput = uploadContainer.querySelector(".callback__upload-input");
   const fileNameSpan = uploadContainer.querySelector(".callback__upload-name");

   if (!fileInput || !fileNameSpan) return;

   fileInput.addEventListener("change", () => {
      if (fileInput.files.length > 0) {
         fileNameSpan.textContent = fileInput.files[0].name;
         fileNameSpan.classList.add("file-selected");
      } else {
         fileNameSpan.textContent = "Загрузить резюме";
         fileNameSpan.classList.remove("file-selected");
      }
   });
});


/*------------------------------Сотрудники---------------------------*/
document.addEventListener("DOMContentLoaded", () => {
   const tabs = document.querySelectorAll(".employees__tab");
   const groups = document.querySelectorAll(".employees__cards-group");

   if (tabs.length === 0 || groups.length === 0) return;

   tabs[0].classList.add("active");
   groups[0].classList.add("opened");

   tabs.forEach(tab => {
      tab.addEventListener("click", () => {
         tabs.forEach(t => t.classList.remove("active"));
         tab.classList.add("active");

         const tabName = tab.getAttribute("data-tab");
         if (!tabName) return;

         groups.forEach(group => {
            if (group.getAttribute("data-group") === tabName) {
               group.classList.add("opened");
            } else {
               group.classList.remove("opened");
            }
         });
      });
   });
});


/*------------------------------Оферта---------------------------*/
document.addEventListener("DOMContentLoaded", function () {
   const themes = document.querySelectorAll(".public-offer__item-theme");
   const contentContainer = document.querySelector(".public-offer__content");
   const tabsContainer = document.querySelector(".public-offer__tabs");
   const descriptions = document.querySelectorAll(".public-offer__item-descr");

   if (!themes.length || !contentContainer || !tabsContainer || !descriptions.length) return;

   let activeTab = null;
   let wasDesktop = window.innerWidth >= 1000;

   function updateLayout() {
      const isDesktop = window.innerWidth >= 1000;

      if (isDesktop) {
         themes.forEach(theme => {
            if (!tabsContainer.contains(theme)) {
               tabsContainer.appendChild(theme);
            }
         });

         descriptions.forEach(descr => descr.classList.remove("active"));
         themes.forEach(theme => theme.classList.remove("active"));

         activeTab = themes[0];
         if (activeTab) {
            activeTab.classList.add("active");
            document.querySelector(`.public-offer__item-descr[data-text="${activeTab.dataset.theme}"]`)?.classList.add("active");
         }
      } else {
         themes.forEach(theme => {
            const themeId = theme.dataset.theme;
            const parentItem = document.querySelector(`.public-offer__item-descr[data-text="${themeId}"]`)?.closest(".public-offer__item");
            if (parentItem && !parentItem.contains(theme)) {
               parentItem.insertBefore(theme, parentItem.firstChild);
            }
         });

         descriptions.forEach(descr => descr.classList.add("active"));
         themes.forEach(theme => theme.classList.add("active"));
      }

      wasDesktop = isDesktop;
   }

   themes.forEach(theme => {
      theme.addEventListener("click", function () {
         const isDesktop = window.innerWidth >= 1000;
         const themeId = this.dataset.theme;
         const descr = document.querySelector(`.public-offer__item-descr[data-text="${themeId}"]`);

         if (!descr) return;

         if (isDesktop) {
            if (activeTab === this) return;

            if (activeTab) {
               activeTab.classList.remove("active");
               document.querySelector(`.public-offer__item-descr[data-text="${activeTab.dataset.theme}"]`)?.classList.remove("active");
            }

            this.classList.add("active");
            descr.classList.add("active");
            activeTab = this;
         } else {
            this.classList.toggle("active");
            descr.classList.toggle("active");
         }
      });
   });

   window.addEventListener("resize", updateLayout);
   updateLayout();
});

/*------------------------------
Видео-отзывы слайдер
---------------------------*/
document.addEventListener("DOMContentLoaded", function () {
   let swiperInstance = null;

   function initSwiper() {
      if (window.innerWidth <= 1000 && !swiperInstance) {
         swiperInstance = new Swiper(".reviews__videos", {
            loop: true,
            speed: 500,
            breakpoints: {
               320: {
                  slidesPerView: 1.1,
                  spaceBetween: 12,
               },
               640: {
                  slidesPerView: 2,
                  spaceBetween: 12,
               },
               768: {
                  slidesPerView: 2,
                  spaceBetween: 20,
               }
            }
         });
      } else if (window.innerWidth > 1000 && swiperInstance) {
         swiperInstance.destroy(true, true);
         swiperInstance = null;
      }
   }

   initSwiper();
   window.addEventListener("resize", initSwiper);

   const videos = document.querySelectorAll(".reviews__video");
   if (!videos.length) return;

   videos.forEach((video) => {
      video.addEventListener("click", function () {
         const iframe = this.querySelector("iframe");
         if (!iframe) return;

         const src = iframe.getAttribute("src");
         if (this.classList.contains("active")) return;

         this.classList.add("active");
         iframe.setAttribute("src", src.includes("autoplay=1") ? src : src + "&autoplay=1");
      });
   });
});

})();

/******/ })()
;