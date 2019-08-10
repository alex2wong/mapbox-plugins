// mapboxgl.accessToken = false;
const center = [120.608807, 29.262392];
var map = window.map = new mapboxgl.Map({
    container: 'map',
    style: Mapbox.Config.darkStyle,
    // style: 'mapbox://styles/mapbox/dark-v10',
    center: center,
    zoom: 4.8,
    pitch: 30,
    hash: true
});
map.addControl(new mapboxgl.NavigationControl);
map.addControl(new mapboxgl.FullscreenControl);

// parameters to ensure the THREE plane is georeferenced correctly on the map
// var modelOrigin = [19.638807, 0.762392];
var modelOrigin = center;
var modelAltitude = 0;
var modelRotate = [Math.PI / 2, 0, 0];
var modelScale = 3.31843220338983e-5;

// transformation parameters to position, rotate and scale the 3D model onto the map
var modelTransform = {
    translateX: mapboxgl.MercatorCoordinate.fromLngLat(modelOrigin, modelAltitude).x,
    translateY: mapboxgl.MercatorCoordinate.fromLngLat(modelOrigin, modelAltitude).y,
    translateZ: mapboxgl.MercatorCoordinate.fromLngLat(modelOrigin, modelAltitude).z,
    rotateX: modelRotate[0],
    rotateY: modelRotate[1],
    rotateZ: modelRotate[2],
    scale: modelScale,
};

var THREE = window.THREE;

// configuration of the custom layer for a 3D model per the CustomLayerInterface
var customLayer = {
    id: '3d-terrain',
    type: 'custom',
    renderingMode: '3d',
    onAdd: function (map, gl) {
        this.camera = new THREE.Camera();
        this.scene = new THREE.Scene();
        this.map = map;

        // use the Mapbox GL JS map canvas for three.js
        this.renderer = new THREE.WebGLRenderer({
            canvas: map.getCanvas(),
            context: gl
        });

        this.terrainLoader = new TerrainLoader({
            scene: this.scene,
            camera: this.camera,
            renderer: this.renderer
        });

        this.renderer.autoClear = false;
        this.terrainLoader.initTerrainLayer();
        this.terrainLoader.loadTerrainLayer();
    },
    render: function (gl, matrix) {
        var rotationX = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(1, 0, 0), modelTransform.rotateX);
        var rotationY = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 1, 0), modelTransform.rotateY);
        var rotationZ = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 0, 1), modelTransform.rotateZ);

        // sync mapbox matrix with THREE camera Matrix. Important! seems THREE.Matrix4.scale is a must.
        var m = new THREE.Matrix4().fromArray(matrix);
        var l = new THREE.Matrix4().makeTranslation(modelTransform.translateX, modelTransform.translateY, modelTransform.translateZ)
            .scale(new THREE.Vector3(modelTransform.scale, -modelTransform.scale, modelTransform.scale))
            .multiply(rotationX)
            .multiply(rotationY)
            .multiply(rotationZ);

        // sync mapbox matrix with THREE camera.
        this.camera.projectionMatrix.elements = matrix;
        this.camera.projectionMatrix = m.multiply(l);
        this.renderer.state.reset();
        this.renderer.render(this.scene, this.camera);
        this.map.triggerRepaint();
    }
};

map.on('style.load', function () {
    console.warn('style loaded, adding THREE layer..');
    map.addLayer(customLayer);
});

function rotate() {
    map.rotateTo(map.getBearing() + 1);
    reqFrame = requestAnimationFrame(rotate);
}
rotate();
function toggleRotate() {
    if (reqFrame) {
        cancelAnimationFrame(reqFrame);
        reqFrame = 0;
    } else {
        rotate();
    }
}
