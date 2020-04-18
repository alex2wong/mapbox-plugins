# mapbox-plugins [![Netlify Status](https://api.netlify.com/api/v1/badges/218aee4f-8771-4bb6-bb22-0df0a4a221a3/deploy-status)](https://app.netlify.com/sites/cocky-thompson-95a9bc/deploys) <img src="https://img.shields.io/npm/v/mapbox-plugins" /> <img src="https://img.shields.io/npm/l/mapbox-plugins.svg" alt="license">

Customized Mapbox plugins, including game control, canvasOverlayer, scene animation

https://alex2wong.github.io/mapbox-plugins/

[API Docs](https://alex2wong.github.io/mapbox-plugins/docs/)

For more detailed wiki, pls read **issue blogs**:

- [canvas wind layer](https://github.com/alex2wong/mapbox-plugins/issues/3)

- [canvas line style](https://github.com/alex2wong/mapbox-plugins/issues/4)

Note: pls visit all demo with **HTTPS**..

![Point animation](https://github.com/alex2wong/mapbox-plugins/blob/master/assets/demo/point.gif)

![Custom popup/Route animation](https://github.com/alex2wong/mapbox-plugins/blob/master/assets/demo/popup.gif)

![Chartjs integration](https://github.com/alex2wong/mapbox-plugins/blob/master/assets/demo/chart.gif)

![Glow animation](https://github.com/alex2wong/mapbox-plugins/blob/master/assets/demo/glow.gif)

![Rbush demo](https://github.com/alex2wong/mapbox-plugins/blob/master/assets/demo/rbush.gif)

![Canvas Line Style](https://github.com/alex2wong/mapbox-plugins/blob/master/assets/canvasLine.jpg)
canvas line style which can be integrate to any map/chart lib.

![Voxelize terrain data](https://upload-images.jianshu.io/upload_images/1950967-27728165c2bedf82.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1000/format/webp)
👆 Voxelize terrain data from a height image.

![Extrude typhoon image](https://github.com/alex2wong/mapbox-plugins/blob/master/assets/demo/threetyphoon.jpg)

👆 Extrude typhoon radar image.

![Animated Lines](https://github.com/alex2wong/mapbox-plugins/blob/master/assets/demo/lines.gif)

👆 Animated Lines/Particle system.


## Online demo
[placeholder]:p

| Demo | Code |
| :-------- | :--------:|
| [Sprite track DEMO](https://alex2wong.github.io/mapbox-plugins/examples/sprite) | [view code](https://github.com/alex2wong/mapbox-plugins/tree/master/examples/sprite) |
| [Custom dom overlay DEMO](https://alex2wong.github.io/mapbox-plugins/examples/domoverlay) | [view code](https://github.com/alex2wong/mapbox-plugins/tree/master/examples/domoverlay) |
| [R-tree search (5000 rectangles) DEMO](https://alex2wong.github.io/mapbox-plugins/examples/rbush) | [view code](https://github.com/alex2wong/mapbox-plugins/tree/master/examples/rbush) |
| [Global Wind Layer. render 1w point animation with Canvas](https://alex2wong.github.io/mapbox-plugins/examples/windLayer) | [view code](https://github.com/alex2wong/mapbox-plugins/tree/master/examples/windLayer) |
| [Integrate with Chart.js](https://alex2wong.github.io/mapbox-plugins/examples/chartlayer)  | [view code](https://github.com/alex2wong/mapbox-plugins/tree/master/examples/chartlayer) |
| [Glow animation](https://alex2wong.github.io/mapbox-plugins/examples/glowstyle) | [view code](https://github.com/alex2wong/mapbox-plugins/tree/master/examples/glowstyle) |
| [Cool Route Animation](https://alex2wong.github.io/mapbox-plugins/examples/line_animation) | [view code](https://github.com/alex2wong/mapbox-plugins/tree/master/examples/line_animation) |
| [Canvas Line Style](https://maphub.netlify.com/examples/line_style) | [view code](https://github.com/alex2wong/mapbox-plugins/blob/master/examples/line_style/index.html) |
| [Canvas Staring Demo](https://alex2wong.github.io/mapbox-plugins/examples/particle_mask/) ||
| [Tilting Ui Marker](https://maphub.netlify.com/examples/vectortile)|[view code](https://github.com/alex2wong/mapbox-plugins/blob/master/examples/vectortile/index.html)|
| [Threejs Typhoon](https://maphub.netlify.com/examples/typhoon/) | [view code](https://github.com/alex2wong/mapbox-plugins/blob/master/examples/typhoon/index.js) |
| [Line_Pattern](https://maphub.netlify.com/examples/line_pattern/) | [view code](https://github.com/alex2wong/mapbox-plugins/blob/master/examples/index.html) |

## install and use

> npm i mapbox-plugins

For node.js:
```
var Mapbox = require('mapbox-plugins')
console.warn(Mapbox.Config);
```
More often, for es6 development:
```
import { Config, CanvasOverlayer } from 'mapbox-plugins';
var canvasLayer = new CanvasOverlayer({
    map: map, // bind canvasOverlay with mapbox map instance..
});
```

## run locally

> npm install

> npm run dev

then visit from http://localhost:8080/examples/, HotModuleReload supported.

> npm run rbuild

to build all plugins into Mapbox.umd.js/Mapbox.esm.js


## how to use
plugins provide canvasOverlay, domOverlay ,Sprite, gameControl extension etc. for example:

```javascript
// create a CanvasOverlayer on Mapbox map instance..
var canvasLayer = new Mapbox.CanvasOverlayer({
    map: map,
    shadow: false,
    keepTrack: true,
    blurWidth: 4
});

// create a Drone inherites Sprite Class
var drone = new Mapbox.Drone({
    direction: 45,
    icon: "drone.jpg"
});

// add keyboard control to Sprite.
Mapbox.Controllers.gameControl(drone);
function update(){
    drone.updateStatus();
    // render drone on canvasLayer.
    canvasLayer.redraw([drone]);
    requestAnimationFrame(update);
}
update();

```


### **☆Star, Enhancement and PR** are welcome :)
