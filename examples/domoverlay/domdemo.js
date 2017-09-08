// import * as Alex from '../src/index';

// Alex.Util.getJSON("../package.json");
mapboxgl.accessToken = false;
var mapCenter = [118.0066, 30.6135];
var map1 = new mapboxgl.Map({
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
    container: 'map1'
});

map1.on('load', function() {
    var domLayer = new Alex.DomOverlayer({
        map: map1,
        doms: [
            {
                icon: 'rocket-11',
                content: "This is domOverlay",
                lon: mapCenter[0],
                lat: mapCenter[1]
            }
        ]
    });
});
