// import * as Alex from '../src/index';

var data = null;
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
                    // "https://huangyixiu.co:3003/proxy?proxyURI=http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
                    // "http://www.google.cn/maps/vt?lyrs=s@702&gl=cn&x={x}&y={y}&z={z}",
                    "https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png"
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
    pitch: 15,
    bearing: 0,
    light: {
        'anchor':'viewport',
        'color':'white',
        'intensity':0.7
    },
    container: 'map'
});

map.on('load', function() {
    Alex.Util.getJSON("../../assets/countries.geojson", function(res){
        console.log("got jsonData..");
        data = res;
        map.addSource("world", {
            "type": "geojson",
            "data": data
        });
        map.addLayer("world", {
            "source": "world",
            "type": "fill",
            "paint": {
                "fill-color": "#888888",
                "fill-opacity": 0.4
            },
            "filter": ["==", "$type", "Polygon"]
        });
    });
    var domLayer = new Alex.DomOverlayer({
        map: map,
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
