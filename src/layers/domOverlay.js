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
        this.domOpts = opts.doms;  // store dom config
        if (opts && opts.map) {
            this.setMap(opts.map);
            // bind render doms to each move..performance to be promoted.
            opts.map.on("move", this.redraw);
        }
        this.doms = []; // store dom elements.
        this.lastData = [];
        this.redraw();
        console.log("Dom overlayer add to Map...");
    }

    _init() {
        let canvasContainer = this.map._canvasContainer,
            mapboxCanvas = this.map._canvas,
            domContainer = document.createElement("div");
        domContainer.style.position = "absolute";
        domContainer.className = "overlay-dom";
        domContainer.style.width = mapboxCanvas.style.width;
        domContainer.style.height = '0';
        canvasContainer.parentElement.appendChild(domContainer);
        return domContainer;
    }

    /**
     * updateDoms and redraw..
     */
    setDoms(Doms) {
        if (Array.isArray(Doms)) {
            this.domOpts = Doms;
            this.clearDoms();
            this.redraw();
        }
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
            this.domContainer.removeChild(this.doms[i]);         
        }
        this.doms = [];
    }
}


const lineHeight = 100, dotRadius = 4, chartHeight = 60;
/**
 * domOverlay register&render above default canvas..
 * keep in absolute geolocation..
 */
function _redraw() {
    let doms = this.domOpts;
    if (doms && Array.isArray(doms)) {
        // append each of domPopups to domContainer.
        for (let i=0;i<doms.length;i++) {
            let domOpt = doms[i];
            if (typeof domOpt == undefined) continue;
            // let sanity = Util.checkSanity(this.lastDoms[i], domOpt);
            let x = domOpt['lon'], y = domOpt['lat'], 
                pix = this.lnglat2pix(x, y);
            if (pix == null) continue;
            let iconName = domOpt['icon'], resources = domOpt['resources'], 
                moveClass = domOpt['class']? domOpt['class'] + ' animated': 'bounceIn animated',
                chartData = domOpt['data'], chartType = domOpt['type'];
            // data sanity should be checked, domOpts not changed then just update position!
            let dom = this.doms[i*3] || document.createElement("div"),
                line = this.doms[i*3+1] ||document.createElement("div"),
                dot =this.doms[i*3+2] || document.createElement("div");
            preStyleEles(line, dot, dom, pix, chartType);

            let dataClone = Util.deepClone(chartData);
            // handle different typesof domOverlay.
            if (resources != undefined) {
                dom.innerHTML = (domOpt['content'] || ``) + '</br>';
                Util.setResource(dom, resources);
            } else if (iconName != undefined) {
                dom.innerHTML = (domOpt['content'] || ``) + '</br>';
                Util.setIconDiv(dom, iconName);
            } else if (chartData != undefined && chartType != undefined) {
                if (Util.isChanged(this.lastData[i], chartData)) {
                    // setChart would contaminate input Data.
                    Util.setChart(dom, dataClone, chartType, chartHeight*2);
                    this.lastData[i] = chartData;
                }
            } else {
                dom.innerHTML = (domOpt['content']|| '') + '</br>';
            }
            if (chartType != undefined) styleChartContainer(dom)

            line.className = "dom-ele", dot.className = "dom-ele";
            line.style.left = pix[0] + "px";
            line.style.top = (pix[1] - (lineHeight - 10)) + "px";
            dot.style.left = pix[0] - dotRadius + "px";
            dot.style.top = pix[1] - dotRadius + "px";

            // add dom to container at init process.
            if (this.doms[i*3] == undefined) {
                dom.className = `dom-popup ${moveClass}`;
                console.warn(`add ${moveClass} css to dom.`)
                this.domContainer.appendChild(dom);
                this.domContainer.appendChild(line);
                this.domContainer.appendChild(dot);
                this.doms.push(...[dom, line, dot]);
            }
        }
    }
}

function preStyleEles(line, dot, dom, pix, chartType) {
    line.style.height = lineHeight - 10 + 'px';
    line.style.width = '1px';
    line.style.position = "absolute";
    dot.style.borderRadius = '50%';
    dot.style.width = dot.style.height = dotRadius * 2 + 'px';
    dot.style.position = "absolute";

    dom.style.position = "absolute";
    dom.style.background = "#fff";
    dom.style.padding = '5px';
    // set domOverlay position. dom box animation needed.
    dom.style.left = (pix[0] - (chartType ? chartHeight : 0)) + "px";
    dom.style.top = (pix[1] - lineHeight - (chartType ? chartHeight : 0)) + "px";
}

function styleChartContainer(dom) {
    dom.style.borderWidth = '0';
    dom.style.zIndex = 9999;
    dom.style.backgroundColor = 'rgba(0,0,0,0.0)';
}

function animLine (line){
    line.className = "dom-line";    
}

const htmlTemplate = {

}
