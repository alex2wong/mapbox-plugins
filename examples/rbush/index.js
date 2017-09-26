// // var rbush = require('rbush');
// import * as Alex from "../../src/index";

var tree = Alex.rbush();

var canv = document.querySelector("#map");
Alex.Canvas.init(canv);
Alex.Canvas.setWidth(1);
Alex.Canvas.setStroke("rgba(255,255,255,0.7)");
// random rect and bulk insert to rbush..
var items = [], itemIndex = 0;
for(var i = 0; i< 5000; i++) {
    var item = randomRect(canv);
    items.push(item);
    Alex.Canvas.drawRect(item);
}
// console.log("items")
tree.load(items);

function randomRect(canv) {
    var rect = {}, height = 400, width = 400;
    if (canv instanceof HTMLCanvasElement) {
        width = canv.width;
        height = canv.height;
    }
    rect.minX = parseInt(Math.random()*width);
    // hahahh ,bug detected.. string + string = stringConcat..hugeNumber
    rect.maxX = rect.minX + parseInt(Math.random()*20);
    rect.minY = parseInt(Math.random()*height);
    rect.maxY = rect.minY + parseInt(Math.random()*20);
    rect.name = "rect" + itemIndex;
    itemIndex += 1;
    console.log(JSON.stringify(rect));
    return rect;
}

var treeData = tree.toJSON();
var bbox = {
    minX: 40,
    minY: 20,
    maxX: 80,
    maxY: 70
}
var result = tree.search(bbox);

var elapses = [];
function handler(evt){
    // clientX is evt relative to windowLeft, scrollLeft is current scroll pix, targetDOM.offsetTop is dom's offset.
    var body = document.documentElement || document.body,
        x = evt.clientX + body.scrollLeft - canv.offsetLeft,
        y = evt.clientY + body.scrollTop - canv.offsetTop,
        bbox = {};
    // console.log("evtXY: " + x, y);
    bbox.minX = x - 20;
    bbox.maxX = x + 20;
    bbox.minY = y - 20;
    bbox.maxY = y + 20;
    // console.log("bbox rect:  " + JSON.stringify(bbox));
    var start = new Date();
    var tmp = tree.search(bbox);
    selected = tmp;    
    
    Alex.Canvas.clearCanv();    
    Alex.Canvas.setStroke("rgba(255,255,255,0.7)");
    items.forEach((item)=>{
        // redraw all items..
        Alex.Canvas.drawRect(item);
    });

    Alex.Canvas.setFill("rgba(255,255,255,0.8)");
    selected.forEach((item)=>{
        // redraw all items..
        Alex.Canvas.drawRect(item, fill=true);
    })

    Alex.Canvas.setStroke("rgba(255,0,0,0.9)");
    Alex.Canvas.drawRect(bbox);

    var elapse = getElapse(start);
    elapses.push(elapse);
    console.warn("selected complete elapseTime(ms): " + elapse);
    
}

var selected = [];
canv.addEventListener("mousemove", handler);
setInterval(stat, 2000);

function stat() {
    var totalTime = 0, totalCounts = 0;
    elapses.forEach((elapse)=>{
        totalCounts += 1;
        totalTime += elapse;
    });
    console.log("Average Search Time (ms): " + totalTime/totalCounts);
    var res = document.querySelector("#result");
    res.innerHTML = "Average Search Time (ms): " + (totalTime/totalCounts).toFixed(3);
}

/**
 * return elapse time in ms
 */
function getElapse(start) {
    var end = new Date();
    return (end - start);
}
