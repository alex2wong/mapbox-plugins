import { Sprite } from './sprite';

export default class xMarker extends Sprite {
    constructor(gjsonFeature, opts) {
        super(opts);
        const _opts = opts || {};
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

function GeoJson () {
    this.properties = {
        iconSize: [32, 32],
    };
    this.geometry = {
        coordinates: [],
        type: '',
    };
}
