// mapboxgl.accessToken = false;
var map = window.map = new mapboxgl.Map({
    container: 'map',
    // style: Mapbox.Config.lightStyle,
    // style: 'mapbox://styles/mapbox/light-v10',
    // center: [148.9819, -35.3981],
    style: 'mapbox://styles/huangyixiu/cjuo5ww3v1n711eqgmniofos5',
    center: [19.638807, 0.762392],
    zoom: 2.1,
    pitch: 10,
    hash: true
});
map.addControl(new mapboxgl.NavigationControl);
map.addControl(new mapboxgl.FullscreenControl);

// parameters to ensure the THREE plane is georeferenced correctly on the map
var modelOrigin = [19.638807, 0.762392];
var modelAltitude = 0;
var modelRotate = [Math.PI / 2, 0, 0];
var modelScale = 5.31843220338983e-5;

// transformation parameters to position, rotate and scale the 3D model onto the map
var modelTransform = {
    translateX: mapboxgl.MercatorCoordinate.fromLngLat(modelOrigin, modelAltitude).x,
    translateY: mapboxgl.MercatorCoordinate.fromLngLat(modelOrigin, modelAltitude).y,
    translateZ: mapboxgl.MercatorCoordinate.fromLngLat(modelOrigin, modelAltitude).z,
    rotateX: modelRotate[0],
    rotateY: modelRotate[1],
    rotateZ: modelRotate[2],
    scale: modelScale
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

        // // create two three.js lights to illuminate the model
        // var directionalLight = new THREE.DirectionalLight(0xffffff);
        // directionalLight.position.set(0, -70, 100).normalize();
        // this.scene.add(directionalLight);

        // var ambientlight = new THREE.AmbientLight(0xffffff);
        // this.scene.add(ambientlight);

        var light = new THREE.SpotLight(0xffffffFFF, 1.0);
        light.position.set(0, 50, 20);
        light.angle = Math.PI/6;
        light.decay = 2;
        light.distance = 400;
        light.penumbra = 0;
        // light.target = targetObj;

        light.castShadow = true;
        light.shadow.camera.near = 1;
        light.shadow.camera.far = 200;

        light.shadow.mapSize.width = 512;
        light.shadow.mapSize.height = 512;
        // this.scene.add(light);

        // var directionalLight2 = new THREE.DirectionalLight(0xffffff);
        // directionalLight2.position.set(0, 70, 100).normalize(); // height 170, zdepth 100.
        // this.scene.add(directionalLight2);

        // use the three.js GLTF loader to add the 3D model to the three.js scene
        // var loader = new THREE.GLTFLoader();
        // loader.load('https://docs.mapbox.com/mapbox-gl-js/assets/34M_17/34M_17.gltf', (function (gltf) {
        //     this.scene.add(gltf.scene);
        // }).bind(this));
        function createSphere(radius, seg, color, isWireframe=true) {
            return new THREE.Mesh(
                new THREE.SphereGeometry(radius, seg),
                new THREE.MeshLambertMaterial({ color: color, wireframe: isWireframe })
            )
        }
        function createRect(xlen, ylen, zdepth, color) {
            var cube = new THREE.Mesh(
                new THREE.CubeGeometry(xlen, ylen, zdepth),
                new THREE.MeshLambertMaterial({color: color})
            )
            cube.castShadow = true;
            return cube;
        }

        function createPlane(xlen, ylen, color) {
            return new THREE.Mesh(
                new THREE.PlaneGeometry(xlen, ylen),
                new THREE.MeshLambertMaterial({color: color})
            );
        }
        // x, y, z
        const plane = createRect(.5, .5, .5, '#0000ff');
        plane.position.set(0, .25, 0); // set Y to make sure 3d obj is above ground.~ 
        // this.scene.add(plane);
        // // this.scene.add(createSphere(1, 10, 'rgba(0,255,0,.3)'));
        
        // const plane2 = createPlane(1, 1, '#00cc00');
        // plane2.position.set(0, 0, 0);  // height/depth
        // plane2.rotation.x -= Math.PI / 2;
        // plane2.receiveShadow = true;
        // this.scene.add(plane2);
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
