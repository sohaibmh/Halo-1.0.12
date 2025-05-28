export default function () {
    const productCards = document.querySelectorAll('.card-hover');
        productCards.forEach(productCard => {
        const hoverSections = productCard.querySelectorAll('.hover-section');
        const cardImage = productCard.querySelectorAll('.card-img-container .card-image:not(.card-image-hover)');
        const cardImageHover = productCard.querySelectorAll('.card-img-container .card-image-hover');

        hoverSections.forEach((section, index) => {
            section.addEventListener('mouseover', () => {
                cardImage.forEach(img => img.classList.remove('active'));
                cardImageHover[index].classList.add('active');
            });

            section.addEventListener('mouseout', () => {
                cardImage.forEach(img => img.classList.add('active'));
                cardImageHover[index].classList.remove('active');
            });
        });
    });
}
