const center = [-87.61694, 41.86625];
mapboxgl.accessToken = false;
var map = new mapboxgl.Map({
    container: 'map',
    style: Mapbox.Config.emptyStyle,
    center: center,
    zoom: 10,
    pitch: 40,
    bearing: 20
});

var voxelGjson = { features: [], type: 'FeatureCollection' };
var colorData;
map.on('load', function() {
    loadImagery()
    .then(function(){
        var canv = document.querySelector('#canvas');
        var ctx = canv.getContext('2d');
        // get colorInfo from imagery
        colorData = ctx.getImageData(0, 0, canv.width, canv.width).data;
        console.warn(`render imagery data done.. loading height data.`);
        loadHeight(addTerrainLayer);
    });
});

function addTerrainLayer() {
    map.addSource('voxelSource', {
        'type': 'geojson',
        'data': voxelGjson,
    });
    map.addLayer({
        'id': 'room-extrusion',
        'type': 'fill-extrusion',
        'source': 'voxelSource',
        'paint': {
            // See the Mapbox Style Specification for details on data expressions.
            // https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions

            // Get the fill-extrusion-color from the source 'color' property.
            'fill-extrusion-color': ['get', 'color'],

            // Get fill-extrusion-height from the source 'height' property.
            'fill-extrusion-height': ['get', 'height'],

            // // Get fill-extrusion-base from the source 'base_height' property.
            'fill-extrusion-base': ['get', 'base_height'],

            // Make extrusions slightly opaque for see through indoor walls.
            'fill-extrusion-opacity': 0.7
        }
    });
}

const terrainStep = 20;
const voxelWidth = 0.0005; // real geom distance each voxel width represent.
const startLng = center[0];
const startLat = center[1];
function loadHeight(cb, lodRate) {
    var img = new Image();
    img.onload = function(blob) {
        var canv = document.querySelector('#canvas');
        canv.height = img.height;
        canv.width = img.width;
        var ctx = canv.getContext('2d');
        ctx.drawImage(img, 0, 0);
        // genVoxelSource Gjson, add source and layer..
        genVoxelSource(canv, cb);
    }
    img.src = './height2.png';
}

function loadImagery() {
    return new Promise(function(resolve, reject){
        var img = new Image();
        img.onload = function(blob) {
            var canv = document.querySelector('#canvas');
            canv.height = img.height;
            canv.width = img.width;
            var ctx = canv.getContext('2d');
            ctx.drawImage(img, 0, 0);
            resolve();
        }
        img.src = './sattelite.jpg';
    });
}

function genVoxelSource(canv, cb) {
    var ctx = canv.getContext('2d');
    var imageData = ctx.getImageData(0, 0, canv.width, canv.width).data;
    
    console.log('image data length: '+ imageData.length);
    // get the band1 value from height source image.
    for (var i = 0, j = 0, rowNum = 0, colNum = 0; i < imageData.length; j++, i+=4) {
        // i denotes the voxel* bandIndex, j is the voxel index it self.
        // // limit voxel number for performance !
        if (j > 100000) break;
        if (j % Math.round(canv.width) == 0) {
            // console.warn(`current j ${j} represent how many voxel we've traversed, row ${rowNum}, col ${colNum}`);
            rowNum += 1;
            colNum = 0;
        } else {
            colNum += 1;
        }
        // generate voxel feature with height prop.
        voxelGjson.features.push(genVoxelFeature(startLng + colNum*2*voxelWidth, startLat - rowNum*2*voxelWidth, imageData[i], i));
    }
    console.warn(`generate terrain from height image completed..`);
    document.querySelector('#status').innerHTML = 'Data loaded, start rendering '
            + canv.height * canv.width + ' voxels';
    if (cb && typeof cb == 'function') {
        cb.apply(this);
    }
    // debugger;
    // // attach height to a imagery alpha band ?!
    // attachHeight(bufferPlane, data);
}

// color can comes from imagery.

function genVoxelFeature(centerX, centerY, height, UintArrIndex) {
    var voxelColor = `rgb(${colorData[UintArrIndex]},${colorData[UintArrIndex+1]},${colorData[UintArrIndex+2]})`;
    // if (height <= 10) {
    //     voxelColor = 'rgb(60, 100, 180)'; // blue water
    // } else if (height < 60) {
    //     voxelColor = 'rgb(60, 160, 80)'; // green grass
    // } else if (height < 120) {
    //     voxelColor = 'rgb(60, 200, 80)'; // green grass
    // } else if (height < 160) {
    //     voxelColor = 'rgb(170, 160, 80)'; // land
    // } else {
    //     voxelColor = 'rgb(220, 240, 240)'; // mountain
    // }
    return {"type": "Feature",
      "properties": {
        "level": 1,
        "name": "voxel",
        "height": height*10,
        "base_height": 0,
        color: voxelColor
        // "color": `rgb(1, ${height}, ${height})`
      },
      "geometry": {
        "coordinates": [
          [
            [
              centerX-voxelWidth,
              centerY+voxelWidth
            ],
            [
              centerX+voxelWidth,
              centerY+voxelWidth
            ],
            [
              centerX+voxelWidth,
              centerY-voxelWidth
            ],
            [
              centerX-voxelWidth,
              centerY-voxelWidth
            ],
            [
              centerX-voxelWidth,
              centerY+voxelWidth
            ]
          ]
        ],
        "type": "Polygon"
      },
      id: `${centerX}${centerY}${height}`
    };
}

const canv = document.querySelector('#canvas');
const rect = canv.getClientRects();
var curTool = 'height';
canv.addEventListener('click', clickHander);
function clickHander(evt) {
    // var whyRect = evt.getClientRects();
    editHeight(evt.clientX, evt.clientY, true);
}

// edit canvas image data by canvas x,y.
function editHeight(x, y, raise=true) {
    const canv = document.querySelector('#canvas');
    const ctx = canv.getContext('2d');
    // consider using kernel area..
    const imageData = ctx.getImageData(x, y, 1, 1);
    console.warn(`evt.clientX ? ${x}, ${y}, original imageData ${imageData.data.join(',')}`);
    if (raise && imageData.data[0] + terrainStep <= 255) {
        imageData.data[0] += terrainStep;
    } else if (!raise && imageData.data[1] - terrainStep >=0) {
        imageData.data[0] -= terrainStep;
    } else {
        return;
    }
    console.warn(`changed canvas data..${imageData.data.join(',')}`);
    ctx.putImageData(imageData, x, y);
    // // update source.. performance consume, so combine request, make it lazy.
    // genVoxelSource(canv, function() {
    //     map.getSource('voxelSource').setData(voxelGjson);
    // });
}

/**
 * actually we need a polynomial function.. 
 * @param {*} centerX 
 * @param {*} centerY 
 * @param {*} radius 
 * @param {*} slope 
 */
function kernelImageData(centerX, centerY, radius, slope) {
    return null;
}
