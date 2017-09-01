/**
 * Base class of Drone or other Game-Sprite
 */
export class Sprite {
    constructor(opts) {
        this.id = genId();
        this.speed = opts.speed || 1;
        this.direction = opts.direction || 0;
        this.name = opts.name || randomName();
        this.loction = {
            type: 'Point',
            coordinates: [100, 30]
        }
    }

    /**
     * to be overwrite.
     */
    accelerate() {
        
    }
    
    turnLeft () {
        if (this) {
            this.direction -= 0.1;
        }
    }
        
    turnRight () {
        this.direction += 0.1;
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
