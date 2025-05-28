export default class haloSetMegaMenu{
    constructor() {}

    menuItem(num) {
        return {
            setMegaMenu(param) {
                param = Object.assign({
                    disabled: false,
                    label: '',
                    labelType: '',
                    images: ''
                }, param);

                const scope = document.querySelector(`.navPages-list:not(.navPages-list--user) > li:nth-child(${num})`);

                if (!scope.classList.contains('navPages-item-toggle')) {
                    if (!param.disabled) {
                        const subMegaMenu = scope.querySelector('.container');

                        scope.classList.add('has-megamenu');
                        scope.querySelector('.navPage-subMenu').classList.remove('navPage-subMenu-horizontal');

                        if (!subMegaMenu.querySelector('.imageArea')) {
                            subMegaMenu.insertAdjacentHTML('beforeend', param.images);
                        }

                        subMegaMenu.classList.add('haloCustomScrollbar');
                    } else {
                        const navPagesAction = scope.querySelector('.navPages-action');

                        if (param.labelType === 'new') {
                            navPagesAction.querySelector('.text').insertAdjacentHTML('beforeend', `<span class="navPages-label new-label">${param.label}</span>`);
                        } else if (param.labelType === 'sale') {
                            navPagesAction.querySelector('.text').insertAdjacentHTML('beforeend', `<span class="navPages-label sale-label">${param.label}</span>`);
                        } else if (param.labelType === 'hot') {
                            navPagesAction.querySelector('.text').insertAdjacentHTML('beforeend', `<span class="navPages-label hot-label">${param.label}</span>`);
                        }
                    }
                }

                return this;
            }
        };
    }
}
