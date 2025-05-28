const fetch = require('node-fetch');

export default function(context) {
    const token = context.token;

    function recentlyBought() {
        var productIDs = context.themeSettings.recently_bought_productID,
            hoursItems = context.themeSettings.recently_bought_hours,
            listHours = JSON.parse("[" + hoursItems + "]"),
            listIDs = JSON.parse("[" + productIDs + "]"),
            text_info = context.themeSettings.recently_bought_text_info,
            text_name = context.themeSettings.recently_bought_text_name,
            changeSlides = 1000*(Number(context.themeSettings.recently_bought_changeSlides));

        var location1 = context.themeSettings.recently_bought_location1,
            location2 = context.themeSettings.recently_bought_location2,
            location3 = context.themeSettings.recently_bought_location3,
            location4 = context.themeSettings.recently_bought_location4,
            location5 = context.themeSettings.recently_bought_location5;

        var ar1 = location1.split(','),
            ar2 = location2.split(','),
            ar3 = location3.split(','),
            ar4 = location4.split(','),
            ar5 = location5.split(',');
        
        const listIDs_length = listIDs.length;

        if (listIDs_length) {
            getProductAndSiteInfo(listIDs).then(data => {
                setInterval(function(){

                    const item = Math.floor(Math.random() * listIDs.length);
                    const locationList = [ar1, ar2, ar3, ar4, ar5];
                    const locationItem = Math.floor(Math.random() * locationList.length);
                    const location = locationList[locationItem];
                    const hour_item = Math.floor(Math.random() * listHours.length);
                    const hours = listHours[hour_item];

                    let cookieHeight = getCookieHeight();

                    if (document.cookie.includes('recently_bought_notification=closed')) {
                        document.getElementById('recently_bought_list').remove();
                    }

                    document.addEventListener('click', function(event) {
                        if (event.target.matches('.halo-recently-bought [data-close-recently-bought]')) {
                            event.preventDefault();
                            document.getElementById('recently_bought_list').remove();
                            document.cookie = 'recently_bought_notification=closed; expires=1; path=/';
                        }
                    });

                    renderProduct(data.site.products.edges[item], text_name, hours, text_info, location, cookieHeight);

                    setTimeout(function() {
                        const element = document.getElementById('recently_bought_list');
                        element.classList.add('hide');
                        element.classList.remove('show');
                    }, changeSlides - 1000);

                }, changeSlides);
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
            }
        `}),
    }).then(res => res.json())
       .then(res => res.data);
    }

    function renderProduct(product, text, hours, info, customer, cookieHeight) {
        if (product) {
            const item = product.product;

            const html = `
                            <div id="RB_${item.entityId}" class="halo-recently-bought">
                                <a href="#" data-close-recently-bought aria-label="Button Close"><svg class="icon"><use xlink:href="#icon-close"></use></svg></a>
                                <div class="recently-bought-inner">
                                    <a class="product-image" href="${item.path}"><img class="image" data-sizes="auto" src="${item.defaultImage.img320px}" alt="${item.defaultImage.altText}" title="${item.defaultImage.altText}" aria-label="${item.defaultImage.altText}"></a>
                                    <div class="product-info">
                                        <p class="text-wrap"><span class="product-name color-secondary f-size-small f-size-tiny-tb f-size-mini-mb">${text}<a class="f-semibold f-root f-size-small-tb f-size-tiny-mb w-s-normal" href="${item.path}" style="-webkit-box-orient: vertical;">${item.name}</a></span></p>
                                        <div class="location-info">${hours} ${info} ${customer}</div>
                                    </div>
                                </div>
                            </div>
                        `;
            
            const listElement = document.getElementById('recently_bought_list');
            listElement.innerHTML = html;

            const productElement = document.getElementById('RB_' + item.entityId);
            if (cookieHeight > 15) {
                productElement.style.bottom = cookieHeight + 'px';
            } else {
                productElement.style.bottom = '';
            }

            listElement.classList.add('show');
            listElement.classList.remove('hide');
        }
    }

    function getCookieHeight() {
        const cookieManager = document.getElementById('consent-manager');
        const cookieUpdate = document.getElementById('consent-manager-update-banner');
        let cookieHeight = 0;

        if (cookieManager || cookieUpdate) {
            if (cookieUpdate) {
                cookieHeight = cookieManager.offsetHeight + cookieUpdate.offsetHeight + 15;
            } else {
                cookieHeight = cookieManager.offsetHeight + 15;
            }
        }

        return cookieHeight;
    }

    if (window.innerWidth > 1024) {
        if (context.themeSettings.haloRecentlyBought) {
            recentlyBought();
        }
    } else {
        if (context.themeSettings.haloRecentlyBought && context.themeSettings.haloRecentlyBought_mobile) {
            recentlyBought();
        }
    }
}
