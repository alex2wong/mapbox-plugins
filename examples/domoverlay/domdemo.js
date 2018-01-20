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
                    // "https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png"
                ],
                'tileSize': 256
            },
        },
        "layers": [
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
                icon: 'rocket-11',
                content: "This is domOverlay",
                class: 'bounceIn',
                lon: mapCenter[0],
                lat: mapCenter[1]
            },
            {
                resources: ['https://wx1.sinaimg.cn/mw690/4507b64aly1fmju1qfe03j21kw11t7wj.jpg'],
                content: "ready to load picture",
                class: 'bounceInUp',
                lon: mapCenter[0]-1.5,
                lat: mapCenter[1]-1.5
            }
        ]
    });
});

function init() {
    document.querySelector("#btn").addEventListener("click", addDoms);

    function addDoms() {
        domLayer.setDoms(domLayer.domOpts.concat({
            content: "new add pop",
            class: 'bounceIn',
            lon: mapCenter[0] + (Math.random()*6 - 3),
            lat: mapCenter[1] + (Math.random()*6 - 3)
        }));
    }
}
