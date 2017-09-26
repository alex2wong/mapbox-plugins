import Overlayer from './overlay';
import Util from '../util';

const duration = 1200;

/**
 * initDomOverlayer
 */
export class DomOverlayer extends Overlayer {
    constructor(opts) {
        super(opts);
        this.domContainer = this._init();
        this.redraw = _redraw.bind(this);
        if (opts && opts.map) {
            this.setMap(opts.map);
            opts.map.on("move", () => {
                this.redraw(opts);
            });
        }
        this.doms = [];
        this.redraw(opts);
        console.log("Dom overlayer add to Map...");
    }

    _init() {
        let canvasContainer = this.map._canvasContainer,
            mapboxCanvas = this.map._canvas,
            domContainer = document.createElement("div");
        domContainer.style.position = "absolute";
        domContainer.className = "overlay-dom";
        domContainer.style.width = mapboxCanvas.style.width;
        domContainer.style.height = mapboxCanvas.style.height;
        canvasContainer.appendChild(domContainer);
        return domContainer;
    }

    clearDoms() {
        for(let i = 0;i<this.doms.length;i++) {
            try {
                this.domContainer.removeChild(this.doms[i]);
            } catch (error) {

            }            
        }
    }
}

/**
 * domOverlay register&render above default canvas..
 * keep in absolute geolocation..
 */
function _redraw(domOpts) {
    if (domOpts && domOpts.doms) {
        let doms = domOpts.doms;
        this.clearDoms();
        // append each of domPopups to domContainer.
        for(let i=0;i<doms.length;i++) {
            let domOpt = doms[i];
            let x = domOpt['lon'], y = domOpt['lat'], 
                pix = this.lnglat2pix(x, y);
            if (pix == null) continue;
            let iconName = domOpt['icon'],
                dom = document.createElement("div"),
                line = document.createElement("div"),
                point = document.createElement("div");
            animLine(line);
            point.style.borderRadius = '50%';
            point.style.width = '4px';
            point.style.height = '4px';

            dom.innerHTML = domOpt['content'];
            Util.setIconDiv(dom, iconName);
            dom.className = "dom-popup";
            dom.style.position = "absolute";
            dom.style.background = "#fff";
            dom.style.padding = '5px';
            // set domOverlay position. dom box animation needed.
            dom.style.left = pix[0] + "px";
            dom.style.top = pix[1] + "px";
            dom.style.zIndex = 100;
            dom.style.animation
            this.domContainer.appendChild(point);
            this.domContainer.appendChild(line);
            this.domContainer.appendChild(dom);
            this.doms.push(dom);
        }
    }
}

function animLine (line){
    line.className = "dom-line";    
}

const htmlTemplate = {

}
