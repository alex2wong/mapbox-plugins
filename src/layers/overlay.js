/**
 * Base class of Overlayer
 */
export class Overlayer {
    constructor(opts){
        this.map = opts.map || undefined;
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
        if (map != undefined && map.project instanceof Function) {
            var lnglat = map.project(new mapboxgl.LngLat(
                lng, lat));
            var x = lnglat.x;
            var y = lnglat.y;
            return [x, y];
        }
        return [lng, lat];
    }
}
