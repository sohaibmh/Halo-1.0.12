import { addWishlistItems, deleteWishlistItems } from './wishlistHandler';

const addToWishlist = async (context) => {
    const addWishlistButton = document.querySelectorAll('[data-wishlist-add]');
    
    addWishlistButton.forEach(element => {
        const addToListLinks = element.querySelectorAll('.js-add-to-wishlist');

        if (!addToListLinks) return;

        for(const link of addToListLinks) {
            link.addEventListener('click', async (event) => {
                event.preventDefault();

                element.querySelector('.wishlist-menu').classList.add('is-loading');
                const wishlistId = parseInt(link.dataset.wishlistId, 0);
                const productId = parseInt(link.dataset.productId, 0);
                const wishkistItemId = parseInt(link.dataset.wishlistItemId, 0);
                let data = null, result = null;

                if (link.classList.contains('in-wishlist')) {
                    data = await deleteWishlistItems(wishlistId, wishkistItemId, context);
                    result = data.data.wishlist.deleteWishlistItems.result;
                    link.classList.remove('in-wishlist');    

                    const curCard = document.querySelector(`.wishlist-wrapper[data-entity-id='${productId}']`);
                    const curItemInWishLists = curCard.querySelectorAll(`.js-add-to-wishlist.in-wishlist`);
                    if (curItemInWishLists.length === 0)
                        curCard.classList.remove('in-wishlist');

                } else {
                    data = await addWishlistItems(wishlistId, productId, context);
                    result = data.data.wishlist.addWishlistItems.result;
                    const itemAdded = result.items.edges[result.items.edges.length - 1];

                    link.classList.add('in-wishlist');
                    link.setAttribute('data-wishlist-item-id', itemAdded.node.entityId);
                    const curCard = document.querySelector(`.wishlist-wrapper[data-entity-id='${productId}']`);
                    if (!curCard.classList.contains('in-wishlist'))
                        curCard.classList.add('in-wishlist');
                }

                if(data) {
                    element.querySelector('.wishlist-menu').classList.remove('is-loading');
                    
                    if(result) {
                        // Add modal
                    }
                }
            });
        }
    });
}

export default function (context) {
    const customer = context.customer;

    if(!customer) return;

    addToWishlist(context);
}