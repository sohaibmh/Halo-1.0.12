"use strict";(self.webpackChunkHalo=self.webpackChunkHalo||[]).push([[346],{83346:(t,o,r)=>{r.r(o),r.d(o,{default:()=>h});var e=r(4621),n=r(57792),i=r(13228),a=r(71779),c=r(76970),d=r(80156),s=r(12946),l=r(33270);function u(t,o){return u=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,o){return t.__proto__=o,t},u(t,o)}var h=function(t){function o(o){var r;return(r=t.call(this,o)||this).validationDictionary=(0,a.i)(o),r}var r,n;n=t,(r=o).prototype=Object.create(n.prototype),r.prototype.constructor=r,u(r,n);var h=o.prototype;return h.onReady=function(){l("#facetedSearch").length>0?this.initFacetedSearch():(this.onSortBySubmit=this.onSortBySubmit.bind(this),e.JL.on("sortBy-submitted",this.onSortBySubmit)),(0,d.A)(),(0,s.A)(),this.showProductsPerPage(),this.loadOptionForProductCard(this.context)},h.initFacetedSearch=function(){var t=this,o=this.validationDictionary,r=o.price_min_evaluation,e=o.price_max_evaluation,n=o.price_min_not_entered,a=o.price_max_not_entered,s=o.price_invalid_value,u=l("#product-listing-container"),h=l("#faceted-search-container"),p={template:{productListing:"brand/product-listing",sidebar:"brand/sidebar"},config:{shop_by_brand:!0,brand:{products:{limit:this.context.brandProductsPerPage}}},showMore:"brand/show-more"};this.facetedSearch=new i.A(p,(function(o){u.html(o.productListing),h.html(o.sidebar),l("body").triggerHandler("compareReset"),u.find('[data-halo-load="animation"]').length>0&&l('[data-halo-load="animation"]').addClass("animated"),l("#product-listing-container .product").length>0&&(0,c.A)(t.context,"product-listing-container"),(0,d.A)(),t.showProductsPerPage(),window.scrollTo({top:0,behavior:"smooth"})}),{validationErrorMessages:{onMinPriceError:r,onMaxPriceError:e,minPriceNotEntered:n,maxPriceNotEntered:a,onInvalidPrice:s}})},h.loadOptionForProductCard=function(t){l("#product-listing-container .product").length>0&&(0,c.A)(t,"product-listing-container")},h.showProductsPerPage=function(){try{var t=new URL(window.location.href).searchParams.get("limit");if(t){l(".btn-show-products").removeClass("selected");var o=l('.btn-show-products[data-value="'+t+'"]');o.addClass("selected"),o.closest(".actionBar-dropdown").find(".dropdown-label").text(o.find("span").text())}}catch(t){}},o}(n.A)}}]);
//# sourceMappingURL=theme-bundle.chunk.346.js.map