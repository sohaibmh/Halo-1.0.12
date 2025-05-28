import _ from 'lodash';
import utils from '@bigcommerce/stencil-utils';
import { defaultModal, showAlertModal } from '../global/modal';
import ShippingEstimator from '../cart/shipping-estimator';
import checkIsGiftCertValid from '../common/gift-certificate-validator';
import { createTranslationDictionary } from '../common/utils/translations-utils';
import haloCalculateFreeShipping from './haloCalculateFreeShipping';

export default function (context) {
	var $cartContent = $('[data-cart-content]'),
		$cartMessages = $('[data-cart-status]'),
    	$cartTotals = $('[data-cart-totals]'),
    	$overlay = $('[data-cart] .loadingOverlay');

	if(context.themeSettings.halo_QuickEditCart == true){
		$(document).on('click', '[data-cart-edit-id]', event => {
			event.preventDefault();
			
			const $target = $(event.currentTarget),
				productId = $target.data('cart-edit-id'),
	            itemId = $target.data('cartItemid'),
	            $qty = $target.data('cart-edit-quantity');

	        const modal = defaultModal(),
	        	options = {
		            template: 'cart/modals/configure-product',
		        },
		        options2 = {
		            template: 'cart/modals/configure-product-2',
		        };

		    modal.$modal.addClass('modal modal--editOptions');
			if ($('body').hasClass('has-activeQuickViewModal')) {
				$('body').removeClass('has-activeQuickViewModal');
			}
	        modal.open({ size: 'medium' });
	        modal.$modal.find('> .modal-close').remove();

	        utils.api.productAttributes.configureInCart(itemId, options2, (err2, response2) => {
	            utils.api.product.getById(productId, options, (err, response) => {
	                modal.updateContent(response);

	                const $firstItem = modal.$content.find('.product-edit-itemFirst'),
	                	$form = $firstItem.find('.form'),
	                	$formQty = $firstItem.find('.product-edit-increment');

	                $firstItem.attr('data-product-edit-item-id', itemId);
	                $form.find('.product-edit-option').prepend(response2.content);
	                $form.find('[name=qty\\[\\]]').attr('value', $qty);
	                $formQty.find('.form-input').attr({
	                    'cart-itemid' : itemId,
	                    'id' : 'editqty-' + itemId,
	                    'value': $qty
	                });
	                $formQty.find('.form-label').attr({
	                	'for': 'editqty-' + itemId
	                });

	                utils.api.productAttributes.optionChange(productId, $form.serialize(), 'products/bulk-discount-rates', (err, response) => {
		                const attributesData = response.data || {};
		                const attributesContent = response.content || {};

		                updateProductAttributes($firstItem, attributesData);
		                updateView($firstItem, attributesData, attributesContent);
		            });

		            setProductVariant($firstItem, $form);
	            });
	        });
		});

		$(document).on('change', '[data-product-edit-item-id] .form-input[cart-itemid]', event => {
			const $target = $(event.currentTarget);
	        var preVal= $target.data('preval');
	        event.preventDefault();

	        listenQuantityChangeUpdate($target, preVal);
		});

		$(document).on('change', '[data-product-edit-option-change]' , event => {
	        const $changedOption = $(event.target);
	        const $item = $changedOption.parents('.product-edit-item');
	        const $form = $changedOption.parents('form');
	        const productId = $('[name="product_id"]', $form).val();

	        utils.api.productAttributes.optionChange(productId, $form.serialize(), 'products/bulk-discount-rates', (err, response) => {
	            const attributesData = response.data || {};
		        const attributesContent = response.content || {};

	            updateProductAttributes($item, attributesData);
	            updateView($item, attributesData, attributesContent);
	        });

	        setProductVariant($item, $form);
	    });

	    $(document).on('click', '[data-edit-cart-add-more]', event => {
	        event.preventDefault();
	    	
	    	var count = parseInt($('.modal--editOptions [data-count]').attr('data-count')),
				product = $('.modal--editOptions .product-edit-itemFirst').clone().removeClass('product-edit-itemFirst');

	        product.appendTo('.modal--editOptions .product-edit-wrapper');

	        updateProductClonedAttributes(product, count);

	    	count = count + 1;
	    	$('.modal--editOptions [data-count]').attr('data-count', count);
	    });

	    $(document).on('click', '[data-edit-cart-remove]', event => {
	        event.preventDefault();

	        var product = $(event.currentTarget).parents('.product-edit-item');

	        if(product.hasClass('product-edit-itemFirst')){
	        	var itemId = product.data('product-edit-item-id');

	        	utils.api.cart.itemRemove(itemId, (err, response) => {
                    if (response.data.status === 'succeed') {
                        const modal = defaultModal();
	                	modal.close();
	                	
                        updateCartContent();
                    } else {
                        showAlertModal(response.data.errors.join('\n'));
                    }
                });
	        } else{
	        	product.remove();
	        }
	    });

	    $(document).on('click', '[data-edit-cart-add-to-cart]', event => {
	        var $product = $('.modal--editOptions .product-edit-item.is-visible'),
	    		$form = $product.find('.form'),
	    		itemId = $('.modal--editOptions .product-edit-itemFirst.is-visible').data('product-edit-item-id'),
	    		arrPro = new Array(),
	    		check = false;

	        $product.each((index, element) => {
	            arrPro.push(index);
	        });

	        if (arrPro.length > 0) {
	            check = checkProduct($form, arrPro);
	        }

	        if (check) {
	            if ((arrPro.length > 0) && (typeof(itemId) !== 'undefined')) {
	                utils.api.cart.itemRemove(itemId, (err, response) => {
	                    if (response.data.status === 'succeed') {
	                        $('[data-edit-cart-add-to-cart]').addClass('loading');
	                        addToCart($form, 0, arrPro);
	                    } else {
	                        showAlertModal(response.data.errors.join('\n'));

	                        updateCartContent();
	                    }
	                });
	            }
	        } else {
	            const errorMessage = 'Please make sure all options have been filled in.';

	            if (errorMessage) {
	                const tmp = document.createElement('DIV');
	                tmp.innerHTML = errorMessage;

	                return showAlertModal(tmp.textContent || tmp.innerText);
	            }
	        }

	        event.preventDefault();
	    });

	    $(document).on('click', '[data-cart-edit-item-quantity] button', event => {
            event.preventDefault();
            const $target = $(event.currentTarget);
            const itemId = $target.data('cart-itemid');
            const $el = $target.siblings('.form-input--incrementTotal');
            const $form = $target.parents('.product-edit-item').find('.form');
            const maxQty = parseInt($el.data('quantityMax'), 10);
            const minQty = parseInt($el.data('quantityMin'), 10);
            const oldQty = parseInt($el.val(), 10);
            const minError = $el.data('quantityMinError');
            const maxError = $el.data('quantityMaxError');
            const newQty = $target.data('action') === 'inc' ? oldQty + 1 : oldQty - 1;
            const stock = $el.data('stock');
            const proTitle= $('.product-edit-title').html();
            let invalidEntry;

            // Does not quality for min/max quantity
            if (!newQty) {
                invalidEntry = newQty;
                $el.val(oldQty);
                return showAlertModal(`${invalidEntry} is not a valid entry`);
            } else if (newQty < minQty) {
                $el.val(oldQty);
                return showAlertModal(minError);
            } else if (maxQty > 0 && newQty > maxQty) {
                $el.val(oldQty);
                return showAlertModal(maxError);
            } else if (newQty > stock) {
                $el.val(oldQty);
                return showAlertModal('We don\'t have enough stock on hand for the quantity you selected. Please try again.');
            } else {
               $el.val(newQty);
               $form.find('[name=qty\\[\\]]').attr('value', newQty);
            }
        });

	    function addToCart(form, i, arrP, cartId) {
	        if (window.FormData === undefined) {
	            return;
	        }

	        var k = arrP[i];

	        utils.api.cart.itemAdd(filterEmptyFilesFromForm(new FormData(form[k])), (err, response) => {
	            const errorMessage = err || response.data.error;

	            if (errorMessage) {
	                const tmp = document.createElement('DIV');
	                tmp.innerHTML = errorMessage;

	                return showAlertModal(tmp.textContent || tmp.innerText);
	            }

	            i++;

	            if (i >= arrP.length) {
	                const modal = defaultModal();
	                modal.close();

	                updateCartContent();

	                return;
	            }

	            addToCart(form, i, arrP);
	        });
	    }

	    function listenQuantityChangeUpdate($target, preVal = null) {
	        const itemId = $target.data('cart-itemid');
	        const $el = $target;
	        const $form = $target.parents('.product-edit-item').find('.form');
	        const maxQty = parseInt($el.data('quantityMax'), 10);
	        const minQty = parseInt($el.data('quantityMin'), 10);
	        const oldQty = preVal !== null ? preVal : minQty;
	        const minError = $el.data('quantityMinError');
	        const maxError = $el.data('quantityMaxError');
	        const newQty = parseInt(Number($el.val()), 10);
	        const stock = $el.data('stock');
	        let invalidEntry;

            if (!newQty) {
                invalidEntry = newQty;
                $el.val(oldQty);
                return showAlertModal(`${invalidEntry} is not a valid entry`);
            } else if (newQty < minQty) {
                $el.val(oldQty);
                return showAlertModal(minError);
            } else if (maxQty > 0 && newQty > maxQty) {
                $el.val(oldQty);
                return showAlertModal(maxError);
            } else if (newQty > stock) {
                $el.val(oldQty);
                return showAlertModal('We don\'t have enough stock on hand for the quantity you selected. Please try again.');
            } else {
               $el.val(newQty);
               $form.find('[name=qty\\[\\]]').attr('value', newQty);
            }
	    }

	    function filterEmptyFilesFromForm(formData) {
	        try {
	            for (const [key, val] of formData) {
	                if (val instanceof File && !val.name && !val.size) {
	                    formData.delete(key);
	                }
	            }
	        } catch (e) {
	            console.error(e);
	        }

	        return formData;
	    }

	    function checkProduct(form, arrPro) {
	        var check = true;

	        for (var i = 0, len = arrPro.length; i < len; i++) {
	            var k = arrPro[i],
	            	$form = $(form[k]);

	            if ($form.find('[data-product-attribute]').length > 0) {

	                check = checkBeforeAdd($form);

	                if (check == false){
	                    return false;
	                }
	            }
	        }

	        return check;
	    }

	    function checkBeforeAdd($attributes) {
	        var check = true,
	            att = "";

	        $attributes.find('input:text, input:password, input:file, textarea').each((index, element) => {
	            if (!$(element).prop('required')) {} else {
	                if ($(element).val()) {} else {
	                    $(element).focus();
	                    check = false;
	                }
	            }
	        });

	        $attributes.find('select').each((index, element) => {
	            if (!$(element).prop('required')) {} else {
	                if ($(element).val()) {} else {
	                    $(element).focus();
	                    check = false;
	                }
	            }
	        });

	        $attributes.find('input:radio, input:checkbox').each((index, element) => {
	            if (att != $(element).attr("name")) {
	                att = $(element).attr("name");
	                if (!$(element).prop('required')) {
	                    if ($(element).attr("type") == "checkbox") {
	                        if ($("[name='" + att + "']:checked").val()) {}
	                    }
	                    if ($(element).attr("type") == "radio") {
	                        if ($("[name='" + att + "']:checked").val()) {}
	                    }
	                } else {
	                    if ($(element).attr("type") == "checkbox") {
	                        if ($("[name='" + att + "']:checked").val()) {} else {
	                            check = false;
	                        }
	                    }
	                    if ($(element).attr("type") == "radio") {
	                        if ($("[name='" + att + "']:checked").val()) {} else {
	                            check = false;
	                        }
	                    }
	                }
	            }
	        });

	        return check;
	    }

	    function updateProductClonedAttributes($scope, number) {
	        $('label[data-product-attribute-value]', $scope).each((index, attribute) => {
	            var $formLabel = $(attribute),
	            	$formInput = $formLabel.prev(),
	            	id = $formLabel.attr('for'),
	            	newId = id + number;

	            $formLabel.attr('for', newId);
	            $formInput.attr('id', newId);
	        });

	        $('label[data-product-attribute-value2]', $scope).each((index, attribute) => {
	            var $formLabel = $(attribute),
	            	$formInput = $formLabel.next(),
	            	id = $formLabel.attr('for'),
	            	newId = id + number;

	            $formLabel.attr('for', newId);
	            $formInput.attr('id', newId);
	        });

	        $('input.form-checkbox', $scope).each((index, attribute) => {
	            var $formInput = $(attribute),
	            	$formLabel = $formInput.next(),
	            	id = $formLabel.attr('for'),
	            	newId = id + number;

	            $formLabel.attr('for', newId);
	            $formInput.attr('id', newId);
	        });

	        $('select.form-select', $scope).each((index, attribute) => {
	            var $formSelect = $(attribute),
	            	$formLabel = $formSelect.prev(),
	            	id = $formLabel.attr('for'),
	            	newId = id + number;

	            $formLabel.attr('for', newId);
	            $formSelect.attr('id', newId);
	        });
	    }

	    function setProductVariant(item, form) {
	        const unsatisfiedRequiredFields = [];
	        const options = [];

	        $.each($('[data-product-attribute]', form), (index, value) => {
	            const optionLabel = value.children[0].innerText;
	            const optionTitle = optionLabel.split(':')[0].trim();
	            const required = optionLabel.toLowerCase().includes('required');
	            const type = value.getAttribute('data-product-attribute');

	            if ((type === 'input-file' || type === 'input-text' || type === 'input-number') && value.querySelector('input').value === '' && required) {
	                unsatisfiedRequiredFields.push(value);
	            }

	            if (type === 'textarea' && value.querySelector('textarea').value === '' && required) {
	                unsatisfiedRequiredFields.push(value);
	            }

	            if (type === 'date') {
	                const isSatisfied = Array.from(value.querySelectorAll('select')).every((select) => select.selectedIndex !== 0);

	                if (isSatisfied) {
	                    const dateString = Array.from(value.querySelectorAll('select')).map((x) => x.value).join('-');
	                    options.push(`${optionTitle}:${dateString}`);

	                    return;
	                }

	                if (required) {
	                    unsatisfiedRequiredFields.push(value);
	                }
	            }

	            if (type === 'set-select') {
	                const select = value.querySelector('select');
	                const selectedIndex = select.selectedIndex;

	                if (selectedIndex !== 0) {
	                    options.push(`${optionTitle}:${select.options[selectedIndex].innerText}`);
	                    $(value.children[0]).find('[data-option-value]').text(select.options[selectedIndex].innerText);
	                    return;
	                }

	                if (required) {
	                    unsatisfiedRequiredFields.push(value);
	                }
	            }

	            if (type === 'set-rectangle' || type === 'set-radio' || type === 'swatch' || type === 'input-checkbox' || type === 'product-list') {
	                const checked = value.querySelector(':checked');
	                if (checked) {
	                    if (type === 'set-rectangle' || type === 'set-radio' || type === 'product-list') {
	                        const label = checked.labels[0].innerText;
	                        if (label) {
	                            options.push(`${optionTitle}:${label}`);
	                            $(value.children[0]).find('[data-option-value]').text(label);
	                        }
	                    }

	                    if (type === 'swatch') {
	                        const label = checked.labels[0].children[0];
	                        if (label) {
	                            options.push(`${optionTitle}:${label.title}`);
	                            $(value.children[0]).find('[data-option-value]').text(label.title);
	                        }
	                    }

	                    if (type === 'input-checkbox') {
	                        options.push(`${optionTitle}:Yes`);
	                    }

	                    return;
	                }

	                if (type === 'input-checkbox') {
	                    options.push(`${optionTitle}:No`);
	                }

	                if (required) {
	                    unsatisfiedRequiredFields.push(value);
	                }
	            }
	        });

	        let productVariant = unsatisfiedRequiredFields.length === 0 ? options.sort() : 'unsatisfied';

	        if (productVariant) {
	        	item.find('.product-edit-variant').empty();

	        	$.each(productVariant, (index, value) => {
	            	item.find('.product-edit-variant').append('<span>'+productVariant[index].toString().split(':').pop()+'</span>');
	        	});
	        }
	    }

	    function getViewModel($scope) {
	        return {
	            $priceWithTax: $('[data-product-price-with-tax]', $scope),
	            $priceWithoutTax: $('[data-product-price-without-tax]', $scope),
	            rrpWithTax: {
	                $div: $('.rrp-price--withTax', $scope),
	                $span: $('[data-product-rrp-with-tax]', $scope),
	            },
	            rrpWithoutTax: {
	                $div: $('.rrp-price--withoutTax', $scope),
	                $span: $('[data-product-rrp-price-without-tax]', $scope),
	            },
	            nonSaleWithTax: {
	                $div: $('.non-sale-price--withTax', $scope),
	                $span: $('[data-product-non-sale-price-with-tax]', $scope),
	            },
	            nonSaleWithoutTax: {
	                $div: $('.non-sale-price--withoutTax', $scope),
	                $span: $('[data-product-non-sale-price-without-tax]', $scope),
	            },
	            priceSaved: {
	                $div: $('.price-section--saving', $scope),
	                $span: $('[data-product-price-saved]', $scope),
	            },
	            priceNowLabel: {
	                $span: $('.price-now-label', $scope),
	            },
	            priceLabel: {
	                $span: $('.price-label', $scope),
	            },
	            $stockLeft: $('[data-stock-left]', $scope),
	            $stockLeftWrapper: $('.product-edit-optionsStock', $scope),
	            $quantity: {
	                $input: $('.product-edit-increment [name=qty\\[\\]]', $scope),
	                $dec: $('.product-edit-increment [data-action="dec"]', $scope),
	                $inc: $('.product-edit-increment [data-action="inc"]', $scope),
	            },
	            $image: $('.product-edit-image', $scope)
	        };
	    }

	    function updateProductAttributes($scope, data) {
	        const behavior = data.out_of_stock_behavior;
	        const inStockIds = data.in_stock_attributes;
	        const outOfStockMessage = ` (${data.out_of_stock_message})`;

	        if (behavior !== 'hide_option' && behavior !== 'label_option') {
	            return;
	        }

	        $('[data-product-attribute-value]', $scope).each((i, attribute) => {
	            const $attribute = $(attribute);
	            const attrId = parseInt($attribute.data('productAttributeValue'), 10);

	            if (inStockIds.indexOf(attrId) !== -1) {
	                enableAttribute($attribute, behavior, outOfStockMessage);
	            } else {
	                disableAttribute($attribute, behavior, outOfStockMessage);
	            }
	        });
	    }

	    function showProductImage($scope, data) {
	    	const viewModel = getViewModel($scope);

	        if (_.isPlainObject(data.image)) {
	            const mainImageUrl = utils.tools.imageSrcset.getSrcset(
	                data.image.data, { '1x': context.themeSettings.productthumb_size },
	            );

	            const mainImageSrcset = utils.tools.imageSrcset.getSrcset(data.image.data);

	            viewModel.$image.find('img').attr({
	                'srcset': mainImageUrl,
	                'data-srcset': mainImageSrcset
	            });
	        }
	    }

	    function updateDefaultAttributesForOOS($scope, data) {
	        const viewModel = getViewModel($scope);

	        if (!data.purchasable || !data.instock) {
	            $scope.removeClass('is-visible').addClass('is-hidden');
	            viewModel.$quantity.$input.prop('disabled', true);
	            viewModel.$quantity.$dec.prop('disabled', true);
	            viewModel.$quantity.$inc.prop('disabled', true);
	        } else {
	            $scope.removeClass('is-hidden').addClass('is-visible');
	            viewModel.$quantity.$input.prop('disabled', false);
	            viewModel.$quantity.$dec.prop('disabled', false);
	            viewModel.$quantity.$inc.prop('disabled', false);
	        }
	    }

	    function showMessageBox($scope, message) {
	        const $messageBox = $('.product-edit-message', $scope);

	        if (message) {
	            $('.alertBox-message', $messageBox).text(message);
	            $messageBox.show();
	        } else {
	            $messageBox.hide();
	        }
	    }

	    function clearPricingNotFound(viewModel) {
	        viewModel.rrpWithTax.$div.hide();
	        viewModel.rrpWithoutTax.$div.hide();
	        viewModel.nonSaleWithTax.$div.hide();
	        viewModel.nonSaleWithoutTax.$div.hide();
	        viewModel.priceSaved.$div.hide();
	        viewModel.priceNowLabel.$span.hide();
	        viewModel.priceLabel.$span.hide();
	    }

	    function updatePriceView(viewModel, price) {
	        clearPricingNotFound(viewModel);

	        if (price.with_tax) {
	            viewModel.priceLabel.$span.show();
	            viewModel.$priceWithTax.html(price.with_tax.formatted);
	        }

	        if (price.without_tax) {
	            viewModel.priceLabel.$span.show();
	            viewModel.$priceWithoutTax.html(price.without_tax.formatted);
	        }

	        if (price.rrp_with_tax) {
	            viewModel.rrpWithTax.$div.show();
	            viewModel.rrpWithTax.$span.html(price.rrp_with_tax.formatted);
	        }

	        if (price.rrp_without_tax) {
	            viewModel.rrpWithoutTax.$div.show();
	            viewModel.rrpWithoutTax.$span.html(price.rrp_without_tax.formatted);
	        }

	        if (price.saved) {
	            viewModel.priceSaved.$div.show();
	            viewModel.priceSaved.$span.html(price.saved.formatted);
	        }

	        if (price.non_sale_price_with_tax) {
	            viewModel.priceLabel.$span.hide();
	            viewModel.nonSaleWithTax.$div.show();
	            viewModel.priceNowLabel.$span.show();
	            viewModel.nonSaleWithTax.$span.html(price.non_sale_price_with_tax.formatted);
	        }

	        if (price.non_sale_price_without_tax) {
	            viewModel.priceLabel.$span.hide();
	            viewModel.nonSaleWithoutTax.$div.show();
	            viewModel.priceNowLabel.$span.show();
	            viewModel.nonSaleWithoutTax.$span.html(price.non_sale_price_without_tax.formatted);
	        }
	    }

	    function updateView($scope, data, content = null) {
	        const viewModel = getViewModel($scope);

	        if (_.isNumber(data.stock)) {
	            if((data.stock <= parseInt(context.themeSettings.halo_stock_level_limit)) && (data.stock > 0)) {
	                viewModel.$stockLeftWrapper.removeClass('u-hiddenVisually');
	                viewModel.$stockLeft.text(data.stock);
	            } else{
	                viewModel.$stockLeftWrapper.addClass('u-hiddenVisually');
	            }

	            viewModel.$quantity.$input.attr('data-stock', data.stock);
	        } else{
	        	viewModel.$quantity.$input.removeAttr('data-stock');
	        }

	        showMessageBox($scope, data.stock_message || data.purchasing_message);

	        if (_.isObject(data.price)) {
	            updatePriceView(viewModel, data.price);
	        }

	        updateDefaultAttributesForOOS($scope, data);
	        showProductImage($scope, data);
	    }

	    function disableAttribute($attribute, behavior, outOfStockMessage) {
	        if (getAttributeType($attribute) === 'set-select') {
	            return disableSelectOptionAttribute($attribute, behavior, outOfStockMessage);
	        }

	        if (behavior === 'hide_option') {
	            $attribute.hide();
	        } else {
	            $attribute.addClass('unavailable');
	        }
	    }

	    function disableSelectOptionAttribute($attribute, behavior, outOfStockMessage) {
	        const $select = $attribute.parent();

	        if (behavior === 'hide_option') {
	            $attribute.toggleOption(false);

	            if ($select.val() === $attribute.attr('value')) {
	                $select[0].selectedIndex = 0;
	            }
	        } else {
	            $attribute.attr('disabled', 'disabled');
	            $attribute.html($attribute.html().replace(outOfStockMessage, '') + outOfStockMessage);
	        }
	    }

	    function enableAttribute($attribute, behavior, outOfStockMessage) {
	        if (getAttributeType($attribute) === 'set-select') {
	            return enableSelectOptionAttribute($attribute, behavior, outOfStockMessage);
	        }

	        if (behavior === 'hide_option') {
	            $attribute.show();
	        } else {
	            $attribute.removeClass('unavailable');
	        }
	    }

	    function enableSelectOptionAttribute($attribute, behavior, outOfStockMessage) {
	        if (behavior === 'hide_option') {
	            $attribute.toggleOption(true);
	        } else {
	            $attribute.prop('disabled', false);
	            $attribute.html($attribute.html().replace(outOfStockMessage, ''));
	        }
	    }

	    function getAttributeType($attribute) {
	        const $parent = $attribute.closest('[data-product-attribute]');

	        return $parent ? $parent.data('productAttribute') : null;
	    }

	    function updateCartContent(){
	    	if (!$('body').hasClass('page-type-cart')) {
	    		const loadingClass = 'is-loading';
			    const $cartDropdown = $('#halo-cart-sidebar .halo-sidebar-wrapper');
			    const $cartLoading = $('<div class="loadingOverlay"></div>');
			    const $body = $('body');

		        const options = {
		            template: 'common/cart-preview',
		        };

		        $cartDropdown
		            .addClass(loadingClass)
		            .prepend($cartLoading);
		        $cartLoading
		            .show();

		        utils.api.cart.getContent(options, (err, response) => {
		            $cartDropdown
		                .removeClass(loadingClass)
		                .html(response);
		            $cartLoading
		                .hide();

		            const quantity = $(response).find('[data-cart-quantity]').data('cartQuantity') || $('[data-cart-quantity]').data('cartQuantity') || 0;

		            $body.trigger('cart-quantity-update', quantity);

					haloCalculateFreeShipping(context);
		        });
		    } else {
		    	refreshContent();
				haloCalculateFreeShipping(context);
		    }
	    }

	    function refreshContent(remove) {
	        const $cartItemsRows = $('[data-item-row]', $cartContent);
	        const $cartPageTitle = $('[data-cart-page-title]');

	        const options = {
	            template: {
	                content: 'cart/content',
	                totals: 'cart/totals',
	                pageTitle: 'cart/page-title',
	                statusMessages: 'cart/status-messages',
	            },
	        };

	        $overlay.show();

	        // Remove last item from cart? Reload
	        if (remove && $cartItemsRows.length === 1) {
	            return window.location.reload();
	        }

	        utils.api.cart.getContent(options, (err, response) => {
	            $cartContent.html(response.content);
	            $cartTotals.html(response.totals);
	            $cartMessages.html(response.statusMessages);

	            $cartPageTitle.replaceWith(response.pageTitle);
	            bindEvents();
	            $overlay.hide();

	            const quantity = $('[data-cart-quantity]', $cartContent).data('cartQuantity') || 0;

	            $('body').trigger('cart-quantity-update', quantity);
	        });
	    }

	    function cartUpdate($target) {
	        const itemId = $target.data('cartItemid');
	        const $el = $(`#qty-${itemId}`);
	        const oldQty = parseInt($el.val(), 10);
	        const maxQty = parseInt($el.data('quantityMax'), 10);
	        const minQty = parseInt($el.data('quantityMin'), 10);
	        const minError = $el.data('quantityMinError');
	        const maxError = $el.data('quantityMaxError');
	        const newQty = $target.data('action') === 'inc' ? oldQty + 1 : oldQty - 1;
	        // Does not quality for min/max quantity
	        if (newQty < minQty) {
                return showAlertModal(minError);
	        } else if (maxQty > 0 && newQty > maxQty) {
                return showAlertModal(maxError);
	        }

	        $overlay.show();

	        utils.api.cart.itemUpdate(itemId, newQty, (err, response) => {
	            $overlay.hide();

	            if (response.data.status === 'succeed') {
	                // if the quantity is changed "1" from "0", we have to remove the row.
	                const remove = (newQty === 0);

	                refreshContent(remove);
	            } else {
	                $el.val(oldQty);
                    return showAlertModal(response.data.errors.join('\n'));
	            }
	        });
	    }

	    function cartUpdateQtyTextChange($target, preVal = null) {
	        const itemId = $target.data('cartItemid');
	        const $el = $(`#qty-${itemId}`);
	        const maxQty = parseInt($el.data('quantityMax'), 10);
	        const minQty = parseInt($el.data('quantityMin'), 10);
	        const oldQty = preVal !== null ? preVal : minQty;
	        const minError = $el.data('quantityMinError');
	        const maxError = $el.data('quantityMaxError');
	        const newQty = parseInt(Number($el.val()), 10);
	        let invalidEntry;

	        // Does not quality for min/max quantity
	        if (!newQty) {
	            invalidEntry = $el.val();
	            $el.val(oldQty);
                return showAlertModal(`${invalidEntry} is not a valid entry`);
	        } else if (newQty < minQty) {
	            $el.val(oldQty);
                return showAlertModal(minError);
	        } else if (maxQty > 0 && newQty > maxQty) {
	            $el.val(oldQty);
                return showAlertModal(maxError);
	        }

	        $overlay.show();

	        utils.api.cart.itemUpdate(itemId, newQty, (err, response) => {
	            $overlay.hide();

	            if (response.data.status === 'succeed') {
	                // if the quantity is changed "1" from "0", we have to remove the row.
	                const remove = (newQty === 0);

	                refreshContent(remove);
	            } else {
	                $el.val(oldQty);
                    return showAlertModal(response.data.errors.join('\n'));
	            }
	        });
	    }

	    function cartRemoveItem(itemId) {
	        $overlay.show();
	        utils.api.cart.itemRemove(itemId, (err, response) => {
	            if (response.data.status === 'succeed') {
	                refreshContent(true);
	            } else {
	                return showAlertModal(response.data.errors.join('\n'));
	            }
	        });
	    }

	    function bindCartEvents() {
	        let preVal;

	        $('[data-cart-update]', $cartContent).on('click', event => {
	            const $target = $(event.currentTarget);

	            event.preventDefault();

	            cartUpdate($target);
	        });

	        $('[data-cart-update]', $cartContent).on('click', event => {
	            const $target = $(event.currentTarget);
	            event.preventDefault();

	            cartUpdate($target);
	        });

	        $('.cart-item-qty-input', $cartContent).on('focus', (event) => {
	            preVal = $(event.currentTarget).val();
	        }).change(event => {
	            const $target = $(event.currentTarget);
	            event.preventDefault();

	            cartUpdateQtyTextChange($target, preVal);
	        });

	        $('.cart-remove', $cartContent).on('click', event => {
	            const itemId = $(event.currentTarget).data('cartItemid');
	            const string = $(event.currentTarget).data('confirmDelete');
                showAlertModal(string, {
                    icon: 'warning',
                    showCancelButton: true,
                    onConfirm: () => {
                        // remove item from cart
                        cartRemoveItem(itemId);
                    },
                });
	            event.preventDefault();
	        });
	    }

	    function bindPromoCodeEvents() {
            const $couponContainer = $('.coupon-code');
            const $couponForm = $('.coupon-form');
            const $codeInput = $('[name="couponcode"]', $couponForm);
    
            $('.coupon-code-add').on('click', event => {
                event.preventDefault();
    
                $(event.currentTarget).hide();
                $couponContainer.show();
                $couponContainer.attr('aria-hidden', false);
                $('.coupon-code-cancel').show();
                $codeInput.trigger('focus');
            });
    
            $('.coupon-code-cancel').on('click', event => {
                event.preventDefault();
    
                $couponContainer.hide();
                $couponContainer.attr('aria-hidden', true);
                $('.coupon-code-cancel').hide();
                $('.coupon-code-add').show();
            });
    
            $couponForm.on('submit', event => {
                const code = $codeInput.val();
    
                event.preventDefault();
    
                // Empty code
                if (!code) {
                    return showAlertModal($codeInput.data('error'));
                }
    
                utils.api.cart.applyCode(code, (err, response) => {
                    if (response.data.status === 'success') {
                        this.refreshContent();
                    } else {
                        showAlertModal(response.data.errors.join('\n'));
                    }
                });
            });
        }

	    function bindGiftCertificateEvents() {
            const $certContainer = $('.gift-certificate-code');
            const $certForm = $('.cart-gift-certificate-form');
            const $certInput = $('[name="certcode"]', $certForm);
    
            $('.gift-certificate-add').on('click', event => {
                event.preventDefault();
                $(event.currentTarget).toggle();
                $certContainer.toggle();
                $certContainer.attr('aria-hidden', false);
                $('.gift-certificate-cancel').toggle();
            });
    
            $('.gift-certificate-cancel').on('click', event => {
                event.preventDefault();
                $certContainer.toggle();
                $certContainer.attr('aria-hidden', true);
                $('.gift-certificate-add').toggle();
                $('.gift-certificate-cancel').toggle();
            });
    
            $certForm.on('submit', event => {
                const code = $certInput.val();
    
                event.preventDefault();
    
                if (!checkIsGiftCertValid(code)) {
                    const validationDictionary = createTranslationDictionary(this.context);
                    return showAlertModal(validationDictionary.invalid_gift_certificate);
                }
    
                utils.api.cart.applyGiftCertificate(code, (err, resp) => {
                    if (resp.data.status === 'success') {
                        refreshContent();
                    } else {
                        showAlertModal(resp.data.errors.join('\n'));
                    }
                });
            });
        }

	    function bindGiftWrappingEvents() {
            const modal = defaultModal();
    
            $('[data-item-giftwrap]').on('click', event => {
                const itemId = $(event.currentTarget).data('itemGiftwrap');
                const options = {
                    template: 'cart/modals/gift-wrapping-form',
                };
    
                event.preventDefault();
    
                modal.open();
    
                utils.api.cart.getItemGiftWrappingOptions(itemId, options, (err, response) => {
                    modal.updateContent(response.content);
    
                    bindGiftWrappingForm();
                });
            });
        }
    
        function bindGiftWrappingForm() {
            $('.giftWrapping-select').on('change', event => {
                const $select = $(event.currentTarget);
                const id = $select.val();
                const index = $select.data('index');
    
                if (!id) {
                    return;
                }
    
                const allowMessage = $select.find(`option[value=${id}]`).data('allowMessage');
    
                $(`.giftWrapping-image-${index}`).hide();
                $(`#giftWrapping-image-${index}-${id}`).show();
    
                if (allowMessage) {
                    $(`#giftWrapping-message-${index}`).show();
                } else {
                    $(`#giftWrapping-message-${index}`).hide();
                }
            });
    
            $('.giftWrapping-select').trigger('change');
    
            function toggleViews() {
                const value = $('input:radio[name ="giftwraptype"]:checked').val();
                const $singleForm = $('.giftWrapping-single');
                const $multiForm = $('.giftWrapping-multiple');
    
                if (value === 'same') {
                    $singleForm.show();
                    $multiForm.hide();
                } else {
                    $singleForm.hide();
                    $multiForm.show();
                }
            }
    
            $('[name="giftwraptype"]').on('click', toggleViews);
    
            toggleViews();
        }

	    function bindEvents() {
	        bindCartEvents();
	        bindPromoCodeEvents();
	        bindGiftWrappingEvents();
	        bindGiftCertificateEvents();

	        // initiate shipping estimator module
	        const shippingErrorMessages = {
	            country: context.shippingCountryErrorMessage,
	            province: context.shippingProvinceErrorMessage,
	        };
	        var shippingEstimator = new ShippingEstimator($('[data-shipping-estimator]'), shippingErrorMessages);
	    }
	}
}
