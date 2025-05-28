"use strict";
(self["webpackChunkbigcommerce_nimo"] = self["webpackChunkbigcommerce_nimo"] || []).push([["assets_js_theme_common_product-details-base_js"],{

/***/ "./assets/js/theme/common/aria/constants.js":
/*!**************************************************!*\
  !*** ./assets/js/theme/common/aria/constants.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ariaKeyCodes: () => (/* binding */ ariaKeyCodes)
/* harmony export */ });
var ariaKeyCodes = {
  RETURN: 13,
  SPACE: 32,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
};

/***/ }),

/***/ "./assets/js/theme/common/aria/index.js":
/*!**********************************************!*\
  !*** ./assets/js/theme/common/aria/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initRadioOptions: () => (/* reexport safe */ _radioOptions__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _radioOptions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./radioOptions */ "./assets/js/theme/common/aria/radioOptions.js");


/***/ }),

/***/ "./assets/js/theme/common/aria/radioOptions.js":
/*!*****************************************************!*\
  !*** ./assets/js/theme/common/aria/radioOptions.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./assets/js/theme/common/aria/constants.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");

var setCheckedRadioItem = function setCheckedRadioItem(itemCollection, itemIdx) {
  itemCollection.each(function (idx, item) {
    var $item = $(item);
    if (idx !== itemIdx) {
      $item.attr('aria-checked', false).prop('checked', false);
      return;
    }
    $item.attr('aria-checked', true).prop('checked', true).focus();
    $item.trigger('change');
  });
};
var calculateTargetItemPosition = function calculateTargetItemPosition(lastItemIdx, currentIdx) {
  switch (true) {
    case currentIdx > lastItemIdx:
      return 0;
    case currentIdx < 0:
      return lastItemIdx;
    default:
      return currentIdx;
  }
};
var handleItemKeyDown = function handleItemKeyDown(itemCollection) {
  return function (e) {
    var keyCode = e.keyCode;
    var itemIdx = itemCollection.index(e.currentTarget);
    var lastCollectionItemIdx = itemCollection.length - 1;
    if (Object.values(_constants__WEBPACK_IMPORTED_MODULE_0__.ariaKeyCodes).includes(keyCode)) {
      e.preventDefault();
      e.stopPropagation();
    }
    switch (keyCode) {
      case _constants__WEBPACK_IMPORTED_MODULE_0__.ariaKeyCodes.LEFT:
      case _constants__WEBPACK_IMPORTED_MODULE_0__.ariaKeyCodes.UP:
        {
          var prevItemIdx = calculateTargetItemPosition(lastCollectionItemIdx, itemIdx - 1);
          itemCollection.get(prevItemIdx).focus();
          setCheckedRadioItem(itemCollection, itemIdx - 1);
          break;
        }
      case _constants__WEBPACK_IMPORTED_MODULE_0__.ariaKeyCodes.RIGHT:
      case _constants__WEBPACK_IMPORTED_MODULE_0__.ariaKeyCodes.DOWN:
        {
          var nextItemIdx = calculateTargetItemPosition(lastCollectionItemIdx, itemIdx + 1);
          itemCollection.get(nextItemIdx).focus();
          setCheckedRadioItem(itemCollection, itemIdx + 1);
          break;
        }
      default:
        break;
    }
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function ($container, itemSelector) {
  var $itemCollection = $container.find(itemSelector);
  $container.on('keydown', itemSelector, handleItemKeyDown($itemCollection));
});

/***/ }),

/***/ "./assets/js/theme/common/product-details-base.js":
/*!********************************************************!*\
  !*** ./assets/js/theme/common/product-details-base.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ProductDetailsBase),
/* harmony export */   optionChangeDecorator: () => (/* binding */ optionChangeDecorator)
/* harmony export */ });
/* harmony import */ var _wishlist__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../wishlist */ "./assets/js/theme/wishlist.js");
/* harmony import */ var _aria__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./aria */ "./assets/js/theme/common/aria/index.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");


var optionsTypesMap = {
  INPUT_FILE: 'input-file',
  INPUT_TEXT: 'input-text',
  INPUT_NUMBER: 'input-number',
  INPUT_CHECKBOX: 'input-checkbox',
  TEXTAREA: 'textarea',
  DATE: 'date',
  SET_SELECT: 'set-select',
  SET_RECTANGLE: 'set-rectangle',
  SET_RADIO: 'set-radio',
  SWATCH: 'swatch',
  PRODUCT_LIST: 'product-list'
};
function optionChangeDecorator(areDefaultOtionsSet) {
  var _this = this;
  return function (err, response) {
    var attributesData = response.data || {};
    var attributesContent = response.content || {};
    _this.updateProductAttributes(attributesData);
    if (areDefaultOtionsSet) {
      _this.updateView(attributesData, attributesContent);
    } else {
      _this.updateDefaultAttributesForOOS(attributesData);
    }
  };
}
var ProductDetailsBase = /*#__PURE__*/function () {
  function ProductDetailsBase($scope, context) {
    var _this2 = this;
    this.$scope = $scope;
    this.context = context;
    this.initRadioAttributes();
    _wishlist__WEBPACK_IMPORTED_MODULE_0__["default"].load(this.context);
    this.getTabRequests();
    $('[data-product-attribute]').each(function (__, value) {
      var type = value.getAttribute('data-product-attribute');
      _this2._makeProductVariantAccessible(value, type);
    });
  }
  var _proto = ProductDetailsBase.prototype;
  _proto._makeProductVariantAccessible = function _makeProductVariantAccessible(variantDomNode, variantType) {
    switch (variantType) {
      case optionsTypesMap.SET_RADIO:
      case optionsTypesMap.SWATCH:
        {
          (0,_aria__WEBPACK_IMPORTED_MODULE_1__.initRadioOptions)($(variantDomNode), '[type=radio]');
          break;
        }
      default:
        break;
    }
  }

  /**
   * Allow radio buttons to get deselected
   */;
  _proto.initRadioAttributes = function initRadioAttributes() {
    var _this3 = this;
    $('[data-product-attribute] input[type="radio"]', this.$scope).each(function (i, radio) {
      var $radio = $(radio);

      // Only bind to click once
      if ($radio.attr('data-state') !== undefined) {
        $radio.on('click', function () {
          if ($radio.data('state') === true) {
            $radio.prop('checked', false);
            $radio.data('state', false);
            $radio.trigger('change');
          } else {
            $radio.data('state', true);
          }
          _this3.initRadioAttributes();
        });
      }
      $radio.attr('data-state', $radio.prop('checked'));
    });
  }

  /**
   * Hide or mark as unavailable out of stock attributes if enabled
   * @param  {Object} data Product attribute data
   */;
  _proto.updateProductAttributes = function updateProductAttributes(data) {
    var _this4 = this;
    var behavior = data.out_of_stock_behavior;
    var inStockIds = data.in_stock_attributes;
    var outOfStockDefaultMessage = this.context.outOfStockDefaultMessage;
    var outOfStockMessage = data.out_of_stock_message;
    if (behavior !== 'hide_option' && behavior !== 'label_option') {
      return;
    }
    if (outOfStockMessage) {
      outOfStockMessage = " (" + outOfStockMessage + ")";
    } else {
      outOfStockMessage = " (" + outOfStockDefaultMessage + ")";
    }
    $('[data-product-attribute-value]', this.$scope).each(function (i, attribute) {
      var $attribute = $(attribute);
      var attrId = parseInt($attribute.data('productAttributeValue'), 10);
      if (inStockIds.indexOf(attrId) !== -1) {
        _this4.enableAttribute($attribute, behavior, outOfStockMessage);
      } else {
        _this4.disableAttribute($attribute, behavior, outOfStockMessage);
      }
    });
  }

  /**
   * Check for fragment identifier in URL requesting a specific tab
   */;
  _proto.getTabRequests = function getTabRequests() {
    if (window.location.hash && window.location.hash.indexOf('#tab-') === 0) {
      var $activeTab = $('.tabs').has("[href='" + window.location.hash + "']");
      var $tabContent = $("" + window.location.hash);
      if ($activeTab.length > 0) {
        $activeTab.find('.tab').removeClass('is-active').has("[href='" + window.location.hash + "']").addClass('is-active');
        $tabContent.addClass('is-active').siblings().removeClass('is-active');
      }
    }
  }

  /**
   * Since $productView can be dynamically inserted using render_with,
   * We have to retrieve the respective elements
   *
   * @param $scope
   */;
  _proto.getViewModel = function getViewModel($scope) {
    return {
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
      $stockLeft: $('[data-stock-left]', $scope),
      $stockLeftWrapper: $('.productView-optionsStock', $scope),
      $stockProgress: $('.halo-hotStock-progress', $scope),
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
        $input: $('[name=qty\\[\\]]', $scope)
      },
      $bulkPricing: $('.productView-info-bulkPricing', $scope),
      $walletButtons: $('[data-add-to-cart-wallet-buttons]', $scope)
    };
  }

  /**
   * Hide the pricing elements that will show up only when the price exists in API
   * @param viewModel
   */;
  _proto.clearPricingNotFound = function clearPricingNotFound(viewModel) {
    viewModel.rrpWithTax.$div.hide();
    viewModel.rrpWithoutTax.$div.hide();
    viewModel.nonSaleWithTax.$div.hide();
    viewModel.nonSaleWithoutTax.$div.hide();
    viewModel.priceSaved.$div.hide();
    viewModel.priceNowLabel.$span.hide();
    viewModel.priceLabel.$span.hide();
  }

  /**
   * Update the view of price, messages, SKU and stock options when a product option changes
   * @param  {Object} data Product attribute data
   */;
  _proto.updateView = function updateView(data, content) {
    if (content === void 0) {
      content = null;
    }
    var viewModel = this.getViewModel(this.$scope);
    if (typeof data.stock === 'number') {
      if (data.stock <= parseInt(this.context.themeSettings.halo_stock_level_limit) && data.stock > 0) {
        viewModel.$stockLeftWrapper.removeClass('u-hiddenVisually');
        viewModel.$stockProgress.removeClass('u-hiddenVisually');
        viewModel.$stockLeft.text(data.stock);
        this.hotStock(data.stock);
      } else {
        viewModel.$stockLeftWrapper.addClass('u-hiddenVisually');
        viewModel.$stockProgress.addClass('u-hiddenVisually');
      }
    }
    this.showMessageBox(data.stock_message || data.purchasing_message);
    if (data.price instanceof Object) {
      this.updatePriceView(viewModel, data.price);
    }
    if (data.weight instanceof Object) {
      viewModel.$weight.html(data.weight.formatted);
    }

    // Set variation_id if it exists for adding to wishlist
    if (data.variantId) {
      viewModel.$wishlistVariation.val(data.variantId);
    }

    // If SKU is available
    if (data.sku) {
      viewModel.sku.$value.text(data.sku);
      viewModel.sku.$label.show();
    } else {
      viewModel.sku.$label.hide();
      viewModel.sku.$value.text('');
    }

    // If UPC is available
    if (data.upc) {
      viewModel.upc.$value.text(data.upc);
      viewModel.upc.$label.show();
    } else {
      viewModel.upc.$label.hide();
      viewModel.upc.$value.text('');
    }

    // if stock view is on (CP settings)
    if (viewModel.stock.$container.length && typeof data.stock === 'number') {
      // if the stock container is hidden, show
      viewModel.stock.$container.removeClass('u-hiddenVisually');
      viewModel.stock.$input.text(data.stock);
    } else {
      viewModel.stock.$container.addClass('u-hiddenVisually');
      viewModel.stock.$input.text(data.stock);
    }
    this.updateDefaultAttributesForOOS(data);
    this.updateWalletButtonsView(data);

    // If Bulk Pricing rendered HTML is available
    if (data.bulk_discount_rates && content) {
      viewModel.$bulkPricing.html(content);
    } else if (typeof data.bulk_discount_rates !== 'undefined') {
      viewModel.$bulkPricing.html('');
    }
    var addToCartWrapper = $('#add-to-cart-wrapper');
    if (addToCartWrapper.is(':hidden') && data.purchasable) {
      addToCartWrapper.show();
    }
  }

  /**
   * Update the view of price, messages, SKU and stock options when a product option changes
   * @param  {Object} data Product attribute data
   */;
  _proto.updatePriceView = function updatePriceView(viewModel, price) {
    this.clearPricingNotFound(viewModel);
    if (price.with_tax) {
      var updatedPrice = price.price_range ? price.price_range.min.with_tax.formatted + " - " + price.price_range.max.with_tax.formatted : price.with_tax.formatted;
      viewModel.priceLabel.$span.show();
      viewModel.$priceWithTax.html(updatedPrice);
    }
    if (price.without_tax) {
      var _updatedPrice = price.price_range ? price.price_range.min.without_tax.formatted + " - " + price.price_range.max.without_tax.formatted : price.without_tax.formatted;
      viewModel.priceLabel.$span.show();
      viewModel.$priceWithoutTax.html(_updatedPrice);
    }
    if (price.rrp_with_tax) {
      viewModel.rrpWithTax.$div.show();
      viewModel.rrpWithTax.$span.html(price.rrp_with_tax.formatted);
    }
    if (price.rrp_without_tax) {
      viewModel.rrpWithoutTax.$div.show();
      viewModel.rrpWithoutTax.$span.html(price.rrp_without_tax.formatted);
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
    }
    if (price.non_sale_price_without_tax) {
      viewModel.priceLabel.$span.hide();
      viewModel.nonSaleWithoutTax.$div.show();
      viewModel.priceNowLabel.$span.show();
      viewModel.nonSaleWithoutTax.$span.html(price.non_sale_price_without_tax.formatted);
    }
  }

  /**
   * Show an message box if a message is passed
   * Hide the box if the message is empty
   * @param  {String} message
   */;
  _proto.showMessageBox = function showMessageBox(message) {
    var $messageBox = $('.productAttributes-message');
    if (message) {
      $('.alertBox-message', $messageBox).text(message);
      $messageBox.show();
    } else {
      $messageBox.hide();
    }
  };
  _proto.updateDefaultAttributesForOOS = function updateDefaultAttributesForOOS(data) {
    var viewModel = this.getViewModel(this.$scope);
    if (!data.purchasable || !data.instock) {
      viewModel.$addToCart.prop('disabled', true);
      viewModel.$increments.prop('disabled', true);
    } else {
      viewModel.$addToCart.prop('disabled', false);
      viewModel.$increments.prop('disabled', false);
    }
  };
  _proto.updateWalletButtonsView = function updateWalletButtonsView(data) {
    this.toggleWalletButtonsVisibility(data.purchasable && data.instock);
  };
  _proto.toggleWalletButtonsVisibility = function toggleWalletButtonsVisibility(shouldShow) {
    var viewModel = this.getViewModel(this.$scope);
    if (shouldShow) {
      viewModel.$walletButtons.show();
    } else {
      viewModel.$walletButtons.hide();
    }
  };
  _proto.enableAttribute = function enableAttribute($attribute, behavior, outOfStockMessage) {
    if (this.getAttributeType($attribute) === 'set-select') {
      return this.enableSelectOptionAttribute($attribute, behavior, outOfStockMessage);
    }
    if (behavior === 'hide_option') {
      $attribute.show();
    } else {
      $attribute.removeClass('unavailable');
    }
  };
  _proto.disableAttribute = function disableAttribute($attribute, behavior, outOfStockMessage) {
    if (this.getAttributeType($attribute) === 'set-select') {
      return this.disableSelectOptionAttribute($attribute, behavior, outOfStockMessage);
    }
    if (behavior === 'hide_option') {
      $attribute.hide(0);
    } else {
      $attribute.addClass('unavailable');
    }
  };
  _proto.getAttributeType = function getAttributeType($attribute) {
    var $parent = $attribute.closest('[data-product-attribute]');
    return $parent ? $parent.data('productAttribute') : null;
  };
  _proto.disableSelectOptionAttribute = function disableSelectOptionAttribute($attribute, behavior, outOfStockMessage) {
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
  };
  _proto.enableSelectOptionAttribute = function enableSelectOptionAttribute($attribute, behavior, outOfStockMessage) {
    if (behavior === 'hide_option') {
      $attribute.toggleOption(true);
    } else {
      $attribute.html($attribute.html().replace(outOfStockMessage, ''));
    }
  };
  _proto.hotStock = function hotStock(inventoryQuantity) {
    var productView = document.querySelector('.productView');
    var hotStock = productView.querySelector('.productView-hotStock');
    var stockCurrent = productView.querySelector('[data-current-inventory]');
    if (hotStock) {
      var maxStock = parseFloat(hotStock.dataset.hotStock);
      if (stockCurrent) {
        if (inventoryQuantity > 0 && inventoryQuantity <= maxStock) {
          hotStock.querySelector('.productView-stock').classList.remove('u-hiddenVisually');
          hotStock.querySelector('.halo-hotStock-progress').classList.remove('u-hiddenVisually');
        } else {
          hotStock.querySelector('.productView-stock').classList.add('u-hiddenVisually');
          hotStock.querySelector('.halo-hotStock-progress').classList.add('u-hiddenVisually');
        }
      }
      var invenProgress = inventoryQuantity / maxStock * 100,
        hotStockProgressItem = hotStock.querySelector('.halo-hotStock-progress-item');
      hotStockProgressItem.style.width = invenProgress + "%";
    }
  };
  return ProductDetailsBase;
}();


