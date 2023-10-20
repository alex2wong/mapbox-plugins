(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.Mapbox = {}));
}(this, function (exports) { 'use strict';

    class Const {
    }

    // Static Props.
    Const.DroneParam = {
        MAXSPEED: 15,
        FIRINGTIME: 800,
        LIFE: 10,
        // Firing range.. 0.2 rad in LngLat
        RANGE: 0.2 
    };

    Const.Images = {
        Plane: '../assets/plane'
    };

    Const.FileType = {
        'png': 'IMG',
        'jpg': 'IMG',
        'gif': 'IMG',
        'mp4': 'VIDEO'
    };

    Const.SpritesUrl = "https://alex2wong.github.io/mapbox-plugins/assets/sprite";

    Const.Sprites = {"airfield-15":{"width":21,"height":21,"x":0,"y":0,"pixelRatio":1},"airport-15":{"width":21,"height":21,"x":21,"y":0,"pixelRatio":1},"alcohol-shop-15":{"width":21,"height":21,"x":0,"y":21,"pixelRatio":1},"amusement-park-15":{"width":21,"height":21,"x":21,"y":21,"pixelRatio":1},"aquarium-15":{"width":21,"height":21,"x":42,"y":0,"pixelRatio":1},"art-gallery-15":{"width":21,"height":21,"x":63,"y":0,"pixelRatio":1},"attraction-15":{"width":21,"height":21,"x":42,"y":21,"pixelRatio":1},"bakery-15":{"width":21,"height":21,"x":63,"y":21,"pixelRatio":1},"bank-15":{"width":21,"height":21,"x":0,"y":42,"pixelRatio":1},"bar-15":{"width":21,"height":21,"x":21,"y":42,"pixelRatio":1},"beer-15":{"width":21,"height":21,"x":42,"y":42,"pixelRatio":1},"bicycle-15":{"width":21,"height":21,"x":63,"y":42,"pixelRatio":1},"bicycle-share-15":{"width":21,"height":21,"x":0,"y":63,"pixelRatio":1},"bus-15":{"width":21,"height":21,"x":21,"y":63,"pixelRatio":1},"cafe-15":{"width":21,"height":21,"x":42,"y":63,"pixelRatio":1},"campsite-15":{"width":21,"height":21,"x":63,"y":63,"pixelRatio":1},"car-15":{"width":21,"height":21,"x":84,"y":0,"pixelRatio":1},"castle-15":{"width":21,"height":21,"x":105,"y":0,"pixelRatio":1},"cemetery-15":{"width":21,"height":21,"x":126,"y":0,"pixelRatio":1},"cinema-15":{"width":21,"height":21,"x":147,"y":0,"pixelRatio":1},"circle-15":{"width":21,"height":21,"x":84,"y":21,"pixelRatio":1},"circle-stroked-15":{"width":21,"height":21,"x":105,"y":21,"pixelRatio":1},"clothing-store-15":{"width":21,"height":21,"x":126,"y":21,"pixelRatio":1},"college-15":{"width":21,"height":21,"x":147,"y":21,"pixelRatio":1},"dentist-15":{"width":21,"height":21,"x":84,"y":42,"pixelRatio":1},"doctor-15":{"width":21,"height":21,"x":105,"y":42,"pixelRatio":1},"dog-park-15":{"width":21,"height":21,"x":126,"y":42,"pixelRatio":1},"drinking-water-15":{"width":21,"height":21,"x":147,"y":42,"pixelRatio":1},"embassy-15":{"width":21,"height":21,"x":84,"y":63,"pixelRatio":1},"entrance-15":{"width":21,"height":21,"x":105,"y":63,"pixelRatio":1},"fast-food-15":{"width":21,"height":21,"x":126,"y":63,"pixelRatio":1},"ferry-15":{"width":21,"height":21,"x":147,"y":63,"pixelRatio":1},"fire-station-15":{"width":21,"height":21,"x":0,"y":84,"pixelRatio":1},"fuel-15":{"width":21,"height":21,"x":21,"y":84,"pixelRatio":1},"garden-15":{"width":21,"height":21,"x":42,"y":84,"pixelRatio":1},"golf-15":{"width":21,"height":21,"x":63,"y":84,"pixelRatio":1},"grocery-15":{"width":21,"height":21,"x":84,"y":84,"pixelRatio":1},"harbor-15":{"width":21,"height":21,"x":105,"y":84,"pixelRatio":1},"heliport-15":{"width":21,"height":21,"x":126,"y":84,"pixelRatio":1},"hospital-15":{"width":21,"height":21,"x":147,"y":84,"pixelRatio":1},"ice-cream-15":{"width":21,"height":21,"x":0,"y":105,"pixelRatio":1},"information-15":{"width":21,"height":21,"x":21,"y":105,"pixelRatio":1},"laundry-15":{"width":21,"height":21,"x":42,"y":105,"pixelRatio":1},"library-15":{"width":21,"height":21,"x":63,"y":105,"pixelRatio":1},"lodging-15":{"width":21,"height":21,"x":84,"y":105,"pixelRatio":1},"marker-15":{"width":21,"height":21,"x":105,"y":105,"pixelRatio":1},"monument-15":{"width":21,"height":21,"x":126,"y":105,"pixelRatio":1},"mountain-15":{"width":21,"height":21,"x":147,"y":105,"pixelRatio":1},"museum-15":{"width":21,"height":21,"x":0,"y":126,"pixelRatio":1},"music-15":{"width":21,"height":21,"x":21,"y":126,"pixelRatio":1},"park-15":{"width":21,"height":21,"x":42,"y":126,"pixelRatio":1},"pharmacy-15":{"width":21,"height":21,"x":63,"y":126,"pixelRatio":1},"picnic-site-15":{"width":21,"height":21,"x":84,"y":126,"pixelRatio":1},"place-of-worship-15":{"width":21,"height":21,"x":105,"y":126,"pixelRatio":1},"playground-15":{"width":21,"height":21,"x":126,"y":126,"pixelRatio":1},"police-15":{"width":21,"height":21,"x":147,"y":126,"pixelRatio":1},"post-15":{"width":21,"height":21,"x":0,"y":147,"pixelRatio":1},"prison-15":{"width":21,"height":21,"x":21,"y":147,"pixelRatio":1},"rail-15":{"width":21,"height":21,"x":42,"y":147,"pixelRatio":1},"rail-light-15":{"width":21,"height":21,"x":63,"y":147,"pixelRatio":1},"rail-metro-15":{"width":21,"height":21,"x":84,"y":147,"pixelRatio":1},"religious-christian-15":{"width":21,"height":21,"x":105,"y":147,"pixelRatio":1},"religious-jewish-15":{"width":21,"height":21,"x":126,"y":147,"pixelRatio":1},"religious-muslim-15":{"width":21,"height":21,"x":147,"y":147,"pixelRatio":1},"restaurant-15":{"width":21,"height":21,"x":168,"y":0,"pixelRatio":1},"rocket-15":{"width":21,"height":21,"x":189,"y":0,"pixelRatio":1},"school-15":{"width":21,"height":21,"x":210,"y":0,"pixelRatio":1},"shop-15":{"width":21,"height":21,"x":231,"y":0,"pixelRatio":1},"stadium-15":{"width":21,"height":21,"x":252,"y":0,"pixelRatio":1},"star-15":{"width":21,"height":21,"x":273,"y":0,"pixelRatio":1},"suitcase-15":{"width":21,"height":21,"x":294,"y":0,"pixelRatio":1},"swimming-15":{"width":21,"height":21,"x":315,"y":0,"pixelRatio":1},"theatre-15":{"width":21,"height":21,"x":168,"y":21,"pixelRatio":1},"toilet-15":{"width":21,"height":21,"x":189,"y":21,"pixelRatio":1},"town-hall-15":{"width":21,"height":21,"x":210,"y":21,"pixelRatio":1},"triangle-15":{"width":21,"height":21,"x":231,"y":21,"pixelRatio":1},"triangle-stroked-15":{"width":21,"height":21,"x":252,"y":21,"pixelRatio":1},"veterinary-15":{"width":21,"height":21,"x":273,"y":21,"pixelRatio":1},"volcano-15":{"width":21,"height":21,"x":294,"y":21,"pixelRatio":1},"zoo-15":{"width":21,"height":21,"x":315,"y":21,"pixelRatio":1},"airfield-11":{"width":17,"height":17,"x":168,"y":42,"pixelRatio":1},"airport-11":{"width":17,"height":17,"x":185,"y":42,"pixelRatio":1},"alcohol-shop-11":{"width":17,"height":17,"x":202,"y":42,"pixelRatio":1},"amusement-park-11":{"width":17,"height":17,"x":219,"y":42,"pixelRatio":1},"aquarium-11":{"width":17,"height":17,"x":236,"y":42,"pixelRatio":1},"art-gallery-11":{"width":17,"height":17,"x":253,"y":42,"pixelRatio":1},"attraction-11":{"width":17,"height":17,"x":270,"y":42,"pixelRatio":1},"bakery-11":{"width":17,"height":17,"x":287,"y":42,"pixelRatio":1},"bank-11":{"width":17,"height":17,"x":304,"y":42,"pixelRatio":1},"bar-11":{"width":17,"height":17,"x":168,"y":63,"pixelRatio":1},"beer-11":{"width":17,"height":17,"x":185,"y":63,"pixelRatio":1},"bicycle-11":{"width":17,"height":17,"x":202,"y":63,"pixelRatio":1},"bicycle-share-11":{"width":17,"height":17,"x":219,"y":63,"pixelRatio":1},"bus-11":{"width":17,"height":17,"x":236,"y":63,"pixelRatio":1},"cafe-11":{"width":17,"height":17,"x":253,"y":63,"pixelRatio":1},"campsite-11":{"width":17,"height":17,"x":270,"y":63,"pixelRatio":1},"car-11":{"width":17,"height":17,"x":287,"y":63,"pixelRatio":1},"castle-11":{"width":17,"height":17,"x":304,"y":63,"pixelRatio":1},"cemetery-11":{"width":17,"height":17,"x":168,"y":84,"pixelRatio":1},"cinema-11":{"width":17,"height":17,"x":185,"y":84,"pixelRatio":1},"circle-11":{"width":17,"height":17,"x":202,"y":84,"pixelRatio":1},"circle-stroked-11":{"width":17,"height":17,"x":219,"y":84,"pixelRatio":1},"clothing-store-11":{"width":17,"height":17,"x":236,"y":84,"pixelRatio":1},"college-11":{"width":17,"height":17,"x":253,"y":84,"pixelRatio":1},"dentist-11":{"width":17,"height":17,"x":270,"y":84,"pixelRatio":1},"doctor-11":{"width":17,"height":17,"x":287,"y":84,"pixelRatio":1},"dog-park-11":{"width":17,"height":17,"x":304,"y":84,"pixelRatio":1},"drinking-water-11":{"width":17,"height":17,"x":168,"y":105,"pixelRatio":1},"embassy-11":{"width":17,"height":17,"x":185,"y":105,"pixelRatio":1},"entrance-11":{"width":17,"height":17,"x":202,"y":105,"pixelRatio":1},"fast-food-11":{"width":17,"height":17,"x":219,"y":105,"pixelRatio":1},"ferry-11":{"width":17,"height":17,"x":236,"y":105,"pixelRatio":1},"fire-station-11":{"width":17,"height":17,"x":253,"y":105,"pixelRatio":1},"fuel-11":{"width":17,"height":17,"x":270,"y":105,"pixelRatio":1},"garden-11":{"width":17,"height":17,"x":287,"y":105,"pixelRatio":1},"golf-11":{"width":17,"height":17,"x":304,"y":105,"pixelRatio":1},"grocery-11":{"width":17,"height":17,"x":168,"y":126,"pixelRatio":1},"harbor-11":{"width":17,"height":17,"x":185,"y":126,"pixelRatio":1},"heliport-11":{"width":17,"height":17,"x":202,"y":126,"pixelRatio":1},"hospital-11":{"width":17,"height":17,"x":219,"y":126,"pixelRatio":1},"ice-cream-11":{"width":17,"height":17,"x":236,"y":126,"pixelRatio":1},"information-11":{"width":17,"height":17,"x":253,"y":126,"pixelRatio":1},"laundry-11":{"width":17,"height":17,"x":270,"y":126,"pixelRatio":1},"library-11":{"width":17,"height":17,"x":287,"y":126,"pixelRatio":1},"lodging-11":{"width":17,"height":17,"x":304,"y":126,"pixelRatio":1},"marker-11":{"width":17,"height":17,"x":168,"y":147,"pixelRatio":1},"monument-11":{"width":17,"height":17,"x":185,"y":147,"pixelRatio":1},"mountain-11":{"width":17,"height":17,"x":202,"y":147,"pixelRatio":1},"museum-11":{"width":17,"height":17,"x":219,"y":147,"pixelRatio":1},"music-11":{"width":17,"height":17,"x":236,"y":147,"pixelRatio":1},"park-11":{"width":17,"height":17,"x":253,"y":147,"pixelRatio":1},"pharmacy-11":{"width":17,"height":17,"x":270,"y":147,"pixelRatio":1},"picnic-site-11":{"width":17,"height":17,"x":287,"y":147,"pixelRatio":1},"place-of-worship-11":{"width":17,"height":17,"x":304,"y":147,"pixelRatio":1},"playground-11":{"width":17,"height":17,"x":0,"y":168,"pixelRatio":1},"police-11":{"width":17,"height":17,"x":17,"y":168,"pixelRatio":1},"post-11":{"width":17,"height":17,"x":34,"y":168,"pixelRatio":1},"prison-11":{"width":17,"height":17,"x":51,"y":168,"pixelRatio":1},"rail-11":{"width":17,"height":17,"x":68,"y":168,"pixelRatio":1},"rail-light-11":{"width":17,"height":17,"x":85,"y":168,"pixelRatio":1},"rail-metro-11":{"width":17,"height":17,"x":102,"y":168,"pixelRatio":1},"religious-christian-11":{"width":17,"height":17,"x":119,"y":168,"pixelRatio":1},"religious-jewish-11":{"width":17,"height":17,"x":136,"y":168,"pixelRatio":1},"religious-muslim-11":{"width":17,"height":17,"x":153,"y":168,"pixelRatio":1},"restaurant-11":{"width":17,"height":17,"x":170,"y":168,"pixelRatio":1},"rocket-11":{"width":17,"height":17,"x":187,"y":168,"pixelRatio":1},"school-11":{"width":17,"height":17,"x":204,"y":168,"pixelRatio":1},"shop-11":{"width":17,"height":17,"x":221,"y":168,"pixelRatio":1},"stadium-11":{"width":17,"height":17,"x":238,"y":168,"pixelRatio":1},"star-11":{"width":17,"height":17,"x":255,"y":168,"pixelRatio":1},"suitcase-11":{"width":17,"height":17,"x":272,"y":168,"pixelRatio":1},"swimming-11":{"width":17,"height":17,"x":289,"y":168,"pixelRatio":1},"theatre-11":{"width":17,"height":17,"x":306,"y":168,"pixelRatio":1},"toilet-11":{"width":17,"height":17,"x":0,"y":185,"pixelRatio":1},"town-hall-11":{"width":17,"height":17,"x":17,"y":185,"pixelRatio":1},"triangle-11":{"width":17,"height":17,"x":34,"y":185,"pixelRatio":1},"triangle-stroked-11":{"width":17,"height":17,"x":51,"y":185,"pixelRatio":1},"veterinary-11":{"width":17,"height":17,"x":68,"y":185,"pixelRatio":1},"volcano-11":{"width":17,"height":17,"x":85,"y":185,"pixelRatio":1},"zoo-11":{"width":17,"height":17,"x":102,"y":185,"pixelRatio":1},"dot-11":{"width":11,"height":11,"x":323,"y":168,"pixelRatio":1},"dot-10":{"width":10,"height":10,"x":119,"y":185,"pixelRatio":1}};

    Const.PK = "pk.eyJ1IjoiaHVhbmd5aXhpdSIsImEiOiI2WjVWR1hFIn0.1P90Q-tkbHS38BvnrhTI6w";

    /**
     * Bullet class
     */
    class Bullet {
        // opts should contain the Drone's direction and geometry
        constructor(opts) {
            this.id;
            this.direciton = opts.direction ? opts.direction: 0;
            this.spoint = {
                type: 'Point',
                coordinates: [0, 0]
            };
            // DeepCopy the drone coords to bullet.
            this.spoint.coordinates[0] = opts.lon;
            this.spoint.coordinates[1] = opts.lat;
        }
    }

    /**
     * Base class of Drone or other Game-Sprite
     */
    class Sprite {
        constructor(opts) {
            // oye !! hack the Class() with no args.
            let _opts = opts || {};
            this.id = genId();
            this.speed = _opts.speed || 1;
            this.direction = _opts.direction || 0;
            this.name = _opts.name || randomName();
            this.lon = _opts.lon || 120;
            this.lat = _opts.lat || 30;
            this.iconUrl = _opts.icon;
            this.icon = null;
            this._init();
        }

        _init () {
            let img = new Image();
            if (this.iconUrl) {
                img.src = this.iconUrl;
                img.onload = () => {
                    this.icon = img;
                };
            }
        }

        /**
         * to be overwrite.
         */
        accelerate() {
            
        }
        
        turnLeft () {
            if (this) {
                this.direction -= 2;
            }
        }
            
        turnRight () {
            this.direction += 2;
        }

        brake () {
            if (this.speed > 0) {
                this.speed -= 1;
            }
        }

    }

    function genId () {
        return (Math.random()*1000000).toString(16);
    }

    function randomName () {
        let randomNum = Math.random() * 10000;
        return "Player ".concat(randomNum.toFixed(0));
    }

    // // Drone model script
    // const firingTime = 1200, MAXSPEED = 3.900;

    /**
     * Drone class with control method.
     */
    class Drone extends Sprite {
        constructor(opts) {
            super(opts);
            this.life = Const.DroneParam.LIFE;
            this.bullets = [];
            this.firing = false;
            this.bulletNum = 2;
            this.icon = Const.Images.Plane;
            this.manual = false;
        }

        /**
         * maintask start interval to update its status.
         */
        updateStatus () {
            // make sure Sprite in world..
            let alY = Math.cos(this.direction*Math.PI/180) * this.speed * 0.001,
                lat = this.lat + alY;
            if (lat > 84 || lat < -84) {
                alY = -alY;
                this.direction += 180;
                console.warn("latitude out of bbox, turn back..");
            }
            this.lon += Math.sin(this.direction*Math.PI/180) * this.speed * 0.001;
            this.lat += alY;
            // updateStatusView. toDO in maintask.js
        }

        accelerate() {
            if (this.speed < Const.DroneParam.MAXSPEED) {
                this.speed += 1;
                // this.updateStatus();
            }
        }

        fire () {
            
            if (this.bullets instanceof Array && 
                    this.bullets.length > 0 && !this.firing) {
                let that = this;
                setTimeout(() => {
                    that.firing = false;
                    // clearInterval(that.interval);
                }, Const.DroneParam.FIRINGTIME);
                this.firing = true;
            } else if (!this.firing) {
                for (let i = 0; i < this.bulletNum; i++) {
                    this.bullets.push(new Bullet(this));
                }
                // create Closure to handle the firing status change..
                let that = this;
                setTimeout(() => {
                    that.firing = false;
                    // clearInterval(that.interval);
                }, Const.DroneParam.FIRINGTIME);
                this.firing = true;
            }
        }
    }

    class xMarker extends Sprite {
        constructor(gjsonFeature, opts) {
            super(opts);
            this.map = opts.map;
            return this.genMarker(gjsonFeature, opts);
        }

        genMarker(gjsonFeature, options) {
            if (gjsonFeature instanceof Object && gjsonFeature.properties !== undefined) {
                const el = document.createElement('div');
                el.className = 'marker';
                if (!gjsonFeature.properties.iconSize) {
                    gjsonFeature.properties.iconSize = [32, 32];
                }
                el.style.width = gjsonFeature.properties.iconSize[0] + 'px';
                el.style.height = gjsonFeature.properties.iconSize[1] + 'px';
                const iconDiv = document.createElement('div');
                iconDiv.className = 'marker__inner';
                
                iconDiv.style.backgroundColor = `${options.backgroundColor || 'rgb(255, 0, 87)' }`;
                iconDiv.style.backgroundImage = `url(${options.icon || "../../assets/arrow2x.png"})`;
                el.appendChild(iconDiv);

                if (options.map instanceof mapboxgl.Map) {
                    // add marker to map
                    const tmpMarker = new mapboxgl.Marker(el)
                        .setLngLat(gjsonFeature.geometry.coordinates)
                        .addTo(options.map);
                    syncPitch(tmpMarker, options);
                    options.map.on('rotate', () => {
                        syncPitch(tmpMarker, options);
                    });
                    return tmpMarker;
                }
            }
            else {
                console.warn(`${gjsonFeature} is not invalid GeoJson instance..`);
            }
        }
    }

    function syncPitch(refMarker, opts) {
        const pitch = opts.map.getPitch();
        const bearing = opts.map.getBearing();
        const el = refMarker.getElement().children[0];
        const realBearing = - bearing + (opts.iconRotateOffset || 0);
        el.style.transform = `rotateX(${pitch}deg) rotateZ(${realBearing}deg)`;
    }

    function BBOX(opts) {
        let _opts = opts || {};
        this.minX = _opts.minX;
        this.minY = _opts.minY; 
        this.maxX = _opts.maxX; 
        this.maxY = _opts.maxY;
    }

    // Some Static Function bind with one Canvas context
    class Canvas {
        // Bound with a canvas element.
        static init(ele) {
            if (ele instanceof HTMLCanvasElement) {
                Canvas.canv = ele;
                Canvas.height = ele.height;
                Canvas.width = ele.width;
                // let the canvas's width/height cohere width DOM width/height. 
                Canvas.ctx = ele.getContext("2d");
                Canvas.ctx.strokeStyle = "rgba(0,0,0,0.9)";
                Canvas.ctx.fillStyle = "rgba(10,200,240,0.4)";
                Canvas.ctx.strokeWidth = 1;
                Canvas.animate = false;
                Canvas.img = new Image();
            } else {
                console.error("ele is not instanceof CANVAS");
            }
        }

        /**
         * set ctx.strokeStyle with rgba() @string
         */
        static setStroke(colorStr) {
            if (Canvas.ctx) Canvas.ctx.strokeStyle = colorStr;
        }

        /**
         * set ctx.fillStyle with rgba(). @string
         */
        static setFill(colorStr) {
            if (Canvas.ctx) Canvas.ctx.fillStyle = colorStr;
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
         * drawRect with given BBox{minX, minY, maxX, maxY}
         */
        static drawRect(bbox, fill=false) {
            let _bbox = new BBOX(bbox),
                rectWidth = _bbox.maxX - _bbox.minX,
                rectHeight = _bbox.maxY - _bbox.minY;
            if (fill) {
                Canvas.ctx.fillRect(_bbox.minX, _bbox.minY, rectWidth, rectHeight);
            } else {
                Canvas.ctx.strokeRect(_bbox.minX, _bbox.minY, rectWidth, rectHeight);
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
            let barX = 10; 
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
            // Canvas.setFill("#000");
            // Canvas.ctx.fillRect(0,0,Canvas.width,Canvas.height);
        }

    }

    class chart {
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

    class util {
        /**
         * use promise to implement xmlHttpRequest process
         * promise.then receive 2 params.(resolve func, reject func)
         */
        // static xhr(){
        //     // promise will excute immediately after init.
        //     let promise = new Promise(() => {

        //     })
        // }

        /**
         * Promise.prototype.then()
         * receive resolve callback and reject callback.
         * SO important, if series of Async Process is required, 
         * Promise is better than callback hell !
         * 
         * xhr().then(data => { // resolve actions.. }, 
         *          err => { // reject actions.. }
         *      ).then()
         * 
         */

        /**
         * return promise obj.
         */
        static getJSON(url, resolve, reject) {
            let promise = new Promise((resolve, reject) => {
                let xhr = new XMLHttpRequest();
                xhr.open("GET", url);
                xhr.onreadystatechange = handler;
                xhr.responseType = "json";
                xhr.setRequestHeader("Accept", "application/json");
                xhr.send();

                function handler() {
                    if (this.readyState !== 4) {
                        return;
                    }
                    if (this.status === 200) {
                        // if server response success
                        resolve(this.response);
                    } else {
                        reject(new Error(this.statusText));
                    }
                }        });

            return promise;
        }

        static deepClone(obj) {
            let cloned = {};
            if (typeof obj !== 'object') return obj;
            if (obj instanceof Array) return obj.map((ele) => this.deepClone(ele));
            for(let k in obj){
                if (obj.hasOwnProperty(k) && typeof obj[k] !== 'object') {
                    cloned[k] = obj[k];
                } else if (obj[k].constructor.toString().indexOf("Object") > 0) {
                    cloned[k] = this.deepClone(obj[k]);
                } else if (Array.isArray(obj[k])) {
                    cloned[k] = obj[k].map((ele) => {
                        // let ret = null;
                        if (typeof ele !== 'object') return ele;
                        else return this.deepClone(ele);
                    });
                    // cloned[k] = [].concat(obj[k]);
                }
            }
            return cloned;
        }

        static isChanged(lastData, data) {
            if (JSON.stringify(lastData) == JSON.stringify(data))
                return false;
            else {
                console.warn('chartData changed..');
                return true;
            }
        }

        /**
         * return iconposition style by iconName
         */
        static setIconDiv(dom, iconName) {        
            let icons = Const.Sprites;
            if (iconName && icons[iconName]) {
                let iconStyle = icons[iconName],
                    iconDiv = document.createElement("div");
                iconDiv.style.width = iconStyle.width + "px";
                iconDiv.style.height = iconStyle.height + "px";
                iconDiv.style.overflow = 'hidden';
                let iconImg = document.createElement("img");
                iconImg.src = Const.SpritesUrl + ".png";
                iconImg.style.marginLeft = "-" + iconStyle.x + "px";
                iconImg.style.marginTop = "-" + iconStyle.y + "px";
                iconDiv.appendChild(iconImg);
                dom.appendChild(iconDiv);
            }
        }

        /**
         * add img, video element to domContainer.
         * @param {*domEle} dom, dom container..
         * @param {*Array} res, urls of img/video loaded to dom. 
         */
        static setResource(dom, res) {
            if (!(res instanceof Array)) return;
            dom.innerHTML = '';
            for (let i = 0; i < res.length; i ++) {
                let filetype = this.getFiletype(res[i]);
                if (filetype !== "") {
                    let ele = document.createElement(filetype);
                    ele.style.width = ele.style.height = dom.style.width = dom.style.height = '60px';
                    ele.style.borderRadius = "50%";
                    ele.src = res[i];
                    dom.style.borderRadius = "50%";
                    dom.appendChild(ele);
                }
                if (filetype == 'video') {
                    ele.setAttribute('autoplay', true);
                }
            }
        }

        static getFiletype(uri) {
            let isIMG = uri.match(/\.(jpg)|(png)|(gif)/g) ? true: false;
            let isMP4 = uri.match(/\.mp4\?+/g) ? true: false;
            if (isIMG) return 'img';
            else if (isMP4) return 'video';
            else {
                console.log(`filetype of ${uri} is not supported`);
                return '';
            }
        }

        static setChart(dom, data, type, height) {
            if (!Chart) {
                console.warn(`Chart module not defined`);
                return;
            }
            let canv = document.createElement('canvas'),
                ctx = canv.getContext('2d');
            let chart = new Chart(ctx, {
                    type: type,
                    data: data,
                    options: {
                        legend: {
                            display: false
                        }
                    }
                });
            canv.height = height; canv.style.height = canv.height + 'px';
            canv.width = height; canv.style.width = canv.width + 'px';
            dom.appendChild(canv);
            return chart;
        }

        // random point objs with given number
        static rdObjs(num, mapCenter) {
            var objs = [];
            if (!mapCenter) return objs;
            for(var i=0;i<num;i++) {
                objs.push({
                    name: "line" + i.toString(),
                    lon: parseInt(((Math.random()*8)+mapCenter[0]-4).toFixed(2)),
                    lat: parseInt(((Math.random()*4)+mapCenter[1]-2).toFixed(2)),
                    color: 'rgba(10,200,'+ (Math.random()*251).toFixed(0) +',0.7)',
                });
            }
            objs.push({
                name: "circle1",
                    lon: mapCenter[0],
                    lat: mapCenter[1],
                    radius: parseInt(Math.random()*10),
                    color: 'rgba(251,200,20,0.6)',
            });
            return objs;
        }

        /**
         * getJSON("somedata.json").then((data) => {
         *      console.log("got data: " + data);
         * })
         * .catch((err) => {
         *      console.error("encounter error..");
         * })
         */

        /**
         * compared with traditional imageload. what is the advantage ?
         */
        static loadImageAsync(url, resolve, reject) {
            return new Promise((resolve, reject) => {
                let image = new Image();
                image.onload = resolve;
                image.onerror = reject;
                image.src = url;
            })
        }

        /**
         * This decorator func.
         */
        static readonly(target, name, descriptor) {
            descriptor.writable = false;
            return descriptor;
        }

        /**
         * target.descriptor..
         * this decorator used for log before calling target function.
         */
        static log(target, name, descriptor) {
            let oldValue = descriptor.value;

            descriptor.value = function() {
                console.log(`Calling "${name}" with`, arguments);
                // descriptor.value refer to the target itself.. func or attri
                return oldValue.apply(null, arguments);
            };
        }

        /**
         * return function to be debounced.
         * @param fn {Function}
         * @param delay {Number}
         * @return {Function}
         */
        static debounce(fn, delay) {
            let timer;
            // timer is closure in memory.. returned function will be debounced..
            return function() {
                var context = this;
                var args = arguments;
                // clear the previous timer to prevent the function call.
                clearTimeout(timer);
                timer = setTimeout(() => {
                    fn.apply(context, args);
                }, delay);
            }
        }

        static _preSetCtx(context, fillStyle='', trailAlpha=.95, compositeMode='destination-in') {
            // default: source-over
            let prev = context.globalCompositeOperation;
            // render frame's overlaps part: source-in, source, destination-in
            context.globalCompositeOperation = compositeMode;
            // set destination frame alpha
            context.globalAlpha = trailAlpha;
            // fill nothing
            context.fillStyle = fillStyle;
            context.fillRect(0, 0, context.canvas.width, context.canvas.height);
            context.globalCompositeOperation = prev;
        }
            
        /**
         * return really effective compressed Image URL end with image ext
         * if support webp, use webp URL; otherwise do not change.
         */
        static compressedImageURL(imgUrl) {
            var canv = document.createElement("canvas");
            if (canv.toDataURL('image/webp').indexOf('data:image/webp') === 0) {
                return imgUrl.replace(/(\.png|\.jpg|\.jpeg|\.PNG|\.JPG|\.JPEG|\.GIF|\.gif)$/g, '.webp');
            }
            return imgUrl;
        }
    }

    /**
     * Base class of Overlayer
     */
    class Overlayer {
        constructor(opts){
            if(opts && opts.map)
                this.map = opts.map || undefined;
        }

        /**
         * to be overwrite in subClass
         */
        _init(){

        }

        // @setter
        setMap (map) {
            this.map = map;
            return this;
        }
        /**
         * use Global map or this.map instance to project
         */
        lnglat2pix(lng, lat) {
            if (this.map != undefined && this.map.project instanceof Function) {
                let lnglat = this.map.project(new mapboxgl.LngLat(
                    lng, lat));
                let x = Math.round(lnglat.x), y = Math.round(lnglat.y);
                return [x, y];
            }
            return [lng, lat];
        }
    }

    /**
     * initCanvasOverlayer based on mapboxgl-canvas
     */
    class CanvasOverlayer extends Overlayer {
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
                if (objs[i] === undefined || objs[i] === {}) continue;
                let x = objs[i][this.xfield], y = objs[i][this.yfield], 
                    radius = objs[i]['radius'] || 3, icon = objs[i]['icon'],
                    label = objs[i]['name'], rotate = objs[i]['direction'] || 0;
                if (x === undefined || y === undefined) continue;
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

    const interval = 25;
    class controllers {
        /**
         * GameController bind with a drone instance.. 
         * After start this controller, use WSAD to move drone.
         */
        static gameControl(drone) {
            if ((drone instanceof Drone) !== true ) {
                console.error("gameControl must bind with a drone instance.");
                return;
            }
            // bind key event with drone..
            drone.u=drone.r=drone.d=drone.l=0;onkeydown=(e)=>t(e,1);onkeyup=(e)=>t(e);
            let t=(e,v,l,i)=>{
                for(i in l={u:[38,90,87],r:[39,68],d:[40,83],l:[37,65,81]})
                if(l[i].includes(e.keyCode))
                drone[i]=v;
            };
            setInterval(()=>{
                if (drone.u) drone.accelerate();
                if (drone.d) drone.brake();
                if (drone.r) drone.turnRight();
                if (drone.l) drone.turnLeft();
            }, interval);
            console.log("gameControl register success.");
        }

        /**
         * pickupObj control, need to bind with canvasOverlay, to fetch the objs drawn
         * each moveEnd, rebuild the pixList depend on objs in viewport!
         * pixList's index is vital for pickUp performance.
         */
        static pickupControl(canvasOverlay) {
            if (canvasOverlay instanceof CanvasOverlayer) {
                // establish pixList storing objs' location. canvasOverlay.source.lon, lat
                let pix = canvasOverlay.lnglat2pix(canvasOverlay.source[0].lon,
                    canvasOverlay.source[1].lat);
            }
        }

        /**
         * Calculate bullets location based on drones.
         */
        static bulletCalculator(drones) {
            if (Array.isArray(drones)) {
                for(let i = 0;i < drones.length; i ++) {
                    let curDrone = drone[i];
                    let curBullets = curDrone.bullets;
                    // Calculate bullets coords
                    if (curDrone.firing && curBullets) ;
                }
            }
        }

        
        /**
         * Add AI robots shooting at player..
         * @input num: number. how many robots to create. 
         */
        static addRobots(num) {
            let robot = new Drone({});
            return robot;
        }


        /**
         * Dashboard bind with a drone instance and div element... 
         * After start this controller, use WSAD to move drone.
         */
        static dashBoard(drone, ele) {
            if ((drone instanceof Drone) !== true ) {
                console.error("dashBoard must bind with a drone instance.");
                return;
            }
            try {
                setInterval( function(){
                    ele.innerHTML = drone.name + "<br> coords: " +
                         drone.lon.toFixed(1) + ", " +
    		             drone.lat.toFixed(1) + "<br>" +
                         'speed: ' + drone.speed + "<br>" +
                         'direction: ' + (drone.direction%(360)).toFixed(1);
                }, 200);

            } catch(e) {
                console.error(e);
            }        
            console.log("dashBoard register success.");
        }

        /** create refreshable features list.  */
        static featureList(containerId) {
            if (containerId == undefined || typeof containerId !== "string") {
                console.warn("invalid containerId..");
                return null;
            }
            // var miniRefresh = new MiniRefresh({
            //     container: '#' + containerId,
            //     down: {
            //         callback: function() {
            //             // 下拉事件
            //             console.log("list dragged ..");
            //         }
            //     },
            //     up: {

            //         callback: function() {
            //             // 上拉事件
            //         }
            //     }
            // });
            // return miniRefresh;
        }
    }

    // myTween.js  needs to be a global Function..
    let myTween = {
        fps: 30,
        objs : null,
        get : function(models) {
            this.objs = models;
            return this;
        },
        to : function(targets, duration, cb) {
            if (myTween.timer) {
                // clear last animation timer.
                console.log('clear previous tween.to timer~');
                clearInterval(myTween.timer);
            }
            this.lastAniParams = [targets, duration];
            if (targets != undefined && duration != undefined && myTween.objs != null) {
                var inter = 1000/myTween.fps,
                    stepNum = (duration/1000)*myTween.fps,
                    stepIndex =0,
                    objsCopy = [],
                    props = [];
                console.log("animation params init complete...");

                // tranverse targetStatus props then calculate status of each frame
                for(var i=0;i<myTween.objs.length;i++){
                    for(var k in targets[i]) {
                        if(typeof(targets[i][k]) == 'number'){
                            // deepCopy original status..
                            if (typeof objsCopy[i] != 'object') objsCopy[i] = {};
                            if (typeof props[i] != 'object') props[i] = {};
                            objsCopy[i][k] = myTween.objs[i][k];
                            props[i][k] = parseFloat(((targets[i][k] - myTween.objs[i][k]) * (1/stepNum)).toFixed(3)); 
                        }
                    }
                }

                function animation() {
                    var fadeIn = false, fadeOut = false;
                    // animation end related handling.
                    if (stepIndex >= stepNum) {
                        // reset objs 2 original status.
                        if (myTween.loop) {
                            stepIndex = 0;
                            for (var i = 0; i < myTween.objs.length; i++) {
                                // shallow copy objects..
                                myTween.objs[i] = Object.assign([], myTween.objs[i], objsCopy[i]);
                            }
                            // myTween.objs = Object.assign([], myTween.objs, objsCopy);
                        } else {
                            myTween.paused = true;
                            clearInterval(myTween.timer);
                            myTween.timerOn = false;
                        }
                        return;
                    }
                    if (stepIndex == 0) {
                        fadeIn = true;
                    } else if (stepIndex == stepNum - 1) {
                        fadeOut = true;
                    }
                    // animation pause related.  record current params..
                    if (myTween.paused) {
                        return;
                    }
                    for(var i=0;i<myTween.objs.length;i++){
                        for(var key in props[i]) {
                            // currently animation is controlled by stepIndex..
                            myTween.objs[i][key] += props[i][key];
                            // console.log("obj " +  myTween.objs[i]['name'] +' changed,' + key + ": " + myTween.objs[i][key]);
                        }
                    }
                    if (cb && cb instanceof Function) {
                        // redirect cb's context to Right Scope..
                        cb(myTween.objs, fadeOut, fadeIn);
                    }
                    stepIndex += 1;
                }
                // if last timer is still On, register later.. use async alike process controller.
                return new Promise(function(resolve, reject){
                    myTween.timer = setInterval(animation, inter);
                    myTween.timerOn = true;
                    myTween.paused = false;
                    // this step is to sleep for animation duration..
                    setTimeout(resolve, duration);
                });
            }
        },
        loop : false,
        speed: 1,
        timerOn: false,
        timer : null,
        paused: false,
        // make async Function execute as Sync Function..
        wait: function(targets, duration) {
            var duration = duration || 0;
            return new Promise(function(res, rej){
                setTimeout(function() {
                    if (targets instanceof Object)
                        myTween.objs = Object.assign(myTween.objs, targets);
                    else if (targets instanceof Function)
                        console.log("execute Func await..");
                        targets.call(this);
                    res();
                }, duration);
            });
        },
        toggleAni: function(paused) {
            if (paused != undefined) {
                this.paused = paused;
                return;
            }
            this.paused = !this.paused;
        },
        toggleLoop: function(loop) {
            if (loop != undefined) {
                this.loop = loop;
                return;
            }
            this.loop = !this.loop;
        },
        lastAniParams: [undefined, undefined]
    };

    /**
     * initDomOverlayer
     */
    class DomOverlayer extends Overlayer {
        constructor(opts) {
            super(opts);
            this.domContainer = this._init();
            this.redraw = _redraw$1.bind(this);
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


    const lineHeight = 60, dotRadius = 4, chartHeight = 60;
    /**
     * domOverlay register&render above default canvas..
     * keep in absolute geolocation..
     */
    function _redraw$1() {
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
                    domStyle = domOpt['style']? domOpt['style'] + ' animated': 'bounceIn animated',
                    chartData = domOpt['data'], chartType = domOpt['type'];
                // data sanity should be checked, domOpts not changed then just update position!
                let dom = this.doms[i*3] || document.createElement("div"),
                    line = this.doms[i*3+1] ||document.createElement("div"),
                    dot =this.doms[i*3+2] || document.createElement("div");
                preStyleEles(line, dot, dom, pix, chartType||resources);

                let dataClone = util.deepClone(chartData);
                // handle different typesof domOverlay.
                if (resources != undefined) {
                    dom.title = (domOpt['content'] || ``);
                    if (!dom.hasChildNodes() || dom.firstChild.src !== resources[0]) {
                        util.setResource(dom, resources);
                    }
                } else if (iconName != undefined) {
                    dom.innerHTML = (domOpt['content'] || ``) + '</br>';
                    util.setIconDiv(dom, iconName);
                } else if (chartData != undefined && chartType != undefined) {
                    if (util.isChanged(this.lastData[i], chartData)) {
                        // setChart would contaminate input Data.
                        util.setChart(dom, dataClone, chartType, chartHeight*2);
                        this.lastData[i] = chartData;
                    }
                } else {
                    dom.innerHTML = (domOpt['content']|| '') + '</br>';
                }
                if (chartType != undefined) styleChartContainer(dom);

                line.className = "dom-ele", dot.className = "dom-ele";
                line.style.left = pix[0] + "px";
                line.style.top = (pix[1] - (lineHeight - 10)) + "px";
                dot.style.left = pix[0] - dotRadius + "px";
                dot.style.top = pix[1] - dotRadius + "px";

                // add dom to container at init process.
                if (this.doms[i*3] == undefined) {
                    dom.className = `dom-popup ${domStyle}`;
                    line.className = dot.className = `dom-ele ${domStyle}`;
                    console.warn(`add ${domStyle} css to dom.`);
                    this.domContainer.appendChild(dom);
                    this.domContainer.appendChild(line);
                    this.domContainer.appendChild(dot);
                    this.doms.push(...[dom, line, dot]);
                }
            }
        }
    }

    /**
     *  ___________
     * |chart/img  |   main popup. /// It is key topic to place popup align.
     *  -----------
     *       |         line/triangle.. (should implement by psuedoClass!)
     *       。         point..
     * chartWidth always 2*chartHeight if using Chart.js
     */
    function preStyleEles(line, dot, dom, pix, chartType) {
        const isImg = Array.isArray(chartType);
        line.style.height = lineHeight - 10 + 'px';
        line.style.width = '1px';
        line.style.position = "absolute";
        dot.style.borderRadius = '50%';
        dot.style.width = dot.style.height = dotRadius * 2 + 'px';
        dot.style.position = "absolute";
        dom.style.position = "absolute";
        if (!chartType) {
            dom.style.minWidth = "100px"; // consistant with chart/image dom width/height.
        }
        dom.style.background = "#fff";
        dom.style.textAlign = "center";
        dom.style.padding = '3px';
        // if has chartType, display chart above vertical line.
        dom.style.left = (pix[0] - (isImg? chartHeight/2: chartHeight)) + "px";
        dom.style.top = (pix[1] - lineHeight - (chartType? chartHeight : 20)) + "px";
    }

    function styleChartContainer(dom) {
        dom.style.borderWidth = '0';
        dom.style.zIndex = 9999;
        dom.style.backgroundColor = 'rgba(0,0,0,0.0)';
    }

    /**
     * initWindlayer based on mapboxgl-canvas
     */
    class WindLayer extends CanvasOverlayer {
        constructor(opts) {
            let _opts = opts || {};
            super(_opts);
            this.windImage = _opts.image || new Image();
            this.radius = _opts.radius || 2; 
            // this.redraw = _redraw.bind(this);
        }
        
        /**
         * parse particles based on image
         * @param {*grid wind image} image 
         * @param {*return geojson data to layer.particles or not }  renderInMapboxgl
         * @param {*sample ratio of wind grid, bigger -> fewer grids } compressRatio 
         */
        updateWind(image, renderInMapboxgl, compressRatio) {
            if (this.particles == undefined) {
                console.log("generating particles...");
                this.particles = genParticles(image, renderInMapboxgl, compressRatio, this.radius);
            }
        }
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
            };
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
                    };
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

    const satSource = {
        "custom-tms": {   
            'type': 'raster',
            'tiles': [
                "http://www.google.cn/maps/vt?lyrs=s@702&gl=cn&x={x}&y={y}&z={z}",
                // "https://c.tiles.mapbox.com/v3/osmbuildings.kbpalbpk/{z}/{x}/{y}.png",
                // "http://b.tile.openstreetmap.org/{z}/{x}/{y}.png"
            ],
            'tileSize': 256
        },
    };

    const lightSource = {
        "custom-tms": {   
            'type': 'raster',
            'tiles': [
                // 'https://cartodb-basemaps-1.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png'
                'https://www.google.cn/maps/vt?pb=!1m5!1m4!1i{z}!2i{x}!3i{y}!4i256!2m3!1e0!2sm!3i342009817!3m9!2sen-US!3sCN!5e18!12m1!1e47!12m3!1e37!2m1!1ssmartmaps!4e0&token=32965',
            ],
            'tileSize': 256
        },
    };

    const darkSource = {
        "custom-tms": {
            'type': 'raster',
            'tiles': [
                'https://a.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png',
                'https://b.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png',
                'https://c.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png',
            ],
            'tileSize': 256
        },
    };

    const tk = false;

    const basicStyle = {
        "version": 8,
        "sprite": "https://alex2wong.github.io/mapbox-plugins/assets/sprite",
        // "sprite": "../../assets/sprite",
        "glyphs": "https://alex2wong.github.io/mapbox-plugins/{fontstack}/{range}.pbf",
        "sources": satSource,
        "layers": [
            {
                'id': 'custom-tms',
                'type': 'raster',
                'source': 'custom-tms',
                'paint': {}
            },
        ]
    };

    const lightStyle = {
        "version": 8,
        "sprite": "https://alex2wong.github.io/mapbox-plugins/assets/sprite",
        // "sprite": "../../assets/sprite",
        "glyphs": "https://alex2wong.github.io/mapbox-plugins/{fontstack}/{range}.pbf",
        "sources": lightSource,
        "layers": [
            {
                'id': 'custom-tms',
                'type': 'raster',
                'source': 'custom-tms',
                'paint': {}
            },
        ]
    };

    const darkStyle = {
        "version": 8,
        "sprite": "https://alex2wong.github.io/mapbox-plugins/assets/sprite",
        "glyphs": "https://alex2wong.github.io/mapbox-plugins/{fontstack}/{range}.pbf",
        "sources": darkSource,
        "layers": [
            {
                'id': 'custom-tms',
                'type': 'raster',
                'source': 'custom-tms',
                'paint': {}
            },
        ]
    };

    const emptyStyle = {
        "version": 8,
        "sprite": "http://127.0.0.1:8080/assets/sprite",
        "glyphs": "https://alex2wong.github.io/mapbox-plugins/{fontstack}/{range}.pbf",
        "sources": lightSource,
        "layers": []
    };

    var config = /*#__PURE__*/Object.freeze({
        tk: tk,
        basicStyle: basicStyle,
        lightStyle: lightStyle,
        darkStyle: darkStyle,
        emptyStyle: emptyStyle
    });

    const DEFAULT_ICON = '../../assets/arrowright.png';

    /**
     * drawIconLine in canvasOverlayer, can mutate input line data !
     * @param {*array typed line vertex.} line 
     * @param {*enable animation of draw arrow..} enableAni 
     */
    function drawIconLine(debounce=false, lineStyle) {
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
    if (util) {
        debDrawIcon4Line = util.debounce(drawIcon4Line, 100);
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
        };

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

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var quickselect = createCommonjsModule(function (module, exports) {
    (function (global, factory) {
    	 module.exports = factory() ;
    }(commonjsGlobal, (function () {
    function quickselect(arr, k, left, right, compare) {
        quickselectStep(arr, k, left || 0, right || (arr.length - 1), compare || defaultCompare);
    }

    function quickselectStep(arr, k, left, right, compare) {

        while (right > left) {
            if (right - left > 600) {
                var n = right - left + 1;
                var m = k - left + 1;
                var z = Math.log(n);
                var s = 0.5 * Math.exp(2 * z / 3);
                var sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
                var newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
                var newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
                quickselectStep(arr, k, newLeft, newRight, compare);
            }

            var t = arr[k];
            var i = left;
            var j = right;

            swap(arr, left, k);
            if (compare(arr[right], t) > 0) swap(arr, left, right);

            while (i < j) {
                swap(arr, i, j);
                i++;
                j--;
                while (compare(arr[i], t) < 0) i++;
                while (compare(arr[j], t) > 0) j--;
            }

            if (compare(arr[left], t) === 0) swap(arr, left, j);
            else {
                j++;
                swap(arr, j, right);
            }

            if (j <= k) left = j + 1;
            if (k <= j) right = j - 1;
        }
    }

    function swap(arr, i, j) {
        var tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    }

    function defaultCompare(a, b) {
        return a < b ? -1 : a > b ? 1 : 0;
    }

    return quickselect;

    })));
    });

    var rbush_1 = rbush;
    var default_1 = rbush;



    function rbush(maxEntries, format) {
        if (!(this instanceof rbush)) return new rbush(maxEntries, format);

        // max entries in a node is 9 by default; min node fill is 40% for best performance
        this._maxEntries = Math.max(4, maxEntries || 9);
        this._minEntries = Math.max(2, Math.ceil(this._maxEntries * 0.4));

        if (format) {
            this._initFormat(format);
        }

        this.clear();
    }

    rbush.prototype = {

        all: function () {
            return this._all(this.data, []);
        },

        search: function (bbox) {

            var node = this.data,
                result = [],
                toBBox = this.toBBox;

            if (!intersects(bbox, node)) return result;

            var nodesToSearch = [],
                i, len, child, childBBox;

            while (node) {
                for (i = 0, len = node.children.length; i < len; i++) {

                    child = node.children[i];
                    childBBox = node.leaf ? toBBox(child) : child;

                    if (intersects(bbox, childBBox)) {
                        if (node.leaf) result.push(child);
                        else if (contains(bbox, childBBox)) this._all(child, result);
                        else nodesToSearch.push(child);
                    }
                }
                node = nodesToSearch.pop();
            }

            return result;
        },

        collides: function (bbox) {

            var node = this.data,
                toBBox = this.toBBox;

            if (!intersects(bbox, node)) return false;

            var nodesToSearch = [],
                i, len, child, childBBox;

            while (node) {
                for (i = 0, len = node.children.length; i < len; i++) {

                    child = node.children[i];
                    childBBox = node.leaf ? toBBox(child) : child;

                    if (intersects(bbox, childBBox)) {
                        if (node.leaf || contains(bbox, childBBox)) return true;
                        nodesToSearch.push(child);
                    }
                }
                node = nodesToSearch.pop();
            }

            return false;
        },

        load: function (data) {
            if (!(data && data.length)) return this;

            if (data.length < this._minEntries) {
                for (var i = 0, len = data.length; i < len; i++) {
                    this.insert(data[i]);
                }
                return this;
            }

            // recursively build the tree with the given data from scratch using OMT algorithm
            var node = this._build(data.slice(), 0, data.length - 1, 0);

            if (!this.data.children.length) {
                // save as is if tree is empty
                this.data = node;

            } else if (this.data.height === node.height) {
                // split root if trees have the same height
                this._splitRoot(this.data, node);

            } else {
                if (this.data.height < node.height) {
                    // swap trees if inserted one is bigger
                    var tmpNode = this.data;
                    this.data = node;
                    node = tmpNode;
                }

                // insert the small tree into the large tree at appropriate level
                this._insert(node, this.data.height - node.height - 1, true);
            }

            return this;
        },

        insert: function (item) {
            if (item) this._insert(item, this.data.height - 1);
            return this;
        },

        clear: function () {
            this.data = createNode([]);
            return this;
        },

        remove: function (item, equalsFn) {
            if (!item) return this;

            var node = this.data,
                bbox = this.toBBox(item),
                path = [],
                indexes = [],
                i, parent, index, goingUp;

            // depth-first iterative tree traversal
            while (node || path.length) {

                if (!node) { // go up
                    node = path.pop();
                    parent = path[path.length - 1];
                    i = indexes.pop();
                    goingUp = true;
                }

                if (node.leaf) { // check current node
                    index = findItem(item, node.children, equalsFn);

                    if (index !== -1) {
                        // item found, remove the item and condense tree upwards
                        node.children.splice(index, 1);
                        path.push(node);
                        this._condense(path);
                        return this;
                    }
                }

                if (!goingUp && !node.leaf && contains(node, bbox)) { // go down
                    path.push(node);
                    indexes.push(i);
                    i = 0;
                    parent = node;
                    node = node.children[0];

                } else if (parent) { // go right
                    i++;
                    node = parent.children[i];
                    goingUp = false;

                } else node = null; // nothing found
            }

            return this;
        },

        toBBox: function (item) { return item; },

        compareMinX: compareNodeMinX,
        compareMinY: compareNodeMinY,

        toJSON: function () { return this.data; },

        fromJSON: function (data) {
            this.data = data;
            return this;
        },

        _all: function (node, result) {
            var nodesToSearch = [];
            while (node) {
                if (node.leaf) result.push.apply(result, node.children);
                else nodesToSearch.push.apply(nodesToSearch, node.children);

                node = nodesToSearch.pop();
            }
            return result;
        },

        _build: function (items, left, right, height) {

            var N = right - left + 1,
                M = this._maxEntries,
                node;

            if (N <= M) {
                // reached leaf level; return leaf
                node = createNode(items.slice(left, right + 1));
                calcBBox(node, this.toBBox);
                return node;
            }

            if (!height) {
                // target height of the bulk-loaded tree
                height = Math.ceil(Math.log(N) / Math.log(M));

                // target number of root entries to maximize storage utilization
                M = Math.ceil(N / Math.pow(M, height - 1));
            }

            node = createNode([]);
            node.leaf = false;
            node.height = height;

            // split the items into M mostly square tiles

            var N2 = Math.ceil(N / M),
                N1 = N2 * Math.ceil(Math.sqrt(M)),
                i, j, right2, right3;

            multiSelect(items, left, right, N1, this.compareMinX);

            for (i = left; i <= right; i += N1) {

                right2 = Math.min(i + N1 - 1, right);

                multiSelect(items, i, right2, N2, this.compareMinY);

                for (j = i; j <= right2; j += N2) {

                    right3 = Math.min(j + N2 - 1, right2);

                    // pack each entry recursively
                    node.children.push(this._build(items, j, right3, height - 1));
                }
            }

            calcBBox(node, this.toBBox);

            return node;
        },

        _chooseSubtree: function (bbox, node, level, path) {

            var i, len, child, targetNode, area, enlargement, minArea, minEnlargement;

            while (true) {
                path.push(node);

                if (node.leaf || path.length - 1 === level) break;

                minArea = minEnlargement = Infinity;

                for (i = 0, len = node.children.length; i < len; i++) {
                    child = node.children[i];
                    area = bboxArea(child);
                    enlargement = enlargedArea(bbox, child) - area;

                    // choose entry with the least area enlargement
                    if (enlargement < minEnlargement) {
                        minEnlargement = enlargement;
                        minArea = area < minArea ? area : minArea;
                        targetNode = child;

                    } else if (enlargement === minEnlargement) {
                        // otherwise choose one with the smallest area
                        if (area < minArea) {
                            minArea = area;
                            targetNode = child;
                        }
                    }
                }

                node = targetNode || node.children[0];
            }

            return node;
        },

        _insert: function (item, level, isNode) {

            var toBBox = this.toBBox,
                bbox = isNode ? item : toBBox(item),
                insertPath = [];

            // find the best node for accommodating the item, saving all nodes along the path too
            var node = this._chooseSubtree(bbox, this.data, level, insertPath);

            // put the item into the node
            node.children.push(item);
            extend(node, bbox);

            // split on node overflow; propagate upwards if necessary
            while (level >= 0) {
                if (insertPath[level].children.length > this._maxEntries) {
                    this._split(insertPath, level);
                    level--;
                } else break;
            }

            // adjust bboxes along the insertion path
            this._adjustParentBBoxes(bbox, insertPath, level);
        },

        // split overflowed node into two
        _split: function (insertPath, level) {

            var node = insertPath[level],
                M = node.children.length,
                m = this._minEntries;

            this._chooseSplitAxis(node, m, M);

            var splitIndex = this._chooseSplitIndex(node, m, M);

            var newNode = createNode(node.children.splice(splitIndex, node.children.length - splitIndex));
            newNode.height = node.height;
            newNode.leaf = node.leaf;

            calcBBox(node, this.toBBox);
            calcBBox(newNode, this.toBBox);

            if (level) insertPath[level - 1].children.push(newNode);
            else this._splitRoot(node, newNode);
        },

        _splitRoot: function (node, newNode) {
            // split root node
            this.data = createNode([node, newNode]);
            this.data.height = node.height + 1;
            this.data.leaf = false;
            calcBBox(this.data, this.toBBox);
        },

        _chooseSplitIndex: function (node, m, M) {

            var i, bbox1, bbox2, overlap, area, minOverlap, minArea, index;

            minOverlap = minArea = Infinity;

            for (i = m; i <= M - m; i++) {
                bbox1 = distBBox(node, 0, i, this.toBBox);
                bbox2 = distBBox(node, i, M, this.toBBox);

                overlap = intersectionArea(bbox1, bbox2);
                area = bboxArea(bbox1) + bboxArea(bbox2);

                // choose distribution with minimum overlap
                if (overlap < minOverlap) {
                    minOverlap = overlap;
                    index = i;

                    minArea = area < minArea ? area : minArea;

                } else if (overlap === minOverlap) {
                    // otherwise choose distribution with minimum area
                    if (area < minArea) {
                        minArea = area;
                        index = i;
                    }
                }
            }

            return index;
        },

        // sorts node children by the best axis for split
        _chooseSplitAxis: function (node, m, M) {

            var compareMinX = node.leaf ? this.compareMinX : compareNodeMinX,
                compareMinY = node.leaf ? this.compareMinY : compareNodeMinY,
                xMargin = this._allDistMargin(node, m, M, compareMinX),
                yMargin = this._allDistMargin(node, m, M, compareMinY);

            // if total distributions margin value is minimal for x, sort by minX,
            // otherwise it's already sorted by minY
            if (xMargin < yMargin) node.children.sort(compareMinX);
        },

        // total margin of all possible split distributions where each node is at least m full
        _allDistMargin: function (node, m, M, compare) {

            node.children.sort(compare);

            var toBBox = this.toBBox,
                leftBBox = distBBox(node, 0, m, toBBox),
                rightBBox = distBBox(node, M - m, M, toBBox),
                margin = bboxMargin(leftBBox) + bboxMargin(rightBBox),
                i, child;

            for (i = m; i < M - m; i++) {
                child = node.children[i];
                extend(leftBBox, node.leaf ? toBBox(child) : child);
                margin += bboxMargin(leftBBox);
            }

            for (i = M - m - 1; i >= m; i--) {
                child = node.children[i];
                extend(rightBBox, node.leaf ? toBBox(child) : child);
                margin += bboxMargin(rightBBox);
            }

            return margin;
        },

        _adjustParentBBoxes: function (bbox, path, level) {
            // adjust bboxes along the given tree path
            for (var i = level; i >= 0; i--) {
                extend(path[i], bbox);
            }
        },

        _condense: function (path) {
            // go through the path, removing empty nodes and updating bboxes
            for (var i = path.length - 1, siblings; i >= 0; i--) {
                if (path[i].children.length === 0) {
                    if (i > 0) {
                        siblings = path[i - 1].children;
                        siblings.splice(siblings.indexOf(path[i]), 1);

                    } else this.clear();

                } else calcBBox(path[i], this.toBBox);
            }
        },

        _initFormat: function (format) {
            // data format (minX, minY, maxX, maxY accessors)

            // uses eval-type function compilation instead of just accepting a toBBox function
            // because the algorithms are very sensitive to sorting functions performance,
            // so they should be dead simple and without inner calls

            var compareArr = ['return a', ' - b', ';'];

            this.compareMinX = new Function('a', 'b', compareArr.join(format[0]));
            this.compareMinY = new Function('a', 'b', compareArr.join(format[1]));

            this.toBBox = new Function('a',
                'return {minX: a' + format[0] +
                ', minY: a' + format[1] +
                ', maxX: a' + format[2] +
                ', maxY: a' + format[3] + '};');
        }
    };

    function findItem(item, items, equalsFn) {
        if (!equalsFn) return items.indexOf(item);

        for (var i = 0; i < items.length; i++) {
            if (equalsFn(item, items[i])) return i;
        }
        return -1;
    }

    // calculate node's bbox from bboxes of its children
    function calcBBox(node, toBBox) {
        distBBox(node, 0, node.children.length, toBBox, node);
    }

    // min bounding rectangle of node children from k to p-1
    function distBBox(node, k, p, toBBox, destNode) {
        if (!destNode) destNode = createNode(null);
        destNode.minX = Infinity;
        destNode.minY = Infinity;
        destNode.maxX = -Infinity;
        destNode.maxY = -Infinity;

        for (var i = k, child; i < p; i++) {
            child = node.children[i];
            extend(destNode, node.leaf ? toBBox(child) : child);
        }

        return destNode;
    }

    function extend(a, b) {
        a.minX = Math.min(a.minX, b.minX);
        a.minY = Math.min(a.minY, b.minY);
        a.maxX = Math.max(a.maxX, b.maxX);
        a.maxY = Math.max(a.maxY, b.maxY);
        return a;
    }

    function compareNodeMinX(a, b) { return a.minX - b.minX; }
    function compareNodeMinY(a, b) { return a.minY - b.minY; }

    function bboxArea(a)   { return (a.maxX - a.minX) * (a.maxY - a.minY); }
    function bboxMargin(a) { return (a.maxX - a.minX) + (a.maxY - a.minY); }

    function enlargedArea(a, b) {
        return (Math.max(b.maxX, a.maxX) - Math.min(b.minX, a.minX)) *
               (Math.max(b.maxY, a.maxY) - Math.min(b.minY, a.minY));
    }

    function intersectionArea(a, b) {
        var minX = Math.max(a.minX, b.minX),
            minY = Math.max(a.minY, b.minY),
            maxX = Math.min(a.maxX, b.maxX),
            maxY = Math.min(a.maxY, b.maxY);

        return Math.max(0, maxX - minX) *
               Math.max(0, maxY - minY);
    }

    function contains(a, b) {
        return a.minX <= b.minX &&
               a.minY <= b.minY &&
               b.maxX <= a.maxX &&
               b.maxY <= a.maxY;
    }

    function intersects(a, b) {
        return b.minX <= a.maxX &&
               b.minY <= a.maxY &&
               b.maxX >= a.minX &&
               b.maxY >= a.minY;
    }

    function createNode(children) {
        return {
            children: children,
            height: 1,
            leaf: true,
            minX: Infinity,
            minY: Infinity,
            maxX: -Infinity,
            maxY: -Infinity
        };
    }

    // sort an array so that items come in groups of n unsorted items, with groups sorted between each other;
    // combines selection algorithm with binary divide & conquer approach

    function multiSelect(arr, left, right, n, compare) {
        var stack = [left, right],
            mid;

        while (stack.length) {
            right = stack.pop();
            left = stack.pop();

            if (right - left <= n) continue;

            mid = left + Math.ceil((right - left) / n / 2) * n;
            quickselect(arr, mid, left, right, compare);

            stack.push(left, mid, mid, right);
        }
    }
    rbush_1.default = default_1;

    // this is Root Module for Whole app, require lib we need.

    if (typeof mapboxgl != "undefined") mapboxgl.accessToken = tk;

    exports.Canvas = Canvas;
    exports.CanvasOverlayer = CanvasOverlayer;
    exports.Chart = chart;
    exports.Config = config;
    exports.Controllers = controllers;
    exports.DomOverlayer = DomOverlayer;
    exports.Drone = Drone;
    exports.Util = util;
    exports.WindLayer = WindLayer;
    exports.drawIconLine = drawIconLine;
    exports.myTween = myTween;
    exports.rbush = rbush_1;
    exports.xMarker = xMarker;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
