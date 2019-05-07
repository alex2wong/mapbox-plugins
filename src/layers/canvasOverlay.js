import Overlayer from './overlay';

/**
 * initCanvasOverlayer based on mapboxgl-canvas
 */
export class CanvasOverlayer extends Overlayer {
    constructor(opts) {
        let _opts = opts || {};
        super(_opts);
        this.canvas = this._init();
        this.redraw = _opts.render ? _opts.render : _redraw.bind(this);
        this.data = _opts.data ? _opts.data: null;
        // how to deconstruct opts to this if we need defaultValue.
        this.labelOn = _opts.labelOn || false;
        this.xfield = _opts.xfield || 'lon';
        this.yfield = _opts.yfield || 'lat';
        this.shadow = _opts.shadow != undefined? _opts.shadow : false;
        this.lineColor = _opts.lineColor;
        this.blurWidth = _opts.blurWidth != undefined? _opts.blurWidth: 4;
        this.keepTrack = _opts.keepTrack != undefined? _opts.keepTrack : false;
        if (this.keepTrack) {
            // create trackLayer to render history track lines..
            this.trackLayer = this._init();
            this._initTrackCtx();
        }
        this.tracks  = [];
        this.initTrackCtx = this._initTrackCtx.bind(this);
        if (_opts && _opts.map) {
            this.setMap(_opts.map);
            console.warn(`register map moveend rerender handler..`);
            _opts.map.on("move", () => {
                this.redraw();
                this.redrawTrack();
            });
        }
        this.redraw();
    }

    _init(shadow=false,keepTrack=false) {
        let canvasContainer = this.map._canvasContainer,
            mapboxCanvas = this.map._canvas,
            canvasOverlay = document.createElement("canvas");
        canvasOverlay.style.position = "absolute";
        canvasOverlay.className = "overlay-canvas";
        canvasOverlay.width = parseInt(mapboxCanvas.style.width);
        canvasOverlay.height = parseInt(mapboxCanvas.style.height);
        canvasContainer.appendChild(canvasOverlay);
        return canvasOverlay;
    }

    _transformLnglat() {
        // transform lnglat data to pix.
        if (Array.isArray(this.data)) {
            console.warn(`transformed lnglat data to pix..`);
            const pixArr = this.data.map((lnglatArr) => { 
                return this.lnglat2pix(lnglatArr[0], lnglatArr[1]);
            });
            return pixArr;
        }
    }

    /**
     * init track ctx for each track segment rendering..
     */
    _initTrackCtx() {
        if(this.trackLayer) {
            this.trackCtx = this.trackLayer.getContext("2d");
            this.movedTo = false;
            initCtx(this.trackCtx, this.blurWidth,"rgba(255,255,255,.4");
            this.trackCtx.lineWidth = this.lineWidth || 3;
            this.trackCtx.strokeStyle = this.lineColor || "rgba(255,255,20,.6)";
            this.trackCtx.beginPath();
        }
    }

    /**
     * set tracks coordinates of overlayer.
     * @param {*array of track points.} tracks 
     */
    setTracks(tracks) {
        if (Array.isArray(tracks)) {
            this.tracks = tracks;
            return this;
        }
    }

    getTracks() {
        return this.tracks;
    }

    /**
     * render cached tracks to line when map moved..
     */
    redrawTrack() {
        if(this.trackCtx && this.tracks && this.tracks.length > 0) {
            let pix = [0, 0];
            this.trackCtx.clearRect(0,0,this.trackLayer.width, this.trackLayer.height);
            this.trackCtx.beginPath();
            pix = this.lnglat2pix(this.tracks[0][0], this.tracks[0][1]);
            this.trackCtx.moveTo(pix[0], pix[1]);
            for(let i = 1; i < this.tracks.length; i ++) {
                pix = this.lnglat2pix(this.tracks[i][0], this.tracks[i][1]);
                this.trackCtx.lineTo(pix[0], pix[1]);
            }
            this.trackCtx.stroke();
        }
    }

    clear() {
        if (this.canvas) {
            let ctx = this.canvas.getContext("2d");
            ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        }
    }
}

function _preSetCtx(context) {
//默认值为source-over
    let prev = context.globalCompositeOperation;
    //只显示canvas上原图像的重叠部分 source-in, source, destination-in
    context.globalCompositeOperation = 'destination-in';
    //设置主canvas的绘制透明度
    context.globalAlpha = 0.95;
    //这一步目的是将canvas上的图像变的透明
    // context.fillStyle = "rgba(0,0,0,.95)";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    //在原图像上重叠新图像
    context.globalCompositeOperation = prev;
}

