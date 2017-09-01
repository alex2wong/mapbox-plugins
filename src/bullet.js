
/**
 * Bullet class
 */
export default class Bullet {
    // opts should contain the Drone's direction and geometry
    constructor(opts) {
        this.id;
        this.direciton = opts.direction ? opts.direction: 0;
        this.spoint = {
            type: 'Point',
            coordinates: [0, 0]
        };
        // DeepCopy the drone coords to bullet.
        this.spoint.coordinates[0] = opts.point.coordinates[0];
        this.spoint.coordinates[1] = opts.point.coordinates[1];
    }
}
