import PageManager from './page-manager';
import { bind, debounce } from 'lodash';
import checkIsGiftCertValid from './common/gift-certificate-validator';
import { createTranslationDictionary } from './common/utils/translations-utils';
import utils from '@bigcommerce/stencil-utils';
import ShippingEstimator from './cart/shipping-estimator';
import { defaultModal, showAlertModal, ModalEvents } from './global/modal';
import haloQuickEditCart from './halothemes/haloQuickEditCart';
import haloCalculateFreeShipping from './halothemes/haloCalculateFreeShipping';

export default class Cart extends PageManager {
    onReady() {
        this.$modal = null;
        this.$cartPageContent = $('[data-cart]');
        this.$cartContent = $('[data-cart-content]');
        this.$cartMessages = $('[data-cart-status]');
        this.$cartTotals = $('[data-cart-totals]');
        this.$cartAdditionalCheckoutBtns = $('[data-cart-additional-checkout-buttons]');
        this.$overlay = $('[data-cart] .loadingOverlay')
            .hide(); // TODO: temporary until roper pulls in his cart components
        this.$activeCartItemId = null;
        this.$activeCartItemBtnAction = null;

        this.setApplePaySupport();
        this.bindEvents();

        haloCalculateFreeShipping(this.context);
        if (this.context.themeSettings.halo_QuickEditCart) {
            haloQuickEditCart(this.context);
        }

        if ($('body').hasClass('page-type-cart')) {
            const $cart = $('[data-cart-preview]');

            $cart.on('click', event => {
                event.preventDefault();

                const cartElement = document.querySelector('[data-cart]');
                const cartPosition = cartElement.getBoundingClientRect().top + window.pageYOffset;

                window.scrollTo({
                    top: cartPosition,
                    behavior: 'smooth'
                });
            });
        }
    }

    setApplePaySupport() {
        if (window.ApplePaySession) {
            this.$cartPageContent.addClass('apple-pay-supported');
        }
    }

    cartUpdate($target) {
        const itemId = $target.data('cartItemid');
        this.$activeCartItemId = itemId;
        this.$activeCartItemBtnAction = $target.data('action');

        const $el = $(`#qty-${itemId}`);
        const oldQty = parseInt($el.val(), 10);
        const maxQty = parseInt($el.data('quantityMax'), 10);
        const minQty = parseInt($el.data('quantityMin'), 10);
        const minError = $el.data('quantityMinError');
        const maxError = $el.data('quantityMaxError');
        const newQty = $target.data('action') === 'inc' ? oldQty + 1 : oldQty - 1;
        // Does not quality for min/max quantity
        if (newQty < minQty) {
            return showAlertModal(minError);
        } else if (maxQty > 0 && newQty > maxQty) {
            return showAlertModal(maxError);
        }

        this.$overlay.show();

        utils.api.cart.itemUpdate(itemId, newQty, (err, response) => {
            this.$overlay.hide();

            if (response.data.status === 'succeed') {
                // if the quantity is changed "1" from "0", we have to remove the row.
                const remove = (newQty === 0);

                this.refreshContent(remove);
            } else {
                $el.val(oldQty);
                showAlertModal(response.data.errors.join('\n'));
            }
        });
    }

    cartUpdateQtyTextChange($target, preVal = null) {
        const itemId = $target.data('cartItemid');
        const $el = $(`#qty-${itemId}`);
        const maxQty = parseInt($el.data('quantityMax'), 10);
        const minQty = parseInt($el.data('quantityMin'), 10);
        const oldQty = preVal !== null ? preVal : minQty;
        const minError = $el.data('quantityMinError');
        const maxError = $el.data('quantityMaxError');
        const newQty = parseInt(Number($el.val()), 10);
        let invalidEntry;

        // Does not quality for min/max quantity
        if (!Number.isInteger(newQty)) {
            invalidEntry = $el.val();
            $el.val(oldQty);
            return showAlertModal(this.context.invalidEntryMessage.replace('[ENTRY]', invalidEntry));
        } else if (newQty < minQty) {
            $el.val(oldQty);
            return showAlertModal(minError);
        } else if (maxQty > 0 && newQty > maxQty) {
            $el.val(oldQty);
            return showAlertModal(maxError);
        }

        this.$overlay.show();
        utils.api.cart.itemUpdate(itemId, newQty, (err, response) => {
            this.$overlay.hide();

            if (response.data.status === 'succeed') {
                // if the quantity is changed "1" from "0", we have to remove the row.
                const remove = (newQty === 0);

                this.refreshContent(remove);
            } else {
                $el.val(oldQty);

                return showAlertModal(response.data.errors.join('\n'));
            }
        });
    }