const iconSize = 32; 
/**
 * expoid this method, can be overwritten
 * for special render requirements..
 * Important ! redraw may use this.map as projector!
 * @param: keepLog, keep render Sprites location log.. 
 */
function _redraw(data) {
    if (this.canvas) {
        let ctx = this.canvas.getContext("2d");
        const objs = data ? data : this.data;
        if (!Array.isArray(objs)) return;
        // ctx.clearRect(0,0,canv.width, canv.height);
        if (this.shadow) {
            _preSetCtx(ctx);
            ctx.save();
        } else {
            ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        }
        initCtx(ctx,this.blurWidth,"rgba(255,255,255,.4");
        for(let i=0;i<objs.length;i++) {
            let x = objs[i][this.xfield], y = objs[i][this.yfield], 
                radius = objs[i]['radius'] || 3, icon = objs[i]['icon'],
                label = objs[i]['name'], rotate = objs[i]['direction'] || 0;
            radius = Math.abs(radius);
            let pix = this.lnglat2pix(x, y);
            if (pix == null) continue;
            ctx.fillStyle = objs[i]['color'] || 'rgba(255,240,4,.9)';
            ctx.beginPath();
            if (label !== undefined && label.startsWith("Play")) radius = iconSize*0.75;
            // icon: ImageUrl/CanvasFunction..., clip part of img sometimes...
            if (icon !== undefined) {
                ctx.save();
                ctx.translate(pix[0], pix[1]);
                ctx.rotate(rotate*Math.PI/180);
                let min = icon.height > icon.width ? icon.width : icon.height;
                try {
                    ctx.drawImage(icon,0,0,min,min, -iconSize/2, -iconSize/2, iconSize, iconSize);
                } 
                catch (e) {
                    console.warn("ctx.drawImage.. error.");
                }
                ctx.restore();
            } else {
                ctx.arc(pix[0], pix[1], radius, 0, Math.PI*2);
                ctx.fill();
            }
            if (this.keepTrack && this.tracks.length == 0) {
                this.initTrackCtx();
                this.trackCtx.moveTo(pix[0],pix[1]);
                this.tracks.push([x, y]);
                // this.movedTo = true;
            } else if (this.trackCtx) {
                this.trackCtx.lineTo(pix[0],pix[1]);
                this.tracks.push([x, y]);
                setTimeout(()=>{
                    //// closePath would auto-complete the path to polygon..
                    this.trackCtx.stroke();
                    this.trackCtx.beginPath();
                    this.trackCtx.moveTo(pix[0],pix[1]);
                }, 0);
            }
            if (label !== undefined && this.labelOn) {
                ctx.strokeText(label, pix[0], pix[1]);
            }
            // ctx.closePath();
        }
        if(this.shadow) {
            ctx.restore();
        }
    }
}

function initCtx(ctx, blurWidth, shadowColor="rgba(255,255,255,.8)") {
    if (ctx === undefined) return;
    ctx.linecap = 'round';
    ctx.shadowBlur = blurWidth;
    ctx.shadowColor = shadowColor;
    ctx.strokeStyle = "rgba(255,255,255,.9)";
    ctx.fillStyle = "rgba(255,240,91,.8)";
}

/**
 * draw tri on canvas by center and rotation..
 * @param rotate: degree number,
 * @param radius: number, tri radius..
 *      /\  default beta angle is 30 degree.
 *     /  \
 *    /____\ 
 * draw triangle 
 */
function drawTri(ctx, coord, rotate, radius=iconSize/2, beta=30) {
    // calc the head point of triangle.
    let headPoint = [undefined, undefined], tailPoint = [undefined, undefined],
        rad = rotate*Math.PI/180;
    headPoint[0] = coord[0] + Math.cos(rad)*radius;
    headPoint[1] = coord[1] + Math.sin(rad)*radius;
    tailPoint[0] = coord[0] - Math.cos(rad)*radius;
    tailPoint[1] = coord[1] - Math.sin(rad)*radius;
    let rot = (rotate - beta/2),
        rPoint = [undefined, undefined];
    rPoint[0] = Math.cos(rot*Math.PI/180);

    ctx.lineTo(headPoint);
}
