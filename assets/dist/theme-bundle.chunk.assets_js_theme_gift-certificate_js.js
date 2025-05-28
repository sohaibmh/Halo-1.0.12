"use strict";
(self["webpackChunkHalo"] = self["webpackChunkHalo"] || []).push([["assets_js_theme_gift-certificate_js"],{

/***/ "./assets/js/theme/gift-certificate.js":
/*!*********************************************!*\
  !*** ./assets/js/theme/gift-certificate.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GiftCertificate)
/* harmony export */ });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/gift-certificate-validator */ "./assets/js/theme/common/gift-certificate-validator.js");
/* harmony import */ var _common_models_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/models/forms */ "./assets/js/theme/common/models/forms.js");
/* harmony import */ var _common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common/utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }








var GiftCertificate = /*#__PURE__*/function (_PageManager) {
  function GiftCertificate(context) {
    var _this;
    _this = _PageManager.call(this, context) || this;
    _this.validationDictionary = (0,_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__.createTranslationDictionary)(context);
    var $certBalanceForm = $('#gift-certificate-balance');
    var purchaseModel = {
      recipientName: function recipientName(val) {
        return val.length;
      },
      recipientEmail: function recipientEmail() {
        return _common_models_forms__WEBPACK_IMPORTED_MODULE_3__["default"].email.apply(_common_models_forms__WEBPACK_IMPORTED_MODULE_3__["default"], arguments);
      },
      senderName: function senderName(val) {
        return val.length;
      },
      senderEmail: function senderEmail() {
        return _common_models_forms__WEBPACK_IMPORTED_MODULE_3__["default"].email.apply(_common_models_forms__WEBPACK_IMPORTED_MODULE_3__["default"], arguments);
      },
      customAmount: function customAmount(value, min, max) {
        return value && value >= min && value <= max;
      },
      setAmount: function setAmount(value, options) {
        var found = false;
        options.forEach(function (option) {
          if (option === value) {
            found = true;
            return false;
          }
        });
        return found;
      }
    };
    var $purchaseForm = $('#gift-certificate-form');
    var $customAmounts = $purchaseForm.find('input[name="certificate_amount"]');
    var purchaseValidator = (0,_common_nod__WEBPACK_IMPORTED_MODULE_1__["default"])({
      submit: '#gift-certificate-form input[type="submit"]',
      delay: 300,
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__.announceInputErrorMessage
    });
    if ($customAmounts.length) {
      var $element = $purchaseForm.find('input[name="certificate_amount"]');
      var min = $element.data('min');
      var minFormatted = $element.data('minFormatted');
      var max = $element.data('max');
      var maxFormatted = $element.data('maxFormatted');
      var insertFormattedAmountsIntoErrorMessage = function insertFormattedAmountsIntoErrorMessage(message) {
        for (var _len = arguments.length, amountRange = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          amountRange[_key - 1] = arguments[_key];
        }
        var amountPlaceholders = ['[MIN]', '[MAX]'];
        var updatedErrorText = message;
        amountPlaceholders.forEach(function (placeholder, i) {
          updatedErrorText = updatedErrorText.includes(placeholder) ? updatedErrorText.replace(placeholder, amountRange[i]) : updatedErrorText;
        });
        return updatedErrorText;
      };
      purchaseValidator.add({
        selector: '#gift-certificate-form input[name="certificate_amount"]',
        validate: function validate(cb, val) {
          var numberVal = Number(val);
          if (!numberVal) {
            cb(false);
          }
          cb(numberVal >= min && numberVal <= max);
        },
        errorMessage: insertFormattedAmountsIntoErrorMessage(_this.validationDictionary.certificate_amount_range, minFormatted, maxFormatted)
      });
    }
    purchaseValidator.add([{
      selector: '#gift-certificate-form input[name="to_name"]',
      validate: function validate(cb, val) {
        var result = purchaseModel.recipientName(val);
        cb(result);
      },
      errorMessage: _this.context.toName
    }, {
      selector: '#gift-certificate-form input[name="to_email"]',
      validate: function validate(cb, val) {
        var result = purchaseModel.recipientEmail(val);
        cb(result);
      },
      errorMessage: _this.context.toEmail
    }, {
      selector: '#gift-certificate-form input[name="from_name"]',
      validate: function validate(cb, val) {
        var result = purchaseModel.senderName(val);
        cb(result);
      },
      errorMessage: _this.context.fromName
    }, {
      selector: '#gift-certificate-form input[name="from_email"]',
      validate: function validate(cb, val) {
        var result = purchaseModel.senderEmail(val);
        cb(result);
      },
      errorMessage: _this.context.fromEmail
    }, {
      selector: '#gift-certificate-form input[name="certificate_theme"]:first-of-type',
      triggeredBy: '#gift-certificate-form input[name="certificate_theme"]',
      validate: function validate(cb) {
        var val = $purchaseForm.find('input[name="certificate_theme"]:checked').val();
        cb(typeof val === 'string');
      },
      errorMessage: _this.context.certTheme
    }, {
      selector: '#gift-certificate-form input[name="agree"]',
      validate: function validate(cb) {
        var val = $purchaseForm.find('input[name="agree"]').get(0).checked;
        cb(val);
      },
      errorMessage: _this.context.agreeToTerms
    }, {
      selector: '#gift-certificate-form input[name="agree2"]',
      validate: function validate(cb) {
        var val = $purchaseForm.find('input[name="agree2"]').get(0).checked;
        cb(val);
      },
      errorMessage: _this.context.agreeToTerms
    }]);
    if ($certBalanceForm.length) {
      var balanceVal = _this.checkCertBalanceValidator($certBalanceForm);
      $certBalanceForm.on('submit', function () {
        balanceVal.performCheck();
        if (!balanceVal.areAll('valid')) {
          return false;
        }
      });
    }
    $purchaseForm.on('submit', function (event) {
      purchaseValidator.performCheck();
      if (!purchaseValidator.areAll('valid')) {
        return event.preventDefault();
      }
    });
    var createFrame = function createFrame(container, html) {
      var frame = $('<iframe />').width('100%').attr('frameBorder', '0').appendTo(container)[0];

      // Grab the frame's document object
      var frameDoc = frame.contentWindow ? frame.contentWindow.document : frame.contentDocument;
      frameDoc.open();
      frameDoc.write(html);
      frameDoc.close();

      // Calculate max height for the iframe
      var maxheight = Math.max($(window).height() - 300, 300);

      // Auto adjust the iframe's height once its document is ready
      $(frameDoc).ready(function () {
        var height = Math.min(frameDoc.body.scrollHeight + 20, maxheight);
        $(frame).height(height);
      });
    };
    $('#gift-certificate-preview').click(function (event) {
      event.preventDefault();
      purchaseValidator.performCheck();
      if (!purchaseValidator.areAll('valid')) {
        return;
      }
      var modal = (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.defaultModal)();
      var previewUrl = $(event.currentTarget).data('previewUrl') + "&" + $purchaseForm.serialize();
      modal.open();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_6__.api.getPage(previewUrl, {}, function (err, content) {
        if (err) {
          return modal.updateContent(_this.context.previewError);
        }
        modal.updateContent();
        var container = $('#modal-content');
        createFrame(container, content);
      });
    });
    return _this;
  }
  _inheritsLoose(GiftCertificate, _PageManager);
  var _proto = GiftCertificate.prototype;
  _proto.checkCertBalanceValidator = function checkCertBalanceValidator($balanceForm) {
    var balanceValidator = (0,_common_nod__WEBPACK_IMPORTED_MODULE_1__["default"])({
      submit: $balanceForm.find('input[type="submit"]'),
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__.announceInputErrorMessage
    });
    balanceValidator.add({
      selector: $balanceForm.find('input[name="giftcertificatecode"]'),
      validate: function validate(cb, val) {
        cb((0,_common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_2__["default"])(val));
      },
      errorMessage: this.validationDictionary.invalid_gift_certificate
    });
    return balanceValidator;
  };
  return GiftCertificate;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLmFzc2V0c19qc190aGVtZV9naWZ0LWNlcnRpZmljYXRlX2pzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUF5QztBQUNWO0FBQ3dDO0FBQ3pCO0FBQ2tDO0FBQ1Y7QUFDckI7QUFDSDtBQUFBLElBRXpCUSxlQUFlLDBCQUFBQyxZQUFBO0VBQ2hDLFNBQUFELGdCQUFZRSxPQUFPLEVBQUU7SUFBQSxJQUFBQyxLQUFBO0lBQ2pCQSxLQUFBLEdBQUFGLFlBQUEsQ0FBQUcsSUFBQSxPQUFNRixPQUFPLENBQUM7SUFDZEMsS0FBQSxDQUFLRSxvQkFBb0IsR0FBR1QsNkZBQTJCLENBQUNNLE9BQU8sQ0FBQztJQUVoRSxJQUFNSSxnQkFBZ0IsR0FBR0MsQ0FBQyxDQUFDLDJCQUEyQixDQUFDO0lBRXZELElBQU1DLGFBQWEsR0FBRztNQUNsQkMsYUFBYSxXQUFiQSxhQUFhQSxDQUFDQyxHQUFHLEVBQUU7UUFDZixPQUFPQSxHQUFHLENBQUNDLE1BQU07TUFDckIsQ0FBQztNQUNEQyxjQUFjLFdBQWRBLGNBQWNBLENBQUEsRUFBVTtRQUNwQixPQUFPakIsNERBQVMsQ0FBQ2tCLEtBQUssQ0FBQUMsS0FBQSxDQUFmbkIsNERBQVMsRUFBQW9CLFNBQWMsQ0FBQztNQUNuQyxDQUFDO01BQ0RDLFVBQVUsV0FBVkEsVUFBVUEsQ0FBQ04sR0FBRyxFQUFFO1FBQ1osT0FBT0EsR0FBRyxDQUFDQyxNQUFNO01BQ3JCLENBQUM7TUFDRE0sV0FBVyxXQUFYQSxXQUFXQSxDQUFBLEVBQVU7UUFDakIsT0FBT3RCLDREQUFTLENBQUNrQixLQUFLLENBQUFDLEtBQUEsQ0FBZm5CLDREQUFTLEVBQUFvQixTQUFjLENBQUM7TUFDbkMsQ0FBQztNQUNERyxZQUFZLFdBQVpBLFlBQVlBLENBQUNDLEtBQUssRUFBRUMsR0FBRyxFQUFFQyxHQUFHLEVBQUU7UUFDMUIsT0FBT0YsS0FBSyxJQUFJQSxLQUFLLElBQUlDLEdBQUcsSUFBSUQs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LElBQU01QixTQUFTLEdBQUdyRSxDQUFDLENBQUMsZ0JBQWdCLENBQUM7UUFDckNvRSxXQUFXLENBQUNDLFNBQVMsRUFBRTJCLE9BQU8sQ0FBQztNQUNuQyxDQUFDLENBQUM7SUFDTixDQUFDLENBQUM7SUFBQyxPQUFBcEcsS0FBQTtFQUNQO0VBQUN1RyxjQUFBLENBQUExRyxlQUFBLEVBQUFDLFlBQUE7RUFBQSxJQUFBMEcsTUFBQSxHQUFBM0csZUFBQSxDQUFBNEcsU0FBQTtFQUFBRCxNQUFBLENBRUR0Qyx5QkFBeUIsR0FBekIsU0FBQUEseUJBQXlCQSxDQUFDd0MsWUFBWSxFQUFFO0lBQ3BDLElBQU1DLGdCQUFnQixHQUFHckgsdURBQUcsQ0FBQztNQUN6QnNDLE1BQU0sRUFBRThFLFlBQVksQ0FBQ2hGLElBQUksQ0FBQyxzQkFBc0IsQ0FBQztNQUNqREksR0FBRyxFQUFFcEMsK0VBQXlCQTtJQUNsQyxDQUFDLENBQUM7SUFFRmlILGdCQUFnQixDQUFDNUQsR0FBRyxDQUFDO01BQ2pCQyxRQUFRLEVBQUUwRCxZQUFZLENBQUNoRixJQUFJLENBQUMsbUNBQW1DLENBQUM7TUFDaEV1QixRQUFRLFdBQVJBLFFBQVFBLENBQUNDLEVBQUUsRUFBRTNDLEdBQUcsRUFBRTtRQUNkMkMsRUFBRSxDQUFDM0QsOEVBQW9CLENBQUNnQixHQUFHLENBQUMsQ0FBQztNQUNqQyxDQUFDO01BQ0Q4QyxZQUFZLEVBQUUsSUFBSSxDQUFDbkQsb0JBQW9CLENBQUMwRztJQUM1QyxDQUFDLENBQUM7SUFFRixPQUFPRCxnQkFBZ0I7RUFDM0IsQ0FBQztFQUFBLE9BQUE5RyxlQUFBO0FBQUEsRUFsT3dDUixxREFBVyIsInNvdXJjZXMiOlsid2VicGFjazovL0hhbG8vLi9hc3NldHMvanMvdGhlbWUvZ2lmdC1jZXJ0aWZpY2F0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGFnZU1hbmFnZXIgZnJvbSAnLi9wYWdlLW1hbmFnZXInO1xuaW1wb3J0IG5vZCBmcm9tICcuL2NvbW1vbi9ub2QnO1xuaW1wb3J0IGNoZWNrSXNHaWZ0Q2VydFZhbGlkIGZyb20gJy4vY29tbW9uL2dpZnQtY2VydGlmaWNhdGUtdmFsaWRhdG9yJztcbmltcG9ydCBmb3JtTW9kZWwgZnJvbSAnLi9jb21tb24vbW9kZWxzL2Zvcm1zJztcbmltcG9ydCB7IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSB9IGZyb20gJy4vY29tbW9uL3V0aWxzL3RyYW5zbGF0aW9ucy11dGlscyc7XG5pbXBvcnQgeyBhbm5vdW5jZUlucHV0RXJyb3JNZXNzYWdlIH0gZnJvbSAnLi9jb21tb24vdXRpbHMvZm9ybS11dGlscyc7XG5pbXBvcnQgeyBhcGkgfSBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5pbXBvcnQgeyBkZWZhdWx0TW9kYWwgfSBmcm9tICcuL2dsb2JhbC9tb2RhbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdpZnRDZXJ0aWZpY2F0ZSBleHRlbmRzIFBhZ2VNYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKGNvbnRleHQpO1xuICAgICAgICB0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5ID0gY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5KGNvbnRleHQpO1xuXG4gICAgICAgIGNvbnN0ICRjZXJ0QmFsYW5jZUZvcm0gPSAkKCcjZ2lmdC1jZXJ0aWZpY2F0ZS1iYWxhbmNlJyk7XG5cbiAgICAgICAgY29uc3QgcHVyY2hhc2VNb2RlbCA9IHtcbiAgICAgICAgICAgIHJlY2lwaWVudE5hbWUodmFsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbC5sZW5ndGg7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVjaXBpZW50RW1haWwoLi4uYXJncykge1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtTW9kZWwuZW1haWwoLi4uYXJncyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VuZGVyTmFtZSh2YWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsLmxlbmd0aDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZW5kZXJFbWFpbCguLi5hcmdzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1Nb2RlbC5lbWFpbCguLi5hcmdzKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjdXN0b21BbW91bnQodmFsdWUsIG1pbiwgbWF4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlICYmIHZhbHVlID49IG1pbiAmJiB2YWx1ZSA8PSBtYXg7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0QW1vdW50KHZhbHVlLCBvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBvcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9uID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZm91bmQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0ICRwdXJjaGFzZUZvcm0gPSAkKCcjZ2lmdC1jZXJ0aWZpY2F0ZS1mb3JtJyk7XG4gICAgICAgIGNvbnN0ICRjdXN0b21BbW91bnRzID0gJHB1cmNoYXNlRm9ybS5maW5kKCdpbnB1dFtuYW1lPVwiY2VydGlmaWNhdGVfYW1vdW50XCJdJyk7XG4gICAgICAgIGNvbnN0IHB1cmNoYXNlVmFsaWRhdG9yID0gbm9kKHtcbiAgICAgICAgICAgIHN1Ym1pdDogJyNnaWZ0LWNlcnRpZmljYXRlLWZvcm0gaW5wdXRbdHlwZT1cInN1Ym1pdFwiXScsXG4gICAgICAgICAgICBkZWxheTogMzAwLFxuICAgICAgICAgICAgdGFwOiBhbm5vdW5jZUlucHV0RXJyb3JNZXNzYWdlLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoJGN1c3RvbUFtb3VudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCAkZWxlbWVudCA9ICRwdXJjaGFzZUZvcm0uZmluZCgnaW5wdXRbbmFtZT1cImNlcnRpZmljYXRlX2Ftb3VudFwiXScpO1xuICAgICAgICAgICAgY29uc3QgbWluID0gJGVsZW1lbnQuZGF0YSgnbWluJyk7XG4gICAgICAgICAgICBjb25zdCBtaW5Gb3JtYXR0ZWQgPSAkZWxlbWVudC5kYXRhKCdtaW5Gb3JtYXR0ZWQnKTtcbiAgICAgICAgICAgIGNvbnN0IG1heCA9ICRlbGVtZW50LmRhdGEoJ21heCcpO1xuICAgICAgICAgICAgY29uc3QgbWF4Rm9ybWF0dGVkID0gJGVsZW1lbnQuZGF0YSgnbWF4Rm9ybWF0dGVkJyk7XG4gICAgICAgICAgICBjb25zdCBpbnNlcnRGb3JtYXR0ZWRBbW91bnRzSW50b0Vycm9yTWVzc2FnZSA9IChtZXNzYWdlLCAuLi5hbW91bnRSYW5nZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFtb3VudFBsYWNlaG9sZGVycyA9IFsnW01JTl0nLCAnW01BWF0nXTtcbiAgICAgICAgICAgICAgICBsZXQgdXBkYXRlZEVycm9yVGV4dCA9IG1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgYW1vdW50UGxhY2Vob2xkZXJzLmZvckVhY2goKHBsYWNlaG9sZGVyLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZWRFcnJvclRleHQgPSB1cGRhdGVkRXJyb3JUZXh0LmluY2x1ZGVzKHBsYWNlaG9sZGVyKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVkRXJyb3JUZXh0LnJlcGxhY2UocGxhY2Vob2xkZXIsIGFtb3VudFJhbmdlW2ldKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVkRXJyb3JUZXh0O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB1cGRhdGVkRXJyb3JUZXh0O1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcHVyY2hhc2VWYWxpZGF0b3IuYWRkKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJyNnaWZ0LWNlcnRpZmljYXRlLWZvcm0gaW5wdXRbbmFtZT1cImNlcnRpZmljYXRlX2Ftb3VudFwiXScsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG51bWJlclZhbCA9IE51bWJlcih2YWwpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghbnVtYmVyVmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYihmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjYihudW1iZXJWYWwgPj0gbWluICYmIG51bWJlclZhbCA8PSBtYXgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBpbnNlcnRGb3JtYXR0ZWRBbW91bnRzSW50b0Vycm9yTWVzc2FnZSh0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5LmNlcnRpZmljYXRlX2Ftb3VudF9yYW5nZSwgbWluRm9ybWF0dGVkLCBtYXhGb3JtYXR0ZWQpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdXJjaGFzZVZhbGlkYXRvci5hZGQoW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnI2dpZnQtY2VydGlmaWNhdGUtZm9ybSBpbnB1dFtuYW1lPVwidG9fbmFtZVwiXScsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHB1cmNoYXNlTW9kZWwucmVjaXBpZW50TmFtZSh2YWwpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC50b05hbWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnI2dpZnQtY2VydGlmaWNhdGUtZm9ybSBpbnB1dFtuYW1lPVwidG9fZW1haWxcIl0nLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBwdXJjaGFzZU1vZGVsLnJlY2lwaWVudEVtYWlsKHZhbCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5jb250ZXh0LnRvRW1haWwsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnI2dpZnQtY2VydGlmaWNhdGUtZm9ybSBpbnB1dFtuYW1lPVwiZnJvbV9uYW1lXCJdJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gcHVyY2hhc2VNb2RlbC5zZW5kZXJOYW1lKHZhbCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5jb250ZXh0LmZyb21OYW1lLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJyNnaWZ0LWNlcnRpZmljYXRlLWZvcm0gaW5wdXRbbmFtZT1cImZyb21fZW1haWxcIl0nLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBwdXJjaGFzZU1vZGVsLnNlbmRlckVtYWlsKHZhbCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5jb250ZXh0LmZyb21FbWFpbCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICcjZ2lmdC1jZXJ0aWZpY2F0ZS1mb3JtIGlucHV0W25hbWU9XCJjZXJ0aWZpY2F0ZV90aGVtZVwiXTpmaXJzdC1vZi10eXBlJyxcbiAgICAgICAgICAgICAgICB0cmlnZ2VyZWRCeTogJyNnaWZ0LWNlcnRpZmljYXRlLWZvcm0gaW5wdXRbbmFtZT1cImNlcnRpZmljYXRlX3RoZW1lXCJdJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbCA9ICRwdXJjaGFzZUZvcm0uZmluZCgnaW5wdXRbbmFtZT1cImNlcnRpZmljYXRlX3RoZW1lXCJdOmNoZWNrZWQnKS52YWwoKTtcblxuICAgICAgICAgICAgICAgICAgICBjYih0eXBlb2YgKHZhbCkgPT09ICdzdHJpbmcnKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5jb250ZXh0LmNlcnRUaGVtZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICcjZ2lmdC1jZXJ0aWZpY2F0ZS1mb3JtIGlucHV0W25hbWU9XCJhZ3JlZVwiXScsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWwgPSAkcHVyY2hhc2VGb3JtLmZpbmQoJ2lucHV0W25hbWU9XCJhZ3JlZVwiXScpLmdldCgwKS5jaGVja2VkO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHZhbCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5hZ3JlZVRvVGVybXMsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnI2dpZnQtY2VydGlmaWNhdGUtZm9ybSBpbnB1dFtuYW1lPVwiYWdyZWUyXCJdJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbCA9ICRwdXJjaGFzZUZvcm0uZmluZCgnaW5wdXRbbmFtZT1cImFncmVlMlwiXScpLmdldCgwKS5jaGVja2VkO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHZhbCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5hZ3JlZVRvVGVybXMsXG4gICAgICAgICAgICB9LFxuICAgICAgICBdKTtcblxuICAgICAgICBpZiAoJGNlcnRCYWxhbmNlRm9ybS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGJhbGFuY2VWYWwgPSB0aGlzLmNoZWNrQ2VydEJhbGFuY2VWYWxpZGF0b3IoJGNlcnRCYWxhbmNlRm9ybSk7XG5cbiAgICAgICAgICAgICRjZXJ0QmFsYW5jZUZvcm0ub24oJ3N1Ym1pdCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBiYWxhbmNlVmFsLnBlcmZvcm1DaGVjaygpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFiYWxhbmNlVmFsLmFyZUFsbCgndmFsaWQnKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkcHVyY2hhc2VGb3JtLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XG4gICAgICAgICAgICBwdXJjaGFzZVZhbGlkYXRvci5wZXJmb3JtQ2hlY2soKTtcblxuICAgICAgICAgICAgaWYgKCFwdXJjaGFzZVZhbGlkYXRvci5hcmVBbGwoJ3ZhbGlkJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgY3JlYXRlRnJhbWUgPSAoY29udGFpbmVyLCBodG1sKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmcmFtZSA9ICQoJzxpZnJhbWUgLz4nKS53aWR0aCgnMTAwJScpLmF0dHIoJ2ZyYW1lQm9yZGVyJywgJzAnKS5hcHBlbmRUbyhjb250YWluZXIpWzBdO1xuXG4gICAgICAgICAgICAvLyBHcmFiIHRoZSBmcmFtZSdzIGRvY3VtZW50IG9iamVjdFxuICAgICAgICAgICAgY29uc3QgZnJhbWVEb2MgPSBmcmFtZS5jb250ZW50V2luZG93ID8gZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudCA6IGZyYW1lLmNvbnRlbnREb2N1bWVudDtcblxuICAgICAgICAgICAgZnJhbWVEb2Mub3BlbigpO1xuICAgICAgICAgICAgZnJhbWVEb2Mud3JpdGUoaHRtbCk7XG4gICAgICAgICAgICBmcmFtZURvYy5jbG9zZSgpO1xuXG4gICAgICAgICAgICAvLyBDYWxjdWxhdGUgbWF4IGhlaWdodCBmb3IgdGhlIGlmcmFtZVxuICAgICAgICAgICAgY29uc3QgbWF4aGVpZ2h0ID0gTWF0aC5tYXgoKCQod2luZG93KS5oZWlnaHQoKSAtIDMwMCksIDMwMCk7XG5cbiAgICAgICAgICAgIC8vIEF1dG8gYWRqdXN0IHRoZSBpZnJhbWUncyBoZWlnaHQgb25jZSBpdHMgZG9jdW1lbnQgaXMgcmVhZHlcbiAgICAgICAgICAgICQoZnJhbWVEb2MpLnJlYWR5KCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBoZWlnaHQgPSBNYXRoLm1pbihmcmFtZURvYy5ib2R5LnNjcm9sbEhlaWdodCArIDIwLCBtYXhoZWlnaHQpO1xuICAgICAgICAgICAgICAgICQoZnJhbWUpLmhlaWdodChoZWlnaHQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJCgnI2dpZnQtY2VydGlmaWNhdGUtcHJldmlldycpLmNsaWNrKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHB1cmNoYXNlVmFsaWRhdG9yLnBlcmZvcm1DaGVjaygpO1xuXG4gICAgICAgICAgICBpZiAoIXB1cmNoYXNlVmFsaWRhdG9yLmFyZUFsbCgndmFsaWQnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbW9kYWwgPSBkZWZhdWx0TW9kYWwoKTtcbiAgICAgICAgICAgIGNvbnN0IHByZXZpZXdVcmwgPSBgJHskKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ3ByZXZpZXdVcmwnKX0mJHskcHVyY2hhc2VGb3JtLnNlcmlhbGl6ZSgpfWA7XG5cbiAgICAgICAgICAgIG1vZGFsLm9wZW4oKTtcblxuICAgICAgICAgICAgYXBpLmdldFBhZ2UocHJldmlld1VybCwge30sIChlcnIsIGNvbnRlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtb2RhbC51cGRhdGVDb250ZW50KHRoaXMuY29udGV4dC5wcmV2aWV3RXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG1vZGFsLnVwZGF0ZUNvbnRlbnQoKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lciA9ICQoJyNtb2RhbC1jb250ZW50Jyk7XG4gICAgICAgICAgICAgICAgY3JlYXRlRnJhbWUoY29udGFpbmVyLCBjb250ZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjaGVja0NlcnRCYWxhbmNlVmFsaWRhdG9yKCRiYWxhbmNlRm9ybSkge1xuICAgICAgICBjb25zdCBiYWxhbmNlVmFsaWRhdG9yID0gbm9kKHtcbiAgICAgICAgICAgIHN1Ym1pdDogJGJhbGFuY2VGb3JtLmZpbmQoJ2lucHV0W3R5cGU9XCJzdWJtaXRcIl0nKSxcbiAgICAgICAgICAgIHRhcDogYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYmFsYW5jZVZhbGlkYXRvci5hZGQoe1xuICAgICAgICAgICAgc2VsZWN0b3I6ICRiYWxhbmNlRm9ybS5maW5kKCdpbnB1dFtuYW1lPVwiZ2lmdGNlcnRpZmljYXRlY29kZVwiXScpLFxuICAgICAgICAgICAgdmFsaWRhdGUoY2IsIHZhbCkge1xuICAgICAgICAgICAgICAgIGNiKGNoZWNrSXNHaWZ0Q2VydFZhbGlkKHZhbCkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy52YWxpZGF0aW9uRGljdGlvbmFyeS5pbnZhbGlkX2dpZnRfY2VydGlmaWNhdGUsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBiYWxhbmNlVmFsaWRhdG9yO1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6WyJQYWdlTWFuYWdlciIsIm5vZCIsImNoZWNrSXNHaWZ0Q2VydFZhbGlkIiwiZm9ybU1vZGVsIiwiY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5IiwiYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSIsImFwaSIsImRlZmF1bHRNb2RhbCIsIkdpZnRDZXJ0aWZpY2F0ZSIsIl9QYWdlTWFuYWdlciIsImNvbnRleHQiLCJfdGhpcyIsImNhbGwiLCJ2YWxpZGF0aW9uRGljdGlvbmFyeSIsIiRjZXJ0QmFsYW5jZUZvcm0iLCIkIiwicHVyY2hhc2VNb2RlbCIsInJlY2lwaWVudE5hbWUiLCJ2YWwiLCJsZW5ndGgiLCJyZWNpcGllbnRFbWFpbCIsImVtYWlsIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJzZW5kZXJOYW1lIiwic2VuZGVyRW1haWwiLCJjdXN0b21BbW91bnQiLCJ2YWx1ZSIsIm1pbiIsIm1heCIsInNldEFtb3VudCIsIm9wdGlvbnMiLCJmb3VuZCIsImZvckVhY2giLCJvcHRpb24iLCIkcHVyY2hhc2VGb3JtIiwiJGN1c3RvbUFtb3VudHMiLCJmaW5kIiwicHVyY2hhc2VWYWxpZGF0b3IiLCJzdWJtaXQiLCJkZWxheSIsInRhcCIsIiRlbGVtZW50IiwiZGF0YSIsIm1pbkZvcm1hdHRlZCIsIm1heEZvcm1hdHRlZCIsImluc2VydEZvcm1hdHRlZEFtb3VudHNJbnRvRXJyb3JNZXNzYWdlIiwibWVzc2FnZSIsIl9sZW4iLCJhbW91bnRSYW5nZSIsIkFycmF5IiwiX2tleSIsImFtb3VudFBsYWNlaG9sZGVycyIsInVwZGF0ZWRFcnJvclRleHQiLCJwbGFjZWhvbGRlciIsImkiLCJpbmNsdWRlcyIsInJlcGxhY2UiLCJhZGQiLCJzZWxlY3RvciIsInZhbGlkYXRlIiwiY2IiLCJudW1iZXJWYWwiLCJOdW1iZXIiLCJlcnJvck1lc3NhZ2UiLCJjZXJ0aWZpY2F0ZV9hbW91bnRfcmFuZ2UiLCJyZXN1bHQiLCJ0b05hbWUiLCJ0b0VtYWlsIiwiZnJvbU5hbWUiLCJmcm9tRW1haWwiLCJ0cmlnZ2VyZWRCeSIsImNlcnRUaGVtZSIsImdldCIsImNoZWNrZWQiLCJhZ3JlZVRvVGVybXMiLCJiYWxhbmNlVmFsIiwiY2hlY2tDZXJ0QmFsYW5jZVZhbGlkYXRvciIsIm9uIiwicGVyZm9ybUNoZWNrIiwiYXJlQWxsIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImNyZWF0ZUZyYW1lIiwiY29udGFpbmVyIiwiaHRtbCIsImZyYW1lIiwid2lkdGgiLCJhdHRyIiwiYXBwZW5kVG8iLCJmcmFtZURvYyIsImNvbnRlbnRXaW5kb3ciLCJkb2N1bWVudCIsImNvbnRlbnREb2N1bWVudCIsIm9wZW4iLCJ3cml0ZSIsImNsb3NlIiwibWF4aGVpZ2h0IiwiTWF0aCIsIndpbmRvdyIsImhlaWdodCIsInJlYWR5IiwiYm9keSIsInNjcm9sbEhlaWdodCIsImNsaWNrIiwibW9kYWwiLCJwcmV2aWV3VXJsIiwiY3VycmVudFRhcmdldCIsInNlcmlhbGl6ZSIsImdldFBhZ2UiLCJlcnIiLCJjb250ZW50IiwidXBkYXRlQ29udGVudCIsInByZXZpZXdFcnJvciIsIl9pbmhlcml0c0xvb3NlIiwiX3Byb3RvIiwicHJvdG90eXBlIiwiJGJhbGFuY2VGb3JtIiwiYmFsYW5jZVZhbGlkYXRvciIsImludmFsaWRfZ2lmdF9jZXJ0aWZpY2F0ZSIsImRlZmF1bHQiXSwic291cmNlUm9vdCI6IiJ9