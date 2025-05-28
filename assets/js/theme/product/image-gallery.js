import 'easyzoom';
import 'fancybox'

export default class ImageGallery {
    constructor($gallery) {
        this.$mainImageNested = $gallery.find('[data-main-image]');
        this.$mainImage = $gallery.find('.productView-image');
        this.$thumbImage = $gallery.find('.productView-thumb');
        this.$swipImage = $gallery.find('.productView-nav');
        this.$swipThumbnails = $gallery.find('.productView-for');
        this.$selectableImages = $gallery.find('[data-image-gallery-item]');
        this.currentImage = {};
    }

    init() {
        this.bindEvents();
        this.setImageZoom();
        this.fancyboxZoom();
    }

    setMainImage(imgObj) {
        this.currentImage = { ...imgObj };

        this.setActiveThumb();
        this.swapMainImage();
    }

    setAlternateImage(imgObj) {
        if (this.$swipImage.find('.swiper-slide-active')) {
            this.$mainImage = this.$swipImage.find('.swiper-slide-active');
        }

        if (!this.savedImage) {
            this.savedImage = {
                mainImageUrl: this.$mainImage.find('img').attr('src'),
                zoomImageUrl: this.$mainImage.attr('data-zoom-image'),
                mainImageSrcset: this.$mainImage.find('img').attr('srcset'),
                $selectedThumb: this.currentImage.$selectedThumb,
            };
        }

        this.setMainImage(imgObj);
    }

    restoreImage() {
        if (this.savedImage) {
            this.setMainImage(this.savedImage);
            delete this.savedImage;
        }
    }

    selectNewImage(e) {
        e.preventDefault();
        const $target = $(e.currentTarget);
        const imgObj = {
            mainImageUrl: $target.attr('data-image-gallery-new-image-url'),
            zoomImageUrl: $target.attr('data-image-gallery-zoom-image-url'),
            mainImageSrcset: $target.attr('data-image-gallery-new-image-srcset'),
            $selectedThumb: $target,
            mainImageAlt: $target.children().first().attr('alt'),
        };
        this.setMainImage(imgObj);
    }

    setActiveThumb() {
        this.$selectableImages.removeClass('is-active');
        if (this.currentImage.$selectedThumb) {
            this.currentImage.$selectedThumb.addClass('is-active');
        }
    }

    swapMainImage() {
        if (this.$swipImage.find('.swiper-slide-active')) {
            this.$mainImage = this.$swipImage.find('.swiper-slide-active');
        }

        if (this.$thumbImage) {
            this.$thumbImage = this.$swipThumbnails.find('.swiper-slide-thumb-active');
        }

        const isBrowserIE = navigator.userAgent.includes('Trident');

        this.easyzoom.data('easyZoom').swap(
            this.currentImage.mainImageUrl,
            this.currentImage.zoomImageUrl,
            this.currentImage.mainImageSrcset,
        );
        this.$mainImage.attr({href: this.currentImage.mainImageUrl})
            .attr({ 'data-zoom-image': this.currentImage.zoomImageUrl, })
            .find('img').attr({src: this.currentImage.mainImageUrl})
            .attr({srcset: this.currentImage.mainImageSrcset})

        if (!this.$swipImage.length) {
            $('html, body').animate({
                scrollTop: this.$mainImage.offset().top,
            }, 700);
        }

        this.$mainImage.attr({
            'data-zoom-image': this.currentImage.zoomImageUrl,
        });

        this.$mainImageNested.attr({
            alt: this.currentImage.mainImageAlt,
            title: this.currentImage.mainImageAlt,
        });

        if (isBrowserIE) {
            const fallbackStylesIE = {
                'background-image': `url(${this.currentImage.mainImageUrl})`,
                'background-position': 'center',
                'background-repeat': 'no-repeat',
                'background-origin': 'content-box',
                'background-size': 'contain',
            };

            this.$mainImageNested.css(fallbackStylesIE);
        }
    }

    checkImage() {
        const $imageContainer = $('.productView-image');
        const containerHeight = $imageContainer.height();
        const containerWidth = $imageContainer.width();

        const $image = this.easyzoom.data('easyZoom').$zoom;
        const height = $image.height();
        const width = $image.width();

        if (height < containerHeight || width < containerWidth) {
            this.easyzoom.data('easyZoom').hide();
        }
    }

    setImageZoom() {
        this.easyzoom = this.$mainImage.easyZoom({
            onShow: () => this.checkImage(),
            errorNotice: '',
            loadingNotice: '',
        });
    }

    fancyboxZoom() {
        $('[data-fancybox="images"]').fancybox({
            buttons: [
                "zoom",
                "slideShow",
                "close"
            ]
        });
    }

    bindEvents() {
        this.$selectableImages.on('click', this.selectNewImage.bind(this));
    }
}