/***/ }),

/***/ "./assets/js/theme/common/utils/pagination-utils.js":
/*!**********************************************************!*\
  !*** ./assets/js/theme/common/utils/pagination-utils.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   wishlistPaginatorHelper: () => (/* binding */ wishlistPaginatorHelper)
/* harmony export */ });
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
var changeWishlistPaginationLinks = function changeWishlistPaginationLinks(wishlistUrl) {
  for (var _len = arguments.length, paginationItems = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    paginationItems[_key - 1] = arguments[_key];
  }
  return $.each(paginationItems, function (_, $item) {
    var paginationLink = $item.children('.pagination-link');
    if ($item.length && !paginationLink.attr('href').includes('page=')) {
      var pageNumber = paginationLink.attr('href');
      paginationLink.attr('href', wishlistUrl + "page=" + pageNumber);
    }
  });
};

/**
 * helps to withdraw differences in structures around the stencil resource pagination
 */
var wishlistPaginatorHelper = function wishlistPaginatorHelper() {
  var $paginationList = $('.pagination-list');
  if (!$paginationList.length) return;
  var $nextItem = $('.pagination-item--next', $paginationList);
  var $prevItem = $('.pagination-item--previous', $paginationList);
  var currentHref = $('[data-pagination-current-page-link]').attr('href');
  var partialPaginationUrl = currentHref.split('page=').shift();
  changeWishlistPaginationLinks(partialPaginationUrl, $prevItem, $nextItem);
};

/***/ }),

