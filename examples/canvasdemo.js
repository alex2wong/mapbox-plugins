// import { Alex } from '../dist/bundle.js';

mapboxgl.accessToken = false;
var mapCenter = [118.0066, 30.6135];
var map = new mapboxgl.Map({
    style: {
        "version": 8,
        "sprite": "../assets/sprite",
        "glyphs": "../../{fontstack}/{range}.pbf",
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
            {
                'id': 'custom-tms',
                'type': 'raster',
                'source': 'custom-tms',
                'paint': {}
            },
        ]
    },
    center: mapCenter,
    zoom: 6,
    pitch: 45,
    bearing: 0,
    light: {
        'anchor':'viewport',
        'color':'white',
        'intensity':0.7
    },
    container: 'map'
});

map.on('load', function() {
    Alex.myTween.fps = 40;
    init();
});

function init() {
    var objNum = 10, canvasLayer = new Alex.CanvasOverlayer();
    objs = Alex.Util.rdObjs(objNum, mapCenter);
    // myTween.loop = false;
    targets = Alex.Util.rdObjs(objNum, mapCenter);
    Alex.myTween.get(objs).to(targets, 4000, canvasLayer.redraw);
}
