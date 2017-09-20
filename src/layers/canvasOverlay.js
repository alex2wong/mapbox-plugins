import Overlayer from './overlay';

/**
 * initCanvasOverlayer based on mapboxgl-canvas
 */
export class CanvasOverlayer extends Overlayer {
    constructor(opts) {
        let _opts = opts || {};
        super(_opts);
        this.canvas = this._init();
        this.redraw = _redraw.bind(this);
        this.shadow = _opts.shadow != undefined? _opts.shadow : false;
        this.keepTrack = _opts.keepTrack != undefined? _opts.keepTrack : false;
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

const iconSize = 48; 
/**
 * expoid this method, can be overwritten
 * for special render requirements..
 * Important ! redraw may use this.map as projector!
 * @param: keepLog, keep render Sprites location log.. 
 */
function _redraw(objs) {
    if (this.canvas) {
        let ctx = this.canvas.getContext("2d");
        // ctx.clearRect(0,0,canv.width, canv.height);
        if (this.shadow) {
            _preSetCtx(ctx);
        } else {
            ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        }
        ctx.save();
        // ctx.fillStyle = "rgba(240,200,20,.7)";
        // ctx.fillRect(0,0,canv.width, canv.height);
        ctx.shadowBlur = 4;
        ctx.shadowColor = "rgba(255,255,255,.4)";
        ctx.strokeStyle = "rgba(255,255,255,.4)";
        for(let i=0;i<objs.length;i++) {
            let x = objs[i]['lon'], y = objs[i]['lat'], 
                radius = objs[i]['radius'] || 2, icon = objs[i]['icon'],
                label = objs[i]['name'], rotate = objs[i]['direction'];
            radius = Math.abs(radius);
            let pix = this.lnglat2pix(x, y);
            if (pix == null) continue;
            ctx.fillStyle = objs[i]['color'];
            ctx.beginPath();
            if (label.startsWith("Play")) radius = 32;
            // icon: Image, clip part of img sometimes...
            if (icon !== undefined) {
                let min = icon.height > icon.width ? icon.width : icon.height;
                ctx.save();
                ctx.translate(pix[0], pix[1]);
                ctx.rotate(rotate*Math.PI/180);                
                ctx.drawImage(icon,0,0,min,min, -iconSize/2, -iconSize/2, iconSize, iconSize);
                ctx.restore();
                // or drawSome Triangle things to present the Sprites..
            } 
            // if (label !== undefined) {
            //     ctx.strokeText(label, pix[0], pix[1]);
            // }
            ctx.arc(pix[0], pix[1], radius, 0, Math.PI*2);
            ctx.stroke();
            // ctx.fill();
            ctx.closePath();
        }
        ctx.restore()
    }
}
