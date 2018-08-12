import Util from "../util";

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
        var gradient = ctx.createLinearGradient(0, 0, 600, 0);
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

function drawArrows(ctx, line, enableAni = false) {
    let aniOffset = .5;
    aniOffset = aniOffset < 1 ? aniOffset + .01 : .5;
    for (let i = 1; i < line.length; i += 1) {
        drawArrow(ctx, line[i-1], line[i], aniOffset); // one segment.
        // console.warn(`draw segment#${i} arrows done... from ${line[i-1].join()}
        //      to ${line[i].join()}`);
    }
    if (enableAni) requestAnimationFrame(drawArrows);
}
let debDrawArrows = function(){};
if (Util) {
    debDrawArrows = Util.debounce(drawArrows, 100);
}

/**
 * drawArrowline in canvasOverlayer, can mutate input line data !
 * @param {*array typed line vertex.} line 
 * @param {*enable animation of draw arrow..} enableAni 
 */
export function drawArrowLine(enableAni = false, lineStyle) {
    let ctx;
    if (this.canvas) {
        ctx = this.canvas.getContext('2d');
    }
    if (ctx instanceof CanvasRenderingContext2D) {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        setLineStyle(ctx);
        let line = [0, 0];
        if (Array.isArray(this.data)) {
            line = this.data.map((lnglat) => { return this.lnglat2pix(lnglat[0], lnglat[1]); });
        } else return;

        ctx.beginPath();
        ctx.moveTo(line[0][0], line[0][1]);
        for (let i = 1; i < line.length; i += 1) {
            ctx.lineTo(line[i][0], line[i][1]);
        }
        ctx.stroke();
        ctx.closePath();
        debDrawArrows(ctx, line);
    }
}

function setLineStyle(ctx, shadow = false) {
    ctx.strokeStyle = 'green';
    ctx.setLineDash([]);
    ctx.globalAlpha = 0.95;
    ctx.globalCompositeOperation = 'source-over';
    if (shadow) {
        console.warn(`enabling line shadowBlur`);
        ctx.shadowBlur = 4;
        ctx.shadowColor = '#0f0';
    } else {
        ctx.shadowBlur = 0;
    }

    // ctx.strokeStyle = 'green';
    ctx.lineCap = "round";  // square
    ctx.lineJoin = 'round'; // bevel
    ctx.lineWidth = 12;
}

function drawArrow(ctx, startPoint, endPoint, aniOffset) {
    // arrow img: assets/up.png
    var img = new Image();
    img.src = '../../assets/arrowright.png';  //arrowright/double right/arrow
    img.onload = function() {
        generatePoints(startPoint, endPoint, 30, ctx, aniOffset, img);
    }
}

function generatePoints(startP, endP, stepSize = 30, ctx, aniOffset = 0.5, img) {
    let radA = Math.atan((endP[1] - startP[1]) / (endP[0] - startP[0]));
    if ((endP[0] - startP[0]) < 0) {
        radA += Math.PI;
    }
    const dist = calcDist(startP, endP);
    let points = [];
    const steps = dist / stepSize;

    const drawImg = (pX, pY) => {
        if (img && ctx) {
            ctx.save();
            // ctx.beginPath();
            ctx.translate(pX , pY);  // consider img position and imgWidth/Height.
            ctx.rotate(radA);
            // ctx.arc(0, 0, 2, 0, 2 * Math.PI);
            ctx.drawImage(img, -img.width / 2,  -img.width/2);
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

/**
 *      . <-- center coordinate [x, y].
 *     / \
 *    `   ` 
 * 
 */
function calcLRPoints(center, rotate) {
    const arrawRadius = 3;
    return center;
}

function drawGradientRect(ctx, line) {
    
}
