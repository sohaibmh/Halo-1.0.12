export default function (context) {
    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        const expires = 'expires=' + d.toUTCString();
        document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
    }

    function getCookie(cname) {
        const name = cname + '=';
        const ca = document.cookie.split(';');

        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    }

    function setClosePopup(expiresDate) {
        setCookie('haloNewsletterPopup', 'closed', expiresDate);
      
        setTimeout(function() {
            $('#halo-newsletter-popup').addClass('hide animated');
            $('body').removeClass('has-newsletter');
        }, 100);
    }

    function setOpenPopup() {
        document.body.classList.add('has-newsletter');
        $('#halo-newsletter-popup').removeClass('hide').addClass('animated fadeIn');
    }

    const deleteCookie = function(name) {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    };

    if(context.themeSettings.halo_newsletter_popup == true){
        var timeToShow = parseInt(context.themeSettings.halo_newsletter_popup_time)*1000,
            expiresDate = parseInt(context.themeSettings.halo_newsletter_popup_expires_date);

        $(document).on('click', '[data-open-newsletter-popup]', event => {
            event.preventDefault();

            setOpenPopup();
        });

        $(document).on('click', '[data-close-newsletter-popup]', event => {
            setClosePopup(expiresDate);
        });

        $(document).on('change', '#halo-newsletter-popup #do-not-show-again', event => {
            if($("#halo-newsletter-popup #do-not-show-again:checked").length){
                setClosePopup(expiresDate);
            }
        });

        $(document).keyup(event => {
            if (event.keyCode === 27) {
                setClosePopup(expiresDate);
            }
        });

        if (getCookie('haloNewsletterPopup') === ''){
            setTimeout(function() {
                $('#halo-newsletter-popup').removeClass('hide').addClass('animated fadeIn');
                $('body').addClass('has-newsletter');
            }, timeToShow);

            $('#popupSubscribeFormSubmit').submit(event => {
                if ($('#popupSubscribeFormSubmit').find('#nl_email2').val() === '') {
                    return false;
                } else {
                    setCookie('haloNewsletterPopup', 'closed', expiresDate);

                    $('#halo-newsletter-popup').removeClass('fadeIn').addClass('animated fadeOut');

                    setTimeout(function() {
                        $('#halo-newsletter-popup').addClass('hide');
                        $('body').removeClass('has-newsletter');

                        return true;
                    }, 100);
                }
            });
        }
    } else{
        deleteCookie('haloNewsletterPopup');
    }
}
