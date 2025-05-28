import Swiper from 'swiper/bundle';

export default function(){
    document.querySelectorAll('.productView-nav').forEach(($swiperMain, index) => {
        const $swiperThumb = document.querySelectorAll('.productView-for')[index];
    
        let swiperThumbnail = new Swiper($swiperThumb, {
            direction: 'horizontal',
            loop: false,
            spaceBetween: 22,
            freeMode: true,
            slidesPerView: 4,
            watchSlidesProgress: true,
        });
    
        new Swiper($swiperMain, {
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
    });
}