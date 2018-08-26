/**
 * Base class of Drone or other Game-Sprite
 */
export class Sprite {
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
            }
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

export function genId () {
    return (Math.random()*1000000).toString(16);
}

export function randomName () {
    let randomNum = Math.random() * 10000;
    return "Player ".concat(randomNum.toFixed(0));
}
