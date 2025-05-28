import _ from 'lodash';
import mediaQueryListFactory from '../common/media-query-list';
import { CartPreviewEvents } from './cart-preview';

const PLUGIN_KEY = {
    CAMEL: 'mobileMenuToggle',
    SNAKE: 'mobile-menu-toggle',
};

function optionsFromData($element) {
    const mobileMenuId = $element.data(PLUGIN_KEY.CAMEL);

    return {
        menuSelector: mobileMenuId && `#${mobileMenuId}`,
    };
}

/*
 * Manage the behaviour of a mobile menu
 * @param {jQuery} $toggle
 * @param {Object} [options]
 * @param {Object} [options.headerSelector]
 * @param {Object} [options.menuSelector]
 * @param {Object} [options.scrollViewSelector]
 */
export class MobileMenuToggle {
    constructor($toggle, {
        headerSelector = 'header',
        menuSelector = '#menu',
        scrollViewSelector = '.navPages',
    } = {}) {
        this.$body = $('body');
        this.$menu = $(menuSelector);
        this.$headerMenu = $('.halo-sidebar-header');
        this.$navList = $('.navPages-list:not(.navPages-list--user)');
        this.$header = $(headerSelector);
        this.$scrollView = $(scrollViewSelector, this.$menu);
        this.$subMenus = this.$navList.find('.navPages-action:not(.no-subMenu)');
        this.$toggle = $toggle;
        this.mediumMediaQueryList = mediaQueryListFactory('medium');

        // Auto-bind
        this.onToggleClick = this.onToggleClick.bind(this);
        this.onCartPreviewOpen = this.onCartPreviewOpen.bind(this);
        this.onMediumMediaQueryMatch = this.onMediumMediaQueryMatch.bind(this);
        this.onSubMenuClick = this.onSubMenuClick.bind(this);

        // Listen
        this.bindEvents();

        // Assign DOM attributes
        this.$toggle.attr('aria-controls', this.$menu.attr('id'));

        // Hide by default
        this.hide();
    }

    get isOpen() {
        return this.$menu.hasClass('is-open');
    }

    bindEvents() {
        this.$toggle.on('click', this.onToggleClick);
        this.$header.on(CartPreviewEvents.open, this.onCartPreviewOpen);
        this.$subMenus.on('click', this.onSubMenuClick);

        if (this.mediumMediaQueryList && this.mediumMediaQueryList.addListener) {
            this.mediumMediaQueryList.addListener(this.onMediumMediaQueryMatch);
        }

        $('.navPages-list--user .currencies #currency_selector').on('click', function(ev){
            const $closestActionParent = $(event.target).parent();
            const $parentSiblings = $closestActionParent.siblings();
            const $closestActionLevel = $closestActionParent.data('level');
            const $beforeMenuHeight = $('.navPages-list--user').height();
            const $currentmenuHeight = $parentSiblings.height();
            $closestActionParent.addClass('is-open');
            $parentSiblings.addClass('is-hidden');
            $('.navPages-list--user').attr('data-level-list', $closestActionLevel);
            $('.navPages-list--user').attr('data-before',$beforeMenuHeight);
            $('.navPages-list--user').css('min-height',$currentmenuHeight);
        });
        $('.navPages-list--user .currencies .navPage-subMenu-title').on('click', function(ev){
            const $closestAction = $(event.target).closest('.currencies');
            const $parentSiblings = $closestAction.siblings();
            const $beforeMenuHeight = $('.navPages-list--user').data('before');
            $closestAction.removeClass('is-open');
            $parentSiblings.removeClass('is-hidden');
            $('.navPages-list--user').attr('data-level-list', 1);
            $('.navPages-list--user').css('min-height',$beforeMenuHeight);
        });
    }

    unbindEvents() {
        this.$toggle.off('click', this.onToggleClick);
        this.$header.off(CartPreviewEvents.open, this.onCartPreviewOpen);

        if (this.mediumMediaQueryList && this.mediumMediaQueryList.addListener) {
            this.mediumMediaQueryList.removeListener(this.onMediumMediaQueryMatch);
        }
    }

