/**
 * Base class of Overlayer
 */
export default class Overlayer {
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
            let x = (lnglat.x).toFixed(0), y = (lnglat.y).toFixed(0);
            return [x, y];
        }
        return [lng, lat];
    }
}