    cartRemoveItem(itemId) {
        this.$overlay.show();
        utils.api.cart.itemRemove(itemId, (err, response) => {
            if (response.data.status === 'succeed') {
                this.refreshContent(true);
            } else {
                this.$overlay.hide();
                showAlertModal(response.data.errors.join('\n'));
            }
        });
    }

    refreshContent(remove) {
        const $cartItemsRows = $('[data-item-row]', this.$cartContent);
        const $cartPageTitle = $('[data-cart-page-title]');
        const options = {
            template: {
                content: 'cart/content',
                totals: 'cart/totals',
                pageTitle: 'cart/page-title',
                statusMessages: 'cart/status-messages',
                additionalCheckoutButtons: 'cart/additional-checkout-buttons',
            },
        };

        this.$overlay.show();

        // Remove last item from cart? Reload
        if (remove && $cartItemsRows.length === 1) {
            return window.location.reload();
        }

        utils.api.cart.getContent(options, (err, response) => {
            this.$cartContent.html(response.content);
            this.$cartTotals.html(response.totals);
            this.$cartMessages.html(response.statusMessages);
            this.$cartAdditionalCheckoutBtns.html(response.additionalCheckoutButtons);

            $cartPageTitle.replaceWith(response.pageTitle);

            const quantity = $('[data-cart-quantity]', this.$cartContent).data('cartQuantity') || 0;

            if (!quantity) {
                return window.location.reload();
            }

            this.bindEvents();
            this.$overlay.hide();

            $('body').trigger('cart-quantity-update', quantity);

            $(`[data-cart-itemid='${this.$activeCartItemId}']`, this.$cartContent)
                .filter(`[data-action='${this.$activeCartItemBtnAction}']`)
                .trigger('focus');
        });

        haloCalculateFreeShipping(this.context);
    }

    bindCartEvents() {
        const debounceTimeout = 400;
        const cartUpdate = bind(debounce(this.cartUpdate, debounceTimeout), this);
        const cartUpdateQtyTextChange = bind(debounce(this.cartUpdateQtyTextChange, debounceTimeout), this);
        const cartRemoveItem = bind(debounce(this.cartRemoveItem, debounceTimeout), this);
        let preVal;

        // cart update
        $('[data-cart-update]', this.$cartContent).on('click', event => {
            const $target = $(event.currentTarget);

            event.preventDefault();

            // update cart quantity
            cartUpdate($target);
        });

        // cart qty manually updates
        $('.cart-item-qty-input', this.$cartContent).on('focus', function onQtyFocus() {
            preVal = this.value;
        }).change(event => {
            const $target = $(event.currentTarget);
            event.preventDefault();

            // update cart quantity
            cartUpdateQtyTextChange($target, preVal);
        });

        $('.cart-remove', this.$cartContent).on('click', event => {
            const itemId = $(event.currentTarget).data('cartItemid');
            const string = $(event.currentTarget).data('confirmDelete');
            showAlertModal(string, {
                icon: 'warning',
                showCancelButton: true,
                onConfirm: () => {
                    // remove item from cart
                    cartRemoveItem(itemId);
                },
            });
            event.preventDefault();
        });
    }

