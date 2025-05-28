import Swiper from 'swiper/bundle';

export default function(){
    const $swiper = document.querySelectorAll('.haloSwiper');

    if (!$swiper) return;

    const handler = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const $this = entry.target;

                observer.unobserve($this);
                initSwiper($this);
            }
        })
    }

    const observer = new IntersectionObserver(handler, { threshold: 0.25 });

    $swiper.forEach(element => {
        observer.observe(element);
    });

    function initSwiper($this) {
        const spaceDes = $this.dataset.swiperSpaceDes || 10;
        const spaceTab = $this.dataset.swiperSpaceTab || 10;
        const spaceMob = $this.dataset.swiperSpaceMob || 10;
        const effect = $this.dataset.swiperEffect || false;
        const slidesPerViewMob = $this.dataset.perViewMob || 1;
        const slidesPerViewTab = $this.dataset.perViewTab || 1;
        const slidesPerViewDes = $this.dataset.perViewDes || 1;
        const rowsMob = $this.dataset.rowsMob || 1;
        const rowsTab = $this.dataset.rowsTab || 1;
        const rowsDes = $this.dataset.rowsDes || 1;
        const navMob = $this.dataset.swiperNavMob === 'true' || false;
        const navTab = $this.dataset.swiperNavTab === 'true' || false;
        const navDes = $this.dataset.swiperNavDes === 'true' || false;
        const pagMob = $this.dataset.swiperPagMob === 'true' || false;
        const pagTab = $this.dataset.swiperPagTab === 'true' || false;
        const pagDes = $this.dataset.swiperPagDes === 'true' || false;
        const direction = $this.dataset.swiperDirection || 'horizontal';
        const autoplay = $this.dataset.swiperAutoplay === 'true' || false;
        const speed = $this.dataset.swiperSpeed || 600;
        const delay = $this.dataset.swiperDelay || 5000;
        const loop = $this.dataset.swiperLoop === 'true' || false;
        const autoHeight = $this.dataset.autoHeight === 'true' || false;
        const freeMode = $this.dataset.freeMode === 'true' || false;
        const enabledMobile = $this.dataset.swiperEnableMb === 'true';
        const disabledMobile = $this.dataset.swiperDisableMb === 'true';
        const breakpoint = window.matchMedia( '(min-width: 551px)');   
        let mySwiper;

        const enableSwiper = function() {
            mySwiper = new Swiper($this, {
                loop: loop,
                autoHeight: autoHeight,
                grabCursor: true,
                speed: speed,
                spaceBetween: spaceMob,
                freeMode: freeMode,
                direction: direction,
                slidesPerView: slidesPerViewMob,
                navigation: {
                    enabled: navMob,
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                pagination: {
                    enabled: pagMob,
                    el: '.swiper-pagination',
                    clickable: true,
                },
                autoplay: {
                    enabled: autoplay,
                    delay: delay,
                    disableOnInteraction: false,
                },
                effect: effect,
                creativeEffect: {
                    prev: {
                        shadow: true,
                        translate: [0, 0, -200],
                    },
                    next: {
                        translate: ['100%', 0, 0],
                    },
                },
                grid: {
                    fill: "row",
                    rows: rowsMob,
                },
                breakpoints: {
                    551: {
                        slidesPerView: slidesPerViewTab,
                        spaceBetween: spaceTab,
                        navigation: {
                            enabled: navTab,
                        },
                        pagination: {
                            enabled: pagTab,
                        },
                        grid: {
                            rows: rowsTab,
                        }
                    },
                    1025: {
                        slidesPerView: slidesPerViewDes,
                        spaceBetween: spaceDes,
                        navigation: {
                            enabled: navDes,
                        },
                        pagination: {
                            enabled: pagDes,
                        },
                        grid: {
                            rows: rowsDes,
                        }
                    }
                }
            });
        };

        const breakpointChecker = function() {
            if (breakpoint.matches === true ) {
                if (enabledMobile) {
                    if(mySwiper !== undefined) {
                        mySwiper.destroy();
                        return
                    }
                } else {
                    enableSwiper();
                }
            } else if (breakpoint.matches === false ) {
                if (disabledMobile) {
                    if(mySwiper !== undefined) {
                        mySwiper.destroy();
                        return
                    }
                } else {
                    enableSwiper();
                }
            }
        };

        breakpoint.addListener(breakpointChecker);
        breakpointChecker();
    }
}
