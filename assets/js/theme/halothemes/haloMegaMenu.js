import haloSetMegaMenu from './haloSetMegaMenu';
    window.haloSetMegaMenu = haloSetMegaMenu;

export default function (context) {
	var haloSetMegaMenu = new window.haloSetMegaMenu();
	const urlStoreHash = document.querySelector('.halo-global-block').getAttribute('data-store-hash-image');

	var mega_position1 = context.themeSettings.mega_position1,
		mega_position2 = context.themeSettings.mega_position2,
		mega_position3 = context.themeSettings.mega_position3,
		mega_position4 = context.themeSettings.mega_position4,
		mega_position5 = context.themeSettings.mega_position5,
		mega_position6 = context.themeSettings.mega_position6,
		mega_position7 = context.themeSettings.mega_position7,
		mega_position8 = context.themeSettings.mega_position8,
		mega_position9 = context.themeSettings.mega_position9,
		mega_position10 = context.themeSettings.mega_position10;

	var arr1 = mega_position1.split(','),
		arr2 = mega_position2.split(','),
		arr3 = mega_position3.split(','),
		arr4 = mega_position4.split(','),
		arr5 = mega_position5.split(','),
		arr6 = mega_position6.split(','),
		arr7 = mega_position7.split(','),
		arr8 = mega_position8.split(','),
		arr9 = mega_position9.split(','),
		arr10 = mega_position10.split(',');

	var megaList = [arr1, arr2, arr3, arr4, arr5, arr6, arr7, arr8, arr9, arr10];

	function setItemMegaMenu() {
		if (window.matchMedia('(min-width: 1025px)').matches) {
			document.querySelectorAll('.navPages-list-megamenu > li:not(.navPages-item-toggle)').forEach(function (item) {
				item.addEventListener('mouseover', handleMouseOver);
				item.addEventListener('focusin', handleMouseOver);
				item.addEventListener('mouseout', handleMouseOut);
				item.addEventListener('focusout', handleMouseOut);
			});
		}

		window.matchMedia('(min-width: 1025px)').addEventListener('change', () => {
			document.querySelectorAll('.navPages-list-megamenu > li:not(.navPages-item-toggle)').forEach(function (item) {
				item.addEventListener('mouseover', handleMouseOver);
				item.addEventListener('focusin', handleMouseOver);
				item.addEventListener('mouseout', handleMouseOut);
				item.addEventListener('focusout', handleMouseOut);
			});
		});
		
		function handleMouseOver(event) {
			const target = event.currentTarget;
			const subMenu = target.querySelector('.navPage-subMenu');
			const numberItem = Array.from(target.parentElement.children).indexOf(target) + 1;

			if(subMenu) {
				target.classList.add('is-open');
				subMenu.classList.add('is-open');
			
				if (!target.classList.contains('has-megamenu')) {
					loadMegaMenu(target, numberItem);
				}
			}
		}
		
		function handleMouseOut(event) {
			const target = event.currentTarget;
			const subMenu = target.querySelector('.navPage-subMenu');

			if(subMenu) {
				target.classList.remove('is-open');
				subMenu.classList.remove('is-open');
			}
		}		

		document.querySelector('#halo-menu-sidebar').addEventListener('click', function(event) {
            if (event.target.matches('.navPages-list:not(.navPages-list--user) .navPages-action:not(.no-subMenu)')) {
				event.preventDefault();

                const target = event.target.closest('li');
                const numberItem = Array.from(target.parentElement.children).indexOf(target) + 1;

                if (!target.classList.contains('has-megamenu')) {
                    loadMegaMenu(target, numberItem);
                }
            }
        });
	}

	function loadMegaMenu(target, numberItem) {
		let mega_image = '';
	
		for (let i = 0; i < megaList.length; i++) {
			const [position, image, link] = megaList[i];
		
			if (position == numberItem) {
				if (image && link) {
					mega_image = `
						<div class="imageArea">
							<div class="megamenu-right-item">
								<div class="image d-inline-block">
									<a href="${link}" class="d-block w-100 o-h">
										<img src="${urlStoreHash}${image}" alt="${image}" title="${image}"/>
									</a>
								</div>
							</div>
						</div>`;
		
					target.classList.add('has-image');
				}
		
				if (!image && !link) {
					target.classList.add('no-image');
				}
		
				haloSetMegaMenu.menuItem(position).setMegaMenu({ images: mega_image });
			}
		}
	}

	function megaMenuLabel() {
		const { mega_menu_new_label, mega_menu_new_label_text, mega_menu_hot_label, mega_menu_hot_label_text, mega_menu_sale_label, mega_menu_sale_label_text } = context.themeSettings;
	
		if (mega_menu_new_label && mega_menu_new_label_text) {
			haloSetMegaMenu.menuItem(mega_menu_new_label).setMegaMenu({
				label: mega_menu_new_label_text,
				labelType: "new",
				disabled: true
			});
		}
	
		if (mega_menu_hot_label && mega_menu_hot_label_text) {
			haloSetMegaMenu.menuItem(mega_menu_hot_label).setMegaMenu({
				label: mega_menu_hot_label_text,
				labelType: "hot",
				disabled: true
			});
		}
	
		if (mega_menu_sale_label && mega_menu_sale_label_text) {
			haloSetMegaMenu.menuItem(mega_menu_sale_label).setMegaMenu({
				label: mega_menu_sale_label_text,
				labelType: "sale",
				disabled: true
			});
		}
	}

	megaMenuLabel();

	window.onload = setItemMegaMenu();
}
