import _ from 'lodash';
import utils from '@bigcommerce/stencil-utils';
import haloAddOptionForProduct from '../halothemes/haloAddOptionForProduct';

export default function (context) {
    const $quickSearchResults = $('.quickSearchResults');
    const $quickSearchResultsWrapper = $('.quickSearchResults .swiper-wrapper');
    const $quickSearchResultsCustom = $('.quickSearchResultsCustom');
    const $quickSearchForms = $('[data-quick-search-form]');
    const $searchBtnMobile = $('.item--searchMobile [data-search]');
    const $searchMobileClose = $('#halo-search-sidebar .halo-sidebar-header .close');

    $(document).on('click', '.item--searchMobile [data-search]', event => {
        event.preventDefault();

        $('body').addClass('openSearchMobile').addClass('openQuickSearch');
        haloAddOptionForProduct(context, 'halo-search-product');
    });

    $searchMobileClose.on('click', event => {
        event.preventDefault();
        
        $searchBtnMobile.removeClass('is-open');
        $('body').removeClass('openSearchMobile').removeClass('openQuickSearch');
    });

    $(document).on('click', event => {
        if ($('body').hasClass('openSearchMobile')) {
            if (($(event.target).closest('.item--searchMobile [data-search]').length === 0) && ($(event.target).closest('#halo-search-sidebar').length === 0) && ($(event.target).closest('.modal').length === 0)){
                $('body').removeClass('openSearchMobile').removeClass('openQuickSearch');
            }
        }
    });

    // stagger searching for 1200ms after last input
    let totalProducts;
    const debounceWaitTime = 1200;
    const doSearch = _.debounce((searchQuery) => {
        utils.api.search.search(searchQuery, { template: 'search/quick-results' }, (err, response) => {
            if (err) {
                return false;
            }

            $quickSearchResultsCustom.hide();
            $quickSearchResultsWrapper.html(response);
            
            const $quickSearchResultsCurrent = $quickSearchResults.filter(':visible');

            const $noResultsMessage = $quickSearchResultsCurrent.find('.quickSearchMessage');
            if ($noResultsMessage.length) {
                $noResultsMessage.attr({
                    role: 'status',
                    'aria-live': 'polite',
                });
            } else {
                const $quickSearchAriaMessage = $quickSearchResultsCurrent.next();
                $quickSearchAriaMessage.addClass('u-hidden');

                const predefinedText = $quickSearchAriaMessage.data('search-aria-message-predefined-text');
                const itemsFoundCount = $quickSearchResultsCurrent.find('.product').length;
                const $quickSearchResultsTitle = $('.quickSearchResults-title');
                const $quickSearchResultsButton = $('.quickSearchResults-button');
                totalProducts = $quickSearchResults.find('[data-total]').attr('data-total');
                
                $quickSearchResultsButton.attr('href', `/search.php?search_query=${searchQuery}`)
                $quickSearchResultsTitle.find('.number').text(`(${totalProducts})`);
                $quickSearchResults.addClass('is-search');
                $quickSearchResults.find('[data-halo-load="animation"]').addClass('animated');
                haloAddOptionForProduct(context, 'halo-quickResults-product');

                $quickSearchAriaMessage.text(`${itemsFoundCount} ${predefinedText} ${searchQuery}`);

                setTimeout(() => {
                    $quickSearchAriaMessage.removeClass('u-hidden');
                }, 100);
            }
        });
    }, debounceWaitTime);

    utils.hooks.on('search-quick', (event, currentTarget) => {
        const searchQuery = $(currentTarget).val();

        // server will only perform search with at least 3 characters
        if (searchQuery.length < 3) {
            return;
        }

        doSearch(searchQuery);
    });

    // Catch the submission of the quick-search forms
    $quickSearchForms.on('submit', event => {
        event.preventDefault();

        const $target = $(event.currentTarget);
        const searchQuery = $target.find('input').val();
        const searchUrl = $target.data('url');

        if (searchQuery.length === 0) {
            return;
        }

        window.location.href = `${searchUrl}?search_query=${encodeURIComponent(searchQuery)}`;
    });
}
