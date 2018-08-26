// import { Mapbox } from '../dist/bundle.js';

mapboxgl.accessToken = false;
var mapCenter = [118.0066, 30.6135];
var map = new mapboxgl.Map({
    style: Mapbox.Config.darkStyle,
    center: mapCenter,
    zoom: 7,
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
    Mapbox.myTween.fps = 40;
    Mapbox.myTween.loop = true;
    init();
});

function init() {
    var objNum = 100, canvasLayer = new Mapbox.CanvasOverlayer({
        map: map,
        shadow: true,
        blurWidth: 4
    });
    objs = Mapbox.Util.rdObjs(objNum, mapCenter);
    // myTween.loop = false;
    targets = Mapbox.Util.rdObjs(objNum, mapCenter);
    Mapbox.myTween.get(objs).to(targets, 8000, canvasLayer.redraw);
    map.on('moveend', function(){
        canvasLayer.redraw(objs);
    });

    var btn = document.querySelector("#pausePointbtn");
    btn.addEventListener("click", Mapbox.myTween.toggleAni);
}
