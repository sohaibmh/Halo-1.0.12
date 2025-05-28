import { hooks } from '@bigcommerce/stencil-utils';
import CatalogPage from './catalog';
import FacetedSearch from './common/faceted-search';
import { createTranslationDictionary } from '../theme/common/utils/translations-utils';
import haloAddOptionForProduct from './halothemes/haloAddOptionForProduct';
import haloProductDisplayMode from './halothemes/haloProductDisplayMode';
import haloSidebarToggle from './halothemes/haloSidebarToggle';

export default class Brand extends CatalogPage {
    constructor(context) {
        super(context);
        this.validationDictionary = createTranslationDictionary(context);
    }

    onReady() {
        if ($('#facetedSearch').length > 0) {
            this.initFacetedSearch();
        } else {
            this.onSortBySubmit = this.onSortBySubmit.bind(this);
            hooks.on('sortBy-submitted', this.onSortBySubmit);
        }

        haloProductDisplayMode();
        haloSidebarToggle();

        this.showProductsPerPage();
        this.loadOptionForProductCard(this.context);
    }

    initFacetedSearch() {
        const {
            price_min_evaluation: onMinPriceError,
            price_max_evaluation: onMaxPriceError,
            price_min_not_entered: minPriceNotEntered,
            price_max_not_entered: maxPriceNotEntered,
            price_invalid_value: onInvalidPrice,
        } = this.validationDictionary;
        const $productListingContainer = $('#product-listing-container');
        const $facetedSearchContainer = $('#faceted-search-container');
        const productsPerPage = this.context.brandProductsPerPage;
        const requestOptions = {
            template: {
                productListing: 'brand/product-listing',
                sidebar: 'brand/sidebar',
            },
            config: {
                shop_by_brand: true,
                brand: {
                    products: {
                        limit: productsPerPage,
                    },
                },
            },
            showMore: 'brand/show-more',
        };

        this.facetedSearch = new FacetedSearch(requestOptions, (content) => {
            $productListingContainer.html(content.productListing);
            $facetedSearchContainer.html(content.sidebar);

            $('body').triggerHandler('compareReset');

            if($productListingContainer.find('[data-halo-load="animation"]').length > 0){
                $('[data-halo-load="animation"]').addClass('animated');
            }

            if($('#product-listing-container .product').length > 0){
                haloAddOptionForProduct(this.context, 'product-listing-container');
            }

            haloProductDisplayMode();

            this.showProductsPerPage();

            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, {
            validationErrorMessages: {
                onMinPriceError,
                onMaxPriceError,
                minPriceNotEntered,
                maxPriceNotEntered,
                onInvalidPrice,
            },
        });
    }

    loadOptionForProductCard(context) {
        if($('#product-listing-container .product').length > 0){
            haloAddOptionForProduct(context, 'product-listing-container');
        }
    }

    showProductsPerPage() {
        try {
            const url = new URL(window.location.href);
            const limitValue = url.searchParams.get('limit');
    
            if (limitValue) {
                $('.btn-show-products').removeClass('selected');
                const selectedBtn = $(`.btn-show-products[data-value="${limitValue}"]`);
                selectedBtn.addClass('selected');
                selectedBtn.closest('.actionBar-dropdown').find('.dropdown-label').text(selectedBtn.find('span').text());
            }
        } catch (e) {}
    }
}
