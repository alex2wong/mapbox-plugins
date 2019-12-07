mapboxgl.accessToken = false;
var pane = new Tweakpane({ container: document.querySelector('#pane') });
var canvasLayer, animateReq;
var mapCenter = [119.66, 30.01];
var map = new mapboxgl.Map({
    style: Mapbox.Config.emptyStyle,
    center: mapCenter,
    pitch: 15,
    zoom: 8,
    container: 'map',
});

var PARAMS = {
    maxLength: .1,
    maxLife: 20,
    maxWidth: 6,
    direction: .2,
    speed: .02,
    enableTrail: false,
    darkTheme: true,
    enableGlow: true,
}
const f1 = pane.addFolder({
    title: 'Params',
});
f1.addInput(PARAMS, 'maxLength', { step: .1, min: 0, max: .5 });
f1.addInput(PARAMS, 'maxLife', { min: 0, max: 100 });
f1.addInput(PARAMS, 'maxWidth', { step: 1, min: 0, max: 100 });
f1.addInput(PARAMS, 'direction', { step: .1, min: 0, max: 3.14 });
f1.addInput(PARAMS, 'speed', { step: .01, min: -0.1, max: .1 });
f1.addInput(PARAMS, 'enableTrail');
f1.addInput(PARAMS, 'darkTheme');
f1.addInput(PARAMS, 'enableGlow');

var delayStartAnimate = Mapbox.Util.debounce(function() {
    clearCanv.bind(canvasLayer)();
    animate();
}, 100);

map.on('load', init);

function init() {
    canvasLayer = new Mapbox.CanvasOverlayer({
        map,
        data: rdLines(100),
        render: drawLineTrail,
        shadow: true,
    });

    canvasLayer.canvas.style.background = `linear-gradient(0deg, ${background[0]}, ${background[1]})`;
    // start move MeshLine and render animation
    animate();
}

function rdLines(cnt=20) {
    var lines = [];
    for (var i = 0; i < cnt; i++) {
        var start = [Math.random() * 2 + 119.0, Math.random() * 2 + 29.0];
        lines.push({
            start,
            getLength,
            end: start,
            life: Math.random() * PARAMS.maxLife,
            width: Math.random() * PARAMS.maxWidth,
            maxLength: Math.random() * PARAMS.maxLength,
            direction: PARAMS.direction,
            color: [pallette[Math.floor(Math.random() * 5)]],
        });
    }
    return lines;
}

var background = ['#305670', '#010609'];
var pallette = ['#e98c30', '#4aa7e9', '#d4cebc', '#dc3b2f', '#9050f0'];

/**
 * only for render..
 **/
function drawLineTrail() {
    var ctx = this.canvas.getContext('2d');
    var bkground = ctx.createLinearGradient(0, 0, this.canvas.width, 0);
    if (PARAMS.darkTheme) {
        bkground.addColorStop(0, '#305670');
        bkground.addColorStop(1, '#010609');
    } else {
        bkground.addColorStop(0, '#eda163');
        bkground.addColorStop(1, '#e9767b');
    }
    if (PARAMS.enableTrail) {
        // enable line trail, keep last frame image by .95 alpha !!
        Mapbox.Util._preSetCtx(ctx, null, .95);
    } else {
        ctx.fillStyle = bkground;
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    for (var i = 0; i < this.data.length; i++) {
        var meshLine = this.data[i];
        var start = this.map.project({ lng: meshLine.start[0], lat: meshLine.start[1] });
        var end = this.map.project({ lng: meshLine.end[0], lat: meshLine.end[1]});
        
        if (PARAMS.enableGlow) {
            var originalAlpha = (ctx).globalAlpha;
            (ctx).globalAlpha = .2;
            (ctx).globalCompositeOperation = 'lighter';
            ctx.lineWidth = meshLine.width + 4;
            (ctx).strokeStyle = meshLine.color[0];
            ctx.beginPath();
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();
            ctx.globalAlpha = originalAlpha;
        }

        (ctx).strokeStyle = meshLine.color[0];
        ctx.lineWidth = meshLine.width;
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
    }
    (ctx).globalCompositeOperation = 'source-over';
}

function clearCanv() {
    var ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

/**
 *  update MeshLines data.. 
 **/
function updateLineTrail(speed=PARAMS.speed) {
    // console.warn('meshLine data count: ', this.data);
    var deadLines = [];
    for (var i = 0; i < this.data.length; i++) {
        var meshLine = this.data[i];
        meshLine.life -= .1;
        if (meshLine.life <=0) {
            // life is the only condition to become dead.
            deadLines.push(i);
            continue;
        }
        // each frame meshLine move .01 grad ahead. and grow for .02 grad in length.
        var deltaX = .5 * speed * Math.sin(meshLine.direction);
        var deltaY = .5 * speed * Math.cos(meshLine.direction);
        // stop growth if maxlength reached..
        if (meshLine.getLength() >= meshLine.maxLength) {
            meshLine.end = [meshLine.end[0] + deltaX, meshLine.end[1] + deltaY];
        } else {
            meshLine.end = [meshLine.end[0] + deltaX * 2, meshLine.end[1] + deltaY * 2];
        }
        meshLine.start = [meshLine.start[0] + deltaX, meshLine.start[1] + deltaY];
    }
    // prune and update dead ones
    if (deadLines.length >= 1) {
        this.data = this.data.filter(function(line, i){ return deadLines.indexOf(i) == -1 });
        this.data.push(...rdLines(deadLines.length));
    }
}

function getLength() {
    return Math.pow((this.start[0] - this.end[0]), 2) + Math.pow((this.start[1] - this.end[1]), 2);
}

function animate() {
    // update all MeshLine data then redraw
    updateLineTrail.bind(canvasLayer)();
    canvasLayer.redraw();
    animateReq = requestAnimationFrame(animate);
}
