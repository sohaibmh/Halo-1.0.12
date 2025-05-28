export default function() {
    const sidebarMobile = document.querySelector('.page-sidebar-mobile');
    const sidebar = document.querySelector('.page-sidebar');
    const body = document.body;
    const closeBtn = document.querySelector('.page-sidebar .close');

    sidebarMobile.addEventListener('click', function() {
        sidebarMobile.classList.add('is-open');
        sidebar.classList.add('is-open');
        body.classList.add('openSidebar');
    });

    closeBtn.addEventListener('click', function(event) {
        event.preventDefault();

        sidebarMobile.classList.remove('is-open');
        sidebar.classList.remove('is-open');
        body.classList.remove('openSidebar');
    });

    document.addEventListener('click', function(event) {
        if (sidebar.classList.contains('is-open')) {
            const isClickInsideSidebar = sidebar.contains(event.target);
            const isClickInsideSidebarMobile = sidebarMobile.contains(event.target);

            if (!isClickInsideSidebar && !isClickInsideSidebarMobile) {
                sidebarMobile.classList.remove('is-open');
                sidebar.classList.remove('is-open');
                body.classList.remove('openSidebar');
            }
        }
    });

    const filterBlock = document.querySelectorAll('.accordion .accordion-block');

    filterBlock.forEach((item) => {
        const itemList = item.querySelectorAll('.navList-action');
        
        let count = 0;
        
        itemList.forEach((item) => {
            if (item.classList.contains('is-selected')) {
                count++;
            }
        });
        
        const itemCount = item.querySelector('.number-count');
        
        if(count == 0) {
            itemCount.classList.add('d-none');
        } else {
            itemCount.classList.remove('d-none');
        }
        
        itemCount.textContent = `${count}`;
    });
}
