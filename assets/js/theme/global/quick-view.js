import 'foundation-sites/js/foundation/foundation';
import 'foundation-sites/js/foundation/foundation.dropdown';
import utils from '@bigcommerce/stencil-utils';
import Review from '../product/reviews';
import ProductDetails from '../common/product-details';
import { defaultModal, ModalEvents } from './modal';
import haloSwiperProductImage from '../halothemes/haloSwiperProductImage';
import haloQuickAddWishlist from '../halothemes/haloQuickAddWishlist';

export default function (context) {
    const modal = defaultModal();

    $('body').on('click', '.quickview', event => {
        event.preventDefault();

        const productId = $(event.currentTarget).data('productId');
        const handleDropdownExpand = ({ currentTarget }) => {
            const $dropdownMenu = $(currentTarget);
            const dropdownBtnHeight = $dropdownMenu.prev().outerHeight();

            $dropdownMenu.css('top', dropdownBtnHeight);

            return modal.$modal.one(ModalEvents.close, () => $dropdownMenu.off('opened.fndtn.dropdown', handleDropdownExpand));
        };

        modal.open({ size: 'large' });
        document.querySelector('body').classList.add('has-activeQuickViewModal')

        utils.api.product.getById(productId, { template: 'products/quick-view' }, (err, response) => {
            if (err) return;

            const productPage = document.querySelector('body.page-type-product');
            let renderHTML;

            if(productPage) {
                let content = response;

                const parser = new DOMParser();
                const html = parser.parseFromString(content, 'text/html');

                const walletContent = html.querySelectorAll('.add-to-cart-wallet-buttons');

                walletContent.forEach(element => {
                    element.textContent = '';
                });

                renderHTML = html.documentElement.innerHTML;
            }  else {
                renderHTML = response;
            }

            modal.updateContent(renderHTML);

            $('#modal .dropdown-menu').on('opened.fndtn.dropdown', handleDropdownExpand);
            modal.$content.find('.quickView').addClass('productView--quickView animated');

            soldProduct(modal.$content.find('.productView-soldProduct'), context);
            countDownProduct(modal.$content.find('.productView-countDown'));
            haloQuickAddWishlist(context);
            haloSwiperProductImage();

            /* eslint-disable no-new */
            new Review({ $context: modal.$content });

            return new ProductDetails(modal.$content.find('.quickView'), context);
        });
    });
}

function soldProduct($wrapper, context) {
    if($wrapper.length > 0) {
        var numbersProduct_text = context.themeSettings.product_soldProduct_products,
            numbersHours_text = context.themeSettings.product_soldProduct_hours,
            soldProductText = context.themeSettings.product_soldProduct_text;

        var numbersProductList =  JSON.parse("[" + numbersProduct_text + "]"), 
            numbersProductItem = (Math.floor(Math.random()*numbersProductList.length)),
            numbersHoursList =  JSON.parse("[" + numbersHours_text + "]"),
            numbersHoursItem = (Math.floor(Math.random()*numbersHoursList.length));
     
        $wrapper.html('<svg class="icon d-inline-block v-a-middle"><use xlink:href="#icon-fire"/></svg><span class="text d-inline-block v-a-middle">' + numbersProductList[numbersProductItem] + " " + soldProductText + " " + numbersHoursList[numbersHoursItem] + 'h</span>');
        $wrapper.show();
    }
}

function countDownProduct($wrapper) {
    if($wrapper.length > 0) {
        var countDown = $wrapper.data('countdown'),
            countDownDate = new Date(countDown).getTime(),
            seft = $wrapper;

        var countdownfunction = setInterval(function() {
            var now = new Date().getTime(),
                distance = countDownDate - now;

            if (distance < 0) {
                clearInterval(countdownfunction);
                seft.remove();
            } else {
                var days = Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds = Math.floor((distance % (1000 * 60)) / 1000),
                    strCountDown = '<div class="item"><span class="num">'+days+'</span><span class="text color-secondary f-size-small"> days</span></div>\
                                    <div class="item"><span class="num">'+hours+'</span><span class="text color-secondary f-size-small"> hours</span></div>\
                                    <div class="item"><span class="num">'+minutes+'</span><span class="text color-secondary f-size-small"> mins</span></div>\
                                    <div class="item"><span class="num">'+seconds+'</span><span class="text color-secondary f-size-small"> secs</span></div>';

                seft.html(strCountDown);
            }
        }, 1000);
    }
}
