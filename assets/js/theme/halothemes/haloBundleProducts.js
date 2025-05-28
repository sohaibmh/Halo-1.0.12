import utils from '@bigcommerce/stencil-utils';
import { showAlertModal } from '../global/modal';
import haloCalculateFreeShipping from './haloCalculateFreeShipping';
import forms from '../common/models/forms';

export default function($scope, context) {
    const thisProuctId = parseInt(context.productId),
        $relatedTab = $('#halo-related-products'),
        $bundle = $('#halo-bundle-products'),
        $bundleList = $bundle.find('.halo-product-list .bundle-product-wrapper');

    var currency = context.money;

    showBundle();

    $(document).on('click', '.halo-toggle-options', event => {
        event.preventDefault();

        var $target = $(event.currentTarget);

        $('.halo-toggle-options').not($target).removeClass('is-focus');
        $('.halo-detail-options').not($target.next('.halo-detail-options')).removeClass('is-open');

        if (!$target.next('.halo-detail-options').hasClass('is-open')) {
            $target.addClass('is-focus');
            $target.next('.halo-detail-options').addClass('is-open');
        } else {
            $target.next('.halo-detail-options').removeClass('is-open');
            $target.removeClass('is-focus');
        }
    });

    $(document).on('click', '[data-halo-option-close]', event => {
        event.preventDefault();

        $('.halo-detail-options').removeClass('is-open');
        $('.halo-toggle-options').removeClass('is-focus');
    });

    $(document).on('click', event => {
        if ($('.halo-detail-options').hasClass('is-open')) {
            if (($(event.target).closest('.halo-detail-options').length === 0) && ($(event.target).closest('.halo-toggle-options').length === 0)){
                $('.halo-detail-options').removeClass('is-open');
                $('.halo-toggle-options').removeClass('is-focus');
            }
        }
    });

    $(document).on('change', '.halo-detail-checkbox', event => {
        var $target = $(event.currentTarget),
            id = $target.attr('id').replace('fbt_product',''),
            product = $('.halo-product-item[data-product-id="' + id + '"]');

        if($target.is(':checked') == false) {
            product.removeClass('isChecked');
            product.find('.status').addClass('disable').text('This item');
            $('#halo-addAll').find('.number').text($('.halo-product-item.isChecked').length)
        } else {
            product.addClass('isChecked');
            product.find('.status').removeClass('disable').text('Selected');
            $('#halo-addAll').find('.number').text($('.halo-product-item.isChecked').length)
        }

        totalPrice();
    });

    $(document).on('click', '#halo-addAll', event => {
        event.preventDefault();

        const $form = $('form', $bundle);
        var arrPro = new Array();

        $('.halo-detail-checkbox').each((index, val) => {
            if ($(val).is(':checked')) {
                arrPro.push(index);
            }
        });

        var check = false;

        if (arrPro.length > 0) {
            check = checkProduct($form, arrPro);
        }

        if (check) {
            if (arrPro.length > 0) {
                var k = arrPro.length;

                $bundle.find('.loadingOverlay').show();

                addToCart($form, 0, arrPro, k);
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

    function showBundle() {
        const options = {
                template: 'halothemes/product/halo-bundle-products-tmp'
            };

        var prodBundleId = [],
            totalBlock = '';

        firstItem();

        if($bundle.hasClass('halo-bundle-login')){
            totalBlock = '<div class="halo-product-total">\
                            <a class="button button--primary button--small halo-product-total-button m-0" disabled href="#"><span>Log in for pricing</span></a>\
                        </div>';
        } else{
            totalBlock = '<div class="halo-product-total d-flex d-block-tb a-i-start j-c-between">\
                            <div class="total-price">\
                                <span class="text"><span>Price Total</span></span>\
                                <span class="price price-sale"></span>\
                                <span class="price"></span>\
                            </div>\
                            <a class="button button--primary button--small halo-product-total-button m-0" id="halo-addAll" href="#"><span>Add <span class="number">all</span> item(s) to bag</span></a>\
                        </div>';
        }

        $bundle.find('.bundle-product-right').append(totalBlock);

        $.each(context.productCustomFields, function(index, obj) {
            if (obj.name == '__bundleid') {
                prodBundleId = JSON.parse('['+obj.value+']');
            }
        });

        prodBundleId = $.grep(prodBundleId, (value) => {
            return value != thisProuctId;
        });

        if ($bundle.length > 0 && prodBundleId.length == 0) {
            var num = 0,
                list = [];

            $relatedTab.find('.card').each((index, val) => {
                list.push({
                    index: index,
                    data: ""
                });

                var pId = $(val).data('product-id');

                if (pId != undefined) {
                    utils.api.product.getById(pId, options, (err, response) => {
                        if (err) {
                            return '';
                        }

                        list.forEach((element) => {
                            if(element.index == index){
                                element.data = response;
                            }
                        });
                        
                        num++;

                        if(num == $relatedTab.find('.card').length){
                            showList(list);
                        }
                    });
                }
            });
        } else if ($bundle.length > 0 && prodBundleId.length > 0) {
            var num = 0,
                list = [];

            $.each(prodBundleId, function(i, val){
                list.push({i:i, data: ""});

                var pId = prodBundleId[i];

                if (pId != undefined) {
                    utils.api.product.getById(pId, options, (err, response) => {
                        if (err) {
                            return false;
                        }

                        list.forEach(function(element) {
                            if(element.i == i){
                                element.data = response;
                            }
                        });
                        
                        num++;

                        if(num == prodBundleId.length){
                            showList(list);
                        }
                    });
                }
            });
        }
    }

    function firstItem(){
        const firstItem = $bundleList.find('.halo-product-itemFirst'),
            pId = firstItem.data('product-id'),
            form = firstItem.find('form'),
            hasOptions = form.find('[data-fbt-option-change]').length,
            hasDefaultOptions = form.find('[data-default]').length;

        if (hasDefaultOptions && hasOptions) {
            utils.api.productAttributes.optionChange(pId, form.serialize(), 'products/bulk-discount-rates', (err, response) => {
                const attributesData = response.data || {};
                const attributesContent = response.content || {};

                updateProductAttributes(form, attributesData);

                if (hasDefaultOptions) {
                    updateView(form, attributesData, attributesContent);
                } else {
                    updateDefaultAttributesForOOS(attributesData);
                }
            });
        }
    }

    function showList(list){
        list.forEach((element) => {
            var response = element.data;

            if(response != undefined && response != null && response != ''){
                $bundleList.append(response);

                if ($(response).find('.halo-toggle-options').length) {
                    var pId = $(response).data('product-id'),
                    $form = $bundleList.find('.halo-product-item[data-product-id="' + pId + '"] form');

                    const $productOptionsElement = $('[data-fbt-option-change]', $form);
                    const hasOptions = $productOptionsElement.html().trim().length;
                    const hasDefaultOptions = $(response).find('[data-default]').length;

                    if (hasDefaultOptions && hasOptions) {
                        utils.api.productAttributes.optionChange(pId, $form.serialize(), 'products/bulk-discount-rates', (err, response) => {
                            if(response != undefined){
                                const attributesData = response.data || {};
                                const attributesContent = response.content || {};

                                updateProductAttributes($form, attributesData);

                                if (hasDefaultOptions) {
                                    updateView($form, attributesData, attributesContent);
                                } else {
                                    updateDefaultAttributesForOOS(attributesData);
                                }
                            }
                        });
                    }

                    setProductVariant();
                }
            }
        });

        $('.halo-product-item', $scope).each(function (index, element) {
            $(element).on('click', '[data-quantity-fbt-change] button', event => {
                event.preventDefault();
                const $target = $(event.currentTarget);
                const currentItemProId = $target.closest('.halo-product-item').data('product-id');
                const $input = $(`.halo-product-item[data-product-id="${currentItemProId}"] [name=fbtqty\\[\\]]`, $scope);
                const quantityMin = parseInt($input.data('quantityMin'), 10);
                const quantityMax = parseInt($input.data('quantityMax'), 10);
                let qty = forms.numbersOnly($input.val()) ? parseInt($input.val(), 10) : quantityMin;
    
                if ($target.data('action') === 'inc') {
                    qty = forms.validateIncreaseAgainstMaxBoundary(qty, quantityMax);
                } else if (qty > 1) {
                    qty = forms.validateDecreaseAgainstMinBoundary(qty, quantityMin);
                }

                $input.attr('value',qty);
                $input.val(qty);
            });
        });

        productOptions();

        if(!$bundle.hasClass('halo-bundle-login')){
            totalPrice();
        }

        $('#halo-addAll').find('.number').text($('.halo-product-item.isChecked').length);
        
        $bundle.removeClass('halo-block-disable');
    }

    function checkProduct(form, arrPro) {
        var check = true;

        for (var i = 0; i < arrPro.length; i++) {
            var k = arrPro[i],
                $form = $(form[k]);

            if ($form.find('[data-fbt-option-change]').length) {
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

    function addToCart(form, i, arrP, k) {
        if (window.FormData === undefined) {
            return;
        }

        var prod = arrP[i];
        var formData = new FormData(form[prod]);

        utils.api.cart.itemAdd(filterEmptyFilesFromForm(formData), (err, response) => {
            const errorMessage = err || response.data.error;
            const productsItem = $('.halo-product-item');

            productsItem.each((index, productItem) => {
                const quantityData = $('[name=fbtqty\\[\\]]', productItem).val();
                $(productItem).find('[name=qty\\[\\]]').attr('value',quantityData);
            });

            if (errorMessage) {
                const tmp = document.createElement('DIV');
                tmp.innerHTML = errorMessage;
                alert(tmp.textContent || tmp.innerText);
                k = k - 1;
            }

            i++;

            if (i >= arrP.length) {
                $bundle.find('.loadingOverlay').hide();

                if (context.themeSettings.haloAddToCartAction === 'sidebar'){
                    const options = {
                        template: 'common/cart-preview'
                    };

                    const loadingClass = 'is-loading';
                    const $body = $('body');
                    const $cartDropdown = $('#halo-cart-sidebar .halo-sidebar-wrapper');
                    const $cartLoading = $('<div class="loadingOverlay"></div>');

                    $body.addClass('openCartSidebar');

                    $cartDropdown
                        .addClass(loadingClass)
                        .html($cartLoading);
                    $cartLoading
                        .show();

                    utils.api.cart.getContent(options, (err, response) => {
                        $cartDropdown
                            .removeClass(loadingClass)
                            .html(response);
                        $cartLoading
                            .hide();

                        const quantity = $(response).find('[data-cart-quantity]').data('cartQuantity') || 0;

                        $body.trigger('cart-quantity-update', quantity);

                        haloCalculateFreeShipping(context);
                    });
                } else {
                    redirectTo(context.urls.cart);
                }

                return;
            }

            addToCart(form, i, arrP, k);
        });
    }

    function isRunningInIframe() {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }

    function redirectTo(url) {
        if (isRunningInIframe() && !window.iframeSdk) {
            window.top.location = url;
        } else {
            window.location = url;
        }
    }

    function totalPrice() {
        var total = 0,
            totalSale = 0,
            symbol,
            symbolChange,
            decimalPlaces,
            decimalSeparator,
            thousandsSeparator,
            symbolLocation,
            curr,
            token1,
            token2,
            length;

        decimalPlaces = currency.decimal_places;
        decimalSeparator = currency.decimal_token;
        thousandsSeparator = currency.thousands_token;
        symbolLocation = currency.currency_location;
        symbol = currency.currency_token;

        $bundleList.find('.halo-product-item.isChecked').each((index, val) => {
            var price = parseFloat($(val).find('.halo-detail-price').attr('data-price-value')),
                priceSale = parseFloat($(val).find('.halo-detail-price').attr('data-price-sale-value'));

            total = total + price;
            totalSale = totalSale + priceSale;
        });

        if (total == totalSale) {
            $('.halo-product-total .price-sale').hide();
            $('.halo-product-total').removeClass('has-price-sale');
        } else {
            $('.halo-product-total .price-sale').show();
            $('.halo-product-total').addClass('has-price-sale');
        }

        if ($('.productView-price > .price-section > .price.price--withTax', $scope).length) {
            curr = $('.productView-price > .price-section > .price.price--withTax', $scope).data('value-price');
        } else {
            curr = $('.productView-price > .price-section > .price.price--withoutTax', $scope).data('value-price');
        }

        symbolChange = curr.replace(/[0-9]/g, "").replace(".", "").replace(",", "");

        if(symbol != symbolChange){
            symbol = symbolChange;
            token1 = (curr.indexOf('.'));
            token2 = (curr.indexOf(','));
            length = curr.length - 1;

            if (curr.indexOf(symbol) != -1) {
                symbolLocation = curr.indexOf(symbol);
            }

            if (token1 < token2) {
                thousandsSeparator = '.';
                decimalSeparator = ',';

                if (symbolLocation == 0 || symbolLocation == "left") {
                    decimalPlaces = length - token2;
                } else {
                    decimalPlaces = length - token2 - 1;
                }
            } else {
                thousandsSeparator = ',';
                decimalSeparator = '.';
                if (symbolLocation == 0 || symbolLocation == "left") {
                    decimalPlaces = length - token1;
                } else {
                    decimalPlaces = length - token1 - 1;
                }
            }
        }

        if(total == 0){
            $bundle.find('#halo-addAll').attr('disabled', true);
        } else{
            $bundle.find('#halo-addAll').attr('disabled', false);
        }

        total = formatMoney(total, decimalPlaces, decimalSeparator, thousandsSeparator);
        totalSale = formatMoney(totalSale, decimalPlaces, decimalSeparator, thousandsSeparator);

        if (symbolLocation == "left" || symbolLocation == 0){
            total = symbol + total;
            totalSale = symbol + totalSale;
        } else{
            total = total + symbol;
            totalSale = totalSale + symbol;
        }

        $bundle.find('.halo-product-total .price').html(total);
        $bundle.find('.halo-product-total .price-sale').html(totalSale);
    }

    function formatMoney(n, c, d, t) {
        var c = isNaN(c = Math.abs(c)) ? 2 : c,
            d = d == undefined ? "." : d,
            t = t == undefined ? "," : t,
            s = n < 0 ? "-" : "",
            i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
            j = (j = i.length) > 3 ? j % 3 : 0;

        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    };

    function productOptions() {
        if(!$bundle.hasClass('halo-bundle-login')){
            totalPrice();
        }
        const $form = $('form', $bundle),
            $productOptionsElement = $('[data-fbt-option-change]', $form);

        setProductVariant();

        $(document).on('change', $productOptionsElement, event => {
            productOptionsChanged(event);
            setProductVariant();
        });
    }

    function setProductVariant() {
        const unsatisfiedRequiredFields = [];
        const options = [];

        $('.halo-product-item').each((index, item) => {
            const valueOptions = [];

            $(item).find('[data-fbt-option-change] [data-product-attribute]').each((_, value) => {
                const optionLabel = $(value).find('label').text();
                const optionTitle = optionLabel.split(':')[0].trim();
                const required = optionLabel.toLowerCase().includes('required');
                const type = $(value).data('product-attribute');
    
                if ((type === 'input-file' || type === 'input-text' || type === 'input-number') && value.querySelector('input').value === '' && required) {
                    unsatisfiedRequiredFields.push(value);
                } else if (type === 'textarea' && value.querySelector('textarea').value === '' && required) {
                    unsatisfiedRequiredFields.push(value);
                } else if (type === 'date') {
                    const isSatisfied = Array.from(value.querySelectorAll('select')).every((select) => select.selectedIndex !== 0);
    
                    if (isSatisfied) {
                        const dateString = Array.from(value.querySelectorAll('select')).map((x) => x.value).join('-');
                        options.push(`${optionTitle}:${dateString}`);
    
                        return;
                    }
    
                    if (required) {
                        unsatisfiedRequiredFields.push(value);
                    }
                } else if (type === 'set-select') {
                    const select = value.querySelector('select');
                    const selectedIndex = select.selectedIndex;
    
                    if (selectedIndex !== 0) {
                        options.push(`${optionTitle}:${select.options[selectedIndex].innerText}`);
                        $(value.children[0]).find('[data-option-value]').text(select.options[selectedIndex].innerText);
    
                        valueOptions.push(select.options[selectedIndex].innerText.trim());
            
                        return;
                    }
    
                    if (required) {
                        unsatisfiedRequiredFields.push(value);
                    }
                } else if (type === 'set-rectangle' || type === 'set-radio' || type === 'swatch' || type === 'input-checkbox' || type === 'product-list') {
                    const checked = value.querySelector(':checked');
                    if (checked) {
                        if (type === 'set-rectangle' || type === 'set-radio' || type === 'product-list') {
                            const label = checked.labels[0].innerText;
                            if (label) {
                                options.push(`${optionTitle}:${label}`);
                                $(value.children[0]).find('[data-option-value]').text(label);

                                valueOptions.push(label.trim());
                            }
                        }

                        if (type === 'swatch') {
                            const label = checked.labels[0].children[0];
                            if (label) {
                                options.push(`${optionTitle}:${label.title}`);
                                $(value.children[0]).find('[data-option-value]').text(label.title);
                                
                                valueOptions.push(label.title.trim());
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
            
            if (valueOptions != '') {
                $(item).find('.halo-toggle-options .text').text(valueOptions.join(' / '));
            }
        });
    }

    function productOptionsChanged(event) {
        const $changedOption = $(event.target);
        const $form = $changedOption.parents('form');
        const productId = $('[name="product_id"]', $form).val();

        if ($changedOption.attr('type') === 'file' || window.FormData === undefined) {
            return;
        }

        if ($changedOption.attr('id') === 'fbt_product' + productId) {
            return;
        }
        
        utils.api.productAttributes.optionChange(productId, $form.serialize(), 'products/bulk-discount-rates', (err, response) => {
            const productAttributesData = response.data || {};
            const productAttributesContent = response.content || {};
            updateProductAttributes($form, productAttributesData);
            updateView($form, productAttributesData, productAttributesContent);

            if(!$bundle.hasClass('halo-bundle-login')){
                totalPrice();
            }
        });

        return false;
    }
    
    function updateProductAttributes(data) {
        const behavior = data.out_of_stock_behavior;
        const inStockIds = data.in_stock_attributes;
        const outOfStockDefaultMessage = context.outOfStockDefaultMessage;
        let outOfStockMessage = data.out_of_stock_message;

        if (behavior !== 'hide_option' && behavior !== 'label_option') {
            return;
        }

        if (outOfStockMessage) {
            outOfStockMessage = ` (${outOfStockMessage})`;
        } else {
            outOfStockMessage = ` (${outOfStockDefaultMessage})`;
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

    function disableAttribute($attribute, behavior, outOfStockMessage) {
        if (getAttributeType($attribute) === 'set-select') {
            return disableSelectOptionAttribute($attribute, behavior, outOfStockMessage);
        }

        if (behavior === 'hide_option') {
            $attribute.hide(0);
        } else {
            $attribute.addClass('unavailable');
        }
    }

    function disableSelectOptionAttribute($attribute, behavior, outOfStockMessage) {
        const $select = $attribute.parent();

        if (behavior === 'hide_option') {
            $attribute.toggleOption(false);
            // If the attribute is the selected option in a select dropdown, select the first option (MERC-639)
            if ($select.val() === $attribute.attr('value')) {
                $select[0].selectedIndex = 0;
            }
        } else {
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
            $attribute.html($attribute.html().replace(outOfStockMessage, ''));
        }
    }

    function getAttributeType($attribute) {
        const $parent = $attribute.closest('[data-product-attribute]');

        return $parent ? $parent.data('productAttribute') : null;
    }

    function updateView($scope, data, content = null) {
        const viewModel = getViewModel($scope);

        showMessageBox(data.stock_message || data.purchasing_message, $scope);

        if (data.price instanceof Object) {
            updatePriceView(viewModel, data.price);
        }

        var productId = $('[name="product_id"]', $scope).val(),
            product = $bundleList.find('.halo-product-item[data-product-id="' + productId + '"]'),
            productCheckbox = product.find('.halo-detail-checkbox');

        if (!data.purchasable || !data.instock) {
            product.removeClass('isChecked hasOptions--selected');
            product.find('.status').addClass('disable').text('This item');
            productCheckbox.prop('checked', false).prop('disabled', true);
            $('#halo-addAll').find('.number').text($('.halo-product-item.isChecked').length)
        } else {
            product.addClass('isChecked');
            product.find('.status').removeClass('disable').text('Selected');
            productCheckbox.prop('checked', true).prop('disabled', false);
            $('#halo-addAll').find('.number').text($('.halo-product-item.isChecked').length)

            if ($scope.find('[data-fbt-option-change]').length > 0) {

                var check = checkBeforeAdd($scope);

                if (check == true) {
                    product.addClass('hasOptions--selected');
                }
            }
        }
    }

    function updateDefaultAttributesForOOS($scope, data) {
        var productId = $('[name="product_id"]', $scope).val(),
            product = $bundleList.find('.halo-product-item[data-product-id="' + productId + '"]'),
            productCheckbox = product.find('.halo-detail-checkbox');

        if (!data.purchasable || !data.instock) {
            product.removeClass('isChecked hasOptions--selected');
            product.find('.status').addClass('disable').text('This item');
            productCheckbox.prop('checked', false).prop('disabled', true);
            $('#halo-addAll').find('.number').text($('.halo-product-item.isChecked').length)
        } else {
            product.addClass('isChecked');
            product.find('.status').removeClass('disable').text('Selected');
            productCheckbox.prop('checked', true).prop('disabled', false);
            $('#halo-addAll').find('.number').text($('.halo-product-item.isChecked').length)

            if ($scope.find('[data-fbt-option-change]').length > 0) {
                var check = checkBeforeAdd($scope);

                if (check == true) {
                    product.addClass('hasOptions--selected');
                }
            }
        }
    }

    function getViewModel($scope) {
        return {
            $priceValue: $('.halo-detail-price', $scope),
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
            $weight: $('.productView-info [data-product-weight]', $scope),
            $increments: $('.form-field--increments :input', $scope),
            $addToCart: $('#form-action-addToCart', $scope),
            $wishlistVariation: $('[data-wishlist-add] [name="variation_id"]', $scope),
            stock: {
                $container: $('.form-field--stock', $scope),
                $input: $('[data-product-stock]', $scope),
            },
            sku: {
                $label: $('.sku-label', $scope),
                $value: $('[data-product-sku]', $scope),
            },
            upc: {
                $label: $('.upc-label', $scope),
                $value: $('[data-product-upc]', $scope),
            }, 
            quantity: {
                $text: $('.incrementTotal', $scope),
                $input: $('[name=fbtqty\\[\\]]', $scope),
            },
            $bulkPricing: $('.productView-info-bulkPricing', $scope),
            $walletButtons: $('[data-add-to-cart-wallet-buttons]', $scope),
        };
    }

    function showMessageBox(message, $scope) {
        const $messageBox = $('.productAttributes-message', $scope);

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
            const updatedPrice = price.price_range ?
                `${price.price_range.min.with_tax.formatted} - ${price.price_range.max.with_tax.formatted}`
                : price.with_tax.formatted;
            viewModel.priceLabel.$span.show();
            viewModel.$priceWithTax.html(updatedPrice);
            viewModel.$priceValue.attr('data-price-value', price.with_tax.value);
        }

        if (price.without_tax) {
            const updatedPrice = price.price_range ?
                `${price.price_range.min.without_tax.formatted} - ${price.price_range.max.without_tax.formatted}`
                : price.without_tax.formatted;
            viewModel.priceLabel.$span.show();
            viewModel.$priceWithoutTax.html(updatedPrice);
            viewModel.$priceValue.attr('data-price-value', price.without_tax.value);
        }

        if (price.rrp_with_tax) {
            viewModel.rrpWithTax.$div.show();
            viewModel.rrpWithTax.$span.html(price.rrp_with_tax.formatted);
            viewModel.$priceValue.attr('data-price-value', price.rrp_with_tax.value);
        }

        if (price.rrp_without_tax) {
            viewModel.rrpWithoutTax.$div.show();
            viewModel.rrpWithoutTax.$span.html(price.rrp_without_tax.formatted);
            viewModel.$priceValue.attr('data-price-value', price.rrp_without_tax.value);
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
            viewModel.$priceValue.attr('data-price-sale-value', price.non_sale_price_with_tax.value);
        }

        if (price.non_sale_price_without_tax) {
            viewModel.priceLabel.$span.hide();
            viewModel.nonSaleWithoutTax.$div.show();
            viewModel.priceNowLabel.$span.show();
            viewModel.nonSaleWithoutTax.$span.html(price.non_sale_price_without_tax.formatted);
            viewModel.$priceValue.attr('data-price-sale-value', price.non_sale_price_without_tax.value);
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
}
