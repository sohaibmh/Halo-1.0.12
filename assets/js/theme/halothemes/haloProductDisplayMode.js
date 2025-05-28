export default function() {
    const productListing = document.querySelector('#product-listing-container .productListing');
    const grid = document.querySelectorAll('.grid-view');
    const dropdownLabel = document.querySelector('.dropdown-label');

    if (!grid) return;

    grid.forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault();

            const target = event.currentTarget;
            const index = target.getAttribute('data-index');
            const text = target.textContent;

            if (!target.classList.contains('selected')) {
                setTimeout(() => { 
                    grid.forEach(g => g.classList.remove('selected'));
                    target.classList.add('selected');
                    dropdownLabel.textContent = text;
                    productListing.setAttribute('data-layout', `product-col${index}`);
                }, 100);
            }
        });
    });
}
