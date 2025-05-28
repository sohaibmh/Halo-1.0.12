import utils from '@bigcommerce/stencil-utils';
import Sortable from 'sortablejs';
import PageManager from './page-manager';
import Review from './product/reviews';
import collapsibleFactory from './common/collapsible';
import ProductDetails from './common/product-details';
import videoGallery from './product/video-gallery';
import { classifyForm } from './common/utils/form-utils';
import modalFactory from './global/modal';
import haloSwiperProductImage from './halothemes/haloSwiperProductImage';
import haloBundleProducts from './halothemes/haloBundleProducts';
import haloRecentViewedProducts from './halothemes/haloRecentViewedProducts';
import haloStickyAddToCart from './halothemes/haloStickyAddToCart';

export default class Product extends PageManager {
    constructor(context) {
        super(context);
        this.url = window.location.href;
        this.$reviewLink = $('[data-reveal-id="modal-review-form"]');
        this.$bulkPricingLink = $('[data-reveal-id="modal-bulk-pricing"]');
        this.reviewModal = modalFactory('#modal-review-form')[0];
    }

    onReady() {
        // Listen for foundation modal close events to sanitize URL after review.
        $(document).on('close.fndtn.reveal', () => {
            if (this.url.indexOf('#write_review') !== -1 && typeof window.history.replaceState === 'function') {
                window.history.replaceState(null, document.title, window.location.pathname);
            }
        });

        let validator;

        // Init collapsible
        collapsibleFactory();
        haloSwiperProductImage();
        haloBundleProducts($('.halo-productView'), this.context);

        this.productDetails = new ProductDetails($('.productView'), this.context, window.BCData.product_attributes);
        this.productDetails.setProductVariant();

        if (this.context.themeSettings.halo_stickyAddToCart) {
            haloStickyAddToCart();
            this.productDetails.setProductVariant2();
        }

        videoGallery();

        this.bulkPricingHandler();
        this.videoPopup();
        this.soldProduct($('.productView-soldProduct'));
        this.countDownProduct($('.productView-countDown'));
        this.compareColors();
        this.askAnExpert();
        this.checkTabActive();
        this.checkProduct();

        window.matchMedia('(min-width: 768px)').addEventListener('change', () => {
            this.checkTabActive();
        });

        var isRecentViewedProducts = this.context.themeSettings.prodRecentViewed;
        if (isRecentViewedProducts) {
            haloRecentViewedProducts(this.context);
            this.setRecentViewedProducts();
        }

        const $reviewForm = classifyForm('.writeReview-form');

        if ($reviewForm.length === 0) return;

        const review = new Review({ $reviewForm });

        $('body').on('click', '[data-reveal-id="modal-review-form"]', () => {
            validator = review.registerValidation(this.context);
            this.ariaDescribeReviewInputs($reviewForm);
        });

        $reviewForm.on('submit', () => {
            if (validator) {
                validator.performCheck();
                return validator.areAll('valid');
            }

            return false;
        });

        this.productReviewHandler();
    }

    ariaDescribeReviewInputs($form) {
        $form.find('[data-input]').each((_, input) => {
            const $input = $(input);
            const msgSpanId = `${$input.attr('name')}-msg`;

            $input.siblings('span').attr('id', msgSpanId);
            $input.attr('aria-describedby', msgSpanId);
        });
    }

    productReviewHandler() {
        if (this.url.indexOf('#write_review') !== -1) {
            this.$reviewLink.trigger('click');
        }
    }

    bulkPricingHandler() {
        if (this.url.indexOf('#bulk_pricing') !== -1) {
            this.$bulkPricingLink.trigger('click');
        }
    }

    videoPopup() {
        if ($('.halo-productVideo-link').length > 0) {
            $(document).on('click', '.halo-productVideo-link', function(e) {
                e.preventDefault();

                $('.videoGallery-list .videoGallery-item:first-child >a').trigger('click');
            });
        }
    }

