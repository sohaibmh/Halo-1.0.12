import PageManager from './page-manager';

export default class Page extends PageManager {
    constructor(context) {
        super(context);
    }

    onReady() {
        this.faqsToggle();
        this.haloMultiMap();
    }

    faqsToggle() {
        $('.halo-faqs-content .card .title').on('click', event => {
            event.preventDefault();

            var target = $(event.currentTarget);

            $('.halo-faqs-content .card .title').not(target).removeClass('collapsed');

            if(target.hasClass('collapsed')){
                target.removeClass('collapsed');
            } else{
                target.addClass('collapsed');
            }

            $('.halo-faqs-content .card').each((index, element) => {
                if($('.title', element).hasClass('collapsed')){
                    $(element).find('.collapse').slideDown("slow");
                } else{
                    $(element).find('.collapse').slideUp("slow");
                }
            });
        });
    }

    haloMultiMap() {
		var itemMap = document.querySelectorAll('.halo_maps_elist'),
			thisMap = document.querySelector('#haloMap');

		if (itemMap) {
			itemMap.forEach(item => {
				item.addEventListener('click', () => {
					document.querySelector('.map-active').classList.remove('map-active');
					mapItemClick(item)
				});
			}
		)};

		function mapItemClick(item){
			const mapHtml = item.querySelector('.map-hidden').innerHTML;
			
			item.classList.add('map-active');
			thisMap.innerHTML = mapHtml;
		}
    }
}
