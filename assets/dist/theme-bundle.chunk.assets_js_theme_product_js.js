"use strict";
(self["webpackChunkHalo"] = self["webpackChunkHalo"] || []).push([["assets_js_theme_product_js"],{

/***/ "./assets/js/theme/halothemes/haloBundleProducts.js":
/*!**********************************************************!*\
  !*** ./assets/js/theme/halothemes/haloBundleProducts.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../global/modal */ "./assets/js/theme/global/modal.js");
/* harmony import */ var _haloCalculateFreeShipping__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./haloCalculateFreeShipping */ "./assets/js/theme/halothemes/haloCalculateFreeShipping.js");
/* harmony import */ var _common_models_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/models/forms */ "./assets/js/theme/common/models/forms.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
function _createForOfIteratorHelperLoose(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (t) return (t = t.call(r)).next.bind(t); if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var o = 0; return function () { return o >= r.length ? { done: !0 } : { done: !1, value: r[o++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }




/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__($scope, context) {
  var thisProuctId = parseInt(context.productId),
    $relatedTab = $('#halo-related-products'),
    $bundle = $('#halo-bundle-products'),
    $bundleList = $bundle.find('.halo-product-list .bundle-product-wrapper');
  var currency = context.money;
  showBundle();
  $(document).on('click', '.halo-toggle-options', function (event) {
    event.preventDefault();
    var $target = $(event.currentTarget);
    $('.halo-toggle-options').not($target).removeClass('is-focus');
    $('.halo-detail-options').not($target.next('.halo-detail-options')).removeClass('is-open');
    if (!$target.next('.halo-detail-options').hasClass('is-open')) {
      $target.addClass('is-focus');
      $target.next('.halo-detail-options').addClass('is-open');
    } else {
      $target.next('.halo-detail-options').removeClass('is-open');
      $target.removeClass('is-focus');
    }
  });
  $(document).on('click', '[data-halo-option-close]', function (event) {
    event.preventDefault();
    $('.halo-detail-options').removeClass('is-open');
    $('.halo-toggle-options').removeClass('is-focus');
  });
  $(document).on('click', function (event) {
    if ($('.halo-detail-options').hasClass('is-open')) {
      if ($(event.target).closest('.halo-detail-options').length === 0 && $(event.target).closest('.halo-toggle-options').length === 0) {
        $('.halo-detail-options').removeClass('is-open');
        $('.halo-toggle-options').removeClass('is-focus');
      }
    }
  });
  $(document).on('change', '.halo-detail-checkbox', function (event) {
    var $target = $(event.currentTarget),
      id = $target.attr('id').replace('fbt_product', ''),
      product = $('.halo-product-item[data-product-id="' + id + '"]');
    if ($target.is(':checked') == false) {
      product.removeClass('isChecked');
      product.find('.status').addClass('disable').text('This item');
      $('#halo-addAll').find('.number').text($('.halo-product-item.isChecked').length);
    } else {
      product.addClass('isChecked');
      product.find('.status').removeClass('disable').text('Selected');
      $('#halo-addAll').find('.number').text($('.halo-product-item.isChecked').length);
    }
    totalPrice();
  });
  $(document).on('click', '#halo-addAll', function (event) {
    event.preventDefault();
    var $form = $('form', $bundle);
    var arrPro = new Array();
    $('.halo-detail-checkbox').each(function (index, val) {
      if ($(val).is(':checked')) {
        arrPro.push(index);
      }
    });
    var check = false;
    if (arrPro.length > 0) {
      check = checkProduct($form, arrPro);
    }
    if (check) {
      if (arrPro.length > 0) {
        var k = arrPro.length;
        $bundle.find('.loadingOverlay').show();
        addToCart($form, 0, arrPro, k);
      }
    } else {
      var errorMessage = 'Please make sure all options have been filled in.';
      if (errorMessage) {
        var tmp = document.createElement('DIV');
        tmp.innerHTML = errorMessage;
        return (0,_global_modal__WEBPACK_IMPORTED_MODULE_1__.showAlertModal)(tmp.textContent || tmp.innerText);
      }
    }
    event.preventDefault();
  });
  function showBundle() {
    var options = {
      template: 'halothemes/product/halo-bundle-products-tmp'
    };
    var prodBundleId = [],
      totalBlock = '';
    firstItem();
    if ($bundle.hasClass('halo-bundle-login')) {
      totalBlock = '<div class="halo-product-total">\
                            <a class="button button--primary button--small halo-product-total-button m-0" disabled href="#"><span>Log in for pricing</span></a>\
                        </div>';
    } else {
      totalBlock = '<div class="halo-product-total d-flex d-block-tb a-i-start j-c-between">\
                            <div class="total-price">\
                                <span class="text"><span>Price Total</span></span>\
                                <span class="price price-sale"></span>\
                                <span class="price"></span>\
                            </div>\
                            <a class="button button--primary button--small halo-product-total-button m-0" id="halo-addAll" href="#"><span>Add <span class="number">all</span> item(s) to bag</span></a>\
                        </div>';
    }
    $bundle.find('.bundle-product-right').append(totalBlock);
    $.each(context.productCustomFields, function (index, obj) {
      if (obj.name == '__bundleid') {
        prodBundleId = JSON.parse('[' + obj.value + ']');
      }
    });
    prodBundleId = $.grep(prodBundleId, function (value) {
      return value != thisProuctId;
    });
    if ($bundle.length > 0 && prodBundleId.length == 0) {
      var num = 0,
        list = [];
      $relatedTab.find('.card').each(function (index, val) {
        list.push({
          index: index,
          data: ""
        });
        var pId = $(val).data('product-id');
        if (pId != undefined) {
          _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.product.getById(pId, options, function (err, response) {
            if (err) {
              return '';
            }
            list.forEach(function (element) {
              if (element.index == index) {
                element.data = response;
              }
            });
            num++;
            if (num == $relatedTab.find('.card').length) {
              showList(list);
            }
          });
        }
      });
    } else if ($bundle.length > 0 && prodBundleId.length > 0) {
      var num = 0,
        list = [];
      $.each(prodBundleId, function (i, val) {
        list.push({
          i: i,
          data: ""
        });
        var pId = prodBundleId[i];
        if (pId != undefined) {
          _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.product.getById(pId, options, function (err, response) {
            if (err) {
              return false;
            }
            list.forEach(function (element) {
              if (element.i == i) {
                element.data = response;
              }
            });
            num++;
            if (num == prodBundleId.length) {
              showList(list);
            }
          });
        }
      });
    }
  }
  function firstItem() {
    var firstItem = $bundleList.find('.halo-product-itemFirst'),
      pId = firstItem.data('product-id'),
      form = firstItem.find('form'),
      hasOptions = form.find('[data-fbt-option-change]').length,
      hasDefaultOptions = form.find('[data-default]').length;
    if (hasDefaultOptions && hasOptions) {
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.productAttributes.optionChange(pId, form.serialize(), 'products/bulk-discount-rates', function (err, response) {
        var attributesData = response.data || {};
        var attributesContent = response.content || {};
        updateProductAttributes(form, attributesData);
        if (hasDefaultOptions) {
          updateView(form, attributesData, attributesContent);
        } else {
          updateDefaultAttributesForOOS(attributesData);
        }
      });
    }
  }
  function showList(list) {
    list.forEach(function (element) {
      var response = element.data;
      if (response != undefined && response != null && response != '') {
        $bundleList.append(response);
        if ($(response).find('.halo-toggle-options').length) {
          var pId = $(response).data('product-id'),
            $form = $bundleList.find('.halo-product-item[data-product-id="' + pId + '"] form');
          var $productOptionsElement = $('[data-fbt-option-change]', $form);
          var hasOptions = $productOptionsElement.html().trim().length;
          var hasDefaultOptions = $(response).find('[data-default]').length;
          if (hasDefaultOptions && hasOptions) {
            _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.productAttributes.optionChange(pId, $form.serialize(), 'products/bulk-discount-rates', function (err, response) {
              if (response != undefined) {
                var attributesData = response.data || {};
                var attributesContent = response.content || {};
                updateProductAttributes($form, attributesData);
                if (hasDefaultOptions) {
                  updateView($form, attributesData, attributesContent);
                } else {
                  updateDefaultAttributesForOOS(attributesData);
                }
              }
            });
          }
          setProductVariant();
        }
      }
    });
    $('.halo-product-item', $scope).each(function (index, element) {
      $(element).on('click', '[data-quantity-fbt-change] button', function (event) {
        event.preventDefault();
        var $target = $(event.currentTarget);
        var currentItemProId = $target.closest('.halo-product-item').data('product-id');
        var $input = $(".halo-product-item[data-product-id=\"" + currentItemProId + "\"] [name=fbtqty\\[\\]]", $scope);
        var quantityMin = parseInt($input.data('quantityMin'), 10);
        var quantityMax = parseInt($input.data('quantityMax'), 10);
        var qty = _common_models_forms__WEBPACK_IMPORTED_MODULE_3__["default"].numbersOnly($input.val()) ? parseInt($input.val(), 10) : quantityMin;
        if ($target.data('action') === 'inc') {
          qty = _common_models_forms__WEBPACK_IMPORTED_MODULE_3__["default"].validateIncreaseAgainstMaxBoundary(qty, quantityMax);
        } else if (qty > 1) {
          qty = _common_models_forms__WEBPACK_IMPORTED_MODULE_3__["default"].validateDecreaseAgainstMinBoundary(qty, quantityMin);
        }
        $input.attr('value', qty);
        $input.val(qty);
      });
    });
    productOptions();
    if (!$bundle.hasClass('halo-bundle-login')) {
      totalPrice();
    }
    $('#halo-addAll').find('.number').text($('.halo-product-item.isChecked').length);
    $bundle.removeClass('halo-block-disable');
  }
  function checkProduct(form, arrPro) {
    var check = true;
    for (var i = 0; i < arrPro.length; i++) {
      var k = arrPro[i],
        $form = $(form[k]);
      if ($form.find('[data-fbt-option-change]').length) {
        check = checkBeforeAdd($form);
        if (check == false) {
          return false;
        }
      }
    }
    return check;
  }
  function checkBeforeAdd($attributes) {
    var check = true,
      att = "";
    $attributes.find('input:text, input:password, input:file, textarea').each(function (index, element) {
      if (!$(element).prop('required')) {} else {
        if ($(element).val()) {} else {
          $(element).focus();
          check = false;
        }
      }
    });
    $attributes.find('select').each(function (index, element) {
      if (!$(element).prop('required')) {} else {
        if ($(element).val()) {} else {
          $(element).focus();
          check = false;
        }
      }
    });
    $attributes.find('input:radio, input:checkbox').each(function (index, element) {
      if (att != $(element).attr("name")) {
        att = $(element).attr("name");
        if (!$(element).prop('required')) {
          if ($(element).attr("type") == "checkbox") {
            if ($("[name='" + att + "']:checked").val()) {}
          }
          if ($(element).attr("type") == "radio") {
            if ($("[name='" + att + "']:checked").val()) {}
          }
        } else {
          if ($(element).attr("type") == "checkbox") {
            if ($("[name='" + att + "']:checked").val()) {} else {
              check = false;
            }
          }
          if ($(element).attr("type") == "radio") {
            if ($("[name='" + att + "']:checked").val()) {} else {
              check = false;
            }
          }
        }
      }
    });
    return check;
  }
  function addToCart(form, i, arrP, k) {
    if (window.FormData === undefined) {
      return;
    }
    var prod = arrP[i];
    var formData = new FormData(form[prod]);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.cart.itemAdd(filterEmptyFilesFromForm(formData), function (err, response) {
      var errorMessage = err || response.data.error;
      var productsItem = $('.halo-product-item');
      productsItem.each(function (index, productItem) {
        var quantityData = $('[name=fbtqty\\[\\]]', productItem).val();
        $(productItem).find('[name=qty\\[\\]]').attr('value', quantityData);
      });
      if (errorMessage) {
        var tmp = document.createElement('DIV');
        tmp.innerHTML = errorMessage;
        alert(tmp.textContent || tmp.innerText);
        k = k - 1;
      }
      i++;
      if (i >= arrP.length) {
        $bundle.find('.loadingOverlay').hide();
        if (context.themeSettings.haloAddToCartAction === 'sidebar') {
          var options = {
            template: 'common/cart-preview'
          };
          var loadingClass = 'is-loading';
          var $body = $('body');
          var $cartDropdown = $('#halo-cart-sidebar .halo-sidebar-wrapper');
          var $cartLoading = $('<div class="loadingOverlay"></div>');
          $body.addClass('openCartSidebar');
          $cartDropdown.addClass(loadingClass).html($cartLoading);
          $cartLoading.show();
          _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.cart.getContent(options, function (err, response) {
            $cartDropdown.removeClass(loadingClass).html(response);
            $cartLoading.hide();
            var quantity = $(response).find('[data-cart-quantity]').data('cartQuantity') || 0;
            $body.trigger('cart-quantity-update', quantity);
            (0,_haloCalculateFreeShipping__WEBPACK_IMPORTED_MODULE_2__["default"])(context);
          });
        } else {
          redirectTo(context.urls.cart);
        }
        return;
      }
      addToCart(form, i, arrP, k);
    });
  }
  function isRunningInIframe() {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }
  function redirectTo(url) {
    if (isRunningInIframe() && !window.iframeSdk) {
      window.top.location = url;
    } else {
      window.location = url;
    }
  }
  function totalPrice() {
    var total = 0,
      totalSale = 0,
      symbol,
      symbolChange,
      decimalPlaces,
      decimalSeparator,
      thousandsSeparator,
      symbolLocation,
      curr,
      token1,
      token2,
      length;
    decimalPlaces = currency.decimal_places;
    decimalSeparator = currency.decimal_token;
    thousandsSeparator = currency.thousands_token;
    symbolLocation = currency.currency_location;
    symbol = currency.currency_token;
    $bundleList.find('.halo-product-item.isChecked').each(function (index, val) {
      var price = parseFloat($(val).find('.halo-detail-price').attr('data-price-value')),
        priceSale = parseFloat($(val).find('.halo-detail-price').attr('data-price-sale-value'));
      total = total + price;
      totalSale = totalSale + priceSale;
    });
    if (total == totalSale) {
      $('.halo-product-total .price-sale').hide();
      $('.halo-product-total').removeClass('has-price-sale');
    } else {
      $('.halo-product-total .price-sale').show();
      $('.halo-product-total').addClass('has-price-sale');
    }
    if ($('.productView-price > .price-section > .price.price--withTax', $scope).length) {
      curr = $('.productView-price > .price-section > .price.price--withTax', $scope).data('value-price');
    } else {
      curr = $('.productView-price > .price-section > .price.price--withoutTax', $scope).data('value-price');
    }
    symbolChange = curr.replace(/[0-9]/g, "").replace(".", "").replace(",", "");
    if (symbol != symbolChange) {
      symbol = symbolChange;
      token1 = curr.indexOf('.');
      token2 = curr.indexOf(',');
      length = curr.length - 1;
      if (curr.indexOf(symbol) != -1) {
        symbolLocation = curr.indexOf(symbol);
      }
      if (token1 < token2) {
        thousandsSeparator = '.';
        decimalSeparator = ',';
        if (symbolLocation == 0 || symbolLocation == "left") {
          decimalPlaces = length - token2;
        } else {
          decimalPlaces = length - token2 - 1;
        }
      } else {
        thousandsSeparator = ',';
        decimalSeparator = '.';
        if (symbolLocation == 0 || symbolLocation == "left") {
          decimalPlaces = length - token1;
        } else {
          decimalPlaces = length - token1 - 1;
        }
      }
    }
    if (total == 0) {
      $bundle.find('#halo-addAll').attr('disabled', true);
    } else {
      $bundle.find('#halo-addAll').attr('disabled', false);
    }
    total = formatMoney(total, decimalPlaces, decimalSeparator, thousandsSeparator);
    totalSale = formatMoney(totalSale, decimalPlaces, decimalSeparator, thousandsSeparator);
    if (symbolLocation == "left" || symbolLocation == 0) {
      total = symbol + total;
      totalSale = symbol + totalSale;
    } else {
      total = total + symbol;
      totalSale = totalSale + symbol;
    }
    $bundle.find('.halo-product-total .price').html(total);
    $bundle.find('.halo-product-total .price-sale').html(totalSale);
  }
  function formatMoney(n, c, d, t) {
    var c = isNaN(c = Math.abs(c)) ? 2 : c,
      d = d == undefined ? "." : d,
      t = t == undefined ? "," : t,
      s = n < 0 ? "-" : "",
      i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
      j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
  }
  ;
  function productOptions() {
    if (!$bundle.hasClass('halo-bundle-login')) {
      totalPrice();
    }
    var $form = $('form', $bundle),
      $productOptionsElement = $('[data-fbt-option-change]', $form);
    setProductVariant();
    $(document).on('change', $productOptionsElement, function (event) {
      productOptionsChanged(event);
      setProductVariant();
    });
  }
  function setProductVariant() {
    var unsatisfiedRequiredFields = [];
    var options = [];
    $('.halo-product-item').each(function (index, item) {
      var valueOptions = [];
      $(item).find('[data-fbt-option-change] [data-product-attribute]').each(function (_, value) {
        var optionLabel = $(value).find('label').text();
        var optionTitle = optionLabel.split(':')[0].trim();
        var required = optionLabel.toLowerCase().includes('required');
        var type = $(value).data('product-attribute');
        if ((type === 'input-file' || type === 'input-text' || type === 'input-number') && value.querySelector('input').value === '' && required) {
          unsatisfiedRequiredFields.push(value);
        } else if (type === 'textarea' && value.querySelector('textarea').value === '' && required) {
          unsatisfiedRequiredFields.push(value);
        } else if (type === 'date') {
          var isSatisfied = Array.from(value.querySelectorAll('select')).every(function (select) {
            return select.selectedIndex !== 0;
          });
          if (isSatisfied) {
            var dateString = Array.from(value.querySelectorAll('select')).map(function (x) {
              return x.value;
            }).join('-');
            options.push(optionTitle + ":" + dateString);
            return;
          }
          if (required) {
            unsatisfiedRequiredFields.push(value);
          }
        } else if (type === 'set-select') {
          var select = value.querySelector('select');
          var selectedIndex = select.selectedIndex;
          if (selectedIndex !== 0) {
            options.push(optionTitle + ":" + select.options[selectedIndex].innerText);
            $(value.children[0]).find('[data-option-value]').text(select.options[selectedIndex].innerText);
            valueOptions.push(select.options[selectedIndex].innerText.trim());
            return;
          }
          if (required) {
            unsatisfiedRequiredFields.push(value);
          }
        } else if (type === 'set-rectangle' || type === 'set-radio' || type === 'swatch' || type === 'input-checkbox' || type === 'product-list') {
          var checked = value.querySelector(':checked');
          if (checked) {
            if (type === 'set-rectangle' || type === 'set-radio' || type === 'product-list') {
              var label = checked.labels[0].innerText;
              if (label) {
                options.push(optionTitle + ":" + label);
                $(value.children[0]).find('[data-option-value]').text(label);
                valueOptions.push(label.trim());
              }
            }
            if (type === 'swatch') {
              var _label = checked.labels[0].children[0];
              if (_label) {
                options.push(optionTitle + ":" + _label.title);
                $(value.children[0]).find('[data-option-value]').text(_label.title);
                valueOptions.push(_label.title.trim());
              }
            }
            if (type === 'input-checkbox') {
              options.push(optionTitle + ":Yes");
            }
            return;
          }
          if (type === 'input-checkbox') {
            options.push(optionTitle + ":No");
          }
          if (required) {
            unsatisfiedRequiredFields.push(value);
          }
        }
      });
      if (valueOptions != '') {
        $(item).find('.halo-toggle-options .text').text(valueOptions.join(' / '));
      }
    });
  }
  function productOptionsChanged(event) {
    var $changedOption = $(event.target);
    var $form = $changedOption.parents('form');
    var productId = $('[name="product_id"]', $form).val();
    if ($changedOption.attr('type') === 'file' || window.FormData === undefined) {
      return;
    }
    if ($changedOption.attr('id') === 'fbt_product' + productId) {
      return;
    }
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.productAttributes.optionChange(productId, $form.serialize(), 'products/bulk-discount-rates', function (err, response) {
      var productAttributesData = response.data || {};
      var productAttributesContent = response.content || {};
      updateProductAttributes($form, productAttributesData);
      updateView($form, productAttributesData, productAttributesContent);
      if (!$bundle.hasClass('halo-bundle-login')) {
        totalPrice();
      }
    });
    return false;
  }
  function updateProductAttributes(data) {
    var behavior = data.out_of_stock_behavior;
    var inStockIds = data.in_stock_attributes;
    var outOfStockDefaultMessage = context.outOfStockDefaultMessage;
    var outOfStockMessage = data.out_of_stock_message;
    if (behavior !== 'hide_option' && behavior !== 'label_option') {
      return;
    }
    if (outOfStockMessage) {
      outOfStockMessage = " (" + outOfStockMessage + ")";
    } else {
      outOfStockMessage = " (" + outOfStockDefaultMessage + ")";
    }
    $('[data-product-attribute-value]', $scope).each(function (i, attribute) {
      var $attribute = $(attribute);
      var attrId = parseInt($attribute.data('productAttributeValue'), 10);
      if (inStockIds.indexOf(attrId) !== -1) {
        enableAttribute($attribute, behavior, outOfStockMessage);
      } else {
        disableAttribute($attribute, behavior, outOfStockMessage);
      }
    });
  }
  function disableAttribute($attribute, behavior, outOfStockMessage) {
    if (getAttributeType($attribute) === 'set-select') {
      return disableSelectOptionAttribute($attribute, behavior, outOfStockMessage);
    }
    if (behavior === 'hide_option') {
      $attribute.hide(0);
    } else {
      $attribute.addClass('unavailable');
    }
  }
  function disableSelectOptionAttribute($attribute, behavior, outOfStockMessage) {
    var $select = $attribute.parent();
    if (behavior === 'hide_option') {
      $attribute.toggleOption(false);
      // If the attribute is the selected option in a select dropdown, select the first option (MERC-639)
      if ($select.val() === $attribute.attr('value')) {
        $select[0].selectedIndex = 0;
      }
    } else {
      $attribute.html($attribute.html().replace(outOfStockMessage, '') + outOfStockMessage);
    }
  }
  function enableAttribute($attribute, behavior, outOfStockMessage) {
    if (getAttributeType($attribute) === 'set-select') {
      return enableSelectOptionAttribute($attribute, behavior, outOfStockMessage);
    }
    if (behavior === 'hide_option') {
      $attribute.show();
    } else {
      $attribute.removeClass('unavailable');
    }
  }
  function enableSelectOptionAttribute($attribute, behavior, outOfStockMessage) {
    if (behavior === 'hide_option') {
      $attribute.toggleOption(true);
    } else {
      $attribute.html($attribute.html().replace(outOfStockMessage, ''));
    }
  }
  function getAttributeType($attribute) {
    var $parent = $attribute.closest('[data-product-attribute]');
    return $parent ? $parent.data('productAttribute') : null;
  }
  function updateView($scope, data, content) {
    if (content === void 0) {
      content = null;
    }
    var viewModel = getViewModel($scope);
    showMessageBox(data.stock_message || data.purchasing_message, $scope);
    if (data.price instanceof Object) {
      updatePriceView(viewModel, data.price);
    }
    var productId = $('[name="product_id"]', $scope).val(),
      product = $bundleList.find('.halo-product-item[data-product-id="' + productId + '"]'),
      productCheckbox = product.find('.halo-detail-checkbox');
    if (!data.purchasable || !data.instock) {
      product.removeClass('isChecked hasOptions--selected');
      product.find('.status').addClass('disable').text('This item');
      productCheckbox.prop('checked', false).prop('disabled', true);
      $('#halo-addAll').find('.number').text($('.halo-product-item.isChecked').length);
    } else {
      product.addClass('isChecked');
      product.find('.status').removeClass('disable').text('Selected');
      productCheckbox.prop('checked', true).prop('disabled', false);
      $('#halo-addAll').find('.number').text($('.halo-product-item.isChecked').length);
      if ($scope.find('[data-fbt-option-change]').length > 0) {
        var check = checkBeforeAdd($scope);
        if (check == true) {
          product.addClass('hasOptions--selected');
        }
      }
    }
  }
  function updateDefaultAttributesForOOS($scope, data) {
    var productId = $('[name="product_id"]', $scope).val(),
      product = $bundleList.find('.halo-product-item[data-product-id="' + productId + '"]'),
      productCheckbox = product.find('.halo-detail-checkbox');
    if (!data.purchasable || !data.instock) {
      product.removeClass('isChecked hasOptions--selected');
      product.find('.status').addClass('disable').text('This item');
      productCheckbox.prop('checked', false).prop('disabled', true);
      $('#halo-addAll').find('.number').text($('.halo-product-item.isChecked').length);
    } else {
      product.addClass('isChecked');
      product.find('.status').removeClass('disable').text('Selected');
      productCheckbox.prop('checked', true).prop('disabled', false);
      $('#halo-addAll').find('.number').text($('.halo-product-item.isChecked').length);
      if ($scope.find('[data-fbt-option-change]').length > 0) {
        var check = checkBeforeAdd($scope);
        if (check == true) {
          product.addClass('hasOptions--selected');
        }
      }
    }
  }
  function getViewModel($scope) {
    return {
      $priceValue: $('.halo-detail-price', $scope),
      $priceWithTax: $('[data-product-price-with-tax]', $scope),
      $priceWithoutTax: $('[data-product-price-without-tax]', $scope),
      rrpWithTax: {
        $div: $('.rrp-price--withTax', $scope),
        $span: $('[data-product-rrp-with-tax]', $scope)
      },
      rrpWithoutTax: {
        $div: $('.rrp-price--withoutTax', $scope),
        $span: $('[data-product-rrp-price-without-tax]', $scope)
      },
      nonSaleWithTax: {
        $div: $('.non-sale-price--withTax', $scope),
        $span: $('[data-product-non-sale-price-with-tax]', $scope)
      },
      nonSaleWithoutTax: {
        $div: $('.non-sale-price--withoutTax', $scope),
        $span: $('[data-product-non-sale-price-without-tax]', $scope)
      },
      priceSaved: {
        $div: $('.price-section--saving', $scope),
        $span: $('[data-product-price-saved]', $scope)
      },
      priceNowLabel: {
        $span: $('.price-now-label', $scope)
      },
      priceLabel: {
        $span: $('.price-label', $scope)
      },
      $weight: $('.productView-info [data-product-weight]', $scope),
      $increments: $('.form-field--increments :input', $scope),
      $addToCart: $('#form-action-addToCart', $scope),
      $wishlistVariation: $('[data-wishlist-add] [name="variation_id"]', $scope),
      stock: {
        $container: $('.form-field--stock', $scope),
        $input: $('[data-product-stock]', $scope)
      },
      sku: {
        $label: $('.sku-label', $scope),
        $value: $('[data-product-sku]', $scope)
      },
      upc: {
        $label: $('.upc-label', $scope),
        $value: $('[data-product-upc]', $scope)
      },
      quantity: {
        $text: $('.incrementTotal', $scope),
        $input: $('[name=fbtqty\\[\\]]', $scope)
      },
      $bulkPricing: $('.productView-info-bulkPricing', $scope),
      $walletButtons: $('[data-add-to-cart-wallet-buttons]', $scope)
    };
  }
  function showMessageBox(message, $scope) {
    var $messageBox = $('.productAttributes-message', $scope);
    if (message) {
      $('.alertBox-message', $messageBox).text(message);
      $messageBox.show();
    } else {
      $messageBox.hide();
    }
  }
  function clearPricingNotFound(viewModel) {
    viewModel.rrpWithTax.$div.hide();
    viewModel.rrpWithoutTax.$div.hide();
    viewModel.nonSaleWithTax.$div.hide();
    viewModel.nonSaleWithoutTax.$div.hide();
    viewModel.priceSaved.$div.hide();
    viewModel.priceNowLabel.$span.hide();
    viewModel.priceLabel.$span.hide();
  }
  function updatePriceView(viewModel, price) {
    clearPricingNotFound(viewModel);
    if (price.with_tax) {
      var updatedPrice = price.price_range ? price.price_range.min.with_tax.formatted + " - " + price.price_range.max.with_tax.formatted : price.with_tax.formatted;
      viewModel.priceLabel.$span.show();
      viewModel.$priceWithTax.html(updatedPrice);
      viewModel.$priceValue.attr('data-price-value', price.with_tax.value);
    }
    if (price.without_tax) {
      var _updatedPrice = price.price_range ? price.price_range.min.without_tax.formatted + " - " + price.price_range.max.without_tax.formatted : price.without_tax.formatted;
      viewModel.priceLabel.$span.show();
      viewModel.$priceWithoutTax.html(_updatedPrice);
      viewModel.$priceValue.attr('data-price-value', price.without_tax.value);
    }
    if (price.rrp_with_tax) {
      viewModel.rrpWithTax.$div.show();
      viewModel.rrpWithTax.$span.html(price.rrp_with_tax.formatted);
      viewModel.$priceValue.attr('data-price-value', price.rrp_with_tax.value);
    }
    if (price.rrp_without_tax) {
      viewModel.rrpWithoutTax.$div.show();
      viewModel.rrpWithoutTax.$span.html(price.rrp_without_tax.formatted);
      viewModel.$priceValue.attr('data-price-value', price.rrp_without_tax.value);
    }
    if (price.saved) {
      viewModel.priceSaved.$div.show();
      viewModel.priceSaved.$span.html(price.saved.formatted);
    }
    if (price.non_sale_price_with_tax) {
      viewModel.priceLabel.$span.hide();
      viewModel.nonSaleWithTax.$div.show();
      viewModel.priceNowLabel.$span.show();
      viewModel.nonSaleWithTax.$span.html(price.non_sale_price_with_tax.formatted);
      viewModel.$priceValue.attr('data-price-sale-value', price.non_sale_price_with_tax.value);
    }
    if (price.non_sale_price_without_tax) {
      viewModel.priceLabel.$span.hide();
      viewModel.nonSaleWithoutTax.$div.show();
      viewModel.priceNowLabel.$span.show();
      viewModel.nonSaleWithoutTax.$span.html(price.non_sale_price_without_tax.formatted);
      viewModel.$priceValue.attr('data-price-sale-value', price.non_sale_price_without_tax.value);
    }
  }
  function filterEmptyFilesFromForm(formData) {
    try {
      for (var _iterator = _createForOfIteratorHelperLoose(formData), _step; !(_step = _iterator()).done;) {
        var _step$value = _step.value,
          key = _step$value[0],
          val = _step$value[1];
        if (val instanceof File && !val.name && !val.size) {
          formData["delete"](key);
        }
      }
    } catch (e) {
      console.error(e);
    }
    return formData;
  }
}

/***/ }),

/***/ "./assets/js/theme/halothemes/haloRecentViewedProducts.js":
/*!****************************************************************!*\
  !*** ./assets/js/theme/halothemes/haloRecentViewedProducts.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _haloAddOptionForProduct__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./haloAddOptionForProduct */ "./assets/js/theme/halothemes/haloAddOptionForProduct.js");
/* harmony import */ var _haloProductImageHover__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./haloProductImageHover */ "./assets/js/theme/halothemes/haloProductImageHover.js");



