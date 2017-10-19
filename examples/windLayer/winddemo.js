// import { Alex } from '../../dist/bundle.js';
//// https://alex2wong.github.io/mapbox-plugins

mapboxgl.accessToken = false;
var mapCenter = [118.0066, 30.6135];
var map = new mapboxgl.Map({        
    style: {
        "version": 8,
        "sprite": "https://alex2wong.github.io/mapbox-plugins/assets/sprite",
        "glyphs": "https://alex2wong.github.io/mapbox-plugins/{fontstack}/{range}.pbf",
        "sources": {
            "custom-tms": {   
                'type': 'raster',
                'tiles': [
                    "https://huangyixiu.co:3003/proxy?proxyURI=http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
                    // "http://www.google.cn/maps/vt?lyrs=s@702&gl=cn&x={x}&y={y}&z={z}"
                ],
                'tileSize': 256
            },
        },
        "layers": [
            // {
            //     'id': 'custom-tms',
            //     'type': 'raster',
            //     'source': 'custom-tms',
            //     'paint': {}
            // },
        ]
    },
    center: mapCenter,
    zoom: 2,
    pitch: 15,
    bearing: 0,
    container: 'map'
});

map.on('load', function() {
    Alex.Util.getJSON("../../assets/countries.geojson")
        .then((res) => {
            console.log("got jsonData..: " + res);
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
    Alex.myTween.fps = 10;
    Alex.myTween.loop = true;
    setTimeout(init, 500);
});

function init() {
    var objNum = 10, windlayer = new Alex.WindLayer({
        map: map,
        shadow: true,
        blurWidth: 0,
        radius: 1
    });
    var windImage = new Image(), geojson = false;
    windImage.src = '../../assets/2016112000.png';
    windImage.onload = function() {
        // updateWind should include myTween things below..
        windlayer.updateWind(windImage, geojson, 2);
        if (!geojson) {
            objs = windlayer.particles; targets = genWinTarget(objs);
            // hello, nice2meet you. calc targets depend on its angle, use 1 degree as dist.
            Alex.myTween.get(objs).to(targets, 8000, windlayer.redraw);
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