    toggle() {
        if (this.isOpen) {
            this.hide();
        } else {
            this.show();
        }
    }

    show() {
        this.$body.addClass('has-activeNavPages');

        this.$menu
            .addClass('is-open')
            .attr('aria-hidden', false);

        this.$header.addClass('is-open');
        this.$scrollView.scrollTop(0);

        if ($(window).width() > 1024) {
            if (($('.page-type-category').length > 0) || ($('.page-type-search').length > 0) || ($('.page-type-brand').length > 0) || ($('.page-type-product').length > 0)) {
                if ($('header:not(.is-sticky)').length) {
                    var height = this.$header.outerHeight();
                    $('.halo-menu-sidebar').css({'top': height});
                } else {
                    var height = this.$header.outerHeight();
                    $('.halo-menu-sidebar').css({'top': height});
                }
            } else {
                var height = this.$header.outerHeight();
                $('.halo-menu-sidebar').css({'top': height});
            }
        } else {
            $('.halo-menu-sidebar').css('top', 0);
        }

        this.resetSubMenus();
    }

    hide() {
        this.$body.removeClass('has-activeNavPages');

        this.$toggle
            .removeClass('is-open')
            .attr('aria-expanded', false);

        this.$menu
            .removeClass('is-open')
            .attr('aria-hidden', true);

        this.$header.removeClass('is-open');

        this.resetSubMenus();
    }

    // Private
    onToggleClick(event) {
        event.preventDefault();

        this.toggle();
    }

    onCartPreviewOpen() {
        if (this.isOpen) {
            this.hide();
        }
    }

    onMediumMediaQueryMatch(media) {
        if (!media.matches) {
            return;
        }

        this.hide();
    }

    onSubMenuClick(event) {
        const $closestAction = $(event.target).parent();
        const $parentSiblings = $closestAction.siblings();

        if (!$closestAction.hasClass('navPage-subMenu-title')) {
            if (!$closestAction.hasClass('navPages-action-end')) {
                if($closestAction.hasClass('has-dropdown')){
                    $closestAction.toggleClass('is-open');
                }
            }

            if ($closestAction.hasClass('is-open')) {
                $parentSiblings.addClass('is-hidden');
                $closestAction.parents('.halo-menu-sidebar').find('.halo-sidebar-header').addClass('is-hidden');
            }
        } else {
            const $closestAction2 = $(event.target).closest('.navPage-subMenu');
            const $parentSiblings2 = $closestAction2.parent();
            const $parentAction2 = $parentSiblings2.siblings();

            if (!$('.navPage-subMenu-item-child.is-open').length) {
                $closestAction.parents('.halo-menu-sidebar').find('.halo-sidebar-header').removeClass('is-hidden');
            }

            $parentSiblings2.removeClass('is-open');
            $parentAction2.removeClass('is-hidden');
        }
    }
    
    resetSubMenus() {
        this.$headerMenu.removeClass('is-hidden');
        this.$navList.find('.is-hidden').removeClass('is-hidden');
        this.$navList.find('.is-open').removeClass('is-open');
        this.$navList.css('min-height', 'unset');
        $('.navPages-list--user').attr('data-level-list', 1);
    }
}

/*
 * Create a new MobileMenuToggle instance
 * @param {string} [selector]
 * @param {Object} [options]
 * @param {Object} [options.headerSelector]
 * @param {Object} [options.menuSelector]
 * @param {Object} [options.scrollViewSelector]
 * @return {MobileMenuToggle}
 */
export default function mobileMenuToggleFactory(selector = `[data-${PLUGIN_KEY.SNAKE}]`, overrideOptions = {}) {
    const $toggle = $(selector).eq(0);
    const instanceKey = `${PLUGIN_KEY.CAMEL}Instance`;
    const cachedMobileMenu = $toggle.data(instanceKey);

    if (cachedMobileMenu instanceof MobileMenuToggle) {
        return cachedMobileMenu;
    }

    const options = _.extend(optionsFromData($toggle), overrideOptions);
    const mobileMenu = new MobileMenuToggle($toggle, options);

    $toggle.data(instanceKey, mobileMenu);

    return mobileMenu;
}