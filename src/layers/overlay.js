/**
 * Base class of Overlayer
 */
export default class Overlayer {
    constructor(opts){
        if (opts)
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
            let lnglat = map.project(new mapboxgl.LngLat(
                lng, lat));
            let x = lnglat.x, y = lnglat.y;
            return [x, y];
        }
        return [lng, lat];
    }
}
