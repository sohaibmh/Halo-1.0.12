import PageManager from './page-manager';
import haloBlogByTag from './halothemes/haloBlogByTag';

export default class Blog extends PageManager {
    constructor(context) {
        super(context);
    }

	onReady() {
        haloBlogByTag(this.context);
    }
}
