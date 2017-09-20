
import Const from './const';
import Bullet from './bullet';
import { readonly, log } from './util';
import { Sprite, randomName} from './sprites/sprite';

// // Drone model script
// const firingTime = 1200, MAXSPEED = 3.900;

/**
 * Drone class with control method.
 */
export default class Drone extends Sprite {
    constructor(opts) {
        super(opts);
        this.life = Const.DroneParam.LIFE;
        this.bullets = [];
        this.firing = false;
        this.bulletNum = 2;
        this.icon = Const.Images.Plane;
    }

    /**
     * maintask start interval to update its status.
     */
    updateStatus () {
        // make sure Sprite in world..
        let alY = Math.cos(this.direction*Math.PI/180) * this.speed * 0.001,
            lat = this.lat + alY;
        if (lat > 88 || lat < -88) {
            alY = 0;
            console.warn("latitude out of bbox");
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
            }, Const.DroneParam.FIRINGTIME)
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
            }, Const.DroneParam.FIRINGTIME)
            this.firing = true;
        } else {
            // this firing.. do nothing.
        }
    }
}
