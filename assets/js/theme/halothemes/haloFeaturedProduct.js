import utils from '@bigcommerce/stencil-utils';
import Swiper from 'swiper/bundle';
import ProductDetails from '../common/product-details';

export default function (context) {
    if (context.themeSettings.product_featured == true) {
        const token = context.token;
        const curCode = document.querySelector('.body').getAttribute('data-currency-code');
        const productFeatured = document.querySelector('#halo-featured-product');
        const productFeaturedID = context.themeSettings.product_featured_id;
        const productFeaturedTemplate = {template: 'halothemes/product/halo-featured-product-tmp'};
        const productList = document.querySelector('#halo-bestseller-product');
        const productListID = JSON.parse(`[${context.themeSettings.product_featured_list_id}]`);

        if (!productList) return;
        const productListWrapper = productList.querySelector('.swiper-wrapper');
        let num = 0;

        if (!productFeatured) productFeatured.style.display = 'none';

        const productFeaturedWrapper = productFeatured.querySelector('.halo-featured-product-wrapper');

        load();

        function load() {
            const handleIntersection = (entries, observer) => {
            if (!entries[0].isIntersecting) return;
                observer.unobserve(productFeatured);
                getFeaturedProduct();
                getProductList(num);
            };

            new IntersectionObserver(handleIntersection.bind(productFeatured), { rootMargin: '0px 0px 400px 0px' }).observe(productFeatured);
        }

        function getFeaturedProduct() {
            if (productFeatured && productFeaturedID)  {
                utils.api.product.getById(productFeaturedID, productFeaturedTemplate, (err, response) => {
                    if (err) return;
                    if(!productFeatured.querySelector('.halo-productView')) {
                        productFeaturedWrapper.insertAdjacentHTML('beforeend', response);
                        productFeatured.querySelector('.product-sample').remove();
                        const scope = '#halo-featured-product';
                        const $swiperMain = document.querySelector('.productView-nav');
                        const $swiperThumb = document.querySelector('.productView-for');

                        initSwiper();

                        function initSwiper() {
                            let swiperThumbnail = new Swiper($swiperThumb, {
                                direction: 'horizontal',
                                loop: false,
                                spaceBetween: 22,
                                freeMode: true,
                                slidesPerView: 4,
                                watchSlidesProgress: true,
                            });
                            const swiperProduct = new Swiper($swiperMain, {
                                    slidesPerView: 1,
                                    spaceBetween: 0,
                                    loop: true,
                                    speed: 800,
                                    pagination: {
                                        el: '.swiper-pagination',
                                        clickable: true,
                                    },
                                    thumbs: {
                                    swiper: swiperThumbnail,
                                },
                            });
                        }

                        var productDetails = new ProductDetails($(scope), context);
                        productDetails.setProductVariant();

                        return productDetails;
                    }
                });
            }
        }

        function getProductAndSiteInfo(arr) {
            return fetch('/graphql', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              },
              body: JSON.stringify({
                query: `
                  query MyQuery {
                        site {
                            products (entityIds: [`+arr+`]) {
                                edges {
                                product: node {
                                    ...ProductFields
                                    }
                                }
                            }
                            currency (currencyCode: `+curCode+`) {
                                display {
                                    symbol
                                    symbolPlacement
                                    decimalToken
                                    thousandsToken
                                    decimalPlaces
                                }
                            }
                            settings {  
                                tax {  
                                    plp  
                                }  
                            }
                        }
                    }
                    fragment ProductFields on Product {
                        id
                        entityId
                        name
                        path
                        defaultImage {
                            img320px: url(width: 320)
                            altText
                        }
                        reviews {
                            edges {
                                node {
                                    rating
                                }
                            }
                        }
                        pricesWithTax: prices(includeTax: true, currencyCode: `+curCode+`) {  
                            priceRange {
                                min {
                                    ...MoneyFields
                                }
                                max {
                                    ...MoneyFields
                                }
                            }
                            salePrice {  
                                ...MoneyFields  
                            }  
                            retailPrice {
                                ...MoneyFields
                            }
                            basePrice {
                                ...MoneyFields
                            }
                            price {
                                ...MoneyFields
                            }
                        }
                        pricesWithoutTax: prices(includeTax: false, currencyCode: `+curCode+`) {  
                            priceRange {
                                min {
                                    ...MoneyFields
                                }
                                max {
                                    ...MoneyFields
                                }
                            }
                            salePrice {  
                                ...MoneyFields  
                            }  
                            retailPrice {
                                ...MoneyFields
                            }
                            basePrice {
                                ...MoneyFields
                            }
                            price {
                                ...MoneyFields
                            }
                        }
                    }
                    fragment MoneyFields on Money {
                        value
                        currencyCode
                    }
              `}),
        }).then(res => res.json())
            .then(res => res.data);
        }

        function formatMoney(n, c, d, t) {
            var c = isNaN(c = Math.abs(c)) ? 2 : c,
                d = d == undefined ? "." : d,
                t = t == undefined ? "," : t,
                s = n < 0 ? "-" : "",
                i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
                j = (j = i.length) > 3 ? j % 3 : 0;
    
            return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
        }

        function renderProduct(products, sttTax, curDisplay) {
            if (products && products.length > 0) {
                products.forEach((item, index) => {
                    const product = item.product;
                    const review = product.reviews.edges.length;
                    const symbol = curDisplay.symbol;
                    const symbolPlacement = curDisplay.symbolPlacement.toLowerCase();
                    const decimalToken = curDisplay.decimalToken;
                    const decimalPlaces = curDisplay.decimalPlaces;
                    const thousandsToken = curDisplay.thousandsToken;
                    const priceTax = sttTax == 'EX' ? product.pricesWithoutTax : product.pricesWithTax;
                    let price, star;

                    if (review) {
                        star = `<span role="img" class="d-inline-block v-a-middle f-size-tiny rating-filter" aria-label="${product.name}">
                            <span class="icon icon--ratingFull"><svg><use href="#icon-star" /></svg></span>
                            <span class="icon icon--ratingFull"><svg><use href="#icon-star" /></svg></span>
                            <span class="icon icon--ratingFull"><svg><use href="#icon-star" /></svg></span>
                            <span class="icon icon--ratingFull"><svg><use href="#icon-star" /></svg></span>
                            <span class="icon icon--ratingFull"><svg><use href="#icon-star" /></svg></span>
                        </span>`
                    } else {
                        star = `<span role="img" class="d-inline-block v-a-middle f-size-tiny rating-filter" aria-label="${product.name}"></span>
                            <span class="icon icon--ratingEmpty"><svg><use href="#icon-star" /></svg></span>
                            <span class="icon icon--ratingEmpty"><svg><use href="#icon-star" /></svg></span>
                            <span class="icon icon--ratingEmpty"><svg><use href="#icon-star" /></svg></span>
                            <span class="icon icon--ratingEmpty"><svg><use href="#icon-star" /></svg></span>
                            <span class="icon icon--ratingEmpty"><svg><use href="#icon-star" /></svg></span>
                        </span>`
                    }

                    if ($('.body').hasClass('is-login') || context.checkHidePrice !== true) {
                        if (priceTax.priceRange.min.value < priceTax.priceRange.max.value && context.themeSettings.price_ranges) {
                            const priceMin = (symbolPlacement == 'left' ? symbol : '') + (formatMoney(priceTax.priceRange.min.value, decimalPlaces, decimalToken, thousandsToken)) + (symbolPlacement != 'left' ? symbol : '');
                            const priceMax = (symbolPlacement == 'left' ? symbol : '') + (formatMoney(priceTax.priceRange.max.value, decimalPlaces, decimalToken, thousandsToken)) + (symbolPlacement != 'left' ? symbol : '');
    
                            price = `<div class="price-section price-section--${sttTax == 'EX' ? 'withoutTax' : 'withTax'} non-sale-price--${sttTax == 'EX' ? 'withoutTax' : 'withTax'} price-none" style="display: none;">
                                        <span data-product-non-sale-price-without-tax="" class="price price--non-sale"></span>
                                    </div>
                                    <div class="price-section price-section--${sttTax == 'EX' ? 'withoutTax' : 'withTax'}">
                                        <span data-product-price-without-tax="" class="price price--${sttTax == 'EX' ? 'withoutTax' : 'withTax'}">${priceMin} - ${priceMax}</span>
                                    </div>`;
                        } else {
                            const priceDef = (symbolPlacement == 'left' ? symbol : '') + (formatMoney(priceTax.price.value, decimalPlaces, decimalToken, thousandsToken)) + (symbolPlacement != 'left' ? symbol : '');
    
                            if (priceTax.retailPrice == null) {
                                if (priceTax.basePrice.value > priceTax.price.value) {
                                    const priceBas = (symbolPlacement == 'left' ? symbol : '') + (formatMoney(priceTax.basePrice.value, decimalPlaces, decimalToken, thousandsToken)) + (symbolPlacement != 'left' ? symbol : '');
    
                                    price = `<div class="price-section price-section--${sttTax == 'EX' ? 'withoutTax' : 'withTax'} non-sale-price--${sttTax == 'EX' ? 'withoutTax' : 'withTax'}">
                                                <span data-product-non-sale-price-without-tax="" class="price price--non-sale">${priceBas}</span>
                                            </div>
                                            <div class="price-section price-section--${sttTax == 'EX' ? 'withoutTax' : 'withTax'}">
                                                <span data-product-price-without-tax="" class="price price--${sttTax == 'EX' ? 'withoutTax' : 'withTax'}">${priceDef}</span>
                                            </div>`;
                                } else {
                                    price = `<div class="price-section price-section--${sttTax == 'EX' ? 'withoutTax' : 'withTax'} non-sale-price--${sttTax == 'EX' ? 'withoutTax' : 'withTax'} price-none" style="display: none;">
                                                <span data-product-non-sale-price-without-tax="" class="price price--non-sale"></span>
                                            </div>
                                            <div class="price-section price-section--${sttTax == 'EX' ? 'withoutTax' : 'withTax'}">
                                                <span data-product-price-without-tax="" class="price price--${sttTax == 'EX' ? 'withoutTax' : 'withTax'}">${priceDef}</span>
                                            </div>`;
                                }
                            } else {
                                if (priceTax.retailPrice.value > priceTax.price.value) {
                                    const priceRet = (symbolPlacement == 'left' ? symbol : '') + (formatMoney(priceTax.retailPrice.value, decimalPlaces, decimalToken, thousandsToken)) + (symbolPlacement != 'left' ? symbol : '');
                                
                                    price = `<div class="price-section price-section--${sttTax == 'EX' ? 'withoutTax' : 'withTax'} non-sale-price--${sttTax == 'EX' ? 'withoutTax' : 'withTax'}">
                                                <span data-product-non-sale-price-without-tax="" class="price price--non-sale">${priceRet}</span>
                                            </div>
                                            <div class="price-section price-section--${sttTax == 'EX' ? 'withoutTax' : 'withTax'}">
                                                <span data-product-price-without-tax="" class="price price--${sttTax == 'EX' ? 'withoutTax' : 'withTax'}">${priceDef}</span>
                                            </div>`;
                                } else {
                                    price = `<div class="price-section price-section--${sttTax == 'EX' ? 'withoutTax' : 'withTax'} non-sale-price--${sttTax == 'EX' ? 'withoutTax' : 'withTax'} price-none" style="display: none;">
                                                <span data-product-non-sale-price-without-tax="" class="price price--non-sale"></span>
                                            </div>
                                            <div class="price-section price-section--${sttTax == 'EX' ? 'withoutTax' : 'withTax'}">
                                                <span data-product-price-without-tax="" class="price price--${sttTax == 'EX' ? 'withoutTax' : 'withTax'}">${priceDef}</span>
                                            </div>`;
                                }
                            }
                        }
                    } else {
                        price = '<p translate>Log in for pricing</p>';
                    }
                
                    const html = `
                        <div data-product-slide class="productCarousel-slide swiper-slide">
                            <article class="card animated b-r-10">
                                <div class="card-wrapper d-flex a-i-center">
                                    <figure class="card-figure">
                                        <a href="${product.path}" class="card-figure__link pos-relative" aria-label="${product.name}" data-event-type="product-click">
                                            <div class="card-img-container halo-fadeZoom">
                                                <img class="card-image w-100" data-sizes="auto" src="${product.defaultImage.img320px}" alt="${product.defaultImage.altText}" title="${product.defaultImage.altText}" aria-label="${product.defaultImage.altText}">
                                            </div>
                                        </a>
                                    </figure>
                                    <div class="card-body">
                                        <div class="card-info">
                                            <a class="card-title f-medium" aria-label="${product.name}" href="${product.path}" data-event-type="product-click">${product.name}</a>
                                        </div>
                                        <p class="card-text" data-test-info-type="productRating">
                                            <span class="rating--small">${star}</span>
                                        </p>
                                        <div class="card-text" data-test-info-type="price">${price}</div>
                                    </div>
                                </div>
                            </article>
                        </div>
                    `;
                    productListWrapper.innerHTML += html;
                
                    if (index === products.length - 1) {
                        productList.querySelectorAll('.product-sample').forEach(element => element.remove());
                        
                        productList.classList.add('is-loaded');
                    }
                });                
            }
        }           

        function getProductList() {
            if (productListID.length) {
                getProductAndSiteInfo(productListID).then(data => {
                    renderProduct(data.site.products.edges, data.site.settings.tax.plp, data.site.currency.display);
                });
            }
        }
    }
}
