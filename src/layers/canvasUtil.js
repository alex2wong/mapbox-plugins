import Util from "../util";
const DEFAULT_ICON = '../../assets/arrowright.png';

function drawDashLine(ctx, line) {
    if (ctx instanceof CanvasRenderingContext2D && line instanceof Array) {
        ctx.setLineDash([10, 5]);
        ctx.strokeStyle = 'rgba(0,252,100,0.6)';
        ctx.lineWidth = 6;
        
        ctx.beginPath();
        ctx.moveTo(line[0][0], line[0][1]);
        for (let i = 1; i < line.length; i += 1) {
            ctx.lineTo(line[i][0], line[i][1]);
        }
        ctx.stroke();
        ctx.closePath();
    }
}

/**
 * drawGradientline
 * @param {* 2d context } ctx 
 * @param {* line vertex array typed in flat x,y} line 
 * @param {* draw line with shadow blur } shadow 
 */
function drawGradientLine(ctx, line, shadow = false) {
    if (ctx instanceof CanvasRenderingContext2D && line instanceof Array) {
        // build gradient style
        var gradient = ctx.createLinearGradient(0, 0, ctx.canvas.width, 0);
        gradient.addColorStop(0, "rgba(0,255,100,0.9)");
        gradient.addColorStop(1, "rgba(255,255,255,0.1)");

        if (shadow) {
            console.warn(`enabling line shadowBlur`);
            ctx.shadowBlur = 4;
            ctx.shadowColor = '#0f0';
        }

        ctx.strokeStyle = gradient;
        ctx.setLineDash([]);
        ctx.globalAlpha = 0.9;
        ctx.globalCompositeOperation = 'source-over';

        // ctx.strokeStyle = 'green';
        ctx.lineCap = "round";  // square
        ctx.lineJoin = 'round'; // bevel
        ctx.lineWidth = 6;

        ctx.beginPath();
        ctx.moveTo(line[0][0], line[0][1]);
        for (let i = 1; i < line.length; i += 1) {
            ctx.lineTo(line[i][0], line[i][1]);
        }
        ctx.stroke();
        ctx.closePath();
    }
}

/**
 * drawIconLine in canvasOverlayer, can mutate input line data !
 * @param {*array typed line vertex.} line 
 * @param {*enable animation of draw arrow..} enableAni 
 */
export function drawIconLine(debounce=false, lineStyle) {
    let ctx;
    if (this.canvas) {
        ctx = this.canvas.getContext('2d');
    }
    if (ctx instanceof CanvasRenderingContext2D) {
        let line = [0, 0];
        if (Array.isArray(this.data)) {
            line = this.data.map((lnglat) => this.lnglat2pix(lnglat[0], lnglat[1]));
        } else return;
        if (this.__lineIcon === undefined) {
            this.__lineIcon = new Image();
            this.__lineIcon.onload = () => drawIcon4Line.bind(this)(ctx, line);
            this.__lineIcon.src = lineStyle && lineStyle.icon ? lineStyle.icon : DEFAULT_ICON;
        }
        setLineStyle(ctx, lineStyle);

        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.beginPath();
        ctx.moveTo(line[0][0], line[0][1]);
        for (let i = 1; i < line.length; i += 1) {
            ctx.lineTo(line[i][0], line[i][1]);
        }
        ctx.stroke();
        return debounce ? debDrawIcon4Line.bind(this)(ctx, line) : drawIcon4Line.bind(this)(ctx, line);
    }
}

function setLineStyle(ctx, style={ color: 'green', lineDash: [], shadow: false, shadowBlur: 4, shadowColor: '#eee' }) {
    ctx.strokeStyle = style.color;
    ctx.setLineDash(style.lineDash);
    ctx.globalAlpha = 0.95;
    ctx.globalCompositeOperation = 'source-over';
    if (style.shadow === true) {
        ctx.shadowBlur = style.shadowBlur;
        ctx.shadowColor = style.shadowColor;
    } else {
        ctx.shadowBlur = 0;
    }

    // ctx.strokeStyle = 'green';
    ctx.lineCap = "round";  // square
    ctx.lineJoin = 'round'; // bevel
    ctx.lineWidth = 12;
}

/**
 * draw Icons on segments (---) of one line.
 * @param {*} ctx 
 * @param {*} line 
 */
function drawIcon4Line(ctx, line) {
    if (this.__lineIcon === undefined || this.__lineIcon.src === '') return;
    let aniOffset = .5;
    aniOffset = aniOffset < 1 ? aniOffset + .01 : .5;
    for (let i = 1; i < line.length; i += 1) {
        drawIcon4Segment(ctx, line[i-1], line[i], aniOffset, this.__lineIcon);
        // console.warn(`draw segment#${i} arrows done... from ${line[i-1].join()}
        //      to ${line[i].join()}`);
    }
}
let debDrawIcon4Line = function(){};
if (Util) {
    debDrawIcon4Line = Util.debounce(drawIcon4Line, 100);
}

/**
 * draw Icons on single segment (-) of line.
 * @param {*} ctx 
 * @param {*} startPoint 
 * @param {*} endPoint 
 * @param {*} aniOffset 
 */
function drawIcon4Segment(ctx, startPoint, endPoint, aniOffset, iconImg) {
    generatePoints(startPoint, endPoint, 30, ctx, aniOffset, iconImg);
}

/**
 * Generate segment Icon points by given stepSize
 * @param {*} startP 
 * @param {*} endP 
 * @param {* stepSize of line Icon in screen pixel, default:30px } stepSize . 
 * @param {*} ctx 
 * @param {* icon offset on line, for eg: set 1 for offset by one stepSize. } aniOffset 
 * @param {* icon img to render alongsize line: Image } img 
 */
function generatePoints(startP, endP, stepSize = 30, ctx, aniOffset = 0.5, iconImg) {
    // calc icon rotate by line segment direction.
    let radA = Math.atan((endP[1] - startP[1]) / (endP[0] - startP[0]));
    if ((endP[0] - startP[0]) < 0) {
        radA += Math.PI;
    }
    const dist = calcDist(startP, endP);
    let points = [];
    const steps = dist / stepSize;

    const drawImg = (pX, pY) => {
        if (iconImg && ctx) {
            ctx.save();
            // ctx.beginPath();
            ctx.translate(pX , pY);  // consider img position and imgWidth/Height.
            ctx.rotate(radA);
            // ctx.arc(0, 0, 2, 0, 2 * Math.PI);
            ctx.drawImage(iconImg, -iconImg.width / 2,  -iconImg.width/2);
            // ctx.stroke();
            // ctx.closePath();
            ctx.restore();
        }
    }

    // gen points by stepSize.. if enable corner arrow, start s with (0~1) float number.
    for (let s = aniOffset; s <= steps; s += 1) {
        const pX = Math.round(startP[0] + s * stepSize * Math.cos(radA));
        const pY = Math.round(startP[1] + s * stepSize * Math.sin(radA));
        points.push([pX, pY]);
        drawImg(pX, pY);
    }
    // console.warn(`icon Number: ${points.length}`);
    return points;
}

function calcDist(startP, endP) {
    return Math.sqrt((endP[1] - startP[1]) ** 2 + (endP[0] - startP[0]) ** 2);
}
