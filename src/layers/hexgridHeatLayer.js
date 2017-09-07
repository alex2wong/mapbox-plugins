// Forked from https://github.com/kronick/HexgridHeatmap
var rbush = require('rbush');
var turf = {
    center: require('@turf/center'),
    hexGrid: require('@turf/hex-grid'),
    destination: require('@turf/destination'),
    distance: require('@turf/distance'),
};
/** 
 * Creates a hexgrid-based vector heatmap on the specified map.
 * @constructor
 * @param {Map} map - The map object that this heatmap should add itself to and track.
 * @param {string} [layername=hexgrid-heatmap] - The layer name to use for the heatmap.
 * @param {string} [addBefore] - Name of a layer to insert this heatmap underneath.
 */
function HexgridHeatmap(map, layername, addBefore) {
    if(layername === undefined) layername = "hexgrid-heatmap";
    this.map = map;
    this.layername = layername;
    this._setupLayers(layername, addBefore);
    this._setupEvents();
    // Set up an R-tree to look for coordinates as they are stored in GeoJSON Feature objects
    this._tree = rbush(9,['["geometry"]["coordinates"][0]','["geometry"]["coordinates"][1]','["geometry"]["coordinates"][0]','["geometry"]["coordinates"][1]']);

    this._intensity = 8;
    this._spread = 0.1;
    this._minCellIntensity = 0; // Drop out cells that have less than this intensity
    this._maxPointIntensity = 20; // Don't let a single point have a greater weight than this
    this._cellDensity = 1;

    var thisthis = this;
    this._checkUpdateCompleteClosure = function(e) { thisthis._checkUpdateComplete(e); }
    this._calculatingGrid = false;
    this._recalcWhenReady = false;
}

HexgridHeatmap.prototype = {
    _setupLayers: function(layername, addBefore) {
        this.map.addSource(layername, {
            type: 'geojson',
            data: { type: "FeatureCollection", features: [] }
        });
        this.map.addLayer({
            'id': layername,
            'type': 'fill',
            'source': layername,
            'paint': {
            'fill-opacity': 1.0,
            'fill-color': {
                property: 'count',
                stops: [
                // Short rainbow blue
                [0, "rgba(0,185,243,0)"],
                [50, "rgba(0,185,243,0.24)"],
                [130, "rgba(255,223,0,0.3)"],
                [200, "rgba(255,105,0,0.3)"],
                ]
            }
            }
        });

        this.layer = this.map.getLayer(layername);
        this.source = this.map.getSource(layername);
    },
    _setupEvents: function() {
        var thisthis = this;
        this.map.on("moveend", function() {
            thisthis._updateGrid();
        });
    },


    /**
     * Set the data to visualize with this heatmap layer
     * @param {FeatureCollection} data - A GeoJSON FeatureCollection containing data to visualize with this heatmap
     * @public
     */
    setData: function(data) {
        // Re-build R-tree index
        this._tree.clear();
        this._tree.load(data.features);
    },


    /**
      * Set how widely points affect their neighbors
      * @param {number} spread - A good starting point is 0.1. Higher values will result in more blurred heatmaps, lower values will highlight individual points more strongly.
      * @public
      */
    setSpread: function(spread) {
        this._spread = spread;
    },


    /**
      * Set the intensity value for all points.
      * @param {number} intensity - Setting this too low will result in no data displayed, setting it too high will result in an oversaturated map. The default is 8 so adjust up or down from there according to the density of your data.
      * @public
      */ 
    setIntensity: function(intensity) {
        this._intensity = intensity;
    },


    /**
      * Set custom stops for the heatmap color schem
      * @param {array} stops - An array of `stops` in the format of the Mapbox GL Style Spec. Values should range from 0 to about 200, though you can control saturation by setting different values here.
      */
    setColorStops: function(stops) {
        if (this.layer)
            this.layer.setPaintProperty("fill-color", {property: "count", stops: stops});
    },


    /**
      * Set the hexgrid cell density
      * @param {number} density - Values less than 1 will result in a decreased cell density from the default, values greater than 1 will result in increaded density/higher resolution. Setting this value too high will result in slow performance.
      * @public
      */ 
    setCellDensity: function(density) {
        this._cellDensity = density;
    },


    /**
      * Manually force an update to the heatmap
      * You can call this method to manually force the heatmap to be redrawn. Use this after calling `setData()`, `setSpread()`, or `setIntensity()`
      */
    update: function() {
        this._updateGrid();
    },


    _generateGrid: function() {
      // Rebuild grid
      //var cellSize = Math.min(Math.max(1000/Math.pow(2,this.map.transform.zoom), 0.01), 0.1); // Constant screen size

      var cellSize = Math.max(500/Math.pow(2,this.map.transform.zoom) / this._cellDensity, 0.01); // Constant screen size
      
      // TODO: These extents don't work when the map is rotated
      var extents = this.map.getBounds().toArray()
      extents = [extents[0][0], extents[0][1], extents[1][0], extents[1][1]];

      var hexgrid = turf.hexGrid(extents, cellSize, 'kilometers');

      var sigma = this._spread;
      var a = 1 / (sigma * Math.sqrt(2 * Math.PI));
      var amplitude = this._intensity;

      var cellsToSave = [];
 
      var thisthis = this;
      hexgrid.features.forEach(function(cell) {
        var center = turf.center(cell);
        var strength = 0;
        var SW = turf.destination(center, sigma * 4, -135);
        var NE = turf.destination(center, sigma * 4, 45);
        var pois = thisthis._tree.search({
            minX: SW.geometry.coordinates[0],
            minY: SW.geometry.coordinates[1],
            maxX: NE.geometry.coordinates[0],
            maxY: NE.geometry.coordinates[1]
        });

        pois.forEach(function(poi) {
            // TODO: Allow weight to be influenced by a property within the POI
            var distance = turf.distance(center, poi);

            var weighted = Math.min(Math.exp(-(distance * distance / (2 * sigma * sigma))) * a * amplitude, thisthis._maxPointIntensity);
            strength += weighted;
        });

        cell.properties.count = strength;

        if(cell.properties.count > thisthis._minCellIntensity) {
            cellsToSave.push(cell);
        }
      });

      hexgrid.features = cellsToSave;
      return hexgrid;

    },
    _updateGrid: function() {
        if(!this._calculatingGrid) {
            this._calculatingGrid = true;
            var hexgrid = this._generateGrid();
            if(hexgrid != null) {
                var thisthis = this;
                this.source.on("data", this._checkUpdateCompleteClosure);
                this.source.setData(hexgrid);
            }
            else {
              this._calculatingGrid = false;
            }
       }
       else {
        this._recalcWhenReady = true;
       }
    },
    _checkUpdateComplete: function(e) {
      if(e.dataType == "source") {
        this.source.off("data", this._checkUpdateCompleteClosure);  
        this._calculatingGrid = false;
        if(this._recalcWhenReady) this._updateGrid();
      }
    }
};

module.exports = exports = HexgridHeatmap;
