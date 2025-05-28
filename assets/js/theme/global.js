import 'focus-within-polyfill';
import './global/jquery-migrate';
import './common/select-option-plugin';
import PageManager from './page-manager';
import currencySelector from './global/currency-selector';
import foundation from './global/foundation';
import cartPreview from './global/cart-preview';
import carousel from './common/carousel';
import svgInjector from './global/svg-injector';
import haloGlobal from './halothemes/haloGlobal';

export default class Global extends PageManager {
    onReady() {
        const { cartId, secureBaseUrl } = this.context;
        cartPreview(secureBaseUrl, cartId, this.context);
        currencySelector(cartId);
        foundation($(document));
        carousel(this.context);
        svgInjector();
        haloGlobal(this.context);
    }
}
