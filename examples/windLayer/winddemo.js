// import { Mapbox } from '../../dist/bundle.js';
//// https://alex2wong.github.io/mapbox-plugins

mapboxgl.accessToken = false;
var mapCenter = [118.0066, 30.6135];
var map = new mapboxgl.Map({        
    style: Mapbox.Config.emptyStyle,
    center: mapCenter,
    zoom: 2,
    pitch: 15,
    bearing: 0,
    container: 'map'
});

map.on('load', function() {
    Mapbox.Util.getJSON("../../assets/countries.geojson")
        .then((res) => {
            data = res;
            map.addSource("world", {
                "type": "geojson",
                "data": data
            });
            map.addLayer({
                "id": "world",
                "source": "world",
                "type": "fill",
                "paint": {
                    "fill-color": "rgba(0,0,0,0.7)",
                    "fill-outline-color": "#eee",
                    // "fill-opacity": 0.4
                },
                // "filter": ["==", "$type", "Polygon"]
            });
        });
    Mapbox.myTween.fps = 50;
    Mapbox.myTween.loop = true;
    setTimeout(init, 500);
});

function init() {
    var windlayer = new Mapbox.WindLayer({
        map: map,
        shadow: true,
        blurWidth: 0,
        radius: 1
    });
    var windImage = new Image(), mapboxRenderer = false;
    windImage.src = '../../assets/2016112000.png';
    windImage.onload = function() {
        // updateWind should include myTween things below..
        windlayer.updateWind(windImage, mapboxRenderer, 2);
        if (!mapboxRenderer) {
            objs = windlayer.particles; targets = genWinTarget(objs);
            // hello, nice2meet you. calc targets depend on its angle, use 1 degree as dist.
            Mapbox.myTween.get(objs).to(targets, 8000, windlayer.redraw);
            map.on('moveend', function(){
                windlayer.redraw(objs);
            });
        } else {
            map.addSource("wind", {
                "type": "geojson",
                "data": windlayer.particles
            });
            map.addLayer({
                "id": "wind",
                "source": "wind",
                "type": "circle",
                "paint": {
                    "circle-color": {
                        "property": "color",
                        "type": "identity"
                    },
                    "circle-radius": 2,
                    // "fill-opacity": 0.4
                }
                // "filter": ["==", "$type", "Polygon"]
            });
        }
    }
}
/**
 * calc targets depend on its angle, use 1 degree as dist.
 * @param {*array of wind particles} source 
 */
function genWinTarget(source, dist=6) {
    if (source instanceof Array) {
        var targets = [];
        for(var i=0; i<source.length;i++) {
            var targ = {};
            if (source[i].lon == undefined 
                || source[i].angle == undefined 
                || source[i].color == undefined) continue;
            xDelta = Math.cos(source[i].angle) * dist;
            yDelta = Math.sin(source[i].angle) * dist;
            if (source[i].lat + yDelta > 84 || source[i].lat + yDelta < -84) targ.lat = source[i].lat;
            else targ.lat = source[i].lat + yDelta;
            targ.lon = source[i].lon + xDelta;
            targ.color = source[i].color;
            targets.push(targ);
        }
        return targets;
    }
}
