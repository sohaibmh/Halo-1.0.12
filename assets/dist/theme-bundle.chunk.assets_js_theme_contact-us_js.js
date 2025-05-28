"use strict";
(self["webpackChunkHalo"] = self["webpackChunkHalo"] || []).push([["assets_js_theme_contact-us_js"],{

/***/ "./assets/js/theme/contact-us.js":
/*!***************************************!*\
  !*** ./assets/js/theme/contact-us.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ContactUs)
/* harmony export */ });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _common_models_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/models/forms */ "./assets/js/theme/common/models/forms.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }




var ContactUs = /*#__PURE__*/function (_PageManager) {
  function ContactUs() {
    return _PageManager.apply(this, arguments) || this;
  }
  _inheritsLoose(ContactUs, _PageManager);
  var _proto = ContactUs.prototype;
  _proto.onReady = function onReady() {
    this.registerContactFormValidation();
    this.faqsToggle();
  };
  _proto.registerContactFormValidation = function registerContactFormValidation() {
    var formSelector = 'form[data-contact-form]';
    var contactUsValidator = (0,_common_nod__WEBPACK_IMPORTED_MODULE_1__["default"])({
      submit: formSelector + " input[type=\"submit\"]",
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__.announceInputErrorMessage
    });
    var $contactForm = $(formSelector);
    contactUsValidator.add([{
      selector: formSelector + " input[name=\"contact_email\"]",
      validate: function validate(cb, val) {
        var result = _common_models_forms__WEBPACK_IMPORTED_MODULE_2__["default"].email(val);
        cb(result);
      },
      errorMessage: this.context.contactEmail
    }, {
      selector: formSelector + " textarea[name=\"contact_question\"]",
      validate: function validate(cb, val) {
        var result = _common_models_forms__WEBPACK_IMPORTED_MODULE_2__["default"].notEmpty(val);
        cb(result);
      },
      errorMessage: this.context.contactQuestion
    }]);
    $contactForm.on('submit', function (event) {
      contactUsValidator.performCheck();
      if (contactUsValidator.areAll('valid')) {
        return;
      }
      event.preventDefault();
    });
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
  return ContactUs;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLmFzc2V0c19qc190aGVtZV9jb250YWN0LXVzX2pzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXlDO0FBQ1Y7QUFDVztBQUM0QjtBQUFBLElBRWpESSxTQUFTLDBCQUFBQyxZQUFBO0VBQUEsU0FBQUQsVUFBQTtJQUFBLE9BQUFDLFlBQUEsQ0FBQUMsS0FBQSxPQUFBQyxTQUFBO0VBQUE7RUFBQUMsY0FBQSxDQUFBSixTQUFBLEVBQUFDLFlBQUE7RUFBQSxJQUFBSSxNQUFBLEdBQUFMLFNBQUEsQ0FBQU0sU0FBQTtFQUFBRCxNQUFBLENBQzFCRSxPQUFPLEdBQVAsU0FBQUEsT0FBT0EsQ0FBQSxFQUFHO0lBQ04sSUFBSSxDQUFDQyw2QkFBNkIsQ0FBQyxDQUFDO0lBQ3BDLElBQUksQ0FBQ0MsVUFBVSxDQUFDLENBQUM7RUFDckIsQ0FBQztFQUFBSixNQUFBLENBRURHLDZCQUE2QixHQUE3QixTQUFBQSw2QkFBNkJBLENBQUEsRUFBRztJQUM1QixJQUFNRSxZQUFZLEdBQUcseUJBQXlCO0lBQzlDLElBQU1DLGtCQUFrQixHQUFHZCx1REFBRyxDQUFDO01BQzNCZSxNQUFNLEVBQUtGLFlBQVksNEJBQXVCO01BQzlDRyxHQUFHLEVBQUVkLCtFQUF5QkE7SUFDbEMsQ0FBQyxDQUFDO0lBQ0YsSUFBTWUsWUFBWSxHQUFHQyxDQUFDLENBQUNMLFlBQVksQ0FBQztJQUVwQ0Msa0JBQWtCLENBQUNLLEdBQUcsQ0FBQyxDQUNuQjtNQUNJQyxRQUFRLEVBQUtQLFlBQVksbUNBQThCO01BQ3ZEUSxRQUFRLEVBQUUsU0FBVkEsUUFBUUEsQ0FBR0MsRUFBRSxFQUFFQyxHQUFHLEVBQUs7UUFDbkIsSUFBTUMsTUFBTSxHQUFHdkIsNERBQUssQ0FBQ3dCLEtBQUssQ0FBQ0YsR0FBRyxDQUFDO1FBRS9CRCxFQUFFLENBQUNFLE1BQU0sQ0FBQztNQUNkLENBQUM7TUFDREUsWUFBWSxFQUFFLElBQUksQ0FBQ0MsT0FBTyxDQUFDQztJQUMvQixDQUFDLEVBQ0Q7TUFDSVIsUUFBUSxFQUFLUCxZQUFZLHlDQUFvQztNQUM3RFEsUUFBUSxFQUFFLFNBQVZBLFFBQVFBLENBQUdDLEVBQUUsRUFBRUMsR0FBRyxFQUFLO1FBQ25CLElBQU1DLE1BQU0sR0FBR3ZCLDREQUFLLENBQUM0QixRQUFRLENBQUNOLEdBQUcsQ0FBQztRQUVsQ0QsRUFBRSxDQUFDRSxNQUFNLENBQUM7TUFDZCxDQUFDO01BQ0RFLFlBQVksRUFBRSxJQUFJLENBQUNDLE9BQU8sQ0FBQ0c7SUFDL0IsQ0FBQyxDQUNKLENBQUM7SUFFRmIsWUFBWSxDQUFDYyxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQUFDLEtBQUssRUFBSTtNQUMvQmxCLGtCQUFrQixDQUFDbUIsWUFBWSxDQUFDLENBQUM7TUFFakMsSUFBSW5CLGtCQUFrQixDQUFDb0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ3BDO01BQ0o7TUFFQUYsS0FBSyxDQUFDRyxjQUFjLENBQUMsQ0FBQztJQUMxQixDQUFDLENBQUM7RUFDTixDQUFDO0VBQUEzQixNQUFBLENBRURJLFVBQVUsR0FBVixTQUFBQSxVQUFVQSxDQUFBLEVBQUc7SUFDVE0sQ0FBQyxDQUFDLGlDQUFpQyxDQUFDLENBQUNhLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBQUMsS0FBSyxFQUFJO01BQ3REQSxLQUFLLENBQUNHLGNBQWMsQ0FBQyxDQUFDO01BRXRCLElBQUlDLE1BQU0sR0FBR2xCLENBQUMsQ0FBQ2MsS0FBSyxDQUFDSyxhQUFhLENBQUM7TUFFbkNuQixDQUFDLENBQUMsaUNBQWlDLENBQUMsQ0FBQ29CLEdBQUcsQ0FBQ0YsTUFBTSxDQUFDLENBQUNHLFdBQVcsQ0FBQyxXQUFXLENBQUM7TUFFekUsSUFBR0gsTUFBTSxDQUFDSSxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUM7UUFDNUJKLE1BQU0sQ0FBQ0csV0FBVyxDQUFDLFdBQVcsQ0FBQztNQUNuQyxDQUFDLE1BQUs7UUFDRkgsTUFBTSxDQUFDSyxRQUFRLENBQUMsV0FBVyxDQUFDO01BQ2hDO01BRUF2QixDQUFDLENBQUMsMEJBQTBCLENBQUMsQ0FBQ3dCLElBQUksQ0FBQyxVQUFDQyxLQUFLLEVBQUVDLE9BQU8sRUFBSztRQUNuRCxJQUFHMUIsQ0FBQyxDQUFDLFFBQVEsRUFBRTBCLE9BQU8sQ0FBQyxDQUFDSixRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUM7VUFDMUN0QixDQUFDLENBQUMwQixPQUFPLENBQUMsQ0FBQ0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDQyxTQUFTLENBQUMsTUFBTSxDQUFDO1FBQ2xELENBQUMsTUFBSztVQUNGNUIsQ0FBQyxDQUFDMEIsT0FBTyxDQUFDLENBQUNDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQ0UsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUNoRDtNQUNKLENBQUMsQ0FBQztJQUNOLENBQUMsQ0FBQztFQUNOLENBQUM7RUFBQSxPQUFBNUMsU0FBQTtBQUFBLEVBcEVrQ0oscURBQVciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9IYWxvLy4vYXNzZXRzL2pzL3RoZW1lL2NvbnRhY3QtdXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBhZ2VNYW5hZ2VyIGZyb20gJy4vcGFnZS1tYW5hZ2VyJztcbmltcG9ydCBub2QgZnJvbSAnLi9jb21tb24vbm9kJztcbmltcG9ydCBmb3JtcyBmcm9tICcuL2NvbW1vbi9tb2RlbHMvZm9ybXMnO1xuaW1wb3J0IHsgYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSB9IGZyb20gJy4vY29tbW9uL3V0aWxzL2Zvcm0tdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250YWN0VXMgZXh0ZW5kcyBQYWdlTWFuYWdlciB7XG4gICAgb25SZWFkeSgpIHtcbiAgICAgICAgdGhpcy5yZWdpc3RlckNvbnRhY3RGb3JtVmFsaWRhdGlvbigpO1xuICAgICAgICB0aGlzLmZhcXNUb2dnbGUoKTtcbiAgICB9XG5cbiAgICByZWdpc3RlckNvbnRhY3RGb3JtVmFsaWRhdGlvbigpIHtcbiAgICAgICAgY29uc3QgZm9ybVNlbGVjdG9yID0gJ2Zvcm1bZGF0YS1jb250YWN0LWZvcm1dJztcbiAgICAgICAgY29uc3QgY29udGFjdFVzVmFsaWRhdG9yID0gbm9kKHtcbiAgICAgICAgICAgIHN1Ym1pdDogYCR7Zm9ybVNlbGVjdG9yfSBpbnB1dFt0eXBlPVwic3VibWl0XCJdYCxcbiAgICAgICAgICAgIHRhcDogYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0ICRjb250YWN0Rm9ybSA9ICQoZm9ybVNlbGVjdG9yKTtcblxuICAgICAgICBjb250YWN0VXNWYWxpZGF0b3IuYWRkKFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogYCR7Zm9ybVNlbGVjdG9yfSBpbnB1dFtuYW1lPVwiY29udGFjdF9lbWFpbFwiXWAsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGZvcm1zLmVtYWlsKHZhbCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5jb250ZXh0LmNvbnRhY3RFbWFpbCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IGAke2Zvcm1TZWxlY3Rvcn0gdGV4dGFyZWFbbmFtZT1cImNvbnRhY3RfcXVlc3Rpb25cIl1gLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBmb3Jtcy5ub3RFbXB0eSh2YWwpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5jb250YWN0UXVlc3Rpb24sXG4gICAgICAgICAgICB9LFxuICAgICAgICBdKTtcblxuICAgICAgICAkY29udGFjdEZvcm0ub24oJ3N1Ym1pdCcsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnRhY3RVc1ZhbGlkYXRvci5wZXJmb3JtQ2hlY2soKTtcblxuICAgICAgICAgICAgaWYgKGNvbnRhY3RVc1ZhbGlkYXRvci5hcmVBbGwoJ3ZhbGlkJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZhcXNUb2dnbGUoKSB7XG4gICAgICAgICQoJy5oYWxvLWZhcXMtY29udGVudCAuY2FyZCAudGl0bGUnKS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcblxuICAgICAgICAgICAgJCgnLmhhbG8tZmFxcy1jb250ZW50IC5jYXJkIC50aXRsZScpLm5vdCh0YXJnZXQpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZWQnKTtcblxuICAgICAgICAgICAgaWYodGFyZ2V0Lmhhc0NsYXNzKCdjb2xsYXBzZWQnKSl7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LnJlbW92ZUNsYXNzKCdjb2xsYXBzZWQnKTtcbiAgICAgICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgICAgICB0YXJnZXQuYWRkQ2xhc3MoJ2NvbGxhcHNlZCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkKCcuaGFsby1mYXFzLWNvbnRlbnQgLmNhcmQnKS5lYWNoKChpbmRleCwgZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmKCQoJy50aXRsZScsIGVsZW1lbnQpLmhhc0NsYXNzKCdjb2xsYXBzZWQnKSl7XG4gICAgICAgICAgICAgICAgICAgICQoZWxlbWVudCkuZmluZCgnLmNvbGxhcHNlJykuc2xpZGVEb3duKFwic2xvd1wiKTtcbiAgICAgICAgICAgICAgICB9IGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICQoZWxlbWVudCkuZmluZCgnLmNvbGxhcHNlJykuc2xpZGVVcChcInNsb3dcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6WyJQYWdlTWFuYWdlciIsIm5vZCIsImZvcm1zIiwiYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSIsIkNvbnRhY3RVcyIsIl9QYWdlTWFuYWdlciIsImFwcGx5IiwiYXJndW1lbnRzIiwiX2luaGVyaXRzTG9vc2UiLCJfcHJvdG8iLCJwcm90b3R5cGUiLCJvblJlYWR5IiwicmVnaXN0ZXJDb250YWN0Rm9ybVZhbGlkYXRpb24iLCJmYXFzVG9nZ2xlIiwiZm9ybVNlbGVjdG9yIiwiY29udGFjdFVzVmFsaWRhdG9yIiwic3VibWl0IiwidGFwIiwiJGNvbnRhY3RGb3JtIiwiJCIsImFkZCIsInNlbGVjdG9yIiwidmFsaWRhdGUiLCJjYiIsInZhbCIsInJlc3VsdCIsImVtYWlsIiwiZXJyb3JNZXNzYWdlIiwiY29udGV4dCIsImNvbnRhY3RFbWFpbCIsIm5vdEVtcHR5IiwiY29udGFjdFF1ZXN0aW9uIiwib24iLCJldmVudCIsInBlcmZvcm1DaGVjayIsImFyZUFsbCIsInByZXZlbnREZWZhdWx0IiwidGFyZ2V0IiwiY3VycmVudFRhcmdldCIsIm5vdCIsInJlbW92ZUNsYXNzIiwiaGFzQ2xhc3MiLCJhZGRDbGFzcyIsImVhY2giLCJpbmRleCIsImVsZW1lbnQiLCJmaW5kIiwic2xpZGVEb3duIiwic2xpZGVVcCIsImRlZmF1bHQiXSwic291cmNlUm9vdCI6IiJ9