import utils from '@bigcommerce/stencil-utils';

export default function (context) {
    if (context.themeSettings.halo_shipping == true){
        var animator = new percenAnimator();

        const upsellMessage = ['<span>'+context.themeSettings.halo_shipping_remaining+'</span>',
                                '<span>'+context.themeSettings.halo_shipping_matched+'</span>'];

        function loadFreeShippingMessage(){
            const options = {
                template: 'halothemes/shipping/halo-calculate-free-shipping-tmp'
            };

            utils.api.cart.getContent(options, (err, response) => {
                showFreeShippingMessage(response);
            });
        }

        loadFreeShippingMessage();

        function showFreeShippingMessage(message) {
            if($(message).length > 0) {
                $(message).find('.haloCalulateFreeShipping-text').each((index, element) => {
                    if($('.condition_remaining', element).text() != "" || $('.congratulation', element).text()){
                        if(context.themeSettings.halo_shipping_type == 'all'){
                            showProgress(message, element);
                        } else if (context.themeSettings.halo_shipping_type == 'custom'){
                            var countryCode,
                                country,
                                countryList;

                            $.getScript('https://ssl.geoplugin.net/javascript.gp?k=9247556ec91c71e9', event => {
                                countryCode = geoplugin_countryCode();
                                country = $('.country', element).text();
                                countryList = country.split(",");

                                if ($.inArray(countryCode, countryList) != -1){
                                    showProgress(message, element);
                                } else {
                                    $('.halo-free-shipping-message').hide();
                                }
                            });
                        }
                    }
                });

                if ($(message).find('.haloCalulateFreeShipping-text').length == 0) {
                    $('.halo-free-shipping-message').hide();
                }
            }
        }

        function showProgress(message, scope) {
            var max_percent = 0,
                classProgress;

            const condition_required = $('.condition_required', scope).text(),
                condition_matched = $('.condition_matched', scope).text(),
                condition_remaining = $('.condition_remaining', scope).text(),
                num_required = (condition_required != "" ? Number(condition_required.replace(/[^0-9.-]+/g,"")) : 0),
                num_matched = (condition_matched != "" ? Number(condition_matched.replace(/[^0-9.-]+/g,"")) : 0),
                num_remaining = (condition_remaining != "" ? Number(condition_remaining.replace(/[^0-9.-]+/g,"")) : 0);

            var percent = parseInt(num_matched/num_required * 100);
            percent = (percent > 100 ? 100 : percent);

            if(num_required == num_remaining){
                percent = 100;
            }

            if($('.congratulation', scope).text() != ""){
                percent = 100;
            }


            if(percent > max_percent){
                max_percent = percent;
            } else{
                return;
            }

            if(percent <= 50) {
                classProgress = "progress-shipping-50";
                message = upsellMessage[0].replace('{remaining}', condition_remaining);
            } else if(percent <= 90) {
                classProgress = "progress-shipping-90";
                message = upsellMessage[0].replace('{remaining}', condition_remaining);
            } else if(percent < 100) {
                classProgress = "progress-shipping-100";
                message = upsellMessage[0].replace('{remaining}', condition_remaining);
            } else if(percent == 100){
                classProgress = "progress-shipping-100";
                message = upsellMessage[1];
            }

            var progress = '<div class="progress-shipping '+classProgress+'" role="progressbar">\
                            <div class="progress-meter" style="width: '+percent+'%;">'+percent+'%</div>\
                        </div>';
            if(window.location.pathname == context.urls.cart){
                var pageCart = $('.page-cart');

                progress += '<div class="shipping-message">'+message+'</div>';

                if(pageCart.find('.halo-free-shipping-message').length > 0){
                    pageCart.find('.halo-free-shipping-message').removeClass('animated-loading');
                    
                    setTimeout(() => {
                        pageCart.find('.progress-shipping').addClass(classProgress);
                        pageCart.find('.message').html(message);
                        pageCart.find('.progress-meter').css('width', percent + '%').html('<span class="progress-percent">'+percent+'%</span>');

                        animator.animate(percent);
                    }, 200);
                } else {
                    pageCart.find('.page-cart .page-header').after('<div class="halo-free-shipping-message">' + progress + '</div>');
                }
            } else if($('body').hasClass('openCartSidebar')){
                var previewCart = $('.previewCart');

                progress += '<div class="shipping-message">'+message+'</div>';

                if(previewCart.find('.halo-free-shipping-message').length > 0){
                    previewCart.find('.halo-free-shipping-message').removeClass('animated-loading');

                    setTimeout(() => {
                        previewCart.find('.progress-shipping').addClass(classProgress);
                        previewCart.find('.message').html(message);
                        previewCart.find('.progress-meter').css('width', percent + '%').html('<span class="progress-percent">'+percent+'%</span>');

                        animator.animate(percent);
                    }, 200);
                } else {
                    previewCart.find('.previewCartHeader').after('<div class="halo-free-shipping-message">' + progress + '</div>');
                }
            }
        }

        function showTimer() {
          if (animator.curPercentage < animator.targetPercentage) {
            animator.curPercentage += 1;
          } else if (animator.curPercentage > animator.targetPercentage) {
            animator.curPercentage -= 1;
          }

          $(animator.outputSelector).text(animator.curPercentage + "%");

          if (animator.curPercentage != animator.targetPercentage) {
            setTimeout(showTimer, animator.animationSpeed)
          }
        }

        function percenAnimator() {
          this.animationSpeed =10;
          this.curPercentage = 0;
          this.targetPercentage = 0;
          this.outputSelector = ".progress-percent";

          this.animate = function(percentage) {
            this.targetPercentage = percentage;
            setTimeout(showTimer, this.animationSpeed);
          }
        }
    }
}
