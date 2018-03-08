# mapbox-plugins ![travisStatus](https://travis-ci.org/alex2wong/mapbox-plugins.svg?branch=master) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Falex2wong%2Fmapbox-plugins.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Falex2wong%2Fmapbox-plugins?ref=badge_shield)

Customized Mapbox plugins, including game control, canvasOverlayer, scene animation

https://alex2wong.github.io/mapbox-plugins/

Note: pls visit all demo with **HTTPS**..

![Point animation](https://github.com/alex2wong/mapbox-plugins/blob/master/assets/demo/point.gif)

![Custom popup/Route animation](https://github.com/alex2wong/mapbox-plugins/blob/master/assets/demo/popup.gif)

![Chartjs integration](https://github.com/alex2wong/mapbox-plugins/blob/master/assets/demo/chart.gif)

![Glow animation](https://github.com/alex2wong/mapbox-plugins/blob/master/assets/demo/glow.gif)

![Rbush demo](https://github.com/alex2wong/mapbox-plugins/blob/master/assets/demo/rbush.gif)

## Online demo
[placeholder]:p

| demo title |  |
| :-------- | :--------:|
| [Sprite track DEMO](https://alex2wong.github.io/mapbox-plugins/examples/sprite) | [view code](https://github.com/alex2wong/mapbox-plugins/tree/master/examples/sprite) |
| [Custom dom overlay DEMO](https://alex2wong.github.io/mapbox-plugins/examples/domoverlay) | [view code](https://github.com/alex2wong/mapbox-plugins/tree/master/examples/domoverlay) |
| [R-tree search (5000 rectangles) DEMO](https://alex2wong.github.io/mapbox-plugins/examples/rbush) | [view code](https://github.com/alex2wong/mapbox-plugins/tree/master/examples/rbush) |
| [Global Wind Layer. render 1w point animation with Canvas](https://alex2wong.github.io/mapbox-plugins/examples/windLayer) | [view code](https://github.com/alex2wong/mapbox-plugins/tree/master/examples/windLayer) |
| [Integrate with Chart.js](https://alex2wong.github.io/mapbox-plugins/examples/chartlayer)  | [view code](https://github.com/alex2wong/mapbox-plugins/tree/master/examples/chartlayer) |
| [Glow animation](https://alex2wong.github.io/mapbox-plugins/examples/glowstyle) | [view code](https://github.com/alex2wong/mapbox-plugins/tree/master/examples/glowstyle) |
| [(NEW) Cool Route Animation](https://alex2wong.github.io/mapbox-plugins/examples/line_animation) | [view code](https://github.com/alex2wong/mapbox-plugins/tree/master/examples/line_animation) |


## run locally

> npm install

> npm start

visit from localhost:8080/examples/


## how to use
plugins provide canvasOverlay, domOverlay ,Sprite, gameControl extension etc. for example:

```
// create a CanvasOverlayer on Mapbox map instance..
var canvasLayer = new Alex.CanvasOverlayer({
    map: map,
    shadow: false,
    keepTrack: true,
    blurWidth: 4
});

// create a Drone inherites Sprite Class
var drone = new Alex.Drone({
    direction: 45,
    icon: "https://alex2wong.github.io/mapbox-plugins/assets/tri2.png"
});

// add keyboard control to Sprite.
Alex.Controllers.gameControl(drone);
function update(){
    drone.updateStatus();
    // render drone on canvasLayer.
    canvasLayer.redraw([drone]);
    requestAnimationFrame(update);
}
update();

```


### Any **☆Star, Enhancement and PR** are welcome :)

## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Falex2wong%2Fmapbox-plugins.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Falex2wong%2Fmapbox-plugins?ref=badge_large)

