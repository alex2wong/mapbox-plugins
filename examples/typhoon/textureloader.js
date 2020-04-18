var loader = new THREE.TextureLoader();
var rotating = true;
var extrusionRatio = 0.15;
var imgWidth = 100;
var imgHeight = 100;
// judge support webp or not.
var imgURL = Mapbox.Util.compressedImageURL('./typhoon3.png');

var scene;

function TerrainLoader(opt) {
    this.scene = opt.scene;
    this.camera = opt.camera;
    this.renderer = opt.renderer;

    this.initTerrainLayer = initTerrainLayer;
    this.loadTerrainLayer = loadTerrainLayer;
    this.addTexture = addTexture;
    this.renderLayer = updateTerrainLayer;
}

// instantiate a loader
function initTerrainLayer() {
    this.scene.add(ambientlight);
    scene = this.scene;
}

function calcOffset(rotationY) {
    var offsetX, offsetY = 0;
    // Math.sin(rotationY

    return {
        x: offsetX, 
        y: offsetY
    };
}

var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame; 
window.requestAnimationFrame = requestAnimationFrame;

var rotate1 = function(t) {
    bufferPlaneMesh.rotation.z += 0.0001 * Math.PI*2;
    requestAnimationFrame(rotate1);
    console.log('rendering rotating....');
}

// create BufferPlaneGeometry
var bufferPlaneMesh = null;

//// Main() fetch image's width and height.
function loadTerrainLayer() {
    var image = new Image();
    image.onload = (evt) => {
        imgWidth = evt.target.width;
        imgHeight = evt.target.height;
        // !!important, align vertice and imgPix count by - 1.
        bufferPlane = bufferPlaneGeom(imgWidth - 1, imgHeight - 1, imgWidth - 1, imgHeight - 1);
        loadHeight();
    }
    image.src = imgURL;
}

var ambientlight = new THREE.AmbientLight(0xffffff);

function updateTerrainLayer() {
    trackControl.update();
    this.renderer.render(this.scene, this.camera);
}

// add material for bufferPlane.. called by THREE textureLoader.
function addTexture(texture) {
    texture.mapping = THREE.CubeReflectionMapping;
    console.log('texture loaded. mapping type is : '+ texture.mapping);
    var opacityCtl = document.querySelector('#opacity');
    var imgMaterial = new THREE.MeshLambertMaterial({
        map: texture,
        side: THREE.DoubleSide,
        opacity: opacityCtl ? opacityCtl.value/100 : 1,
    });

    wireMaterial = new THREE.MeshLambertMaterial({
        color: 0x88eeff,
        wireframe: true
    });
    
    // console.log('bufferPlane has faces number: ' + customMesh.faces.length);
    bufferPlaneMesh = new THREE.Mesh(bufferPlane, imgMaterial);
    bufferPlaneMesh.position.set(-288, 0, 55);
    bufferPlaneMesh.rotation.x -= Math.PI / 2
    bufferPlaneMesh.receiveShadow = true;
    scene.add(bufferPlaneMesh);
    var statusBar = document.querySelector("#reset");
    if (statusBar) {
        statusBar.innerHTML = "receive data completed.";
    }
    // rotate1();
}

function toggleTerrain() {
    bufferPlaneMesh.visible = !bufferPlaneMesh.visible;
}

function changeOpacity(target) {
    console.log('material opacity change..');
    bufferPlaneMesh.material.opacity = target.value/100;
}

function bufferPlaneGeom(width, height, xseg, yseg) {
    var geometry = new THREE.PlaneBufferGeometry( width, height, xseg, yseg);
    return geometry;
}

// set z-depth value for vertices in geometry
function attachHeight(geometry, data) {
    // return position flatArray [x,y,z,x1,y1,z1...] in geometry
    var flatArray = geometry.attributes.position.array;
    var verticesCount = flatArray.length / 3.0;
    console.warn('bufferGeom Vertices Array length: '+ verticesCount);
    // Actually you would find triangle verticeCount is more than imgWidth*imgHeight by (imgWidth + imgHeight + 1). Align required.
    for ( var i = 0, j = 0; i < verticesCount; i ++, j += 3 ) {
        if (data[i] === undefined) {
            console.warn(`data[${i}] is  undefined..`);
            break;
        } else {
            // set each vertice z-depth value with height
            flatArray[ j-1 ] = data[i] * extrusionRatio;
        }
    }
    console.warn('height attach finished... height[i]:' + data[i - 200]);
    return geometry;
}

function loadHeight() {
    /*var fileContain = document.getElementById('heightFile');*/
    var canvas = document.getElementById('height');
    // Malloc memory for Array length with 1024*1024, storing uint8(0~255)
    var data = new Uint8Array(imgWidth * imgHeight);
    canvas.width = imgWidth;
    canvas.height = imgHeight;

    context = canvas.getContext('2d');
    context.fillStyle = 'rgba(0,0,0,.1)';
    context.fillRect( 0, 0, imgWidth, imgHeight);

    var img = new Image();
    img.onload = function() {
        context.drawImage(img, 0, 0);

        // get FlatArray of band value [r,g,b,r1,g1,b1...] for JPG, [r,g,b,a,r1,g1,b1,a1...] for PNG.
        image = context.getImageData( 0, 0, imgWidth, imgHeight );
        imageData = image.data;
        console.warn(`image data length: ${imageData.length}, extract band r`);
        // get the red band value from height source image.
        for (var i = 0, j = 0; i < imageData.length; j++, i+=4) {
            data[j] = imageData[i];
            //// why reset canvas image data.
            imageData[i] = data[j];
        }
        // context.clearRect( 0, 0, imgWidth, imgHeight);
        // context.putImageData(image, 0, 0);
        // attach height to bufferPlane geometry.
        attachHeight(bufferPlane, data);
        loadTexture();
    }
    img.src = imgURL;
    return data;
}

// load a resource
function loadTexture() {
    loader.load(
        // resource URL
        imgURL,
        // Function when resource is loaded
        this.addTexture,
        // Function called when download progresses
        function ( xhr ) {
            console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
        },
        // Function called when download errors
        function ( xhr ) {
            console.log( 'An error happened' );
        }
    );
}