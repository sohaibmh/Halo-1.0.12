export default function(context, wrapper) {
    if (context.themeSettings.haloAddOptionForProduct == true) {
        const token = context.token,
            product_wrapper = $('#'+wrapper),
            product_class = product_wrapper.find('.card:not(.is-loaded)');
        var  list = [];

        function callProductOption() {
            product_class.each((index, element) => {
                var productId = $(element).data("product-id");
                if(!$(element).find('[data-product-attribute="swatch"]').children().length){
                    list.push(productId.toString());
                }
            });

            list = uniqueArray(list);

            if(list.length > 0){
                getProductOption(list).then(data => {
                    renderOption(data);

                    $.each(list, (idx, item) => {
                        var arr = {},
                            productId = list[idx];
                        var thisProduct = product_wrapper.find('.card:not(.is-loaded) .card-option-'+productId+':not(.is-loaded):eq(0)');

                        thisProduct.find('.form-option-swatch').each((index, element) => {
                            var txt = $(element).data('product-swatch-value');

                            if (arr[txt]){
                                $(element).remove();
                            } else {
                                arr[txt] = true;
                            }
                        });
                        
                        if(thisProduct.find('.form-option-swatch').length > 4){
                            var countMoreOption  = thisProduct.find('.form-option-swatch').length - 4,
                                productLink = product_wrapper.find('[data-product-id="'+productId+'"]').find('.card-title').attr('href');

                            thisProduct.find('.form-option-swatch').each((index, element) => {
                                if(index >= 4){
                                    $(element).remove();
                                }
                            });

                            if(thisProduct.find('.form-field .showmore').length < 1){
                                thisProduct.find('.form-field').append('<a href="'+productLink+'" class="form-option form-option-swatch halo-fadeIn showmore">+'+countMoreOption+'</a>');
                            }
                        }

                        thisProduct
                            .addClass('is-loaded')
                            .closest('.card')
                            .addClass('is-loaded');
                    });

                });
            }
        }

        function getProductOption(list){
            return fetch('/graphql', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    query: `
                        query SeveralProductsByID {
                            site {
                                products(entityIds: [`+list+`], first: 50) {
                                    edges {
                                        node {
                                            entityId
                                            name
                                            defaultImage{
                                                urlOriginal
                                            }
                                            variants(first: 250){
                                                edges{
                                                    node{
                                                        entityId
                                                        defaultImage{
                                                            urlOriginal
                                                        }
                                                        productOptions(first: 50) {
                                                            edges {
                                                                node {
                                                                    entityId
                                                                    displayName
                                                                    isRequired
                                                                    ... on MultipleChoiceOption {
                                                                        displayStyle
                                                                        values {
                                                                            edges {
                                                                                node {
                                                                                    entityId
                                                                                    label
                                                                                    isDefault
                                                                                    ... on SwatchOptionValue {
                                                                                        hexColors
                                                                                        imageUrl(width: 150)
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    `
                }),
            }).then(res => res.json()).then(res => res.data);
        }

        function renderOption(data){
            var aFilter = data.site.products.edges;

            $.each(aFilter, (index, element) => {
                var productId = aFilter[index].node.entityId,
                    productImage,
                    productFieldColor = product_wrapper.find('.card-option-'+productId+':not(.is-loaded):eq(0) .form-field'),
                    aFilter2 = aFilter[index].node.variants.edges;
                    
                if (aFilter[index].node.defaultImage){
                    productImage = aFilter[index].node.defaultImage.urlOriginal;
                } else{
                    productImage ='https://cdn11.bigcommerce.com/s-ol6dayxf7q/stencil/d960f210-86dd-0138-e71d-0242ac110008/e/a2941d20-8b64-0138-e78d-0242ac110013/img/ProductDefault.gif';
                }


                $.each(aFilter2, (idx, el) => {
                    var variantImage,
                        aFilter3 = aFilter2[idx].node.productOptions.edges;

                    if(aFilter2[idx].node.defaultImage){
                        variantImage = aFilter2[idx].node.defaultImage.urlOriginal;
                    }

                    if(variantImage === undefined || variantImage === null){
                        variantImage = productImage;
                    }

                    var aFilter4 = aFilter3.filter(function (item) {
                        return item.node.displayStyle === 'Swatch';
                    });

                    if(aFilter4.length > 0){
                        var aFilter5 = aFilter4[0].node.values.edges;

                        $.each(aFilter5, (idx, element) => {
                            var titleVar = aFilter5[idx].node.label,
                                idVar = aFilter5[idx].node.entityId,
                                lengthColorVar = aFilter5[idx].node.hexColors.length,
                                color1 = aFilter5[idx].node.hexColors[0],
                                color2 = aFilter5[idx].node.hexColors[1],
                                color3 = aFilter5[idx].node.hexColors[2],
                                img = aFilter5[idx].node.imageUrl;


                            if(lengthColorVar == 2){
                                productFieldColor.append('<label class="form-option form-option-swatch halo-fadeIn two-colors" data-image ="'+variantImage+'" data-product-swatch-value="'+idVar+'" data-title="'+titleVar+'"><span class="form-option-tooltip f-size-tiny d-none">'+titleVar+'</span><span class="form-option-variant form-option-variant--color form-option-variant--color2" title="'+titleVar+'"><span class="form-option-variant-wrapper"><span style="background-color:'+color1+';border: none;left: -1px;"></span><span style="background-color:'+color2+';border: none;"></span></span></span></label>');
                            } else if(lengthColorVar === 3){
                                productFieldColor.append('<label class="form-option form-option-swatch halo-fadeIn three-colors two-colors" data-image ="'+variantImage+'" data-product-swatch-value="'+idVar+'" data-title="'+titleVar+'"><span class="form-option-tooltip f-size-tiny d-none">'+titleVar+'</span><span class="form-option-variant form-option-variant--color form-option-variant--color2" title="'+titleVar+'"><span class="form-option-variant-wrapper"><span style="background-color:'+color1+'"></span><span style="background-color:'+color2+'"></span><span style="background-color:'+color3+'"></span></span></span></label>');
                            } else if(Boolean(color1)){
                                productFieldColor.append('<label class="form-option form-option-swatch halo-fadeIn" data-image ="'+variantImage+'"  data-product-swatch-value="'+idVar+'" data-title="'+titleVar+'"><span class="form-option-tooltip f-size-tiny d-none">'+titleVar+'</span><span class="form-option-variant form-option-variant--color" title="'+titleVar+'" style="background-color: '+color1+'"></span></label>');
                            } else if(Boolean(img)){
                                productFieldColor.append('<label class="form-option form-option-swatch halo-fadeIn " data-image ="'+variantImage+'" data-product-swatch-value="'+idVar+'" data-title="'+titleVar+'"><span class="form-option-tooltip f-size-tiny d-none">'+titleVar+'</span><span class="form-option-variant form-option-variant--pattern" title="'+titleVar+'" style="background-image: url('+img+')"></span></label>');
                            }
                        });
                    } else {
                        productFieldColor.remove();
                    }
                });
            });
        }

        function uniqueArray(list) {
            var result = [];

            $.each(list, (index, element) => {
                if ($.inArray(element, result) == -1) {
                    result.push(element);
                }
            });

            return result;
        }

        callProductOption();

        product_wrapper.on('beforeChange', function (){
            callProductOption();
        })
    }
}
