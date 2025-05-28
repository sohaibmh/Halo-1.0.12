import _ from 'lodash';

export default function() {
    if ($('#form-action-addToCart').length) {
        var scroll = $('#form-action-addToCart').offset(),
            scrollTop = scroll.top;

        $(window).scroll(function(){
            if($(window).scrollTop() > scrollTop + 400){

                if(!$('#halo_sticky_addToCart').hasClass('show_sticky')){
                    $('#halo_sticky_addToCart').addClass('show_sticky');

                    if ($(window).width() > 550) {
                        $('#recently_bought_list').css("bottom", $('#halo_sticky_addToCart').outerHeight() + 40);
                    } else {
                        if($('#halo_sticky_addToCart').length){
                            $('#recently_bought_list').css("bottom", $('#halo_sticky_addToCart').outerHeight() + 30);
                        } else {
                            $('#recently_bought_list').css("bottom", 30);
                        }
                    }
                }
            } else{
                $('#halo_sticky_addToCart').removeClass('show_sticky');
                $('.pop-up-option').removeClass('is-open');
                $('body').removeClass('openPopupOption');

                $('.choose_options_add').removeClass('is-active');

                $('#recently_bought_list').css("bottom", 30);
            }
        });

        $(document).on('click','.choose_options_add', function(event){
            $(this).toggleClass('is-active');
            $('.pop-up-option').toggleClass('is-open');
            $('body').addClass('openPopupOption');
        });

        $(document).on('click','.pop-up-option .close', function(event){
            $(".pop-up-option").removeClass('is-open');
            $('body').removeClass('openPopupOption');
            $('.choose_options_add').removeClass('is-active');
        });

        $(document).on('click', event => {
            if ($('body').hasClass('openPopupOption')) {
                if (($(event.target).closest('#halo_sticky_addToCart').length === 0)){
                    $('.pop-up-option').removeClass('is-open');
                    $('body').removeClass('openPopupOption');
                    $('.choose_options_add').removeClass('is-active');
                }
            }
        });

        window.onload = function(){
            if($(window).scrollTop() > scrollTop + 400){
                if(!$('#halo_sticky_addToCart').hasClass('show_sticky')){
                    $('#halo_sticky_addToCart').addClass('show_sticky');

                    if ($(window).width() > 550) {
                        $('#recently_bought_list').css("bottom", $('#halo_sticky_addToCart').outerHeight() + 40);
                    } else {
                        if($('#halo_sticky_addToCart').length){
                            $('#recently_bought_list').css("bottom", $('#halo_sticky_addToCart').outerHeight() + 30);
                        } else {
                            $('#recently_bought_list').css("bottom", 30);
                        }
                    }
                }
            }
        }
    }
}
