import utils from '@bigcommerce/stencil-utils';
import haloSwiper from './haloSwiper';
import haloNewsletterPopup from './haloNewsletterPopup';
import haloRecentlyBoughtPopup from './haloRecentlyBoughtPopup';
import haloRecentlyViewedProduct from './haloRecentlyViewedProduct';
import haloMegaMenu from './haloMegaMenu';
import haloAjaxLoginPopup from './haloAjaxLoginPopup';
import haloAddOptionForProduct from './haloAddOptionForProduct';
import haloAjaxAddToCart from './haloAjaxAddToCart';
import mobileMenuToggle from '../global/mobile-menu-toggle';
import quickView from '../global/quick-view';
import menu from '../global/menu';
import quickSearch from '../global/quick-search';
import compareProducts from '../global/compare-products';
import haloQuickAddWishlist from './haloQuickAddWishlist';
import haloFeaturedProduct from './haloFeaturedProduct';
import haloProductImageHover from './haloProductImageHover';

export default function(context) {
    const $context = context,
        settings = context.themeSettings;

    var $body = $('body'),
        $header = $('header.header'),
        height_header = $header.outerHeight(),
        scroll_position = $(window).scrollTop(),
        checkJS_load = true,
        check_loadProductCarousel = true;

    function loadFunction() {
        if (checkJS_load) {
            checkJS_load = false;

            if (settings.halo_newsletter_popup) haloNewsletterPopup($context);
            haloMegaMenu($context);
            mobileMenuToggle();
            haloRecentlyBoughtPopup($context);
            haloAjaxAddToCart($context);
            quickView($context);
            quickSearch($context);
            compareProducts($context);
            menu();
            haloAjaxLoginPopup();
            activeMenuMobile();
            variantImageColor();
            loadProductTabByCategory();
            footerMobileToggle();
            haloQuickAddWishlist($context);
            haloProductImageHover();

            //Resize
            window.matchMedia('(min-width: 1025px)').addEventListener('change', () => {
                activeMenuMobile();
            });
        }
    }

    function eventLoad() {
        $(document).ready(function() {
            const tScroll = $(this).scrollTop();

            haloLoad();
            haloSwiper();
            loadOptionForProductCarousel(tScroll);
            haloFeaturedProduct($context);
            if (settings.halo_recently_viewed_products) haloRecentlyViewedProduct($context);
        });

        $(window).on('scroll', (e) => {
            const $target = $(e.currentTarget);
            const tScroll = $target.scrollTop();

            loadFunction();
            if (settings.halo_headerSticky) haloStickyHeader(tScroll);
            loadOptionForProductCarousel(tScroll);
        });

        $(document).on('keydown mousemove touchstart', (e) => {
            loadFunction();
        });
    }
    eventLoad();

    function Event() {
        // Change Option
        // -----------------------------------------------------------------------------
        const btn_cardOption = '.card-option .form-option-swatch';

        $(document).on('click', btn_cardOption, e => {
            e.preventDefault();
            const $targer = $(e.currentTarget),
            thisTitle = $targer.find('.form-option-variant').attr('title');

            $(btn_cardOption).removeClass('is-active');
            $targer.addClass('is-active');
            $targer.parents('.card').find('.card-name').text(` - ${thisTitle}`);
        });

        // Close
        // -----------------------------------------------------------------------------
        const $btn_close = $('.btn-close');
        const $btn_mobileMenu = $('.mobileMenu-toggle');

        $btn_close.on('click', (e) => {
            e.preventDefault();
            const $target = $(e.currentTarget);

            $target.parents('.halo-side-block').removeClass('is-open');

            setTimeout(function() {
                $sideLogin.hide();
                $sideCart.hide();
                $('#sideBlock_category').hide();
                $('#sideBlock_search').hide();
                $('#sideBlock_brand').hide();
                $('#sideBlock_blog').hide();
            }, 200);

            if ($body.hasClass('has-activeNavPages')) {
                $btn_mobileMenu.trigger('click');
            }
        });

        // Login Form
        // -----------------------------------------------------------------------------
        if (!$body.hasClass('page-type-login')) {
            $('[data-login-form]').on('click', event => {
                event.preventDefault();
                if ($('.halo-auth-sidebar').hasClass('is-open')) {
                    $('.halo-auth-sidebar').removeClass('is-open');
                    $body.removeClass('openAuthSidebar');
                } else {
                    $('.halo-auth-sidebar').addClass('is-open');
                    $body.addClass('openAuthSidebar');
                }

                const element = document.querySelector('[data-create-account-link]');
                
                if (element) {
                    const url = element.getAttribute('data-create-account-link');
                    utils.api.getPage(url, { template: 'halothemes/account/create-account-form' }, (err, response) => {
                        if (err) return;
    
                        element.querySelector('.form-row').innerHTML = response;
                    });
                }
            });
        } else {
            $('[data-login-form]').on('click', event => {
                event.preventDefault();

                const loginFormElement = document.querySelector('.login');
                const loginFormPosition = loginFormElement.getBoundingClientRect().top + window.pageYOffset;

                window.scrollTo({
                    top: loginFormPosition,
                    behavior: 'smooth'
                });
            });
        }

        // Account Form
        // -----------------------------------------------------------------------------
        $('.halo-auth-sidebar .halo-sidebar-header .close').on('click', event => {
            event.preventDefault();

            $('.halo-auth-sidebar').removeClass('is-open');
            $body.removeClass('openAuthSidebar');
        });

        $(document).on('click', event => {
            if ($('.halo-auth-sidebar').hasClass('is-open')) {
                if (($(event.target).closest('.halo-auth-sidebar').length === 0) && ($(event.target).closest('[data-login-form]').length === 0) && ($(event.target).closest('.card-wishlist').length === 0)) {
                    $('.halo-auth-sidebar').removeClass('is-open');
                    $body.removeClass('openAuthSidebar');
                }
            }
        });

        // Add To Wish List
        // -----------------------------------------------------------------------------
        $(document).on('click', '.card .wishlist', (e) => {
            e.preventDefault();
            var $this_wl = $(e.currentTarget);
            var url_awl = $this_wl.attr('href');

            if ($body.hasClass('is-login')) {
                $.post(url_awl).done(function() {
                    window.location.href = url_awl;
                });
            } else {
                window.location.href = '/login.php';
            }
        });

        // Footer Info Heading Toggle
        // -----------------------------------------------------------------------------
        const $footerHeadingToggle = $('.footer-info-heading--toggle');

        $footerHeadingToggle.on('click', (e) => {
            e.preventDefault();
            const wWidth = window.innerWidth;

            if (wWidth < 768) {
                const $target = $(e.currentTarget);
                const $thisFooterInfo = $target.parents('.footer-info-col');
                const $thisFooterInfo_list = $thisFooterInfo.find('.footer-info-list');

                $thisFooterInfo.toggleClass('open-dropdown');

                if ($thisFooterInfo.hasClass('open-dropdown')) {
                    $thisFooterInfo_list.slideDown(400);
                } else {
                    $thisFooterInfo_list.slideUp(400);
                }
            }
        });

        //
        // Progress Scroll
        // -----------------------------------------------------------------------------
        window.addEventListener('scroll', () => {
            document.body.style.setProperty('--scroll',`${window.pageYOffset / (document.body.offsetHeight - window.innerHeight) * 100}%`);
        }, false);
    }
    Event();

    function activeMenuMobile() {
        $('.halo-menu-sidebar .close').on('click', event => {
            event.preventDefault();

            if ($body.hasClass('has-activeNavPages')) {
                $('.mobileMenu-toggle').trigger('click');
            }
        });

        $(document).on('click', event => {
            if ($body.hasClass('has-activeNavPages')) {
                if (($(event.target).closest('.halo-menu-sidebar').length === 0) && ($(event.target).closest('.mobileMenu-toggle').length === 0)) {
                    $('.mobileMenu-toggle').trigger('click');
                }
            }
        });

        var $menuPc = $('.halo-bottomHeader .navPages-list:not(.navPages-list--user)'),
            $menuMobile = $('#halo-menu-sidebar .navPages-list:not(.navPages-list--user)');

        if ($(window).width() <= 1024) {
            $('.mobileMenu-toggle').on('click', event => {
                if ($menuPc.length) {
                    if (!$menuMobile.children().length) {
                        $menuPc.children().appendTo($menuMobile);
                    }
                }
            });
        } else {
            if (!$menuPc.children().length) {
                $menuMobile.children().prependTo($menuPc);
            }
        }
    }

    function variantImageColor() {
        $(document).on('click', '.card .card-option .form-option', function() {
            var self = $(this),
                newImageVariant = self.data('image'),
                productItemElm = self.closest('.card'),
                variantTitle = self.data('title');

            productItemElm.find('.variant_color_name').html(variantTitle)
            self.parents('.card-option').find('.form-option').removeClass('active');
            self.addClass('active');
            if (newImageVariant != "undefined") {
                productItemElm.find('.card-img-container img').attr({
                    "src": newImageVariant,
                    "srcset": newImageVariant

                });
                return false;
            }
        });
    }

    function footerMobileToggle() {
        $('.footer-info-col--mobile .footer-info-heading').on('click', event => {
            $('.footer-info-col--mobile .footer-info-heading').not($(event.currentTarget)).removeClass('is-clicked');

            if ($(event.currentTarget).hasClass('is-clicked')) {
                $(event.currentTarget).removeClass('is-clicked');
            } else {
                $(event.currentTarget).addClass('is-clicked');
            }

            $('.footer-info-col--mobile').each((index, element) => {
                if ($('.footer-info-heading', element).hasClass('is-clicked')) {
                    $(element).find('.footer-info-wrapper').slideDown("slow");
                } else {
                    $(element).find('.footer-info-wrapper').slideUp("slow");
                }
            });
        });
    }

    function haloStickyHeader(tScroll) {
        if (tScroll > 0 && tScroll < scroll_position) {
            $header.addClass('is-sticky');
            $body.addClass('is-sticky');
            if (!$('.header-height').length) {
                $header.before('<div class="header-height" style="height: '+height_header+'px"></div>');
            }
        } else {
            $header.removeClass('is-sticky');
            $body.removeClass('is-sticky');
            $('.header-height').remove();
        }

        scroll_position = tScroll;
    }

    function loadOptionForProductCarousel(tScroll) {
        const $loadProductCarousel = $('.halo-block-product');

        if ($loadProductCarousel.length) {
            const $loadProductCarouselTop = $loadProductCarousel.offset().top - screen.height;

            if (tScroll > $loadProductCarouselTop && check_loadProductCarousel) {
                check_loadProductCarousel = false;

                if ($('.halo-block-product').length > 0) {
                    $('.halo-block-product').each((index, element) => {
                        var $prodWrapId = $(element).attr('id');

                        haloAddOptionForProduct($context, $prodWrapId);
                    });
                }
            }
        }
    }

    function loadProductTabByCategory() {
        const homeProductTabByCategory = document.querySelectorAll('.halo-productbyTabs');
    
        if (homeProductTabByCategory.length) {
            const options = {
                template: 'products/carousel-2'
            };
    
            homeProductTabByCategory.forEach(tab => {
                const activeTab = tab.querySelector('.tab-content.is-active .productCarousel .productCarousel-slide:not(.product-sample)');
                if (!activeTab) {
                    const block = tab.querySelector('.tab-content.is-active');
                    const wrap = block.querySelector('.swiper-wrapper');
                    const cateUrl = block.getAttribute('data-tab-category-url');
                    const blockId = block.id;
    
                    loadCategory(cateUrl, options, wrap, blockId);
                }
    
                const tabs = tab.querySelectorAll('[data-tab]');
                tabs.forEach(toggler => {
                    toggler.addEventListener('click', () => {
                        setTimeout(() => {
                            const activeTab = tab.querySelector('.tab-content.is-active .productCarousel .productCarousel-slide:not(.product-sample)');
                            if (!activeTab) {
                                const block = tab.querySelector('.tab-content.is-active');
                                const wrap = block.querySelector('.swiper-wrapper');
                                const cateUrl = block.getAttribute('data-tab-category-url');
                                const blockId = block.id;
    
                                loadCategory(cateUrl, options, wrap, blockId);
                            }
                        }, 0);
                    });
                });
            });
        }
    }    
    
    function loadCategory(url, option, wrap, blockId) {
        utils.api.getPage(url, option, (err, response) => {
            if (err) return;
    
            const hasSlides = response.includes('productCarousel-slide');
            if (hasSlides) {
                wrap.innerHTML = response;

                const loadingOverlay = wrap.closest('.tab-content').querySelector('.loadingOverlay');
                
                if (loadingOverlay) {
                    loadingOverlay.remove();
                }
    
                haloAddOptionForProduct($context, blockId);
                haloProductImageHover();
            } else {
                wrap.innerHTML = `<p class="center">No Products</p>`;
            }
        });
    }
    

    function haloAnimation(block) {
        if (block.matches('.animated')) return;
        block.classList.add('animated');
    }

    function haloLoad() {
        const handler = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const $block = entry.target;
                    const type = $block.dataset.haloLoad;

                    switch(type) {
                        case 'animation':
                            haloAnimation($block);
                            break;
                    }
                }
            })
        }

        const $section = document.querySelectorAll('[data-halo-load]'),
        options = {
            threshold: .05
        };

        if (!$section) return;
        const observer = new IntersectionObserver(handler, options);
        $section.forEach(element => {
            observer.observe(element);
        });
    }
}
