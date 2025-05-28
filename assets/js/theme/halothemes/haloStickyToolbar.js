export default function(context) {
    const $body = $('body');

    function toolbar_sticky() {
        var toolbar_position, toolbar_height,
            toolbar = $('.page-listing .halo-toolbar');
            
        toolbar_height = toolbar.height();
        toolbar_position = toolbar.offset().top + toolbar.outerHeight(true);

        if (toolbar.length) {
            toolbar_scroll(toolbar_position, toolbar_height, toolbar);
        }
    }

    function toolbar_scroll(toolbar_position, toolbar_height, toolbar) {
        var didScroll,
            lastScrollTop = 0,
            delta = 5;

        $(window).on('scroll load', function() {
            var scroll = $(window).scrollTop();

            if(Math.abs(lastScrollTop - scroll) <= delta){
                return;
            }

            if (scroll > lastScrollTop && scroll > toolbar_position){
                toolbar.removeClass('sticky-down').addClass('sticky-up');
                
                if (scroll > toolbar_position) {
                    $body.addClass('has-stickyToolbar');
                } else {
                    $body.removeClass('has-stickyToolbar');
                }
            } else {
                if(scroll + $(window).height() < $(document).height()) {
                    toolbar.removeClass('sticky-up').addClass('sticky-down');

                    if (scroll > toolbar_position) {
                        $body.addClass('has-stickyToolbar');
                    } else {
                        $body.removeClass('has-stickyToolbar');
                    }
                }
            }
            
            lastScrollTop = scroll;
        });
    }

    if ($(window).width() < 1025) {
        if(context.themeSettings.haloStickyToolbar){
            toolbar_sticky();
        }
    } else{
        $body.removeClass('has-stickyToolbar');
    }
}
