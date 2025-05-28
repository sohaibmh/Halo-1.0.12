"use strict";
(self["webpackChunkHalo"] = self["webpackChunkHalo"] || []).push([["assets_js_theme_brands_js"],{

/***/ "./assets/js/theme/brands.js":
/*!***********************************!*\
  !*** ./assets/js/theme/brands.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Brands)
/* harmony export */ });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _halothemes_haloAZBrands__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./halothemes/haloAZBrands */ "./assets/js/theme/halothemes/haloAZBrands.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }


var Brands = /*#__PURE__*/function (_PageManager) {
  function Brands(context) {
    return _PageManager.call(this, context) || this;
  }
  _inheritsLoose(Brands, _PageManager);
  var _proto = Brands.prototype;
  _proto.onReady = function onReady() {
    if ($('#haloAZBrandsTable').length) {
      (0,_halothemes_haloAZBrands__WEBPACK_IMPORTED_MODULE_1__["default"])(this.context);
    }
  };
  return Brands;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./assets/js/theme/halothemes/haloAZBrands.js":
/*!****************************************************!*\
  !*** ./assets/js/theme/halothemes/haloAZBrands.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(context) {
  var azWrapper = $('#haloAZBrandsWrapper'),
    azNavigation = $('#haloAZBrandsTable');
  var requestOptions = {
    config: {
      brands: {
        limit: context.themeSettings.brandpage_brands_per_page
      }
    },
    template: 'halothemes/brand/halo-all-brands'
  };
  if (context.themeSettings.halo_brandAZlayout == true) {
    getAllBrand();
    brandNavigationEvent();
  }
  function getAllBrand() {
    azWrapper.addClass('is-loading');
    var url = context.urls.brands;
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.getPage(url, requestOptions, function (error, response) {
      if (error) {
        return '';
      }
      var list = $(response);
      parseListBrand(list);
      var nextUrl = list.data('brands-list-next');
      if (nextUrl) {
        loadMoreBrands(nextUrl);
      } else {
        azWrapper.removeClass('is-loading');
      }
    });
  }
  function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
  }
  function brandNavigationEvent() {
    azNavigation.on('click', 'a', function (event) {
      event.preventDefault();
      var $target = $(event.currentTarget);
      azNavigation.children('li').removeClass('is-active');
      $target.parent().addClass('is-active');
      var letter = $target.data('href');
      if (letter !== undefined || letter) {
        azWrapper.removeClass('active-all');
        azWrapper.find('.azBrands-group').removeClass('is-active');
        azWrapper.find('[data-letter=' + letter + ']').addClass('is-active');
      } else {
        azWrapper.addClass('active-all');
      }
    });
  }
  function parseListBrand(list) {
    azWrapper.find('.azBrands-group').each(function (index, element) {
      var letter = $(element).data('letter');
      if (!isLetter(letter)) {
        for (var i = 0; i < 10; i++) {
          $('.azBrands-group-list', element).append(list.find('[data-brand-letter=' + i + ']'));
        }
      } else {
        $('.azBrands-group-list', element).append(list.find('[data-brand-letter=' + letter + ']'));
      }
      if ($('.azBrands-group-list', element).children().length > 0) {
        azNavigation.find('[data-letter=' + letter + ']').removeClass('disable').addClass('has-letter');
      }
    });
  }
  function loadMoreBrands(url) {
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.getPage(url, requestOptions, function (error, response) {
      if (error) {
        return '';
      }
      var list = $(response);
      parseListBrand(list);
      var nextUrl = list.data('brands-list-next');
      if (nextUrl) {
        loadMoreBrands(nextUrl);
      } else {
        azWrapper.removeClass('is-loading');
      }
    });
  }
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLmFzc2V0c19qc190aGVtZV9icmFuZHNfanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXlDO0FBQ1k7QUFBQSxJQUVoQ0UsTUFBTSwwQkFBQUMsWUFBQTtFQUMxQixTQUFBRCxPQUFZRSxPQUFPLEVBQUU7SUFBQSxPQUNkRCxZQUFBLENBQUFFLElBQUEsT0FBTUQsT0FBTyxDQUFDO0VBQ2xCO0VBQUNFLGNBQUEsQ0FBQUosTUFBQSxFQUFBQyxZQUFBO0VBQUEsSUFBQUksTUFBQSxHQUFBTCxNQUFBLENBQUFNLFNBQUE7RUFBQUQsTUFBQSxDQUVKRSxPQUFPLEdBQVAsU0FBQUEsT0FBT0EsQ0FBQSxFQUFHO0lBQ0gsSUFBSUMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUNDLE1BQU0sRUFBRTtNQUN0Q1Ysb0VBQVksQ0FBQyxJQUFJLENBQUNHLE9BQU8sQ0FBQztJQUN4QjtFQUNKLENBQUM7RUFBQSxPQUFBRixNQUFBO0FBQUEsRUFUK0JGLHFEQUFXOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0hBO0FBRS9DLDZCQUFlLG9DQUFVSSxPQUFPLEVBQUU7RUFDOUIsSUFBTVUsU0FBUyxHQUFHSixDQUFDLENBQUMsc0JBQXNCLENBQUM7SUFDdkNLLFlBQVksR0FBR0wsQ0FBQyxDQUFDLG9CQUFvQixDQUFDO0VBRTFDLElBQU1NLGNBQWMsR0FBRztJQUNuQkMsTUFBTSxFQUFFO01BQ0pDLE1BQU0sRUFBRTtRQUNKQyxLQUFLLEVBQUVmLE9BQU8sQ0FBQ2dCLGFBQWEsQ0FBQ0M7TUFDakM7SUFDSixDQUFDO0lBQ0RDLFFBQVEsRUFBRTtFQUNkLENBQUM7RUFFRCxJQUFJbEIsT0FBTyxDQUFDZ0IsYUFBYSxDQUFDRyxrQkFBa0IsSUFBSSxJQUFJLEVBQUU7SUFDbERDLFdBQVcsQ0FBQyxDQUFDO0lBQ2JDLG9CQUFvQixDQUFDLENBQUM7RUFDMUI7RUFFQSxTQUFTRCxXQUFXQSxDQUFBLEVBQUU7SUFDbEJWLFNBQVMsQ0FBQ1ks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LEdBQUMsR0FBRyxDQUFDLENBQUM7TUFDMUY7TUFFQSxJQUFHdkMsQ0FBQyxDQUFDLHNCQUFzQixFQUFFNEMsT0FBTyxDQUFDLENBQUNQLFFBQVEsQ0FBQyxDQUFDLENBQUNwQyxNQUFNLEdBQUcsQ0FBQyxFQUFDO1FBQ3hESSxZQUFZLENBQUNvQyxJQUFJLENBQUMsZUFBZSxHQUFDRixNQUFNLEdBQUMsR0FBRyxDQUFDLENBQUNYLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQ1osUUFBUSxDQUFDLFlBQVksQ0FBQztNQUMvRjtJQUNKLENBQUMsQ0FBQztFQUNOO0VBRUEsU0FBU1csY0FBY0EsQ0FBQ1YsR0FBRyxFQUFFO0lBQ3pCZCxzRUFBUyxDQUFDaUIsT0FBTyxDQUFDSCxHQUFHLEVBQUVYLGNBQWMsRUFBRSxVQUFDZSxLQUFLLEVBQUVDLFFBQVEsRUFBSztNQUN4RCxJQUFJRCxLQUFLLEVBQUU7UUFDUCxPQUFPLEVBQUU7TUFDYjtNQUVBLElBQUlFLElBQUksR0FBR3ZCLENBQUMsQ0FBQ3NCLFFBQVEsQ0FBQztNQUV0QkUsY0FBYyxDQUFDRCxJQUFJLENBQUM7TUFFcEIsSUFBTUUsT0FBTyxHQUFHRixJQUFJLENBQUNHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztNQUU3QyxJQUFJRCxPQUFPLEVBQUU7UUFDVEUsY0FBYyxDQUFDRixPQUFPLENBQUM7TUFDM0IsQ0FBQyxNQUFLO1FBQ0ZyQixTQUFTLENBQUN3QixXQUFXLENBQUMsWUFBWSxDQUFDO01BQ3ZDO0lBQ0osQ0FBQyxDQUFDO0VBQ047QUFDSiIsInNvdXJjZXMiOlsid2VicGFjazovL0hhbG8vLi9hc3NldHMvanMvdGhlbWUvYnJhbmRzLmpzIiwid2VicGFjazovL0hhbG8vLi9hc3NldHMvanMvdGhlbWUvaGFsb3RoZW1lcy9oYWxvQVpCcmFuZHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBhZ2VNYW5hZ2VyIGZyb20gJy4vcGFnZS1tYW5hZ2VyJztcbmltcG9ydCBoYWxvQVpCcmFuZHMgZnJvbSAnLi9oYWxvdGhlbWVzL2hhbG9BWkJyYW5kcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJyYW5kcyBleHRlbmRzIFBhZ2VNYW5hZ2VyIHtcblx0Y29uc3RydWN0b3IoY29udGV4dCkge1xuICAgICAgICBzdXBlcihjb250ZXh0KTtcbiAgICB9XG4gICAgXG5cdG9uUmVhZHkoKSB7XG4gICAgICAgIGlmICgkKCcjaGFsb0FaQnJhbmRzVGFibGUnKS5sZW5ndGgpIHtcblx0XHQgICAgaGFsb0FaQnJhbmRzKHRoaXMuY29udGV4dCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgdXRpbHMgZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgIGNvbnN0IGF6V3JhcHBlciA9ICQoJyNoYWxvQVpCcmFuZHNXcmFwcGVyJyksXG4gICAgICAgIGF6TmF2aWdhdGlvbiA9ICQoJyNoYWxvQVpCcmFuZHNUYWJsZScpO1xuXG4gICAgY29uc3QgcmVxdWVzdE9wdGlvbnMgPSB7XG4gICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgYnJhbmRzOiB7XG4gICAgICAgICAgICAgICAgbGltaXQ6IGNvbnRleHQudGhlbWVTZXR0aW5ncy5icmFuZHBhZ2VfYnJhbmRzX3Blcl9wYWdlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHRlbXBsYXRlOiAnaGFsb3RoZW1lcy9icmFuZC9oYWxvLWFsbC1icmFuZHMnLFxuICAgIH07XG5cbiAgICBpZiAoY29udGV4dC50aGVtZVNldHRpbmdzLmhhbG9fYnJhbmRBWmxheW91dCA9PSB0cnVlKSB7XG4gICAgICAgIGdldEFsbEJyYW5kKCk7XG4gICAgICAgIGJyYW5kTmF2aWdhdGlvbkV2ZW50KCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0QWxsQnJhbmQoKXtcbiAgICAgICAgYXpXcmFwcGVyLmFkZENsYXNzKCdpcy1sb2FkaW5nJyk7XG5cbiAgICAgICAgY29uc3QgdXJsID0gY29udGV4dC51cmxzLmJyYW5kcztcblxuICAgICAgICB1dGlscy5hcGkuZ2V0UGFnZSh1cmwsIHJlcXVlc3RPcHRpb25zLCAoZXJyb3IsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBsaXN0ID0gJChyZXNwb25zZSk7XG5cbiAgICAgICAgICAgIHBhcnNlTGlzdEJyYW5kKGxpc3QpO1xuXG4gICAgICAgICAgICBjb25zdCBuZXh0VXJsID0gbGlzdC5kYXRhKCdicmFuZHMtbGlzdC1uZXh0Jyk7XG5cbiAgICAgICAgICAgIGlmIChuZXh0VXJsKSB7XG4gICAgICAgICAgICAgICAgbG9hZE1vcmVCcmFuZHMobmV4dFVybCk7XG4gICAgICAgICAgICB9IGVsc2V7XG4gICAgICAgICAgICAgICAgYXpXcmFwcGVyLnJlbW92ZUNsYXNzKCdpcy1sb2FkaW5nJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzTGV0dGVyKHN0cikge1xuICAgICAgICByZXR1cm4gc3RyLmxlbmd0aCA9PT0gMSAmJiBzdHIubWF0Y2goL1thLXpdL2kpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJyYW5kTmF2aWdhdGlvbkV2ZW50KCl7XG4gICAgICAgIGF6TmF2aWdhdGlvbi5vbignY2xpY2snLCAnYScsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgY29uc3QgJHRhcmdldCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XG5cbiAgICAgICAgICAgIGF6TmF2aWdhdGlvbi5jaGlsZHJlbignbGknKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG5cbiAgICAgICAgICAgICR0YXJnZXQucGFyZW50KCkuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuXG4gICAgICAgICAgICBjb25zdCBsZXR0ZXIgPSAkdGFyZ2V0LmRhdGEoJ2hyZWYnKTtcblxuICAgICAgICAgICAgaWYgKGxldHRlciAhPT0gdW5kZWZpbmVkIHx8IGxldHRlcikge1xuICAgICAgICAgICAgICAgIGF6V3JhcHBlci5yZW1vdmVDbGFzcygnYWN0aXZlLWFsbCcpO1xuICAgICAgICAgICAgICAgIGF6V3JhcHBlci5maW5kKCcuYXpCcmFuZHMtZ3JvdXAnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgYXpXcmFwcGVyLmZpbmQoJ1tkYXRhLWxldHRlcj0nK2xldHRlcisnXScpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYXpXcmFwcGVyLmFkZENsYXNzKCdhY3RpdmUtYWxsJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlTGlzdEJyYW5kKGxpc3Qpe1xuICAgICAgICBheldyYXBwZXIuZmluZCgnLmF6QnJhbmRzLWdyb3VwJykuZWFjaCgoaW5kZXgsIGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIHZhciBsZXR0ZXIgPSAkKGVsZW1lbnQpLmRhdGEoJ2xldHRlcicpO1xuXG4gICAgICAgICAgICBpZighaXNMZXR0ZXIobGV0dGVyKSl7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5hekJyYW5kcy1ncm91cC1saXN0JywgZWxlbWVudCkuYXBwZW5kKGxpc3QuZmluZCgnW2RhdGEtYnJhbmQtbGV0dGVyPScraSsnXScpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoJy5hekJyYW5kcy1ncm91cC1saXN0JywgZWxlbWVudCkuYXBwZW5kKGxpc3QuZmluZCgnW2RhdGEtYnJhbmQtbGV0dGVyPScrbGV0dGVyKyddJykpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZigkKCcuYXpCcmFuZHMtZ3JvdXAtbGlzdCcsIGVsZW1lbnQpLmNoaWxkcmVuKCkubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgYXpOYXZpZ2F0aW9uLmZpbmQoJ1tkYXRhLWxldHRlcj0nK2xldHRlcisnXScpLnJlbW92ZUNsYXNzKCdkaXNhYmxlJykuYWRkQ2xhc3MoJ2hhcy1sZXR0ZXInKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9hZE1vcmVCcmFuZHModXJsKSB7XG4gICAgICAgIHV0aWxzLmFwaS5nZXRQYWdlKHVybCwgcmVxdWVzdE9wdGlvbnMsIChlcnJvciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGxpc3QgPSAkKHJlc3BvbnNlKTtcblxuICAgICAgICAgICAgcGFyc2VMaXN0QnJhbmQobGlzdCk7XG5cbiAgICAgICAgICAgIGNvbnN0IG5leHRVcmwgPSBsaXN0LmRhdGEoJ2JyYW5kcy1saXN0LW5leHQnKTtcblxuICAgICAgICAgICAgaWYgKG5leHRVcmwpIHtcbiAgICAgICAgICAgICAgICBsb2FkTW9yZUJyYW5kcyhuZXh0VXJsKTtcbiAgICAgICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgICAgICBheldyYXBwZXIucmVtb3ZlQ2xhc3MoJ2lzLWxvYWRpbmcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl0sIm5hbWVzIjpbIlBhZ2VNYW5hZ2VyIiwiaGFsb0FaQnJhbmRzIiwiQnJhbmRzIiwiX1BhZ2VNYW5hZ2VyIiwiY29udGV4dCIsImNhbGwiLCJfaW5oZXJpdHNMb29zZSIsIl9wcm90byIsInByb3RvdHlwZSIsIm9uUmVhZHkiLCIkIiwibGVuZ3RoIiwiZGVmYXVsdCIsInV0aWxzIiwiYXpXcmFwcGVyIiwiYXpOYXZpZ2F0aW9uIiwicmVxdWVzdE9wdGlvbnMiLCJjb25maWciLCJicmFuZHMiLCJsaW1pdCIsInRoZW1lU2V0dGluZ3MiLCJicmFuZHBhZ2VfYnJhbmRzX3Blcl9wYWdlIiwidGVtcGxhdGUiLCJoYWxvX2JyYW5kQVpsYXlvdXQiLCJnZXRBbGxCcmFuZCIsImJyYW5kTmF2aWdhdGlvbkV2ZW50IiwiYWRkQ2xhc3MiLCJ1cmwiLCJ1cmxzIiwiYXBpIiwiZ2V0UGFnZSIsImVycm9yIiwicmVzcG9uc2UiLCJsaXN0IiwicGFyc2VMaXN0QnJhbmQiLCJuZXh0VXJsIiwiZGF0YSIsImxvYWRNb3JlQnJhbmRzIiwicmVtb3ZlQ2xhc3MiLCJpc0xldHRlciIsInN0ciIsIm1hdGNoIiwib24iLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiJHRhcmdldCIsImN1cnJlbnRUYXJnZXQiLCJjaGlsZHJlbiIsInBhcmVudCIsImxldHRlciIsInVuZGVmaW5lZCIsImZpbmQiLCJlYWNoIiwiaW5kZXgiLCJlbGVtZW50IiwiaSIsImFwcGVuZCJdLCJzb3VyY2VSb290IjoiIn0=