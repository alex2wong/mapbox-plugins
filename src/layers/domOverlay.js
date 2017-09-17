import Overlayer from './overlay';
import Util from '../util';

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
            // 绑定每次move 都重绘doms..
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

    /**
     * updateDoms and redraw..
     */
    set setDom(opts) {
         opts.map.un("move", () => {
            this.redraw(opts);
        });
        this.redraw(opts);
    }

    findDom(domId) {
        for(let i = 0;i<this.doms.length;i++) {
            try {
                if (this.doms[i] === domId) {
                    return this.doms[i];
                }
            } catch (error) {

            }
        }
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


const lineHeight = 100, dotRadius = 4;
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
            let iconName = domOpt['icon'];
            let dom = document.createElement("div"),
                line = document.createElement("div"),
                dot = document.createElement("div");
            line.style.height = lineHeight - 10 + 'px';
            line.style.width = '1px';
            line.style.position = "absolute";
            dot.style.borderRadius = '50%';
            dot.style.width = dot.style.height = dotRadius * 2 + 'px';
            dot.style.position = "absolute";

            dom.innerHTML = domOpt['content'];
            Util.setIconDiv(dom, iconName);
            dom.className = "dom-popup";
            dom.style.position = "absolute";
            dom.style.background = "#fff";
            dom.style.padding = '5px';
            dom.style.left = pix[0] + "px";
            // calc the dom bottom, depend on its height and canvas height..
            dom.style.top = (pix[1] - lineHeight) + "px";

            line.className = "dom-ele", dot.className = "dom-ele";
            line.style.left = pix[0] + "px";
            line.style.top = (pix[1] - (lineHeight - 10)) + "px";
            dot.style.left = pix[0] - dotRadius + "px";
            dot.style.top = pix[1] - dotRadius + "px";

            this.domContainer.appendChild(dom);
            this.domContainer.appendChild(line);
            this.domContainer.appendChild(dot);
            this.doms.push(...[dom, line, dot]);
        }
    }
}

const htmlTemplate = {

}