    soldProduct($wrapper) {
        if($wrapper.length > 0) {
            var numbersProduct_text = this.context.themeSettings.product_soldProduct_products,
                numbersHours_text = this.context.themeSettings.product_soldProduct_hours,
                soldProductText = this.context.themeSettings.product_soldProduct_text;

            var numbersProductList =  JSON.parse("[" + numbersProduct_text + "]"), 
                numbersProductItem = (Math.floor(Math.random()*numbersProductList.length)),
                numbersHoursList =  JSON.parse("[" + numbersHours_text + "]"),
                numbersHoursItem = (Math.floor(Math.random()*numbersHoursList.length));
         
            $wrapper.html('<svg class="icon d-inline-block v-a-middle"><use xlink:href="#icon-fire"/></svg><span class="text d-inline-block v-a-middle">' + numbersProductList[numbersProductItem] + " " + soldProductText + " " + numbersHoursList[numbersHoursItem] + 'h</span>');
            $wrapper.show();
        }
    }

    countDownProduct($wrapper) {
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
                    $wrapper.removeClass('d-none');
                }
            }, 1000);
        }
    }

    compareColors(){
        const $swatchWrapper = $('.halo-compareColors-swatch'),
            $imageWrapper = $('.halo-compareColors-image'),
            $textWrapper = $('.halo-compareColors-text');

        $('.form-option', $swatchWrapper).on('click',  event => {
            var $this = $(event.currentTarget);

            $this.toggleClass('show-color');

            var title = $this.find('.form-option-variant').attr('title'),
                id = $this.data('product-swatch-value'),
                $color, $color2, $color3, $img, $pattern;

            if ($this.hasClass('show-color')){
                if($this.find('.form-option-variant--color').length){
                    $color = $this.find('.form-option-variant--color').attr('style');

                    $imageWrapper.append('<div class="item item-color item-'+id+'"><span class="color" style="'+$color+';"></span><span class="title">'+title+'</span></div>');
                } else if($this.find('.form-option-variant--color2').length){
                    $color = $this.find('.form-option-variant--color2 .color1').attr('style');
                    $color2 = $this.find('.form-option-variant--color2 .color2').attr('style');

                    $('.halo-compareColors-image').append('<div class="item item-color item-'+id+'"><span class="color color2"><span style="'+$color+';"></span><span style="'+$color2+';"></span></span><span class="title">'+title+'</span></div>');
                } else if($this.find('.form-option-variant--color3').length){
                    $color =  $this.find('.form-option-variant--color3 .color1').attr('style');
                    $color2 =  $this.find('.form-option-variant--color3 .color2').attr('style');
                    $color3 =  $this.find('.form-option-variant--color3 .color3').attr('style');

                    $imageWrapper.append('<div class="item item-color item-'+id+'"><span class="color color3"><span style="'+$color+';"></span><span style="'+$color2+';"></span><span style="'+$color3+';"></span></span><span class="title">'+title+'</span></div>');
                } else if($this.find('.form-option-variant--pattern').length){
                    $img = $this.find('.form-option-variant--pattern').attr('style');
                    $pattern = $this.find('.form-option-variant--pattern').attr('data-pattern');

                    $imageWrapper.append('<div class="item item-partern item-'+id+'"><span class="image"><img src='+$pattern+' alt='+title+' title='+title+'></span><span class="title">'+title+'</span></div>');
                }
            } else{
                $('.item-'+id+'', $imageWrapper).remove();
            }

            if($imageWrapper.children().length > 0){
                $textWrapper.hide();
            } else{
                $textWrapper.show();
            }

            if ($(window).width() >= 1025) {
                var el = document.getElementById('color-swatch-image');
                
                new Sortable(el, {
                    animation: 150
                });
            }
        });
    }

    askAnExpert(){
        var message;

        const url = this.context.themeSettings.halo_ask_an_expert_pagelink;

        $(document).ready(function() {
            utils.api.getPage(url, {template: 'halothemes/product/halo-ask-an-expert-form'}, (err, response) => {
                if (err) return;

                $('.hl-form-field-wrapper').html(response);
            });
        });

        $(document).on('click', '.ask-an-expert-link', event => {
            event.preventDefault();

            $('body').addClass('has-askAnExpert')
        });

        $(document).on('click', event => {
            if ($(event.target).closest('.ask-an-expert-link').length === 0){
                $('body').removeClass('has-askAnExpert');
            }
        });

        $('.halo-ask-an-expert-form').on('submit', function (event) {
            event.preventDefault();

            var typeContact = $('.halo-ask-an-expert-form input[name=type_contact]:checked').val(),
                typePackage = $('.halo-ask-an-expert-form input[name=type_package]:checked').val(),
                customerMessage = $('.halo-ask-an-expert-form textarea[name=contact_comment_area]').val(),
                recaptcha = $('.halo-ask-an-expert-form #g-recaptcha-response').val(),
                title =  $('.halo-ask-an-expert-form[data-product-ask-title]').attr('data-product-ask-title'),
                sku = $('.halo-ask-an-expert-form[data-product-ask-sku]').attr('data-product-ask-sku'),
                url = $('.halo-ask-an-expert-form[data-product-ask-url]').attr('data-product-ask-url');

            if (recaptcha == '') {
                const error = 'The captcha you entered is incorrect. Please try again.'

                $('#halo-ask-an-expert-results').html('<div class="alertBox alertBox--error">'+error+'</div>');
                return;
            }

            if (typeContact != '' && typePackage != '' && customerMessage != '' && recaptcha != '') {
                message = `
                    1. Do you need: ${typePackage} 
                    2. What can I help you with today: ${customerMessage}
                    3. How would you like me to contact you?: ${typeContact}
                    4. Product Name: ${title}
                    5. Product SKU: ${sku}
                    6. Product Link: ${url}
                `
            }

            $('#contact_question').val(message);
            $.ajax({
                type: 'POST',
                url: '/pages.php?action=sendContactForm',
                data: $('.halo-ask-an-expert-form').serialize(),
                success: function() {
                    $('.halo-ask-an-expert-form').hide();
                    $('#halo-ask-an-expert-results').html('<div class="alertBox alertBox--success">Thank you. We\'ve received your feedback and will respond shortly.</div>');
                },
            });
        });
    }

    checkTabActive() {
        const tab = document.querySelectorAll('[data-tab] .tab');
        const tabFirst = document.querySelector('[data-tab] .tab:first-child');
        const tabContent = document.querySelectorAll('.tabs-contents .tab-content');
        const tabContentFirst = document.querySelector('.tabs-contents .tab-content:first-child');

        if (window.matchMedia('(min-width: 768px)').matches) {
            removeTabActive()
            if (tabFirst) tabFirst.classList.add('is-active');
            if (tabContentFirst) tabContentFirst.classList.add('is-active');
        } else {
            removeTabActive()
        }

        function removeTabActive() {
            if (tab) {
                tab.forEach(function(content) {
                    content.classList.remove('is-active');
                });
            }
            if (tabContent) {
                tabContent.forEach(function(content) {
                    content.classList.remove('is-active');
                });
            }
        }
    }

    checkProduct() {
        const relatedProducts = $('#halo-related-products'),
            similarProducts = $('#halo-similar-products');

        if(relatedProducts.find('.swiper-wrapper').text().trim() == '') {
            relatedProducts.hide()
        }

        if(similarProducts.find('.swiper-wrapper').text().trim() == '') {
            similarProducts.hide()
        }
    }

    setRecentViewedProducts() {
        const name = '_halo_recently_viewed';
        const productId = parseInt(document.querySelector('[name="product_id"]').value);
        const recentlyViewed = document.querySelector('#halo-recent-viewed-products');
        let listItems = JSON.parse(localStorage.getItem(name) || '[]');
        if (!productId) return;
        if (listItems.includes(productId)) listItems = listItems.filter(id => id !== productId);
        listItems.unshift(productId);
        localStorage.setItem(name, JSON.stringify(listItems.slice(0, Number(recentlyViewed.dataset.limit))));
    }
}
