import wishlist from '../product/wishlist';
import { defaultModal } from '../global/modal';

export default async function renderWishlist(context) {
    let wishlistAction = 'login';
    var context = window.jsContext;
    const customer = context.customer;
    const $body = $('body');

    $('.wishlist-wrapper:not(.wishlist-loaded) .js-wishlist')
        .on('click', event => {
            event.preventDefault();

            switch (wishlistAction) {
                case 'login':
                    // Auth SideBar
                    const modal = defaultModal();
	                modal.close();

                    if (!$body.hasClass('page-type-login')) {
                        if ($('.halo-auth-sidebar').hasClass('is-open')) {
                            $('.halo-auth-sidebar').removeClass('is-open');
                            $body.removeClass('openAuthSidebar');
                        } else {
                            $('.halo-auth-sidebar').addClass('is-open');
                            $body.addClass('openAuthSidebar');
                        }
                    } else {
                        $('[data-login-form]').on('click', event => {
                            event.preventDefault();

                            $('html, body').animate({
                                scrollTop: $('.login').offset().top,
                            }, 700);
                        });
                    }

                    $('.halo-auth-sidebar .close').on('click', event => {
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
                    break;
                case 'toggle':
                    event.currentTarget.classList.toggle('--open');
                    const siblingElement = event.currentTarget.nextElementSibling;
                    if (siblingElement.classList.contains('animated')) {
                        siblingElement.classList.add('animated--out');
                    } else {
                        siblingElement.classList.remove('animated--out');
                    }
                    siblingElement.classList.toggle('animated');

                    break;
            }
             // Handle Click Outside Popup Wishlist
             document.addEventListener('click', (e) => {
                let target = e.target;
                let isClickInsideWishlistMenu = target.closest('.wishlist-menu');
                let isClickInsideWishlistToggle = target.closest('.js-wishlist');
                if (!isClickInsideWishlistMenu && !isClickInsideWishlistToggle) {
                    let openWishlist = document.querySelector('.js-wishlist.--open');
                    if (openWishlist) {
                        $(openWishlist).toggleClass('--open');
                        // handle together function toggle below
                        const siblingElement = openWishlist.nextElementSibling;
                        if (siblingElement.classList.contains('animated')) {
                            siblingElement.classList.add('animated--out');
                        } else {
                            siblingElement.classList.remove('animated--out');
                        }
                        siblingElement.classList.toggle('animated');
                    }
                }
            });
        });

    if (!customer) return;

    fetch('/graphql', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${context.token}`
        },
        body: JSON.stringify({
            query:
                `query wishlist {
                        customer {
                            wishlists {
                                edges {
                                    node {
                                        name
                                        entityId
                                        items {
                                            edges {
                                                node {
                                                    entityId,
                                                    product {
                                                        id,
                                                        entityId
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }`
        })
    })
        .then(res => res.json())
        .then(dataObj => {
            const data = dataObj.data;
            const dataCustomerWishlists = data.customer.wishlists.edges;
            const dataWishlistItems = dataCustomerWishlists.map(wishlist => {
                const listIdProduct =  wishlist.node.items.edges.map(item => {
                    return {
                        productId: item.node.product.entityId,
                        wishListItemId: item.node.entityId
                    }
                });
                return {
                    wishlistId: wishlist.node.entityId,
                    listProduct: listIdProduct
                }
            });
            if (!data.customer) {
                wishlistAction = 'login';
                return true;
            }

            if (!data.customer.wishlists
                || !data.customer.wishlists.edges
                || data.customer.wishlists.edges.length === 0) {
                wishlistAction = 'toggle';
                return true;
            }

            wishlistAction = 'toggle';

            let htmlWishlists = ``;

            // Create wishlistList HTML, active item if contain current product
            dataCustomerWishlists.forEach(wishlist => {
                htmlWishlists += `<li class='wishlist-item'><a class='js-add-to-wishlist' data-wishlist-id='${wishlist.node.entityId}' data-product-id><span><span class='add'>Add To</span><span class='remove'>Remove From</span> ${wishlist.node.name}</span><div class='navList-action-close wishlist-item-close' aria-hidden='true'><svg><use xlink:href='#icon-close'/></svg></div></a></li>`;
                wishlist.node.items.edges.forEach(item => {
                    const els = document.querySelectorAll(`.wishlist-wrapper[data-entity-id='${item.node.product.entityId}']`);
                    for (let i = 0, l = els.length; i < l; i++) {
                        els[i].classList.add('in-wishlist');
                    }
                })
            });

            // Add attribute in wishlist item
            const elWishlistLists = document.querySelectorAll('.wishlist-wrapper:not(.wishlist-loaded) .card-wishlist ul');
            for (let i = 0, l = elWishlistLists.length; i < l; i++) {
                elWishlistLists[i].innerHTML = htmlWishlists + elWishlistLists[i].innerHTML;
                const closestCard = elWishlistLists[i].closest('.wishlist-wrapper');
                let elDataAttr = elWishlistLists[i].querySelectorAll('[data-product-id]');

                elDataAttr.forEach(el => {
                    const dataWishlistId = el.dataset.wishlistId;
                    const currentIdPro = closestCard.dataset.entityId;
                    const idsProCurrentWishlist = dataWishlistItems.find(item => item.wishlistId === parseInt(dataWishlistId, 0)).listProduct;
                    const wishListItemData = idsProCurrentWishlist.find(item => item.productId === parseInt(currentIdPro, 0));

                    if (wishListItemData) {
                        el.classList.add('in-wishlist');
                        el.setAttribute('data-wishlist-item-id', wishListItemData.wishListItemId);
                    }
                    el.dataset.productId = closestCard.dataset.entityId;

                })
                closestCard.classList.add('wishlist-loaded');
            }
        }).then(() => {
            wishlist(context);
        }) // will log JSON result to browser console
        .catch(error => console.error(error));
}