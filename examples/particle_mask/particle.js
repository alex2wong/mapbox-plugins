var locs = [];
var ctx = null;
var cheight = 400;
var cwidth = 300;
var reqAnimation = 0;
function renderParticle(canvas) {
    cheight = canvas.height;
    cwidth = canvas.width;
    ctx = canvas.getContext('2d');
    _preSetCtx(ctx);
    // ctx.fillStyle = '#000';
    // ctx.fillRect(0, 0, cwidth, cheight);
    ctx.lineWidth = 1;
    // const dataPix = this._transformLnglat();
    // if (dataPix.length == 0) return;

    ctx.strokeStyle = '#fff';
    for (var i = 0; i < 100; i += 1) {
        // random blur..
        ctx.shadowBlur = Math.random() * 4;
        ctx.shadowColor = '#fff';
        ctx.beginPath();
        loc = [Math.random() * cwidth, Math.random() * cheight];
        locs.push(loc);
        //// should I proj lnglat to xy pixel ??
        ctx.arc(loc[0], loc[1], 1, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }

    console.warn('done initial rendering..');
    animate();
}

function animate() {
    ctx.clearRect(0,0,cwidth,cheight);
    // locs = dataPix;
    locs.forEach((loc, index) => {
        ctx.beginPath();
        ctx.shadowBlur = Math.random() * 6;
        const rad = Math.random() * 1.1;
        ctx.arc(loc[0], loc[1], rad, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    });
    setTimeout(() => {
        reqAnimation = requestAnimationFrame(animate);
    }, 500);
}

function _preSetCtx(context) {
    let prev = context.globalCompositeOperation;
    // on display overlay part of canvas . source-in, source, destination-in
    context.globalCompositeOperation = 'destination-in';
    context.globalAlpha = 0.95;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    // overlay new frames on prev one..
    context.globalCompositeOperation = prev;
}
