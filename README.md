# mapbox-plugins ![travisStatus](https://travis-ci.org/alex2wong/mapbox-plugins.svg?branch=master)
Customized Mapbox plugins, including game control, canvasOverlayer, scene animation

https://alex2wong.github.io/mapbox-plugins/

Note: pls visit all demo with **HTTPS**..

![DEMO screenshot](https://github.com/alex2wong/mapbox-plugins/blob/master/assets/ss.gif)

![Sprite track screenshot](https://github.com/alex2wong/mapbox-plugins/blob/master/assets/sprite_demo.png)

[Sprite track DEMO](https://alex2wong.github.io/mapbox-plugins/examples/sprite)

[Custom dom overlay DEMO](https://alex2wong.github.io/mapbox-plugins/examples/domoverlay)

[R-tree search (5000 rectangles) DEMO](https://alex2wong.github.io/mapbox-plugins/examples/rbush)

[Global Wind Layer. render 1w point animation with Canvas](https://alex2wong.github.io/mapbox-plugins/examples/windLayer)

# run locally

> npm install

> npm run start

visit from localhost:8080/examples/


# Use and Develope
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
Any bugfix, enhancement and PR receive warn welcome :)
