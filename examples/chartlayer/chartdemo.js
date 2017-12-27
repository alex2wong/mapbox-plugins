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
                    "https://huangyixiu.co:3003/proxy?proxyURI=http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
                    // "http://www.google.cn/maps/vt?lyrs=s@702&gl=cn&x={x}&y={y}&z={z}",
                    // "https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png"
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
    zoom: 3,
    pitch: 45,
    bearing: 0,
    light: {
        'anchor':'viewport',
        'color':'white',
        'intensity':0.7
    },
    container: 'map'
});

var domLayer = null;
map.on('load', function() {
    Alex.Util.getJSON("../../assets/countries.geojson")
        .then((res) => {
                console.log("got jsonData..");
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
                        "fill-color": "rgba(0,0,0,0.4)",
                        "fill-outline-color": "#eee",
                        "fill-opacity": 0.4
                    },
                    // "filter": ["==", "$type", "Polygon"]
                });
            });
    domLayer = new Alex.DomOverlayer({
        map: map,
        doms: [
            {
                type: 'pie',
                class: 'bounceIn',
                data: {
                    datasets: [{
                        data: [50 ,40, 15],
                        backgroundColor: ['#ff6384', '#ffcd56', '#36a2eb']
                    }],
                    labels: ['teenager', 'adult', 'oldman']
                },
                lon: 104.11,
                lat: 28.12
            },
            {
                type: 'pie',
                class: 'bounceIn',
                data: {
                    datasets: [{
                        data: [100, 50 ,40],
                        backgroundColor: ['#ff6384', '#ffcd56', '#36a2eb']
                    }],
                    labels: ['teenager', 'adult', 'oldman']
                },
                // content: "load chart",
                lon: 122.22,
                lat: 45.22,
            },
            {
                type: 'pie',
                class: 'bounceIn',
                data: {
                    datasets: [{
                        data: [50, 12, 19],
                        backgroundColor: ['#ff6384', '#ffcd56', '#36a2eb']
                    }],
                    labels: ['teenager', 'adult', 'oldman']
                },
                lon: 116.33,
                lat: 23.21
            },
        ]
    });
});
