
// Some Static Function bind with one Canvas context
export default class Canvas {
    // Bound with a canvas element.
    static init(ele) {
        Canvas.canv = ele;
        Canvas.height = ele.height;
        Canvas.width = ele.width;
        // let the canvas's width/height cohere width DOM width/height. 
        Canvas.canv.width = ele.width;
        Canvas.canv.height = ele.height;
        Canvas.ctx = ele.getContext("2d");
        Canvas.ctx.strokeStyle = "rgba(0,0,0,0.9)";
        Canvas.ctx.fillStyle = "rgba(10,200,240,0.4)";
        Canvas.ctx.strokeWidth = 2;
        Canvas.animate = false;
        Canvas.img = new Image();
    }

    /**
     * set ctx.strokeStyle with rgba() @string
     */
    static setStroke(colorStr) {
        Canvas.ctx.strokeStyle = colorStr;
    }

    /**
     * set ctx.fillStyle with rgba(). @string
     */
    static setFill(colorStr) {
        Canvas.ctx.fillStyle = colorStr;
    }

    /**
     * set ctx.strokeWidth and lineWidth. @number
     */
    static setWidth(pixel) {
        if (Canvas.ctx) 
        {
            Canvas.ctx.lineWidth = pixel;
            Canvas.ctx.strokeWidth = pixel;
        }
    }

    /**
     * draw Circle with given x, y.
     * radius: radius of Circle @number
     * fill @bool
     */
    static drawPoint(coords, radius, fill, image, rotate, text){
        let imgWidth, imgHeight;
        Canvas.setFill("#EEE");
        Canvas.setStroke("#EE1");
        if (coords instanceof Array && coords.length == 2){
            Canvas.ctx.beginPath();
            if (image) {
                Canvas.img.src = image;
                if (radius) {
                    imgWidth = radius;
                    imgHeight = radius;
                } else {
                    imgWidth = Canvas.img.width;
                    imgHeight = Canvas.img.height;
                }
                // drawImage(img, x2left, y2up, imgWidth, imgHeight)
                // console.log("rendering drone..with width:" + imgWidth + " height:" + imgHeight);
                let y = Canvas.height - coords[1];
                if(rotate) Canvas.rotateCtx(coords, rotate);
                Canvas.ctx.drawImage(Canvas.img, parseInt(coords[0]), parseInt(y),imgWidth,imgHeight);
                if(rotate) Canvas.restore(coords);
                return;
            }
            let y = Canvas.height - coords[1];
            Canvas.ctx.arc(parseInt(coords[0]), parseInt(y), radius, 0, Math.PI*2);
            
            if (typeof rotate == 'number') {
                let tmp = rotate%(Math.PI*2) - Math.PI/2;
                Canvas.ctx.arc(parseInt(coords[0]), parseInt(y), radius + 2, tmp-Math.PI/4, tmp+Math.PI/4);
                // console.log("rendering drone..with rotate:" + tmp);
            }

            if (text) Canvas.ctx.fillText(text, coords[0], parseInt(y)-4); 
           
            if (fill) {
                Canvas.ctx.fill();
            } else {
                Canvas.ctx.stroke();
            }
        }
        else return;
    }

    static restore(coords) {
        let y = Canvas.height - coords[1];
        Canvas.ctx.translate(parseInt(-coords[0]), parseInt(-y));
        Canvas.ctx.restore();
    }

    /**
     * rotate by the obj! 
     * first save ctx and translate to the obj center..
     * draw obj after ctx rotate !!
     * then translate back and retore
     */
    static rotateCtx(coords, rotate) {
        Canvas.ctx.save();
        let y = Canvas.height - coords[1];
        Canvas.ctx.translate(parseInt(coords[0]), parseInt(y));
        Canvas.ctx.rotate(rotate);
    }

    /**
     * drawBar with given Value..
     * x: where to draw in X axis..
     * width: bar width,
     * value: bar y value.
     * fill: fill or stroke. default false.
     */
    static drawBar(x, width, value, fill) {
        let barY = Canvas.height - value;
        if (fill) {
            // fillRect(leftUP.X, Y, RectWidth, RectHeight)
            Canvas.ctx.fillRect(x, barY, width, value);
        } else {
            Canvas.ctx.strokeRect(x, barY, width, value);
        }
    }


    /**
     * drawLine with given Value..@Array
     * lwidth : lineWidth @number
     * dash: default false @bool
     * fill: closeLine to a polygon
     */
    static drawLine(data, lwidth, dash, fill) {        
        if (data instanceof Array && data.length > 0) {
            Canvas.ctx.strokeStyle = "#FF0000";
            Canvas.ctx.lineWidth = lwidth? lwidth: 2;
            Canvas.ctx.beginPath();
            // for drawing area close with xaxis.. render first point.
            if (fill) {
                Canvas.ctx.moveTo(-100, Canvas.height);
            }
            for (let i = 0; i < data.length; i++) {
                // each point of line contains x, y.
                if (data[i] instanceof Array && data[i].length == 2) {
                    let pointy = Canvas.height - data[i][1];
                    Canvas.ctx.lineTo(data[i][0], pointy);
                }
            }
            if (fill) {
                // close with beginPath point
                Canvas.ctx.lineTo(data[data.length-1][0], Canvas.height);
                Canvas.ctx.closePath();
                // Canvas.ctx.stroke();
                Canvas.ctx.fill(); 
            } else {
                Canvas.ctx.stroke();
            }
                
        }
    }

    /**
     * draw Math.sin with canvas.
     */
    // static drawDemoline() {
    //     let base = 50;

    // }

    /**
     * drawBars with given data..
     * width: bar width,
     * data: Array of values..
     * fill: fill or stroke. default false.
     */
    static drawBars(data, fill) {
        Canvas.clearCanv();
        Canvas.ctx.strokeStyle = "#000";
        Canvas.setWidth(2);
        let barY, barX = 10; 
        if (data instanceof Array) {
            let segWidth = (Canvas.width-20)/data.length;
            let barWidth = segWidth * 0.7;
            for (let i = 0; i < data.length; i ++) {
                Canvas.drawBar(barX, barWidth, data[i]);
                barX += segWidth;
            }
        } else {
            console.error('pls Input Array Data');
        }
        console.warn("Bars rendered complete..");
    }

    static clearCanv() {
        Canvas.ctx.clearRect(0,0,Canvas.width,Canvas.height);
        Canvas.setFill("#000");
        Canvas.ctx.fillRect(0,0,Canvas.width,Canvas.height);
    }

}

