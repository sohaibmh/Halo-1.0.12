import utils from '@bigcommerce/stencil-utils';
import haloAddOptionForProduct from './haloAddOptionForProduct';
import haloProductImageHover from './haloProductImageHover';

export default function(context){
	function renderProduct() {
        const list = getlistItems();
		const $this = document.querySelector('#halo-recently-viewed-popup');
		const $wrapper = $this.querySelector('.swiper-wrapper');
		const options = {template: 'halothemes/product/halo-product-template'};
		let num = 0;

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
			const listItems = JSON.parse(localStorage.getItem('_halo_recently_viewed') || '[]');
			return listItems;
		}

		function getProduct(num) {
			const productId = list[num];

			if (!productId) {
				document.querySelector('#halo-recently-viewed-popup .halo-block-content').style.display = 'block';

				return
			}

			utils.api.product.getById(productId, options, (err, response) => {
				if (err) return;
				$wrapper.insertAdjacentHTML('beforeend', response);
				num++;
				if (num+1 < Number($this.dataset.limit)) getProduct(num);
				document.querySelector('#halo-recently-viewed-popup .halo-block-content').style.display = 'none';
				$wrapper.querySelectorAll('.productCarousel-slide').forEach((slide, index) => {
					setTimeout(() => {
						slide.classList.add('is-loaded');
					}, index * 500);
				});
				haloProductImageHover();
				haloAddOptionForProduct(context, 'halo-recently-viewed-popup');

				if (num+1 == list.length) {
					document.querySelector('#halo-recently-viewed-popup').classList.add('is-show');
				}
			});
		}
    }

	function getProducts() {
        const name = '_halo_recently_viewed';
		const recentlyViewed = document.querySelector('#halo-recently-viewed-popup');
        let listItems = JSON.parse(localStorage.getItem(name) || '[]');
        localStorage.setItem(name, JSON.stringify(listItems.slice(0, Number(recentlyViewed.dataset.limit))));
    }

	renderProduct();
	getProducts();
	
	$(document).ready(function() {
		$(document).on('click', '.expand-recently-viewed', function() {
			$('body').addClass('has-recently-viewed');
			if($('.halo-social-media').hasClass('is-show-media')) {
				$('.expand-social-media').removeClass('is-open');
				$('.halo-social-media').removeClass('is-show-media');
			}
		});

		$(document).on('click', '.expand-social-media', function() {
			if($('.halo-social-media').hasClass('is-show-media')) {
				$('.expand-social-media').removeClass('is-open');
				$('.halo-social-media').removeClass('is-show-media');
			} else {
				$('.expand-social-media').addClass('is-open');
				$('.halo-social-media').addClass('is-show-media');
			}
		});


		const backToTopBtn = document.getElementById('backtoTop');

	    backToTopBtn.onclick = function() {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		};	
	});
}
