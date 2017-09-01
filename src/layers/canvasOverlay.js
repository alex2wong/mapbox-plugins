import Overlayer from './overlay';

/**
 * initCanvasOverlayer based on mapboxgl-canvas
 */
export class CanvasOverlayer extends Overlayer {
    constructor(opts) {
        super();
        this.canvas = this._initCanvas();
        this.source = opts.objs;
    }

    _initCanvas() {
        var canvasContainer = document.querySelector(".mapboxgl-canvas-container"),
        mapboxCanvas = document.querySelector(".mapboxgl-canvas");
        if (domElement && domElement.tagName == "CANVAS") {
            canvasOverlay = domElement;
        } else {
            canvasOverlay = document.createElement("canvas");
        }
        canvasOverlay.style.position = "absolute";
        canvasOverlay.className = "overlay-canvas";
        canvasOverlay.width = parseInt(mapboxCanvas.style.width);
        canvasOverlay.height = parseInt(mapboxCanvas.style.height);
        canvasContainer.appendChild(canvasOverlay);
        return canvasOverlay;
    }

    /**
     * expoid this method, can be overwritten
     * for special render requirements..
     * Important ! redraw may use this.map as projector!
     */
    redraw(objs) {
        if (this.canvas) {
            ctx = this.canvas.getContext("2d");
            // ctx.clearRect(0,0,canv.width, canv.height);
            _preSetCtx(ctx);
            ctx.save();
            // ctx.fillStyle = "rgba(240,200,20,.7)";
            // ctx.fillRect(0,0,canv.width, canv.height);
            ctx.shadowBlur = 4;
            ctx.shadowColor = "rgba(255,255,255,.4)";
            for(var i=0;i<objs.length;i++) {
                var x = objs[i]['lon'], y = objs[i]['lat'], radius = objs[i]['radius'] || 2;
                    pix = this.lnglat2pix(x, y);
                if (pix == null) continue;
                ctx.fillStyle = objs[i]['color'];
                ctx.beginPath();
                ctx.arc(pix[0], pix[1], radius, 0, Math.PI*2);
                ctx.fill();
                ctx.closePath();
            }
            ctx.restore()
        }
    }
}

function _preSetCtx(context) {
//默认值为source-over
    var prev = context.globalCompositeOperation;
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
