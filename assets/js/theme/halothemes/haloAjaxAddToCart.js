import utils from '@bigcommerce/stencil-utils';
import ShippingEstimator from '../cart/shipping-estimator';
import haloCalculateFreeShipping from './haloCalculateFreeShipping';

export default function (context) {
    if(context.themeSettings.haloAjaxAddToCart){
        if(context.themeSettings.haloAddToCartAction !== 'cart'){
            $(document).on('click', '.halo-add-to-cart', (event) => {
                if (window.FormData === undefined) {
                    return;
                }

                const $addToCartBtn = $(event.currentTarget),
                    waitMessage = $addToCartBtn.data('waitMessage'),
                    originalBtnVal = $addToCartBtn.find('span').text(),
                    productId = $addToCartBtn.data('product-id');

                event.preventDefault();

                $addToCartBtn
                    .find('span')
                    .text(waitMessage);
                $addToCartBtn
                    .prop('disabled', true);

                if (productId === 0) {
                    return;
                }

                const formData = new FormData();
                formData.append('product_id', productId);

                utils.api.cart.itemAdd(formData, (err, response) => {
                    const errorMessage = err || response.data.error;

                    $addToCartBtn
                        .find('span')
                        .text(originalBtnVal);
                    $addToCartBtn
                        .prop('disabled', false);

                    if (errorMessage) {
                        const tmp = document.createElement('DIV');
                        tmp.innerHTML = errorMessage;

                        alert(tmp.textContent || tmp.innerText);

                        return;
                    }

                    if (context.themeSettings.haloAddToCartAction === 'sidebar'){
                        const options = {
                            template: 'common/cart-preview'
                        };
                        const loadingClass = 'is-loading';
                        const $body = $('body');
                        const $cartDropdown = $('#halo-cart-sidebar .halo-sidebar-wrapper');
                        const $cartLoading = $('<div class="loadingOverlay"></div>');

                        $body.toggleClass('openCartSidebar');

                        $cartDropdown
                            .addClass(loadingClass)
                            .html($cartLoading);
                        $cartLoading
                            .show();

                        if (window.ApplePaySession) {
                            $cartDropdown.addClass('apple-pay-supported');
                        }

                        utils.api.cart.getContent(options, (err, response) => {
                            $cartDropdown
                                .removeClass(loadingClass)
                                .html(response);
                            $cartLoading
                                .hide();

                            const quantity = $(response).find('[data-cart-quantity]').data('cartQuantity') || 0;

                            $body.trigger('cart-quantity-update', quantity);

                            const shippingErrorMessages = {
                                country: "this.context.shippingCountryErrorMessage",
                                province: "this.context.shippingProvinceErrorMessage",
                            };
                            const shippingEstimator = new ShippingEstimator($('[data-shipping-estimator]'), shippingErrorMessages);

                            haloCalculateFreeShipping(context);
                        });
                    }
                });
            });
        }
    }
}
