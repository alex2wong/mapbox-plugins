import {CanvasOverlayer} from './canvasOverlay';

/**
 * initWindlayer based on mapboxgl-canvas
 */
export class WindLayer extends CanvasOverlayer {
    constructor(opts) {
        let _opts = opts || {};
        super(_opts);
        this.windImage = _opts.image || new Image();
        this.radius = _opts.radius || 2; 
        // this.redraw = _redraw.bind(this);
    }
    
    /**
     * render particles based on image
     * @param {*grid wind image} image 
     */
    updateWind(image, geojson, compressRatio) {
        let canvas = this.canvas, pix2render = [],
            ctx = this.canvas.getContext("2d");
        if (this.particles == undefined) {
            console.log("generating particles...");
            this.particles = genParticles(image, geojson, compressRatio, this.radius);
        }
        // ctx.globalAlpha = 0.95;
        if (!geojson) {
            console.log("generating particles complete! num: " + this.particles.length);
            this.redraw(this.particles);
        } else {
            // wind data should be rendered as mapboxgl vector.
            console.log("generating particles complete! num: " + this.particles.features.length + " in geojson.");
        }
    }
}

function _redraw() {
    // this.particles
}

/**
 * generate particles based on got Grid wind image.
 * (actually image -> particles)
 * called after wind image loaded event..
 * return particles: Array, particles with wind strength and angle.
 */
function genParticles(image, geojson, compressRatio, radius) {
    let windImage = image || this.windImage,
        tmpCanvas = document.createElement("canvas"),
        tmpCtx = tmpCanvas.getContext("2d"),
        particles = [], features = [];
    if (geojson) {
        particles = {
            "type": "FeatureCollection",
            "name": "particles",
            "features": features
        }
    }

    tmpCanvas.width = windImage.width;
    tmpCanvas.height = windImage.height;
    tmpCtx.drawImage(windImage, 0, 0);
    // imageData.data.length: width*height*4
    let imageData = tmpCtx.getImageData(0, 0, tmpCanvas.width, tmpCanvas.height),
        dataLength = imageData.data.byteLength;
    if (compressRatio == undefined || (compressRatio !== undefined && compressRatio < 1)) {
        console.warn("Input compressRatio invalid, use default 1.");
        compressRatio = 1;
    }
    compressRatio = parseInt(Number(compressRatio));
    for (let i=1;i<tmpCanvas.height-1;i+=compressRatio) {
        // i:0~180, j:0~360
        for (let j=0;j<tmpCanvas.width;j+=compressRatio) {
            let particle = {
                'lon': -180 + j,
                'lat': -90 + i,
            };            
            let uIndex = (i * 360 + j) * 4, vIndex = uIndex + 1;
            let uVal = imageData.data[uIndex], vVal = imageData.data[vIndex],
                windPow = Math.pow(uVal, 2) + Math.pow(vVal, 2),
                angle = Number(Math.atan(vVal/uVal).toFixed(2)),
                color = 'rgba('+ (windPow/255).toFixed(0) + ', 255, 100, 0.7)';
            // return geojson dataSource for mapboxgl.vector layer.
            if (geojson) {
                particle = { "type": "Feature", 
                    "properties": {
                        "angle": angle,
                        "color": color
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [-180 + j, -90 + i]
                    }
                }
                features.push(particle);
            } else {
                particle.color = color;
                particle.angle = angle;
                particle.radius = radius;
                particles.push(particle);
            }
        }
    }
    return particles;
}
