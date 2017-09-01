import Canvas from './canvas';

export default class chart {
    // init chart bind with a div element @object.
    constructor(opts) {
        this.ele = opts.ele? opts.ele: null;
        this.data = opts.data? opts.data: [];
        this.type = opts.type? opts.type: null;
        this.maxValue = 0;
        this.rotate = opts.rotate? opts.rotate: 0;
        // specify url as data source.. update by GET.
        this.url = opts.url? opts.url: null;
    }

    // new Promise to GET latest data, then redraw
    updateData() {
       // new Promise() 
    }

    /**
     * set chart.data with Array instance, then redraw.
     */
    setData(data) {
        this.data = data.coords;
        this.rotate = data.rotate;
        this.dataName = data.name;
        Canvas.clearCanv();
        this.render();
        return this;
    }

    /**
     * render data in Canvas according data dimension
     * width different strategy..
     */
    render() {
        // if line or poly
        if (this.data instanceof Array && this.data.length > 0 && this.data[0] instanceof Array ) {
            Canvas.drawLine(this.data, null, null);
        } else if (this.data instanceof Array && this.data.length > 0) {
            if (this.url) {
                // render point with icon image.
                Canvas.drawPoint(this.data, 20, null, this.url, this.rotate, this.dataName);
            } else {
                Canvas.drawPoint(this.data, 2, null, null, this.rotate, this.dataName);
            } 
        }
    }

    // stat max value of Data and set to maxValue. only for 1 dimension data.[y1, y2, y3 ...]
    statMax() {
        if (typeof this.data == Array && this.data.length > 0) {
            this.data.forEach((value) => {
                if (this.maxValue < value)
                    this.maxValue = value;
            });
        }
        return this;
    }

    /**
	 * generate Math.sin/cos line data..
     * 
	 * sin: 'sin'/'cos'/'tan' @string
	 * xEnd: finally returned points number.
	 * fatness: fatness of line. bigger the fatter will the line be.
	 * offset: offset to left with animation. @number
     * 
     * Return: 2 dimension Array. [[x1,y1], [x2,y2] ...] @Array
	 */
	generateSinLine(sin, xEnd, fatness, offset){
		let points = [], y = 0, yheight = 50, ybase = 50,
            fat = fatness? fatness: 20.0, off = offset? offset: 0;
		// 像素个数 xEnd. 
		for (let x = 0; x < xEnd; x ++) {
			if (sin == 'sin') {
				y = parseInt(Math.sin(x/fat) * yheight);
			} else if (sin == 'cos')
				y = parseInt(Math.cos(x/fat) * yheight);
			else if (sin == 'tan') 
				y = parseInt(Math.tan(x/fat) * yheight);
			
			points.push([x - off, y + ybase]);
		}
		return points;
	}
}

let strategies = {

}
