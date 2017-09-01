// hyxCanvas.js

window.onload=function(){
        var points = [];
        logFlag = 0;
        initCanvas();
        /*inter = setInterval(function(){
            var newPoint = Math.random()*200;
            if(points.length>60){
                points.shift();
            }
            points.push(newPoint);
            drawLines(points);

        },1000);
        clearInterval(inter);*/
    }

    canvWidth = 600;
    canvHeight = 400;   
    (function gl(){
        g = "aaa";        
        env = 11;
        val = 22;
        container = null;
        getVal = function (){
            return val;
        }
    })();
    //匿名函数中的全局变量自动附加为 window的属性（window代表窗体，包含location，history）

    function gele(id){
        return document.getElementById(id);
    }

    function local(name,age){
        this.name = name;
        this.age = age;
        return this;
    }
    //绘制直线和曲线路径 beginPath()开始新路径 moveTo()设定起点 lineTo()直线 arcTo()
    function initCanvas(){
        //var container = document.createElement('canvas');
        container = gele("canv");
        container.width = canvWidth;
        container.height = canvHeight;
        
        ctx = container.getContext('2d');
        ctx.strokeStyle = "#03A9F4";
        ctx.lineWidth = 1;
                
    }    
    //var inter = setInterval(drawRect,1000);
    //inter.clear();

    drawRect = function(){
        //清除上次的结果
        clearCanv();
        //定义随机颜色填充
        //ctx.fillStyle = randRgba();
        ctx.fillStyle = "#03A9F4";
        var barX = -10, barHeight;
        for (var i = 18; i >= 0; i--) {
            barX += 30;
            barHeight = Math.random()*-200;
            //ctx.strokeRect(barX,canvHeight,20, barHeight);
            ctx.fillRect(barX,canvHeight,20, barHeight);
        }        
    }

    // 绘制线 比较特别，一段折线需要一个起始点。用moveTo指定起始点。
    // 需要传入一个点数据进入队列，var 
    function drawLine(){
        clearCanv();
        //定义随机颜色填充
        ctx.beginPath();
        ctx.strokeStyle = "#03A9F4";
        //定义线条宽度（像素）
        ctx.lineWidth = 2;
        var pointX = 20, pointY = Math.random()*200;
        ctx.moveTo(pointX, pointY);
        for (var i = 18; i >= 0; i--) {
            pointX += 30;
            pointY = Math.random()*200;
            ctx.lineTo(pointX,pointY);            
        }
        //闭合曲线，可以填充为多边形。
        //ctx.closePath();
        ctx.stroke();
    }

    //针对流数据的展示，从最后一个点开始绘制。
    function drawLines(points){
        clearCanv();
        ctx.beginPath();
        ctx.lineStyle = "#03A9F4";
        ctx.lineWidth =2;
        var pointX = canvWidth;
        if( points instanceof Array ){
            var pnums = points.length;
            var pointY = points[pnums-1];
            ctx.moveTo(pointX, pointY);
            for (var i = points.length - 2; i >= 0; i--) {
                pointY = points[i];
                pointX -= 10;
                ctx.lineTo(pointX, pointY);
            }
            ctx.stroke();
        }
    }

    function deg2rad(deg){
        return deg * Math.PI / 180;
    }
    function rad2deg(rad){
        return rad * 180 / Math.PI;
    }

    //arc 绘制弧线。
    function drawArc(){
        //arc(x,y,radius,startAngle,endAngle,anticlockwise)
        var endAgle = 0.0;
        //开始一个新的绘制路径
        ctx.beginPath();
        ctx.strokeStyle = "blue";
        //ctx.moveTo(x, 190);
        endAgle +=(2 * Math.PI)/5;
        ctx.arc(50,50,50,0,Math.PI/2,false);
        ctx.stroke();        
    }
    //drawArc();

    randColor =  function(){

        var hexR = Math.floor( Math.random()*255).toString(16);
        var hexG = Math.floor( Math.random()*255).toString(16);
        var hexB = Math.floor( Math.random()*255).toString(16);
        return "#"+ hexR +hexG +hexB;
    }

    // 函数表达式，必须在调用前声明。
    randRgba = function (){
        var decR = Math.floor( Math.random()*255);
        var decG = Math.floor( Math.random()*255);
        var decB = Math.floor( Math.random()*255);
        return "rgba(" + decR + "," + decG + "," + decB + "," + "0.5)";
    }

    // 函数声明，在按顺序执行JS代码 之前就解析。
    function drawPoint(x, y, width){
        if (typeof x == "number" && typeof y == "number"){
            ctx.beginPath();
            //定义随机颜色边线 randRgba();
            ctx.strokeStyle = "rgba(255,255,255,0.7)";
            ctx.fillStyle = "rgba(10,10,200,0.5)";
            ctx.strokeWidth = 1;
            if (typeof arguments[2] == "undefined"){
                var width = 4;
            }
            ctx.arc(x, y, width, 0, Math.PI*2, false);
            //ctx.stroke();
            ctx.fill();
        }
        else return;
    }

    //随机生成 泡泡点
    function randPoint(nums){
        if(typeof nums == "number"){
            clearCanv()
            var pointX, pointY;
            for (var i = nums - 1; i >= 0; i--) {
                pointX = Math.random()*canvWidth;
                pointY = Math.random()*canvHeight;
                radius = Math.random()*10;
                drawPoint(pointX, pointY, radius);
            };            
        }

    }
    function clearCanv(){
        ctx.clearRect(0,0,canvWidth,canvHeight);
    }