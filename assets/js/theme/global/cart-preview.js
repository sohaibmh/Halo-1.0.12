import 'foundation-sites/js/foundation/foundation';
import 'foundation-sites/js/foundation/foundation.dropdown';
import utils from '@bigcommerce/stencil-utils';
import { showAlertModal } from './modal';
import ShippingEstimator from '../cart/shipping-estimator';
import haloQuickEditCart from '../halothemes/haloQuickEditCart';
import haloCalculateFreeShipping from '../halothemes/haloCalculateFreeShipping';

export const CartPreviewEvents = {
    close: 'closed.fndtn.dropdown',
    open: 'opened.fndtn.dropdown',
};

export default function (secureBaseUrl, cartId, context) {
    const loadingClass = 'is-loading';
    const $cart = $('[data-cart-preview]');
    const $cartDropdown = $('#halo-cart-sidebar .halo-sidebar-wrapper');
    const $cartLoading = $('<div class="loadingOverlay"></div>');
    const $body = $('body');

    if (window.ApplePaySession) {
        $cartDropdown.addClass('apple-pay-supported');
    }

    if (!$('body').hasClass('page-type-cart')) {
        haloQuickEditCart(context);
    }

    $body.on('cart-quantity-update', (event, quantity) => {
        $cart.attr('aria-label', (_, prevValue) => prevValue.replace(/\d+/, quantity));

        if (!quantity) {
            $cart.addClass('navUser-item--cart__hidden-s');
        } else {
            $cart.removeClass('navUser-item--cart__hidden-s');
        }
        
        $('.cart-quantity')
            .text(quantity)
            .toggleClass('countPill--positive', quantity > 0);
        if (utils.tools.storage.localStorageAvailable()) {
            localStorage.setItem('cart-quantity', quantity);
        }
    });

    $cart.on('click', event => {
        const options = {
            template: 'common/cart-preview',
        };

        event.preventDefault();

        if (!$('.page-type-cart').length) {
            $body.toggleClass('openCartSidebar');
        }

        $cartDropdown
            .addClass(loadingClass)
            .html($cartLoading);
        $cartLoading
            .show();

        utils.api.cart.getContent(options, (err, response) => {
            $cartDropdown
                .removeClass(loadingClass)
                .html(response);
            $cartLoading
                .hide();

            const shippingErrorMessages = {
                country: context.shippingCountryErrorMessage,
                province: context.shippingProvinceErrorMessage,
            };
            const shippingEstimator = new ShippingEstimator($('[data-shipping-estimator]'), shippingErrorMessages);

            haloCalculateFreeShipping(context);
        });
    });

    let quantity = 0;

    if (cartId) {
        // Get existing quantity from localStorage if found
        if (utils.tools.storage.localStorageAvailable()) {
            if (localStorage.getItem('cart-quantity')) {
                quantity = Number(localStorage.getItem('cart-quantity'));
                $body.trigger('cart-quantity-update', quantity);
            }
        }

        // Get updated cart quantity from the Cart API
        const cartQtyPromise = new Promise((resolve, reject) => {
            utils.api.cart.getCartQuantity({ baseUrl: secureBaseUrl, cartId }, (err, qty) => {
                if (err) {
                    // If this appears to be a 404 for the cart ID, set cart quantity to 0
                    if (err === 'Not Found') {
                        resolve(0);
                    } else {
                        reject(err);
                    }
                }
                resolve(qty);
            });
        });

        // If the Cart API gives us a different quantity number, update it
        cartQtyPromise.then(qty => {
            quantity = qty;
            $body.trigger('cart-quantity-update', quantity);
        });
    } else {
        $body.trigger('cart-quantity-update', quantity);
    }

    $(document).on('click', event => {
        if (($(event.target).closest('[data-cart-preview]').length === 0) && ($(event.target).closest('#halo-cart-sidebar').length === 0) && ($(event.target).closest('#modal').length === 0) && ($(event.target).closest('[data-cart-edit-item-remove]').length === 0)){
            $('body').removeClass('openCartSidebar');
        }
    });

    $(document).on('click','.halo-cart-sidebar .halo-sidebar-header .close', (event) => {
        event.preventDefault();

        $('body').removeClass('openCartSidebar');
    });

    $(document).on('click','.previewCart .previewCartItem-remove', (event) => {
        event.preventDefault();
        const itemId = $(event.currentTarget).data('cartItemid');

        cartRemoveItem(itemId);
    });

    $(document).on('focus','.previewCart .form-input--incrementTotal', (event) => {
        const $target = $(event.currentTarget);
        $target.data('preVal', $target.val());
    });

    $(document).on('change','.previewCart .form-input--incrementTotal', (event) => {
        const $target = $(event.currentTarget);
        var preVal= $target.data('preVal');
        event.preventDefault();

        cartUpdateQtyTextChange($target, preVal);
    });

    $(document).on('click','.previewCartItem-qty [data-cart-update]', (event) => {
        const $target = $(event.currentTarget);

        event.preventDefault();

        // update cart quantity
        cartUpdate($target);
    });

    function cartUpdate($target) {
           
        const itemId = $target.data('cart-itemid');
        const $el = $(`#qty-${itemId}`);
        const oldQty = parseInt($el.val(), 10);
        const maxQty = parseInt($el.data('quantityMax'), 10);
        const minQty = parseInt($el.data('quantityMin'), 10);
        const minError = $el.data('quantityMinError');
        const maxError = $el.data('quantityMaxError');
        const newQty = $target.data('action') === 'inc' ? oldQty + 1 : oldQty - 1;
        let invalidEntry;

        // Does not quality for min/max quantity
        if (!newQty) {
            invalidEntry = newQty;
            $el.val(oldQty);
            return showAlertModal(`${invalidEntry} is not a valid entry`);
        } else if (newQty < minQty) {
            return showAlertModal(minError);
        } else if (maxQty > 0 && newQty > maxQty) {
            return showAlertModal(maxError);
        } else {
            utils.api.cart.itemUpdate(itemId, newQty, (err, response) => {
                if (response.data.status === 'succeed') {
                    // if the quantity is changed "1" from "0", we have to remove the row.
                    const remove = (newQty === 0);

                    refreshContent(remove);
                } else {
                    $el.val(oldQty);
                    return showAlertModal(response.data.errors.join('\n'));
                }
            });
        }        
    }

    function cartUpdateQtyTextChange($target, preVal = null) {
        const itemId = $target.data('cart-itemid');
        const $el = $(`#qty-${itemId}`);
        const maxQty = parseInt($el.data('quantityMax'), 10);
        const minQty = parseInt($el.data('quantityMin'), 10);
        const oldQty = preVal !== null ? preVal : minQty;
        const minError = $el.data('quantityMinError');
        const maxError = $el.data('quantityMaxError');
        const newQty = parseInt(Number($el.val()), 10);
        let invalidEntry;

        // Does not quality for min/max quantity
        if (!newQty) {
            invalidEntry = $el.val();
            $el.val(oldQty);
            return showAlertModal(`${invalidEntry} is not a valid entry`);
        } else if (newQty < minQty) {
            $el.val(oldQty);
            return showAlertModal(minError);
        } else if (maxQty > 0 && newQty > maxQty) {
            $el.val(oldQty);
            return showAlertModal(maxError);
        }

        utils.api.cart.itemUpdate(itemId, newQty, (err, response) => {
            if (response.data.status === 'succeed') {
                // if the quantity is changed "1" from "0", we have to remove the row.
                const remove = (newQty === 0);
                refreshContent(remove);
            } else {
                $el.val(oldQty);
                return showAlertModal(response.data.errors.join('\n'));
            }
        });
    }

    function cartRemoveItem(itemId) {
        utils.api.cart.itemRemove(itemId, (err, response) => {
            if (response.data.status === 'succeed') {
                refreshContent(true);
            } else {
                return showAlertModal(response.data.errors.join('\n'));
            }
        });
    }

    function refreshContent(remove) {
        const options = {
            template: 'common/cart-preview',
        };

        $cartDropdown
            .addClass(loadingClass)
            .prepend($cartLoading);
        $cartLoading
            .show();

        utils.api.cart.getContent(options, (err, response) => {
            const productPage = document.querySelector('body.page-type-product');
            let renderHTML;

            if(productPage) {
                let content = response;

                const parser = new DOMParser();
                const html = parser.parseFromString(content, 'text/html');

                const walletContent = html.querySelectorAll('.previewCart-additionalCheckoutButtons');

                walletContent.forEach(element => {
                    element.textContent = '';
                });

                renderHTML = html.documentElement.innerHTML;
            }  else {
                renderHTML = response;
            }

            $cartDropdown
                .removeClass(loadingClass)
                .html(renderHTML);
            $cartLoading
                .hide();

            const quantity = $(response).find('[data-cart-quantity]').data('cartQuantity') || $('[data-cart-quantity]').data('cartQuantity') || 0;

            $body.trigger('cart-quantity-update', quantity);

            const shippingErrorMessages = {
                country: context.shippingCountryErrorMessage,
                province: context.shippingProvinceErrorMessage,
            };
            const shippingEstimator = new ShippingEstimator($('[data-shipping-estimator]'), shippingErrorMessages);

            haloCalculateFreeShipping(context);
        });
    }
}
