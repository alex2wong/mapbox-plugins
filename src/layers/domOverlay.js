import Overlayer from './overlay';

/**
 * initDomOverlayer
 */
export class DomOverlayer extends Overlayer {
    constructor(opts) {
        super(opts);
        this.dom = _initDom();
    }

    _initDom() {

    }
}
