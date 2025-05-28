import PageManager from './page-manager';
import { showAlertModal } from './global/modal';

export default class Compare extends PageManager {
    onReady() {
        const message = this.context.compareRemoveMessage;

        $('body').on('click', '[data-comparison-remove]', event => {
            if (this.context.comparisons.length <= 2) {
                showAlertModal(message);
                event.preventDefault();
            }
        });
    }
}