/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(context) {
  var list = getlistItems();
  var $this = document.querySelector('#halo-recent-viewed-products');
  var $wrapper = $this.querySelector('.swiper-wrapper');
  var options = {
    template: 'halothemes/product/halo-product-template'
  };
  var num = 0;
  if (list.length == 0) $this.style.display = 'none';
  load();
  function load() {
    var handleIntersection = function handleIntersection(entries, observer) {
      if (!entries[0].isIntersecting) return;
      observer.unobserve($this);
      getProduct(num);
    };
    new IntersectionObserver(handleIntersection.bind($this), {
      rootMargin: '0px 0px 400px 0px'
    }).observe($this);
  }
  function getlistItems() {
    var productId = parseInt(document.querySelector('[name="product_id"]').value);
    var listItems = JSON.parse(localStorage.getItem('_halo_recently_viewed') || '[]');
    if (productId && listItems.includes(parseInt(productId))) listItems.splice(listItems.indexOf(parseInt(productId)), 1);
    return listItems;
  }
  function getProduct() {
    var productId = list[num];
    if (!productId) return;
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.product.getById(productId, options, function (err, response) {
      if (err) return;
      $wrapper.insertAdjacentHTML('beforeend', response);
      num++;
      if (num + 1 < Number($this.dataset.limit)) getProduct(num);
      (0,_haloProductImageHover__WEBPACK_IMPORTED_MODULE_2__["default"])();
      (0,_haloAddOptionForProduct__WEBPACK_IMPORTED_MODULE_1__["default"])(context, 'halo-recent-viewed-products');
    });
  }
}

/***/ }),

/***/ "./assets/js/theme/halothemes/haloStickyAddToCart.js":
/*!***********************************************************!*\
  !*** ./assets/js/theme/halothemes/haloStickyAddToCart.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  if ($('#form-action-addToCart').length) {
    var scroll = $('#form-action-addToCart').offset(),
      scrollTop = scroll.top;
    $(window).scroll(function () {
      if ($(window).scrollTop() > scrollTop + 400) {
        if (!$('#halo_sticky_addToCart').hasClass('show_sticky')) {
          $('#halo_sticky_addToCart').addClass('show_sticky');
          if ($(window).width() > 550) {
            $('#recently_bought_list').css("bottom", $('#halo_sticky_addToCart').outerHeight() + 40);
          } else {
            if ($('#halo_sticky_addToCart').length) {
              $('#recently_bought_list').css("bottom", $('#halo_sticky_addToCart').outerHeight() + 30);
            } else {
              $('#recently_bought_list').css("bottom", 30);
            }
          }
        }
      } else {
        $('#halo_sticky_addToCart').removeClass('show_sticky');
        $('.pop-up-option').removeClass('is-open');
        $('body').removeClass('openPopupOption');
        $('.choose_options_add').removeClass('is-active');
        $('#recently_bought_list').css("bottom", 30);
      }
    });
    $(document).on('click', '.choose_options_add', function (event) {
      $(this).toggleClass('is-active');
      $('.pop-up-option').toggleClass('is-open');
      $('body').addClass('openPopupOption');
    });
    $(document).on('click', '.pop-up-option .close', function (event) {
      $(".pop-up-option").removeClass('is-open');
      $('body').removeClass('openPopupOption');
      $('.choose_options_add').removeClass('is-active');
    });
    $(document).on('click', function (event) {
      if ($('body').hasClass('openPopupOption')) {
        if ($(event.target).closest('#halo_sticky_addToCart').length === 0) {
          $('.pop-up-option').removeClass('is-open');
          $('body').removeClass('openPopupOption');
          $('.choose_options_add').removeClass('is-active');
        }
      }
    });
    window.onload = function () {
      if ($(window).scrollTop() > scrollTop + 400) {
        if (!$('#halo_sticky_addToCart').hasClass('show_sticky')) {
          $('#halo_sticky_addToCart').addClass('show_sticky');
          if ($(window).width() > 550) {
            $('#recently_bought_list').css("bottom", $('#halo_sticky_addToCart').outerHeight() + 40);
          } else {
            if ($('#halo_sticky_addToCart').length) {
              $('#recently_bought_list').css("bottom", $('#halo_sticky_addToCart').outerHeight() + 30);
            } else {
              $('#recently_bought_list').css("bottom", 30);
            }
          }
        }
      }
    };
  }
}

/***/ }),

/***/ "./assets/js/theme/product.js":
/*!************************************!*\
  !*** ./assets/js/theme/product.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Product)
/* harmony export */ });
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var sortablejs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sortablejs */ "./node_modules/sortablejs/modular/sortable.esm.js");
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _product_reviews__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./product/reviews */ "./assets/js/theme/product/reviews.js");
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _common_product_details__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common/product-details */ "./assets/js/theme/common/product-details.js");
/* harmony import */ var _product_video_gallery__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./product/video-gallery */ "./assets/js/theme/product/video-gallery.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
/* harmony import */ var _halothemes_haloSwiperProductImage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./halothemes/haloSwiperProductImage */ "./assets/js/theme/halothemes/haloSwiperProductImage.js");
/* harmony import */ var _halothemes_haloBundleProducts__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./halothemes/haloBundleProducts */ "./assets/js/theme/halothemes/haloBundleProducts.js");
/* harmony import */ var _halothemes_haloRecentViewedProducts__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./halothemes/haloRecentViewedProducts */ "./assets/js/theme/halothemes/haloRecentViewedProducts.js");
/* harmony import */ var _halothemes_haloStickyAddToCart__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./halothemes/haloStickyAddToCart */ "./assets/js/theme/halothemes/haloStickyAddToCart.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }













var Product = /*#__PURE__*/function (_PageManager) {
  function Product(context) {
    var _this;
    _this = _PageManager.call(this, context) || this;
    _this.url = window.location.href;
    _this.$reviewLink = $('[data-reveal-id="modal-review-form"]');
    _this.$bulkPricingLink = $('[data-reveal-id="modal-bulk-pricing"]');
    _this.reviewModal = (0,_global_modal__WEBPACK_IMPORTED_MODULE_8__["default"])('#modal-review-form')[0];
    return _this;
  }
  _inheritsLoose(Product, _PageManager);
  var _proto = Product.prototype;
  _proto.onReady = function onReady() {
    var _this2 = this;
    // Listen for foundation modal close events to sanitize URL after review.
    $(document).on('close.fndtn.reveal', function () {
      if (_this2.url.indexOf('#write_review') !== -1 && typeof window.history.replaceState === 'function') {
        window.history.replaceState(null, document.title, window.location.pathname);
      }
    });
    var validator;

    // Init collapsible
    (0,_common_collapsible__WEBPACK_IMPORTED_MODULE_4__["default"])();
    (0,_halothemes_haloSwiperProductImage__WEBPACK_IMPORTED_MODULE_9__["default"])();
    (0,_halothemes_haloBundleProducts__WEBPACK_IMPORTED_MODULE_10__["default"])($('.halo-productView'), this.context);
    this.productDetails = new _common_product_details__WEBPACK_IMPORTED_MODULE_5__["default"]($('.productView'), this.context, window.BCData.product_attributes);
    this.productDetails.setProductVariant();
    if (this.context.themeSettings.halo_stickyAddToCart) {
      (0,_halothemes_haloStickyAddToCart__WEBPACK_IMPORTED_MODULE_12__["default"])();
      this.productDetails.setProductVariant2();
    }
    (0,_product_video_gallery__WEBPACK_IMPORTED_MODULE_6__["default"])();
    this.bulkPricingHandler();
    this.videoPopup();
    this.soldProduct($('.productView-soldProduct'));
    this.countDownProduct($('.productView-countDown'));
    this.compareColors();
    this.askAnExpert();
    this.checkTabActive();
    this.checkProduct();
    window.matchMedia('(min-width: 768px)').addEventListener('change', function () {
      _this2.checkTabActive();
    });
    var isRecentViewedProducts = this.context.themeSettings.prodRecentViewed;
    if (isRecentViewedProducts) {
      (0,_halothemes_haloRecentViewedProducts__WEBPACK_IMPORTED_MODULE_11__["default"])(this.context);
      this.setRecentViewedProducts();
    }
    var $reviewForm = (0,_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__.classifyForm)('.writeReview-form');
    if ($reviewForm.length === 0) return;
    var review = new _product_reviews__WEBPACK_IMPORTED_MODULE_3__["default"]({
      $reviewForm: $reviewForm
    });
    $('body').on('click', '[data-reveal-id="modal-review-form"]', function () {
      validator = review.registerValidation(_this2.context);
      _this2.ariaDescribeReviewInputs($reviewForm);
    });
    $reviewForm.on('submit', function () {
      if (validator) {
        validator.performCheck();
        return validator.areAll('valid');
      }
      return false;
    });
    this.productReviewHandler();
  };
  _proto.ariaDescribeReviewInputs = function ariaDescribeReviewInputs($form) {
    $form.find('[data-input]').each(function (_, input) {
      var $input = $(input);
      var msgSpanId = $input.attr('name') + "-msg";
      $input.siblings('span').attr('id', msgSpanId);
      $input.attr('aria-describedby', msgSpanId);
    });
  };
  _proto.productReviewHandler = function productReviewHandler() {
    if (this.url.indexOf('#write_review') !== -1) {
      this.$reviewLink.trigger('click');
    }
  };
  _proto.bulkPricingHandler = function bulkPricingHandler() {
    if (this.url.indexOf('#bulk_pricing') !== -1) {
      this.$bulkPricingLink.trigger('click');
    }
  };
  _proto.videoPopup = function videoPopup() {
    if ($('.halo-productVideo-link').length > 0) {
      $(document).on('click', '.halo-productVideo-link', function (e) {
        e.preventDefault();
        $('.videoGallery-list .videoGallery-item:first-child >a').trigger('click');
      });
    }
  };
  _proto.soldProduct = function soldProduct($wrapper) {
    if ($wrapper.length > 0) {
      var numbersProduct_text = this.context.themeSettings.product_soldProduct_products,
        numbersHours_text = this.context.themeSettings.product_soldProduct_hours,
        soldProductText = this.context.themeSettings.product_soldProduct_text;
      var numbersProductList = JSON.parse("[" + numbersProduct_text + "]"),
        numbersProductItem = Math.floor(Math.random() * numbersProductList.length),
        numbersHoursList = JSON.parse("[" + numbersHours_text + "]"),
        numbersHoursItem = Math.floor(Math.random() * numbersHoursList.length);
      $wrapper.html('<svg class="icon d-inline-block v-a-middle"><use xlink:href="#icon-fire"/></svg><span class="text d-inline-block v-a-middle">' + numbersProductList[numbersProductItem] + " " + soldProductText + " " + numbersHoursList[numbersHoursItem] + 'h</span>');
      $wrapper.show();
    }
  };
  _proto.countDownProduct = function countDownProduct($wrapper) {
    if ($wrapper.length > 0) {
      var countDown = $wrapper.data('countdown'),
        countDownDate = new Date(countDown).getTime(),
        seft = $wrapper;
      var countdownfunction = setInterval(function () {
        var now = new Date().getTime(),
          distance = countDownDate - now;
        if (distance < 0) {
          clearInterval(countdownfunction);
          seft.remove();
        } else {
          var days = Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)),
            minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60)),
            seconds = Math.floor(distance % (1000 * 60) / 1000),
            strCountDown = '<div class="item"><span class="num">' + days + '</span><span class="text color-secondary f-size-small"> days</span></div>\
                                        <div class="item"><span class="num">' + hours + '</span><span class="text color-secondary f-size-small"> hours</span></div>\
                                        <div class="item"><span class="num">' + minutes + '</span><span class="text color-secondary f-size-small"> mins</span></div>\
                                        <div class="item"><span class="num">' + seconds + '</span><span class="text color-secondary f-size-small"> secs</span></div>';
          seft.html(strCountDown);
          $wrapper.removeClass('d-none');
        }
      }, 1000);
    }
  };
  _proto.compareColors = function compareColors() {
    var $swatchWrapper = $('.halo-compareColors-swatch'),
      $imageWrapper = $('.halo-compareColors-image'),
      $textWrapper = $('.halo-compareColors-text');
    $('.form-option', $swatchWrapper).on('click', function (event) {
      var $this = $(event.currentTarget);
      $this.toggleClass('show-color');
      var title = $this.find('.form-option-variant').attr('title'),
        id = $this.data('product-swatch-value'),
        $color,
        $color2,
        $color3,
        $img,
        $pattern;
      if ($this.hasClass('show-color')) {
        if ($this.find('.form-option-variant--color').length) {
          $color = $this.find('.form-option-variant--color').attr('style');
          $imageWrapper.append('<div class="item item-color item-' + id + '"><span class="color" style="' + $color + ';"></span><span class="title">' + title + '</span></div>');
        } else if ($this.find('.form-option-variant--color2').length) {
          $color = $this.find('.form-option-variant--color2 .color1').attr('style');
          $color2 = $this.find('.form-option-variant--color2 .color2').attr('style');
          $('.halo-compareColors-image').append('<div class="item item-color item-' + id + '"><span class="color color2"><span style="' + $color + ';"></span><span style="' + $color2 + ';"></span></span><span class="title">' + title + '</span></div>');
        } else if ($this.find('.form-option-variant--color3').length) {
          $color = $this.find('.form-option-variant--color3 .color1').attr('style');
          $color2 = $this.find('.form-option-variant--color3 .color2').attr('style');
          $color3 = $this.find('.form-option-variant--color3 .color3').attr('style');
          $imageWrapper.append('<div class="item item-color item-' + id + '"><span class="color color3"><span style="' + $color + ';"></span><span style="' + $color2 + ';"></span><span style="' + $color3 + ';"></span></span><span class="title">' + title + '</span></div>');
        } else if ($this.find('.form-option-variant--pattern').length) {
          $img = $this.find('.form-option-variant--pattern').attr('style');
          $pattern = $this.find('.form-option-variant--pattern').attr('data-pattern');
          $imageWrapper.append('<div class="item item-partern item-' + id + '"><span class="image"><img src=' + $pattern + ' alt=' + title + ' title=' + title + '></span><span class="title">' + title + '</span></div>');
        }
      } else {
        $('.item-' + id + '', $imageWrapper).remove();
      }
      if ($imageWrapper.children().length > 0) {
        $textWrapper.hide();
      } else {
        $textWrapper.show();
      }
      if ($(window).width() >= 1025) {
        var el = document.getElementById('color-swatch-image');
        new sortablejs__WEBPACK_IMPORTED_MODULE_1__["default"](el, {
          animation: 150
        });
      }
    });
  };
  _proto.askAnExpert = function askAnExpert() {
    var message;
    var url = this.context.themeSettings.halo_ask_an_expert_pagelink;
    $(document).ready(function () {
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.getPage(url, {
        template: 'halothemes/product/halo-ask-an-expert-form'
      }, function (err, response) {
        if (err) return;
        $('.hl-form-field-wrapper').html(response);
      });
    });
    $(document).on('click', '.ask-an-expert-link', function (event) {
      event.preventDefault();
      $('body').addClass('has-askAnExpert');
    });
    $(document).on('click', function (event) {
      if ($(event.target).closest('.ask-an-expert-link').length === 0) {
        $('body').removeClass('has-askAnExpert');
      }
    });
    $('.halo-ask-an-expert-form').on('submit', function (event) {
      event.preventDefault();
      var typeContact = $('.halo-ask-an-expert-form input[name=type_contact]:checked').val(),
        typePackage = $('.halo-ask-an-expert-form input[name=type_package]:checked').val(),
        customerMessage = $('.halo-ask-an-expert-form textarea[name=contact_comment_area]').val(),
        recaptcha = $('.halo-ask-an-expert-form #g-recaptcha-response').val(),
        title = $('.halo-ask-an-expert-form[data-product-ask-title]').attr('data-product-ask-title'),
        sku = $('.halo-ask-an-expert-form[data-product-ask-sku]').attr('data-product-ask-sku'),
        url = $('.halo-ask-an-expert-form[data-product-ask-url]').attr('data-product-ask-url');
      if (recaptcha == '') {
        var error = 'The captcha you entered is incorrect. Please try again.';
        $('#halo-ask-an-expert-results').html('<div class="alertBox alertBox--error">' + error + '</div>');
        return;
      }
      if (typeContact != '' && typePackage != '' && customerMessage != '' && recaptcha != '') {
        message = "\n                    1. Do you need: " + typePackage + " \n                    2. What can I help you with today: " + customerMessage + "\n                    3. How would you like me to contact you?: " + typeContact + "\n                    4. Product Name: " + title + "\n                    5. Product SKU: " + sku + "\n                    6. Product Link: " + url + "\n                ";
      }
      $('#contact_question').val(message);
      $.ajax({
        type: 'POST',
        url: '/pages.php?action=sendContactForm',
        data: $('.halo-ask-an-expert-form').serialize(),
        success: function success() {
          $('.halo-ask-an-expert-form').hide();
          $('#halo-ask-an-expert-results').html('<div class="alertBox alertBox--success">Thank you. We\'ve received your feedback and will respond shortly.</div>');
        }
      });
    });
  };
  _proto.checkTabActive = function checkTabActive() {
    var tab = document.querySelectorAll('[data-tab] .tab');
    var tabFirst = document.querySelector('[data-tab] .tab:first-child');
    var tabContent = document.querySelectorAll('.tabs-contents .tab-content');
    var tabContentFirst = document.querySelector('.tabs-contents .tab-content:first-child');
    if (window.matchMedia('(min-width: 768px)').matches) {
      removeTabActive();
      if (tabFirst) tabFirst.classList.add('is-active');
      if (tabContentFirst) tabContentFirst.classList.add('is-active');
    } else {
      removeTabActive();
    }
    function removeTabActive() {
      if (tab) {
        tab.forEach(function (content) {
          content.classList.remove('is-active');
        });
      }
      if (tabContent) {
        tabContent.forEach(function (content) {
          content.classList.remove('is-active');
        });
      }
    }
  };
  _proto.checkProduct = function checkProduct() {
    var relatedProducts = $('#halo-related-products'),
      similarProducts = $('#halo-similar-products');
    if (relatedProducts.find('.swiper-wrapper').text().trim() == '') {
      relatedProducts.hide();
    }
    if (similarProducts.find('.swiper-wrapper').text().trim() == '') {
      similarProducts.hide();
    }
  };
  _proto.setRecentViewedProducts = function setRecentViewedProducts() {
    var name = '_halo_recently_viewed';
    var productId = parseInt(document.querySelector('[name="product_id"]').value);
    var recentlyViewed = document.querySelector('#halo-recent-viewed-products');
    var listItems = JSON.parse(localStorage.getItem(name) || '[]');
    if (!productId) return;
    if (listItems.includes(productId)) listItems = listItems.filter(function (id) {
      return id !== productId;
    });
    listItems.unshift(productId);
    localStorage.setItem(name, JSON.stringify(listItems.slice(0, Number(recentlyViewed.dataset.limit))));
  };
  return Product;
}(_page_manager__WEBPACK_IMPORTED_MODULE_2__["default"]);


