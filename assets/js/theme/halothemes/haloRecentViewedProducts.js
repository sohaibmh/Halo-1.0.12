import utils from '@bigcommerce/stencil-utils';
import haloAddOptionForProduct from './haloAddOptionForProduct';
import haloProductImageHover from './haloProductImageHover';

export default function (context) {
    const list = getlistItems();
    const $this = document.querySelector('#halo-recent-viewed-products');
    const $wrapper = $this.querySelector('.swiper-wrapper');
    const options = {template: 'halothemes/product/halo-product-template'};
    let num = 0;

    if (list.length == 0) $this.style.display = 'none';
    load();

    function load() {
        const handleIntersection = (entries, observer) => {
        if (!entries[0].isIntersecting) return;
            observer.unobserve($this);
            getProduct(num);
        };

        new IntersectionObserver(handleIntersection.bind($this), { rootMargin: '0px 0px 400px 0px' }).observe($this);
    }

    function getlistItems() {
        const productId = parseInt(document.querySelector('[name="product_id"]').value);
        const listItems = JSON.parse(localStorage.getItem('_halo_recently_viewed') || '[]');
        if (productId && listItems.includes(parseInt(productId))) listItems.splice(listItems.indexOf(parseInt(productId)), 1);
        return listItems;
    }

    function getProduct() {
        const productId = list[num];
        if (!productId) return;
        utils.api.product.getById(productId, options, (err, response) => {
            if (err) return;
            $wrapper.insertAdjacentHTML('beforeend', response);
            num++;
            if (num+1 < Number($this.dataset.limit)) getProduct(num);
            haloProductImageHover();
            haloAddOptionForProduct(context, 'halo-recent-viewed-products');
        });
    }
}
