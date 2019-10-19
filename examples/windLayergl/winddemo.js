// import { Mapbox } from '../../dist/bundle.js';
//// https://alex2wong.github.io/mapbox-plugins

mapboxgl.accessToken = false;
var mapCenter = [38.0066, 30.6135];
var map = new mapboxgl.Map({        
    style: Mapbox.Config.emptyStyle,
    center: mapCenter,
    zoom: 1,
    pitch: 15,
    bearing: 0,
    container: 'map'
});

map.on('load', function() {
    Mapbox.Util.getJSON("../../assets/countries.geojson")
        .then((res) => {
            data = res;
            map.addSource("world", {
                "type": "geojson",
                "data": data
            });
            map.addLayer({
                "id": "world",
                "source": "world",
                "type": "fill",
                "paint": {
                    "fill-color": "rgba(0,0,0,0.7)",
                    "fill-outline-color": "#eee",
                    // "fill-opacity": 0.4
                },
                // "filter": ["==", "$type", "Polygon"]
            });
        });
    setTimeout(init, 500);
});

var windParticles;

function init() {
    // Only for wind data extraction, render happened in customlayer.
    var windlayer = new Mapbox.WindLayer({
        map: map,
    });
    var windImage = new Image(), mapboxRenderer = false;
    windImage.src = '../../assets/2016112000.png';
    windImage.onload = function() {
        // updateWind should include myTween things below..
        windlayer.updateWind(windImage, mapboxRenderer, 2);
        if (!mapboxRenderer) {
            windParticles = Mapbox.Util.deepClone(windlayer.particles);
            // rendering particle with webGL..
            map.addLayer(windyRenderLayer);
            // reset windParticle every 3 sec
            setInterval(function(){ windParticles = Mapbox.Util.deepClone(windlayer.particles); }, 3000)
        } else {
            map.addSource("wind", {
                "type": "geojson",
                "data": windlayer.particles
            });
            map.addLayer({
                "id": "wind",
                "source": "wind",
                "type": "circle",
                "paint": {
                    "circle-color": {
                        "property": "color",
                        "type": "identity"
                    },
                    "circle-radius": 2,
                    // "fill-opacity": 0.4
                }
                // "filter": ["==", "$type", "Polygon"]
            });
        }
    }
}

var windyRenderLayer = {
    id: 'windy',
    type: 'custom',
    onAdd: function (map, gl) {
        var vertexSource = `
            uniform mat4 u_matrix;
            attribute vec2 a_pos;
            attribute vec4 a_Color;
            varying vec4 v_Color;
            void main() {
                gl_Position = u_matrix * vec4(a_pos, 0.0, 1.0);
                gl_PointSize = 2.00;
                v_Color = a_Color;
            }
            `

        var fragmentSource = `
            precision mediump float;
            varying vec4 v_Color;
            void main() {
                gl_FragColor = v_Color;
            }
            `

        var vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, vertexSource);
        gl.compileShader(vertexShader);
        var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, fragmentSource);
        gl.compileShader(fragmentShader);

        this.program = gl.createProgram();
        gl.attachShader(this.program, vertexShader);
        gl.attachShader(this.program, fragmentShader);
        gl.linkProgram(this.program);

        this.aPos = gl.getAttribLocation(this.program, "a_pos");
        this.aColor = gl.getAttribLocation(this.program, 'a_Color');

        this.buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(getParticleFlatArray(windParticles)), gl.STATIC_DRAW);
    },
    render: function(gl, matrix) {
        var points;
        gl.useProgram(this.program);
        gl.uniformMatrix4fv(gl.getUniformLocation(this.program, "u_matrix"), false, matrix);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        windMoving(windParticles);
        // bind updated windParticles flarArray to gl Buffer
        points = new Float32Array(getParticleFlatArray(windParticles));
        gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

        var FSIZE = points.BYTES_PER_ELEMENT;
        gl.vertexAttribPointer(this.aPos, 2, gl.FLOAT, false, FSIZE * 5, 0);
        gl.enableVertexAttribArray(this.aPos);

        gl.vertexAttribPointer(this.aColor, 3, gl.FLOAT, false, FSIZE * 5, FSIZE * 2);
        gl.enableVertexAttribArray(this.aColor);

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.drawArrays(gl.POINTS, 0, points.length/5);
        map.triggerRepaint();
    }
};


/**
 * calc targets depend on its angle, use 1 degree as dist.
 * @param {*array of wind particles} source 
 * @param {*distance in gratitude the wind particle survive } dist
 */
function windMoving(source, dist=.2) {
    if (source instanceof Array) {
        for(var i=0; i<source.length;i++) {
            if (source[i].lon == undefined 
                || source[i].angle == undefined 
                || source[i].color == undefined) continue;
            xDelta = Math.cos(source[i].angle) * dist;
            yDelta = Math.sin(source[i].angle) * dist;
            // get rid of overflow particles..
            if (source[i].lat + yDelta > 84 || source[i].lat + yDelta < -84) continue;
            else source[i].lat = source[i].lat + yDelta;
            source[i].lon = source[i].lon + xDelta;
            source[i].color = source[i].color;
        }
    }
}

// return flatArray with length === particle.length * 5
function getParticleFlatArray(windParticles) {
  var flatArray = [];
  // normalize lnglat coords to webGL coords [-1, 1]
  for (var i = 0; i < windParticles.length; i ++) {
    if (windParticles[i] === {} || windParticles[i] === undefined) continue;
    var vColor = [];
    var xy = mapboxgl.MercatorCoordinate.fromLngLat({ lng: windParticles[i].lon, lat: windParticles[i].lat });
    flatArray.push(xy.x);
    flatArray.push(xy.y);
    vColor = windParticles[i].color.match(/\d+/g).slice(0,3).forEach(function(c){
        flatArray.push(c/255);
    });
  }
  return flatArray;
}
