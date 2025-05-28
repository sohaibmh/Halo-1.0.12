"use strict";
(self["webpackChunkHalo"] = self["webpackChunkHalo"] || []).push([["assets_js_theme_page_js"],{

/***/ "./assets/js/theme/page.js":
/*!*********************************!*\
  !*** ./assets/js/theme/page.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Page)
/* harmony export */ });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }

var Page = /*#__PURE__*/function (_PageManager) {
  function Page(context) {
    return _PageManager.call(this, context) || this;
  }
  _inheritsLoose(Page, _PageManager);
  var _proto = Page.prototype;
  _proto.onReady = function onReady() {
    this.faqsToggle();
    this.haloMultiMap();
  };
  _proto.faqsToggle = function faqsToggle() {
    $('.halo-faqs-content .card .title').on('click', function (event) {
      event.preventDefault();
      var target = $(event.currentTarget);
      $('.halo-faqs-content .card .title').not(target).removeClass('collapsed');
      if (target.hasClass('collapsed')) {
        target.removeClass('collapsed');
      } else {
        target.addClass('collapsed');
      }
      $('.halo-faqs-content .card').each(function (index, element) {
        if ($('.title', element).hasClass('collapsed')) {
          $(element).find('.collapse').slideDown("slow");
        } else {
          $(element).find('.collapse').slideUp("slow");
        }
      });
    });
  };
  _proto.haloMultiMap = function haloMultiMap() {
    var itemMap = document.querySelectorAll('.halo_maps_elist'),
      thisMap = document.querySelector('#haloMap');
    if (itemMap) {
      itemMap.forEach(function (item) {
        item.addEventListener('click', function () {
          document.querySelector('.map-active').classList.remove('map-active');
          mapItemClick(item);
        });
      });
    }
    ;
    function mapItemClick(item) {
      var mapHtml = item.querySelector('.map-hidden').innerHTML;
      item.classList.add('map-active');
      thisMap.innerHTML = mapHtml;
    }
  };
  return Page;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLmFzc2V0c19qc190aGVtZV9wYWdlX2pzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXlDO0FBQUEsSUFFcEJDLElBQUksMEJBQUFDLFlBQUE7RUFDckIsU0FBQUQsS0FBWUUsT0FBTyxFQUFFO0lBQUEsT0FDakJELFlBQUEsQ0FBQUUsSUFBQSxPQUFNRCxPQUFPLENBQUM7RUFDbEI7RUFBQ0UsY0FBQSxDQUFBSixJQUFBLEVBQUFDLFlBQUE7RUFBQSxJQUFBSSxNQUFBLEdBQUFMLElBQUEsQ0FBQU0sU0FBQTtFQUFBRCxNQUFBLENBRURFLE9BQU8sR0FBUCxTQUFBQSxPQUFPQSxDQUFBLEVBQUc7SUFDTixJQUFJLENBQUNDLFVBQVUsQ0FBQyxDQUFDO0lBQ2pCLElBQUksQ0FBQ0MsWUFBWSxDQUFDLENBQUM7RUFDdkIsQ0FBQztFQUFBSixNQUFBLENBRURHLFVBQVUsR0FBVixTQUFBQSxVQUFVQSxDQUFBLEVBQUc7SUFDVEUsQ0FBQyxDQUFDLGlDQUFpQyxDQUFDLENBQUNDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBQUMsS0FBSyxFQUFJO01BQ3REQSxLQUFLLENBQUNDLGNBQWMsQ0FBQyxDQUFDO01BRXRCLElBQUlDLE1BQU0sR0FBR0osQ0FBQyxDQUFDRSxLQUFLLENBQUNHLGFBQWEsQ0FBQztNQUVuQ0wsQ0FBQyxDQUFDLGlDQUFpQyxDQUFDLENBQUNNLEdBQUcsQ0FBQ0YsTUFBTSxDQUFDLENBQUNHLFdBQVcsQ0FBQyxXQUFXLENBQUM7TUFFekUsSUFBR0gsTUFBTSxDQUFDSSxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUM7UUFDNUJKLE1BQU0sQ0FBQ0csV0FBVyxDQUFDLFdBQVcsQ0FBQztNQUNuQyxDQUFDLE1BQUs7UUFDRkgsTUFBTSxDQUFDSyxRQUFRLENBQUMsV0FBVyxDQUFDO01BQ2hDO01BRUFULENBQUMsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDVSxJQUFJLENBQUMsVUFBQ0MsS0FBSyxFQUFFQyxPQUFPLEVBQUs7UUFDbkQsSUFBR1osQ0FBQyxDQUFDLFFBQVEsRUFBRVksT0FBTyxDQUFDLENBQUNKLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBQztVQUMxQ1IsQ0FBQyxDQUFDWSxPQUFPLENBQUMsQ0FBQ0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDQyxTQUFTLENBQUMsTUFBTSxDQUFDO1FBQ2xELENBQUMsTUFBSztVQUNGZCxDQUFDLENBQUNZLE9BQU8sQ0FBQyxDQUFDQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUNFLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDaEQ7TUFDSixDQUFDLENBQUM7SUFDTixDQUFDLENBQUM7RUFDTixDQUFDO0VBQUFwQixNQUFBLENBRURJLFlBQVksR0FBWixTQUFBQSxZQUFZQSxDQUFBLEVBQUc7SUFDakIsSUFBSWlCLE9BQU8sR0FBR0MsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQztNQUMxREMsT0FBTyxHQUFHRixRQUFRLENBQUNHLGFBQWEsQ0FBQyxVQUFVLENBQUM7SUFFN0MsSUFBSUosT0FBTyxFQUFFO01BQ1pBLE9BQU8sQ0FBQ0ssT0FBTyxDQUFDLFVBQUFDLElBQUksRUFBSTtRQUN2QkEsSUFBSSxDQUFDQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBTTtVQUNwQ04sUUFBUSxDQUFDRyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUNJLFNBQVMsQ0FBQ0MsTUFBTSxDQUFDLFlBQVksQ0FBQztVQUNwRUMsWUFBWSxDQUFDSixJQUFJLENBQUM7UUFDbkIsQ0FBQyxDQUFDO01BQ0gsQ0FDRCxDQUFDO0lBQUE7SUFBQztJQUVGLFNBQVNJLFlBQVlBLENBQUNKLElBQUksRUFBQztNQUMxQixJQUFNSyxPQUFPLEdBQUdMLElBQUksQ0FBQ0YsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDUSxTQUFTO01BRTNETixJQUFJLENBQUNFLFNBQVMsQ0FBQ0ssR0FBRyxDQUFDLFlBQVksQ0FBQztNQUNoQ1YsT0FBTyxDQUFDUyxTQUFTLEdBQUdELE9BQU87SUFDNUI7RUFDRSxDQUFDO0VBQUEsT0FBQXJDLElBQUE7QUFBQSxFQXJENkJELHFEQUFXIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vSGFsby8uL2Fzc2V0cy9qcy90aGVtZS9wYWdlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYWdlTWFuYWdlciBmcm9tICcuL3BhZ2UtbWFuYWdlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhZ2UgZXh0ZW5kcyBQYWdlTWFuYWdlciB7XG4gICAgY29uc3RydWN0b3IoY29udGV4dCkge1xuICAgICAgICBzdXBlcihjb250ZXh0KTtcbiAgICB9XG5cbiAgICBvblJlYWR5KCkge1xuICAgICAgICB0aGlzLmZhcXNUb2dnbGUoKTtcbiAgICAgICAgdGhpcy5oYWxvTXVsdGlNYXAoKTtcbiAgICB9XG5cbiAgICBmYXFzVG9nZ2xlKCkge1xuICAgICAgICAkKCcuaGFsby1mYXFzLWNvbnRlbnQgLmNhcmQgLnRpdGxlJykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdmFyIHRhcmdldCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XG5cbiAgICAgICAgICAgICQoJy5oYWxvLWZhcXMtY29udGVudCAuY2FyZCAudGl0bGUnKS5ub3QodGFyZ2V0KS5yZW1vdmVDbGFzcygnY29sbGFwc2VkJyk7XG5cbiAgICAgICAgICAgIGlmKHRhcmdldC5oYXNDbGFzcygnY29sbGFwc2VkJykpe1xuICAgICAgICAgICAgICAgIHRhcmdldC5yZW1vdmVDbGFzcygnY29sbGFwc2VkJyk7XG4gICAgICAgICAgICB9IGVsc2V7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LmFkZENsYXNzKCdjb2xsYXBzZWQnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJCgnLmhhbG8tZmFxcy1jb250ZW50IC5jYXJkJykuZWFjaCgoaW5kZXgsIGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZigkKCcudGl0bGUnLCBlbGVtZW50KS5oYXNDbGFzcygnY29sbGFwc2VkJykpe1xuICAgICAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLmZpbmQoJy5jb2xsYXBzZScpLnNsaWRlRG93bihcInNsb3dcIik7XG4gICAgICAgICAgICAgICAgfSBlbHNle1xuICAgICAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLmZpbmQoJy5jb2xsYXBzZScpLnNsaWRlVXAoXCJzbG93XCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBoYWxvTXVsdGlNYXAoKSB7XG5cdFx0dmFyIGl0ZW1NYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaGFsb19tYXBzX2VsaXN0JyksXG5cdFx0XHR0aGlzTWFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2hhbG9NYXAnKTtcblxuXHRcdGlmIChpdGVtTWFwKSB7XG5cdFx0XHRpdGVtTWFwLmZvckVhY2goaXRlbSA9PiB7XG5cdFx0XHRcdGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdFx0XHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1hcC1hY3RpdmUnKS5jbGFzc0xpc3QucmVtb3ZlKCdtYXAtYWN0aXZlJyk7XG5cdFx0XHRcdFx0bWFwSXRlbUNsaWNrKGl0ZW0pXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdCl9O1xuXG5cdFx0ZnVuY3Rpb24gbWFwSXRlbUNsaWNrKGl0ZW0pe1xuXHRcdFx0Y29uc3QgbWFwSHRtbCA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLm1hcC1oaWRkZW4nKS5pbm5lckhUTUw7XG5cdFx0XHRcblx0XHRcdGl0ZW0uY2xhc3NMaXN0LmFkZCgnbWFwLWFjdGl2ZScpO1xuXHRcdFx0dGhpc01hcC5pbm5lckhUTUwgPSBtYXBIdG1sO1xuXHRcdH1cbiAgICB9XG59XG4iXSwibmFtZXMiOlsiUGFnZU1hbmFnZXIiLCJQYWdlIiwiX1BhZ2VNYW5hZ2VyIiwiY29udGV4dCIsImNhbGwiLCJfaW5oZXJpdHNMb29zZSIsIl9wcm90byIsInByb3RvdHlwZSIsIm9uUmVhZHkiLCJmYXFzVG9nZ2xlIiwiaGFsb011bHRpTWFwIiwiJCIsIm9uIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsInRhcmdldCIsImN1cnJlbnRUYXJnZXQiLCJub3QiLCJyZW1vdmVDbGFzcyIsImhhc0NsYXNzIiwiYWRkQ2xhc3MiLCJlYWNoIiwiaW5kZXgiLCJlbGVtZW50IiwiZmluZCIsInNsaWRlRG93biIsInNsaWRlVXAiLCJpdGVtTWFwIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwidGhpc01hcCIsInF1ZXJ5U2VsZWN0b3IiLCJmb3JFYWNoIiwiaXRlbSIsImFkZEV2ZW50TGlzdGVuZXIiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJtYXBJdGVtQ2xpY2siLCJtYXBIdG1sIiwiaW5uZXJIVE1MIiwiYWRkIiwiZGVmYXVsdCJdLCJzb3VyY2VSb290IjoiIn0=