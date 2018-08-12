// this is Root Module for Whole app, require lib we need.
import Drone from './drone';
import Canvas from "./chart/canvas";
import Chart from "./chart/chartmodel";
import Util from "./util";
import Controllers from "./controller";

import { myTween, sleep} from "./tween/Tween";
import { CanvasOverlayer } from './layers/canvasOverlay';
import { DomOverlayer } from './layers/domOverlay';
import { WindLayer } from './layers/windLayer';
import * as Config from './config';
import { drawArrowLine } from './layers/canvasUtil';

var rbush = require('rbush');

// var HexgridHeatmap = require('./layers/hexgridHeatLayer');
if(typeof mapboxgl != 'undefined')
    mapboxgl.accessToken = Config.tk;
// Static Props..
export {
    Drone, Canvas, Chart, Util, Controllers, myTween, 
    CanvasOverlayer, DomOverlayer, WindLayer, rbush, Config,
    drawArrowLine,
}
