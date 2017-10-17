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
    zoom: 4,
    maxzoom: 5,
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
    Alex.myTween.fps = 20;
    Alex.myTween.loop = true;
    setTimeout(init, 500);
});

function init() {
    var objNum = 10, windlayer = new Alex.WindLayer({
        map: map,
        // shadow: false
    });
    var windImage = new Image();
    windImage.src = '../../assets/2016112000.png';
    windImage.onload = function() {
        // updateWind should include myTween things below..
        windlayer.updateWind(windImage, true);
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
                "circle-radius": 4,
                // "fill-opacity": 0.4
            }
            // "filter": ["==", "$type", "Polygon"]
        });

        // // objs = windlayer.particles;
        // // // myTween.loop = false;
        // // targets = windlayer.particles;
        // // Alex.myTween.get(objs).to(targets, 2000, windlayer.redraw);
        // map.on('moveend', function(){
        //     windlayer.redraw(windlayer.particles);
        // });
    }
}
