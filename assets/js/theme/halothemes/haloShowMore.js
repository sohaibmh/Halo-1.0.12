import haloAddOptionForProduct from './haloAddOptionForProduct';

export default function(context, limit) {
    const categoryPage = document.querySelector(".page-type-category");
    const showMorebutton = document.querySelector("#page-showmoreBtn > a");
    const pageList = document.querySelectorAll(".halo-page .halo-content .halo-item-child");

    if(pageList && pageList.length < limit) {
        if (!showMorebutton.classList.contains('disable')) {
            showMorebutton.classList.add('disable')
        }
    }

    if (!showMorebutton) return;

    showMorebutton.addEventListener('click', async (e) => {
        e.preventDefault();

        showMorebutton.classList.add('loading');

        const currentPage = document.querySelector(".pagination-item--current");
        const nextPage = currentPage.nextElementSibling;
        const nextPageLink = nextPage.querySelector("a").getAttribute("href");

        try {
            const response = await fetch(nextPageLink.replace('http://', '//'));
            const dataHTML = await response.text();

            const parser = new DOMParser();
            const newDocument = parser.parseFromString(dataHTML, 'text/html');

            const newItemList = newDocument.querySelectorAll(".halo-page .halo-item-child");
            const haloContent = document.querySelector(".halo-page .halo-content");

            for (let newItem of newItemList) {
                haloContent.insertAdjacentElement('beforeend', newItem);
                showMorebutton.classList.remove('loading');
                newItem.querySelector('[data-halo-load="animation"]').classList.add('animated');
            }

            if (categoryPage) {
                const newPaginationInfo = newDocument.querySelector(".pagination-info");
                const paginationInfo = document.querySelector(".pagination-info");

                paginationInfo.innerHTML = newPaginationInfo.innerHTML;
                haloAddOptionForProduct(context, 'product-listing-container');
            }

            currentPage.classList.remove("pagination-item--current");
            nextPage.classList.add("pagination-item--current");

            const isNextPage = document.querySelector(".pagination-item--current").nextElementSibling;

            if (!isNextPage || isNextPage.classList.contains("pagination-item--next")) {
                showMorebutton.classList.add('disable')
            }
        } catch (error) {
            console.error(error);
        }
    });
}