/***/ }),

/***/ "./assets/js/theme/product/video-gallery.js":
/*!**************************************************!*\
  !*** ./assets/js/theme/product/video-gallery.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VideoGallery: () => (/* binding */ VideoGallery),
/* harmony export */   "default": () => (/* binding */ videoGallery)
/* harmony export */ });
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
var VideoGallery = /*#__PURE__*/function () {
  function VideoGallery($element) {
    this.$player = $element.find('[data-video-player]');
    this.$videos = $element.find('[data-video-item]');
    this.currentVideo = {};
    this.bindEvents();
  }
  var _proto = VideoGallery.prototype;
  _proto.selectNewVideo = function selectNewVideo(e) {
    e.preventDefault();
    var $target = $(e.currentTarget);
    this.currentVideo = {
      id: $target.data('videoId'),
      $selectedThumb: $target
    };
    this.setMainVideo();
    this.setActiveThumb();
  };
  _proto.setMainVideo = function setMainVideo() {
    this.$player.attr('src', "//www.youtube.com/embed/" + this.currentVideo.id);
  };
  _proto.setActiveThumb = function setActiveThumb() {
    this.$videos.removeClass('is-active');
    this.currentVideo.$selectedThumb.addClass('is-active');
  };
  _proto.bindEvents = function bindEvents() {
    this.$videos.on('click', this.selectNewVideo.bind(this));
  };
  return VideoGallery;
}();
function videoGallery() {
  var pluginKey = 'video-gallery';
  var $videoGallery = $("[data-" + pluginKey + "]");
  $videoGallery.each(function (index, element) {
    var $el = $(element);
    var isInitialized = $el.data(pluginKey) instanceof VideoGallery;
    if (isInitialized) {
      return;
    }
    $el.data(pluginKey, new VideoGallery($el));
  });
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLmFzc2V0c19qc190aGVtZV9wcm9kdWN0X2pzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUErQztBQUNFO0FBQ21CO0FBQ3pCO0FBRTNDLDZCQUFlLG9DQUFTSSxNQUFNLEVBQUVDLE9BQU8sRUFBRTtFQUNyQyxJQUFNQyxZQUFZLEdBQUdDLFFBQVEsQ0FBQ0YsT0FBTyxDQUFDRyxTQUFTLENBQUM7SUFDNUNDLFdBQVcsR0FBR0MsQ0FBQyxDQUFDLHdCQUF3QixDQUFDO0lBQ3pDQyxPQUFPLEdBQUdELENBQUMsQ0FBQyx1QkFBdUIsQ0FBQztJQUNwQ0UsV0FBVyxHQUFHRCxPQUFPLENBQUNFLElBQUksQ0FBQyw0Q0FBNEMsQ0FBQztFQUU1RSxJQUFJQyxRQUFRLEdBQUdULE9BQU8sQ0FBQ1UsS0FBSztFQUU1QkMsVUFBVSxDQUFDLENBQUM7RUFFWk4sQ0FBQyxDQUFDTyxRQUFRLENBQUMsQ0FBQ0MsRUFBRSxDQUFDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxVQUFBQyxLQUFLLEVBQUk7SUFDckRBLEtBQUssQ0FBQ0MsY0FBYyxDQUFDLENBQUM7SUFFdEIsSUFBSUMsT0FBTyxHQUFHWCxDQUFDLENBQUNTLEtBQUssQ0FBQ0csYUFBYSxDQUFDO0lBRXBDWixDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQ2EsR0FBRyxDQUFDRixPQUFPLENBQUMsQ0FBQ0csV0FBVyxDQUFDLFVBQVUsQ0FBQztJQUM5RGQsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUNhLEdBQUcsQ0FBQ0YsT0FBTyxDQUFDSSxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDRCxXQUFXLENBQUMsU0FBUyxDQUFDO0lBRTFGLElBQUksQ0FBQ0gsT0FBTyxDQUFDSSxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQ0MsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO01BQzNETCxPQUFPLENBQUNNLFFBQVEsQ0FBQyxVQUFVLENBQUM7TUFDNUJO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Q0FBQ1ksR0FBRyxDQUFDLENBQUM7RUFDOUMsQ0FBQyxDQUFDO0FBQ04iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9IYWxvLy4vYXNzZXRzL2pzL3RoZW1lL2hhbG90aGVtZXMvaGFsb0J1bmRsZVByb2R1Y3RzLmpzIiwid2VicGFjazovL0hhbG8vLi9hc3NldHMvanMvdGhlbWUvaGFsb3RoZW1lcy9oYWxvUmVjZW50Vmlld2VkUHJvZHVjdHMuanMiLCJ3ZWJwYWNrOi8vSGFsby8uL2Fzc2V0cy9qcy90aGVtZS9oYWxvdGhlbWVzL2hhbG9TdGlja3lBZGRUb0NhcnQuanMiLCJ3ZWJwYWNrOi8vSGFsby8uL2Fzc2V0cy9qcy90aGVtZS9wcm9kdWN0LmpzIiwid2VicGFjazovL0hhbG8vLi9hc3NldHMvanMvdGhlbWUvcHJvZHVjdC92aWRlby1nYWxsZXJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB1dGlscyBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5pbXBvcnQgeyBzaG93QWxlcnRNb2RhbCB9IGZyb20gJy4uL2dsb2JhbC9tb2RhbCc7XG5pbXBvcnQgaGFsb0NhbGN1bGF0ZUZyZWVTaGlwcGluZyBmcm9tICcuL2hhbG9DYWxjdWxhdGVGcmVlU2hpcHBpbmcnO1xuaW1wb3J0IGZvcm1zIGZyb20gJy4uL2NvbW1vbi9tb2RlbHMvZm9ybXMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigkc2NvcGUsIGNvbnRleHQpIHtcbiAgICBjb25zdCB0aGlzUHJvdWN0SWQgPSBwYXJzZUludChjb250ZXh0LnByb2R1Y3RJZCksXG4gICAgICAgICRyZWxhdGVkVGFiID0gJCgnI2hhbG8tcmVsYXRlZC1wcm9kdWN0cycpLFxuICAgICAgICAkYnVuZGxlID0gJCgnI2hhbG8tYnVuZGxlLXByb2R1Y3RzJyksXG4gICAgICAgICRidW5kbGVMaXN0ID0gJGJ1bmRsZS5maW5kKCcuaGFsby1wcm9kdWN0LWxpc3QgLmJ1bmRsZS1wcm9kdWN0LXdyYXBwZXInKTtcblxuICAgIHZhciBjdXJyZW5jeSA9IGNvbnRleHQubW9uZXk7XG5cbiAgICBzaG93QnVuZGxlKCk7XG5cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmhhbG8tdG9nZ2xlLW9wdGlvbnMnLCBldmVudCA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdmFyICR0YXJnZXQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuXG4gICAgICAgICQoJy5oYWxvLXRvZ2dsZS1vcHRpb25zJykubm90KCR0YXJnZXQpLnJlbW92ZUNsYXNzKCdpcy1mb2N1cycpO1xuICAgICAgICAkKCcuaGFsby1kZXRhaWwtb3B0aW9ucycpLm5vdCgkdGFyZ2V0Lm5leHQoJy5oYWxvLWRldGFpbC1vcHRpb25zJykpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XG5cbiAgICAgICAgaWYgKCEkdGFyZ2V0Lm5leHQoJy5oYWxvLWRldGFpbC1vcHRpb25zJykuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xuICAgICAgICAgICAgJHRhcmdldC5hZGRDbGFzcygnaXMtZm9jdXMnKTtcbiAgICAgICAgICAgICR0YXJnZXQubmV4dCgnLmhhbG8tZGV0YWlsLW9wdGlvbnMnKS5hZGRDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJHRhcmdldC5uZXh0KCcuaGFsby1kZXRhaWwtb3B0aW9ucycpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XG4gICAgICAgICAgICAkdGFyZ2V0LnJlbW92ZUNsYXNzKCdpcy1mb2N1cycpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnW2RhdGEtaGFsby1vcHRpb24tY2xvc2VdJywgZXZlbnQgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICQoJy5oYWxvLWRldGFpbC1vcHRpb25zJykucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgJCgnLmhhbG8tdG9nZ2xlLW9wdGlvbnMnKS5yZW1vdmVDbGFzcygnaXMtZm9jdXMnKTtcbiAgICB9KTtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKCQoJy5oYWxvLWRldGFpbC1vcHRpb25zJykuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xuICAgICAgICAgICAgaWYgKCgkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnLmhhbG8tZGV0YWlsLW9wdGlvbnMnKS5sZW5ndGggPT09IDApICYmICgkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnLmhhbG8tdG9nZ2xlLW9wdGlvbnMnKS5sZW5ndGggPT09IDApKXtcbiAgICAgICAgICAgICAgICAkKCcuaGFsby1kZXRhaWwtb3B0aW9ucycpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XG4gICAgICAgICAgICAgICAgJCgnLmhhbG8tdG9nZ2xlLW9wdGlvbnMnKS5yZW1vdmVDbGFzcygnaXMtZm9jdXMnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgJChkb2N1bWVudCkub24oJ2NoYW5nZScsICcuaGFsby1kZXRhaWwtY2hlY2tib3gnLCBldmVudCA9PiB7XG4gICAgICAgIHZhciAkdGFyZ2V0ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KSxcbiAgICAgICAgICAgIGlkID0gJHRhcmdldC5hdHRyKCdpZCcpLnJlcGxhY2UoJ2ZidF9wcm9kdWN0JywnJyksXG4gICAgICAgICAgICBwcm9kdWN0ID0gJCgnLmhhbG8tcHJvZHVjdC1pdGVtW2RhdGEtcHJvZHVjdC1pZD1cIicgKyBpZCArICdcIl0nKTtcblxuICAgICAgICBpZigkdGFyZ2V0LmlzKCc6Y2hlY2tlZCcpID09IGZhbHNlKSB7XG4gICAgICAgICAgICBwcm9kdWN0LnJlbW92ZUNsYXNzKCdpc0NoZWNrZWQnKTtcbiAgICAgICAgICAgIHByb2R1Y3QuZmluZCgnLnN0YXR1cycpLmFkZENsYXNzKCdkaXNhYmxlJykudGV4dCgnVGhpcyBpdGVtJyk7XG4gICAgICAgICAgICAkKCcjaGFsby1hZGRBbGwnKS5maW5kKCcubnVtYmVyJykudGV4dCgkKCcuaGFsby1wcm9kdWN0LWl0ZW0uaXNDaGVja2VkJykubGVuZ3RoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJvZHVjdC5hZGRDbGFzcygnaXNDaGVja2VkJyk7XG4gICAgICAgICAgICBwcm9kdWN0LmZpbmQoJy5zdGF0dXMnKS5yZW1vdmVDbGFzcygnZGlzYWJsZScpLnRleHQoJ1NlbGVjdGVkJyk7XG4gICAgICAgICAgICAkKCcjaGFsby1hZGRBbGwnKS5maW5kKCcubnVtYmVyJykudGV4dCgkKCcuaGFsby1wcm9kdWN0LWl0ZW0uaXNDaGVja2VkJykubGVuZ3RoKVxuICAgICAgICB9XG5cbiAgICAgICAgdG90YWxQcmljZSgpO1xuICAgIH0pO1xuXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJyNoYWxvLWFkZEFsbCcsIGV2ZW50ID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBjb25zdCAkZm9ybSA9ICQoJ2Zvcm0nLCAkYnVuZGxlKTtcbiAgICAgICAgdmFyIGFyclBybyA9IG5ldyBBcnJheSgpO1xuXG4gICAgICAgICQoJy5oYWxvLWRldGFpbC1jaGVja2JveCcpLmVhY2goKGluZGV4LCB2YWwpID0+IHtcbiAgICAgICAgICAgIGlmICgkKHZhbCkuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICAgICAgICBhcnJQcm8ucHVzaChpbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBjaGVjayA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChhcnJQcm8ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY2hlY2sgPSBjaGVja1Byb2R1Y3QoJGZvcm0sIGFyclBybyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2hlY2spIHtcbiAgICAgICAgICAgIGlmIChhcnJQcm8ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHZhciBrID0gYXJyUHJvLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgICRidW5kbGUuZmluZCgnLmxvYWRpbmdPdmVybGF5Jykuc2hvdygpO1xuXG4gICAgICAgICAgICAgICAgYWRkVG9DYXJ0KCRmb3JtLCAwLCBhcnJQcm8sIGspO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gJ1BsZWFzZSBtYWtlIHN1cmUgYWxsIG9wdGlvbnMgaGF2ZSBiZWVuIGZpbGxlZCBpbi4nO1xuXG4gICAgICAgICAgICBpZiAoZXJyb3JNZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdG1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG4gICAgICAgICAgICAgICAgdG1wLmlubmVySFRNTCA9IGVycm9yTWVzc2FnZTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBzaG93QWxlcnRNb2RhbCh0bXAudGV4dENvbnRlbnQgfHwgdG1wLmlubmVyVGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gc2hvd0J1bmRsZSgpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogJ2hhbG90aGVtZXMvcHJvZHVjdC9oYWxvLWJ1bmRsZS1wcm9kdWN0cy10bXAnXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIHZhciBwcm9kQnVuZGxlSWQgPSBbXSxcbiAgICAgICAgICAgIHRvdGFsQmxvY2sgPSAnJztcblxuICAgICAgICBmaXJzdEl0ZW0oKTtcblxuICAgICAgICBpZigkYnVuZGxlLmhhc0NsYXNzKCdoYWxvLWJ1bmRsZS1sb2dpbicpKXtcbiAgICAgICAgICAgIHRvdGFsQmxvY2sgPSAnPGRpdiBjbGFzcz1cImhhbG8tcHJvZHVjdC10b3RhbFwiPlxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJidXR0b24gYnV0dG9uLS1wcmltYXJ5IGJ1dHRvbi0tc21hbGwgaGFsby1wcm9kdWN0LXRvdGFsLWJ1dHRvbiBtLTBcIiBkaXNhYmxlZCBocmVmPVwiI1wiPjxzcGFuPkxvZyBpbiBmb3IgcHJpY2luZzwvc3Bhbj48L2E+XFxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2Pic7XG4gICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgIHRvdGFsQmxvY2sgPSAnPGRpdiBjbGFzcz1cImhhbG8tcHJvZHVjdC10b3RhbCBkLWZsZXggZC1ibG9jay10YiBhLWktc3RhcnQgai1jLWJldHdlZW5cIj5cXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b3RhbC1wcmljZVwiPlxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dFwiPjxzcGFuPlByaWNlIFRvdGFsPC9zcGFuPjwvc3Bhbj5cXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByaWNlIHByaWNlLXNhbGVcIj48L3NwYW4+XFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcmljZVwiPjwvc3Bhbj5cXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJidXR0b24gYnV0dG9uLS1wcmltYXJ5IGJ1dHRvbi0tc21hbGwgaGFsby1wcm9kdWN0LXRvdGFsLWJ1dHRvbiBtLTBcIiBpZD1cImhhbG8tYWRkQWxsXCIgaHJlZj1cIiNcIj48c3Bhbj5BZGQgPHNwYW4gY2xhc3M9XCJudW1iZXJcIj5hbGw8L3NwYW4+IGl0ZW0ocykgdG8gYmFnPC9zcGFuPjwvYT5cXFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+JztcbiAgICAgICAgfVxuXG4gICAgICAgICRidW5kbGUuZmluZCgnLmJ1bmRsZS1wcm9kdWN0LXJpZ2h0JykuYXBwZW5kKHRvdGFsQmxvY2spO1xuXG4gICAgICAgICQuZWFjaChjb250ZXh0LnByb2R1Y3RDdXN0b21GaWVsZHMsIGZ1bmN0aW9uKGluZGV4LCBvYmopIHtcbiAgICAgICAgICAgIGlmIChvYmoubmFtZSA9PSAnX19idW5kbGVpZCcpIHtcbiAgICAgICAgICAgICAgICBwcm9kQnVuZGxlSWQgPSBKU09OLnBhcnNlKCdbJytvYmoudmFsdWUrJ10nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcHJvZEJ1bmRsZUlkID0gJC5ncmVwKHByb2RCdW5kbGVJZCwgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUgIT0gdGhpc1Byb3VjdElkO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoJGJ1bmRsZS5sZW5ndGggPiAwICYmIHByb2RCdW5kbGVJZC5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgdmFyIG51bSA9IDAsXG4gICAgICAgICAgICAgICAgbGlzdCA9IFtdO1xuXG4gICAgICAgICAgICAkcmVsYXRlZFRhYi5maW5kKCcuY2FyZCcpLmVhY2goKGluZGV4LCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICBsaXN0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFwiXCJcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHZhciBwSWQgPSAkKHZhbCkuZGF0YSgncHJvZHVjdC1pZCcpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHBJZCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuYXBpLnByb2R1Y3QuZ2V0QnlJZChwSWQsIG9wdGlvbnMsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0LmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihlbGVtZW50LmluZGV4ID09IGluZGV4KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5kYXRhID0gcmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bSsrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihudW0gPT0gJHJlbGF0ZWRUYWIuZmluZCgnLmNhcmQnKS5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dMaXN0KGxpc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmICgkYnVuZGxlLmxlbmd0aCA+IDAgJiYgcHJvZEJ1bmRsZUlkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHZhciBudW0gPSAwLFxuICAgICAgICAgICAgICAgIGxpc3QgPSBbXTtcblxuICAgICAgICAgICAgJC5lYWNoKHByb2RCdW5kbGVJZCwgZnVuY3Rpb24oaSwgdmFsKXtcbiAgICAgICAgICAgICAgICBsaXN0LnB1c2goe2k6aSwgZGF0YTogXCJcIn0pO1xuXG4gICAgICAgICAgICAgICAgdmFyIHBJZCA9IHByb2RCdW5kbGVJZFtpXTtcblxuICAgICAgICAgICAgICAgIGlmIChwSWQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLmFwaS5wcm9kdWN0LmdldEJ5SWQocElkLCBvcHRpb25zLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihlbGVtZW50LmkgPT0gaSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuZGF0YSA9IHJlc3BvbnNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBudW0rKztcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobnVtID09IHByb2RCdW5kbGVJZC5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dMaXN0KGxpc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpcnN0SXRlbSgpe1xuICAgICAgICBjb25zdCBmaXJzdEl0ZW0gPSAkYnVuZGxlTGlzdC5maW5kKCcuaGFsby1wcm9kdWN0LWl0ZW1GaXJzdCcpLFxuICAgICAgICAgICAgcElkID0gZmlyc3RJdGVtLmRhdGEoJ3Byb2R1Y3QtaWQnKSxcbiAgICAgICAgICAgIGZvcm0gPSBmaXJzdEl0ZW0uZmluZCgnZm9ybScpLFxuICAgICAgICAgICAgaGFzT3B0aW9ucyA9IGZvcm0uZmluZCgnW2RhdGEtZmJ0LW9wdGlvbi1jaGFuZ2VdJykubGVuZ3RoLFxuICAgICAgICAgICAgaGFzRGVmYXVsdE9wdGlvbnMgPSBmb3JtLmZpbmQoJ1tkYXRhLWRlZmF1bHRdJykubGVuZ3RoO1xuXG4gICAgICAgIGlmIChoYXNEZWZhdWx0T3B0aW9ucyAmJiBoYXNPcHRpb25zKSB7XG4gICAgICAgICAgICB1dGlscy5hcGkucHJvZHVjdEF0dHJpYnV0ZXMub3B0aW9uQ2hhbmdlKHBJZCwgZm9ybS5zZXJpYWxpemUoKSwgJ3Byb2R1Y3RzL2J1bGstZGlzY291bnQtcmF0ZXMnLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZXNEYXRhID0gcmVzcG9uc2UuZGF0YSB8fCB7fTtcbiAgICAgICAgICAgICAgICBjb25zdCBhdHRyaWJ1dGVzQ29udGVudCA9IHJlc3BvbnNlLmNvbnRlbnQgfHwge307XG5cbiAgICAgICAgICAgICAgICB1cGRhdGVQcm9kdWN0QXR0cmlidXRlcyhmb3JtLCBhdHRyaWJ1dGVzRGF0YSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaGFzRGVmYXVsdE9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlVmlldyhmb3JtLCBhdHRyaWJ1dGVzRGF0YSwgYXR0cmlidXRlc0NvbnRlbnQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZURlZmF1bHRBdHRyaWJ1dGVzRm9yT09TKGF0dHJpYnV0ZXNEYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNob3dMaXN0KGxpc3Qpe1xuICAgICAgICBsaXN0LmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIHZhciByZXNwb25zZSA9IGVsZW1lbnQuZGF0YTtcblxuICAgICAgICAgICAgaWYocmVzcG9uc2UgIT0gdW5kZWZpbmVkICYmIHJlc3BvbnNlICE9IG51bGwgJiYgcmVzcG9uc2UgIT0gJycpe1xuICAgICAgICAgICAgICAgICRidW5kbGVMaXN0LmFwcGVuZChyZXNwb25zZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoJChyZXNwb25zZSkuZmluZCgnLmhhbG8tdG9nZ2xlLW9wdGlvbnMnKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBJZCA9ICQocmVzcG9uc2UpLmRhdGEoJ3Byb2R1Y3QtaWQnKSxcbiAgICAgICAgICAgICAgICAgICAgJGZvcm0gPSAkYnVuZGxlTGlzdC5maW5kKCcuaGFsby1wcm9kdWN0LWl0ZW1bZGF0YS1wcm9kdWN0LWlkPVwiJyArIHBJZCArICdcIl0gZm9ybScpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0ICRwcm9kdWN0T3B0aW9uc0VsZW1lbnQgPSAkKCdbZGF0YS1mYnQtb3B0aW9uLWNoYW5nZV0nLCAkZm9ybSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhc09wdGlvbnMgPSAkcHJvZHVjdE9wdGlvbnNFbGVtZW50Lmh0bWwoKS50cmltKCkubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBoYXNEZWZhdWx0T3B0aW9ucyA9ICQocmVzcG9uc2UpLmZpbmQoJ1tkYXRhLWRlZmF1bHRdJykubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChoYXNEZWZhdWx0T3B0aW9ucyAmJiBoYXNPcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlscy5hcGkucHJvZHVjdEF0dHJpYnV0ZXMub3B0aW9uQ2hhbmdlKHBJZCwgJGZvcm0uc2VyaWFsaXplKCksICdwcm9kdWN0cy9idWxrLWRpc2NvdW50LXJhdGVzJywgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihyZXNwb25zZSAhPSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhdHRyaWJ1dGVzRGF0YSA9IHJlc3BvbnNlLmRhdGEgfHwge307XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZXNDb250ZW50ID0gcmVzcG9uc2UuY29udGVudCB8fCB7fTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVQcm9kdWN0QXR0cmlidXRlcygkZm9ybSwgYXR0cmlidXRlc0RhdGEpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoYXNEZWZhdWx0T3B0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlVmlldygkZm9ybSwgYXR0cmlidXRlc0RhdGEsIGF0dHJpYnV0ZXNDb250ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZURlZmF1bHRBdHRyaWJ1dGVzRm9yT09TKGF0dHJpYnV0ZXNEYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgc2V0UHJvZHVjdFZhcmlhbnQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5oYWxvLXByb2R1Y3QtaXRlbScsICRzY29wZSkuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICQoZWxlbWVudCkub24oJ2NsaWNrJywgJ1tkYXRhLXF1YW50aXR5LWZidC1jaGFuZ2VdIGJ1dHRvbicsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0ICR0YXJnZXQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRJdGVtUHJvSWQgPSAkdGFyZ2V0LmNsb3Nlc3QoJy5oYWxvLXByb2R1Y3QtaXRlbScpLmRhdGEoJ3Byb2R1Y3QtaWQnKTtcbiAgICAgICAgICAgICAgICBjb25zdCAkaW5wdXQgPSAkKGAuaGFsby1wcm9kdWN0LWl0ZW1bZGF0YS1wcm9kdWN0LWlkPVwiJHtjdXJyZW50SXRlbVByb0lkfVwiXSBbbmFtZT1mYnRxdHlcXFxcW1xcXFxdXWAsICRzY29wZSk7XG4gICAgICAgICAgICAgICAgY29uc3QgcXVhbnRpdHlNaW4gPSBwYXJzZUludCgkaW5wdXQuZGF0YSgncXVhbnRpdHlNaW4nKSwgMTApO1xuICAgICAgICAgICAgICAgIGNvbnN0IHF1YW50aXR5TWF4ID0gcGFyc2VJbnQoJGlucHV0LmRhdGEoJ3F1YW50aXR5TWF4JyksIDEwKTtcbiAgICAgICAgICAgICAgICBsZXQgcXR5ID0gZm9ybXMubnVtYmVyc09ubHkoJGlucHV0LnZhbCgpKSA/IHBhcnNlSW50KCRpbnB1dC52YWwoKSwgMTApIDogcXVhbnRpdHlNaW47XG4gICAgXG4gICAgICAgICAgICAgICAgaWYgKCR0YXJnZXQuZGF0YSgnYWN0aW9uJykgPT09ICdpbmMnKSB7XG4gICAgICAgICAgICAgICAgICAgIHF0eSA9IGZvcm1zLnZhbGlkYXRlSW5jcmVhc2VBZ2FpbnN0TWF4Qm91bmRhcnkocXR5LCBxdWFudGl0eU1heCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChxdHkgPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHF0eSA9IGZvcm1zLnZhbGlkYXRlRGVjcmVhc2VBZ2FpbnN0TWluQm91bmRhcnkocXR5LCBxdWFudGl0eU1pbik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgJGlucHV0LmF0dHIoJ3ZhbHVlJyxxdHkpO1xuICAgICAgICAgICAgICAgICRpbnB1dC52YWwocXR5KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBwcm9kdWN0T3B0aW9ucygpO1xuXG4gICAgICAgIGlmKCEkYnVuZGxlLmhhc0NsYXNzKCdoYWxvLWJ1bmRsZS1sb2dpbicpKXtcbiAgICAgICAgICAgIHRvdGFsUHJpY2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgICQoJyNoYWxvLWFkZEFsbCcpLmZpbmQoJy5udW1iZXInKS50ZXh0KCQoJy5oYWxvLXByb2R1Y3QtaXRlbS5pc0NoZWNrZWQnKS5sZW5ndGgpO1xuICAgICAgICBcbiAgICAgICAgJGJ1bmRsZS5yZW1vdmVDbGFzcygnaGFsby1ibG9jay1kaXNhYmxlJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tQcm9kdWN0KGZvcm0sIGFyclBybykge1xuICAgICAgICB2YXIgY2hlY2sgPSB0cnVlO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyUHJvLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgayA9IGFyclByb1tpXSxcbiAgICAgICAgICAgICAgICAkZm9ybSA9ICQoZm9ybVtrXSk7XG5cbiAgICAgICAgICAgIGlmICgkZm9ybS5maW5kKCdbZGF0YS1mYnQtb3B0aW9uLWNoYW5nZV0nKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjaGVjayA9IGNoZWNrQmVmb3JlQWRkKCRmb3JtKTtcblxuICAgICAgICAgICAgICAgIGlmIChjaGVjayA9PSBmYWxzZSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2hlY2s7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tCZWZvcmVBZGQoJGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgdmFyIGNoZWNrID0gdHJ1ZSxcbiAgICAgICAgICAgIGF0dCA9IFwiXCI7XG5cbiAgICAgICAgJGF0dHJpYnV0ZXMuZmluZCgnaW5wdXQ6dGV4dCwgaW5wdXQ6cGFzc3dvcmQsIGlucHV0OmZpbGUsIHRleHRhcmVhJykuZWFjaCgoaW5kZXgsIGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGlmICghJChlbGVtZW50KS5wcm9wKCdyZXF1aXJlZCcpKSB7fSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoJChlbGVtZW50KS52YWwoKSkge30gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICQoZWxlbWVudCkuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgY2hlY2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRhdHRyaWJ1dGVzLmZpbmQoJ3NlbGVjdCcpLmVhY2goKGluZGV4LCBlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoISQoZWxlbWVudCkucHJvcCgncmVxdWlyZWQnKSkge30gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCQoZWxlbWVudCkudmFsKCkpIHt9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkYXR0cmlidXRlcy5maW5kKCdpbnB1dDpyYWRpbywgaW5wdXQ6Y2hlY2tib3gnKS5lYWNoKChpbmRleCwgZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGF0dCAhPSAkKGVsZW1lbnQpLmF0dHIoXCJuYW1lXCIpKSB7XG4gICAgICAgICAgICAgICAgYXR0ID0gJChlbGVtZW50KS5hdHRyKFwibmFtZVwiKTtcbiAgICAgICAgICAgICAgICBpZiAoISQoZWxlbWVudCkucHJvcCgncmVxdWlyZWQnKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoJChlbGVtZW50KS5hdHRyKFwidHlwZVwiKSA9PSBcImNoZWNrYm94XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKFwiW25hbWU9J1wiICsgYXR0ICsgXCInXTpjaGVja2VkXCIpLnZhbCgpKSB7fVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICgkKGVsZW1lbnQpLmF0dHIoXCJ0eXBlXCIpID09IFwicmFkaW9cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQoXCJbbmFtZT0nXCIgKyBhdHQgKyBcIiddOmNoZWNrZWRcIikudmFsKCkpIHt9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoJChlbGVtZW50KS5hdHRyKFwidHlwZVwiKSA9PSBcImNoZWNrYm94XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKFwiW25hbWU9J1wiICsgYXR0ICsgXCInXTpjaGVja2VkXCIpLnZhbCgpKSB7fSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICgkKGVsZW1lbnQpLmF0dHIoXCJ0eXBlXCIpID09IFwicmFkaW9cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQoXCJbbmFtZT0nXCIgKyBhdHQgKyBcIiddOmNoZWNrZWRcIikudmFsKCkpIHt9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBjaGVjaztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRUb0NhcnQoZm9ybSwgaSwgYXJyUCwgaykge1xuICAgICAgICBpZiAod2luZG93LkZvcm1EYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwcm9kID0gYXJyUFtpXTtcbiAgICAgICAgdmFyIGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKGZvcm1bcHJvZF0pO1xuXG4gICAgICAgIHV0aWxzLmFwaS5jYXJ0Lml0ZW1BZGQoZmlsdGVyRW1wdHlGaWxlc0Zyb21Gb3JtKGZvcm1EYXRhKSwgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGVyciB8fCByZXNwb25zZS5kYXRhLmVycm9yO1xuICAgICAgICAgICAgY29uc3QgcHJvZHVjdHNJdGVtID0gJCgnLmhhbG8tcHJvZHVjdC1pdGVtJyk7XG5cbiAgICAgICAgICAgIHByb2R1Y3RzSXRlbS5lYWNoKChpbmRleCwgcHJvZHVjdEl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBxdWFudGl0eURhdGEgPSAkKCdbbmFtZT1mYnRxdHlcXFxcW1xcXFxdXScsIHByb2R1Y3RJdGVtKS52YWwoKTtcbiAgICAgICAgICAgICAgICAkKHByb2R1Y3RJdGVtKS5maW5kKCdbbmFtZT1xdHlcXFxcW1xcXFxdXScpLmF0dHIoJ3ZhbHVlJyxxdWFudGl0eURhdGEpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChlcnJvck1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0bXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcbiAgICAgICAgICAgICAgICB0bXAuaW5uZXJIVE1MID0gZXJyb3JNZXNzYWdlO1xuICAgICAgICAgICAgICAgIGFsZXJ0KHRtcC50ZXh0Q29udGVudCB8fCB0bXAuaW5uZXJUZXh0KTtcbiAgICAgICAgICAgICAgICBrID0gayAtIDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGkrKztcblxuICAgICAgICAgICAgaWYgKGkgPj0gYXJyUC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAkYnVuZGxlLmZpbmQoJy5sb2FkaW5nT3ZlcmxheScpLmhpZGUoKTtcblxuICAgICAgICAgICAgICAgIGlmIChjb250ZXh0LnRoZW1lU2V0dGluZ3MuaGFsb0FkZFRvQ2FydEFjdGlvbiA9PT0gJ3NpZGViYXInKXtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiAnY29tbW9uL2NhcnQtcHJldmlldydcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsb2FkaW5nQ2xhc3MgPSAnaXMtbG9hZGluZyc7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0ICRib2R5ID0gJCgnYm9keScpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCAkY2FydERyb3Bkb3duID0gJCgnI2hhbG8tY2FydC1zaWRlYmFyIC5oYWxvLXNpZGViYXItd3JhcHBlcicpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCAkY2FydExvYWRpbmcgPSAkKCc8ZGl2IGNsYXNzPVwibG9hZGluZ092ZXJsYXlcIj48L2Rpdj4nKTtcblxuICAgICAgICAgICAgICAgICAgICAkYm9keS5hZGRDbGFzcygnb3BlbkNhcnRTaWRlYmFyJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgJGNhcnREcm9wZG93blxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKGxvYWRpbmdDbGFzcylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5odG1sKCRjYXJ0TG9hZGluZyk7XG4gICAgICAgICAgICAgICAgICAgICRjYXJ0TG9hZGluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgLnNob3coKTtcblxuICAgICAgICAgICAgICAgICAgICB1dGlscy5hcGkuY2FydC5nZXRDb250ZW50KG9wdGlvbnMsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkY2FydERyb3Bkb3duXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKGxvYWRpbmdDbGFzcylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaHRtbChyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkY2FydExvYWRpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaGlkZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBxdWFudGl0eSA9ICQocmVzcG9uc2UpLmZpbmQoJ1tkYXRhLWNhcnQtcXVhbnRpdHldJykuZGF0YSgnY2FydFF1YW50aXR5JykgfHwgMDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJGJvZHkudHJpZ2dlcignY2FydC1xdWFudGl0eS11cGRhdGUnLCBxdWFudGl0eSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbG9DYWxjdWxhdGVGcmVlU2hpcHBpbmcoY29udGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlZGlyZWN0VG8oY29udGV4dC51cmxzLmNhcnQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYWRkVG9DYXJ0KGZvcm0sIGksIGFyclAsIGspO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc1J1bm5pbmdJbklmcmFtZSgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cuc2VsZiAhPT0gd2luZG93LnRvcDtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWRpcmVjdFRvKHVybCkge1xuICAgICAgICBpZiAoaXNSdW5uaW5nSW5JZnJhbWUoKSAmJiAhd2luZG93LmlmcmFtZVNkaykge1xuICAgICAgICAgICAgd2luZG93LnRvcC5sb2NhdGlvbiA9IHVybDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IHVybDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvdGFsUHJpY2UoKSB7XG4gICAgICAgIHZhciB0b3RhbCA9IDAsXG4gICAgICAgICAgICB0b3RhbFNhbGUgPSAwLFxuICAgICAgICAgICAgc3ltYm9sLFxuICAgICAgICAgICAgc3ltYm9sQ2hhbmdlLFxuICAgICAgICAgICAgZGVjaW1hbFBsYWNlcyxcbiAgICAgICAgICAgIGRlY2ltYWxTZXBhcmF0b3IsXG4gICAgICAgICAgICB0aG91c2FuZHNTZXBhcmF0b3IsXG4gICAgICAgICAgICBzeW1ib2xMb2NhdGlvbixcbiAgICAgICAgICAgIGN1cnIsXG4gICAgICAgICAgICB0b2tlbjEsXG4gICAgICAgICAgICB0b2tlbjIsXG4gICAgICAgICAgICBsZW5ndGg7XG5cbiAgICAgICAgZGVjaW1hbFBsYWNlcyA9IGN1cnJlbmN5LmRlY2ltYWxfcGxhY2VzO1xuICAgICAgICBkZWNpbWFsU2VwYXJhdG9yID0gY3VycmVuY3kuZGVjaW1hbF90b2tlbjtcbiAgICAgICAgdGhvdXNhbmRzU2VwYXJhdG9yID0gY3VycmVuY3kudGhvdXNhbmRzX3Rva2VuO1xuICAgICAgICBzeW1ib2xMb2NhdGlvbiA9IGN1cnJlbmN5LmN1cnJlbmN5X2xvY2F0aW9uO1xuICAgICAgICBzeW1ib2wgPSBjdXJyZW5jeS5jdXJyZW5jeV90b2tlbjtcblxuICAgICAgICAkYnVuZGxlTGlzdC5maW5kKCcuaGFsby1wcm9kdWN0LWl0ZW0uaXNDaGVja2VkJykuZWFjaCgoaW5kZXgsIHZhbCkgPT4ge1xuICAgICAgICAgICAgdmFyIHByaWNlID0gcGFyc2VGbG9hdCgkKHZhbCkuZmluZCgnLmhhbG8tZGV0YWlsLXByaWNlJykuYXR0cignZGF0YS1wcmljZS12YWx1ZScpKSxcbiAgICAgICAgICAgICAgICBwcmljZVNhbGUgPSBwYXJzZUZsb2F0KCQodmFsKS5maW5kKCcuaGFsby1kZXRhaWwtcHJpY2UnKS5hdHRyKCdkYXRhLXByaWNlLXNhbGUtdmFsdWUnKSk7XG5cbiAgICAgICAgICAgIHRvdGFsID0gdG90YWwgKyBwcmljZTtcbiAgICAgICAgICAgIHRvdGFsU2FsZSA9IHRvdGFsU2FsZSArIHByaWNlU2FsZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRvdGFsID09IHRvdGFsU2FsZSkge1xuICAgICAgICAgICAgJCgnLmhhbG8tcHJvZHVjdC10b3RhbCAucHJpY2Utc2FsZScpLmhpZGUoKTtcbiAgICAgICAgICAgICQoJy5oYWxvLXByb2R1Y3QtdG90YWwnKS5yZW1vdmVDbGFzcygnaGFzLXByaWNlLXNhbGUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJy5oYWxvLXByb2R1Y3QtdG90YWwgLnByaWNlLXNhbGUnKS5zaG93KCk7XG4gICAgICAgICAgICAkKCcuaGFsby1wcm9kdWN0LXRvdGFsJykuYWRkQ2xhc3MoJ2hhcy1wcmljZS1zYWxlJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJCgnLnByb2R1Y3RWaWV3LXByaWNlID4gLnByaWNlLXNlY3Rpb24gPiAucHJpY2UucHJpY2UtLXdpdGhUYXgnLCAkc2NvcGUpLmxlbmd0aCkge1xuICAgICAgICAgICAgY3VyciA9ICQoJy5wcm9kdWN0Vmlldy1wcmljZSA+IC5wcmljZS1zZWN0aW9uID4gLnByaWNlLnByaWNlLS13aXRoVGF4JywgJHNjb3BlKS5kYXRhKCd2YWx1ZS1wcmljZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY3VyciA9ICQoJy5wcm9kdWN0Vmlldy1wcmljZSA+IC5wcmljZS1zZWN0aW9uID4gLnByaWNlLnByaWNlLS13aXRob3V0VGF4JywgJHNjb3BlKS5kYXRhKCd2YWx1ZS1wcmljZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3ltYm9sQ2hhbmdlID0gY3Vyci5yZXBsYWNlKC9bMC05XS9nLCBcIlwiKS5yZXBsYWNlKFwiLlwiLCBcIlwiKS5yZXBsYWNlKFwiLFwiLCBcIlwiKTtcblxuICAgICAgICBpZihzeW1ib2wgIT0gc3ltYm9sQ2hhbmdlKXtcbiAgICAgICAgICAgIHN5bWJvbCA9IHN5bWJvbENoYW5nZTtcbiAgICAgICAgICAgIHRva2VuMSA9IChjdXJyLmluZGV4T2YoJy4nKSk7XG4gICAgICAgICAgICB0b2tlbjIgPSAoY3Vyci5pbmRleE9mKCcsJykpO1xuICAgICAgICAgICAgbGVuZ3RoID0gY3Vyci5sZW5ndGggLSAxO1xuXG4gICAgICAgICAgICBpZiAoY3Vyci5pbmRleE9mKHN5bWJvbCkgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICBzeW1ib2xMb2NhdGlvbiA9IGN1cnIuaW5kZXhPZihzeW1ib2wpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodG9rZW4xIDwgdG9rZW4yKSB7XG4gICAgICAgICAgICAgICAgdGhvdXNhbmRzU2VwYXJhdG9yID0gJy4nO1xuICAgICAgICAgICAgICAgIGRlY2ltYWxTZXBhcmF0b3IgPSAnLCc7XG5cbiAgICAgICAgICAgICAgICBpZiAoc3ltYm9sTG9jYXRpb24gPT0gMCB8fCBzeW1ib2xMb2NhdGlvbiA9PSBcImxlZnRcIikge1xuICAgICAgICAgICAgICAgICAgICBkZWNpbWFsUGxhY2VzID0gbGVuZ3RoIC0gdG9rZW4yO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGRlY2ltYWxQbGFjZXMgPSBsZW5ndGggLSB0b2tlbjIgLSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhvdXNhbmRzU2VwYXJhdG9yID0gJywnO1xuICAgICAgICAgICAgICAgIGRlY2ltYWxTZXBhcmF0b3IgPSAnLic7XG4gICAgICAgICAgICAgICAgaWYgKHN5bWJvbExvY2F0aW9uID09IDAgfHwgc3ltYm9sTG9jYXRpb24gPT0gXCJsZWZ0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVjaW1hbFBsYWNlcyA9IGxlbmd0aCAtIHRva2VuMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkZWNpbWFsUGxhY2VzID0gbGVuZ3RoIC0gdG9rZW4xIC0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZih0b3RhbCA9PSAwKXtcbiAgICAgICAgICAgICRidW5kbGUuZmluZCgnI2hhbG8tYWRkQWxsJykuYXR0cignZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgfSBlbHNle1xuICAgICAgICAgICAgJGJ1bmRsZS5maW5kKCcjaGFsby1hZGRBbGwnKS5hdHRyKCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRvdGFsID0gZm9ybWF0TW9uZXkodG90YWwsIGRlY2ltYWxQbGFjZXMsIGRlY2ltYWxTZXBhcmF0b3IsIHRob3VzYW5kc1NlcGFyYXRvcik7XG4gICAgICAgIHRvdGFsU2FsZSA9IGZvcm1hdE1vbmV5KHRvdGFsU2FsZSwgZGVjaW1hbFBsYWNlcywgZGVjaW1hbFNlcGFyYXRvciwgdGhvdXNhbmRzU2VwYXJhdG9yKTtcblxuICAgICAgICBpZiAoc3ltYm9sTG9jYXRpb24gPT0gXCJsZWZ0XCIgfHwgc3ltYm9sTG9jYXRpb24gPT0gMCl7XG4gICAgICAgICAgICB0b3RhbCA9IHN5bWJvbCArIHRvdGFsO1xuICAgICAgICAgICAgdG90YWxTYWxlID0gc3ltYm9sICsgdG90YWxTYWxlO1xuICAgICAgICB9IGVsc2V7XG4gICAgICAgICAgICB0b3RhbCA9IHRvdGFsICsgc3ltYm9sO1xuICAgICAgICAgICAgdG90YWxTYWxlID0gdG90YWxTYWxlICsgc3ltYm9sO1xuICAgICAgICB9XG5cbiAgICAgICAgJGJ1bmRsZS5maW5kKCcuaGFsby1wcm9kdWN0LXRvdGFsIC5wcmljZScpLmh0bWwodG90YWwpO1xuICAgICAgICAkYnVuZGxlLmZpbmQoJy5oYWxvLXByb2R1Y3QtdG90YWwgLnByaWNlLXNhbGUnKS5odG1sKHRvdGFsU2FsZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9ybWF0TW9uZXkobiwgYywgZCwgdCkge1xuICAgICAgICB2YXIgYyA9IGlzTmFOKGMgPSBNYXRoLmFicyhjKSkgPyAyIDogYyxcbiAgICAgICAgICAgIGQgPSBkID09IHVuZGVmaW5lZCA/IFwiLlwiIDogZCxcbiAgICAgICAgICAgIHQgPSB0ID09IHVuZGVmaW5lZCA/IFwiLFwiIDogdCxcbiAgICAgICAgICAgIHMgPSBuIDwgMCA/IFwiLVwiIDogXCJcIixcbiAgICAgICAgICAgIGkgPSBTdHJpbmcocGFyc2VJbnQobiA9IE1hdGguYWJzKE51bWJlcihuKSB8fCAwKS50b0ZpeGVkKGMpKSksXG4gICAgICAgICAgICBqID0gKGogPSBpLmxlbmd0aCkgPiAzID8gaiAlIDMgOiAwO1xuXG4gICAgICAgIHJldHVybiBzICsgKGogPyBpLnN1YnN0cigwLCBqKSArIHQgOiBcIlwiKSArIGkuc3Vic3RyKGopLnJlcGxhY2UoLyhcXGR7M30pKD89XFxkKS9nLCBcIiQxXCIgKyB0KSArIChjID8gZCArIE1hdGguYWJzKG4gLSBpKS50b0ZpeGVkKGMpLnNsaWNlKDIpIDogXCJcIik7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHByb2R1Y3RPcHRpb25zKCkge1xuICAgICAgICBpZighJGJ1bmRsZS5oYXNDbGFzcygnaGFsby1idW5kbGUtbG9naW4nKSl7XG4gICAgICAgICAgICB0b3RhbFByaWNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgJGZvcm0gPSAkKCdmb3JtJywgJGJ1bmRsZSksXG4gICAgICAgICAgICAkcHJvZHVjdE9wdGlvbnNFbGVtZW50ID0gJCgnW2RhdGEtZmJ0LW9wdGlvbi1jaGFuZ2VdJywgJGZvcm0pO1xuXG4gICAgICAgIHNldFByb2R1Y3RWYXJpYW50KCk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NoYW5nZScsICRwcm9kdWN0T3B0aW9uc0VsZW1lbnQsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIHByb2R1Y3RPcHRpb25zQ2hhbmdlZChldmVudCk7XG4gICAgICAgICAgICBzZXRQcm9kdWN0VmFyaWFudCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRQcm9kdWN0VmFyaWFudCgpIHtcbiAgICAgICAgY29uc3QgdW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcyA9IFtdO1xuICAgICAgICBjb25zdCBvcHRpb25zID0gW107XG5cbiAgICAgICAgJCgnLmhhbG8tcHJvZHVjdC1pdGVtJykuZWFjaCgoaW5kZXgsIGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlT3B0aW9ucyA9IFtdO1xuXG4gICAgICAgICAgICAkKGl0ZW0pLmZpbmQoJ1tkYXRhLWZidC1vcHRpb24tY2hhbmdlXSBbZGF0YS1wcm9kdWN0LWF0dHJpYnV0ZV0nKS5lYWNoKChfLCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbkxhYmVsID0gJCh2YWx1ZSkuZmluZCgnbGFiZWwnKS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9uVGl0bGUgPSBvcHRpb25MYWJlbC5zcGxpdCgnOicpWzBdLnRyaW0oKTtcbiAgICAgICAgICAgICAgICBjb25zdCByZXF1aXJlZCA9IG9wdGlvbkxhYmVsLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ3JlcXVpcmVkJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9ICQodmFsdWUpLmRhdGEoJ3Byb2R1Y3QtYXR0cmlidXRlJyk7XG4gICAgXG4gICAgICAgICAgICAgICAgaWYgKCh0eXBlID09PSAnaW5wdXQtZmlsZScgfHwgdHlwZSA9PT0gJ2lucHV0LXRleHQnIHx8IHR5cGUgPT09ICdpbnB1dC1udW1iZXInKSAmJiB2YWx1ZS5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLnZhbHVlID09PSAnJyAmJiByZXF1aXJlZCkge1xuICAgICAgICAgICAgICAgICAgICB1bnNhdGlzZmllZFJlcXVpcmVkRmllbGRzLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3RleHRhcmVhJyAmJiB2YWx1ZS5xdWVyeVNlbGVjdG9yKCd0ZXh0YXJlYScpLnZhbHVlID09PSAnJyAmJiByZXF1aXJlZCkge1xuICAgICAgICAgICAgICAgICAgICB1bnNhdGlzZmllZFJlcXVpcmVkRmllbGRzLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2RhdGUnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzU2F0aXNmaWVkID0gQXJyYXkuZnJvbSh2YWx1ZS5xdWVyeVNlbGVjdG9yQWxsKCdzZWxlY3QnKSkuZXZlcnkoKHNlbGVjdCkgPT4gc2VsZWN0LnNlbGVjdGVkSW5kZXggIT09IDApO1xuICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNTYXRpc2ZpZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGVTdHJpbmcgPSBBcnJheS5mcm9tKHZhbHVlLnF1ZXJ5U2VsZWN0b3JBbGwoJ3NlbGVjdCcpKS5tYXAoKHgpID0+IHgudmFsdWUpLmpvaW4oJy0nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChgJHtvcHRpb25UaXRsZX06JHtkYXRlU3RyaW5nfWApO1xuICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXF1aXJlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3NldC1zZWxlY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdCA9IHZhbHVlLnF1ZXJ5U2VsZWN0b3IoJ3NlbGVjdCcpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZEluZGV4ID0gc2VsZWN0LnNlbGVjdGVkSW5kZXg7XG4gICAgXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZEluZGV4ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goYCR7b3B0aW9uVGl0bGV9OiR7c2VsZWN0Lm9wdGlvbnNbc2VsZWN0ZWRJbmRleF0uaW5uZXJUZXh0fWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgJCh2YWx1ZS5jaGlsZHJlblswXSkuZmluZCgnW2RhdGEtb3B0aW9uLXZhbHVlXScpLnRleHQoc2VsZWN0Lm9wdGlvbnNbc2VsZWN0ZWRJbmRleF0uaW5uZXJUZXh0KTtcbiAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlT3B0aW9ucy5wdXNoKHNlbGVjdC5vcHRpb25zW3NlbGVjdGVkSW5kZXhdLmlubmVyVGV4dC50cmltKCkpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcXVpcmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1bnNhdGlzZmllZFJlcXVpcmVkRmllbGRzLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnc2V0LXJlY3RhbmdsZScgfHwgdHlwZSA9PT0gJ3NldC1yYWRpbycgfHwgdHlwZSA9PT0gJ3N3YXRjaCcgfHwgdHlwZSA9PT0gJ2lucHV0LWNoZWNrYm94JyB8fCB0eXBlID09PSAncHJvZHVjdC1saXN0Jykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGVja2VkID0gdmFsdWUucXVlcnlTZWxlY3RvcignOmNoZWNrZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSAnc2V0LXJlY3RhbmdsZScgfHwgdHlwZSA9PT0gJ3NldC1yYWRpbycgfHwgdHlwZSA9PT0gJ3Byb2R1Y3QtbGlzdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYWJlbCA9IGNoZWNrZWQubGFiZWxzWzBdLmlubmVyVGV4dDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKGAke29wdGlvblRpdGxlfToke2xhYmVsfWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHZhbHVlLmNoaWxkcmVuWzBdKS5maW5kKCdbZGF0YS1vcHRpb24tdmFsdWVdJykudGV4dChsYWJlbCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVPcHRpb25zLnB1c2gobGFiZWwudHJpbSgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSAnc3dhdGNoJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gY2hlY2tlZC5sYWJlbHNbMF0uY2hpbGRyZW5bMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChgJHtvcHRpb25UaXRsZX06JHtsYWJlbC50aXRsZX1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh2YWx1ZS5jaGlsZHJlblswXSkuZmluZCgnW2RhdGEtb3B0aW9uLXZhbHVlXScpLnRleHQobGFiZWwudGl0bGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVPcHRpb25zLnB1c2gobGFiZWwudGl0bGUudHJpbSgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSAnaW5wdXQtY2hlY2tib3gnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKGAke29wdGlvblRpdGxlfTpZZXNgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdpbnB1dC1jaGVja2JveCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChgJHtvcHRpb25UaXRsZX06Tm9gKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXF1aXJlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAodmFsdWVPcHRpb25zICE9ICcnKSB7XG4gICAgICAgICAgICAgICAgJChpdGVtKS5maW5kKCcuaGFsby10b2dnbGUtb3B0aW9ucyAudGV4dCcpLnRleHQodmFsdWVPcHRpb25zLmpvaW4oJyAvICcpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHJvZHVjdE9wdGlvbnNDaGFuZ2VkKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0ICRjaGFuZ2VkT3B0aW9uID0gJChldmVudC50YXJnZXQpO1xuICAgICAgICBjb25zdCAkZm9ybSA9ICRjaGFuZ2VkT3B0aW9uLnBhcmVudHMoJ2Zvcm0nKTtcbiAgICAgICAgY29uc3QgcHJvZHVjdElkID0gJCgnW25hbWU9XCJwcm9kdWN0X2lkXCJdJywgJGZvcm0pLnZhbCgpO1xuXG4gICAgICAgIGlmICgkY2hhbmdlZE9wdGlvbi5hdHRyKCd0eXBlJykgPT09ICdmaWxlJyB8fCB3aW5kb3cuRm9ybURhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCRjaGFuZ2VkT3B0aW9uLmF0dHIoJ2lkJykgPT09ICdmYnRfcHJvZHVjdCcgKyBwcm9kdWN0SWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdXRpbHMuYXBpLnByb2R1Y3RBdHRyaWJ1dGVzLm9wdGlvbkNoYW5nZShwcm9kdWN0SWQsICRmb3JtLnNlcmlhbGl6ZSgpLCAncHJvZHVjdHMvYnVsay1kaXNjb3VudC1yYXRlcycsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcm9kdWN0QXR0cmlidXRlc0RhdGEgPSByZXNwb25zZS5kYXRhIHx8IHt9O1xuICAgICAgICAgICAgY29uc3QgcHJvZHVjdEF0dHJpYnV0ZXNDb250ZW50ID0gcmVzcG9uc2UuY29udGVudCB8fCB7fTtcbiAgICAgICAgICAgIHVwZGF0ZVByb2R1Y3RBdHRyaWJ1dGVzKCRmb3JtLCBwcm9kdWN0QXR0cmlidXRlc0RhdGEpO1xuICAgICAgICAgICAgdXBkYXRlVmlldygkZm9ybSwgcHJvZHVjdEF0dHJpYnV0ZXNEYXRhLCBwcm9kdWN0QXR0cmlidXRlc0NvbnRlbnQpO1xuXG4gICAgICAgICAgICBpZighJGJ1bmRsZS5oYXNDbGFzcygnaGFsby1idW5kbGUtbG9naW4nKSl7XG4gICAgICAgICAgICAgICAgdG90YWxQcmljZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIHVwZGF0ZVByb2R1Y3RBdHRyaWJ1dGVzKGRhdGEpIHtcbiAgICAgICAgY29uc3QgYmVoYXZpb3IgPSBkYXRhLm91dF9vZl9zdG9ja19iZWhhdmlvcjtcbiAgICAgICAgY29uc3QgaW5TdG9ja0lkcyA9IGRhdGEuaW5fc3RvY2tfYXR0cmlidXRlcztcbiAgICAgICAgY29uc3Qgb3V0T2ZTdG9ja0RlZmF1bHRNZXNzYWdlID0gY29udGV4dC5vdXRPZlN0b2NrRGVmYXVsdE1lc3NhZ2U7XG4gICAgICAgIGxldCBvdXRPZlN0b2NrTWVzc2FnZSA9IGRhdGEub3V0X29mX3N0b2NrX21lc3NhZ2U7XG5cbiAgICAgICAgaWYgKGJlaGF2aW9yICE9PSAnaGlkZV9vcHRpb24nICYmIGJlaGF2aW9yICE9PSAnbGFiZWxfb3B0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG91dE9mU3RvY2tNZXNzYWdlKSB7XG4gICAgICAgICAgICBvdXRPZlN0b2NrTWVzc2FnZSA9IGAgKCR7b3V0T2ZTdG9ja01lc3NhZ2V9KWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvdXRPZlN0b2NrTWVzc2FnZSA9IGAgKCR7b3V0T2ZTdG9ja0RlZmF1bHRNZXNzYWdlfSlgO1xuICAgICAgICB9XG5cbiAgICAgICAgJCgnW2RhdGEtcHJvZHVjdC1hdHRyaWJ1dGUtdmFsdWVdJywgJHNjb3BlKS5lYWNoKChpLCBhdHRyaWJ1dGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRhdHRyaWJ1dGUgPSAkKGF0dHJpYnV0ZSk7XG4gICAgICAgICAgICBjb25zdCBhdHRySWQgPSBwYXJzZUludCgkYXR0cmlidXRlLmRhdGEoJ3Byb2R1Y3RBdHRyaWJ1dGVWYWx1ZScpLCAxMCk7XG5cblxuICAgICAgICAgICAgaWYgKGluU3RvY2tJZHMuaW5kZXhPZihhdHRySWQpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIGVuYWJsZUF0dHJpYnV0ZSgkYXR0cmlidXRlLCBiZWhhdmlvciwgb3V0T2ZTdG9ja01lc3NhZ2UpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkaXNhYmxlQXR0cmlidXRlKCRhdHRyaWJ1dGUsIGJlaGF2aW9yLCBvdXRPZlN0b2NrTWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRpc2FibGVBdHRyaWJ1dGUoJGF0dHJpYnV0ZSwgYmVoYXZpb3IsIG91dE9mU3RvY2tNZXNzYWdlKSB7XG4gICAgICAgIGlmIChnZXRBdHRyaWJ1dGVUeXBlKCRhdHRyaWJ1dGUpID09PSAnc2V0LXNlbGVjdCcpIHtcbiAgICAgICAgICAgIHJldHVybiBkaXNhYmxlU2VsZWN0T3B0aW9uQXR0cmlidXRlKCRhdHRyaWJ1dGUsIGJlaGF2aW9yLCBvdXRPZlN0b2NrTWVzc2FnZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYmVoYXZpb3IgPT09ICdoaWRlX29wdGlvbicpIHtcbiAgICAgICAgICAgICRhdHRyaWJ1dGUuaGlkZSgwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRhdHRyaWJ1dGUuYWRkQ2xhc3MoJ3VuYXZhaWxhYmxlJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkaXNhYmxlU2VsZWN0T3B0aW9uQXR0cmlidXRlKCRhdHRyaWJ1dGUsIGJlaGF2aW9yLCBvdXRPZlN0b2NrTWVzc2FnZSkge1xuICAgICAgICBjb25zdCAkc2VsZWN0ID0gJGF0dHJpYnV0ZS5wYXJlbnQoKTtcblxuICAgICAgICBpZiAoYmVoYXZpb3IgPT09ICdoaWRlX29wdGlvbicpIHtcbiAgICAgICAgICAgICRhdHRyaWJ1dGUudG9nZ2xlT3B0aW9uKGZhbHNlKTtcbiAgICAgICAgICAgIC8vIElmIHRoZSBhdHRyaWJ1dGUgaXMgdGhlIHNlbGVjdGVkIG9wdGlvbiBpbiBhIHNlbGVjdCBkcm9wZG93biwgc2VsZWN0IHRoZSBmaXJzdCBvcHRpb24gKE1FUkMtNjM5KVxuICAgICAgICAgICAgaWYgKCRzZWxlY3QudmFsKCkgPT09ICRhdHRyaWJ1dGUuYXR0cigndmFsdWUnKSkge1xuICAgICAgICAgICAgICAgICRzZWxlY3RbMF0uc2VsZWN0ZWRJbmRleCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkYXR0cmlidXRlLmh0bWwoJGF0dHJpYnV0ZS5odG1sKCkucmVwbGFjZShvdXRPZlN0b2NrTWVzc2FnZSwgJycpICsgb3V0T2ZTdG9ja01lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZW5hYmxlQXR0cmlidXRlKCRhdHRyaWJ1dGUsIGJlaGF2aW9yLCBvdXRPZlN0b2NrTWVzc2FnZSkge1xuICAgICAgICBpZiAoZ2V0QXR0cmlidXRlVHlwZSgkYXR0cmlidXRlKSA9PT0gJ3NldC1zZWxlY3QnKSB7XG4gICAgICAgICAgICByZXR1cm4gZW5hYmxlU2VsZWN0T3B0aW9uQXR0cmlidXRlKCRhdHRyaWJ1dGUsIGJlaGF2aW9yLCBvdXRPZlN0b2NrTWVzc2FnZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYmVoYXZpb3IgPT09ICdoaWRlX29wdGlvbicpIHtcbiAgICAgICAgICAgICRhdHRyaWJ1dGUuc2hvdygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJGF0dHJpYnV0ZS5yZW1vdmVDbGFzcygndW5hdmFpbGFibGUnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVuYWJsZVNlbGVjdE9wdGlvbkF0dHJpYnV0ZSgkYXR0cmlidXRlLCBiZWhhdmlvciwgb3V0T2ZTdG9ja01lc3NhZ2UpIHtcbiAgICAgICAgaWYgKGJlaGF2aW9yID09PSAnaGlkZV9vcHRpb24nKSB7XG4gICAgICAgICAgICAkYXR0cmlidXRlLnRvZ2dsZU9wdGlvbih0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRhdHRyaWJ1dGUuaHRtbCgkYXR0cmlidXRlLmh0bWwoKS5yZXBsYWNlKG91dE9mU3RvY2tNZXNzYWdlLCAnJykpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0QXR0cmlidXRlVHlwZSgkYXR0cmlidXRlKSB7XG4gICAgICAgIGNvbnN0ICRwYXJlbnQgPSAkYXR0cmlidXRlLmNsb3Nlc3QoJ1tkYXRhLXByb2R1Y3QtYXR0cmlidXRlXScpO1xuXG4gICAgICAgIHJldHVybiAkcGFyZW50ID8gJHBhcmVudC5kYXRhKCdwcm9kdWN0QXR0cmlidXRlJykgOiBudWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVZpZXcoJHNjb3BlLCBkYXRhLCBjb250ZW50ID0gbnVsbCkge1xuICAgICAgICBjb25zdCB2aWV3TW9kZWwgPSBnZXRWaWV3TW9kZWwoJHNjb3BlKTtcblxuICAgICAgICBzaG93TWVzc2FnZUJveChkYXRhLnN0b2NrX21lc3NhZ2UgfHwgZGF0YS5wdXJjaGFzaW5nX21lc3NhZ2UsICRzY29wZSk7XG5cbiAgICAgICAgaWYgKGRhdGEucHJpY2UgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgICAgIHVwZGF0ZVByaWNlVmlldyh2aWV3TW9kZWwsIGRhdGEucHJpY2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHByb2R1Y3RJZCA9ICQoJ1tuYW1lPVwicHJvZHVjdF9pZFwiXScsICRzY29wZSkudmFsKCksXG4gICAgICAgICAgICBwcm9kdWN0ID0gJGJ1bmRsZUxpc3QuZmluZCgnLmhhbG8tcHJvZHVjdC1pdGVtW2RhdGEtcHJvZHVjdC1pZD1cIicgKyBwcm9kdWN0SWQgKyAnXCJdJyksXG4gICAgICAgICAgICBwcm9kdWN0Q2hlY2tib3ggPSBwcm9kdWN0LmZpbmQoJy5oYWxvLWRldGFpbC1jaGVja2JveCcpO1xuXG4gICAgICAgIGlmICghZGF0YS5wdXJjaGFzYWJsZSB8fCAhZGF0YS5pbnN0b2NrKSB7XG4gICAgICAgICAgICBwcm9kdWN0LnJlbW92ZUNsYXNzKCdpc0NoZWNrZWQgaGFzT3B0aW9ucy0tc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgIHByb2R1Y3QuZmluZCgnLnN0YXR1cycpLmFkZENsYXNzKCdkaXNhYmxlJykudGV4dCgnVGhpcyBpdGVtJyk7XG4gICAgICAgICAgICBwcm9kdWN0Q2hlY2tib3gucHJvcCgnY2hlY2tlZCcsIGZhbHNlKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICAgICAgJCgnI2hhbG8tYWRkQWxsJykuZmluZCgnLm51bWJlcicpLnRleHQoJCgnLmhhbG8tcHJvZHVjdC1pdGVtLmlzQ2hlY2tlZCcpLmxlbmd0aClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByb2R1Y3QuYWRkQ2xhc3MoJ2lzQ2hlY2tlZCcpO1xuICAgICAgICAgICAgcHJvZHVjdC5maW5kKCcuc3RhdHVzJykucmVtb3ZlQ2xhc3MoJ2Rpc2FibGUnKS50ZXh0KCdTZWxlY3RlZCcpO1xuICAgICAgICAgICAgcHJvZHVjdENoZWNrYm94LnByb3AoJ2NoZWNrZWQnLCB0cnVlKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgICQoJyNoYWxvLWFkZEFsbCcpLmZpbmQoJy5udW1iZXInKS50ZXh0KCQoJy5oYWxvLXByb2R1Y3QtaXRlbS5pc0NoZWNrZWQnKS5sZW5ndGgpXG5cbiAgICAgICAgICAgIGlmICgkc2NvcGUuZmluZCgnW2RhdGEtZmJ0LW9wdGlvbi1jaGFuZ2VdJykubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIGNoZWNrID0gY2hlY2tCZWZvcmVBZGQoJHNjb3BlKTtcblxuICAgICAgICAgICAgICAgIGlmIChjaGVjayA9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3QuYWRkQ2xhc3MoJ2hhc09wdGlvbnMtLXNlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlRGVmYXVsdEF0dHJpYnV0ZXNGb3JPT1MoJHNjb3BlLCBkYXRhKSB7XG4gICAgICAgIHZhciBwcm9kdWN0SWQgPSAkKCdbbmFtZT1cInByb2R1Y3RfaWRcIl0nLCAkc2NvcGUpLnZhbCgpLFxuICAgICAgICAgICAgcHJvZHVjdCA9ICRidW5kbGVMaXN0LmZpbmQoJy5oYWxvLXByb2R1Y3QtaXRlbVtkYXRhLXByb2R1Y3QtaWQ9XCInICsgcHJvZHVjdElkICsgJ1wiXScpLFxuICAgICAgICAgICAgcHJvZHVjdENoZWNrYm94ID0gcHJvZHVjdC5maW5kKCcuaGFsby1kZXRhaWwtY2hlY2tib3gnKTtcblxuICAgICAgICBpZiAoIWRhdGEucHVyY2hhc2FibGUgfHwgIWRhdGEuaW5zdG9jaykge1xuICAgICAgICAgICAgcHJvZHVjdC5yZW1vdmVDbGFzcygnaXNDaGVja2VkIGhhc09wdGlvbnMtLXNlbGVjdGVkJyk7XG4gICAgICAgICAgICBwcm9kdWN0LmZpbmQoJy5zdGF0dXMnKS5hZGRDbGFzcygnZGlzYWJsZScpLnRleHQoJ1RoaXMgaXRlbScpO1xuICAgICAgICAgICAgcHJvZHVjdENoZWNrYm94LnByb3AoJ2NoZWNrZWQnLCBmYWxzZSkucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgICAgICQoJyNoYWxvLWFkZEFsbCcpLmZpbmQoJy5udW1iZXInKS50ZXh0KCQoJy5oYWxvLXByb2R1Y3QtaXRlbS5pc0NoZWNrZWQnKS5sZW5ndGgpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcm9kdWN0LmFkZENsYXNzKCdpc0NoZWNrZWQnKTtcbiAgICAgICAgICAgIHByb2R1Y3QuZmluZCgnLnN0YXR1cycpLnJlbW92ZUNsYXNzKCdkaXNhYmxlJykudGV4dCgnU2VsZWN0ZWQnKTtcbiAgICAgICAgICAgIHByb2R1Y3RDaGVja2JveC5wcm9wKCdjaGVja2VkJywgdHJ1ZSkucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICAkKCcjaGFsby1hZGRBbGwnKS5maW5kKCcubnVtYmVyJykudGV4dCgkKCcuaGFsby1wcm9kdWN0LWl0ZW0uaXNDaGVja2VkJykubGVuZ3RoKVxuXG4gICAgICAgICAgICBpZiAoJHNjb3BlLmZpbmQoJ1tkYXRhLWZidC1vcHRpb24tY2hhbmdlXScpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB2YXIgY2hlY2sgPSBjaGVja0JlZm9yZUFkZCgkc2NvcGUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNoZWNrID09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdC5hZGRDbGFzcygnaGFzT3B0aW9ucy0tc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRWaWV3TW9kZWwoJHNjb3BlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAkcHJpY2VWYWx1ZTogJCgnLmhhbG8tZGV0YWlsLXByaWNlJywgJHNjb3BlKSxcbiAgICAgICAgICAgICRwcmljZVdpdGhUYXg6ICQoJ1tkYXRhLXByb2R1Y3QtcHJpY2Utd2l0aC10YXhdJywgJHNjb3BlKSxcbiAgICAgICAgICAgICRwcmljZVdpdGhvdXRUYXg6ICQoJ1tkYXRhLXByb2R1Y3QtcHJpY2Utd2l0aG91dC10YXhdJywgJHNjb3BlKSxcbiAgICAgICAgICAgIHJycFdpdGhUYXg6IHtcbiAgICAgICAgICAgICAgICAkZGl2OiAkKCcucnJwLXByaWNlLS13aXRoVGF4JywgJHNjb3BlKSxcbiAgICAgICAgICAgICAgICAkc3BhbjogJCgnW2RhdGEtcHJvZHVjdC1ycnAtd2l0aC10YXhdJywgJHNjb3BlKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBycnBXaXRob3V0VGF4OiB7XG4gICAgICAgICAgICAgICAgJGRpdjogJCgnLnJycC1wcmljZS0td2l0aG91dFRheCcsICRzY29wZSksXG4gICAgICAgICAgICAgICAgJHNwYW46ICQoJ1tkYXRhLXByb2R1Y3QtcnJwLXByaWNlLXdpdGhvdXQtdGF4XScsICRzY29wZSksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbm9uU2FsZVdpdGhUYXg6IHtcbiAgICAgICAgICAgICAgICAkZGl2OiAkKCcubm9uLXNhbGUtcHJpY2UtLXdpdGhUYXgnLCAkc2NvcGUpLFxuICAgICAgICAgICAgICAgICRzcGFuOiAkKCdbZGF0YS1wcm9kdWN0LW5vbi1zYWxlLXByaWNlLXdpdGgtdGF4XScsICRzY29wZSksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbm9uU2FsZVdpdGhvdXRUYXg6IHtcbiAgICAgICAgICAgICAgICAkZGl2OiAkKCcubm9uLXNhbGUtcHJpY2UtLXdpdGhvdXRUYXgnLCAkc2NvcGUpLFxuICAgICAgICAgICAgICAgICRzcGFuOiAkKCdbZGF0YS1wcm9kdWN0LW5vbi1zYWxlLXByaWNlLXdpdGhvdXQtdGF4XScsICRzY29wZSksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHJpY2VTYXZlZDoge1xuICAgICAgICAgICAgICAgICRkaXY6ICQoJy5wcmljZS1zZWN0aW9uLS1zYXZpbmcnLCAkc2NvcGUpLFxuICAgICAgICAgICAgICAgICRzcGFuOiAkKCdbZGF0YS1wcm9kdWN0LXByaWNlLXNhdmVkXScsICRzY29wZSksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHJpY2VOb3dMYWJlbDoge1xuICAgICAgICAgICAgICAgICRzcGFuOiAkKCcucHJpY2Utbm93LWxhYmVsJywgJHNjb3BlKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwcmljZUxhYmVsOiB7XG4gICAgICAgICAgICAgICAgJHNwYW46ICQoJy5wcmljZS1sYWJlbCcsICRzY29wZSksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJHdlaWdodDogJCgnLnByb2R1Y3RWaWV3LWluZm8gW2RhdGEtcHJvZHVjdC13ZWlnaHRdJywgJHNjb3BlKSxcbiAgICAgICAgICAgICRpbmNyZW1lbnRzOiAkKCcuZm9ybS1maWVsZC0taW5jcmVtZW50cyA6aW5wdXQnLCAkc2NvcGUpLFxuICAgICAgICAgICAgJGFkZFRvQ2FydDogJCgnI2Zvcm0tYWN0aW9uLWFkZFRvQ2FydCcsICRzY29wZSksXG4gICAgICAgICAgICAkd2lzaGxpc3RWYXJpYXRpb246ICQoJ1tkYXRhLXdpc2hsaXN0LWFkZF0gW25hbWU9XCJ2YXJpYXRpb25faWRcIl0nLCAkc2NvcGUpLFxuICAgICAgICAgICAgc3RvY2s6IHtcbiAgICAgICAgICAgICAgICAkY29udGFpbmVyOiAkKCcuZm9ybS1maWVsZC0tc3RvY2snLCAkc2NvcGUpLFxuICAgICAgICAgICAgICAgICRpbnB1dDogJCgnW2RhdGEtcHJvZHVjdC1zdG9ja10nLCAkc2NvcGUpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNrdToge1xuICAgICAgICAgICAgICAgICRsYWJlbDogJCgnLnNrdS1sYWJlbCcsICRzY29wZSksXG4gICAgICAgICAgICAgICAgJHZhbHVlOiAkKCdbZGF0YS1wcm9kdWN0LXNrdV0nLCAkc2NvcGUpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVwYzoge1xuICAgICAgICAgICAgICAgICRsYWJlbDogJCgnLnVwYy1sYWJlbCcsICRzY29wZSksXG4gICAgICAgICAgICAgICAgJHZhbHVlOiAkKCdbZGF0YS1wcm9kdWN0LXVwY10nLCAkc2NvcGUpLFxuICAgICAgICAgICAgfSwgXG4gICAgICAgICAgICBxdWFudGl0eToge1xuICAgICAgICAgICAgICAgICR0ZXh0OiAkKCcuaW5jcmVtZW50VG90YWwnLCAkc2NvcGUpLFxuICAgICAgICAgICAgICAgICRpbnB1dDogJCgnW25hbWU9ZmJ0cXR5XFxcXFtcXFxcXV0nLCAkc2NvcGUpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICRidWxrUHJpY2luZzogJCgnLnByb2R1Y3RWaWV3LWluZm8tYnVsa1ByaWNpbmcnLCAkc2NvcGUpLFxuICAgICAgICAgICAgJHdhbGxldEJ1dHRvbnM6ICQoJ1tkYXRhLWFkZC10by1jYXJ0LXdhbGxldC1idXR0b25zXScsICRzY29wZSksXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2hvd01lc3NhZ2VCb3gobWVzc2FnZSwgJHNjb3BlKSB7XG4gICAgICAgIGNvbnN0ICRtZXNzYWdlQm94ID0gJCgnLnByb2R1Y3RBdHRyaWJ1dGVzLW1lc3NhZ2UnLCAkc2NvcGUpO1xuXG4gICAgICAgIGlmIChtZXNzYWdlKSB7XG4gICAgICAgICAgICAkKCcuYWxlcnRCb3gtbWVzc2FnZScsICRtZXNzYWdlQm94KS50ZXh0KG1lc3NhZ2UpO1xuICAgICAgICAgICAgJG1lc3NhZ2VCb3guc2hvdygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJG1lc3NhZ2VCb3guaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYXJQcmljaW5nTm90Rm91bmQodmlld01vZGVsKSB7XG4gICAgICAgIHZpZXdNb2RlbC5ycnBXaXRoVGF4LiRkaXYuaGlkZSgpO1xuICAgICAgICB2aWV3TW9kZWwucnJwV2l0aG91dFRheC4kZGl2LmhpZGUoKTtcbiAgICAgICAgdmlld01vZGVsLm5vblNhbGVXaXRoVGF4LiRkaXYuaGlkZSgpO1xuICAgICAgICB2aWV3TW9kZWwubm9uU2FsZVdpdGhvdXRUYXguJGRpdi5oaWRlKCk7XG4gICAgICAgIHZpZXdNb2RlbC5wcmljZVNhdmVkLiRkaXYuaGlkZSgpO1xuICAgICAgICB2aWV3TW9kZWwucHJpY2VOb3dMYWJlbC4kc3Bhbi5oaWRlKCk7XG4gICAgICAgIHZpZXdNb2RlbC5wcmljZUxhYmVsLiRzcGFuLmhpZGUoKTtcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gdXBkYXRlUHJpY2VWaWV3KHZpZXdNb2RlbCwgcHJpY2UpIHtcbiAgICAgICAgY2xlYXJQcmljaW5nTm90Rm91bmQodmlld01vZGVsKTtcblxuICAgICAgICBpZiAocHJpY2Uud2l0aF90YXgpIHtcbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWRQcmljZSA9IHByaWNlLnByaWNlX3JhbmdlID9cbiAgICAgICAgICAgICAgICBgJHtwcmljZS5wcmljZV9yYW5nZS5taW4ud2l0aF90YXguZm9ybWF0dGVkfSAtICR7cHJpY2UucHJpY2VfcmFuZ2UubWF4LndpdGhfdGF4LmZvcm1hdHRlZH1gXG4gICAgICAgICAgICAgICAgOiBwcmljZS53aXRoX3RheC5mb3JtYXR0ZWQ7XG4gICAgICAgICAgICB2aWV3TW9kZWwucHJpY2VMYWJlbC4kc3Bhbi5zaG93KCk7XG4gICAgICAgICAgICB2aWV3TW9kZWwuJHByaWNlV2l0aFRheC5odG1sKHVwZGF0ZWRQcmljZSk7XG4gICAgICAgICAgICB2aWV3TW9kZWwuJHByaWNlVmFsdWUuYXR0cignZGF0YS1wcmljZS12YWx1ZScsIHByaWNlLndpdGhfdGF4LnZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcmljZS53aXRob3V0X3RheCkge1xuICAgICAgICAgICAgY29uc3QgdXBkYXRlZFByaWNlID0gcHJpY2UucHJpY2VfcmFuZ2UgP1xuICAgICAgICAgICAgICAgIGAke3ByaWNlLnByaWNlX3JhbmdlLm1pbi53aXRob3V0X3RheC5mb3JtYXR0ZWR9IC0gJHtwcmljZS5wcmljZV9yYW5nZS5tYXgud2l0aG91dF90YXguZm9ybWF0dGVkfWBcbiAgICAgICAgICAgICAgICA6IHByaWNlLndpdGhvdXRfdGF4LmZvcm1hdHRlZDtcbiAgICAgICAgICAgIHZpZXdNb2RlbC5wcmljZUxhYmVsLiRzcGFuLnNob3coKTtcbiAgICAgICAgICAgIHZpZXdNb2RlbC4kcHJpY2VXaXRob3V0VGF4Lmh0bWwodXBkYXRlZFByaWNlKTtcbiAgICAgICAgICAgIHZpZXdNb2RlbC4kcHJpY2VWYWx1ZS5hdHRyKCdkYXRhLXByaWNlLXZhbHVlJywgcHJpY2Uud2l0aG91dF90YXgudmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByaWNlLnJycF93aXRoX3RheCkge1xuICAgICAgICAgICAgdmlld01vZGVsLnJycFdpdGhUYXguJGRpdi5zaG93KCk7XG4gICAgICAgICAgICB2aWV3TW9kZWwucnJwV2l0aFRheC4kc3Bhbi5odG1sKHByaWNlLnJycF93aXRoX3RheC5mb3JtYXR0ZWQpO1xuICAgICAgICAgICAgdmlld01vZGVsLiRwcmljZVZhbHVlLmF0dHIoJ2RhdGEtcHJpY2UtdmFsdWUnLCBwcmljZS5ycnBfd2l0aF90YXgudmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByaWNlLnJycF93aXRob3V0X3RheCkge1xuICAgICAgICAgICAgdmlld01vZGVsLnJycFdpdGhvdXRUYXguJGRpdi5zaG93KCk7XG4gICAgICAgICAgICB2aWV3TW9kZWwucnJwV2l0aG91dFRheC4kc3Bhbi5odG1sKHByaWNlLnJycF93aXRob3V0X3RheC5mb3JtYXR0ZWQpO1xuICAgICAgICAgICAgdmlld01vZGVsLiRwcmljZVZhbHVlLmF0dHIoJ2RhdGEtcHJpY2UtdmFsdWUnLCBwcmljZS5ycnBfd2l0aG91dF90YXgudmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByaWNlLnNhdmVkKSB7XG4gICAgICAgICAgICB2aWV3TW9kZWwucHJpY2VTYXZlZC4kZGl2LnNob3coKTtcbiAgICAgICAgICAgIHZpZXdNb2RlbC5wcmljZVNhdmVkLiRzcGFuLmh0bWwocHJpY2Uuc2F2ZWQuZm9ybWF0dGVkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcmljZS5ub25fc2FsZV9wcmljZV93aXRoX3RheCkge1xuICAgICAgICAgICAgdmlld01vZGVsLnByaWNlTGFiZWwuJHNwYW4uaGlkZSgpO1xuICAgICAgICAgICAgdmlld01vZGVsLm5vblNhbGVXaXRoVGF4LiRkaXYuc2hvdygpO1xuICAgICAgICAgICAgdmlld01vZGVsLnByaWNlTm93TGFiZWwuJHNwYW4uc2hvdygpO1xuICAgICAgICAgICAgdmlld01vZGVsLm5vblNhbGVXaXRoVGF4LiRzcGFuLmh0bWwocHJpY2Uubm9uX3NhbGVfcHJpY2Vfd2l0aF90YXguZm9ybWF0dGVkKTtcbiAgICAgICAgICAgIHZpZXdNb2RlbC4kcHJpY2VWYWx1ZS5hdHRyKCdkYXRhLXByaWNlLXNhbGUtdmFsdWUnLCBwcmljZS5ub25fc2FsZV9wcmljZV93aXRoX3RheC52YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJpY2Uubm9uX3NhbGVfcHJpY2Vfd2l0aG91dF90YXgpIHtcbiAgICAgICAgICAgIHZpZXdNb2RlbC5wcmljZUxhYmVsLiRzcGFuLmhpZGUoKTtcbiAgICAgICAgICAgIHZpZXdNb2RlbC5ub25TYWxlV2l0aG91dFRheC4kZGl2LnNob3coKTtcbiAgICAgICAgICAgIHZpZXdNb2RlbC5wcmljZU5vd0xhYmVsLiRzcGFuLnNob3coKTtcbiAgICAgICAgICAgIHZpZXdNb2RlbC5ub25TYWxlV2l0aG91dFRheC4kc3Bhbi5odG1sKHByaWNlLm5vbl9zYWxlX3ByaWNlX3dpdGhvdXRfdGF4LmZvcm1hdHRlZCk7XG4gICAgICAgICAgICB2aWV3TW9kZWwuJHByaWNlVmFsdWUuYXR0cignZGF0YS1wcmljZS1zYWxlLXZhbHVlJywgcHJpY2Uubm9uX3NhbGVfcHJpY2Vfd2l0aG91dF90YXgudmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmlsdGVyRW1wdHlGaWxlc0Zyb21Gb3JtKGZvcm1EYXRhKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbF0gb2YgZm9ybURhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsIGluc3RhbmNlb2YgRmlsZSAmJiAhdmFsLm5hbWUgJiYgIXZhbC5zaXplKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1EYXRhLmRlbGV0ZShrZXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmb3JtRGF0YTtcbiAgICB9XG59XG4iLCJpbXBvcnQgdXRpbHMgZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IGhhbG9BZGRPcHRpb25Gb3JQcm9kdWN0IGZyb20gJy4vaGFsb0FkZE9wdGlvbkZvclByb2R1Y3QnO1xuaW1wb3J0IGhhbG9Qcm9kdWN0SW1hZ2VIb3ZlciBmcm9tICcuL2hhbG9Qcm9kdWN0SW1hZ2VIb3Zlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgY29uc3QgbGlzdCA9IGdldGxpc3RJdGVtcygpO1xuICAgIGNvbnN0ICR0aGlzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2hhbG8tcmVjZW50LXZpZXdlZC1wcm9kdWN0cycpO1xuICAgIGNvbnN0ICR3cmFwcGVyID0gJHRoaXMucXVlcnlTZWxlY3RvcignLnN3aXBlci13cmFwcGVyJyk7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHt0ZW1wbGF0ZTogJ2hhbG90aGVtZXMvcHJvZHVjdC9oYWxvLXByb2R1Y3QtdGVtcGxhdGUnfTtcbiAgICBsZXQgbnVtID0gMDtcblxuICAgIGlmIChsaXN0Lmxlbmd0aCA9PSAwKSAkdGhpcy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGxvYWQoKTtcblxuICAgIGZ1bmN0aW9uIGxvYWQoKSB7XG4gICAgICAgIGNvbnN0IGhhbmRsZUludGVyc2VjdGlvbiA9IChlbnRyaWVzLCBvYnNlcnZlcikgPT4ge1xuICAgICAgICBpZiAoIWVudHJpZXNbMF0uaXNJbnRlcnNlY3RpbmcpIHJldHVybjtcbiAgICAgICAgICAgIG9ic2VydmVyLnVub2JzZXJ2ZSgkdGhpcyk7XG4gICAgICAgICAgICBnZXRQcm9kdWN0KG51bSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKGhhbmRsZUludGVyc2VjdGlvbi5iaW5kKCR0aGlzKSwgeyByb290TWFyZ2luOiAnMHB4IDBweCA0MDBweCAwcHgnIH0pLm9ic2VydmUoJHRoaXMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldGxpc3RJdGVtcygpIHtcbiAgICAgICAgY29uc3QgcHJvZHVjdElkID0gcGFyc2VJbnQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW25hbWU9XCJwcm9kdWN0X2lkXCJdJykudmFsdWUpO1xuICAgICAgICBjb25zdCBsaXN0SXRlbXMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdfaGFsb19yZWNlbnRseV92aWV3ZWQnKSB8fCAnW10nKTtcbiAgICAgICAgaWYgKHByb2R1Y3RJZCAmJiBsaXN0SXRlbXMuaW5jbHVkZXMocGFyc2VJbnQocHJvZHVjdElkKSkpIGxpc3RJdGVtcy5zcGxpY2UobGlzdEl0ZW1zLmluZGV4T2YocGFyc2VJbnQocHJvZHVjdElkKSksIDEpO1xuICAgICAgICByZXR1cm4gbGlzdEl0ZW1zO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFByb2R1Y3QoKSB7XG4gICAgICAgIGNvbnN0IHByb2R1Y3RJZCA9IGxpc3RbbnVtXTtcbiAgICAgICAgaWYgKCFwcm9kdWN0SWQpIHJldHVybjtcbiAgICAgICAgdXRpbHMuYXBpLnByb2R1Y3QuZ2V0QnlJZChwcm9kdWN0SWQsIG9wdGlvbnMsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSByZXR1cm47XG4gICAgICAgICAgICAkd3JhcHBlci5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIG51bSsrO1xuICAgICAgICAgICAgaWYgKG51bSsxIDwgTnVtYmVyKCR0aGlzLmRhdGFzZXQubGltaXQpKSBnZXRQcm9kdWN0KG51bSk7XG4gICAgICAgICAgICBoYWxvUHJvZHVjdEltYWdlSG92ZXIoKTtcbiAgICAgICAgICAgIGhhbG9BZGRPcHRpb25Gb3JQcm9kdWN0KGNvbnRleHQsICdoYWxvLXJlY2VudC12aWV3ZWQtcHJvZHVjdHMnKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gICAgaWYgKCQoJyNmb3JtLWFjdGlvbi1hZGRUb0NhcnQnKS5sZW5ndGgpIHtcbiAgICAgICAgdmFyIHNjcm9sbCA9ICQoJyNmb3JtLWFjdGlvbi1hZGRUb0NhcnQnKS5vZmZzZXQoKSxcbiAgICAgICAgICAgIHNjcm9sbFRvcCA9IHNjcm9sbC50b3A7XG5cbiAgICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpe1xuICAgICAgICAgICAgaWYoJCh3aW5kb3cpLnNjcm9sbFRvcCgpID4gc2Nyb2xsVG9wICsgNDAwKXtcblxuICAgICAgICAgICAgICAgIGlmKCEkKCcjaGFsb19zdGlja3lfYWRkVG9DYXJ0JykuaGFzQ2xhc3MoJ3Nob3dfc3RpY2t5Jykpe1xuICAgICAgICAgICAgICAgICAgICAkKCcjaGFsb19zdGlja3lfYWRkVG9DYXJ0JykuYWRkQ2xhc3MoJ3Nob3dfc3RpY2t5Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNTUwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcjcmVjZW50bHlfYm91Z2h0X2xpc3QnKS5jc3MoXCJib3R0b21cIiwgJCgnI2hhbG9fc3RpY2t5X2FkZFRvQ2FydCcpLm91dGVySGVpZ2h0KCkgKyA0MCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZigkKCcjaGFsb19zdGlja3lfYWRkVG9DYXJ0JykubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcjcmVjZW50bHlfYm91Z2h0X2xpc3QnKS5jc3MoXCJib3R0b21cIiwgJCgnI2hhbG9fc3RpY2t5X2FkZFRvQ2FydCcpLm91dGVySGVpZ2h0KCkgKyAzMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJyNyZWNlbnRseV9ib3VnaHRfbGlzdCcpLmNzcyhcImJvdHRvbVwiLCAzMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2V7XG4gICAgICAgICAgICAgICAgJCgnI2hhbG9fc3RpY2t5X2FkZFRvQ2FydCcpLnJlbW92ZUNsYXNzKCdzaG93X3N0aWNreScpO1xuICAgICAgICAgICAgICAgICQoJy5wb3AtdXAtb3B0aW9uJykucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ29wZW5Qb3B1cE9wdGlvbicpO1xuXG4gICAgICAgICAgICAgICAgJCgnLmNob29zZV9vcHRpb25zX2FkZCcpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcblxuICAgICAgICAgICAgICAgICQoJyNyZWNlbnRseV9ib3VnaHRfbGlzdCcpLmNzcyhcImJvdHRvbVwiLCAzMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsJy5jaG9vc2Vfb3B0aW9uc19hZGQnLCBmdW5jdGlvbihldmVudCl7XG4gICAgICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgICQoJy5wb3AtdXAtb3B0aW9uJykudG9nZ2xlQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnb3BlblBvcHVwT3B0aW9uJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsJy5wb3AtdXAtb3B0aW9uIC5jbG9zZScsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgICQoXCIucG9wLXVwLW9wdGlvblwiKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdvcGVuUG9wdXBPcHRpb24nKTtcbiAgICAgICAgICAgICQoJy5jaG9vc2Vfb3B0aW9uc19hZGQnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGlmICgkKCdib2R5JykuaGFzQ2xhc3MoJ29wZW5Qb3B1cE9wdGlvbicpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCgkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnI2hhbG9fc3RpY2t5X2FkZFRvQ2FydCcpLmxlbmd0aCA9PT0gMCkpe1xuICAgICAgICAgICAgICAgICAgICAkKCcucG9wLXVwLW9wdGlvbicpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XG4gICAgICAgICAgICAgICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnb3BlblBvcHVwT3B0aW9uJyk7XG4gICAgICAgICAgICAgICAgICAgICQoJy5jaG9vc2Vfb3B0aW9uc19hZGQnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB3aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGlmKCQod2luZG93KS5zY3JvbGxUb3AoKSA+IHNjcm9sbFRvcCArIDQwMCl7XG4gICAgICAgICAgICAgICAgaWYoISQoJyNoYWxvX3N0aWNreV9hZGRUb0NhcnQnKS5oYXNDbGFzcygnc2hvd19zdGlja3knKSl7XG4gICAgICAgICAgICAgICAgICAgICQoJyNoYWxvX3N0aWNreV9hZGRUb0NhcnQnKS5hZGRDbGFzcygnc2hvd19zdGlja3knKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA1NTApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyNyZWNlbnRseV9ib3VnaHRfbGlzdCcpLmNzcyhcImJvdHRvbVwiLCAkKCcjaGFsb19zdGlja3lfYWRkVG9DYXJ0Jykub3V0ZXJIZWlnaHQoKSArIDQwKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCQoJyNoYWxvX3N0aWNreV9hZGRUb0NhcnQnKS5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJyNyZWNlbnRseV9ib3VnaHRfbGlzdCcpLmNzcyhcImJvdHRvbVwiLCAkKCcjaGFsb19zdGlja3lfYWRkVG9DYXJ0Jykub3V0ZXJIZWlnaHQoKSArIDMwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnI3JlY2VudGx5X2JvdWdodF9saXN0JykuY3NzKFwiYm90dG9tXCIsIDMwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB1dGlscyBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5pbXBvcnQgU29ydGFibGUgZnJvbSAnc29ydGFibGVqcyc7XG5pbXBvcnQgUGFnZU1hbmFnZXIgZnJvbSAnLi9wYWdlLW1hbmFnZXInO1xuaW1wb3J0IFJldmlldyBmcm9tICcuL3Byb2R1Y3QvcmV2aWV3cyc7XG5pbXBvcnQgY29sbGFwc2libGVGYWN0b3J5IGZyb20gJy4vY29tbW9uL2NvbGxhcHNpYmxlJztcbmltcG9ydCBQcm9kdWN0RGV0YWlscyBmcm9tICcuL2NvbW1vbi9wcm9kdWN0LWRldGFpbHMnO1xuaW1wb3J0IHZpZGVvR2FsbGVyeSBmcm9tICcuL3Byb2R1Y3QvdmlkZW8tZ2FsbGVyeSc7XG5pbXBvcnQgeyBjbGFzc2lmeUZvcm0gfSBmcm9tICcuL2NvbW1vbi91dGlscy9mb3JtLXV0aWxzJztcbmltcG9ydCBtb2RhbEZhY3RvcnkgZnJvbSAnLi9nbG9iYWwvbW9kYWwnO1xuaW1wb3J0IGhhbG9Td2lwZXJQcm9kdWN0SW1hZ2UgZnJvbSAnLi9oYWxvdGhlbWVzL2hhbG9Td2lwZXJQcm9kdWN0SW1hZ2UnO1xuaW1wb3J0IGhhbG9CdW5kbGVQcm9kdWN0cyBmcm9tICcuL2hhbG90aGVtZXMvaGFsb0J1bmRsZVByb2R1Y3RzJztcbmltcG9ydCBoYWxvUmVjZW50Vmlld2VkUHJvZHVjdHMgZnJvbSAnLi9oYWxvdGhlbWVzL2hhbG9SZWNlbnRWaWV3ZWRQcm9kdWN0cyc7XG5pbXBvcnQgaGFsb1N0aWNreUFkZFRvQ2FydCBmcm9tICcuL2hhbG90aGVtZXMvaGFsb1N0aWNreUFkZFRvQ2FydCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2R1Y3QgZXh0ZW5kcyBQYWdlTWFuYWdlciB7XG4gICAgY29uc3RydWN0b3IoY29udGV4dCkge1xuICAgICAgICBzdXBlcihjb250ZXh0KTtcbiAgICAgICAgdGhpcy51cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICAgICAgdGhpcy4kcmV2aWV3TGluayA9ICQoJ1tkYXRhLXJldmVhbC1pZD1cIm1vZGFsLXJldmlldy1mb3JtXCJdJyk7XG4gICAgICAgIHRoaXMuJGJ1bGtQcmljaW5nTGluayA9ICQoJ1tkYXRhLXJldmVhbC1pZD1cIm1vZGFsLWJ1bGstcHJpY2luZ1wiXScpO1xuICAgICAgICB0aGlzLnJldmlld01vZGFsID0gbW9kYWxGYWN0b3J5KCcjbW9kYWwtcmV2aWV3LWZvcm0nKVswXTtcbiAgICB9XG5cbiAgICBvblJlYWR5KCkge1xuICAgICAgICAvLyBMaXN0ZW4gZm9yIGZvdW5kYXRpb24gbW9kYWwgY2xvc2UgZXZlbnRzIHRvIHNhbml0aXplIFVSTCBhZnRlciByZXZpZXcuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbG9zZS5mbmR0bi5yZXZlYWwnLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy51cmwuaW5kZXhPZignI3dyaXRlX3JldmlldycpICE9PSAtMSAmJiB0eXBlb2Ygd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsIGRvY3VtZW50LnRpdGxlLCB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgdmFsaWRhdG9yO1xuXG4gICAgICAgIC8vIEluaXQgY29sbGFwc2libGVcbiAgICAgICAgY29sbGFwc2libGVGYWN0b3J5KCk7XG4gICAgICAgIGhhbG9Td2lwZXJQcm9kdWN0SW1hZ2UoKTtcbiAgICAgICAgaGFsb0J1bmRsZVByb2R1Y3RzKCQoJy5oYWxvLXByb2R1Y3RWaWV3JyksIHRoaXMuY29udGV4dCk7XG5cbiAgICAgICAgdGhpcy5wcm9kdWN0RGV0YWlscyA9IG5ldyBQcm9kdWN0RGV0YWlscygkKCcucHJvZHVjdFZpZXcnKSwgdGhpcy5jb250ZXh0LCB3aW5kb3cuQkNEYXRhLnByb2R1Y3RfYXR0cmlidXRlcyk7XG4gICAgICAgIHRoaXMucHJvZHVjdERldGFpbHMuc2V0UHJvZHVjdFZhcmlhbnQoKTtcblxuICAgICAgICBpZiAodGhpcy5jb250ZXh0LnRoZW1lU2V0dGluZ3MuaGFsb19zdGlja3lBZGRUb0NhcnQpIHtcbiAgICAgICAgICAgIGhhbG9TdGlja3lBZGRUb0NhcnQoKTtcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdERldGFpbHMuc2V0UHJvZHVjdFZhcmlhbnQyKCk7XG4gICAgICAgIH1cblxuICAgICAgICB2aWRlb0dhbGxlcnkoKTtcblxuICAgICAgICB0aGlzLmJ1bGtQcmljaW5nSGFuZGxlcigpO1xuICAgICAgICB0aGlzLnZpZGVvUG9wdXAoKTtcbiAgICAgICAgdGhpcy5zb2xkUHJvZHVjdCgkKCcucHJvZHVjdFZpZXctc29sZFByb2R1Y3QnKSk7XG4gICAgICAgIHRoaXMuY291bnREb3duUHJvZHVjdCgkKCcucHJvZHVjdFZpZXctY291bnREb3duJykpO1xuICAgICAgICB0aGlzLmNvbXBhcmVDb2xvcnMoKTtcbiAgICAgICAgdGhpcy5hc2tBbkV4cGVydCgpO1xuICAgICAgICB0aGlzLmNoZWNrVGFiQWN0aXZlKCk7XG4gICAgICAgIHRoaXMuY2hlY2tQcm9kdWN0KCk7XG5cbiAgICAgICAgd2luZG93Lm1hdGNoTWVkaWEoJyhtaW4td2lkdGg6IDc2OHB4KScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tUYWJBY3RpdmUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIGlzUmVjZW50Vmlld2VkUHJvZHVjdHMgPSB0aGlzLmNvbnRleHQudGhlbWVTZXR0aW5ncy5wcm9kUmVjZW50Vmlld2VkO1xuICAgICAgICBpZiAoaXNSZWNlbnRWaWV3ZWRQcm9kdWN0cykge1xuICAgICAgICAgICAgaGFsb1JlY2VudFZpZXdlZFByb2R1Y3RzKHRoaXMuY29udGV4dCk7XG4gICAgICAgICAgICB0aGlzLnNldFJlY2VudFZpZXdlZFByb2R1Y3RzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCAkcmV2aWV3Rm9ybSA9IGNsYXNzaWZ5Rm9ybSgnLndyaXRlUmV2aWV3LWZvcm0nKTtcblxuICAgICAgICBpZiAoJHJldmlld0Zvcm0ubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgcmV2aWV3ID0gbmV3IFJldmlldyh7ICRyZXZpZXdGb3JtIH0pO1xuXG4gICAgICAgICQoJ2JvZHknKS5vbignY2xpY2snLCAnW2RhdGEtcmV2ZWFsLWlkPVwibW9kYWwtcmV2aWV3LWZvcm1cIl0nLCAoKSA9PiB7XG4gICAgICAgICAgICB2YWxpZGF0b3IgPSByZXZpZXcucmVnaXN0ZXJWYWxpZGF0aW9uKHRoaXMuY29udGV4dCk7XG4gICAgICAgICAgICB0aGlzLmFyaWFEZXNjcmliZVJldmlld0lucHV0cygkcmV2aWV3Rm9ybSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRyZXZpZXdGb3JtLm9uKCdzdWJtaXQnLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsaWRhdG9yKSB7XG4gICAgICAgICAgICAgICAgdmFsaWRhdG9yLnBlcmZvcm1DaGVjaygpO1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWxpZGF0b3IuYXJlQWxsKCd2YWxpZCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucHJvZHVjdFJldmlld0hhbmRsZXIoKTtcbiAgICB9XG5cbiAgICBhcmlhRGVzY3JpYmVSZXZpZXdJbnB1dHMoJGZvcm0pIHtcbiAgICAgICAgJGZvcm0uZmluZCgnW2RhdGEtaW5wdXRdJykuZWFjaCgoXywgaW5wdXQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRpbnB1dCA9ICQoaW5wdXQpO1xuICAgICAgICAgICAgY29uc3QgbXNnU3BhbklkID0gYCR7JGlucHV0LmF0dHIoJ25hbWUnKX0tbXNnYDtcblxuICAgICAgICAgICAgJGlucHV0LnNpYmxpbmdzKCdzcGFuJykuYXR0cignaWQnLCBtc2dTcGFuSWQpO1xuICAgICAgICAgICAgJGlucHV0LmF0dHIoJ2FyaWEtZGVzY3JpYmVkYnknLCBtc2dTcGFuSWQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm9kdWN0UmV2aWV3SGFuZGxlcigpIHtcbiAgICAgICAgaWYgKHRoaXMudXJsLmluZGV4T2YoJyN3cml0ZV9yZXZpZXcnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuJHJldmlld0xpbmsudHJpZ2dlcignY2xpY2snKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJ1bGtQcmljaW5nSGFuZGxlcigpIHtcbiAgICAgICAgaWYgKHRoaXMudXJsLmluZGV4T2YoJyNidWxrX3ByaWNpbmcnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuJGJ1bGtQcmljaW5nTGluay50cmlnZ2VyKCdjbGljaycpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmlkZW9Qb3B1cCgpIHtcbiAgICAgICAgaWYgKCQoJy5oYWxvLXByb2R1Y3RWaWRlby1saW5rJykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5oYWxvLXByb2R1Y3RWaWRlby1saW5rJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgICQoJy52aWRlb0dhbGxlcnktbGlzdCAudmlkZW9HYWxsZXJ5LWl0ZW06Zmlyc3QtY2hpbGQgPmEnKS50cmlnZ2VyKCdjbGljaycpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzb2xkUHJvZHVjdCgkd3JhcHBlcikge1xuICAgICAgICBpZigkd3JhcHBlci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB2YXIgbnVtYmVyc1Byb2R1Y3RfdGV4dCA9IHRoaXMuY29udGV4dC50aGVtZVNldHRpbmdzLnByb2R1Y3Rfc29sZFByb2R1Y3RfcHJvZHVjdHMsXG4gICAgICAgICAgICAgICAgbnVtYmVyc0hvdXJzX3RleHQgPSB0aGlzLmNvbnRleHQudGhlbWVTZXR0aW5ncy5wcm9kdWN0X3NvbGRQcm9kdWN0X2hvdXJzLFxuICAgICAgICAgICAgICAgIHNvbGRQcm9kdWN0VGV4dCA9IHRoaXMuY29udGV4dC50aGVtZVNldHRpbmdzLnByb2R1Y3Rfc29sZFByb2R1Y3RfdGV4dDtcblxuICAgICAgICAgICAgdmFyIG51bWJlcnNQcm9kdWN0TGlzdCA9ICBKU09OLnBhcnNlKFwiW1wiICsgbnVtYmVyc1Byb2R1Y3RfdGV4dCArIFwiXVwiKSwgXG4gICAgICAgICAgICAgICAgbnVtYmVyc1Byb2R1Y3RJdGVtID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpudW1iZXJzUHJvZHVjdExpc3QubGVuZ3RoKSksXG4gICAgICAgICAgICAgICAgbnVtYmVyc0hvdXJzTGlzdCA9ICBKU09OLnBhcnNlKFwiW1wiICsgbnVtYmVyc0hvdXJzX3RleHQgKyBcIl1cIiksXG4gICAgICAgICAgICAgICAgbnVtYmVyc0hvdXJzSXRlbSA9IChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqbnVtYmVyc0hvdXJzTGlzdC5sZW5ndGgpKTtcbiAgICAgICAgIFxuICAgICAgICAgICAgJHdyYXBwZXIuaHRtbCgnPHN2ZyBjbGFzcz1cImljb24gZC1pbmxpbmUtYmxvY2sgdi1hLW1pZGRsZVwiPjx1c2UgeGxpbms6aHJlZj1cIiNpY29uLWZpcmVcIi8+PC9zdmc+PHNwYW4gY2xhc3M9XCJ0ZXh0IGQtaW5saW5lLWJsb2NrIHYtYS1taWRkbGVcIj4nICsgbnVtYmVyc1Byb2R1Y3RMaXN0W251bWJlcnNQcm9kdWN0SXRlbV0gKyBcIiBcIiArIHNvbGRQcm9kdWN0VGV4dCArIFwiIFwiICsgbnVtYmVyc0hvdXJzTGlzdFtudW1iZXJzSG91cnNJdGVtXSArICdoPC9zcGFuPicpO1xuICAgICAgICAgICAgJHdyYXBwZXIuc2hvdygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY291bnREb3duUHJvZHVjdCgkd3JhcHBlcikge1xuICAgICAgICBpZigkd3JhcHBlci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB2YXIgY291bnREb3duID0gJHdyYXBwZXIuZGF0YSgnY291bnRkb3duJyksXG4gICAgICAgICAgICAgICAgY291bnREb3duRGF0ZSA9IG5ldyBEYXRlKGNvdW50RG93bikuZ2V0VGltZSgpLFxuICAgICAgICAgICAgICAgIHNlZnQgPSAkd3JhcHBlcjtcblxuICAgICAgICAgICAgdmFyIGNvdW50ZG93bmZ1bmN0aW9uID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxuICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZSA9IGNvdW50RG93bkRhdGUgLSBub3c7XG5cbiAgICAgICAgICAgICAgICBpZiAoZGlzdGFuY2UgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoY291bnRkb3duZnVuY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICBzZWZ0LnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXlzID0gTWF0aC5mbG9vcihkaXN0YW5jZSAvICgxMDAwICogNjAgKiA2MCAqIDI0KSksXG4gICAgICAgICAgICAgICAgICAgICAgICBob3VycyA9IE1hdGguZmxvb3IoKGRpc3RhbmNlICUgKDEwMDAgKiA2MCAqIDYwICogMjQpKSAvICgxMDAwICogNjAgKiA2MCkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWludXRlcyA9IE1hdGguZmxvb3IoKGRpc3RhbmNlICUgKDEwMDAgKiA2MCAqIDYwKSkgLyAoMTAwMCAqIDYwKSksXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRzID0gTWF0aC5mbG9vcigoZGlzdGFuY2UgJSAoMTAwMCAqIDYwKSkgLyAxMDAwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ckNvdW50RG93biA9ICc8ZGl2IGNsYXNzPVwiaXRlbVwiPjxzcGFuIGNsYXNzPVwibnVtXCI+JytkYXlzKyc8L3NwYW4+PHNwYW4gY2xhc3M9XCJ0ZXh0IGNvbG9yLXNlY29uZGFyeSBmLXNpemUtc21hbGxcIj4gZGF5czwvc3Bhbj48L2Rpdj5cXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpdGVtXCI+PHNwYW4gY2xhc3M9XCJudW1cIj4nK2hvdXJzKyc8L3NwYW4+PHNwYW4gY2xhc3M9XCJ0ZXh0IGNvbG9yLXNlY29uZGFyeSBmLXNpemUtc21hbGxcIj4gaG91cnM8L3NwYW4+PC9kaXY+XFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXRlbVwiPjxzcGFuIGNsYXNzPVwibnVtXCI+JyttaW51dGVzKyc8L3NwYW4+PHNwYW4gY2xhc3M9XCJ0ZXh0IGNvbG9yLXNlY29uZGFyeSBmLXNpemUtc21hbGxcIj4gbWluczwvc3Bhbj48L2Rpdj5cXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpdGVtXCI+PHNwYW4gY2xhc3M9XCJudW1cIj4nK3NlY29uZHMrJzwvc3Bhbj48c3BhbiBjbGFzcz1cInRleHQgY29sb3Itc2Vjb25kYXJ5IGYtc2l6ZS1zbWFsbFwiPiBzZWNzPC9zcGFuPjwvZGl2Pic7XG5cbiAgICAgICAgICAgICAgICAgICAgc2VmdC5odG1sKHN0ckNvdW50RG93bik7XG4gICAgICAgICAgICAgICAgICAgICR3cmFwcGVyLnJlbW92ZUNsYXNzKCdkLW5vbmUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBhcmVDb2xvcnMoKXtcbiAgICAgICAgY29uc3QgJHN3YXRjaFdyYXBwZXIgPSAkKCcuaGFsby1jb21wYXJlQ29sb3JzLXN3YXRjaCcpLFxuICAgICAgICAgICAgJGltYWdlV3JhcHBlciA9ICQoJy5oYWxvLWNvbXBhcmVDb2xvcnMtaW1hZ2UnKSxcbiAgICAgICAgICAgICR0ZXh0V3JhcHBlciA9ICQoJy5oYWxvLWNvbXBhcmVDb2xvcnMtdGV4dCcpO1xuXG4gICAgICAgICQoJy5mb3JtLW9wdGlvbicsICRzd2F0Y2hXcmFwcGVyKS5vbignY2xpY2snLCAgZXZlbnQgPT4ge1xuICAgICAgICAgICAgdmFyICR0aGlzID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcblxuICAgICAgICAgICAgJHRoaXMudG9nZ2xlQ2xhc3MoJ3Nob3ctY29sb3InKTtcblxuICAgICAgICAgICAgdmFyIHRpdGxlID0gJHRoaXMuZmluZCgnLmZvcm0tb3B0aW9uLXZhcmlhbnQnKS5hdHRyKCd0aXRsZScpLFxuICAgICAgICAgICAgICAgIGlkID0gJHRoaXMuZGF0YSgncHJvZHVjdC1zd2F0Y2gtdmFsdWUnKSxcbiAgICAgICAgICAgICAgICAkY29sb3IsICRjb2xvcjIsICRjb2xvcjMsICRpbWcsICRwYXR0ZXJuO1xuXG4gICAgICAgICAgICBpZiAoJHRoaXMuaGFzQ2xhc3MoJ3Nob3ctY29sb3InKSl7XG4gICAgICAgICAgICAgICAgaWYoJHRoaXMuZmluZCgnLmZvcm0tb3B0aW9uLXZhcmlhbnQtLWNvbG9yJykubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICAgICAgJGNvbG9yID0gJHRoaXMuZmluZCgnLmZvcm0tb3B0aW9uLXZhcmlhbnQtLWNvbG9yJykuYXR0cignc3R5bGUnKTtcblxuICAgICAgICAgICAgICAgICAgICAkaW1hZ2VXcmFwcGVyLmFwcGVuZCgnPGRpdiBjbGFzcz1cIml0ZW0gaXRlbS1jb2xvciBpdGVtLScraWQrJ1wiPjxzcGFuIGNsYXNzPVwiY29sb3JcIiBzdHlsZT1cIicrJGNvbG9yKyc7XCI+PC9zcGFuPjxzcGFuIGNsYXNzPVwidGl0bGVcIj4nK3RpdGxlKyc8L3NwYW4+PC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKCR0aGlzLmZpbmQoJy5mb3JtLW9wdGlvbi12YXJpYW50LS1jb2xvcjInKS5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgICAkY29sb3IgPSAkdGhpcy5maW5kKCcuZm9ybS1vcHRpb24tdmFyaWFudC0tY29sb3IyIC5jb2xvcjEnKS5hdHRyKCdzdHlsZScpO1xuICAgICAgICAgICAgICAgICAgICAkY29sb3IyID0gJHRoaXMuZmluZCgnLmZvcm0tb3B0aW9uLXZhcmlhbnQtLWNvbG9yMiAuY29sb3IyJykuYXR0cignc3R5bGUnKTtcblxuICAgICAgICAgICAgICAgICAgICAkKCcuaGFsby1jb21wYXJlQ29sb3JzLWltYWdlJykuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiaXRlbSBpdGVtLWNvbG9yIGl0ZW0tJytpZCsnXCI+PHNwYW4gY2xhc3M9XCJjb2xvciBjb2xvcjJcIj48c3BhbiBzdHlsZT1cIicrJGNvbG9yKyc7XCI+PC9zcGFuPjxzcGFuIHN0eWxlPVwiJyskY29sb3IyKyc7XCI+PC9zcGFuPjwvc3Bhbj48c3BhbiBjbGFzcz1cInRpdGxlXCI+Jyt0aXRsZSsnPC9zcGFuPjwvZGl2PicpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZigkdGhpcy5maW5kKCcuZm9ybS1vcHRpb24tdmFyaWFudC0tY29sb3IzJykubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICAgICAgJGNvbG9yID0gICR0aGlzLmZpbmQoJy5mb3JtLW9wdGlvbi12YXJpYW50LS1jb2xvcjMgLmNvbG9yMScpLmF0dHIoJ3N0eWxlJyk7XG4gICAgICAgICAgICAgICAgICAgICRjb2xvcjIgPSAgJHRoaXMuZmluZCgnLmZvcm0tb3B0aW9uLXZhcmlhbnQtLWNvbG9yMyAuY29sb3IyJykuYXR0cignc3R5bGUnKTtcbiAgICAgICAgICAgICAgICAgICAgJGNvbG9yMyA9ICAkdGhpcy5maW5kKCcuZm9ybS1vcHRpb24tdmFyaWFudC0tY29sb3IzIC5jb2xvcjMnKS5hdHRyKCdzdHlsZScpO1xuXG4gICAgICAgICAgICAgICAgICAgICRpbWFnZVdyYXBwZXIuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiaXRlbSBpdGVtLWNvbG9yIGl0ZW0tJytpZCsnXCI+PHNwYW4gY2xhc3M9XCJjb2xvciBjb2xvcjNcIj48c3BhbiBzdHlsZT1cIicrJGNvbG9yKyc7XCI+PC9zcGFuPjxzcGFuIHN0eWxlPVwiJyskY29sb3IyKyc7XCI+PC9zcGFuPjxzcGFuIHN0eWxlPVwiJyskY29sb3IzKyc7XCI+PC9zcGFuPjwvc3Bhbj48c3BhbiBjbGFzcz1cInRpdGxlXCI+Jyt0aXRsZSsnPC9zcGFuPjwvZGl2PicpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZigkdGhpcy5maW5kKCcuZm9ybS1vcHRpb24tdmFyaWFudC0tcGF0dGVybicpLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgICAgICRpbWcgPSAkdGhpcy5maW5kKCcuZm9ybS1vcHRpb24tdmFyaWFudC0tcGF0dGVybicpLmF0dHIoJ3N0eWxlJyk7XG4gICAgICAgICAgICAgICAgICAgICRwYXR0ZXJuID0gJHRoaXMuZmluZCgnLmZvcm0tb3B0aW9uLXZhcmlhbnQtLXBhdHRlcm4nKS5hdHRyKCdkYXRhLXBhdHRlcm4nKTtcblxuICAgICAgICAgICAgICAgICAgICAkaW1hZ2VXcmFwcGVyLmFwcGVuZCgnPGRpdiBjbGFzcz1cIml0ZW0gaXRlbS1wYXJ0ZXJuIGl0ZW0tJytpZCsnXCI+PHNwYW4gY2xhc3M9XCJpbWFnZVwiPjxpbWcgc3JjPScrJHBhdHRlcm4rJyBhbHQ9Jyt0aXRsZSsnIHRpdGxlPScrdGl0bGUrJz48L3NwYW4+PHNwYW4gY2xhc3M9XCJ0aXRsZVwiPicrdGl0bGUrJzwvc3Bhbj48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2V7XG4gICAgICAgICAgICAgICAgJCgnLml0ZW0tJytpZCsnJywgJGltYWdlV3JhcHBlcikucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKCRpbWFnZVdyYXBwZXIuY2hpbGRyZW4oKS5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAkdGV4dFdyYXBwZXIuaGlkZSgpO1xuICAgICAgICAgICAgfSBlbHNle1xuICAgICAgICAgICAgICAgICR0ZXh0V3JhcHBlci5zaG93KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+PSAxMDI1KSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbG9yLXN3YXRjaC1pbWFnZScpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIG5ldyBTb3J0YWJsZShlbCwge1xuICAgICAgICAgICAgICAgICAgICBhbmltYXRpb246IDE1MFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhc2tBbkV4cGVydCgpe1xuICAgICAgICB2YXIgbWVzc2FnZTtcblxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNvbnRleHQudGhlbWVTZXR0aW5ncy5oYWxvX2Fza19hbl9leHBlcnRfcGFnZWxpbms7XG5cbiAgICAgICAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB1dGlscy5hcGkuZ2V0UGFnZSh1cmwsIHt0ZW1wbGF0ZTogJ2hhbG90aGVtZXMvcHJvZHVjdC9oYWxvLWFzay1hbi1leHBlcnQtZm9ybSd9LCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHJldHVybjtcblxuICAgICAgICAgICAgICAgICQoJy5obC1mb3JtLWZpZWxkLXdyYXBwZXInKS5odG1sKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmFzay1hbi1leHBlcnQtbGluaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnaGFzLWFza0FuRXhwZXJ0JylcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgaWYgKCQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCcuYXNrLWFuLWV4cGVydC1saW5rJykubGVuZ3RoID09PSAwKXtcbiAgICAgICAgICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2hhcy1hc2tBbkV4cGVydCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuaGFsby1hc2stYW4tZXhwZXJ0LWZvcm0nKS5vbignc3VibWl0JywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB2YXIgdHlwZUNvbnRhY3QgPSAkKCcuaGFsby1hc2stYW4tZXhwZXJ0LWZvcm0gaW5wdXRbbmFtZT10eXBlX2NvbnRhY3RdOmNoZWNrZWQnKS52YWwoKSxcbiAgICAgICAgICAgICAgICB0eXBlUGFja2FnZSA9ICQoJy5oYWxvLWFzay1hbi1leHBlcnQtZm9ybSBpbnB1dFtuYW1lPXR5cGVfcGFja2FnZV06Y2hlY2tlZCcpLnZhbCgpLFxuICAgICAgICAgICAgICAgIGN1c3RvbWVyTWVzc2FnZSA9ICQoJy5oYWxvLWFzay1hbi1leHBlcnQtZm9ybSB0ZXh0YXJlYVtuYW1lPWNvbnRhY3RfY29tbWVudF9hcmVhXScpLnZhbCgpLFxuICAgICAgICAgICAgICAgIHJlY2FwdGNoYSA9ICQoJy5oYWxvLWFzay1hbi1leHBlcnQtZm9ybSAjZy1yZWNhcHRjaGEtcmVzcG9uc2UnKS52YWwoKSxcbiAgICAgICAgICAgICAgICB0aXRsZSA9ICAkKCcuaGFsby1hc2stYW4tZXhwZXJ0LWZvcm1bZGF0YS1wcm9kdWN0LWFzay10aXRsZV0nKS5hdHRyKCdkYXRhLXByb2R1Y3QtYXNrLXRpdGxlJyksXG4gICAgICAgICAgICAgICAgc2t1ID0gJCgnLmhhbG8tYXNrLWFuLWV4cGVydC1mb3JtW2RhdGEtcHJvZHVjdC1hc2stc2t1XScpLmF0dHIoJ2RhdGEtcHJvZHVjdC1hc2stc2t1JyksXG4gICAgICAgICAgICAgICAgdXJsID0gJCgnLmhhbG8tYXNrLWFuLWV4cGVydC1mb3JtW2RhdGEtcHJvZHVjdC1hc2stdXJsXScpLmF0dHIoJ2RhdGEtcHJvZHVjdC1hc2stdXJsJyk7XG5cbiAgICAgICAgICAgIGlmIChyZWNhcHRjaGEgPT0gJycpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBlcnJvciA9ICdUaGUgY2FwdGNoYSB5b3UgZW50ZXJlZCBpcyBpbmNvcnJlY3QuIFBsZWFzZSB0cnkgYWdhaW4uJ1xuXG4gICAgICAgICAgICAgICAgJCgnI2hhbG8tYXNrLWFuLWV4cGVydC1yZXN1bHRzJykuaHRtbCgnPGRpdiBjbGFzcz1cImFsZXJ0Qm94IGFsZXJ0Qm94LS1lcnJvclwiPicrZXJyb3IrJzwvZGl2PicpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVDb250YWN0ICE9ICcnICYmIHR5cGVQYWNrYWdlICE9ICcnICYmIGN1c3RvbWVyTWVzc2FnZSAhPSAnJyAmJiByZWNhcHRjaGEgIT0gJycpIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gYFxuICAgICAgICAgICAgICAgICAgICAxLiBEbyB5b3UgbmVlZDogJHt0eXBlUGFja2FnZX0gXG4gICAgICAgICAgICAgICAgICAgIDIuIFdoYXQgY2FuIEkgaGVscCB5b3Ugd2l0aCB0b2RheTogJHtjdXN0b21lck1lc3NhZ2V9XG4gICAgICAgICAgICAgICAgICAgIDMuIEhvdyB3b3VsZCB5b3UgbGlrZSBtZSB0byBjb250YWN0IHlvdT86ICR7dHlwZUNvbnRhY3R9XG4gICAgICAgICAgICAgICAgICAgIDQuIFByb2R1Y3QgTmFtZTogJHt0aXRsZX1cbiAgICAgICAgICAgICAgICAgICAgNS4gUHJvZHVjdCBTS1U6ICR7c2t1fVxuICAgICAgICAgICAgICAgICAgICA2LiBQcm9kdWN0IExpbms6ICR7dXJsfVxuICAgICAgICAgICAgICAgIGBcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJCgnI2NvbnRhY3RfcXVlc3Rpb24nKS52YWwobWVzc2FnZSk7XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICB1cmw6ICcvcGFnZXMucGhwP2FjdGlvbj1zZW5kQ29udGFjdEZvcm0nLFxuICAgICAgICAgICAgICAgIGRhdGE6ICQoJy5oYWxvLWFzay1hbi1leHBlcnQtZm9ybScpLnNlcmlhbGl6ZSgpLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAkKCcuaGFsby1hc2stYW4tZXhwZXJ0LWZvcm0nKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICQoJyNoYWxvLWFzay1hbi1leHBlcnQtcmVzdWx0cycpLmh0bWwoJzxkaXYgY2xhc3M9XCJhbGVydEJveCBhbGVydEJveC0tc3VjY2Vzc1wiPlRoYW5rIHlvdS4gV2VcXCd2ZSByZWNlaXZlZCB5b3VyIGZlZWRiYWNrIGFuZCB3aWxsIHJlc3BvbmQgc2hvcnRseS48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNoZWNrVGFiQWN0aXZlKCkge1xuICAgICAgICBjb25zdCB0YWIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10YWJdIC50YWInKTtcbiAgICAgICAgY29uc3QgdGFiRmlyc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS10YWJdIC50YWI6Zmlyc3QtY2hpbGQnKTtcbiAgICAgICAgY29uc3QgdGFiQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJzLWNvbnRlbnRzIC50YWItY29udGVudCcpO1xuICAgICAgICBjb25zdCB0YWJDb250ZW50Rmlyc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFicy1jb250ZW50cyAudGFiLWNvbnRlbnQ6Zmlyc3QtY2hpbGQnKTtcblxuICAgICAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEoJyhtaW4td2lkdGg6IDc2OHB4KScpLm1hdGNoZXMpIHtcbiAgICAgICAgICAgIHJlbW92ZVRhYkFjdGl2ZSgpXG4gICAgICAgICAgICBpZiAodGFiRmlyc3QpIHRhYkZpcnN0LmNsYXNzTGlzdC5hZGQoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgaWYgKHRhYkNvbnRlbnRGaXJzdCkgdGFiQ29udGVudEZpcnN0LmNsYXNzTGlzdC5hZGQoJ2lzLWFjdGl2ZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVtb3ZlVGFiQWN0aXZlKClcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHJlbW92ZVRhYkFjdGl2ZSgpIHtcbiAgICAgICAgICAgIGlmICh0YWIpIHtcbiAgICAgICAgICAgICAgICB0YWIuZm9yRWFjaChmdW5jdGlvbihjb250ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGFiQ29udGVudCkge1xuICAgICAgICAgICAgICAgIHRhYkNvbnRlbnQuZm9yRWFjaChmdW5jdGlvbihjb250ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGVja1Byb2R1Y3QoKSB7XG4gICAgICAgIGNvbnN0IHJlbGF0ZWRQcm9kdWN0cyA9ICQoJyNoYWxvLXJlbGF0ZWQtcHJvZHVjdHMnKSxcbiAgICAgICAgICAgIHNpbWlsYXJQcm9kdWN0cyA9ICQoJyNoYWxvLXNpbWlsYXItcHJvZHVjdHMnKTtcblxuICAgICAgICBpZihyZWxhdGVkUHJvZHVjdHMuZmluZCgnLnN3aXBlci13cmFwcGVyJykudGV4dCgpLnRyaW0oKSA9PSAnJykge1xuICAgICAgICAgICAgcmVsYXRlZFByb2R1Y3RzLmhpZGUoKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYoc2ltaWxhclByb2R1Y3RzLmZpbmQoJy5zd2lwZXItd3JhcHBlcicpLnRleHQoKS50cmltKCkgPT0gJycpIHtcbiAgICAgICAgICAgIHNpbWlsYXJQcm9kdWN0cy5oaWRlKClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldFJlY2VudFZpZXdlZFByb2R1Y3RzKCkge1xuICAgICAgICBjb25zdCBuYW1lID0gJ19oYWxvX3JlY2VudGx5X3ZpZXdlZCc7XG4gICAgICAgIGNvbnN0IHByb2R1Y3RJZCA9IHBhcnNlSW50KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwicHJvZHVjdF9pZFwiXScpLnZhbHVlKTtcbiAgICAgICAgY29uc3QgcmVjZW50bHlWaWV3ZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaGFsby1yZWNlbnQtdmlld2VkLXByb2R1Y3RzJyk7XG4gICAgICAgIGxldCBsaXN0SXRlbXMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKG5hbWUpIHx8ICdbXScpO1xuICAgICAgICBpZiAoIXByb2R1Y3RJZCkgcmV0dXJuO1xuICAgICAgICBpZiAobGlzdEl0ZW1zLmluY2x1ZGVzKHByb2R1Y3RJZCkpIGxpc3RJdGVtcyA9IGxpc3RJdGVtcy5maWx0ZXIoaWQgPT4gaWQgIT09IHByb2R1Y3RJZCk7XG4gICAgICAgIGxpc3RJdGVtcy51bnNoaWZ0KHByb2R1Y3RJZCk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKG5hbWUsIEpTT04uc3RyaW5naWZ5KGxpc3RJdGVtcy5zbGljZSgwLCBOdW1iZXIocmVjZW50bHlWaWV3ZWQuZGF0YXNldC5saW1pdCkpKSk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFZpZGVvR2FsbGVyeSB7XG4gICAgY29uc3RydWN0b3IoJGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy4kcGxheWVyID0gJGVsZW1lbnQuZmluZCgnW2RhdGEtdmlkZW8tcGxheWVyXScpO1xuICAgICAgICB0aGlzLiR2aWRlb3MgPSAkZWxlbWVudC5maW5kKCdbZGF0YS12aWRlby1pdGVtXScpO1xuICAgICAgICB0aGlzLmN1cnJlbnRWaWRlbyA9IHt9O1xuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICB9XG5cbiAgICBzZWxlY3ROZXdWaWRlbyhlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBjb25zdCAkdGFyZ2V0ID0gJChlLmN1cnJlbnRUYXJnZXQpO1xuXG4gICAgICAgIHRoaXMuY3VycmVudFZpZGVvID0ge1xuICAgICAgICAgICAgaWQ6ICR0YXJnZXQuZGF0YSgndmlkZW9JZCcpLFxuICAgICAgICAgICAgJHNlbGVjdGVkVGh1bWI6ICR0YXJnZXQsXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5zZXRNYWluVmlkZW8oKTtcbiAgICAgICAgdGhpcy5zZXRBY3RpdmVUaHVtYigpO1xuICAgIH1cblxuICAgIHNldE1haW5WaWRlbygpIHtcbiAgICAgICAgdGhpcy4kcGxheWVyLmF0dHIoJ3NyYycsIGAvL3d3dy55b3V0dWJlLmNvbS9lbWJlZC8ke3RoaXMuY3VycmVudFZpZGVvLmlkfWApO1xuICAgIH1cblxuICAgIHNldEFjdGl2ZVRodW1iKCkge1xuICAgICAgICB0aGlzLiR2aWRlb3MucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICB0aGlzLmN1cnJlbnRWaWRlby4kc2VsZWN0ZWRUaHVtYi5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgfVxuXG4gICAgYmluZEV2ZW50cygpIHtcbiAgICAgICAgdGhpcy4kdmlkZW9zLm9uKCdjbGljaycsIHRoaXMuc2VsZWN0TmV3VmlkZW8uYmluZCh0aGlzKSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB2aWRlb0dhbGxlcnkoKSB7XG4gICAgY29uc3QgcGx1Z2luS2V5ID0gJ3ZpZGVvLWdhbGxlcnknO1xuICAgIGNvbnN0ICR2aWRlb0dhbGxlcnkgPSAkKGBbZGF0YS0ke3BsdWdpbktleX1dYCk7XG5cbiAgICAkdmlkZW9HYWxsZXJ5LmVhY2goKGluZGV4LCBlbGVtZW50KSA9PiB7XG4gICAgICAgIGNvbnN0ICRlbCA9ICQoZWxlbWVudCk7XG4gICAgICAgIGNvbnN0IGlzSW5pdGlhbGl6ZWQgPSAkZWwuZGF0YShwbHVnaW5LZXkpIGluc3RhbmNlb2YgVmlkZW9HYWxsZXJ5O1xuXG4gICAgICAgIGlmIChpc0luaXRpYWxpemVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAkZWwuZGF0YShwbHVnaW5LZXksIG5ldyBWaWRlb0dhbGxlcnkoJGVsKSk7XG4gICAgfSk7XG59XG4iXSwibmFtZXMiOlsidXRpbHMiLCJzaG93QWxlcnRNb2RhbCIsImhhbG9DYWxjdWxhdGVGcmVlU2hpcHBpbmciLCJmb3JtcyIsIiRzY29wZSIsImNvbnRleHQiLCJ0aGlzUHJvdWN0SWQiLCJwYXJzZUludCIsInByb2R1Y3RJZCIsIiRyZWxhdGVkVGFiIiwiJCIsIiRidW5kbGUiLCIkYnVuZGxlTGlzdCIsImZpbmQiLCJjdXJyZW5jeSIsIm1vbmV5Iiwic2hvd0J1bmRsZSIsImRvY3VtZW50Iiwib24iLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiJHRhcmdldCIsImN1cnJlbnRUYXJnZXQiLCJub3QiLCJyZW1vdmVDbGFzcyIsIm5leHQiLCJoYXNDbGFzcyIsImFkZENsYXNzIiwidGFyZ2V0IiwiY2xvc2VzdCIsImxlbmd0aCIsImlkIiwiYXR0ciIsInJlcGxhY2UiLCJwcm9kdWN0IiwiaXMiLCJ0ZXh0IiwidG90YWxQcmljZSIsIiRmb3JtIiwiYXJyUHJvIiwiQXJyYXkiLCJlYWNoIiwiaW5kZXgiLCJ2YWwiLCJwdXNoIiwiY2hlY2siLCJjaGVja1Byb2R1Y3QiLCJrIiwic2hvdyIsImFkZFRvQ2FydCIsImVycm9yTWVzc2FnZSIsInRtcCIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lckhUTUwiLCJ0ZXh0Q29udGVudCIsImlubmVyVGV4dCIsIm9wdGlvbnMiLCJ0ZW1wbGF0ZSIsInByb2RCdW5kbGVJZCIsInRvdGFsQmxvY2siLCJmaXJzdEl0ZW0iLCJhcHBlbmQiLCJwcm9kdWN0Q3VzdG9tRmllbGRzIiwib2JqIiwibmFtZSIsIkpTT04iLCJwYXJzZSIsInZhbHVlIiwiZ3JlcCIsIm51bSIsImxpc3QiLCJkYXRhIiwicElkIiwidW5kZWZpbmVkIiwiYXBpIiwiZ2V0QnlJZCIsImVyciIsInJlc3BvbnNlIiwiZm9yRWFjaCIsImVsZW1lbnQiLCJzaG93TGlzdCIsImkiLCJmb3JtIiwiaGFzT3B0aW9ucyIsImhhc0RlZmF1bHRPcHRpb25zIiwicHJvZHVjdEF0dHJpYnV0ZXMiLCJvcHRpb25DaGFuZ2UiLCJzZXJpYWxpemUiLCJhdHRyaWJ1dGVzRGF0YSIsImF0dHJpYnV0ZXNDb250ZW50IiwiY29udGVudCIsInVwZGF0ZVByb2R1Y3RBdHRyaWJ1dGVzIiwidXBkYXRlVmlldyIsInVwZGF0ZURlZmF1bHRBdHRyaWJ1dGVzRm9yT09TIiwiJHByb2R1Y3RPcHRpb25zRWxlbWVudCIsImh0bWwiLCJ0cmltIiwic2V0UHJvZHVjdFZhcmlhbnQiLCJjdXJyZW50SXRlbVByb0lkIiwiJGlucHV0IiwicXVhbnRpdHlNaW4iLCJxdWFudGl0eU1heCIsInF0eSIsIm51bWJlcnNPbmx5IiwidmFsaWRhdGVJbmNyZWFzZUFnYWluc3RNYXhCb3VuZGFyeSIsInZhbGlkYXRlRGVjcmVhc2VBZ2FpbnN0TWluQm91bmRhcnkiLCJwcm9kdWN0T3B0aW9ucyIsImNoZWNrQmVmb3JlQWRkIiwiJGF0dHJpYnV0ZXMiLCJhdHQiLCJwcm9wIiwiZm9jdXMiLCJhcnJQIiwid2luZG93IiwiRm9ybURhdGEiLCJwcm9kIiwiZm9ybURhdGEiLCJjYXJ0IiwiaXRlbUFkZCIsImZpbHRlckVtcHR5RmlsZXNGcm9tRm9ybSIsImVycm9yIiwicHJvZHVjdHNJdGVtIiwicHJvZHVjdEl0ZW0iLCJxdWFudGl0eURhdGEiLCJhbGVydCIsImhpZGUiLCJ0aGVtZVNldHRpbmdzIiwiaGFsb0FkZFRvQ2FydEFjdGlvbiIsImxvYWRpbmdDbGFzcyIsIiRib2R5IiwiJGNhcnREcm9wZG93biIsIiRjYXJ0TG9hZGluZyIsImdldENvbnRlbnQiLCJxdWFudGl0eSIsInRyaWdnZXIiLCJyZWRpcmVjdFRvIiwidXJscyIsImlzUnVubmluZ0luSWZyYW1lIiwic2VsZiIsInRvcCIsImUiLCJ1cmwiLCJpZnJhbWVTZGsiLCJsb2NhdGlvbiIsInRvdGFsIiwidG90YWxTYWxlIiwic3ltYm9sIiwic3ltYm9sQ2hhbmdlIiwiZGVjaW1hbFBsYWNlcyIsImRlY2ltYWxTZXBhcmF0b3IiLCJ0aG91c2FuZHNTZXBhcmF0b3IiLCJzeW1ib2xMb2NhdGlvbiIsImN1cnIiLCJ0b2tlbjEiLCJ0b2tlbjIiLCJkZWNpbWFsX3BsYWNlcyIsImRlY2ltYWxfdG9rZW4iLCJ0aG91c2FuZHNfdG9rZW4iLCJjdXJyZW5jeV9sb2NhdGlvbiIsImN1cnJlbmN5X3Rva2VuIiwicHJpY2UiLCJwYXJzZUZsb2F0IiwicHJpY2VTYWxlIiwiaW5kZXhPZiIsImZvcm1hdE1vbmV5IiwibiIsImMiLCJkIiwidCIsImlzTmFOIiwiTWF0aCIsImFicyIsInMiLCJTdHJpbmciLCJOdW1iZXIiLCJ0b0ZpeGVkIiwiaiIsInN1YnN0ciIsInNsaWNlIiwicHJvZHVjdE9wdGlvbnNDaGFuZ2VkIiwidW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcyIsIml0ZW0iLCJ2YWx1ZU9wdGlvbnMiLCJfIiwib3B0aW9uTGFiZWwiLCJvcHRpb25UaXRsZSIsInNwbGl0IiwicmVxdWlyZWQiLCJ0b0xvd2VyQ2FzZSIsImluY2x1ZGVzIiwidHlwZSIsInF1ZXJ5U2VsZWN0b3IiLCJpc1NhdGlzZmllZCIsImZyb20iLCJxdWVyeVNlbGVjdG9yQWxsIiwiZXZlcnkiLCJzZWxlY3QiLCJzZWxlY3RlZEluZGV4IiwiZGF0ZVN0cmluZyIsIm1hcCIsIngiLCJqb2luIiwiY2hpbGRyZW4iLCJjaGVja2VkIiwibGFiZWwiLCJsYWJlbHMiLCJ0aXRsZSIsIiRjaGFuZ2VkT3B0aW9uIiwicGFyZW50cyIsInByb2R1Y3RBdHRyaWJ1dGVzRGF0YSIsInByb2R1Y3RBdHRyaWJ1dGVzQ29udGVudCIsImJlaGF2aW9yIiwib3V0X29mX3N0b2NrX2JlaGF2aW9yIiwiaW5TdG9ja0lkcyIsImluX3N0b2NrX2F0dHJpYnV0ZXMiLCJvdXRPZlN0b2NrRGVmYXVsdE1lc3NhZ2UiLCJvdXRPZlN0b2NrTWVzc2FnZSIsIm91dF9vZl9zdG9ja19tZXNzYWdlIiwiYXR0cmlidXRlIiwiJGF0dHJpYnV0ZSIsImF0dHJJZCIsImVuYWJsZUF0dHJpYnV0ZSIsImRpc2FibGVBdHRyaWJ1dGUiLCJnZXRBdHRyaWJ1dGVUeXBlIiwiZGlzYWJsZVNlbGVjdE9wdGlvbkF0dHJpYnV0ZSIsIiRzZWxlY3QiLCJwYXJlbnQiLCJ0b2dnbGVPcHRpb24iLCJlbmFibGVTZWxlY3RPcHRpb25BdHRyaWJ1dGUiLCIkcGFyZW50Iiwidmlld01vZGVsIiwiZ2V0Vmlld01vZGVsIiwic2hvd01lc3NhZ2VCb3giLCJzdG9ja19tZXNzYWdlIiwicHVyY2hhc2luZ19tZXNzYWdlIiwiT2JqZWN0IiwidXBkYXRlUHJpY2VWaWV3IiwicHJvZHVjdENoZWNrYm94IiwicHVyY2hhc2FibGUiLCJpbnN0b2NrIiwiJHByaWNlVmFsdWUiLCIkcHJpY2VXaXRoVGF4IiwiJHByaWNlV2l0aG91dFRheCIsInJycFdpdGhUYXgiLCIkZGl2IiwiJHNwYW4iLCJycnBXaXRob3V0VGF4Iiwibm9uU2FsZVdpdGhUYXgiLCJub25TYWxlV2l0aG91dFRheCIsInByaWNlU2F2ZWQiLCJwcmljZU5vd0xhYmVsIiwicHJpY2VMYWJlbCIsIiR3ZWlnaHQiLCIkaW5jcmVtZW50cyIsIiRhZGRUb0NhcnQiLCIkd2lzaGxpc3RWYXJpYXRpb24iLCJzdG9jayIsIiRjb250YWluZXIiLCJza3UiLCIkbGFiZWwiLCIkdmFsdWUiLCJ1cGMiLCIkdGV4dCIsIiRidWxrUHJpY2luZyIsIiR3YWxsZXRCdXR0b25zIiwibWVzc2FnZSIsIiRtZXNzYWdlQm94IiwiY2xlYXJQcmljaW5nTm90Rm91bmQiLCJ3aXRoX3RheCIsInVwZGF0ZWRQcmljZSIsInByaWNlX3JhbmdlIiwibWluIiwiZm9ybWF0dGVkIiwibWF4Iiwid2l0aG91dF90YXgiLCJycnBfd2l0aF90YXgiLCJycnBfd2l0aG91dF90YXgiLCJzYXZlZCIsIm5vbl9zYWxlX3ByaWNlX3dpdGhfdGF4Iiwibm9uX3NhbGVfcHJpY2Vfd2l0aG91dF90YXgiLCJfaXRlcmF0b3IiLCJfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlckxvb3NlIiwiX3N0ZXAiLCJkb25lIiwiX3N0ZXAkdmFsdWUiLCJrZXkiLCJGaWxlIiwic2l6ZSIsImNvbnNvbGUiLCJoYWxvQWRkT3B0aW9uRm9yUHJvZHVjdCIsImhhbG9Qcm9kdWN0SW1hZ2VIb3ZlciIsImdldGxpc3RJdGVtcyIsIiR0aGlzIiwiJHdyYXBwZXIiLCJzdHlsZSIsImRpc3BsYXkiLCJsb2FkIiwiaGFuZGxlSW50ZXJzZWN0aW9uIiwiZW50cmllcyIsIm9ic2VydmVyIiwiaXNJbnRlcnNlY3RpbmciLCJ1bm9ic2VydmUiLCJnZXRQcm9kdWN0IiwiSW50ZXJzZWN0aW9uT2JzZXJ2ZXIiLCJiaW5kIiwicm9vdE1hcmdpbiIsIm9ic2VydmUiLCJsaXN0SXRlbXMiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwic3BsaWNlIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwiZGF0YXNldCIsImxpbWl0Iiwic2Nyb2xsIiwib2Zmc2V0Iiwic2Nyb2xsVG9wIiwid2lkdGgiLCJjc3MiLCJvdXRlckhlaWdodCIsInRvZ2dsZUNsYXNzIiwib25sb2FkIiwiU29ydGFibGUiLCJQYWdlTWFuYWdlciIsIlJldmlldyIsImNvbGxhcHNpYmxlRmFjdG9yeSIsIlByb2R1Y3REZXRhaWxzIiwidmlkZW9HYWxsZXJ5IiwiY2xhc3NpZnlGb3JtIiwibW9kYWxGYWN0b3J5IiwiaGFsb1N3aXBlclByb2R1Y3RJbWFnZSIsImhhbG9CdW5kbGVQcm9kdWN0cyIsImhhbG9SZWNlbnRWaWV3ZWRQcm9kdWN0cyIsImhhbG9TdGlja3lBZGRUb0NhcnQiLCJQcm9kdWN0IiwiX1BhZ2VNYW5hZ2VyIiwiX3RoaXMiLCJjYWxsIiwiaHJlZiIsIiRyZXZpZXdMaW5rIiwiJGJ1bGtQcmljaW5nTGluayIsInJldmlld01vZGFsIiwiX2luaGVyaXRzTG9vc2UiLCJfcHJvdG8iLCJwcm90b3R5cGUiLCJvblJlYWR5IiwiX3RoaXMyIiwiaGlzdG9yeSIsInJlcGxhY2VTdGF0ZSIsInBhdGhuYW1lIiwidmFsaWRhdG9yIiwicHJvZHVjdERldGFpbHMiLCJCQ0RhdGEiLCJwcm9kdWN0X2F0dHJpYnV0ZXMiLCJoYWxvX3N0aWNreUFkZFRvQ2FydCIsInNldFByb2R1Y3RWYXJpYW50MiIsImJ1bGtQcmljaW5nSGFuZGxlciIsInZpZGVvUG9wdXAiLCJzb2xkUHJvZHVjdCIsImNvdW50RG93blByb2R1Y3QiLCJjb21wYXJlQ29sb3JzIiwiYXNrQW5FeHBlcnQiLCJjaGVja1RhYkFjdGl2ZSIsIm1hdGNoTWVkaWEiLCJhZGRFdmVudExpc3RlbmVyIiwiaXNSZWNlbnRWaWV3ZWRQcm9kdWN0cyIsInByb2RSZWNlbnRWaWV3ZWQiLCJzZXRSZWNlbnRWaWV3ZWRQcm9kdWN0cyIsIiRyZXZpZXdGb3JtIiwicmV2aWV3IiwicmVnaXN0ZXJWYWxpZGF0aW9uIiwiYXJpYURlc2NyaWJlUmV2aWV3SW5wdXRzIiwicGVyZm9ybUNoZWNrIiwiYXJlQWxsIiwicHJvZHVjdFJldmlld0hhbmRsZXIiLCJpbnB1dCIsIm1zZ1NwYW5JZCIsInNpYmxpbmdzIiwibnVtYmVyc1Byb2R1Y3RfdGV4dCIsInByb2R1Y3Rfc29sZFByb2R1Y3RfcHJvZHVjdHMiLCJudW1iZXJzSG91cnNfdGV4dCIsInByb2R1Y3Rfc29sZFByb2R1Y3RfaG91cnMiLCJzb2xkUHJvZHVjdFRleHQiLCJwcm9kdWN0X3NvbGRQcm9kdWN0X3RleHQiLCJudW1iZXJzUHJvZHVjdExpc3QiLCJudW1iZXJzUHJvZHVjdEl0ZW0iLCJmbG9vciIsInJhbmRvbSIsIm51bWJlcnNIb3Vyc0xpc3QiLCJudW1iZXJzSG91cnNJdGVtIiwiY291bnREb3duIiwiY291bnREb3duRGF0ZSIsIkRhdGUiLCJnZXRUaW1lIiwic2VmdCIsImNvdW50ZG93bmZ1bmN0aW9uIiwic2V0SW50ZXJ2YWwiLCJub3ciLCJkaXN0YW5jZSIsImNsZWFySW50ZXJ2YWwiLCJyZW1vdmUiLCJkYXlzIiwiaG91cnMiLCJtaW51dGVzIiwic2Vjb25kcyIsInN0ckNvdW50RG93biIsIiRzd2F0Y2hXcmFwcGVyIiwiJGltYWdlV3JhcHBlciIsIiR0ZXh0V3JhcHBlciIsIiRjb2xvciIsIiRjb2xvcjIiLCIkY29sb3IzIiwiJGltZyIsIiRwYXR0ZXJuIiwiZWwiLCJnZXRFbGVtZW50QnlJZCIsImFuaW1hdGlvbiIsImhhbG9fYXNrX2FuX2V4cGVydF9wYWdlbGluayIsInJlYWR5IiwiZ2V0UGFnZSIsInR5cGVDb250YWN0IiwidHlwZVBhY2thZ2UiLCJjdXN0b21lck1lc3NhZ2UiLCJyZWNhcHRjaGEiLCJhamF4Iiwic3VjY2VzcyIsInRhYiIsInRhYkZpcnN0IiwidGFiQ29udGVudCIsInRhYkNvbnRlbnRGaXJzdCIsIm1hdGNoZXMiLCJyZW1vdmVUYWJBY3RpdmUiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZWxhdGVkUHJvZHVjdHMiLCJzaW1pbGFyUHJvZHVjdHMiLCJyZWNlbnRseVZpZXdlZCIsImZpbHRlciIsInVuc2hpZnQiLCJzZXRJdGVtIiwic3RyaW5naWZ5IiwiZGVmYXVsdCIsIlZpZGVvR2FsbGVyeSIsIiRlbGVtZW50IiwiJHBsYXllciIsIiR2aWRlb3MiLCJjdXJyZW50VmlkZW8iLCJiaW5kRXZlbnRzIiwic2VsZWN0TmV3VmlkZW8iLCIkc2VsZWN0ZWRUaHVtYiIsInNldE1haW5WaWRlbyIsInNldEFjdGl2ZVRodW1iIiwicGx1Z2luS2V5IiwiJHZpZGVvR2FsbGVyeSIsIiRlbCIsImlzSW5pdGlhbGl6ZWQiXSwic291cmNlUm9vdCI6IiJ9