    bindPromoCodeEvents() {
        const $couponContainer = $('.coupon-code');
        const $couponForm = $('.coupon-form');
        const $codeInput = $('[name="couponcode"]', $couponForm);

        $('.coupon-code-add').on('click', event => {
            event.preventDefault();

            $(event.currentTarget).hide();
            $couponContainer.show();
            $couponContainer.attr('aria-hidden', false);
            $('.coupon-code-cancel').show();
            $codeInput.trigger('focus');
        });

        $('.coupon-code-cancel').on('click', event => {
            event.preventDefault();

            $couponContainer.hide();
            $couponContainer.attr('aria-hidden', true);
            $('.coupon-code-cancel').hide();
            $('.coupon-code-add').show();
        });

        $couponForm.on('submit', event => {
            const code = $codeInput.val();

            event.preventDefault();

            // Empty code
            if (!code) {
                return showAlertModal($codeInput.data('error'));
            }

            utils.api.cart.applyCode(code, (err, response) => {
                if (response.data.status === 'success') {
                    this.refreshContent();
                } else {
                    showAlertModal(response.data.errors.join('\n'));
                }
            });
        });
    }

    bindGiftCertificateEvents() {
        const $certContainer = $('.gift-certificate-code');
        const $certForm = $('.cart-gift-certificate-form');
        const $certInput = $('[name="certcode"]', $certForm);

        $('.gift-certificate-add').on('click', event => {
            event.preventDefault();
            $(event.currentTarget).toggle();
            $certContainer.toggle();
            $certContainer.attr('aria-hidden', false);
            $('.gift-certificate-cancel').toggle();
        });

        $('.gift-certificate-cancel').on('click', event => {
            event.preventDefault();
            $certContainer.toggle();
            $certContainer.attr('aria-hidden', true);
            $('.gift-certificate-add').toggle();
            $('.gift-certificate-cancel').toggle();
        });

        $certForm.on('submit', event => {
            const code = $certInput.val();

            event.preventDefault();

            if (!checkIsGiftCertValid(code)) {
                const validationDictionary = createTranslationDictionary(this.context);
                return showAlertModal(validationDictionary.invalid_gift_certificate);
            }

            utils.api.cart.applyGiftCertificate(code, (err, resp) => {
                if (resp.data.status === 'success') {
                    this.refreshContent();
                } else {
                    showAlertModal(resp.data.errors.join('\n'));
                }
            });
        });
    }

    bindGiftWrappingEvents() {
        const modal = defaultModal();

        $('[data-item-giftwrap]').on('click', event => {
            const itemId = $(event.currentTarget).data('itemGiftwrap');
            const options = {
                template: 'cart/modals/gift-wrapping-form',
            };

            event.preventDefault();

            modal.open();

            utils.api.cart.getItemGiftWrappingOptions(itemId, options, (err, response) => {
                modal.updateContent(response.content);

                this.bindGiftWrappingForm();
            });
        });
    }

    bindGiftWrappingForm() {
        $('.giftWrapping-select').on('change', event => {
            const $select = $(event.currentTarget);
            const id = $select.val();
            const index = $select.data('index');

            if (!id) {
                return;
            }

            const allowMessage = $select.find(`option[value=${id}]`).data('allowMessage');

            $(`.giftWrapping-image-${index}`).hide();
            $(`#giftWrapping-image-${index}-${id}`).show();

            if (allowMessage) {
                $(`#giftWrapping-message-${index}`).show();
            } else {
                $(`#giftWrapping-message-${index}`).hide();
            }
        });

        $('.giftWrapping-select').trigger('change');

        function toggleViews() {
            const value = $('input:radio[name ="giftwraptype"]:checked').val();
            const $singleForm = $('.giftWrapping-single');
            const $multiForm = $('.giftWrapping-multiple');

            if (value === 'same') {
                $singleForm.show();
                $multiForm.hide();
            } else {
                $singleForm.hide();
                $multiForm.show();
            }
        }

        $('[name="giftwraptype"]').on('click', toggleViews);

        toggleViews();
    }

    bindEvents() {
        this.bindCartEvents();
        this.bindPromoCodeEvents();
        this.bindGiftWrappingEvents();
        this.bindGiftCertificateEvents();

        // initiate shipping estimator module
        const shippingErrorMessages = {
            country: this.context.shippingCountryErrorMessage,
            province: this.context.shippingProvinceErrorMessage,
        };
        this.shippingEstimator = new ShippingEstimator($('[data-shipping-estimator]'), shippingErrorMessages);
    }
}
