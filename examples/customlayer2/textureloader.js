var loader = new THREE.TextureLoader();
var rotating = true;
var extrusionRatio = 0.15;
var imgWidth = 100;
var imgHeight = 100;
// var imgURL = './map_natural2.jpg';
var imgURL = './Westeros2_natural.jpg';
var scene;

function TerrainLoader(opt) {
    this.scene = opt.scene;
    this.camera = opt.camera;
    this.renderer = opt.renderer;

    this.initTerrainLayer = initTerrainLayer;
    this.loadTerrainLayer = loadTerrainLayer;
    this.addTexture = addTexture;
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
    if(object1) {
        // object1.rotation.y += 0.0002 * Math.PI*2;
    }
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(rotate1);
}

// create BufferPlaneGeometry
var bufferPlaneMesh = null;

//// Main() fetch image's width and height.
function loadTerrainLayer() {
    var image = new Image();
    image.onload = (evt) => {
        imgWidth = evt.target.width;
        imgHeight = evt.target.height;
        bufferPlane = bufferPlaneGeom(imgWidth - 1, imgHeight - 1, imgWidth - 1, imgHeight - 1);
        loadHeight();
    }
    image.src = imgURL;
}

var ambientlight = new THREE.AmbientLight(0xffffff);

function updateTerrainLayer() {
    // trackControl.update();
    // this.renderer.render(this.scene, this.camera);
    // requestAnimationFrame(draw);
}

// add material for bufferPlane.. called by THREE textureLoader.
function addTexture(texture) {
    texture.mapping = THREE.CubeReflectionMapping;
    console.log('texture loaded. mapping type is : '+ texture.mapping);
    var imgMaterial = new THREE.MeshLambertMaterial({
        map: texture,
        side: THREE.DoubleSide
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
    // requestAnimationFrame(rotate1);
}

function toggleTerrain() {
    bufferPlaneMesh.visible = !bufferPlaneMesh.visible;
}

function customObj3d() {
    var mesh = new THREE.Object3D();

    mesh.add( new THREE.LineSegments(

        new THREE.Geometry(),

        new THREE.LineBasicMaterial( {
            color: 0xffffff,
            transparent: true,
            opacity: 0.5
        } )

    ) );

    mesh.add( new THREE.Mesh(

        new THREE.Geometry(),

        new THREE.MeshPhongMaterial( {
            color: 0x156289,
            emissive: 0x072534,
            side: THREE.DoubleSide,
            shading: THREE.FlatShading
        } )

    ) );
    return mesh;
}
function bufferPlaneGeom(width, height, xseg, yseg) {
    var geometry = new THREE.PlaneBufferGeometry( width, height, xseg, yseg);
    // var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide, wireframe: true} );
    // var plane = new THREE.Mesh( geometry, material );
    // plane.position.set(0, 0, -10);

    return geometry;
}

// set z-depth value for vertices in geometry
function attachHeight(geometry, data) {
    // return position flatArray [x,y,z,x1,y1,z1...] in geometry
    var flatArray = geometry.attributes.position.array;
    var verticesCount = flatArray.length / 3.0;
    console.warn('bufferGeom Vertices Array length: '+ verticesCount);
    // Actually you would find triangle verticeCount is more than imgWidth*imgHeight by (imgWidth + imgHeight + 1)
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

function generateHeight( width, height ) {

    var size = width * height, data = new Uint8Array( size ),
    perlin = new ImprovedNoise(), quality = 1, z = Math.random();

    for ( var j = 0; j < 4; j ++ ) {

        for ( var i = 0; i < size; i ++ ) {

            var x = i % width, y = ~~ ( i / width );
            data[ i ] += Math.abs( perlin.noise( x / quality, y / quality, z ) * quality * 1.75 );

        }

        quality *= 5;

    }
    console.log('return generateHeight data');
    return data;
}

// xlen means width of this geometry, interval means segment..
function customGeom(xlen, ylen, segment) {
    var startX = 0;
    var endX = startX + xlen;
    var startY = 0;
    var endY = startY + ylen;
    var inter = parseInt(xlen/segment);
    var geometry = new THREE.Geometry();
    for (let i = 0; i < xlen; i++) {        
        for (let k = 0; k < ylen; k++) {
            geometry.vertices.push(new THREE.Vector3(startX, startY + k * inter, Math.random()*0.5));
        }
        startX += inter;
    }

    var vertices = geometry.vertices;
    console.log('custom geometry, vertices number:' + vertices.length);
    for (let j = 0; j < vertices.length-segment-1; j++) {
        if ((j+1) % segment == 0 ) {
            continue;
        }
        geometry.faces.push(new THREE.Face3(j, j+segment, j+segment+1));
        geometry.faces.push(new THREE.Face3(j+segment+1, j+1, j));
    }
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
    context.fillStyle = '#000';
    context.fillRect( 0, 0, imgWidth, imgHeight);

    var img = new Image();
    img.onload = function() {
        context.drawImage(img, 0, 0);

        // get FlatArray of band value [r,g,b,r1,g1,b1...] for JPG, [r,g,b,a,r1,g1,b1,a1...] for PNG.
        image = context.getImageData( 0, 0, imgWidth, imgHeight );
        imageData = image.data;
        console.warn(`image data length: ${imageData.length}, extract band g`);
        // get the Second band value from height source image.
        for (var i = 0, j = 0, l = imageData.length; i < l; j++, i+=4) {
            // var hue = (imageData[i] + imageData[i + 1] + imageData[i + 2]) / 3;
            data[j] = imageData[i];
            // // //// green * 1.2 - blue * .6 - hue * .2
            // data[j] = imageData[i + 1] * 1.2 - imageData[i + 2] * .6 - hue * .4; // + 1 to get second band as height value.
            // extract imageData as single band.
            imageData[i] = data[j];
            imageData[i + 1] = 0;
            imageData[i + 2] = 0;
        }
        context.clearRect( 0, 0, imgWidth, imgHeight);
        context.putImageData(image, 0, 0);
        // attach height to bufferPlane geometry.
        attachHeight(bufferPlane, data);
        loadTexture();
    }
    // img.src = imgURL;
    img.src = './height3.png';
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