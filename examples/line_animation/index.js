// import * as Alex from '../../src/index';

var data = null;
var mapCenter = [121.470, 31.165];
var map = new mapboxgl.Map({
    // style: Alex.Config.default.mapStyles,
    style: "mapbox://styles/huangyixiu/cjbhyg80s19m42rqg0kdpkntw",
    center: mapCenter,
    zoom: 10.6,
    maxzoom: 10,
    pitch: 15,
    container: 'map',
    hash: true
});

map.on('load', function() {
    console.log("map loaded...");
    Alex.myTween.fps = 40;
    Alex.myTween.loop = true;
    init();
});

function init() {
    var objNum = 14, canvasLayer = new Alex.CanvasOverlayer({
        map: map,
        shadow: true,
        keepTrack: true,
        xfield: 'lng',
        yfield: 'lat'
    });

    Alex.Util.getJSON(`https://api.mapbox.com/directions/v5/mapbox/driving-traffic/121.47088607666387%2C31.165132066708765%3B121.76845541758418%2C31.068959449424998.json?geometries=geojson&alternatives=true&steps=false&overview=full&access_token=${mapboxgl.accessToken}`)
        .then((res) => {
                data = res.routes[0].geometry;
                console.log("got routes data..");
                update();
        });
    
    function update(){
        animateLine(data);
        requestAnimationFrame(update);
    }
    // update();

    /**
     * animate routes from start to end.
     * @param {*input geometry or feature} data 
     */
    function animateLine(data) {
        if (typeof data == 'undefined'|| !Array.isArray(data.coordinates)) return;
        var segmentNum = data.coordinates.length;
        var currentIndex = canvasLayer.getTracks().length;
        if (currentIndex < (segmentNum -1)) {
            // add one stopPoint to render for each frame.
            canvasLayer.redraw(arr2objs(data.coordinates[currentIndex + 1]));
        } else {
            canvasLayer.setTracks([]);
        }
    }

    function arr2objs(lnglat) {
        if (!Array.isArray(lnglat) || lnglat.length != 2) return null;
        return [{lng: lnglat[0], lat: lnglat[1], }];
    }
}
