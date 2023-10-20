var map = window.map = new mapboxgl.Map({
    container: 'map',
    zoom: 3,
    center: [7.5, 58],
    style: Mapbox.Config.darkStyle,
});

var helsinki = mapboxgl.MercatorCoordinate.fromLngLat({ lng: 25.004, lat: 60.239 });
var berlin = mapboxgl.MercatorCoordinate.fromLngLat({ lng: 13.403, lat: 52.562 });
var kyiv = mapboxgl.MercatorCoordinate.fromLngLat({ lng: 30.498, lat: 50.541 });
var delta = 0.00001;
var endCount = 60 * 20;

var highlightLayer = {
    id: 'highlight',
    type: 'custom',

    onAdd: function (map, gl) {
        var vertexSource = "" +
            "uniform mat4 u_matrix;" +
            "attribute vec2 a_pos;" +
            "void main() {" +
            "    gl_Position = u_matrix * vec4(a_pos, 0.0, 1.0);" +
            "}";

        var fragmentSource = "" +
            "void main() {" +
            "    gl_FragColor = vec4(1.0, 0.0, 0.0, 0.5);" +
            "}";

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

        this.buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            helsinki.x, helsinki.y,
            berlin.x, berlin.y,
            kyiv.x, kyiv.y,
        ]), gl.STATIC_DRAW);
    },

    render: function (gl, matrix) {
        gl.useProgram(this.program);
        gl.uniformMatrix4fv(gl.getUniformLocation(this.program, "u_matrix"), false, matrix);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        // move vertex
        if (helsinki.x <= kyiv.x) {
            helsinki.x += delta; helsinki.y += delta;
            berlin.x += delta; berlin.y += delta;
            kyiv.x -= delta; kyiv.y -= delta;

            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
                helsinki.x, helsinki.y,
                berlin.x, berlin.y,
                kyiv.x, kyiv.y,
            ]), gl.STATIC_DRAW);
        }

        gl.enableVertexAttribArray(this.aPos);
        gl.vertexAttribPointer(this.aPos, 2, gl.FLOAT, false, 0, 0);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);
        map.triggerRepaint();
    }
};

map.on('load', function () {
    map.addLayer(highlightLayer);
});