/***/ "./assets/js/theme/wishlist.js":
/*!*************************************!*\
  !*** ./assets/js/theme/wishlist.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ WishList)
/* harmony export */ });
/* harmony import */ var foundation_sites_js_foundation_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! foundation-sites/js/foundation/foundation */ "./node_modules/foundation-sites/js/foundation/foundation.js");
/* harmony import */ var foundation_sites_js_foundation_foundation__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(foundation_sites_js_foundation_foundation__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var foundation_sites_js_foundation_foundation_reveal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! foundation-sites/js/foundation/foundation.reveal */ "./node_modules/foundation-sites/js/foundation/foundation.reveal.js");
/* harmony import */ var foundation_sites_js_foundation_foundation_reveal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(foundation_sites_js_foundation_foundation_reveal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_utils_pagination_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common/utils/pagination-utils */ "./assets/js/theme/common/utils/pagination-utils.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }






var WishList = /*#__PURE__*/function (_PageManager) {
  function WishList(context) {
    var _this;
    _this = _PageManager.call(this, context) || this;
    _this.options = {
      template: 'account/add-wishlist'
    };
    return _this || _assertThisInitialized(_this);
  }

  /**
   * Creates a confirm box before deleting all wish lists
   */
  _inheritsLoose(WishList, _PageManager);
  var _proto = WishList.prototype;
  _proto.wishlistDeleteConfirm = function wishlistDeleteConfirm() {
    var _this2 = this;
    $('body').on('click', '[data-wishlist-delete]', function (event) {
      var confirmed = window.confirm(_this2.context.wishlistDelete);
      if (confirmed) {
        return true;
      }
      event.preventDefault();
    });
  };
  _proto.registerAddWishListValidation = function registerAddWishListValidation($addWishlistForm) {
    var _this3 = this;
    this.addWishlistValidator = (0,_common_nod__WEBPACK_IMPORTED_MODULE_2__["default"])({
      submit: '.wishlist-form input[type="submit"]',
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__.announceInputErrorMessage
    });
    this.addWishlistValidator.add([{
      selector: '.wishlist-form input[name="wishlistname"]',
      validate: function validate(cb, val) {
        var result = val.length > 0;
        cb(result);
      },
      errorMessage: this.context.enterWishlistNameError
    }]);
    $addWishlistForm.on('submit', function (event) {
      _this3.addWishlistValidator.performCheck();
      if (_this3.addWishlistValidator.areAll('valid')) {
        return;
      }
      event.preventDefault();
    });
  };
  _proto.onReady = function onReady() {
    var $addWishListForm = $('.wishlist-form');
    if ($('[data-pagination-wishlist]').length) {
      (0,_common_utils_pagination_utils__WEBPACK_IMPORTED_MODULE_4__.wishlistPaginatorHelper)();
    }
    if ($addWishListForm.length) {
      this.registerAddWishListValidation($addWishListForm);
    }
    this.wishlistDeleteConfirm();
  };
  return WishList;
}(_page_manager__WEBPACK_IMPORTED_MODULE_3__["default"]);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLmFzc2V0c19qc190aGVtZV9jb21tb25fcHJvZHVjdC1kZXRhaWxzLWJhc2VfanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFPLElBQU1BLFlBQVksR0FBRztFQUN4QkMsTUFBTSxFQUFFLEVBQUU7RUFDVkMsS0FBSyxFQUFFLEVBQUU7RUFDVEMsSUFBSSxFQUFFLEVBQUU7RUFDUkMsRUFBRSxFQUFFLEVBQUU7RUFDTkMsS0FBSyxFQUFFLEVBQUU7RUFDVEMsSUFBSSxFQUFFO0FBQ1YsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1AwQztBQUUzQyxJQUFNQyxtQkFBbUIsR0FBRyxTQUF0QkEsbUJBQW1CQSxDQUFJQyxjQUFjLEVBQUVDLE9BQU8sRUFBSztFQUNyREQsY0FBYyxDQUFDRSxJQUFJLENBQUMsVUFBQ0MsR0FBRyxFQUFFQyxJQUFJLEVBQUs7SUFDL0IsSUFBTUMsS0FBSyxHQUFHQyxDQUFDLENBQUNGLElBQUksQ0FBQztJQUNyQixJQUFJRCxHQUFHLEtBQUtGLE9BQU8sRUFBRTtNQUNqQkksS0FBSyxDQUFDRSxJQUFJLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFDQyxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQztNQUN4RDtJQUNKO0lBRUFILEtBQUssQ0FBQ0UsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQ0MsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQ0MsS0FBSyxDQUFDLENBQUM7SUFDOURKLEtBQUssQ0FBQ0ssT0FBTyxDQUFDLFFBQVEsQ0FBQztFQUMzQixDQUFDLENBQUM7QUFDTixDQUFDO0FBRUQsSUFBTUMsMkJBQTJCLEdBQUcsU0FBOUJBLDJCQUEyQkEsQ0FBSUMsV0FBVyxFQUFFQyxVQUFVLEVBQUs7RUFDN0QsUUFBUSxJQUFJO0lBQ1osS0FBS0EsVUFBVSxHQUFHRCxXQUFXO01BQUUsT0FBTyxDQUFDO0lBQ3ZDLEtBQUtD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QUFFLFNBQUFBLFNBQUNDLEVBQUUsRUFBRTFGLEdBQUcsRUFBSztRQUNuQixJQUFNMkYsTUFBTSxHQUFHM0YsR0FBRyxDQUFDbEksTUFBTSxHQUFHLENBQUM7UUFFN0I0TixFQUFFLENBQUNDLE1BQU0sQ0FBQztNQUNkLENBQUM7TUFDREMsWUFBWSxFQUFFLElBQUksQ0FBQ3BMLE9BQU8sQ0FBQ3FMO0lBQy9CLENBQUMsQ0FDSixDQUFDO0lBRUZULGdCQUFnQixDQUFDek0sRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFBb00sS0FBSyxFQUFJO01BQ25DekosTUFBSSxDQUFDK0osb0JBQW9CLENBQUNTLFlBQVksQ0FBQyxDQUFDO01BRXhDLElBQUl4SyxNQUFJLENBQUMrSixvQkFBb0IsQ0FBQ1UsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQzNDO01BQ0o7TUFFQWhCLEtBQUssQ0FBQzdNLGNBQWMsQ0FBQyxDQUFDO0lBQzFCLENBQUMsQ0FBQztFQUNOLENBQUM7RUFBQWdELE1BQUEsQ0FFRDhLLE9BQU8sR0FBUCxTQUFBQSxRQUFBLEVBQVU7SUFDTixJQUFNQyxnQkFBZ0IsR0FBR2pQLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQztJQUU1QyxJQUFJQSxDQUFDLENBQUMsNEJBQTRCLENBQUMsQ0FBQ2MsTUFBTSxFQUFFO01BQ3hDOEwsdUZBQXVCLENBQUMsQ0FBQztJQUM3QjtJQUVBLElBQUlxQyxnQkFBZ0IsQ0FBQ25PLE1BQU0sRUFBRTtNQUN6QixJQUFJLENBQUNxTiw2QkFBNkIsQ0FBQ2MsZ0JBQWdCLENBQUM7SUFDeEQ7SUFFQSxJQUFJLENBQUNuQixxQkFBcUIsQ0FBQyxDQUFDO0VBQ2hDLENBQUM7RUFBQSxPQUFBUCxRQUFBO0FBQUEsRUFuRWlDRixxREFBVyIsInNvdXJjZXMiOlsid2VicGFjazovL2JpZ2NvbW1lcmNlLW5pbW8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL2FyaWEvY29uc3RhbnRzLmpzIiwid2VicGFjazovL2JpZ2NvbW1lcmNlLW5pbW8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL2FyaWEvcmFkaW9PcHRpb25zLmpzIiwid2VicGFjazovL2JpZ2NvbW1lcmNlLW5pbW8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL3Byb2R1Y3QtZGV0YWlscy1iYXNlLmpzIiwid2VicGFjazovL2JpZ2NvbW1lcmNlLW5pbW8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL3V0aWxzL3BhZ2luYXRpb24tdXRpbHMuanMiLCJ3ZWJwYWNrOi8vYmlnY29tbWVyY2Utbmltby8uL2Fzc2V0cy9qcy90aGVtZS93aXNobGlzdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgYXJpYUtleUNvZGVzID0ge1xuICAgIFJFVFVSTjogMTMsXG4gICAgU1BBQ0U6IDMyLFxuICAgIExFRlQ6IDM3LFxuICAgIFVQOiAzOCxcbiAgICBSSUdIVDogMzksXG4gICAgRE9XTjogNDAsXG59O1xuIiwiaW1wb3J0IHsgYXJpYUtleUNvZGVzIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5jb25zdCBzZXRDaGVja2VkUmFkaW9JdGVtID0gKGl0ZW1Db2xsZWN0aW9uLCBpdGVtSWR4KSA9PiB7XG4gICAgaXRlbUNvbGxlY3Rpb24uZWFjaCgoaWR4LCBpdGVtKSA9PiB7XG4gICAgICAgIGNvbnN0ICRpdGVtID0gJChpdGVtKTtcbiAgICAgICAgaWYgKGlkeCAhPT0gaXRlbUlkeCkge1xuICAgICAgICAgICAgJGl0ZW0uYXR0cignYXJpYS1jaGVja2VkJywgZmFsc2UpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAkaXRlbS5hdHRyKCdhcmlhLWNoZWNrZWQnLCB0cnVlKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSkuZm9jdXMoKTtcbiAgICAgICAgJGl0ZW0udHJpZ2dlcignY2hhbmdlJyk7XG4gICAgfSk7XG59O1xuXG5jb25zdCBjYWxjdWxhdGVUYXJnZXRJdGVtUG9zaXRpb24gPSAobGFzdEl0ZW1JZHgsIGN1cnJlbnRJZHgpID0+IHtcbiAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICBjYXNlIGN1cnJlbnRJZHggPiBsYXN0SXRlbUlkeDogcmV0dXJuIDA7XG4gICAgY2FzZSBjdXJyZW50SWR4IDwgMDogcmV0dXJuIGxhc3RJdGVtSWR4O1xuICAgIGRlZmF1bHQ6IHJldHVybiBjdXJyZW50SWR4O1xuICAgIH1cbn07XG5cbmNvbnN0IGhhbmRsZUl0ZW1LZXlEb3duID0gaXRlbUNvbGxlY3Rpb24gPT4gZSA9PiB7XG4gICAgY29uc3QgeyBrZXlDb2RlIH0gPSBlO1xuICAgIGNvbnN0IGl0ZW1JZHggPSBpdGVtQ29sbGVjdGlvbi5pbmRleChlLmN1cnJlbnRUYXJnZXQpO1xuICAgIGNvbnN0IGxhc3RDb2xsZWN0aW9uSXRlbUlkeCA9IGl0ZW1Db2xsZWN0aW9uLmxlbmd0aCAtIDE7XG5cbiAgICBpZiAoT2JqZWN0LnZhbHVlcyhhcmlhS2V5Q29kZXMpLmluY2x1ZGVzKGtleUNvZGUpKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGtleUNvZGUpIHtcbiAgICBjYXNlIGFyaWFLZXlDb2Rlcy5MRUZUOlxuICAgIGNhc2UgYXJpYUtleUNvZGVzLlVQOiB7XG4gICAgICAgIGNvbnN0IHByZXZJdGVtSWR4ID0gY2FsY3VsYXRlVGFyZ2V0SXRlbVBvc2l0aW9uKGxhc3RDb2xsZWN0aW9uSXRlbUlkeCwgaXRlbUlkeCAtIDEpO1xuICAgICAgICBpdGVtQ29sbGVjdGlvbi5nZXQocHJldkl0ZW1JZHgpLmZvY3VzKCk7XG4gICAgICAgIHNldENoZWNrZWRSYWRpb0l0ZW0oaXRlbUNvbGxlY3Rpb24sIGl0ZW1JZHggLSAxKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgYXJpYUtleUNvZGVzLlJJR0hUOlxuICAgIGNhc2UgYXJpYUtleUNvZGVzLkRPV046IHtcbiAgICAgICAgY29uc3QgbmV4dEl0ZW1JZHggPSBjYWxjdWxhdGVUYXJnZXRJdGVtUG9zaXRpb24obGFzdENvbGxlY3Rpb25JdGVtSWR4LCBpdGVtSWR4ICsgMSk7XG4gICAgICAgIGl0ZW1Db2xsZWN0aW9uLmdldChuZXh0SXRlbUlkeCkuZm9jdXMoKTtcbiAgICAgICAgc2V0Q2hlY2tlZFJhZGlvSXRlbShpdGVtQ29sbGVjdGlvbiwgaXRlbUlkeCArIDEpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBkZWZhdWx0OiBicmVhaztcbiAgICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCAoJGNvbnRhaW5lciwgaXRlbVNlbGVjdG9yKSA9PiB7XG4gICAgY29uc3QgJGl0ZW1Db2xsZWN0aW9uID0gJGNvbnRhaW5lci5maW5kKGl0ZW1TZWxlY3Rvcik7XG5cbiAgICAkY29udGFpbmVyLm9uKCdrZXlkb3duJywgaXRlbVNlbGVjdG9yLCBoYW5kbGVJdGVtS2V5RG93bigkaXRlbUNvbGxlY3Rpb24pKTtcbn07XG4iLCJpbXBvcnQgV2lzaGxpc3QgZnJvbSAnLi4vd2lzaGxpc3QnO1xuaW1wb3J0IHsgaW5pdFJhZGlvT3B0aW9ucyB9IGZyb20gJy4vYXJpYSc7XG5cbmNvbnN0IG9wdGlvbnNUeXBlc01hcCA9IHtcbiAgICBJTlBVVF9GSUxFOiAnaW5wdXQtZmlsZScsXG4gICAgSU5QVVRfVEVYVDogJ2lucHV0LXRleHQnLFxuICAgIElOUFVUX05VTUJFUjogJ2lucHV0LW51bWJlcicsXG4gICAgSU5QVVRfQ0hFQ0tCT1g6ICdpbnB1dC1jaGVja2JveCcsXG4gICAgVEVYVEFSRUE6ICd0ZXh0YXJlYScsXG4gICAgREFURTogJ2RhdGUnLFxuICAgIFNFVF9TRUxFQ1Q6ICdzZXQtc2VsZWN0JyxcbiAgICBTRVRfUkVDVEFOR0xFOiAnc2V0LXJlY3RhbmdsZScsXG4gICAgU0VUX1JBRElPOiAnc2V0LXJhZGlvJyxcbiAgICBTV0FUQ0g6ICdzd2F0Y2gnLFxuICAgIFBST0RVQ1RfTElTVDogJ3Byb2R1Y3QtbGlzdCcsXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gb3B0aW9uQ2hhbmdlRGVjb3JhdG9yKGFyZURlZmF1bHRPdGlvbnNTZXQpIHtcbiAgICByZXR1cm4gKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlc0RhdGEgPSByZXNwb25zZS5kYXRhIHx8IHt9O1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGVzQ29udGVudCA9IHJlc3BvbnNlLmNvbnRlbnQgfHwge307XG5cbiAgICAgICAgdGhpcy51cGRhdGVQcm9kdWN0QXR0cmlidXRlcyhhdHRyaWJ1dGVzRGF0YSk7XG4gICAgICAgIGlmIChhcmVEZWZhdWx0T3Rpb25zU2V0KSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoYXR0cmlidXRlc0RhdGEsIGF0dHJpYnV0ZXNDb250ZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRGVmYXVsdEF0dHJpYnV0ZXNGb3JPT1MoYXR0cmlidXRlc0RhdGEpO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvZHVjdERldGFpbHNCYXNlIHtcbiAgICBjb25zdHJ1Y3Rvcigkc2NvcGUsIGNvbnRleHQpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgIHRoaXMuaW5pdFJhZGlvQXR0cmlidXRlcygpO1xuICAgICAgICBXaXNobGlzdC5sb2FkKHRoaXMuY29udGV4dCk7XG4gICAgICAgIHRoaXMuZ2V0VGFiUmVxdWVzdHMoKTtcblxuICAgICAgICAkKCdbZGF0YS1wcm9kdWN0LWF0dHJpYnV0ZV0nKS5lYWNoKChfXywgdmFsdWUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHR5cGUgPSB2YWx1ZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvZHVjdC1hdHRyaWJ1dGUnKTtcblxuICAgICAgICAgICAgdGhpcy5fbWFrZVByb2R1Y3RWYXJpYW50QWNjZXNzaWJsZSh2YWx1ZSwgdHlwZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIF9tYWtlUHJvZHVjdFZhcmlhbnRBY2Nlc3NpYmxlKHZhcmlhbnREb21Ob2RlLCB2YXJpYW50VHlwZSkge1xuICAgICAgICBzd2l0Y2ggKHZhcmlhbnRUeXBlKSB7XG4gICAgICAgIGNhc2Ugb3B0aW9uc1R5cGVzTWFwLlNFVF9SQURJTzpcbiAgICAgICAgY2FzZSBvcHRpb25zVHlwZXNNYXAuU1dBVENIOiB7XG4gICAgICAgICAgICBpbml0UmFkaW9PcHRpb25zKCQodmFyaWFudERvbU5vZGUpLCAnW3R5cGU9cmFkaW9dJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGRlZmF1bHQ6IGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWxsb3cgcmFkaW8gYnV0dG9ucyB0byBnZXQgZGVzZWxlY3RlZFxuICAgICAqL1xuICAgIGluaXRSYWRpb0F0dHJpYnV0ZXMoKSB7XG4gICAgICAgICQoJ1tkYXRhLXByb2R1Y3QtYXR0cmlidXRlXSBpbnB1dFt0eXBlPVwicmFkaW9cIl0nLCB0aGlzLiRzY29wZSkuZWFjaCgoaSwgcmFkaW8pID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRyYWRpbyA9ICQocmFkaW8pO1xuXG4gICAgICAgICAgICAvLyBPbmx5IGJpbmQgdG8gY2xpY2sgb25jZVxuICAgICAgICAgICAgaWYgKCRyYWRpby5hdHRyKCdkYXRhLXN0YXRlJykgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICRyYWRpby5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgkcmFkaW8uZGF0YSgnc3RhdGUnKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHJhZGlvLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkcmFkaW8uZGF0YSgnc3RhdGUnLCBmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICRyYWRpby50cmlnZ2VyKCdjaGFuZ2UnKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRyYWRpby5kYXRhKCdzdGF0ZScsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0UmFkaW9BdHRyaWJ1dGVzKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICRyYWRpby5hdHRyKCdkYXRhLXN0YXRlJywgJHJhZGlvLnByb3AoJ2NoZWNrZWQnKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhpZGUgb3IgbWFyayBhcyB1bmF2YWlsYWJsZSBvdXQgb2Ygc3RvY2sgYXR0cmlidXRlcyBpZiBlbmFibGVkXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBkYXRhIFByb2R1Y3QgYXR0cmlidXRlIGRhdGFcbiAgICAgKi9cbiAgICB1cGRhdGVQcm9kdWN0QXR0cmlidXRlcyhkYXRhKSB7XG4gICAgICAgIGNvbnN0IGJlaGF2aW9yID0gZGF0YS5vdXRfb2Zfc3RvY2tfYmVoYXZpb3I7XG4gICAgICAgIGNvbnN0IGluU3RvY2tJZHMgPSBkYXRhLmluX3N0b2NrX2F0dHJpYnV0ZXM7XG4gICAgICAgIGNvbnN0IG91dE9mU3RvY2tEZWZhdWx0TWVzc2FnZSA9IHRoaXMuY29udGV4dC5vdXRPZlN0b2NrRGVmYXVsdE1lc3NhZ2U7XG4gICAgICAgIGxldCBvdXRPZlN0b2NrTWVzc2FnZSA9IGRhdGEub3V0X29mX3N0b2NrX21lc3NhZ2U7XG5cbiAgICAgICAgaWYgKGJlaGF2aW9yICE9PSAnaGlkZV9vcHRpb24nICYmIGJlaGF2aW9yICE9PSAnbGFiZWxfb3B0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG91dE9mU3RvY2tNZXNzYWdlKSB7XG4gICAgICAgICAgICBvdXRPZlN0b2NrTWVzc2FnZSA9IGAgKCR7b3V0T2ZTdG9ja01lc3NhZ2V9KWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvdXRPZlN0b2NrTWVzc2FnZSA9IGAgKCR7b3V0T2ZTdG9ja0RlZmF1bHRNZXNzYWdlfSlgO1xuICAgICAgICB9XG5cbiAgICAgICAgJCgnW2RhdGEtcHJvZHVjdC1hdHRyaWJ1dGUtdmFsdWVdJywgdGhpcy4kc2NvcGUpLmVhY2goKGksIGF0dHJpYnV0ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgJGF0dHJpYnV0ZSA9ICQoYXR0cmlidXRlKTtcbiAgICAgICAgICAgIGNvbnN0IGF0dHJJZCA9IHBhcnNlSW50KCRhdHRyaWJ1dGUuZGF0YSgncHJvZHVjdEF0dHJpYnV0ZVZhbHVlJyksIDEwKTtcblxuXG4gICAgICAgICAgICBpZiAoaW5TdG9ja0lkcy5pbmRleE9mKGF0dHJJZCkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmFibGVBdHRyaWJ1dGUoJGF0dHJpYnV0ZSwgYmVoYXZpb3IsIG91dE9mU3RvY2tNZXNzYWdlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNhYmxlQXR0cmlidXRlKCRhdHRyaWJ1dGUsIGJlaGF2aW9yLCBvdXRPZlN0b2NrTWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGZvciBmcmFnbWVudCBpZGVudGlmaWVyIGluIFVSTCByZXF1ZXN0aW5nIGEgc3BlY2lmaWMgdGFiXG4gICAgICovXG4gICAgZ2V0VGFiUmVxdWVzdHMoKSB7XG4gICAgICAgIGlmICh3aW5kb3cubG9jYXRpb24uaGFzaCAmJiB3aW5kb3cubG9jYXRpb24uaGFzaC5pbmRleE9mKCcjdGFiLScpID09PSAwKSB7XG4gICAgICAgICAgICBjb25zdCAkYWN0aXZlVGFiID0gJCgnLnRhYnMnKS5oYXMoYFtocmVmPScke3dpbmRvdy5sb2NhdGlvbi5oYXNofSddYCk7XG4gICAgICAgICAgICBjb25zdCAkdGFiQ29udGVudCA9ICQoYCR7d2luZG93LmxvY2F0aW9uLmhhc2h9YCk7XG5cbiAgICAgICAgICAgIGlmICgkYWN0aXZlVGFiLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAkYWN0aXZlVGFiLmZpbmQoJy50YWInKVxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAgIC5oYXMoYFtocmVmPScke3dpbmRvdy5sb2NhdGlvbi5oYXNofSddYClcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcblxuICAgICAgICAgICAgICAgICR0YWJDb250ZW50LmFkZENsYXNzKCdpcy1hY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICAuc2libGluZ3MoKVxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2luY2UgJHByb2R1Y3RWaWV3IGNhbiBiZSBkeW5hbWljYWxseSBpbnNlcnRlZCB1c2luZyByZW5kZXJfd2l0aCxcbiAgICAgKiBXZSBoYXZlIHRvIHJldHJpZXZlIHRoZSByZXNwZWN0aXZlIGVsZW1lbnRzXG4gICAgICpcbiAgICAgKiBAcGFyYW0gJHNjb3BlXG4gICAgICovXG4gICAgZ2V0Vmlld01vZGVsKCRzY29wZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJHByaWNlV2l0aFRheDogJCgnW2RhdGEtcHJvZHVjdC1wcmljZS13aXRoLXRheF0nLCAkc2NvcGUpLFxuICAgICAgICAgICAgJHByaWNlV2l0aG91dFRheDogJCgnW2RhdGEtcHJvZHVjdC1wcmljZS13aXRob3V0LXRheF0nLCAkc2NvcGUpLFxuICAgICAgICAgICAgcnJwV2l0aFRheDoge1xuICAgICAgICAgICAgICAgICRkaXY6ICQoJy5ycnAtcHJpY2UtLXdpdGhUYXgnLCAkc2NvcGUpLFxuICAgICAgICAgICAgICAgICRzcGFuOiAkKCdbZGF0YS1wcm9kdWN0LXJycC13aXRoLXRheF0nLCAkc2NvcGUpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJycFdpdGhvdXRUYXg6IHtcbiAgICAgICAgICAgICAgICAkZGl2OiAkKCcucnJwLXByaWNlLS13aXRob3V0VGF4JywgJHNjb3BlKSxcbiAgICAgICAgICAgICAgICAkc3BhbjogJCgnW2RhdGEtcHJvZHVjdC1ycnAtcHJpY2Utd2l0aG91dC10YXhdJywgJHNjb3BlKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBub25TYWxlV2l0aFRheDoge1xuICAgICAgICAgICAgICAgICRkaXY6ICQoJy5ub24tc2FsZS1wcmljZS0td2l0aFRheCcsICRzY29wZSksXG4gICAgICAgICAgICAgICAgJHNwYW46ICQoJ1tkYXRhLXByb2R1Y3Qtbm9uLXNhbGUtcHJpY2Utd2l0aC10YXhdJywgJHNjb3BlKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBub25TYWxlV2l0aG91dFRheDoge1xuICAgICAgICAgICAgICAgICRkaXY6ICQoJy5ub24tc2FsZS1wcmljZS0td2l0aG91dFRheCcsICRzY29wZSksXG4gICAgICAgICAgICAgICAgJHNwYW46ICQoJ1tkYXRhLXByb2R1Y3Qtbm9uLXNhbGUtcHJpY2Utd2l0aG91dC10YXhdJywgJHNjb3BlKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwcmljZVNhdmVkOiB7XG4gICAgICAgICAgICAgICAgJGRpdjogJCgnLnByaWNlLXNlY3Rpb24tLXNhdmluZycsICRzY29wZSksXG4gICAgICAgICAgICAgICAgJHNwYW46ICQoJ1tkYXRhLXByb2R1Y3QtcHJpY2Utc2F2ZWRdJywgJHNjb3BlKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwcmljZU5vd0xhYmVsOiB7XG4gICAgICAgICAgICAgICAgJHNwYW46ICQoJy5wcmljZS1ub3ctbGFiZWwnLCAkc2NvcGUpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHByaWNlTGFiZWw6IHtcbiAgICAgICAgICAgICAgICAkc3BhbjogJCgnLnByaWNlLWxhYmVsJywgJHNjb3BlKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAkd2VpZ2h0OiAkKCcucHJvZHVjdFZpZXctaW5mbyBbZGF0YS1wcm9kdWN0LXdlaWdodF0nLCAkc2NvcGUpLFxuICAgICAgICAgICAgJGluY3JlbWVudHM6ICQoJy5mb3JtLWZpZWxkLS1pbmNyZW1lbnRzIDppbnB1dCcsICRzY29wZSksXG4gICAgICAgICAgICAkYWRkVG9DYXJ0OiAkKCcjZm9ybS1hY3Rpb24tYWRkVG9DYXJ0JywgJHNjb3BlKSxcbiAgICAgICAgICAgICRzdG9ja0xlZnQ6ICQoJ1tkYXRhLXN0b2NrLWxlZnRdJywgJHNjb3BlKSxcbiAgICAgICAgICAgICRzdG9ja0xlZnRXcmFwcGVyOiAkKCcucHJvZHVjdFZpZXctb3B0aW9uc1N0b2NrJywgJHNjb3BlKSxcbiAgICAgICAgICAgICRzdG9ja1Byb2dyZXNzOiAkKCcuaGFsby1ob3RTdG9jay1wcm9ncmVzcycsICRzY29wZSksICBcbiAgICAgICAgICAgICR3aXNobGlzdFZhcmlhdGlvbjogJCgnW2RhdGEtd2lzaGxpc3QtYWRkXSBbbmFtZT1cInZhcmlhdGlvbl9pZFwiXScsICRzY29wZSksXG4gICAgICAgICAgICBzdG9jazoge1xuICAgICAgICAgICAgICAgICRjb250YWluZXI6ICQoJy5mb3JtLWZpZWxkLS1zdG9jaycsICRzY29wZSksXG4gICAgICAgICAgICAgICAgJGlucHV0OiAkKCdbZGF0YS1wcm9kdWN0LXN0b2NrXScsICRzY29wZSksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2t1OiB7XG4gICAgICAgICAgICAgICAgJGxhYmVsOiAkKCcuc2t1LWxhYmVsJywgJHNjb3BlKSxcbiAgICAgICAgICAgICAgICAkdmFsdWU6ICQoJ1tkYXRhLXByb2R1Y3Qtc2t1XScsICRzY29wZSksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdXBjOiB7XG4gICAgICAgICAgICAgICAgJGxhYmVsOiAkKCcudXBjLWxhYmVsJywgJHNjb3BlKSxcbiAgICAgICAgICAgICAgICAkdmFsdWU6ICQoJ1tkYXRhLXByb2R1Y3QtdXBjXScsICRzY29wZSksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcXVhbnRpdHk6IHtcbiAgICAgICAgICAgICAgICAkdGV4dDogJCgnLmluY3JlbWVudFRvdGFsJywgJHNjb3BlKSxcbiAgICAgICAgICAgICAgICAkaW5wdXQ6ICQoJ1tuYW1lPXF0eVxcXFxbXFxcXF1dJywgJHNjb3BlKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAkYnVsa1ByaWNpbmc6ICQoJy5wcm9kdWN0Vmlldy1pbmZvLWJ1bGtQcmljaW5nJywgJHNjb3BlKSxcbiAgICAgICAgICAgICR3YWxsZXRCdXR0b25zOiAkKCdbZGF0YS1hZGQtdG8tY2FydC13YWxsZXQtYnV0dG9uc10nLCAkc2NvcGUpLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhpZGUgdGhlIHByaWNpbmcgZWxlbWVudHMgdGhhdCB3aWxsIHNob3cgdXAgb25seSB3aGVuIHRoZSBwcmljZSBleGlzdHMgaW4gQVBJXG4gICAgICogQHBhcmFtIHZpZXdNb2RlbFxuICAgICAqL1xuICAgIGNsZWFyUHJpY2luZ05vdEZvdW5kKHZpZXdNb2RlbCkge1xuICAgICAgICB2aWV3TW9kZWwucnJwV2l0aFRheC4kZGl2LmhpZGUoKTtcbiAgICAgICAgdmlld01vZGVsLnJycFdpdGhvdXRUYXguJGRpdi5oaWRlKCk7XG4gICAgICAgIHZpZXdNb2RlbC5ub25TYWxlV2l0aFRheC4kZGl2LmhpZGUoKTtcbiAgICAgICAgdmlld01vZGVsLm5vblNhbGVXaXRob3V0VGF4LiRkaXYuaGlkZSgpO1xuICAgICAgICB2aWV3TW9kZWwucHJpY2VTYXZlZC4kZGl2LmhpZGUoKTtcbiAgICAgICAgdmlld01vZGVsLnByaWNlTm93TGFiZWwuJHNwYW4uaGlkZSgpO1xuICAgICAgICB2aWV3TW9kZWwucHJpY2VMYWJlbC4kc3Bhbi5oaWRlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSB2aWV3IG9mIHByaWNlLCBtZXNzYWdlcywgU0tVIGFuZCBzdG9jayBvcHRpb25zIHdoZW4gYSBwcm9kdWN0IG9wdGlvbiBjaGFuZ2VzXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBkYXRhIFByb2R1Y3QgYXR0cmlidXRlIGRhdGFcbiAgICAgKi9cbiAgICB1cGRhdGVWaWV3KGRhdGEsIGNvbnRlbnQgPSBudWxsKSB7XG4gICAgICAgIGNvbnN0IHZpZXdNb2RlbCA9IHRoaXMuZ2V0Vmlld01vZGVsKHRoaXMuJHNjb3BlKTtcblxuICAgICAgICBpZiAodHlwZW9mIGRhdGEuc3RvY2sgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBpZigoZGF0YS5zdG9jayA8PSBwYXJzZUludCh0aGlzLmNvbnRleHQudGhlbWVTZXR0aW5ncy5oYWxvX3N0b2NrX2xldmVsX2xpbWl0KSkgJiYgKGRhdGEuc3RvY2sgPiAwKSkge1xuICAgICAgICAgICAgICAgIHZpZXdNb2RlbC4kc3RvY2tMZWZ0V3JhcHBlci5yZW1vdmVDbGFzcygndS1oaWRkZW5WaXN1YWxseScpO1xuICAgICAgICAgICAgICAgIHZpZXdNb2RlbC4kc3RvY2tQcm9ncmVzcy5yZW1vdmVDbGFzcygndS1oaWRkZW5WaXN1YWxseScpO1xuICAgICAgICAgICAgICAgIHZpZXdNb2RlbC4kc3RvY2tMZWZ0LnRleHQoZGF0YS5zdG9jayk7XG4gICAgICAgICAgICAgICAgdGhpcy5ob3RTdG9jayhkYXRhLnN0b2NrKTtcbiAgICAgICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgICAgICB2aWV3TW9kZWwuJHN0b2NrTGVmdFdyYXBwZXIuYWRkQ2xhc3MoJ3UtaGlkZGVuVmlzdWFsbHknKTtcbiAgICAgICAgICAgICAgICB2aWV3TW9kZWwuJHN0b2NrUHJvZ3Jlc3MuYWRkQ2xhc3MoJ3UtaGlkZGVuVmlzdWFsbHknKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2hvd01lc3NhZ2VCb3goZGF0YS5zdG9ja19tZXNzYWdlIHx8IGRhdGEucHVyY2hhc2luZ19tZXNzYWdlKTtcblxuICAgICAgICBpZiAoZGF0YS5wcmljZSBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQcmljZVZpZXcodmlld01vZGVsLCBkYXRhLnByaWNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkYXRhLndlaWdodCBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICAgICAgdmlld01vZGVsLiR3ZWlnaHQuaHRtbChkYXRhLndlaWdodC5mb3JtYXR0ZWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2V0IHZhcmlhdGlvbl9pZCBpZiBpdCBleGlzdHMgZm9yIGFkZGluZyB0byB3aXNobGlzdFxuICAgICAgICBpZiAoZGF0YS52YXJpYW50SWQpIHtcbiAgICAgICAgICAgIHZpZXdNb2RlbC4kd2lzaGxpc3RWYXJpYXRpb24udmFsKGRhdGEudmFyaWFudElkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIFNLVSBpcyBhdmFpbGFibGVcbiAgICAgICAgaWYgKGRhdGEuc2t1KSB7XG4gICAgICAgICAgICB2aWV3TW9kZWwuc2t1LiR2YWx1ZS50ZXh0KGRhdGEuc2t1KTtcbiAgICAgICAgICAgIHZpZXdNb2RlbC5za3UuJGxhYmVsLnNob3coKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZpZXdNb2RlbC5za3UuJGxhYmVsLmhpZGUoKTtcbiAgICAgICAgICAgIHZpZXdNb2RlbC5za3UuJHZhbHVlLnRleHQoJycpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgVVBDIGlzIGF2YWlsYWJsZVxuICAgICAgICBpZiAoZGF0YS51cGMpIHtcbiAgICAgICAgICAgIHZpZXdNb2RlbC51cGMuJHZhbHVlLnRleHQoZGF0YS51cGMpO1xuICAgICAgICAgICAgdmlld01vZGVsLnVwYy4kbGFiZWwuc2hvdygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmlld01vZGVsLnVwYy4kbGFiZWwuaGlkZSgpO1xuICAgICAgICAgICAgdmlld01vZGVsLnVwYy4kdmFsdWUudGV4dCgnJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBzdG9jayB2aWV3IGlzIG9uIChDUCBzZXR0aW5ncylcbiAgICAgICAgaWYgKHZpZXdNb2RlbC5zdG9jay4kY29udGFpbmVyLmxlbmd0aCAmJiB0eXBlb2YgZGF0YS5zdG9jayA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIC8vIGlmIHRoZSBzdG9jayBjb250YWluZXIgaXMgaGlkZGVuLCBzaG93XG4gICAgICAgICAgICB2aWV3TW9kZWwuc3RvY2suJGNvbnRhaW5lci5yZW1vdmVDbGFzcygndS1oaWRkZW5WaXN1YWxseScpO1xuXG4gICAgICAgICAgICB2aWV3TW9kZWwuc3RvY2suJGlucHV0LnRleHQoZGF0YS5zdG9jayk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2aWV3TW9kZWwuc3RvY2suJGNvbnRhaW5lci5hZGRDbGFzcygndS1oaWRkZW5WaXN1YWxseScpO1xuICAgICAgICAgICAgdmlld01vZGVsLnN0b2NrLiRpbnB1dC50ZXh0KGRhdGEuc3RvY2spO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cGRhdGVEZWZhdWx0QXR0cmlidXRlc0Zvck9PUyhkYXRhKTtcbiAgICAgICAgdGhpcy51cGRhdGVXYWxsZXRCdXR0b25zVmlldyhkYXRhKTtcblxuICAgICAgICAvLyBJZiBCdWxrIFByaWNpbmcgcmVuZGVyZWQgSFRNTCBpcyBhdmFpbGFibGVcbiAgICAgICAgaWYgKGRhdGEuYnVsa19kaXNjb3VudF9yYXRlcyAmJiBjb250ZW50KSB7XG4gICAgICAgICAgICB2aWV3TW9kZWwuJGJ1bGtQcmljaW5nLmh0bWwoY29udGVudCk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIChkYXRhLmJ1bGtfZGlzY291bnRfcmF0ZXMpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdmlld01vZGVsLiRidWxrUHJpY2luZy5odG1sKCcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGFkZFRvQ2FydFdyYXBwZXIgPSAkKCcjYWRkLXRvLWNhcnQtd3JhcHBlcicpO1xuXG4gICAgICAgIGlmIChhZGRUb0NhcnRXcmFwcGVyLmlzKCc6aGlkZGVuJykgJiYgZGF0YS5wdXJjaGFzYWJsZSkge1xuICAgICAgICAgICAgYWRkVG9DYXJ0V3JhcHBlci5zaG93KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdGhlIHZpZXcgb2YgcHJpY2UsIG1lc3NhZ2VzLCBTS1UgYW5kIHN0b2NrIG9wdGlvbnMgd2hlbiBhIHByb2R1Y3Qgb3B0aW9uIGNoYW5nZXNcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGRhdGEgUHJvZHVjdCBhdHRyaWJ1dGUgZGF0YVxuICAgICAqL1xuICAgIHVwZGF0ZVByaWNlVmlldyh2aWV3TW9kZWwsIHByaWNlKSB7XG4gICAgICAgIHRoaXMuY2xlYXJQcmljaW5nTm90Rm91bmQodmlld01vZGVsKTtcblxuICAgICAgICBpZiAocHJpY2Uud2l0aF90YXgpIHtcbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWRQcmljZSA9IHByaWNlLnByaWNlX3JhbmdlID9cbiAgICAgICAgICAgICAgICBgJHtwcmljZS5wcmljZV9yYW5nZS5taW4ud2l0aF90YXguZm9ybWF0dGVkfSAtICR7cHJpY2UucHJpY2VfcmFuZ2UubWF4LndpdGhfdGF4LmZvcm1hdHRlZH1gXG4gICAgICAgICAgICAgICAgOiBwcmljZS53aXRoX3RheC5mb3JtYXR0ZWQ7XG4gICAgICAgICAgICB2aWV3TW9kZWwucHJpY2VMYWJlbC4kc3Bhbi5zaG93KCk7XG4gICAgICAgICAgICB2aWV3TW9kZWwuJHByaWNlV2l0aFRheC5odG1sKHVwZGF0ZWRQcmljZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJpY2Uud2l0aG91dF90YXgpIHtcbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWRQcmljZSA9IHByaWNlLnByaWNlX3JhbmdlID9cbiAgICAgICAgICAgICAgICBgJHtwcmljZS5wcmljZV9yYW5nZS5taW4ud2l0aG91dF90YXguZm9ybWF0dGVkfSAtICR7cHJpY2UucHJpY2VfcmFuZ2UubWF4LndpdGhvdXRfdGF4LmZvcm1hdHRlZH1gXG4gICAgICAgICAgICAgICAgOiBwcmljZS53aXRob3V0X3RheC5mb3JtYXR0ZWQ7XG4gICAgICAgICAgICB2aWV3TW9kZWwucHJpY2VMYWJlbC4kc3Bhbi5zaG93KCk7XG4gICAgICAgICAgICB2aWV3TW9kZWwuJHByaWNlV2l0aG91dFRheC5odG1sKHVwZGF0ZWRQcmljZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJpY2UucnJwX3dpdGhfdGF4KSB7XG4gICAgICAgICAgICB2aWV3TW9kZWwucnJwV2l0aFRheC4kZGl2LnNob3coKTtcbiAgICAgICAgICAgIHZpZXdNb2RlbC5ycnBXaXRoVGF4LiRzcGFuLmh0bWwocHJpY2UucnJwX3dpdGhfdGF4LmZvcm1hdHRlZCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJpY2UucnJwX3dpdGhvdXRfdGF4KSB7XG4gICAgICAgICAgICB2aWV3TW9kZWwucnJwV2l0aG91dFRheC4kZGl2LnNob3coKTtcbiAgICAgICAgICAgIHZpZXdNb2RlbC5ycnBXaXRob3V0VGF4LiRzcGFuLmh0bWwocHJpY2UucnJwX3dpdGhvdXRfdGF4LmZvcm1hdHRlZCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJpY2Uuc2F2ZWQpIHtcbiAgICAgICAgICAgIHZpZXdNb2RlbC5wcmljZVNhdmVkLiRkaXYuc2hvdygpO1xuICAgICAgICAgICAgdmlld01vZGVsLnByaWNlU2F2ZWQuJHNwYW4uaHRtbChwcmljZS5zYXZlZC5mb3JtYXR0ZWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByaWNlLm5vbl9zYWxlX3ByaWNlX3dpdGhfdGF4KSB7XG4gICAgICAgICAgICB2aWV3TW9kZWwucHJpY2VMYWJlbC4kc3Bhbi5oaWRlKCk7XG4gICAgICAgICAgICB2aWV3TW9kZWwubm9uU2FsZVdpdGhUYXguJGRpdi5zaG93KCk7XG4gICAgICAgICAgICB2aWV3TW9kZWwucHJpY2VOb3dMYWJlbC4kc3Bhbi5zaG93KCk7XG4gICAgICAgICAgICB2aWV3TW9kZWwubm9uU2FsZVdpdGhUYXguJHNwYW4uaHRtbChwcmljZS5ub25fc2FsZV9wcmljZV93aXRoX3RheC5mb3JtYXR0ZWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByaWNlLm5vbl9zYWxlX3ByaWNlX3dpdGhvdXRfdGF4KSB7XG4gICAgICAgICAgICB2aWV3TW9kZWwucHJpY2VMYWJlbC4kc3Bhbi5oaWRlKCk7XG4gICAgICAgICAgICB2aWV3TW9kZWwubm9uU2FsZVdpdGhvdXRUYXguJGRpdi5zaG93KCk7XG4gICAgICAgICAgICB2aWV3TW9kZWwucHJpY2VOb3dMYWJlbC4kc3Bhbi5zaG93KCk7XG4gICAgICAgICAgICB2aWV3TW9kZWwubm9uU2FsZVdpdGhvdXRUYXguJHNwYW4uaHRtbChwcmljZS5ub25fc2FsZV9wcmljZV93aXRob3V0X3RheC5mb3JtYXR0ZWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2hvdyBhbiBtZXNzYWdlIGJveCBpZiBhIG1lc3NhZ2UgaXMgcGFzc2VkXG4gICAgICogSGlkZSB0aGUgYm94IGlmIHRoZSBtZXNzYWdlIGlzIGVtcHR5XG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBtZXNzYWdlXG4gICAgICovXG4gICAgc2hvd01lc3NhZ2VCb3gobWVzc2FnZSkge1xuICAgICAgICBjb25zdCAkbWVzc2FnZUJveCA9ICQoJy5wcm9kdWN0QXR0cmlidXRlcy1tZXNzYWdlJyk7XG5cbiAgICAgICAgaWYgKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgICQoJy5hbGVydEJveC1tZXNzYWdlJywgJG1lc3NhZ2VCb3gpLnRleHQobWVzc2FnZSk7XG4gICAgICAgICAgICAkbWVzc2FnZUJveC5zaG93KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkbWVzc2FnZUJveC5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVEZWZhdWx0QXR0cmlidXRlc0Zvck9PUyhkYXRhKSB7XG4gICAgICAgIGNvbnN0IHZpZXdNb2RlbCA9IHRoaXMuZ2V0Vmlld01vZGVsKHRoaXMuJHNjb3BlKTtcbiAgICAgICAgaWYgKCFkYXRhLnB1cmNoYXNhYmxlIHx8ICFkYXRhLmluc3RvY2spIHtcbiAgICAgICAgICAgIHZpZXdNb2RlbC4kYWRkVG9DYXJ0LnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgICAgICB2aWV3TW9kZWwuJGluY3JlbWVudHMucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZpZXdNb2RlbC4kYWRkVG9DYXJ0LnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgICAgICAgdmlld01vZGVsLiRpbmNyZW1lbnRzLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlV2FsbGV0QnV0dG9uc1ZpZXcoZGF0YSkge1xuICAgICAgICB0aGlzLnRvZ2dsZVdhbGxldEJ1dHRvbnNWaXNpYmlsaXR5KGRhdGEucHVyY2hhc2FibGUgJiYgZGF0YS5pbnN0b2NrKTtcbiAgICB9XG5cbiAgICB0b2dnbGVXYWxsZXRCdXR0b25zVmlzaWJpbGl0eShzaG91bGRTaG93KSB7XG4gICAgICAgIGNvbnN0IHZpZXdNb2RlbCA9IHRoaXMuZ2V0Vmlld01vZGVsKHRoaXMuJHNjb3BlKTtcblxuICAgICAgICBpZiAoc2hvdWxkU2hvdykge1xuICAgICAgICAgICAgdmlld01vZGVsLiR3YWxsZXRCdXR0b25zLnNob3coKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZpZXdNb2RlbC4kd2FsbGV0QnV0dG9ucy5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlbmFibGVBdHRyaWJ1dGUoJGF0dHJpYnV0ZSwgYmVoYXZpb3IsIG91dE9mU3RvY2tNZXNzYWdlKSB7XG4gICAgICAgIGlmICh0aGlzLmdldEF0dHJpYnV0ZVR5cGUoJGF0dHJpYnV0ZSkgPT09ICdzZXQtc2VsZWN0Jykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW5hYmxlU2VsZWN0T3B0aW9uQXR0cmlidXRlKCRhdHRyaWJ1dGUsIGJlaGF2aW9yLCBvdXRPZlN0b2NrTWVzc2FnZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYmVoYXZpb3IgPT09ICdoaWRlX29wdGlvbicpIHtcbiAgICAgICAgICAgICRhdHRyaWJ1dGUuc2hvdygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJGF0dHJpYnV0ZS5yZW1vdmVDbGFzcygndW5hdmFpbGFibGUnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRpc2FibGVBdHRyaWJ1dGUoJGF0dHJpYnV0ZSwgYmVoYXZpb3IsIG91dE9mU3RvY2tNZXNzYWdlKSB7XG4gICAgICAgIGlmICh0aGlzLmdldEF0dHJpYnV0ZVR5cGUoJGF0dHJpYnV0ZSkgPT09ICdzZXQtc2VsZWN0Jykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZVNlbGVjdE9wdGlvbkF0dHJpYnV0ZSgkYXR0cmlidXRlLCBiZWhhdmlvciwgb3V0T2ZTdG9ja01lc3NhZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGJlaGF2aW9yID09PSAnaGlkZV9vcHRpb24nKSB7XG4gICAgICAgICAgICAkYXR0cmlidXRlLmhpZGUoMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkYXR0cmlidXRlLmFkZENsYXNzKCd1bmF2YWlsYWJsZScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0QXR0cmlidXRlVHlwZSgkYXR0cmlidXRlKSB7XG4gICAgICAgIGNvbnN0ICRwYXJlbnQgPSAkYXR0cmlidXRlLmNsb3Nlc3QoJ1tkYXRhLXByb2R1Y3QtYXR0cmlidXRlXScpO1xuXG4gICAgICAgIHJldHVybiAkcGFyZW50ID8gJHBhcmVudC5kYXRhKCdwcm9kdWN0QXR0cmlidXRlJykgOiBudWxsO1xuICAgIH1cblxuICAgIGRpc2FibGVTZWxlY3RPcHRpb25BdHRyaWJ1dGUoJGF0dHJpYnV0ZSwgYmVoYXZpb3IsIG91dE9mU3RvY2tNZXNzYWdlKSB7XG4gICAgICAgIGNvbnN0ICRzZWxlY3QgPSAkYXR0cmlidXRlLnBhcmVudCgpO1xuXG4gICAgICAgIGlmIChiZWhhdmlvciA9PT0gJ2hpZGVfb3B0aW9uJykge1xuICAgICAgICAgICAgJGF0dHJpYnV0ZS50b2dnbGVPcHRpb24oZmFsc2UpO1xuICAgICAgICAgICAgLy8gSWYgdGhlIGF0dHJpYnV0ZSBpcyB0aGUgc2VsZWN0ZWQgb3B0aW9uIGluIGEgc2VsZWN0IGRyb3Bkb3duLCBzZWxlY3QgdGhlIGZpcnN0IG9wdGlvbiAoTUVSQy02MzkpXG4gICAgICAgICAgICBpZiAoJHNlbGVjdC52YWwoKSA9PT0gJGF0dHJpYnV0ZS5hdHRyKCd2YWx1ZScpKSB7XG4gICAgICAgICAgICAgICAgJHNlbGVjdFswXS5zZWxlY3RlZEluZGV4ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRhdHRyaWJ1dGUuaHRtbCgkYXR0cmlidXRlLmh0bWwoKS5yZXBsYWNlKG91dE9mU3RvY2tNZXNzYWdlLCAnJykgKyBvdXRPZlN0b2NrTWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlbmFibGVTZWxlY3RPcHRpb25BdHRyaWJ1dGUoJGF0dHJpYnV0ZSwgYmVoYXZpb3IsIG91dE9mU3RvY2tNZXNzYWdlKSB7XG4gICAgICAgIGlmIChiZWhhdmlvciA9PT0gJ2hpZGVfb3B0aW9uJykge1xuICAgICAgICAgICAgJGF0dHJpYnV0ZS50b2dnbGVPcHRpb24odHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkYXR0cmlidXRlLmh0bWwoJGF0dHJpYnV0ZS5odG1sKCkucmVwbGFjZShvdXRPZlN0b2NrTWVzc2FnZSwgJycpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhvdFN0b2NrKGludmVudG9yeVF1YW50aXR5KSB7XG4gICAgICAgIGNvbnN0IHByb2R1Y3RWaWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2R1Y3RWaWV3Jyk7XG4gICAgICAgIGNvbnN0IGhvdFN0b2NrID0gcHJvZHVjdFZpZXcucXVlcnlTZWxlY3RvcignLnByb2R1Y3RWaWV3LWhvdFN0b2NrJyk7XG4gICAgICAgIGNvbnN0IHN0b2NrQ3VycmVudCA9IHByb2R1Y3RWaWV3LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWN1cnJlbnQtaW52ZW50b3J5XScpO1xuICAgICAgICBpZihob3RTdG9jaykge1xuICAgICAgICAgICAgbGV0IG1heFN0b2NrID0gcGFyc2VGbG9hdChob3RTdG9jay5kYXRhc2V0LmhvdFN0b2NrKTtcblxuICAgICAgICAgICAgaWYoc3RvY2tDdXJyZW50KXtcbiAgICAgICAgICAgICAgICBpZihpbnZlbnRvcnlRdWFudGl0eSA+IDAgJiYgaW52ZW50b3J5UXVhbnRpdHkgPD0gbWF4U3RvY2spe1xuICAgICAgICAgICAgICAgICAgICBob3RTdG9jay5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdFZpZXctc3RvY2snKS5jbGFzc0xpc3QucmVtb3ZlKCd1LWhpZGRlblZpc3VhbGx5Jyk7XG4gICAgICAgICAgICAgICAgICAgIGhvdFN0b2NrLnF1ZXJ5U2VsZWN0b3IoJy5oYWxvLWhvdFN0b2NrLXByb2dyZXNzJykuY2xhc3NMaXN0LnJlbW92ZSgndS1oaWRkZW5WaXN1YWxseScpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGhvdFN0b2NrLnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0Vmlldy1zdG9jaycpLmNsYXNzTGlzdC5hZGQoJ3UtaGlkZGVuVmlzdWFsbHknKTtcbiAgICAgICAgICAgICAgICAgICAgaG90U3RvY2sucXVlcnlTZWxlY3RvcignLmhhbG8taG90U3RvY2stcHJvZ3Jlc3MnKS5jbGFzc0xpc3QuYWRkKCd1LWhpZGRlblZpc3VhbGx5Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBpbnZlblByb2dyZXNzID0gaW52ZW50b3J5UXVhbnRpdHkgLyBtYXhTdG9jayAqIDEwMCxcbiAgICAgICAgICAgICAgICAgIGhvdFN0b2NrUHJvZ3Jlc3NJdGVtID0gaG90U3RvY2sucXVlcnlTZWxlY3RvcignLmhhbG8taG90U3RvY2stcHJvZ3Jlc3MtaXRlbScpO1xuICAgICAgICAgICAgaG90U3RvY2tQcm9ncmVzc0l0ZW0uc3R5bGUud2lkdGggPSBgJHtpbnZlblByb2dyZXNzfSVgO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiY29uc3QgY2hhbmdlV2lzaGxpc3RQYWdpbmF0aW9uTGlua3MgPSAod2lzaGxpc3RVcmwsIC4uLnBhZ2luYXRpb25JdGVtcykgPT4gJC5lYWNoKHBhZ2luYXRpb25JdGVtcywgKF8sICRpdGVtKSA9PiB7XG4gICAgY29uc3QgcGFnaW5hdGlvbkxpbmsgPSAkaXRlbS5jaGlsZHJlbignLnBhZ2luYXRpb24tbGluaycpO1xuXG4gICAgaWYgKCRpdGVtLmxlbmd0aCAmJiAhcGFnaW5hdGlvbkxpbmsuYXR0cignaHJlZicpLmluY2x1ZGVzKCdwYWdlPScpKSB7XG4gICAgICAgIGNvbnN0IHBhZ2VOdW1iZXIgPSBwYWdpbmF0aW9uTGluay5hdHRyKCdocmVmJyk7XG4gICAgICAgIHBhZ2luYXRpb25MaW5rLmF0dHIoJ2hyZWYnLCBgJHt3aXNobGlzdFVybH1wYWdlPSR7cGFnZU51bWJlcn1gKTtcbiAgICB9XG59KTtcblxuLyoqXG4gKiBoZWxwcyB0byB3aXRoZHJhdyBkaWZmZXJlbmNlcyBpbiBzdHJ1Y3R1cmVzIGFyb3VuZCB0aGUgc3RlbmNpbCByZXNvdXJjZSBwYWdpbmF0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCB3aXNobGlzdFBhZ2luYXRvckhlbHBlciA9ICgpID0+IHtcbiAgICBjb25zdCAkcGFnaW5hdGlvbkxpc3QgPSAkKCcucGFnaW5hdGlvbi1saXN0Jyk7XG5cbiAgICBpZiAoISRwYWdpbmF0aW9uTGlzdC5sZW5ndGgpIHJldHVybjtcblxuICAgIGNvbnN0ICRuZXh0SXRlbSA9ICQoJy5wYWdpbmF0aW9uLWl0ZW0tLW5leHQnLCAkcGFnaW5hdGlvbkxpc3QpO1xuICAgIGNvbnN0ICRwcmV2SXRlbSA9ICQoJy5wYWdpbmF0aW9uLWl0ZW0tLXByZXZpb3VzJywgJHBhZ2luYXRpb25MaXN0KTtcbiAgICBjb25zdCBjdXJyZW50SHJlZiA9ICQoJ1tkYXRhLXBhZ2luYXRpb24tY3VycmVudC1wYWdlLWxpbmtdJykuYXR0cignaHJlZicpO1xuICAgIGNvbnN0IHBhcnRpYWxQYWdpbmF0aW9uVXJsID0gY3VycmVudEhyZWYuc3BsaXQoJ3BhZ2U9Jykuc2hpZnQoKTtcblxuICAgIGNoYW5nZVdpc2hsaXN0UGFnaW5hdGlvbkxpbmtzKHBhcnRpYWxQYWdpbmF0aW9uVXJsLCAkcHJldkl0ZW0sICRuZXh0SXRlbSk7XG59O1xuIiwiaW1wb3J0ICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24vZm91bmRhdGlvbic7XG5pbXBvcnQgJ2ZvdW5kYXRpb24tc2l0ZXMvanMvZm91bmRhdGlvbi9mb3VuZGF0aW9uLnJldmVhbCc7XG5pbXBvcnQgbm9kIGZyb20gJy4vY29tbW9uL25vZCc7XG5pbXBvcnQgUGFnZU1hbmFnZXIgZnJvbSAnLi9wYWdlLW1hbmFnZXInO1xuaW1wb3J0IHsgd2lzaGxpc3RQYWdpbmF0b3JIZWxwZXIgfSBmcm9tICcuL2NvbW1vbi91dGlscy9wYWdpbmF0aW9uLXV0aWxzJztcbmltcG9ydCB7IGFubm91bmNlSW5wdXRFcnJvck1lc3NhZ2UgfSBmcm9tICcuL2NvbW1vbi91dGlscy9mb3JtLXV0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2lzaExpc3QgZXh0ZW5kcyBQYWdlTWFuYWdlciB7XG4gICAgY29uc3RydWN0b3IoY29udGV4dCkge1xuICAgICAgICBzdXBlcihjb250ZXh0KTtcblxuICAgICAgICB0aGlzLm9wdGlvbnMgPSB7XG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2FjY291bnQvYWRkLXdpc2hsaXN0JyxcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgY29uZmlybSBib3ggYmVmb3JlIGRlbGV0aW5nIGFsbCB3aXNoIGxpc3RzXG4gICAgICovXG4gICAgd2lzaGxpc3REZWxldGVDb25maXJtKCkge1xuICAgICAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgJ1tkYXRhLXdpc2hsaXN0LWRlbGV0ZV0nLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBjb25maXJtZWQgPSB3aW5kb3cuY29uZmlybSh0aGlzLmNvbnRleHQud2lzaGxpc3REZWxldGUpO1xuXG4gICAgICAgICAgICBpZiAoY29uZmlybWVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyQWRkV2lzaExpc3RWYWxpZGF0aW9uKCRhZGRXaXNobGlzdEZvcm0pIHtcbiAgICAgICAgdGhpcy5hZGRXaXNobGlzdFZhbGlkYXRvciA9IG5vZCh7XG4gICAgICAgICAgICBzdWJtaXQ6ICcud2lzaGxpc3QtZm9ybSBpbnB1dFt0eXBlPVwic3VibWl0XCJdJyxcbiAgICAgICAgICAgIHRhcDogYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hZGRXaXNobGlzdFZhbGlkYXRvci5hZGQoW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnLndpc2hsaXN0LWZvcm0gaW5wdXRbbmFtZT1cIndpc2hsaXN0bmFtZVwiXScsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHZhbC5sZW5ndGggPiAwO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5lbnRlcldpc2hsaXN0TmFtZUVycm9yLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSk7XG5cbiAgICAgICAgJGFkZFdpc2hsaXN0Rm9ybS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgdGhpcy5hZGRXaXNobGlzdFZhbGlkYXRvci5wZXJmb3JtQ2hlY2soKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuYWRkV2lzaGxpc3RWYWxpZGF0b3IuYXJlQWxsKCd2YWxpZCcpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvblJlYWR5KCkge1xuICAgICAgICBjb25zdCAkYWRkV2lzaExpc3RGb3JtID0gJCgnLndpc2hsaXN0LWZvcm0nKTtcblxuICAgICAgICBpZiAoJCgnW2RhdGEtcGFnaW5hdGlvbi13aXNobGlzdF0nKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHdpc2hsaXN0UGFnaW5hdG9ySGVscGVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJGFkZFdpc2hMaXN0Rm9ybS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJBZGRXaXNoTGlzdFZhbGlkYXRpb24oJGFkZFdpc2hMaXN0Rm9ybSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLndpc2hsaXN0RGVsZXRlQ29uZmlybSgpO1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6WyJhcmlhS2V5Q29kZXMiLCJSRVRVUk4iLCJTUEFDRSIsIkxFRlQiLCJVUCIsIlJJR0hUIiwiRE9XTiIsInNldENoZWNrZWRSYWRpb0l0ZW0iLCJpdGVtQ29sbGVjdGlvbiIsIml0ZW1JZHgiLCJlYWNoIiwiaWR4IiwiaXRlbSIsIiRpdGVtIiwiJCIsImF0dHIiLCJwcm9wIiwiZm9jdXMiLCJ0cmlnZ2VyIiwiY2FsY3VsYXRlVGFyZ2V0SXRlbVBvc2l0aW9uIiwibGFzdEl0ZW1JZHgiLCJjdXJyZW50SWR4IiwiaGFuZGxlSXRlbUtleURvd24iLCJlIiwia2V5Q29kZSIsImluZGV4IiwiY3VycmVudFRhcmdldCIsImxhc3RDb2xsZWN0aW9uSXRlbUlkeCIsImxlbmd0aCIsIk9iamVjdCIsInZhbHVlcyIsImluY2x1ZGVzIiwicHJldmVudERlZmF1bHQiLCJzdG9wUHJvcGFnYXRpb24iLCJwcmV2SXRlbUlkeCIsImdldCIsIm5leHRJdGVtSWR4IiwiJGNvbnRhaW5lciIsIml0ZW1TZWxlY3RvciIsIiRpdGVtQ29sbGVjdGlvbiIsImZpbmQiLCJvbiIsIldpc2hsaXN0IiwiaW5pdFJhZGlvT3B0aW9ucyIsIm9wdGlvbnNUeXBlc01hcCIsIklOUFVUX0ZJTEUiLCJJTlBVVF9URVhUIiwiSU5QVVRfTlVNQkVSIiwiSU5QVVRfQ0hFQ0tCT1giLCJURVhUQVJFQSIsIkRBVEUiLCJTRVRfU0VMRUNUIiwiU0VUX1JFQ1RBTkdMRSIsIlNFVF9SQURJTyIsIlNXQVRDSCIsIlBST0RVQ1RfTElTVCIsIm9wdGlvbkNoYW5nZURlY29yYXRvciIsImFyZURlZmF1bHRPdGlvbnNTZXQiLCJfdGhpcyIsImVyciIsInJlc3BvbnNlIiwiYXR0cmlidXRlc0RhdGEiLCJkYXRhIiwiYXR0cmlidXRlc0NvbnRlbnQiLCJjb250ZW50IiwidXBkYXRlUHJvZHVjdEF0dHJpYnV0ZXMiLCJ1cGRhdGVWaWV3IiwidXBkYXRlRGVmYXVsdEF0dHJpYnV0ZXNGb3JPT1MiLCJQcm9kdWN0RGV0YWlsc0Jhc2UiLCIkc2NvcGUiLCJjb250ZXh0IiwiX3RoaXMyIiwiaW5pdFJhZGlvQXR0cmlidXRlcyIsImxvYWQiLCJnZXRUYWJSZXF1ZXN0cyIsIl9fIiwidmFsdWUiLCJ0eXBlIiwiZ2V0QXR0cmlidXRlIiwiX21ha2VQcm9kdWN0VmFyaWFudEFjY2Vzc2libGUiLCJfcHJvdG8iLCJwcm90b3R5cGUiLCJ2YXJpYW50RG9tTm9kZSIsInZhcmlhbnRUeXBlIiwiX3RoaXMzIiwiaSIsInJhZGlvIiwiJHJhZGlvIiwidW5kZWZpbmVkIiwiX3RoaXM0IiwiYmVoYXZpb3IiLCJvdXRfb2Zfc3RvY2tfYmVoYXZpb3IiLCJpblN0b2NrSWRzIiwiaW5fc3RvY2tfYXR0cmlidXRlcyIsIm91dE9mU3RvY2tEZWZhdWx0TWVzc2FnZSIsIm91dE9mU3RvY2tNZXNzYWdlIiwib3V0X29mX3N0b2NrX21lc3NhZ2UiLCJhdHRyaWJ1dGUiLCIkYXR0cmlidXRlIiwiYXR0cklkIiwicGFyc2VJbnQiLCJpbmRleE9mIiwiZW5hYmxlQXR0cmlidXRlIiwiZGlzYWJsZUF0dHJpYnV0ZSIsIndpbmRvdyIsImxvY2F0aW9uIiwiaGFzaCIsIiRhY3RpdmVUYWIiLCJoYXMiLCIkdGFiQ29udGVudCIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJzaWJsaW5ncyIsImdldFZpZXdNb2RlbCIsIiRwcmljZVdpdGhUYXgiLCIkcHJpY2VXaXRob3V0VGF4IiwicnJwV2l0aFRheCIsIiRkaXYiLCIkc3BhbiIsInJycFdpdGhvdXRUYXgiLCJub25TYWxlV2l0aFRheCIsIm5vblNhbGVXaXRob3V0VGF4IiwicHJpY2VTYXZlZCIsInByaWNlTm93TGFiZWwiLCJwcmljZUxhYmVsIiwiJHdlaWdodCIsIiRpbmNyZW1lbnRzIiwiJGFkZFRvQ2FydCIsIiRzdG9ja0xlZnQiLCIkc3RvY2tMZWZ0V3JhcHBlciIsIiRzdG9ja1Byb2dyZXNzIiwiJHdpc2hsaXN0VmFyaWF0aW9uIiwic3RvY2siLCIkaW5wdXQiLCJza3UiLCIkbGFiZWwiLCIkdmFsdWUiLCJ1cGMiLCJxdWFudGl0eSIsIiR0ZXh0IiwiJGJ1bGtQcmljaW5nIiwiJHdhbGxldEJ1dHRvbnMiLCJjbGVhclByaWNpbmdOb3RGb3VuZCIsInZpZXdNb2RlbCIsImhpZGUiLCJ0aGVtZVNldHRpbmdzIiwiaGFsb19zdG9ja19sZXZlbF9saW1pdCIsInRleHQiLCJob3RTdG9jayIsInNob3dNZXNzYWdlQm94Iiwic3RvY2tfbWVzc2FnZSIsInB1cmNoYXNpbmdfbWVzc2FnZSIsInByaWNlIiwidXBkYXRlUHJpY2VWaWV3Iiwid2VpZ2h0IiwiaHRtbCIsImZvcm1hdHRlZCIsInZhcmlhbnRJZCIsInZhbCIsInNob3ciLCJ1cGRhdGVXYWxsZXRCdXR0b25zVmlldyIsImJ1bGtfZGlzY291bnRfcmF0ZXMiLCJhZGRUb0NhcnRXcmFwcGVyIiwiaXMiLCJwdXJjaGFzYWJsZSIsIndpdGhfdGF4IiwidXBkYXRlZFByaWNlIiwicHJpY2VfcmFuZ2UiLCJtaW4iLCJtYXgiLCJ3aXRob3V0X3RheCIsInJycF93aXRoX3RheCIsInJycF93aXRob3V0X3RheCIsInNhdmVkIiwibm9uX3NhbGVfcHJpY2Vfd2l0aF90YXgiLCJub25fc2FsZV9wcmljZV93aXRob3V0X3RheCIsIm1lc3NhZ2UiLCIkbWVzc2FnZUJveCIsImluc3RvY2siLCJ0b2dnbGVXYWxsZXRCdXR0b25zVmlzaWJpbGl0eSIsInNob3VsZFNob3ciLCJnZXRBdHRyaWJ1dGVUeXBlIiwiZW5hYmxlU2VsZWN0T3B0aW9uQXR0cmlidXRlIiwiZGlzYWJsZVNlbGVjdE9wdGlvbkF0dHJpYnV0ZSIsIiRwYXJlbnQiLCJjbG9zZXN0IiwiJHNlbGVjdCIsInBhcmVudCIsInRvZ2dsZU9wdGlvbiIsInNlbGVjdGVkSW5kZXgiLCJyZXBsYWNlIiwiaW52ZW50b3J5UXVhbnRpdHkiLCJwcm9kdWN0VmlldyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInN0b2NrQ3VycmVudCIsIm1heFN0b2NrIiwicGFyc2VGbG9hdCIsImRhdGFzZXQiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJhZGQiLCJpbnZlblByb2dyZXNzIiwiaG90U3RvY2tQcm9ncmVzc0l0ZW0iLCJzdHlsZSIsIndpZHRoIiwiZGVmYXVsdCIsImNoYW5nZVdpc2hsaXN0UGFnaW5hdGlvbkxpbmtzIiwid2lzaGxpc3RVcmwiLCJfbGVuIiwiYXJndW1lbnRzIiwicGFnaW5hdGlvbkl0ZW1zIiwiQXJyYXkiLCJfa2V5IiwiXyIsInBhZ2luYXRpb25MaW5rIiwiY2hpbGRyZW4iLCJwYWdlTnVtYmVyIiwid2lzaGxpc3RQYWdpbmF0b3JIZWxwZXIiLCIkcGFnaW5hdGlvbkxpc3QiLCIkbmV4dEl0ZW0iLCIkcHJldkl0ZW0iLCJjdXJyZW50SHJlZiIsInBhcnRpYWxQYWdpbmF0aW9uVXJsIiwic3BsaXQiLCJzaGlmdCIsIm5vZCIsIlBhZ2VNYW5hZ2VyIiwiYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSIsIldpc2hMaXN0IiwiX1BhZ2VNYW5hZ2VyIiwiY2FsbCIsIm9wdGlvbnMiLCJ0ZW1wbGF0ZSIsIl9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQiLCJfaW5oZXJpdHNMb29zZSIsIndpc2hsaXN0RGVsZXRlQ29uZmlybSIsImV2ZW50IiwiY29uZmlybWVkIiwiY29uZmlybSIsIndpc2hsaXN0RGVsZXRlIiwicmVnaXN0ZXJBZGRXaXNoTGlzdFZhbGlkYXRpb24iLCIkYWRkV2lzaGxpc3RGb3JtIiwiYWRkV2lzaGxpc3RWYWxpZGF0b3IiLCJzdWJtaXQiLCJ0YXAiLCJzZWxlY3RvciIsInZhbGlkYXRlIiwiY2IiLCJyZXN1bHQiLCJlcnJvck1lc3NhZ2UiLCJlbnRlcldpc2hsaXN0TmFtZUVycm9yIiwicGVyZm9ybUNoZWNrIiwiYXJlQWxsIiwib25SZWFkeSIsIiRhZGRXaXNoTGlzdEZvcm0iXSwic291cmNlUm9vdCI6IiJ9
