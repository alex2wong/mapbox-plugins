(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Alex"] = factory();
	else
		root["Alex"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.HexgridHeatmap = exports.DomOverlayer = exports.CanvasOverlayer = exports.myTween = exports.Controllers = exports.Util = exports.Chart = exports.Canvas = exports.Drone = undefined;

	var _drone = __webpack_require__(2);

	var _drone2 = _interopRequireDefault(_drone);

	var _canvas = __webpack_require__(7);

	var _canvas2 = _interopRequireDefault(_canvas);

	var _chartmodel = __webpack_require__(8);

	var _chartmodel2 = _interopRequireDefault(_chartmodel);

	var _util = __webpack_require__(5);

	var _util2 = _interopRequireDefault(_util);

	var _controller = __webpack_require__(9);

	var _controller2 = _interopRequireDefault(_controller);

	var _Tween = __webpack_require__(30);

	var _canvasOverlay = __webpack_require__(31);

	var _domOverlay = __webpack_require__(33);

	var _hexgridHeatLayer = __webpack_require__(34);

	var _hexgridHeatLayer2 = _interopRequireDefault(_hexgridHeatLayer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Static Props..
	exports.Drone = _drone2.default;
	exports.Canvas = _canvas2.default;
	exports.Chart = _chartmodel2.default;
	exports.Util = _util2.default;
	exports.Controllers = _controller2.default;
	exports.myTween = _Tween.myTween;
	exports.CanvasOverlayer = _canvasOverlay.CanvasOverlayer;
	exports.DomOverlayer = _domOverlay.DomOverlayer;
	exports.HexgridHeatmap = _hexgridHeatLayer2.default; // this is Root Module for Whole app, require lib we need.

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _const = __webpack_require__(3);

	var _const2 = _interopRequireDefault(_const);

	var _bullet = __webpack_require__(4);

	var _bullet2 = _interopRequireDefault(_bullet);

	var _util = __webpack_require__(5);

	var _sprite = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// // Drone model script
	// const firingTime = 1200, MAXSPEED = 3.900;

	/**
	 * Drone class with control method.
	 */
	var Drone = function (_Sprite) {
	    _inherits(Drone, _Sprite);

	    function Drone(opts) {
	        _classCallCheck(this, Drone);

	        var _this = _possibleConstructorReturn(this, (Drone.__proto__ || Object.getPrototypeOf(Drone)).call(this, opts));

	        _this.life = _const2.default.DroneParam.LIFE;
	        _this.bullets = [];
	        _this.firing = false;
	        _this.bulletNum = 2;
	        _this.icon = _const2.default.Images.Plane;
	        return _this;
	    }

	    /**
	     * maintask start interval to update its status.
	     */


	    _createClass(Drone, [{
	        key: 'updateStatus',
	        value: function updateStatus() {
	            this.loction.coordinates[0] += Math.sin(this.direction) * this.speed;
	            this.loction.coordinates[1] += Math.cos(this.direction) * this.speed;
	            // updateStatusView. toDO in maintask.js
	        }
	    }, {
	        key: 'accelerate',
	        value: function accelerate() {
	            if (this.speed < _const2.default.DroneParam.MAXSPEED) {
	                this.speed += 1;
	                // this.updateStatus();
	            }
	        }
	    }, {
	        key: 'fire',
	        value: function fire() {

	            if (this.bullets instanceof Array && this.bullets.length > 0 && !this.firing) {
	                var that = this;
	                setTimeout(function () {
	                    that.firing = false;
	                    // clearInterval(that.interval);
	                }, _const2.default.DroneParam.FIRINGTIME);
	                this.firing = true;
	            } else if (!this.firing) {
	                for (var i = 0; i < this.bulletNum; i++) {
	                    this.bullets.push(new _bullet2.default(this));
	                }
	                // create Closure to handle the firing status change..
	                var _that = this;
	                setTimeout(function () {
	                    _that.firing = false;
	                    // clearInterval(that.interval);
	                }, _const2.default.DroneParam.FIRINGTIME);
	                this.firing = true;
	            } else {
	                // this firing.. do nothing.
	            }
	        }
	    }]);

	    return Drone;
	}(_sprite.Sprite);

	exports.default = Drone;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Const = function Const() {
	    _classCallCheck(this, Const);
	};

	// Static Props.


	exports.default = Const;
	Const.DroneParam = {
	    MAXSPEED: 5,
	    FIRINGTIME: 800,
	    LIFE: 10,
	    // Firing range.. 0.2 rad in LngLat
	    RANGE: 0.2
	};

	Const.Images = {
	    Plane: '../assets/plane'
	};

	Const.SpritesUrl = "https://alex2wong.github.io/mapbox-plugins/assets/sprite";

	Const.Sprites = { "airfield-15": { "width": 21, "height": 21, "x": 0, "y": 0, "pixelRatio": 1 }, "airport-15": { "width": 21, "height": 21, "x": 21, "y": 0, "pixelRatio": 1 }, "alcohol-shop-15": { "width": 21, "height": 21, "x": 0, "y": 21, "pixelRatio": 1 }, "amusement-park-15": { "width": 21, "height": 21, "x": 21, "y": 21, "pixelRatio": 1 }, "aquarium-15": { "width": 21, "height": 21, "x": 42, "y": 0, "pixelRatio": 1 }, "art-gallery-15": { "width": 21, "height": 21, "x": 63, "y": 0, "pixelRatio": 1 }, "attraction-15": { "width": 21, "height": 21, "x": 42, "y": 21, "pixelRatio": 1 }, "bakery-15": { "width": 21, "height": 21, "x": 63, "y": 21, "pixelRatio": 1 }, "bank-15": { "width": 21, "height": 21, "x": 0, "y": 42, "pixelRatio": 1 }, "bar-15": { "width": 21, "height": 21, "x": 21, "y": 42, "pixelRatio": 1 }, "beer-15": { "width": 21, "height": 21, "x": 42, "y": 42, "pixelRatio": 1 }, "bicycle-15": { "width": 21, "height": 21, "x": 63, "y": 42, "pixelRatio": 1 }, "bicycle-share-15": { "width": 21, "height": 21, "x": 0, "y": 63, "pixelRatio": 1 }, "bus-15": { "width": 21, "height": 21, "x": 21, "y": 63, "pixelRatio": 1 }, "cafe-15": { "width": 21, "height": 21, "x": 42, "y": 63, "pixelRatio": 1 }, "campsite-15": { "width": 21, "height": 21, "x": 63, "y": 63, "pixelRatio": 1 }, "car-15": { "width": 21, "height": 21, "x": 84, "y": 0, "pixelRatio": 1 }, "castle-15": { "width": 21, "height": 21, "x": 105, "y": 0, "pixelRatio": 1 }, "cemetery-15": { "width": 21, "height": 21, "x": 126, "y": 0, "pixelRatio": 1 }, "cinema-15": { "width": 21, "height": 21, "x": 147, "y": 0, "pixelRatio": 1 }, "circle-15": { "width": 21, "height": 21, "x": 84, "y": 21, "pixelRatio": 1 }, "circle-stroked-15": { "width": 21, "height": 21, "x": 105, "y": 21, "pixelRatio": 1 }, "clothing-store-15": { "width": 21, "height": 21, "x": 126, "y": 21, "pixelRatio": 1 }, "college-15": { "width": 21, "height": 21, "x": 147, "y": 21, "pixelRatio": 1 }, "dentist-15": { "width": 21, "height": 21, "x": 84, "y": 42, "pixelRatio": 1 }, "doctor-15": { "width": 21, "height": 21, "x": 105, "y": 42, "pixelRatio": 1 }, "dog-park-15": { "width": 21, "height": 21, "x": 126, "y": 42, "pixelRatio": 1 }, "drinking-water-15": { "width": 21, "height": 21, "x": 147, "y": 42, "pixelRatio": 1 }, "embassy-15": { "width": 21, "height": 21, "x": 84, "y": 63, "pixelRatio": 1 }, "entrance-15": { "width": 21, "height": 21, "x": 105, "y": 63, "pixelRatio": 1 }, "fast-food-15": { "width": 21, "height": 21, "x": 126, "y": 63, "pixelRatio": 1 }, "ferry-15": { "width": 21, "height": 21, "x": 147, "y": 63, "pixelRatio": 1 }, "fire-station-15": { "width": 21, "height": 21, "x": 0, "y": 84, "pixelRatio": 1 }, "fuel-15": { "width": 21, "height": 21, "x": 21, "y": 84, "pixelRatio": 1 }, "garden-15": { "width": 21, "height": 21, "x": 42, "y": 84, "pixelRatio": 1 }, "golf-15": { "width": 21, "height": 21, "x": 63, "y": 84, "pixelRatio": 1 }, "grocery-15": { "width": 21, "height": 21, "x": 84, "y": 84, "pixelRatio": 1 }, "harbor-15": { "width": 21, "height": 21, "x": 105, "y": 84, "pixelRatio": 1 }, "heliport-15": { "width": 21, "height": 21, "x": 126, "y": 84, "pixelRatio": 1 }, "hospital-15": { "width": 21, "height": 21, "x": 147, "y": 84, "pixelRatio": 1 }, "ice-cream-15": { "width": 21, "height": 21, "x": 0, "y": 105, "pixelRatio": 1 }, "information-15": { "width": 21, "height": 21, "x": 21, "y": 105, "pixelRatio": 1 }, "laundry-15": { "width": 21, "height": 21, "x": 42, "y": 105, "pixelRatio": 1 }, "library-15": { "width": 21, "height": 21, "x": 63, "y": 105, "pixelRatio": 1 }, "lodging-15": { "width": 21, "height": 21, "x": 84, "y": 105, "pixelRatio": 1 }, "marker-15": { "width": 21, "height": 21, "x": 105, "y": 105, "pixelRatio": 1 }, "monument-15": { "width": 21, "height": 21, "x": 126, "y": 105, "pixelRatio": 1 }, "mountain-15": { "width": 21, "height": 21, "x": 147, "y": 105, "pixelRatio": 1 }, "museum-15": { "width": 21, "height": 21, "x": 0, "y": 126, "pixelRatio": 1 }, "music-15": { "width": 21, "height": 21, "x": 21, "y": 126, "pixelRatio": 1 }, "park-15": { "width": 21, "height": 21, "x": 42, "y": 126, "pixelRatio": 1 }, "pharmacy-15": { "width": 21, "height": 21, "x": 63, "y": 126, "pixelRatio": 1 }, "picnic-site-15": { "width": 21, "height": 21, "x": 84, "y": 126, "pixelRatio": 1 }, "place-of-worship-15": { "width": 21, "height": 21, "x": 105, "y": 126, "pixelRatio": 1 }, "playground-15": { "width": 21, "height": 21, "x": 126, "y": 126, "pixelRatio": 1 }, "police-15": { "width": 21, "height": 21, "x": 147, "y": 126, "pixelRatio": 1 }, "post-15": { "width": 21, "height": 21, "x": 0, "y": 147, "pixelRatio": 1 }, "prison-15": { "width": 21, "height": 21, "x": 21, "y": 147, "pixelRatio": 1 }, "rail-15": { "width": 21, "height": 21, "x": 42, "y": 147, "pixelRatio": 1 }, "rail-light-15": { "width": 21, "height": 21, "x": 63, "y": 147, "pixelRatio": 1 }, "rail-metro-15": { "width": 21, "height": 21, "x": 84, "y": 147, "pixelRatio": 1 }, "religious-christian-15": { "width": 21, "height": 21, "x": 105, "y": 147, "pixelRatio": 1 }, "religious-jewish-15": { "width": 21, "height": 21, "x": 126, "y": 147, "pixelRatio": 1 }, "religious-muslim-15": { "width": 21, "height": 21, "x": 147, "y": 147, "pixelRatio": 1 }, "restaurant-15": { "width": 21, "height": 21, "x": 168, "y": 0, "pixelRatio": 1 }, "rocket-15": { "width": 21, "height": 21, "x": 189, "y": 0, "pixelRatio": 1 }, "school-15": { "width": 21, "height": 21, "x": 210, "y": 0, "pixelRatio": 1 }, "shop-15": { "width": 21, "height": 21, "x": 231, "y": 0, "pixelRatio": 1 }, "stadium-15": { "width": 21, "height": 21, "x": 252, "y": 0, "pixelRatio": 1 }, "star-15": { "width": 21, "height": 21, "x": 273, "y": 0, "pixelRatio": 1 }, "suitcase-15": { "width": 21, "height": 21, "x": 294, "y": 0, "pixelRatio": 1 }, "swimming-15": { "width": 21, "height": 21, "x": 315, "y": 0, "pixelRatio": 1 }, "theatre-15": { "width": 21, "height": 21, "x": 168, "y": 21, "pixelRatio": 1 }, "toilet-15": { "width": 21, "height": 21, "x": 189, "y": 21, "pixelRatio": 1 }, "town-hall-15": { "width": 21, "height": 21, "x": 210, "y": 21, "pixelRatio": 1 }, "triangle-15": { "width": 21, "height": 21, "x": 231, "y": 21, "pixelRatio": 1 }, "triangle-stroked-15": { "width": 21, "height": 21, "x": 252, "y": 21, "pixelRatio": 1 }, "veterinary-15": { "width": 21, "height": 21, "x": 273, "y": 21, "pixelRatio": 1 }, "volcano-15": { "width": 21, "height": 21, "x": 294, "y": 21, "pixelRatio": 1 }, "zoo-15": { "width": 21, "height": 21, "x": 315, "y": 21, "pixelRatio": 1 }, "airfield-11": { "width": 17, "height": 17, "x": 168, "y": 42, "pixelRatio": 1 }, "airport-11": { "width": 17, "height": 17, "x": 185, "y": 42, "pixelRatio": 1 }, "alcohol-shop-11": { "width": 17, "height": 17, "x": 202, "y": 42, "pixelRatio": 1 }, "amusement-park-11": { "width": 17, "height": 17, "x": 219, "y": 42, "pixelRatio": 1 }, "aquarium-11": { "width": 17, "height": 17, "x": 236, "y": 42, "pixelRatio": 1 }, "art-gallery-11": { "width": 17, "height": 17, "x": 253, "y": 42, "pixelRatio": 1 }, "attraction-11": { "width": 17, "height": 17, "x": 270, "y": 42, "pixelRatio": 1 }, "bakery-11": { "width": 17, "height": 17, "x": 287, "y": 42, "pixelRatio": 1 }, "bank-11": { "width": 17, "height": 17, "x": 304, "y": 42, "pixelRatio": 1 }, "bar-11": { "width": 17, "height": 17, "x": 168, "y": 63, "pixelRatio": 1 }, "beer-11": { "width": 17, "height": 17, "x": 185, "y": 63, "pixelRatio": 1 }, "bicycle-11": { "width": 17, "height": 17, "x": 202, "y": 63, "pixelRatio": 1 }, "bicycle-share-11": { "width": 17, "height": 17, "x": 219, "y": 63, "pixelRatio": 1 }, "bus-11": { "width": 17, "height": 17, "x": 236, "y": 63, "pixelRatio": 1 }, "cafe-11": { "width": 17, "height": 17, "x": 253, "y": 63, "pixelRatio": 1 }, "campsite-11": { "width": 17, "height": 17, "x": 270, "y": 63, "pixelRatio": 1 }, "car-11": { "width": 17, "height": 17, "x": 287, "y": 63, "pixelRatio": 1 }, "castle-11": { "width": 17, "height": 17, "x": 304, "y": 63, "pixelRatio": 1 }, "cemetery-11": { "width": 17, "height": 17, "x": 168, "y": 84, "pixelRatio": 1 }, "cinema-11": { "width": 17, "height": 17, "x": 185, "y": 84, "pixelRatio": 1 }, "circle-11": { "width": 17, "height": 17, "x": 202, "y": 84, "pixelRatio": 1 }, "circle-stroked-11": { "width": 17, "height": 17, "x": 219, "y": 84, "pixelRatio": 1 }, "clothing-store-11": { "width": 17, "height": 17, "x": 236, "y": 84, "pixelRatio": 1 }, "college-11": { "width": 17, "height": 17, "x": 253, "y": 84, "pixelRatio": 1 }, "dentist-11": { "width": 17, "height": 17, "x": 270, "y": 84, "pixelRatio": 1 }, "doctor-11": { "width": 17, "height": 17, "x": 287, "y": 84, "pixelRatio": 1 }, "dog-park-11": { "width": 17, "height": 17, "x": 304, "y": 84, "pixelRatio": 1 }, "drinking-water-11": { "width": 17, "height": 17, "x": 168, "y": 105, "pixelRatio": 1 }, "embassy-11": { "width": 17, "height": 17, "x": 185, "y": 105, "pixelRatio": 1 }, "entrance-11": { "width": 17, "height": 17, "x": 202, "y": 105, "pixelRatio": 1 }, "fast-food-11": { "width": 17, "height": 17, "x": 219, "y": 105, "pixelRatio": 1 }, "ferry-11": { "width": 17, "height": 17, "x": 236, "y": 105, "pixelRatio": 1 }, "fire-station-11": { "width": 17, "height": 17, "x": 253, "y": 105, "pixelRatio": 1 }, "fuel-11": { "width": 17, "height": 17, "x": 270, "y": 105, "pixelRatio": 1 }, "garden-11": { "width": 17, "height": 17, "x": 287, "y": 105, "pixelRatio": 1 }, "golf-11": { "width": 17, "height": 17, "x": 304, "y": 105, "pixelRatio": 1 }, "grocery-11": { "width": 17, "height": 17, "x": 168, "y": 126, "pixelRatio": 1 }, "harbor-11": { "width": 17, "height": 17, "x": 185, "y": 126, "pixelRatio": 1 }, "heliport-11": { "width": 17, "height": 17, "x": 202, "y": 126, "pixelRatio": 1 }, "hospital-11": { "width": 17, "height": 17, "x": 219, "y": 126, "pixelRatio": 1 }, "ice-cream-11": { "width": 17, "height": 17, "x": 236, "y": 126, "pixelRatio": 1 }, "information-11": { "width": 17, "height": 17, "x": 253, "y": 126, "pixelRatio": 1 }, "laundry-11": { "width": 17, "height": 17, "x": 270, "y": 126, "pixelRatio": 1 }, "library-11": { "width": 17, "height": 17, "x": 287, "y": 126, "pixelRatio": 1 }, "lodging-11": { "width": 17, "height": 17, "x": 304, "y": 126, "pixelRatio": 1 }, "marker-11": { "width": 17, "height": 17, "x": 168, "y": 147, "pixelRatio": 1 }, "monument-11": { "width": 17, "height": 17, "x": 185, "y": 147, "pixelRatio": 1 }, "mountain-11": { "width": 17, "height": 17, "x": 202, "y": 147, "pixelRatio": 1 }, "museum-11": { "width": 17, "height": 17, "x": 219, "y": 147, "pixelRatio": 1 }, "music-11": { "width": 17, "height": 17, "x": 236, "y": 147, "pixelRatio": 1 }, "park-11": { "width": 17, "height": 17, "x": 253, "y": 147, "pixelRatio": 1 }, "pharmacy-11": { "width": 17, "height": 17, "x": 270, "y": 147, "pixelRatio": 1 }, "picnic-site-11": { "width": 17, "height": 17, "x": 287, "y": 147, "pixelRatio": 1 }, "place-of-worship-11": { "width": 17, "height": 17, "x": 304, "y": 147, "pixelRatio": 1 }, "playground-11": { "width": 17, "height": 17, "x": 0, "y": 168, "pixelRatio": 1 }, "police-11": { "width": 17, "height": 17, "x": 17, "y": 168, "pixelRatio": 1 }, "post-11": { "width": 17, "height": 17, "x": 34, "y": 168, "pixelRatio": 1 }, "prison-11": { "width": 17, "height": 17, "x": 51, "y": 168, "pixelRatio": 1 }, "rail-11": { "width": 17, "height": 17, "x": 68, "y": 168, "pixelRatio": 1 }, "rail-light-11": { "width": 17, "height": 17, "x": 85, "y": 168, "pixelRatio": 1 }, "rail-metro-11": { "width": 17, "height": 17, "x": 102, "y": 168, "pixelRatio": 1 }, "religious-christian-11": { "width": 17, "height": 17, "x": 119, "y": 168, "pixelRatio": 1 }, "religious-jewish-11": { "width": 17, "height": 17, "x": 136, "y": 168, "pixelRatio": 1 }, "religious-muslim-11": { "width": 17, "height": 17, "x": 153, "y": 168, "pixelRatio": 1 }, "restaurant-11": { "width": 17, "height": 17, "x": 170, "y": 168, "pixelRatio": 1 }, "rocket-11": { "width": 17, "height": 17, "x": 187, "y": 168, "pixelRatio": 1 }, "school-11": { "width": 17, "height": 17, "x": 204, "y": 168, "pixelRatio": 1 }, "shop-11": { "width": 17, "height": 17, "x": 221, "y": 168, "pixelRatio": 1 }, "stadium-11": { "width": 17, "height": 17, "x": 238, "y": 168, "pixelRatio": 1 }, "star-11": { "width": 17, "height": 17, "x": 255, "y": 168, "pixelRatio": 1 }, "suitcase-11": { "width": 17, "height": 17, "x": 272, "y": 168, "pixelRatio": 1 }, "swimming-11": { "width": 17, "height": 17, "x": 289, "y": 168, "pixelRatio": 1 }, "theatre-11": { "width": 17, "height": 17, "x": 306, "y": 168, "pixelRatio": 1 }, "toilet-11": { "width": 17, "height": 17, "x": 0, "y": 185, "pixelRatio": 1 }, "town-hall-11": { "width": 17, "height": 17, "x": 17, "y": 185, "pixelRatio": 1 }, "triangle-11": { "width": 17, "height": 17, "x": 34, "y": 185, "pixelRatio": 1 }, "triangle-stroked-11": { "width": 17, "height": 17, "x": 51, "y": 185, "pixelRatio": 1 }, "veterinary-11": { "width": 17, "height": 17, "x": 68, "y": 185, "pixelRatio": 1 }, "volcano-11": { "width": 17, "height": 17, "x": 85, "y": 185, "pixelRatio": 1 }, "zoo-11": { "width": 17, "height": 17, "x": 102, "y": 185, "pixelRatio": 1 }, "dot-11": { "width": 11, "height": 11, "x": 323, "y": 168, "pixelRatio": 1 }, "dot-10": { "width": 10, "height": 10, "x": 119, "y": 185, "pixelRatio": 1 } };

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Bullet class
	 */
	var Bullet =
	// opts should contain the Drone's direction and geometry
	function Bullet(opts) {
	    _classCallCheck(this, Bullet);

	    this.id;
	    this.direciton = opts.direction ? opts.direction : 0;
	    this.spoint = {
	        type: 'Point',
	        coordinates: [0, 0]
	    };
	    // DeepCopy the drone coords to bullet.
	    this.spoint.coordinates[0] = opts.point.coordinates[0];
	    this.spoint.coordinates[1] = opts.point.coordinates[1];
	};

	exports.default = Bullet;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _const = __webpack_require__(3);

	var _const2 = _interopRequireDefault(_const);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var util = function () {
	    function util() {
	        _classCallCheck(this, util);
	    }

	    _createClass(util, null, [{
	        key: "getJSON",


	        /**
	         * use promise to implement xmlHttpRequest process
	         * promise.then receive 2 params.(resolve func, reject func)
	         */
	        // static xhr(){
	        //     // promise will excute immediately after init.
	        //     let promise = new Promise(() => {

	        //     })
	        // }

	        /**
	         * Promise.prototype.then()
	         * receive resolve callback and reject callback.
	         * SO important, if series of Async Process is required, 
	         * Promise is better than callback hell !
	         * 
	         * xhr().then(data => { // resolve actions.. }, 
	         *          err => { // reject actions.. }
	         *      ).then()
	         * 
	         */

	        /**
	         * return promise obj.
	         */
	        value: function getJSON(url, resolve, reject) {
	            var promise = new Promise(function (resolve, reject) {
	                var xhr = new XMLHttpRequest();
	                xhr.open("GET", url);
	                xhr.onreadystatechange = handler;
	                xhr.responseType = "json";
	                xhr.setRequestHeader("Accept", "application/json");
	                xhr.send();

	                function handler() {
	                    if (this.readyState !== 4) {
	                        return;
	                    }
	                    if (this.status === 200) {
	                        // if server response success
	                        resolve(this.response);
	                    } else {
	                        reject(new Error(this.statusText));
	                    }
	                };
	            });

	            return promise;
	        }

	        /**
	         * return iconposition style by iconName
	         */

	    }, {
	        key: "setIconDiv",
	        value: function setIconDiv(dom, iconName) {
	            var icons = _const2.default.Sprites;
	            if (iconName && icons[iconName]) {
	                var iconStyle = icons[iconName],
	                    iconDiv = document.createElement("div");
	                iconDiv.style.width = iconStyle.width + "px";
	                iconDiv.style.height = iconStyle.height + "px";
	                iconDiv.style.overflow = 'hidden';
	                var iconImg = document.createElement("img");
	                iconImg.src = _const2.default.SpritesUrl + ".png";
	                iconImg.style.marginLeft = "-" + iconStyle.x + "px";
	                iconImg.style.marginTop = "-" + iconStyle.y + "px";
	                iconDiv.appendChild(iconImg);
	                dom.appendChild(iconDiv);
	            }
	        }

	        // random point objs with given number

	    }, {
	        key: "rdObjs",
	        value: function rdObjs(num, mapCenter) {
	            var objs = [],
	                index = 0;
	            if (!mapCenter) return objs;
	            for (var i = 0; i < num; i++) {
	                objs.push({
	                    name: "line" + i.toString(),
	                    lon: parseInt((Math.random() * 8 + mapCenter[0] - 4).toFixed(2)),
	                    lat: parseInt((Math.random() * 4 + mapCenter[1] - 2).toFixed(2)),
	                    color: 'rgba(10,200,' + (Math.random() * 251).toFixed(0) + ',0.7)'
	                });
	            }
	            objs.push({
	                name: "circle1",
	                lon: mapCenter[0],
	                lat: mapCenter[1],
	                radius: parseInt(Math.random() * 10),
	                color: 'rgba(251,200,20,0.6)'
	            });
	            return objs;
	        }

	        /**
	         * getJSON("somedata.json").then((data) => {
	         *      console.log("got data: " + data);
	         * })
	         * .catch((err) => {
	         *      console.error("encounter error..");
	         * })
	         */

	        /**
	         * compared with traditional imageload. what is the advantage ?
	         */

	    }, {
	        key: "loadImageAsync",
	        value: function loadImageAsync(url, resolve, reject) {
	            return new Promise(function (resolve, reject) {
	                var image = new Image();
	                image.onload = resolve;
	                image.onerror = reject;
	                image.src = path;
	            });
	        }

	        /**
	         * This decorator func.
	         */

	    }, {
	        key: "readonly",
	        value: function readonly(target, name, descriptor) {
	            descriptor.writable = false;
	            return descriptor;
	        }

	        /**
	         * target.descriptor..
	         * this decorator used for log before calling target function.
	         */

	    }, {
	        key: "log",
	        value: function log(target, name, descriptor) {
	            var oldValue = descriptor.value;

	            descriptor.value = function () {
	                console.log("Calling \"" + name + "\" with", arguments);
	                // descriptor.value refer to the target itself.. func or attri
	                return oldValue.apply(null, arguments);
	            };
	        }

	        /**
	         * @param fn {Function}
	         * @param delay {Number}
	         * @return {Function}
	         */

	    }, {
	        key: "debounce",
	        value: function debounce(fn, delay) {
	            var timer = void 0;
	            // timer is closure in mem.. returned function is the listener..
	            return function () {
	                var context = this;
	                var args = arguments;
	                // clear the previous timer to prevent the function call.
	                clearTimeout(timer);
	                timer = setTimeout(function () {
	                    fn.apply(context, args);
	                }, delay);
	            };
	        }
	    }]);

	    return util;
	}();

	exports.default = util;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.genId = genId;
	exports.randomName = randomName;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Base class of Drone or other Game-Sprite
	 */
	var Sprite = exports.Sprite = function () {
	    function Sprite(opts) {
	        _classCallCheck(this, Sprite);

	        this.id = genId();
	        this.speed = opts.speed || 1;
	        this.direction = opts.direction || 0;
	        this.name = opts.name || randomName();
	        this.loction = {
	            type: 'Point',
	            coordinates: [100, 30]
	        };
	    }

	    /**
	     * to be overwrite.
	     */


	    _createClass(Sprite, [{
	        key: "accelerate",
	        value: function accelerate() {}
	    }, {
	        key: "turnLeft",
	        value: function turnLeft() {
	            if (this) {
	                this.direction -= 0.1;
	            }
	        }
	    }, {
	        key: "turnRight",
	        value: function turnRight() {
	            this.direction += 0.1;
	        }
	    }, {
	        key: "brake",
	        value: function brake() {
	            if (this.speed > 0) {
	                this.speed -= 1;
	            }
	        }
	    }]);

	    return Sprite;
	}();

	function genId() {
	    return (Math.random() * 1000000).toString(16);
	}

	function randomName() {
	    var randomNum = Math.random() * 10000;
	    return "Player ".concat(randomNum.toFixed(0));
	}

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// Some Static Function bind with one Canvas context
	var Canvas = function () {
	    function Canvas() {
	        _classCallCheck(this, Canvas);
	    }

	    _createClass(Canvas, null, [{
	        key: "init",

	        // Bound with a canvas element.
	        value: function init(ele) {
	            Canvas.canv = ele;
	            Canvas.height = ele.height;
	            Canvas.width = ele.width;
	            // let the canvas's width/height cohere width DOM width/height. 
	            Canvas.canv.width = ele.width;
	            Canvas.canv.height = ele.height;
	            Canvas.ctx = ele.getContext("2d");
	            Canvas.ctx.strokeStyle = "rgba(0,0,0,0.9)";
	            Canvas.ctx.fillStyle = "rgba(10,200,240,0.4)";
	            Canvas.ctx.strokeWidth = 2;
	            Canvas.animate = false;
	            Canvas.img = new Image();
	        }

	        /**
	         * set ctx.strokeStyle with rgba() @string
	         */

	    }, {
	        key: "setStroke",
	        value: function setStroke(colorStr) {
	            Canvas.ctx.strokeStyle = colorStr;
	        }

	        /**
	         * set ctx.fillStyle with rgba(). @string
	         */

	    }, {
	        key: "setFill",
	        value: function setFill(colorStr) {
	            Canvas.ctx.fillStyle = colorStr;
	        }

	        /**
	         * set ctx.strokeWidth and lineWidth. @number
	         */

	    }, {
	        key: "setWidth",
	        value: function setWidth(pixel) {
	            if (Canvas.ctx) {
	                Canvas.ctx.lineWidth = pixel;
	                Canvas.ctx.strokeWidth = pixel;
	            }
	        }

	        /**
	         * draw Circle with given x, y.
	         * radius: radius of Circle @number
	         * fill @bool
	         */

	    }, {
	        key: "drawPoint",
	        value: function drawPoint(coords, radius, fill, image, rotate, text) {
	            var imgWidth = void 0,
	                imgHeight = void 0;
	            Canvas.setFill("#EEE");
	            Canvas.setStroke("#EE1");
	            if (coords instanceof Array && coords.length == 2) {
	                Canvas.ctx.beginPath();
	                if (image) {
	                    Canvas.img.src = image;
	                    if (radius) {
	                        imgWidth = radius;
	                        imgHeight = radius;
	                    } else {
	                        imgWidth = Canvas.img.width;
	                        imgHeight = Canvas.img.height;
	                    }
	                    // drawImage(img, x2left, y2up, imgWidth, imgHeight)
	                    // console.log("rendering drone..with width:" + imgWidth + " height:" + imgHeight);
	                    var _y = Canvas.height - coords[1];
	                    if (rotate) Canvas.rotateCtx(coords, rotate);
	                    Canvas.ctx.drawImage(Canvas.img, parseInt(coords[0]), parseInt(_y), imgWidth, imgHeight);
	                    if (rotate) Canvas.restore(coords);
	                    return;
	                }
	                var y = Canvas.height - coords[1];
	                Canvas.ctx.arc(parseInt(coords[0]), parseInt(y), radius, 0, Math.PI * 2);

	                if (typeof rotate == 'number') {
	                    var tmp = rotate % (Math.PI * 2) - Math.PI / 2;
	                    Canvas.ctx.arc(parseInt(coords[0]), parseInt(y), radius + 2, tmp - Math.PI / 4, tmp + Math.PI / 4);
	                    // console.log("rendering drone..with rotate:" + tmp);
	                }

	                if (text) Canvas.ctx.fillText(text, coords[0], parseInt(y) - 4);

	                if (fill) {
	                    Canvas.ctx.fill();
	                } else {
	                    Canvas.ctx.stroke();
	                }
	            } else return;
	        }
	    }, {
	        key: "restore",
	        value: function restore(coords) {
	            var y = Canvas.height - coords[1];
	            Canvas.ctx.translate(parseInt(-coords[0]), parseInt(-y));
	            Canvas.ctx.restore();
	        }

	        /**
	         * rotate by the obj! 
	         * first save ctx and translate to the obj center..
	         * draw obj after ctx rotate !!
	         * then translate back and retore
	         */

	    }, {
	        key: "rotateCtx",
	        value: function rotateCtx(coords, rotate) {
	            Canvas.ctx.save();
	            var y = Canvas.height - coords[1];
	            Canvas.ctx.translate(parseInt(coords[0]), parseInt(y));
	            Canvas.ctx.rotate(rotate);
	        }

	        /**
	         * drawBar with given Value..
	         * x: where to draw in X axis..
	         * width: bar width,
	         * value: bar y value.
	         * fill: fill or stroke. default false.
	         */

	    }, {
	        key: "drawBar",
	        value: function drawBar(x, width, value, fill) {
	            var barY = Canvas.height - value;
	            if (fill) {
	                // fillRect(leftUP.X, Y, RectWidth, RectHeight)
	                Canvas.ctx.fillRect(x, barY, width, value);
	            } else {
	                Canvas.ctx.strokeRect(x, barY, width, value);
	            }
	        }

	        /**
	         * drawLine with given Value..@Array
	         * lwidth : lineWidth @number
	         * dash: default false @bool
	         * fill: closeLine to a polygon
	         */

	    }, {
	        key: "drawLine",
	        value: function drawLine(data, lwidth, dash, fill) {
	            if (data instanceof Array && data.length > 0) {
	                Canvas.ctx.strokeStyle = "#FF0000";
	                Canvas.ctx.lineWidth = lwidth ? lwidth : 2;
	                Canvas.ctx.beginPath();
	                // for drawing area close with xaxis.. render first point.
	                if (fill) {
	                    Canvas.ctx.moveTo(-100, Canvas.height);
	                }
	                for (var i = 0; i < data.length; i++) {
	                    // each point of line contains x, y.
	                    if (data[i] instanceof Array && data[i].length == 2) {
	                        var pointy = Canvas.height - data[i][1];
	                        Canvas.ctx.lineTo(data[i][0], pointy);
	                    }
	                }
	                if (fill) {
	                    // close with beginPath point
	                    Canvas.ctx.lineTo(data[data.length - 1][0], Canvas.height);
	                    Canvas.ctx.closePath();
	                    // Canvas.ctx.stroke();
	                    Canvas.ctx.fill();
	                } else {
	                    Canvas.ctx.stroke();
	                }
	            }
	        }

	        /**
	         * draw Math.sin with canvas.
	         */
	        // static drawDemoline() {
	        //     let base = 50;

	        // }

	        /**
	         * drawBars with given data..
	         * width: bar width,
	         * data: Array of values..
	         * fill: fill or stroke. default false.
	         */

	    }, {
	        key: "drawBars",
	        value: function drawBars(data, fill) {
	            Canvas.clearCanv();
	            Canvas.ctx.strokeStyle = "#000";
	            Canvas.setWidth(2);
	            var barY = void 0,
	                barX = 10;
	            if (data instanceof Array) {
	                var segWidth = (Canvas.width - 20) / data.length;
	                var barWidth = segWidth * 0.7;
	                for (var i = 0; i < data.length; i++) {
	                    Canvas.drawBar(barX, barWidth, data[i]);
	                    barX += segWidth;
	                }
	            } else {
	                console.error('pls Input Array Data');
	            }
	            console.warn("Bars rendered complete..");
	        }
	    }, {
	        key: "clearCanv",
	        value: function clearCanv() {
	            Canvas.ctx.clearRect(0, 0, Canvas.width, Canvas.height);
	            Canvas.setFill("#000");
	            Canvas.ctx.fillRect(0, 0, Canvas.width, Canvas.height);
	        }
	    }]);

	    return Canvas;
	}();

	exports.default = Canvas;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _canvas = __webpack_require__(7);

	var _canvas2 = _interopRequireDefault(_canvas);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var chart = function () {
	    // init chart bind with a div element @object.
	    function chart(opts) {
	        _classCallCheck(this, chart);

	        this.ele = opts.ele ? opts.ele : null;
	        this.data = opts.data ? opts.data : [];
	        this.type = opts.type ? opts.type : null;
	        this.maxValue = 0;
	        this.rotate = opts.rotate ? opts.rotate : 0;
	        // specify url as data source.. update by GET.
	        this.url = opts.url ? opts.url : null;
	    }

	    // new Promise to GET latest data, then redraw


	    _createClass(chart, [{
	        key: 'updateData',
	        value: function updateData() {}
	        // new Promise() 


	        /**
	         * set chart.data with Array instance, then redraw.
	         */

	    }, {
	        key: 'setData',
	        value: function setData(data) {
	            this.data = data.coords;
	            this.rotate = data.rotate;
	            this.dataName = data.name;
	            _canvas2.default.clearCanv();
	            this.render();
	            return this;
	        }

	        /**
	         * render data in Canvas according data dimension
	         * width different strategy..
	         */

	    }, {
	        key: 'render',
	        value: function render() {
	            // if line or poly
	            if (this.data instanceof Array && this.data.length > 0 && this.data[0] instanceof Array) {
	                _canvas2.default.drawLine(this.data, null, null);
	            } else if (this.data instanceof Array && this.data.length > 0) {
	                if (this.url) {
	                    // render point with icon image.
	                    _canvas2.default.drawPoint(this.data, 20, null, this.url, this.rotate, this.dataName);
	                } else {
	                    _canvas2.default.drawPoint(this.data, 2, null, null, this.rotate, this.dataName);
	                }
	            }
	        }

	        // stat max value of Data and set to maxValue. only for 1 dimension data.[y1, y2, y3 ...]

	    }, {
	        key: 'statMax',
	        value: function statMax() {
	            var _this = this;

	            if (_typeof(this.data) == Array && this.data.length > 0) {
	                this.data.forEach(function (value) {
	                    if (_this.maxValue < value) _this.maxValue = value;
	                });
	            }
	            return this;
	        }

	        /**
	        * generate Math.sin/cos line data..
	         * 
	        * sin: 'sin'/'cos'/'tan' @string
	        * xEnd: finally returned points number.
	        * fatness: fatness of line. bigger the fatter will the line be.
	        * offset: offset to left with animation. @number
	         * 
	         * Return: 2 dimension Array. [[x1,y1], [x2,y2] ...] @Array
	        */

	    }, {
	        key: 'generateSinLine',
	        value: function generateSinLine(sin, xEnd, fatness, offset) {
	            var points = [],
	                y = 0,
	                yheight = 50,
	                ybase = 50,
	                fat = fatness ? fatness : 20.0,
	                off = offset ? offset : 0;
	            // 像素个数 xEnd. 
	            for (var x = 0; x < xEnd; x++) {
	                if (sin == 'sin') {
	                    y = parseInt(Math.sin(x / fat) * yheight);
	                } else if (sin == 'cos') y = parseInt(Math.cos(x / fat) * yheight);else if (sin == 'tan') y = parseInt(Math.tan(x / fat) * yheight);

	                points.push([x - off, y + ybase]);
	            }
	            return points;
	        }
	    }]);

	    return chart;
	}();

	exports.default = chart;


	var strategies = {};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	// import '../examples/listLayer/node_modules/minirefresh/dist/debug/minirefresh.css'


	var _drone = __webpack_require__(2);

	var _drone2 = _interopRequireDefault(_drone);

	var _minirefresh = __webpack_require__(10);

	var _minirefresh2 = _interopRequireDefault(_minirefresh);

	var _coreDecorators = __webpack_require__(11);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var controllers = function () {
	    function controllers() {
	        _classCallCheck(this, controllers);
	    }

	    _createClass(controllers, null, [{
	        key: 'gameControl',

	        /**
	         * GameController bind with a drone instance.. 
	         * After start this controller, use WSAD to move drone.
	         */
	        value: function gameControl(drone) {
	            if (drone instanceof _drone2.default !== true) {
	                console.error("gameControl must bind with a drone instance.");
	                return;
	            }
	            document.body.addEventListener('keydown', function (e) {
	                if (e.which === 37 || e.which === 65) {
	                    drone.turnLeft();
	                }
	                if (e.which === 39 || e.which === 68) {
	                    drone.turnRight();
	                }
	                if (e.which === 38 || e.which === 87) {
	                    // faster
	                    drone.accelerate();
	                }
	                if (e.which === 40 || e.which === 83) {
	                    // slower
	                    drone.brake();
	                }
	                if (e.which === 32) {
	                    drone.fire();
	                }
	            });
	            console.log("gameControl register success.");
	        }

	        /**
	         * Calculate bullets location based on drones.
	         */

	    }, {
	        key: 'bulletCalculator',
	        value: function bulletCalculator(drones) {
	            if (Array.isArray(drones)) {
	                for (var i = 0; i < drones.length; i++) {
	                    var curDrone = drone[i];
	                    var curBullets = curDrone.bullets;
	                    // Calculate bullets coords
	                    if (curDrone.firing && curBullets) {} else {}
	                }
	            }
	        }

	        /**
	         * Add AI robots shooting at player..
	         * @input num: number. how many robots to create. 
	         */

	    }, {
	        key: 'addRobots',
	        value: function addRobots(num) {
	            var robot = new _drone2.default({});
	            return robot;
	        }

	        /**
	         * Dashboard bind with a drone instance and div element... 
	         * After start this controller, use WSAD to move drone.
	         */
	        // @deprecate

	    }, {
	        key: 'dashBoard',
	        value: function dashBoard(drone, ele) {
	            if (drone instanceof _drone2.default !== true) {
	                console.error("dashBoard must bind with a drone instance.");
	                return;
	            }
	            try {
	                setInterval(function () {
	                    ele.innerHTML = drone.name + "<br> coords: " + drone.point.coordinates[0].toFixed(1) + ", " + drone.point.coordinates[1].toFixed(1) + "<br>" + 'speed: ' + drone.speed + "<br>" + 'direction: ' + (drone.direction % (Math.PI * 2) * 180 / Math.PI).toFixed(1);
	                }, 200);
	            } catch (e) {
	                console.error(e);
	            }
	            console.log("dashBoard register success.");
	        }

	        /** create refreshable features list.  */

	    }, {
	        key: 'featureList',
	        value: function featureList(containerId) {
	            if (containerId == undefined || typeof containerId !== "string") {
	                console.warn("invalid containerId..");
	                return null;
	            }
	            // var miniRefresh = new MiniRefresh({
	            //     container: '#' + containerId,
	            //     down: {
	            //         callback: function() {
	            //             // 下拉事件
	            //             console.log("list dragged ..");
	            //         }
	            //     },
	            //     up: {

	            //         callback: function() {
	            //             // 上拉事件
	            //         }
	            //     }
	            // });
	            // return miniRefresh;
	        }
	    }]);

	    return controllers;
	}();

	exports.default = controllers;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global) {/** 
	 * 构建 MiniRefresh
	 * MiniRefreshTools 是内部使用的
	 * 外部主题会用 MiniRefresh变量
	 */
	(function(globalContext, factory) {
	    'use strict';

	    //  if (!globalContext.document) {
	    //      throw new Error("minirefresh requires a window with a document");
	    //  }
	    
	    // 不重复执行
	    var moduleExports = globalContext.MiniRefreshTools || factory(globalContext);

	    if (typeof module !== 'undefined' && module.exports) {
	        // 导出一个默认对象
	        module.exports = moduleExports;
	    } else if (true) {
	        // require模式默认导出整个工具类
	        !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	            return moduleExports;
	        }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    }

	    // 单独引入时暴露的是这个tools 
	    globalContext.MiniRefreshTools = moduleExports;
	})(typeof window !== 'undefined' ? window : global, function(globalContext, exports) {
	    'use strict';

	    exports = exports || {};

	    /**
	     * 模拟Class的基类,以便模拟Class进行继承等
	     */
	    (function() {
	        // 同时声明多个变量,用,分开要好那么一点点
	        var initializing = false,
	            // 通过正则检查是否是函数
	            fnTest = /xyz/.test(function() {
	                'xyz';
	            }) ? /\b_super\b/ : /.*/;
	        var Clazz = function() {};

	        // 很灵活的一种写法,直接重写Class的extend,模拟继承
	        Clazz.extend = function(prop) {
	            var _super = this.prototype;

	            initializing = true;
	            // 可以这样理解:这个prototype将this中的方法和属性全部都复制了一遍
	            var prototype = new this();

	            initializing = false;
	            for (var name in prop) {
	                if (!Object.prototype.hasOwnProperty.call(prop, name)) {
	                    // 跳过原型上的
	                    continue;
	                }

	                /**
	                 * 这一些列操作逻辑并不简单，得清楚运算符优先级
	                 * 逻辑与的优先级是高于三元条件运算符的,得注意下
	                 * 只有继承的函数存在_super时才会触发(哪怕注释也一样进入)
	                 * 所以梳理后其实一系列的操作就是判断是否父对象也有相同对象
	                 * 如果有,则对应函数存在_super这个东西
	                 */
	                prototype[name] = typeof prop[name] === 'function' &&
	                    typeof _super[name] === 'function' && fnTest.test(prop[name]) ?
	                    (function(name, fn) {
	                        return function() {
	                            var tmp = this._super;

	                            this._super = _super[name];

	                            var ret = fn.apply(this, arguments);

	                            this._super = tmp;

	                            return ret;
	                        };
	                    })(name, prop[name]) :
	                    prop[name];
	            }

	            /**
	             * Clss的构造,默认会执行init方法
	             */
	            function Clazz() {
	                if (!initializing && this.init) {
	                    this.init.apply(this, arguments);
	                }
	            }
	            Clazz.prototype = prototype;
	            Clazz.prototype.constructor = Clazz;
	            // 只会继承 extend静态属性，其它属性不会继承
	            Clazz.extend = this.extend;

	            return Clazz;
	        };
	        exports.Clazz = Clazz;
	    })();

	    exports.noop = function() {};

	    exports.isFunction = function(obj) {
	        return typeof obj === 'function';
	    };

	    exports.isObject = function(obj) {
	        return typeof obj === 'object';
	    };

	    exports.isArray = Array.isArray ||
	        function(object) {
	            return object instanceof Array;
	        };

	    /**
	     * 参数拓展
	     * @param {type} deep 是否深复制
	     * @param {type} target 需要拓展的目标对象
	     * @param {type} source 其它需要拓展的源，会覆盖目标对象上的相同属性
	     * @return {Object} 拓展后的对象
	     */
	    exports.extend = function() {
	        var args = [].slice.call(arguments);

	        // 目标
	        var target = args[0] || {},
	            // 默认source从1开始
	            index = 1,
	            len = args.length,
	            // 默认非深复制
	            deep = false;

	        if (typeof target === 'boolean') {
	            // 如果开启了深复制
	            deep = target;
	            target = args[index] || {};
	            index++;
	        }

	        if (!exports.isObject(target)) {
	            // 确保拓展的一定是object
	            target = {};
	        }

	        for (; index < len; index++) {
	            // source的拓展
	            var source = args[index];

	            if (source && exports.isObject(source)) {
	                for (var name in source) {
	                    if (!Object.prototype.hasOwnProperty.call(source, name)) {
	                        // 防止原型上的数据
	                        continue;
	                    }

	                    var src = target[name];
	                    var copy = source[name];
	                    var clone,
	                        copyIsArray;

	                    if (target === copy) {
	                        // 防止环形引用
	                        continue;
	                    }

	                    if (deep && copy && (exports.isObject(copy) || (copyIsArray = exports.isArray(copy)))) {
	                        if (copyIsArray) {
	                            copyIsArray = false;
	                            clone = src && exports.isArray(src) ? src : [];
	                        } else {
	                            clone = src && exports.isObject(src) ? src : {};
	                        }

	                        target[name] = exports.extend(deep, clone, copy);
	                    } else if (copy !== undefined) {
	                        target[name] = copy;
	                    }
	                }
	            }
	        }

	        return target;
	    };

	    /**
	     * 选择这段代码用到的太多了，因此抽取封装出来
	     * @param {Object} element dom元素或者selector
	     * @return {HTMLElement} 返回选择的Dom对象，无果没有符合要求的，则返回null
	     */
	    exports.selector = function(element) {
	        if (typeof element === 'string') {
	            element = document.querySelector(element);
	        }

	        return element;
	    };
	    
	    /**
	     * 获取DOM的可视区高度，兼容PC上的body高度获取
	     * 因为在通过body获取时，在PC上会有CSS1Compat形式，所以需要兼容
	     * @param {HTMLElement} dom 需要获取可视区高度的dom,对body对象有特殊的兼容方案
	     * @return {Number} 返回最终的高度
	     */
	    exports.getClientHeightByDom = function(dom) {
	        var height = dom.clientHeight;
	        
	        if (dom === document.body && document.compatMode === 'CSS1Compat') {
	            // PC上body的可视区的特殊处理
	            height = document.documentElement.clientHeight;
	        }
	        
	        return height;
	    };

	    /**
	     * 设置一个Util对象下的命名空间
	     * @param {String} namespace 命名空间
	     * @param {Object} obj 需要赋值的目标对象
	     * @return {Object} 返回最终的对象
	     */
	    exports.namespace = function(namespace, obj) {
	        var parent = globalContext.MiniRefreshTools;

	        if (!namespace) {
	            return parent;
	        }

	        var namespaceArr = namespace.split('.'),
	            len = namespaceArr.length;

	        for (var i = 0; i < len - 1; i++) {
	            var tmp = namespaceArr[i];

	            // 不存在的话要重新创建对象
	            parent[tmp] = parent[tmp] || {};
	            // parent要向下一级
	            parent = parent[tmp];

	        }
	        parent[namespaceArr[len - 1]] = obj;

	        return parent[namespaceArr[len - 1]];
	    };

	    return exports;
	});
	/**
	 * MiniRerefresh 处理滑动监听的关键代码，都是逻辑操作，没有UI实现
	 * 依赖于一个 MiniRefresh对象
	 */
	(function(innerUtil) {

	    /**
	     * 每秒多少帧
	     */
	    var SECOND_MILLIONS = 1000,
	        NUMBER_FRAMES = 60,
	        PER_SECOND = SECOND_MILLIONS / NUMBER_FRAMES;

	    /**
	     * 定义一些常量
	     */
	    var EVENT_SCROLL = 'scroll',
	        EVENT_PULL = 'pull',
	        EVENT_UP_LOADING = 'upLoading',
	        EVENT_DOWN_LOADING = 'downLoading',
	        EVENT_CANCEL_LOADING = 'cancelLoading',
	        HOOK_BEFORE_DOWN_LOADING = 'beforeDownLoading';

	    var rAF = window.requestAnimationFrame ||
	        window.webkitRequestAnimationFrame ||
	        window.mozRequestAnimationFrame ||
	        window.oRequestAnimationFrame ||
	        window.msRequestAnimationFrame ||
	        // 默认每秒60帧
	        function(callback) {
	            window.setTimeout(callback, PER_SECOND);
	        };

	    var MiniScroll = function(minirefresh) {
	        this.minirefresh = minirefresh;
	        this.container = minirefresh.container;
	        this.contentWrap = minirefresh.contentWrap;
	        this.scrollWrap = minirefresh.scrollWrap;
	        this.options = minirefresh.options;
	        // 默认没有事件，需要主动绑定
	        this.events = {};
	        // 默认没有hook
	        this.hooks = {};

	        // 锁定上拉和下拉,core内如果想改变，需要通过API调用设置
	        this.isLockDown = false;
	        this.isLockUp = false;

	        // 是否使用了scrollto功能，使用这个功能时会禁止操作
	        this.isScrollTo = false;
	        // 上拉和下拉的状态
	        this.upLoading = false;
	        this.downLoading = false;

	        // 默认up是没有finish的
	        this.isFinishUp = false;

	        this._initPullDown();
	        this._initPullUp();

	        var self = this;

	        // 在初始化完毕后，下一个循环的开始再执行
	        setTimeout(function() {
	            if (self.options.down && self.options.down.isAuto && !self.isLockDown) {
	                // 如果设置了auto，则自动下拉一次
	                // 需要判断是否需要动画
	                if (self.options.down.isAllowAutoLoading) {
	                    self.triggerDownLoading();
	                } else {
	                    self.events[EVENT_DOWN_LOADING] && self.events[EVENT_DOWN_LOADING](true);
	                }
	            } else if (self.options.up && self.options.up.isAuto && !self.isLockUp) {
	                // 如果设置了auto，则自动上拉一次
	                self.triggerUpLoading();
	            }
	        });
	    };

	    MiniScroll.prototype.refreshOptions = function(options) {
	        this.options = options;
	    };

	    /**
	     * 对外暴露的，移动wrap的同时一起修改downHeight
	     * @param {Number} y 移动的高度
	     * @param {Number} duration 过渡时间
	     */
	    MiniScroll.prototype.translateContentWrap = function(y, duration) {
	        this._translate(y, duration);
	        this.downHight = y;
	    };

	    /**
	     * wrap的translate动画，用于下拉刷新时进行transform动画
	     * @param {Number} y 移动的高度
	     * @param {Number} duration 过渡时间
	     */
	    MiniScroll.prototype._translate = function(y, duration) {
	        if (!this.options.down.isScrollCssTranslate) {
	            // 只有允许动画时才会scroll也translate,否则只会改变downHeight
	            return;
	        }
	        y = y || 0;
	        duration = duration || 0;

	        var wrap = this.contentWrap;

	        wrap.style.webkitTransitionDuration = duration + 'ms';
	        wrap.style.transitionDuration = duration + 'ms';
	        wrap.style.webkitTransform = 'translate(0px, ' + y + 'px) translateZ(0px)';
	        wrap.style.transform = 'translate(0px, ' + y + 'px) translateZ(0px)';
	    };

	    MiniScroll.prototype._initPullDown = function() {
	        var self = this,
	            // 考虑到options可以更新，所以缓存时请注意一定能最新
	            scrollWrap = this.scrollWrap;

	        scrollWrap.webkitTransitionTimingFunction = 'cubic-bezier(0.1, 0.57, 0.1, 1)';
	        scrollWrap.transitionTimingFunction = 'cubic-bezier(0.1, 0.57, 0.1, 1)';

	        var touchstartEvent = function(e) {
	            if (self.isScrollTo) {
	                // 如果执行滑动事件,则阻止touch事件,优先执行scrollTo方法
	                e.preventDefault();
	            }
	            // 记录startTop, 并且只有startTop存在值时才允许move
	            self.startTop = scrollWrap.scrollTop;

	            // startY用来计算距离
	            self.startY = e.touches ? e.touches[0].pageY : e.clientY;
	            // X的作用是用来计算方向，如果是横向，则不进行动画处理，避免误操作
	            self.startX = e.touches ? e.touches[0].pageX : e.clientX;
	        };

	        // 兼容手指滑动与鼠标
	        scrollWrap.addEventListener('touchstart', touchstartEvent);
	        scrollWrap.addEventListener('mousedown', touchstartEvent);

	        var touchmoveEvent = function(e) {
	            var options = self.options,
	                isAllowDownloading = true;

	            if (self.downLoading) {
	                isAllowDownloading = false;
	            } else if (!options.down.isAways && self.upLoading) {
	                isAllowDownloading = false;
	            }

	            if (self.startTop !== undefined && self.startTop <= 0 &&
	                (isAllowDownloading) && !self.isLockDown) {
	                // 列表在顶部且不在加载中，并且没有锁住下拉动画

	                // 当前第一个手指距离列表顶部的距离
	                var curY = e.touches ? e.touches[0].pageY : e.clientY;
	                var curX = e.touches ? e.touches[0].pageX : e.clientX;

	                if (!self.preY) {
	                    // 设置上次移动的距离，作用是用来计算滑动方向
	                    self.preY = curY;
	                }

	                // 和上次比,移动的距离 (大于0向下,小于0向上)
	                var diff = curY - self.preY;

	                self.preY = curY;

	                // 和起点比,移动的距离,大于0向下拉
	                var moveY = curY - self.startY;
	                var moveX = curX - self.startX;

	                // 如果锁定横向滑动并且横向滑动更多，阻止默认事件
	                if (options.isLockX && Math.abs(moveX) > Math.abs(moveY)) {
	                    e.preventDefault();

	                    return;
	                }

	                if (moveY > 0) {
	                    // 向下拉
	                    self.isMoveDown = true;

	                    // 阻止浏览器的默认滚动事件，因为这时候只需要执行动画即可
	                    e.preventDefault();

	                    if (!self.downHight) {
	                        // 下拉区域的高度，用translate动画
	                        self.downHight = 0;
	                    }

	                    var downOffset = options.down.offset,
	                        dampRate = 1;

	                    if (self.downHight < downOffset) {
	                        // 下拉距离  < 指定距离
	                        dampRate = options.down.dampRateBegin;
	                    } else {
	                        // 超出了指定距离，随时可以刷新
	                        dampRate = options.down.dampRate;
	                    }

	                    if (diff > 0) {
	                        // 需要加上阻尼系数
	                        self.downHight += diff * dampRate;
	                    } else {
	                        // 向上收回高度,则向上滑多少收多少高度
	                        self.downHight += diff;
	                    }

	                    self.events[EVENT_PULL] && self.events[EVENT_PULL](self.downHight, downOffset);
	                    // 执行动画
	                    self._translate(self.downHight);
	                } else {
	                    // 解决嵌套问题。在嵌套有 IScroll，或类似的组件时，这段代码会生效，可以辅助滚动scrolltop
	                    // 否则有可能在最开始滚不动
	                    if (scrollWrap.scrollTop <= 0) {
	                        scrollWrap.scrollTop += Math.abs(diff);
	                    }
	                }
	            }

	        };

	        scrollWrap.addEventListener('touchmove', touchmoveEvent);
	        scrollWrap.addEventListener('mousemove', touchmoveEvent);

	        var touchendEvent = function(e) {
	            var options = self.options;

	            // 需要重置状态
	            if (self.isMoveDown) {
	                // 如果下拉区域已经执行动画,则需重置回来
	                if (self.downHight >= options.down.offset) {
	                    // 符合触发刷新的条件
	                    self.triggerDownLoading();
	                } else {
	                    // 否则默认重置位置
	                    self._translate(0, options.down.bounceTime);
	                    self.downHight = 0;
	                    self.events[EVENT_CANCEL_LOADING] && self.events[EVENT_CANCEL_LOADING]();
	                }

	                self.isMoveDown = false;
	            }

	            self.startY = 0;
	            self.startX = 0;
	            self.preY = 0;
	            self.startTop = undefined;
	        };

	        scrollWrap.addEventListener('touchend', touchendEvent);
	        scrollWrap.addEventListener('mouseup', touchendEvent);
	        scrollWrap.addEventListener('mouseleave', touchendEvent);

	    };

	    MiniScroll.prototype._initPullUp = function() {
	        var self = this,
	            scrollWrap = this.scrollWrap;

	        // 如果是Body上的滑动，需要监听window的scroll
	        var targetScrollDom = scrollWrap === document.body ? window : scrollWrap;

	        targetScrollDom.addEventListener('scroll', function() {
	            var scrollTop = scrollWrap.scrollTop,
	                scrollHeight = scrollWrap.scrollHeight,
	                clientHeight = innerUtil.getClientHeightByDom(scrollWrap),
	                options = self.options;

	            self.events[EVENT_SCROLL] && self.events[EVENT_SCROLL](scrollTop);

	            if (!self.upLoading) {
	                if (!self.isLockUp && !self.isFinishUp) {
	                    var toBottom = scrollHeight - clientHeight - scrollTop;

	                    if (toBottom <= options.up.offset) {
	                        // 满足上拉加载
	                        self.triggerUpLoading();
	                    }
	                }
	            }
	        });
	    };

	    MiniScroll.prototype._loadFull = function() {
	        var self = this,
	            scrollWrap = this.scrollWrap,
	            options = this.options;

	        setTimeout(function() {
	            // 在下一个循环中运行
	            if (!self.isLockUp && options.up.loadFull.isEnable && scrollWrap.scrollHeight <= innerUtil.getClientHeightByDom(scrollWrap)) {
	                self.triggerUpLoading();
	            }
	        }, options.up.loadFull.delay || 0);
	    };

	    MiniScroll.prototype.triggerDownLoading = function() {
	        var self = this,
	            options = this.options,
	            bounceTime = options.down.bounceTime;

	        if (!this.hooks[HOOK_BEFORE_DOWN_LOADING] || this.hooks[HOOK_BEFORE_DOWN_LOADING](self.downHight, options.down.offset)) {
	            // 没有hook或者hook返回true都通过，主要是为了方便类似于秘密花园等的自定义下拉刷新动画实现
	            self.downLoading = true;
	            self.downHight = options.down.offset;
	            self._translate(self.downHight, bounceTime);

	            self.events[EVENT_DOWN_LOADING] && self.events[EVENT_DOWN_LOADING]();
	        }
	    };

	    /**
	     * 结束下拉刷新动画
	     * @param {Number} duration 回弹时间
	     */
	    MiniScroll.prototype.endDownLoading = function() {
	        var self = this,
	            options = this.options,
	            bounceTime = options.down.bounceTime;

	        if (this.downLoading) {

	            // 必须是loading时才允许结束
	            self._translate(0, bounceTime);
	            self.downHight = 0;
	            self.downLoading = false;
	        }
	    };

	    MiniScroll.prototype.triggerUpLoading = function() {
	        this.upLoading = true;
	        this.events[EVENT_UP_LOADING] && this.events[EVENT_UP_LOADING]();
	    };

	    /**
	     * 结束上拉加载动画
	     * @param {Boolean} isFinishUp 是否结束上拉加载
	     */
	    MiniScroll.prototype.endUpLoading = function(isFinishUp) {
	        if (this.upLoading) {

	            this.upLoading = false;

	            if (isFinishUp) {
	                this.isFinishUp = true;
	            } else {
	                this._loadFull();
	            }
	        }
	    };

	    /**
	     * 滚动到指定的y位置
	     * @param {Number} y top坐标
	     * @param {Number} duration 单位毫秒
	     */
	    MiniScroll.prototype.scrollTo = function(y, duration) {
	        var self = this,
	            scrollWrap = this.scrollWrap;

	        y = y || 0;
	        duration = duration || 0;

	        // 最大可滚动的y
	        var maxY = scrollWrap.scrollHeight - innerUtil.getClientHeightByDom(scrollWrap);

	        y = Math.max(y, 0);
	        y = Math.min(y, maxY);

	        // 差值 (可能为负)
	        var diff = scrollWrap.scrollTop - y;

	        if (diff === 0) {
	            return;
	        }
	        if (duration === 0) {
	            scrollWrap.scrollTop = y;

	            return;
	        }

	        // 每秒60帧，计算一共多少帧，然后每帧的步长
	        var count = duration / PER_SECOND;
	        var step = diff / (count),
	            i = 0;

	        // 锁定状态
	        self.isScrollTo = true;

	        var execute = function() {
	            if (i < count) {
	                if (i === count - 1) {
	                    // 最后一次直接设置y,避免计算误差
	                    scrollWrap.scrollTop = y;
	                } else {
	                    scrollWrap.scrollTop -= step;
	                }
	                i++;
	                rAF(execute);
	            } else {
	                self.isScrollTo = false;
	            }
	        };

	        rAF(execute);
	    };

	    /**
	     * 只有 down存在时才允许解锁
	     * @param {Boolean} isLock 是否锁定
	     */
	    MiniScroll.prototype.lockDown = function(isLock) {
	        this.options.down && (this.isLockDown = isLock);
	    };

	    /**
	     * 只有 up存在时才允许解锁
	     * @param {Boolean} isLock 是否锁定
	     */
	    MiniScroll.prototype.lockUp = function(isLock) {
	        this.options.up && (this.isLockUp = isLock);
	    };

	    MiniScroll.prototype.resetUpLoading = function() {
	        if (this.isFinishUp) {
	            this.isFinishUp = false;
	        }

	        // 触发一次HTML的scroll事件，以便检查当前位置是否需要加载更多
	        // 需要兼容webkit和firefox
	        var evt = document.createEvent('HTMLEvents');

	        // 这个事件没有必要冒泡，firefox内参数必须完整
	        evt.initEvent('scroll', false, true);
	        this.scrollWrap.dispatchEvent(evt);
	    };

	    /**
	     * 监听事件，包括下拉过程，下拉刷新，上拉加载，滑动等事件都可以监听到
	     * @param {String} event 事件名，可选名称
	     * scroll 容器滑动的持续回调，可以监听滑动位置
	     * pull 下拉滑动过程的回调，持续回调
	     * upLoading 上拉加载那一刻触发
	     * downLoading 下拉刷新那一刻触发
	     * @param {Function} callback 回调函数
	     */
	    MiniScroll.prototype.on = function(event, callback) {
	        if (!event || !innerUtil.isFunction(callback)) {
	            return;
	        }
	        this.events[event] = callback;
	    };

	    /**
	     * 注册钩子函数，主要是一些自定义刷新动画时用到，如进入秘密花园
	     * @param {String} hook 名称，范围如下
	     * beforeDownLoading 是否准备downLoading，如果返回false，则不会loading，完全进入自定义动画
	     * @param {Function} callback 回调函数
	     */
	    MiniScroll.prototype.hook = function(hook, callback) {
	        if (!hook || !innerUtil.isFunction(callback)) {
	            return;
	        }
	        this.hooks[hook] = callback;
	    };

	    innerUtil.Scroll = MiniScroll;
	})(MiniRefreshTools);
	/**
	 * MiniRerefresh 的核心代码，代码中约定对外的API
	 * 可以通过继承  MiniRefreshCore， 得到一个主题类，然后在主题类中实现UI hook函数可以达到不同的动画效果
	 * 核心类内部没有任何UI实现，所有的UI都依赖于主题类
	 * 
	 * 以下是主题类可以实现的Hook（为undefined的话相当于忽略）
	 * _initHook(isLockDown, isLockUp)              初始化时的回调
	 * _refreshHook(isLockDown, isLockUp)           刷新options时的回调
	 * _pullHook(downHight, downOffset)             下拉过程中持续回调
	 * _scrollHook(scrollTop)                       滚动过程中持续回调
	 * _downLoaingHook()                            下拉触发的那一刻回调
	 * _downLoaingSuccessHook(isSuccess)            下拉刷新的成功动画，处理成功或失败提示
	 * _downLoaingEndHook(isSuccess)                下拉刷新动画结束后的回调
	 * _cancelLoaingHook()                          取消loading的回调
	 * _upLoaingHook()                              上拉触发的那一刻回调
	 * _upLoaingEndHook(isFinishUp)                 上拉加载动画结束后的回调
	 * __lockUpLoadingHook(isLock)                   锁定上拉时的回调
	 * __lockDownLoadingHook(isLock)                 锁定下拉时的回调
	 * 
	 * _beforeDownLoadingHook(downHight, downOffset)一个特殊的hook，返回false时代表不会走入下拉刷新loading，完全自定义实现动画，默认为返回true
	 */
	(function(innerUtil) {

	    var defaultSetting = {
	        // 下拉有关
	        down: {
	            // 默认没有锁定，可以通过API动态设置
	            isLock: false,
	            // 是否自动下拉刷新
	            isAuto: false,
	            // 设置isAuto=true时生效，是否在初始化的下拉刷新触发事件中显示动画，如果是false，初始化的加载只会触发回调，不会触发动画
	            isAllowAutoLoading: true,
	            // 是否不管任何情况下都能触发下拉刷新，为false的话当上拉时不会触发下拉
	            isAways: false,
	            // 是否scroll在下拉时会进行css移动，通过关闭它可以实现自定义动画
	            isScrollCssTranslate: true,
	            // 下拉要大于多少长度后再下拉刷新
	            offset: 75,
	            // 阻尼系数，下拉小于offset时的阻尼系数，值越接近0,高度变化越小,表现为越往下越难拉
	            dampRateBegin: 1,
	            // 阻尼系数，下拉的距离大于offset时,改变下拉区域高度比例;值越接近0,高度变化越小,表现为越往下越难拉
	            dampRate: 0.3,
	            // 回弹动画时间
	            bounceTime: 300,
	            successAnim: {
	                // 下拉刷新结束后是否有成功动画，默认为false，如果想要有成功刷新xxx条数据这种操作，请设为true，并实现对应hook函数
	                isEnable: false,
	                duration: 300
	            },
	            // 下拉时会提供回调，默认为null不会执行
	            onPull: null,
	            // 取消时回调
	            onCalcel: null,
	            callback: innerUtil.noop
	        },
	        // 上拉有关
	        up: {
	            // 默认没有锁定，可以通过API动态设置
	            isLock: false,
	            // 是否自动上拉加载-初始化是是否自动
	            isAuto: true,
	            // 是否默认显示上拉进度条，可以通过API改变
	            isShowUpLoading: true,
	            // 距离底部高度(到达该高度即触发)
	            offset: 100,
	            loadFull: {
	                // 开启配置后，只要没满屏幕，就会自动加载
	                isEnable: true,
	                delay: 300
	            },
	            // 滚动时会提供回调，默认为null不会执行
	            onScroll: null,
	            callback: innerUtil.noop
	        },
	        // 容器
	        container: '#minirefresh',
	        // 是否锁定横向滑动，如果锁定则原生滚动条无法滑动
	        isLockX: true,
	        // 是否使用body对象的scroll而不是minirefresh-scroll对象的scroll
	        // 开启后一个页面只能有一个下拉刷新，否则会有冲突
	        isUseBodyScroll: false
	    };

	    var MiniRefreshCore = innerUtil.Clazz.extend({

	        /**
	         * 初始化
	         * @param {Object} options 配置信息
	         */
	        init: function(options) {
	            options = innerUtil.extend(true, {}, defaultSetting, options);

	            this.container = innerUtil.selector(options.container);
	            // scroll的dom-wrapper下的第一个节点，作用是down动画时的操作
	            this.contentWrap = this.container.children[0];
	            // 默认和contentWrap一致，但是为了兼容body的滚动，拆分为两个对象方便处理
	            // 如果是使用body的情况，scrollWrap恒为body
	            this.scrollWrap = options.isUseBodyScroll ? document.body : this.contentWrap;
	            
	            this.options = options;
	            
	            // 初始化的hook
	            this._initHook && this._initHook(this.options.down.isLock, this.options.up.isLock);

	            // 生成一个Scroll对象 ，对象内部处理滑动监听
	            this.scroller = new innerUtil.Scroll(this);
	           
	            this._initEvent();

	            // 如果初始化时锁定了，需要触发锁定，避免没有锁定时解锁（会触发逻辑bug）
	            options.up.isLock && this._lockUpLoading(options.up.isLock);
	            options.down.isLock && this._lockDownLoading(options.down.isLock);
	        },
	        _resetOptions: function() {
	            var options = this.options;

	            this._lockUpLoading(options.up.isLock);
	            this._lockDownLoading(options.down.isLock);
	        },
	        _initEvent: function() {
	            var self = this,
	                options = self.options;

	            this.scroller.on('downLoading', function(isHideLoading) {
	                !isHideLoading && self._downLoaingHook && self._downLoaingHook();
	                options.down.callback && options.down.callback();
	            });

	            this.scroller.on('cancelLoading', function() {
	                self._cancelLoaingHook && self._cancelLoaingHook();
	                options.down.onCalcel && options.down.onCalcel();
	            });

	            this.scroller.on('upLoading', function() {
	                self._upLoaingHook && self._upLoaingHook(self.options.up.isShowUpLoading);
	                options.up.callback && options.up.callback();
	            });

	            this.scroller.on('pull', function(downHight, downOffset) {
	                self._pullHook && self._pullHook(downHight, downOffset);
	                options.down.onPull && options.down.onPull(downHight, downOffset);
	            });

	            this.scroller.on('scroll', function(scrollTop) {
	                self._scrollHook && self._scrollHook(scrollTop);
	                options.up.onScroll && options.up.onScroll(scrollTop);
	            });

	            // 检查是否允许普通的加载中，如果返回false，就代表自定义下拉刷新，通常自己处理
	            this.scroller.hook('beforeDownLoading', function(downHight, downOffset) {
	                return !self._beforeDownLoadingHook || self._beforeDownLoadingHook(downHight, downOffset);
	            });
	        },

	        /**
	         * 内部执行，结束下拉刷新
	         * @param {Boolean} isSuccess 是否下拉请求成功
	         * @param {String} successTips 需要更新的成功提示
	         * 在开启了成功动画时，往往成功的提示是需要由外传入动态更新的，譬如  update 10 news
	         */
	        _endDownLoading: function(isSuccess, successTips) {
	            var self = this;

	            if (!this.options.down) {
	                // 防止没传down导致错误
	                return;
	            }

	            if (this.scroller.downLoading) {
	                // 必须是loading时才允许执行对应hook
	                var successAnim = this.options.down.successAnim.isEnable,
	                    successAnimTime = this.options.down.successAnim.duration;

	                if (successAnim) {
	                    // 如果有成功动画    
	                    this._downLoaingSuccessHook && this._downLoaingSuccessHook(isSuccess, successTips);
	                } else {
	                    // 默认为没有成功动画
	                    successAnimTime = 0;
	                }

	                setTimeout(function() {
	                    // 成功动画结束后就可以重置位置了
	                    self.scroller.endDownLoading();
	                    // 触发结束hook
	                    self._downLoaingEndHook && self._downLoaingEndHook(isSuccess);

	                }, successAnimTime);
	            }
	        },

	        /**
	         * 内部执行，结束上拉加载
	         * @param {Boolean} isFinishUp 是否结束了上拉加载
	         */
	        _endUpLoading: function(isFinishUp) {
	            if (this.scroller.upLoading) {
	                this.scroller.endUpLoading(isFinishUp);
	                this._upLoaingEndHook && this._upLoaingEndHook(isFinishUp);
	            }
	        },

	        /**
	         * 重新刷新上拉加载，刷新后会变为可以上拉加载
	         */
	        _resetUpLoading: function() {
	            this.scroller.resetUpLoading();
	        },

	        /**
	         * 锁定上拉加载
	         * 将开启和禁止合并成一个锁定API
	         * @param {Boolean} isLock 是否锁定
	         */
	        _lockUpLoading: function(isLock) {
	            this.scroller.lockUp(isLock);
	            this._lockUpLoadingHook && this._lockUpLoadingHook(isLock);
	        },

	        /**
	         * 锁定下拉刷新
	         * @param {Boolean} isLock 是否锁定
	         */
	        _lockDownLoading: function(isLock) {
	            this.scroller.lockDown(isLock);
	            this._lockDownLoadingHook && this._lockDownLoadingHook(isLock);
	        },

	        /**
	         * 刷新minirefresh的配置，关键性的配置请不要更新，如容器，回调等
	         * @param {Object} options 新的配置，会覆盖原有的
	         */
	        refreshOptions: function(options) {
	            this.options = innerUtil.extend(true, {}, this.options, options);
	            this.scroller.refreshOptions(this.options);
	            this._resetOptions(options);
	            this._refreshHook && this._refreshHook();
	        },

	        /**
	         * 结束下拉刷新
	         * @param {Boolean} isSuccess 是否请求成功，这个状态会中转给对应主题
	         * @param {String} successTips 需要更新的成功提示
	         * 在开启了成功动画时，往往成功的提示是需要由外传入动态更新的，譬如  update 10 news
	         */
	        endDownLoading: function(isSuccess, successTips) {
	            typeof isSuccess !== 'boolean' && (isSuccess = true);
	            this._endDownLoading(isSuccess, successTips);
	            // 同时恢复上拉加载的状态，注意，此时没有传isShowUpLoading，所以这个值不会生效
	            this._resetUpLoading();
	        },
	        
	        /**
	         * 重置上拉加载状态,如果是没有更多数据后重置，会变为可以继续上拉加载
	         */
	        resetUpLoading: function() {
	            this._resetUpLoading();
	        },

	        /**
	         * 结束上拉加载
	         * @param {Boolean} isFinishUp 是否结束上拉加载，如果结束，就相当于变为了没有更多数据，无法再出发上拉加载了
	         * 结束后必须reset才能重新开启
	         */
	        endUpLoading: function(isFinishUp) {
	            this._endUpLoading(isFinishUp);
	        },

	        /**
	         * 触发上拉加载
	         */
	        triggerUpLoading: function() {
	            this.scroller.triggerUpLoading();
	        },

	        /**
	         * 触发下拉刷新
	         */
	        triggerDownLoading: function() {
	            this.scroller.scrollTo(0);
	            this.scroller.triggerDownLoading();
	        },

	        /**
	         * 滚动到指定的y位置
	         * @param {Number} y 需要滑动到的top值
	         * @param {Number} duration 单位毫秒
	         */
	        scrollTo: function(y, duration) {
	            this.scroller.scrollTo(y, duration);
	        }
	    });

	    innerUtil.core = MiniRefreshCore;
	})(MiniRefreshTools);
	/**
	 * minirefresh的默认主题
	 * 默认主题会打包到核心代码中
	 * 主题类继承自基类，所以可以调用基类的属性（但是不建议滥用）
	 * 拓展其它主题有两种方案：
	 * 1. 直接继承自default，会默认拥有default的属性，只需要覆盖自定义功能即可（注意必须覆盖，否则会调用dwfault的默认操作）
	 * 2. 和default一样，继承自 innerUtil.core，这样会与default无关，所以的一切UI都必须自己实现（可以参考default去实现）
	 * 
	 * 一般，在进行一些小修改时，建议继承自default（这样toTop，上拉加载大部分代码都可复用）
	 * 在进行大修改时，建议继承自innerUtil.core，这样可以干干净净的重写主题
	 */
	(function(innerUtil, globalContext) {

	    /**
	     * 一些默认提供的CSS类，一般来说不会变动（由框架提供的）
	     * THEME 字段会根据不同的主题有不同值
	     * 在使用body的scroll时，需要加上样式 CLASS_BODY_SCROLL_WRAP
	     */
	    var CLASS_THEME = 'minirefresh-theme-default';
	    var CLASS_DOWN_WRAP = 'minirefresh-downwrap';
	    var CLASS_UP_WRAP = 'minirefresh-upwrap';
	    var CLASS_FADE_IN = 'minirefresh-fade-in';
	    var CLASS_FADE_OUT = 'minirefresh-fade-out';
	    var CLASS_TO_TOP = 'minirefresh-totop';
	    var CLASS_ROTATE = 'minirefresh-rotate';
	    var CLASS_HARDWARE_SPEEDUP = 'minirefresh-hardware-speedup';
	    var CLASS_HIDDEN = 'minirefresh-hidden';
	    var CLASS_BODY_SCROLL_WRAP = 'body-scroll-wrap';

	    /**
	     * 本主题的特色样式
	     */
	    var CLASS_DOWN_SUCCESS = 'downwrap-success';
	    var CLASS_DOWN_ERROR = 'downwrap-error';
	    
	    /**
	     * 一些常量
	     */
	    var DEFAULT_DOWN_HEIGHT = 75;

	    var defaultSetting = {
	        down: {
	            successAnim: {
	                // 下拉刷新结束后是否有成功动画，默认为false，如果想要有成功刷新xxx条数据这种操作，请设为true，并实现对应hook函数
	                isEnable: false,
	                duration: 300
	            },
	            // 可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
	            contentdown: '下拉刷新',
	            // 可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
	            contentover: '释放刷新',
	            // 可选，正在刷新状态时，下拉刷新控件上显示的标题内容
	            contentrefresh: '加载中...',
	            // 可选，刷新成功的提示，当开启successAnim时才有效
	            contentsuccess: '刷新成功',
	            // 可选，刷新失败的提示，错误回调用到，当开启successAnim时才有效
	            contenterror: '刷新失败',
	            // 是否默认跟随进行css动画
	            isWrapCssTranslate: false
	        },
	        up: {
	            toTop: {
	                // 是否开启点击回到顶部
	                isEnable: true,
	                duration: 300,
	                // 滚动多少距离才显示toTop
	                offset: 800
	            },
	            contentdown: '上拉显示更多',
	            contentrefresh: '加载中...',
	            contentnomore: '没有更多数据了'
	        }
	    };

	    var MiniRefreshTheme = innerUtil.core.extend({
	        init: function(options) {
	            // 拓展自定义的配置
	            options = innerUtil.extend(true, {}, defaultSetting, options);
	            this._super(options);
	        },
	        _initHook: function(isLockDown, isLockUp) {
	            var container = this.container,
	                contentWrap = this.contentWrap;

	            container.classList.add(CLASS_THEME);
	            // 加上硬件加速让动画更流畅
	            contentWrap.classList.add(CLASS_HARDWARE_SPEEDUP);
	            
	            if (this.options.isUseBodyScroll) {
	                // 如果使用了body的scroll，需要增加对应的样式，否则默认的absolute无法被监听到
	                container.classList.add(CLASS_BODY_SCROLL_WRAP);
	                contentWrap.classList.add(CLASS_BODY_SCROLL_WRAP);
	            }

	            this._initDownWrap();
	            this._initUpWrap();
	            this._initToTop();
	        },
	        
	        /**
	         * 刷新的实现，需要根据新配置进行一些更改
	         */
	        _refreshHook: function() {
	            // 如果开关csstranslate，需要兼容
	            if (this.options.down.isWrapCssTranslate) {
	                this._transformDownWrap(-this.downWrapHeight);
	            } else {
	                this._transformDownWrap(0, 0, true);
	            }
	            
	            // toTop的显影控制，如果本身显示了，又更新为隐藏，需要马上隐藏
	            if (!this.options.up.toTop.isEnable) {
	                this.toTopBtn && this.toTopBtn.classList.add(CLASS_HIDDEN);
	                this.isShowToTopBtn = false;
	            }
	        },
	        _initDownWrap: function() {
	            var container = this.container,
	                contentWrap = this.contentWrap,
	                options = this.options;

	            // 下拉的区域
	            var downWrap = document.createElement('div');

	            downWrap.className = CLASS_DOWN_WRAP + ' ' + CLASS_HARDWARE_SPEEDUP;
	            downWrap.innerHTML = '<div class="downwrap-content"><p class="downwrap-progress"></p><p class="downwrap-tips">' + options.down.contentdown + ' </p></div>';
	            container.insertBefore(downWrap, contentWrap);

	            this.downWrap = downWrap;
	            this.downWrapProgress = this.downWrap.querySelector('.downwrap-progress');
	            this.downWrapTips = this.downWrap.querySelector('.downwrap-tips');
	            // 是否能下拉的变量，控制pull时的状态转变
	            this.isCanPullDown = false;
	            
	            this.downWrapHeight = downWrap.offsetHeight || DEFAULT_DOWN_HEIGHT;
	            this._transformDownWrap(-this.downWrapHeight);
	        },
	        _transformDownWrap: function(offset, duration, isForce) {
	            if (!isForce && !this.options.down.isWrapCssTranslate) {
	                return ;
	            }
	            offset = offset || 0;
	            duration = duration || 0;
	            // 记得动画时 translateZ 否则硬件加速会被覆盖
	            this.downWrap.style.webkitTransitionDuration = duration + 'ms';
	            this.downWrap.style.transitionDuration = duration + 'ms';
	            this.downWrap.style.webkitTransform = 'translateY(' + offset + 'px)  translateZ(0px)';
	            this.downWrap.style.transform = 'translateY(' + offset + 'px)  translateZ(0px)';
	        },
	        
	        _initUpWrap: function() {
	            var contentWrap = this.contentWrap,
	                options = this.options;
	            
	            // 上拉区域
	            var upWrap = document.createElement('div');

	            upWrap.className = CLASS_UP_WRAP + ' ' + CLASS_HARDWARE_SPEEDUP;
	            upWrap.innerHTML = '<p class="upwrap-progress"></p><p class="upwrap-tips">' + options.up.contentdown + '</p>';
	            upWrap.style.visibility = 'hidden';
	            contentWrap.appendChild(upWrap);

	            this.upWrap = upWrap;
	            this.upWrapProgress = this.upWrap.querySelector('.upwrap-progress');
	            this.upWrapTips = this.upWrap.querySelector('.upwrap-tips');
	        },
	        
	        /**
	         * 自定义实现一个toTop，由于这个是属于额外的事件所以没有添加的核心中，而是由各自的主题决定是否实现或者实现成什么样子
	         * 不过框架中仍然提供了一个默认的minirefresh-totop样式，可以方便使用
	         */
	        _initToTop: function() {
	            var self = this,
	                options = this.options,
	                toTop = options.up.toTop.isEnable,
	                duration = options.up.toTop.duration;

	            if (toTop) {
	                var toTopBtn = document.createElement('div');

	                toTopBtn.className = CLASS_TO_TOP + ' ' + CLASS_THEME;

	                toTopBtn.onclick = function() {
	                    self.scroller.scrollTo(0, duration);
	                };
	                toTopBtn.classList.add(CLASS_HIDDEN);
	                this.toTopBtn = toTopBtn;
	                this.isShowToTopBtn = false;
	                // 默认添加到body中防止冲突
	                document.body.appendChild(toTopBtn);
	            }
	        },
	        _pullHook: function(downHight, downOffset) {
	            var options = this.options,
	                FULL_DEGREE = 360;

	            if (downHight < downOffset) {
	                if (this.isCanPullDown) {
	                    this.downWrapTips.innerText = options.down.contentdown;
	                    this.isCanPullDown = false;
	                }
	            } else {
	                if (!this.isCanPullDown) {
	                    this.downWrapTips.innerText = options.down.contentover;
	                    this.isCanPullDown = true;
	                }
	            }

	            var rate = downHight / downOffset,
	                progress = FULL_DEGREE * rate;

	            this.downWrapProgress.style.webkitTransform = 'rotate(' + progress + 'deg)';
	            this.downWrapProgress.style.transform = 'rotate(' + progress + 'deg)';
	            this._transformDownWrap(-this.downWrapHeight + downHight);
	        },
	        _scrollHook: function(scrollTop) {
	            // 用来判断toTop
	            var options = this.options,
	                toTop = options.up.toTop.isEnable,
	                toTopBtn = this.toTopBtn;

	            if (toTop && toTopBtn) {
	                if (scrollTop >= options.up.toTop.offset) {
	                    if (!this.isShowToTopBtn) {
	                        toTopBtn.classList.remove(CLASS_FADE_OUT);
	                        toTopBtn.classList.remove(CLASS_HIDDEN);
	                        toTopBtn.classList.add(CLASS_FADE_IN);
	                        this.isShowToTopBtn = true;
	                    }
	                } else {
	                    if (this.isShowToTopBtn) {
	                        toTopBtn.classList.add(CLASS_FADE_OUT);
	                        toTopBtn.classList.remove(CLASS_FADE_IN);
	                        this.isShowToTopBtn = false;
	                    }
	                }
	            }
	        },
	        _downLoaingHook: function() {
	            // 默认和contentWrap的同步
	            this._transformDownWrap(-this.downWrapHeight + this.options.down.offset, this.options.down.bounceTime);
	            this.downWrapTips.innerText = this.options.down.contentrefresh;
	            this.downWrapProgress.classList.add(CLASS_ROTATE);
	        },
	        _downLoaingSuccessHook: function(isSuccess, successTips) {
	            this.options.down.contentsuccess = successTips || this.options.down.contentsuccess;
	            this.downWrapTips.innerText = isSuccess ? this.options.down.contentsuccess : this.options.down.contenterror;
	            this.downWrapProgress.classList.remove(CLASS_ROTATE);
	            this.downWrapProgress.classList.add(CLASS_FADE_OUT);
	            this.downWrapProgress.classList.add(isSuccess ? CLASS_DOWN_SUCCESS : CLASS_DOWN_ERROR);
	        },
	        _downLoaingEndHook: function(isSuccess) {
	            this.downWrapTips.innerText = this.options.down.contentdown;
	            this.downWrapProgress.classList.remove(CLASS_ROTATE);
	            this.downWrapProgress.classList.remove(CLASS_FADE_OUT);
	            this.downWrapProgress.classList.remove(isSuccess ? CLASS_DOWN_SUCCESS : CLASS_DOWN_ERROR);
	            // 默认为不可见
	            // 需要重置回来
	            this.isCanPullDown = false;
	            this._transformDownWrap(-this.downWrapHeight, this.options.down.bounceTime);
	        },
	        _cancelLoaingHook: function() {
	            this._transformDownWrap(-this.downWrapHeight, this.options.down.bounceTime);
	        },
	        _upLoaingHook: function(isShowUpLoading) {
	            if (isShowUpLoading) {
	                this.upWrapTips.innerText = this.options.up.contentrefresh;
	                this.upWrapProgress.classList.add(CLASS_ROTATE);
	                this.upWrapProgress.classList.remove(CLASS_HIDDEN);
	                this.upWrap.style.visibility = 'visible';
	            } else {
	                this.upWrap.style.visibility = 'hidden';
	            }

	        },
	        _upLoaingEndHook: function(isFinishUp) {
	            if (!isFinishUp) {
	                // 接下来还可以加载更多
	                this.upWrap.style.visibility = 'hidden';
	                this.upWrapTips.innerText = this.options.up.contentdown;
	            } else {
	                // 已经没有更多数据了
	                this.upWrap.style.visibility = 'visible';
	                this.upWrapTips.innerText = this.options.up.contentnomore;
	            }
	            this.upWrapProgress.classList.remove(CLASS_ROTATE);
	            this.upWrapProgress.classList.add(CLASS_HIDDEN);
	        },
	        _lockUpLoadingHook: function(isLock) {
	            this.upWrap.style.visibility = isLock ? 'hidden' : 'visible';
	        },
	        _lockDownLoadingHook: function(isLock) {
	            this.downWrap.style.visibility = isLock ? 'hidden' : 'visible';
	        }
	    });

	    // 挂载主题，这样多个主题可以并存，default是关键字，所以使用了defaults
	    innerUtil.namespace('theme.defaults', MiniRefreshTheme);

	    // 覆盖全局对象，使的全局对象只会指向一个最新的主题
	    globalContext.MiniRefresh = MiniRefreshTheme;

	})(MiniRefreshTools, typeof window !== 'undefined' ? window : global);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * core-decorators.js
	 * (c) 2016 Jay Phelps and contributors
	 * MIT Licensed
	 * https://github.com/jayphelps/core-decorators.js
	 * @license
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	var _override = __webpack_require__(12);

	exports.override = _interopRequire(_override);

	var _deprecate = __webpack_require__(15);

	exports.deprecate = _interopRequire(_deprecate);
	exports.deprecated = _interopRequire(_deprecate);

	var _suppressWarnings = __webpack_require__(16);

	exports.suppressWarnings = _interopRequire(_suppressWarnings);

	var _memoize = __webpack_require__(17);

	exports.memoize = _interopRequire(_memoize);

	var _autobind = __webpack_require__(18);

	exports.autobind = _interopRequire(_autobind);

	var _readonly = __webpack_require__(19);

	exports.readonly = _interopRequire(_readonly);

	var _enumerable = __webpack_require__(20);

	exports.enumerable = _interopRequire(_enumerable);

	var _nonenumerable = __webpack_require__(21);

	exports.nonenumerable = _interopRequire(_nonenumerable);

	var _nonconfigurable = __webpack_require__(22);

	exports.nonconfigurable = _interopRequire(_nonconfigurable);

	var _debounce = __webpack_require__(23);

	exports.debounce = _interopRequire(_debounce);

	var _throttle = __webpack_require__(24);

	exports.throttle = _interopRequire(_throttle);

	var _decorate = __webpack_require__(25);

	exports.decorate = _interopRequire(_decorate);

	var _mixin = __webpack_require__(26);

	exports.mixin = _interopRequire(_mixin);
	exports.mixins = _interopRequire(_mixin);

	var _lazyInitialize = __webpack_require__(14);

	exports.lazyInitialize = _interopRequire(_lazyInitialize);

	var _time = __webpack_require__(27);

	exports.time = _interopRequire(_time);

	var _extendDescriptor = __webpack_require__(28);

	exports.extendDescriptor = _interopRequire(_extendDescriptor);

	// Helper to apply decorators to a class without transpiler support

	var _applyDecorators = __webpack_require__(29);

	exports.applyDecorators = _interopRequire(_applyDecorators);

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	exports['default'] = override;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _privateUtils = __webpack_require__(13);

	var GENERIC_FUNCTION_ERROR = '{child} does not properly override {parent}';
	var FUNCTION_REGEXP = /^function ([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?(\([^\)]*\))[\s\S]+$/;

	var SyntaxErrorReporter = (function () {
	  _createClass(SyntaxErrorReporter, [{
	    key: '_getTopic',
	    value: function _getTopic(descriptor) {
	      if (descriptor === undefined) {
	        return null;
	      }

	      if ('value' in descriptor) {
	        return descriptor.value;
	      }

	      if ('get' in descriptor) {
	        return descriptor.get;
	      }

	      if ('set' in descriptor) {
	        return descriptor.set;
	      }
	    }
	  }, {
	    key: '_extractTopicSignature',
	    value: function _extractTopicSignature(topic) {
	      switch (typeof topic) {
	        case 'function':
	          return this._extractFunctionSignature(topic);
	        default:
	          return this.key;
	      }
	    }
	  }, {
	    key: '_extractFunctionSignature',
	    value: function _extractFunctionSignature(fn) {
	      var _this = this;

	      return fn.toString().replace(FUNCTION_REGEXP, function (match, name, params) {
	        if (name === undefined) name = _this.key;
	        return name + params;
	      });
	    }
	  }, {
	    key: 'key',
	    get: function get() {
	      return this.childDescriptor.key;
	    }
	  }, {
	    key: 'parentNotation',
	    get: function get() {
	      return this.parentKlass.constructor.name + '#' + this.parentPropertySignature;
	    }
	  }, {
	    key: 'childNotation',
	    get: function get() {
	      return this.childKlass.constructor.name + '#' + this.childPropertySignature;
	    }
	  }, {
	    key: 'parentTopic',
	    get: function get() {
	      return this._getTopic(this.parentDescriptor);
	    }
	  }, {
	    key: 'childTopic',
	    get: function get() {
	      return this._getTopic(this.childDescriptor);
	    }
	  }, {
	    key: 'parentPropertySignature',
	    get: function get() {
	      return this._extractTopicSignature(this.parentTopic);
	    }
	  }, {
	    key: 'childPropertySignature',
	    get: function get() {
	      return this._extractTopicSignature(this.childTopic);
	    }
	  }]);

	  function SyntaxErrorReporter(parentKlass, childKlass, parentDescriptor, childDescriptor) {
	    _classCallCheck(this, SyntaxErrorReporter);

	    this.parentKlass = parentKlass;
	    this.childKlass = childKlass;
	    this.parentDescriptor = parentDescriptor;
	    this.childDescriptor = childDescriptor;
	  }

	  _createClass(SyntaxErrorReporter, [{
	    key: 'assert',
	    value: function assert(condition) {
	      var msg = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

	      if (condition !== true) {
	        this.error(GENERIC_FUNCTION_ERROR + msg);
	      }
	    }
	  }, {
	    key: 'error',
	    value: function error(msg) {
	      var _this2 = this;

	      msg = msg
	      // Replace lazily, because they actually might not
	      // be available in all cases
	      .replace('{parent}', function (m) {
	        return _this2.parentNotation;
	      }).replace('{child}', function (m) {
	        return _this2.childNotation;
	      });
	      throw new SyntaxError(msg);
	    }
	  }]);

	  return SyntaxErrorReporter;
	})();

	function getDescriptorType(descriptor) {
	  if (descriptor.hasOwnProperty('value')) {
	    return 'data';
	  }

	  if (descriptor.hasOwnProperty('get') || descriptor.hasOwnProperty('set')) {
	    return 'accessor';
	  }

	  // If none of them exist, browsers treat it as
	  // a data descriptor with a value of `undefined`
	  return 'data';
	}

	function checkFunctionSignatures(parent, child, reporter) {
	  reporter.assert(parent.length === child.length);
	}

	function checkDataDescriptors(parent, child, reporter) {
	  var parentValueType = typeof parent.value;
	  var childValueType = typeof child.value;

	  if (parentValueType === 'undefined' && childValueType === 'undefined') {
	    // class properties can be any expression, which isn't ran until the
	    // the instance is created, so we can't reliably get type information
	    // for them yet (per spec). Perhaps when Babel includes flow-type info
	    // in runtime? Tried regex solutions, but super hacky and only feasible
	    // on primitives, which is confusing for usage...
	    reporter.error('descriptor values are both undefined. (class properties are are not currently supported)\'');
	  }

	  if (parentValueType !== childValueType) {
	    var isFunctionOverUndefined = childValueType === 'function' && parentValueType === undefined;
	    // Even though we don't support class properties, this
	    // will still handle more than just functions, just in case.
	    // Shadowing an undefined value is an error if the inherited
	    // value was undefined (usually a class property, not a method)
	    if (isFunctionOverUndefined || parentValueType !== undefined) {
	      reporter.error('value types do not match. {parent} is "' + parentValueType + '", {child} is "' + childValueType + '"');
	    }
	  }

	  // Switch, in preparation for supporting more types
	  switch (childValueType) {
	    case 'function':
	      checkFunctionSignatures(parent.value, child.value, reporter);
	      break;

	    default:
	      reporter.error('Unexpected error. Please file a bug with: {parent} is "' + parentValueType + '", {child} is "' + childValueType + '"');
	      break;
	  }
	}

	function checkAccessorDescriptors(parent, child, reporter) {
	  var parentHasGetter = typeof parent.get === 'function';
	  var childHasGetter = typeof child.get === 'function';
	  var parentHasSetter = typeof parent.set === 'function';
	  var childHasSetter = typeof child.set === 'function';

	  if (parentHasGetter || childHasGetter) {
	    if (!parentHasGetter && parentHasSetter) {
	      reporter.error('{parent} is setter but {child} is getter');
	    }

	    if (!childHasGetter && childHasSetter) {
	      reporter.error('{parent} is getter but {child} is setter');
	    }

	    checkFunctionSignatures(parent.get, child.get, reporter);
	  }

	  if (parentHasSetter || childHasSetter) {
	    if (!parentHasSetter && parentHasGetter) {
	      reporter.error('{parent} is getter but {child} is setter');
	    }

	    if (!childHasSetter && childHasGetter) {
	      reporter.error('{parent} is setter but {child} is getter');
	    }

	    checkFunctionSignatures(parent.set, child.set, reporter);
	  }
	}

	function checkDescriptors(parent, child, reporter) {
	  var parentType = getDescriptorType(parent);
	  var childType = getDescriptorType(child);

	  if (parentType !== childType) {
	    reporter.error('descriptor types do not match. {parent} is "' + parentType + '", {child} is "' + childType + '"');
	  }

	  switch (childType) {
	    case 'data':
	      checkDataDescriptors(parent, child, reporter);
	      break;

	    case 'accessor':
	      checkAccessorDescriptors(parent, child, reporter);
	      break;
	  }
	}

	var suggestionTransforms = [function (key) {
	  return key.toLowerCase();
	}, function (key) {
	  return key.toUpperCase();
	}, function (key) {
	  return key + 's';
	}, function (key) {
	  return key.slice(0, -1);
	}, function (key) {
	  return key.slice(1, key.length);
	}];

	function findPossibleAlternatives(superKlass, key) {
	  for (var i = 0, l = suggestionTransforms.length; i < l; i++) {
	    var fn = suggestionTransforms[i];
	    var suggestion = fn(key);

	    if (suggestion in superKlass) {
	      return suggestion;
	    }
	  }

	  return null;
	}

	function handleDescriptor(target, key, descriptor) {
	  descriptor.key = key;
	  var superKlass = Object.getPrototypeOf(target);
	  var superDescriptor = Object.getOwnPropertyDescriptor(superKlass, key);
	  var reporter = new SyntaxErrorReporter(superKlass, target, superDescriptor, descriptor);

	  if (superDescriptor === undefined) {
	    var suggestedKey = findPossibleAlternatives(superKlass, key);
	    var suggestion = suggestedKey ? '\n\n  Did you mean "' + suggestedKey + '"?' : '';
	    reporter.error('No descriptor matching {child} was found on the prototype chain.' + suggestion);
	  }

	  checkDescriptors(superDescriptor, descriptor, reporter);

	  return descriptor;
	}

	function override() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return (0, _privateUtils.decorate)(handleDescriptor, args);
	}

	module.exports = exports['default'];

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var _slice = Array.prototype.slice;

	var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

	exports.isDescriptor = isDescriptor;
	exports.decorate = decorate;
	exports.metaFor = metaFor;
	exports.getOwnPropertyDescriptors = getOwnPropertyDescriptors;
	exports.createDefaultSetter = createDefaultSetter;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

	var _lazyInitialize = __webpack_require__(14);

	var _lazyInitialize2 = _interopRequireDefault(_lazyInitialize);

	var defineProperty = Object.defineProperty;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	var getOwnPropertyNames = Object.getOwnPropertyNames;
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;

	function isDescriptor(desc) {
	  if (!desc || !desc.hasOwnProperty) {
	    return false;
	  }

	  var keys = ['value', 'initializer', 'get', 'set'];

	  for (var i = 0, l = keys.length; i < l; i++) {
	    if (desc.hasOwnProperty(keys[i])) {
	      return true;
	    }
	  }

	  return false;
	}

	function decorate(handleDescriptor, entryArgs) {
	  if (isDescriptor(entryArgs[entryArgs.length - 1])) {
	    return handleDescriptor.apply(undefined, _toConsumableArray(entryArgs).concat([[]]));
	  } else {
	    return function () {
	      return handleDescriptor.apply(undefined, _slice.call(arguments).concat([entryArgs]));
	    };
	  }
	}

	var Meta = (function () {
	  var _instanceInitializers = {};

	  function Meta() {
	    _classCallCheck(this, Meta);

	    _defineDecoratedPropertyDescriptor(this, 'debounceTimeoutIds', _instanceInitializers);

	    _defineDecoratedPropertyDescriptor(this, 'throttleTimeoutIds', _instanceInitializers);

	    _defineDecoratedPropertyDescriptor(this, 'throttlePreviousTimestamps', _instanceInitializers);

	    _defineDecoratedPropertyDescriptor(this, 'throttleTrailingArgs', _instanceInitializers);
	  }

	  _createDecoratedClass(Meta, [{
	    key: 'debounceTimeoutIds',
	    decorators: [_lazyInitialize2['default']],
	    initializer: function initializer() {
	      return {};
	    },
	    enumerable: true
	  }, {
	    key: 'throttleTimeoutIds',
	    decorators: [_lazyInitialize2['default']],
	    initializer: function initializer() {
	      return {};
	    },
	    enumerable: true
	  }, {
	    key: 'throttlePreviousTimestamps',
	    decorators: [_lazyInitialize2['default']],
	    initializer: function initializer() {
	      return {};
	    },
	    enumerable: true
	  }, {
	    key: 'throttleTrailingArgs',
	    decorators: [_lazyInitialize2['default']],
	    initializer: function initializer() {
	      return null;
	    },
	    enumerable: true
	  }], null, _instanceInitializers);

	  return Meta;
	})();

	var META_KEY = typeof Symbol === 'function' ? Symbol('__core_decorators__') : '__core_decorators__';

	function metaFor(obj) {
	  if (obj.hasOwnProperty(META_KEY) === false) {
	    defineProperty(obj, META_KEY, {
	      // Defaults: NOT enumerable, configurable, or writable
	      value: new Meta()
	    });
	  }

	  return obj[META_KEY];
	}

	var getOwnKeys = getOwnPropertySymbols ? function (object) {
	  return getOwnPropertyNames(object).concat(getOwnPropertySymbols(object));
	} : getOwnPropertyNames;

	exports.getOwnKeys = getOwnKeys;

	function getOwnPropertyDescriptors(obj) {
	  var descs = {};

	  getOwnKeys(obj).forEach(function (key) {
	    return descs[key] = getOwnPropertyDescriptor(obj, key);
	  });

	  return descs;
	}

	function createDefaultSetter(key) {
	  return function set(newValue) {
	    Object.defineProperty(this, key, {
	      configurable: true,
	      writable: true,
	      // IS enumerable when reassigned by the outside word
	      enumerable: true,
	      value: newValue
	    });

	    return newValue;
	  };
	}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = lazyInitialize;

	var _privateUtils = __webpack_require__(13);

	var defineProperty = Object.defineProperty;

	function handleDescriptor(target, key, descriptor) {
	  var configurable = descriptor.configurable;
	  var enumerable = descriptor.enumerable;
	  var initializer = descriptor.initializer;
	  var value = descriptor.value;

	  return {
	    configurable: configurable,
	    enumerable: enumerable,

	    get: function get() {
	      // This happens if someone accesses the
	      // property directly on the prototype
	      if (this === target) {
	        return;
	      }

	      var ret = initializer ? initializer.call(this) : value;

	      defineProperty(this, key, {
	        configurable: configurable,
	        enumerable: enumerable,
	        writable: true,
	        value: ret
	      });

	      return ret;
	    },

	    set: (0, _privateUtils.createDefaultSetter)(key)
	  };
	}

	function lazyInitialize() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return (0, _privateUtils.decorate)(handleDescriptor, args);
	}

	module.exports = exports['default'];

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = deprecate;

	var _privateUtils = __webpack_require__(13);

	var DEFAULT_MSG = 'This function will be removed in future versions.';

	function handleDescriptor(target, key, descriptor, _ref) {
	  var _ref2 = _slicedToArray(_ref, 2);

	  var _ref2$0 = _ref2[0];
	  var msg = _ref2$0 === undefined ? DEFAULT_MSG : _ref2$0;
	  var _ref2$1 = _ref2[1];
	  var options = _ref2$1 === undefined ? {} : _ref2$1;

	  if (typeof descriptor.value !== 'function') {
	    throw new SyntaxError('Only functions can be marked as deprecated');
	  }

	  var methodSignature = target.constructor.name + '#' + key;

	  if (options.url) {
	    msg += '\n\n    See ' + options.url + ' for more details.\n\n';
	  }

	  return _extends({}, descriptor, {
	    value: function deprecationWrapper() {
	      console.warn('DEPRECATION ' + methodSignature + ': ' + msg);
	      return descriptor.value.apply(this, arguments);
	    }
	  });
	}

	function deprecate() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return (0, _privateUtils.decorate)(handleDescriptor, args);
	}

	module.exports = exports['default'];

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = suppressWarnings;

	var _privateUtils = __webpack_require__(13);

	function suppressedWarningNoop() {
	  // Warnings are currently suppressed via @suppressWarnings
	}

	function applyWithoutWarnings(context, fn, args) {
	  if (typeof console === 'object') {
	    var nativeWarn = console.warn;
	    console.warn = suppressedWarningNoop;
	    var ret = fn.apply(context, args);
	    console.warn = nativeWarn;
	    return ret;
	  } else {
	    return fn.apply(context, args);
	  }
	}

	function handleDescriptor(target, key, descriptor) {
	  return _extends({}, descriptor, {
	    value: function suppressWarningsWrapper() {
	      return applyWithoutWarnings(this, descriptor.value, arguments);
	    }
	  });
	}

	function suppressWarnings() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return (0, _privateUtils.decorate)(handleDescriptor, args);
	}

	module.exports = exports['default'];

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = memoize;

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var _privateUtils = __webpack_require__(13);

	function toObject(cache, value) {
	  if (value === Object(value)) {
	    return value;
	  }
	  return cache[value] || (cache[value] = {});
	}

	function applyAndCache(context, fn, args, cache, signature) {
	  var ret = fn.apply(context, args);
	  cache[signature] = ret;
	  return ret;
	}

	function metaForDescriptor(descriptor) {
	  var fn = undefined,
	      wrapKey = undefined;

	  // This is ugly code, but way faster than other
	  // ways I tried that *looked* pretty

	  if (descriptor.value) {
	    fn = descriptor.value;
	    wrapKey = 'value';
	  } else if (descriptor.get) {
	    fn = descriptor.get;
	    wrapKey = 'get';
	  } else if (descriptor.set) {
	    fn = descriptor.set;
	    wrapKey = 'set';
	  }

	  return { fn: fn, wrapKey: wrapKey };
	}

	function handleDescriptor(target, key, descriptor) {
	  console.warn('DEPRECATION: @memoize is deprecated and will be removed shortly. Use @decorate with lodash\'s memoize helper.\n\n  https://github.com/jayphelps/core-decorators.js#decorate');

	  var _metaForDescriptor = metaForDescriptor(descriptor);

	  var fn = _metaForDescriptor.fn;
	  var wrapKey = _metaForDescriptor.wrapKey;

	  var argumentCache = new WeakMap();
	  var signatureCache = Object.create(null);
	  var primativeRefCache = Object.create(null);
	  var argumentIdCounter = 0;

	  return _extends({}, descriptor, _defineProperty({}, wrapKey, function memoizeWrapper() {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    var signature = '0';

	    for (var i = 0, l = args.length; i < l; i++) {
	      var arg = args[i];
	      var argRef = toObject(primativeRefCache, arg);
	      var argKey = argumentCache.get(argRef);

	      if (argKey === undefined) {
	        argKey = ++argumentIdCounter;
	        argumentCache.set(argRef, argKey);
	      }

	      signature += argKey;
	    }

	    return signatureCache[signature] || applyAndCache(this, fn, arguments, signatureCache, signature);
	  }));
	}

	function memoize() {
	  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	    args[_key2] = arguments[_key2];
	  }

	  return (0, _privateUtils.decorate)(handleDescriptor, args);
	}

	module.exports = exports['default'];

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = autobind;

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

	var _privateUtils = __webpack_require__(13);

	var defineProperty = Object.defineProperty;
	var getPrototypeOf = Object.getPrototypeOf;

	function bind(fn, context) {
	  if (fn.bind) {
	    return fn.bind(context);
	  } else {
	    return function __autobind__() {
	      return fn.apply(context, arguments);
	    };
	  }
	}

	var mapStore = undefined;

	function getBoundSuper(obj, fn) {
	  if (typeof WeakMap === 'undefined') {
	    throw new Error('Using @autobind on ' + fn.name + '() requires WeakMap support due to its use of super.' + fn.name + '()\n      See https://github.com/jayphelps/core-decorators.js/issues/20');
	  }

	  if (!mapStore) {
	    mapStore = new WeakMap();
	  }

	  if (mapStore.has(obj) === false) {
	    mapStore.set(obj, new WeakMap());
	  }

	  var superStore = mapStore.get(obj);

	  if (superStore.has(fn) === false) {
	    superStore.set(fn, bind(fn, obj));
	  }

	  return superStore.get(fn);
	}

	function autobindClass(klass) {
	  var descs = (0, _privateUtils.getOwnPropertyDescriptors)(klass.prototype);
	  var keys = (0, _privateUtils.getOwnKeys)(descs);

	  for (var i = 0, l = keys.length; i < l; i++) {
	    var key = keys[i];
	    var desc = descs[key];

	    if (typeof desc.value !== 'function' || key === 'constructor') {
	      continue;
	    }

	    defineProperty(klass.prototype, key, autobindMethod(klass.prototype, key, desc));
	  }
	}

	function autobindMethod(target, key, _ref) {
	  var fn = _ref.value;
	  var configurable = _ref.configurable;
	  var enumerable = _ref.enumerable;

	  if (typeof fn !== 'function') {
	    throw new SyntaxError('@autobind can only be used on functions, not: ' + fn);
	  }

	  var constructor = target.constructor;

	  return {
	    configurable: configurable,
	    enumerable: enumerable,

	    get: function get() {
	      // Class.prototype.key lookup
	      // Someone accesses the property directly on the prototype on which it is
	      // actually defined on, i.e. Class.prototype.hasOwnProperty(key)
	      if (this === target) {
	        return fn;
	      }

	      // Class.prototype.key lookup
	      // Someone accesses the property directly on a prototype but it was found
	      // up the chain, not defined directly on it
	      // i.e. Class.prototype.hasOwnProperty(key) == false && key in Class.prototype
	      if (this.constructor !== constructor && getPrototypeOf(this).constructor === constructor) {
	        return fn;
	      }

	      // Autobound method calling super.sameMethod() which is also autobound and so on.
	      if (this.constructor !== constructor && key in this.constructor.prototype) {
	        return getBoundSuper(this, fn);
	      }

	      var boundFn = bind(fn, this);

	      defineProperty(this, key, {
	        configurable: true,
	        writable: true,
	        // NOT enumerable when it's a bound method
	        enumerable: false,
	        value: boundFn
	      });

	      return boundFn;
	    },
	    set: (0, _privateUtils.createDefaultSetter)(key)
	  };
	}

	function handle(args) {
	  if (args.length === 1) {
	    return autobindClass.apply(undefined, _toConsumableArray(args));
	  } else {
	    return autobindMethod.apply(undefined, _toConsumableArray(args));
	  }
	}

	function autobind() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  if (args.length === 0) {
	    return function () {
	      return handle(arguments);
	    };
	  } else {
	    return handle(args);
	  }
	}

	module.exports = exports['default'];

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = readonly;

	var _privateUtils = __webpack_require__(13);

	function handleDescriptor(target, key, descriptor) {
	  descriptor.writable = false;
	  return descriptor;
	}

	function readonly() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return (0, _privateUtils.decorate)(handleDescriptor, args);
	}

	module.exports = exports['default'];

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = enumerable;

	var _privateUtils = __webpack_require__(13);

	function handleDescriptor(target, key, descriptor) {
	  descriptor.enumerable = true;
	  return descriptor;
	}

	function enumerable() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return (0, _privateUtils.decorate)(handleDescriptor, args);
	}

	module.exports = exports['default'];

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = nonenumerable;

	var _privateUtils = __webpack_require__(13);

	function handleDescriptor(target, key, descriptor) {
	  descriptor.enumerable = false;
	  return descriptor;
	}

	function nonenumerable() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return (0, _privateUtils.decorate)(handleDescriptor, args);
	}

	module.exports = exports['default'];

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = nonconfigurable;

	var _privateUtils = __webpack_require__(13);

	function handleDescriptor(target, key, descriptor) {
	  descriptor.configurable = false;
	  return descriptor;
	}

	function nonconfigurable() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return (0, _privateUtils.decorate)(handleDescriptor, args);
	}

	module.exports = exports['default'];

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = debounce;

	var _privateUtils = __webpack_require__(13);

	var DEFAULT_TIMEOUT = 300;

	function handleDescriptor(target, key, descriptor, _ref) {
	  var _ref2 = _slicedToArray(_ref, 2);

	  var _ref2$0 = _ref2[0];
	  var wait = _ref2$0 === undefined ? DEFAULT_TIMEOUT : _ref2$0;
	  var _ref2$1 = _ref2[1];
	  var immediate = _ref2$1 === undefined ? false : _ref2$1;

	  var callback = descriptor.value;

	  if (typeof callback !== 'function') {
	    throw new SyntaxError('Only functions can be debounced');
	  }

	  return _extends({}, descriptor, {
	    value: function value() {
	      var _this = this;

	      var _metaFor = (0, _privateUtils.metaFor)(this);

	      var debounceTimeoutIds = _metaFor.debounceTimeoutIds;

	      var timeout = debounceTimeoutIds[key];
	      var callNow = immediate && !timeout;
	      var args = arguments;

	      clearTimeout(timeout);

	      debounceTimeoutIds[key] = setTimeout(function () {
	        delete debounceTimeoutIds[key];
	        if (!immediate) {
	          callback.apply(_this, args);
	        }
	      }, wait);

	      if (callNow) {
	        callback.apply(this, args);
	      }
	    }
	  });
	}

	function debounce() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return (0, _privateUtils.decorate)(handleDescriptor, args);
	}

	module.exports = exports['default'];

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = throttle;

	var _privateUtils = __webpack_require__(13);

	var DEFAULT_TIMEOUT = 300;

	function handleDescriptor(target, key, descriptor, _ref) {
	  var _ref2 = _slicedToArray(_ref, 2);

	  var _ref2$0 = _ref2[0];
	  var wait = _ref2$0 === undefined ? DEFAULT_TIMEOUT : _ref2$0;
	  var _ref2$1 = _ref2[1];
	  var options = _ref2$1 === undefined ? {} : _ref2$1;

	  var callback = descriptor.value;

	  if (typeof callback !== 'function') {
	    throw new SyntaxError('Only functions can be throttled');
	  }

	  if (options.leading !== false) {
	    options.leading = true;
	  }

	  if (options.trailing !== false) {
	    options.trailing = true;
	  }

	  return _extends({}, descriptor, {
	    value: function value() {
	      var _this = this;

	      var meta = (0, _privateUtils.metaFor)(this);
	      var throttleTimeoutIds = meta.throttleTimeoutIds;
	      var throttlePreviousTimestamps = meta.throttlePreviousTimestamps;

	      var timeout = throttleTimeoutIds[key];
	      // last execute timestamp
	      var previous = throttlePreviousTimestamps[key] || 0;
	      var now = Date.now();

	      if (options.trailing) {
	        meta.throttleTrailingArgs = arguments;
	      }

	      // if first be called and disable the execution on the leading edge
	      // set last execute timestamp to now
	      if (!previous && options.leading === false) {
	        previous = now;
	      }

	      var remaining = wait - (now - previous);

	      if (remaining <= 0) {
	        clearTimeout(timeout);
	        delete throttleTimeoutIds[key];
	        throttlePreviousTimestamps[key] = now;
	        callback.apply(this, arguments);
	      } else if (!timeout && options.trailing) {
	        throttleTimeoutIds[key] = setTimeout(function () {
	          throttlePreviousTimestamps[key] = options.leading === false ? 0 : Date.now();
	          delete throttleTimeoutIds[key];
	          callback.apply(_this, meta.throttleTrailingArgs);
	          // don't leak memory!
	          meta.throttleTrailingArgs = null;
	        }, remaining);
	      }
	    }
	  });
	}

	function throttle() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return (0, _privateUtils.decorate)(handleDescriptor, args);
	}

	module.exports = exports['default'];

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = decorate;

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

	function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

	var _privateUtils = __webpack_require__(13);

	var defineProperty = Object.defineProperty;

	function handleDescriptor(target, key, descriptor, _ref) {
	  var _ref2 = _toArray(_ref);

	  var decorator = _ref2[0];

	  var args = _ref2.slice(1);

	  var configurable = descriptor.configurable;
	  var enumerable = descriptor.enumerable;
	  var writable = descriptor.writable;

	  var originalGet = descriptor.get;
	  var originalSet = descriptor.set;
	  var originalValue = descriptor.value;
	  var isGetter = !!originalGet;

	  return {
	    configurable: configurable,
	    enumerable: enumerable,
	    get: function get() {
	      var fn = isGetter ? originalGet.call(this) : originalValue;
	      var value = decorator.call.apply(decorator, [this, fn].concat(_toConsumableArray(args)));

	      if (isGetter) {
	        return value;
	      } else {
	        var desc = {
	          configurable: configurable,
	          enumerable: enumerable
	        };

	        desc.value = value;
	        desc.writable = writable;

	        defineProperty(this, key, desc);

	        return value;
	      }
	    },
	    set: isGetter ? originalSet : (0, _privateUtils.createDefaultSetter)()
	  };
	}

	function decorate() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return (0, _privateUtils.decorate)(handleDescriptor, args);
	}

	module.exports = exports['default'];

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = mixin;

	var _privateUtils = __webpack_require__(13);

	var defineProperty = Object.defineProperty;
	var getPrototypeOf = Object.getPrototypeOf;

	function buggySymbol(symbol) {
	  return Object.prototype.toString.call(symbol) === '[object Symbol]' && typeof symbol === 'object';
	}

	function hasProperty(prop, obj) {
	  // We have to traverse manually prototypes' chain for polyfilled ES6 Symbols
	  // like "in" operator does.
	  // I.e.: Babel 5 Symbol polyfill stores every created symbol in Object.prototype.
	  // That's why we cannot use construction like "prop in obj" to check, if needed
	  // prop actually exists in given object/prototypes' chain.
	  if (buggySymbol(prop)) {
	    do {
	      if (obj === Object.prototype) {
	        // Polyfill assigns undefined as value for stored symbol key.
	        // We can assume in this special case if there is nothing assigned it doesn't exist.
	        return typeof obj[prop] !== 'undefined';
	      }
	      if (obj.hasOwnProperty(prop)) {
	        return true;
	      }
	    } while (obj = getPrototypeOf(obj));
	    return false;
	  } else {
	    return prop in obj;
	  }
	}

	function handleClass(target, mixins) {
	  if (!mixins.length) {
	    throw new SyntaxError('@mixin() class ' + target.name + ' requires at least one mixin as an argument');
	  }

	  for (var i = 0, l = mixins.length; i < l; i++) {
	    var descs = (0, _privateUtils.getOwnPropertyDescriptors)(mixins[i]);
	    var keys = (0, _privateUtils.getOwnKeys)(descs);

	    for (var j = 0, k = keys.length; j < k; j++) {
	      var key = keys[j];

	      if (!hasProperty(key, target.prototype)) {
	        defineProperty(target.prototype, key, descs[key]);
	      }
	    }
	  }
	}

	function mixin() {
	  for (var _len = arguments.length, mixins = Array(_len), _key = 0; _key < _len; _key++) {
	    mixins[_key] = arguments[_key];
	  }

	  if (typeof mixins[0] === 'function') {
	    return handleClass(mixins[0], []);
	  } else {
	    return function (target) {
	      return handleClass(target, mixins);
	    };
	  }
	}

	module.exports = exports['default'];

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = time;

	var _privateUtils = __webpack_require__(13);

	var labels = {};

	// Exported for mocking in tests
	var defaultConsole = {
	  time: console.time ? console.time.bind(console) : function (label) {
	    labels[label] = new Date();
	  },
	  timeEnd: console.timeEnd ? console.timeEnd.bind(console) : function (label) {
	    var timeNow = new Date();
	    var timeTaken = timeNow - labels[label];
	    delete labels[label];
	    console.log(label + ': ' + timeTaken + 'ms');
	  }
	};

	exports.defaultConsole = defaultConsole;
	var count = 0;

	function handleDescriptor(target, key, descriptor, _ref) {
	  var _ref2 = _slicedToArray(_ref, 2);

	  var _ref2$0 = _ref2[0];
	  var prefix = _ref2$0 === undefined ? null : _ref2$0;
	  var _ref2$1 = _ref2[1];
	  var console = _ref2$1 === undefined ? defaultConsole : _ref2$1;

	  var fn = descriptor.value;

	  if (prefix === null) {
	    prefix = target.constructor.name + '.' + key;
	  }

	  if (typeof fn !== 'function') {
	    throw new SyntaxError('@time can only be used on functions, not: ' + fn);
	  }

	  return _extends({}, descriptor, {
	    value: function value() {
	      var label = prefix + '-' + count;
	      count++;
	      console.time(label);

	      try {
	        return fn.apply(this, arguments);
	      } finally {
	        console.timeEnd(label);
	      }
	    }
	  });
	}

	function time() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return (0, _privateUtils.decorate)(handleDescriptor, args);
	}

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = extendDescriptor;

	var _privateUtils = __webpack_require__(13);

	var getPrototypeOf = Object.getPrototypeOf;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	function handleDescriptor(target, key, descriptor) {
	  var superKlass = getPrototypeOf(target);
	  var superDesc = getOwnPropertyDescriptor(superKlass, key);

	  return _extends({}, superDesc, {
	    value: descriptor.value,
	    initializer: descriptor.initializer,
	    get: descriptor.get || superDesc.get,
	    set: descriptor.set || superDesc.set
	  });
	}

	function extendDescriptor() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return (0, _privateUtils.decorate)(handleDescriptor, args);
	}

	module.exports = exports['default'];

/***/ }),
/* 29 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = applyDecorators;
	var defineProperty = Object.defineProperty;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	function applyDecorators(Class, props) {
	  var prototype = Class.prototype;

	  for (var key in props) {
	    var decorators = props[key];

	    for (var i = 0, l = decorators.length; i < l; i++) {
	      var decorator = decorators[i];

	      defineProperty(prototype, key, decorator(prototype, key, getOwnPropertyDescriptor(prototype, key)));
	    }
	  }

	  return Class;
	}

	module.exports = exports["default"];

/***/ }),
/* 30 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var breakBetween = 2000;
	// myTween.js  needs to be a global Function..
	var myTween = exports.myTween = {
	    fps: 30,
	    objs: null,
	    get: function get(models) {
	        this.objs = models;
	        return this;
	    },
	    to: function to(targets, duration, cb) {
	        this.lastAniParams = [targets, duration];
	        if (targets != undefined && duration != undefined && myTween.objs != null) {
	            var animation = function animation() {
	                var fadeIn = false,
	                    fadeOut = false;
	                // animation end related handling.
	                if (stepIndex >= stepNum) {
	                    // reset objs 2 original status.
	                    if (myTween.loop) {
	                        stepIndex = 0;
	                        for (var i = 0; i < myTween.objs.length; i++) {
	                            // shallow copy objects..
	                            myTween.objs[i] = Object.assign([], myTween.objs[i], objsCopy[i]);
	                        }
	                        // myTween.objs = Object.assign([], myTween.objs, objsCopy);
	                        console.warn("animation reset ...");
	                    } else {
	                        myTween.paused = true;
	                        clearInterval(myTween.timer);
	                        myTween.timerOn = false;
	                        console.warn("animation end !!!");
	                    }
	                    return;
	                }
	                if (stepIndex == 0) {
	                    fadeIn = true;
	                } else if (stepIndex == stepNum - 1) {
	                    fadeOut = true;
	                }
	                if (myTween.speed != 1) {}
	                // animation pause related.  record current params..
	                if (myTween.paused) {
	                    return;
	                }
	                for (var i = 0; i < myTween.objs.length; i++) {
	                    for (var key in props[i]) {
	                        // currently animation is controlled by stepIndex..
	                        myTween.objs[i][key] += props[i][key];
	                        // console.log("obj " +  myTween.objs[i]['name'] +' changed,' + key + ": " + myTween.objs[i][key]);
	                    }
	                }
	                if (cb && cb instanceof Function) {
	                    // redirect cb's context to Right Scope..
	                    cb(myTween.objs, fadeOut, fadeIn);
	                }
	                stepIndex += 1;
	            };
	            // if last timer is still On, register later.. use async alike process controller.


	            var inter = 1000 / myTween.fps,
	                stepNum = duration / 1000 * myTween.fps,
	                stepIndex = 0,
	                objsCopy = [],
	                props = [];
	            console.log("animation params init complete...");

	            // tranverse targetStatus props then calculate status of each frame
	            for (var i = 0; i < myTween.objs.length; i++) {
	                for (var k in targets[i]) {
	                    if (typeof targets[i][k] == 'number') {
	                        // deepCopy original status..
	                        if (_typeof(objsCopy[i]) != 'object') objsCopy[i] = {};
	                        if (_typeof(props[i]) != 'object') props[i] = {};
	                        objsCopy[i][k] = myTween.objs[i][k];
	                        props[i][k] = parseFloat(((targets[i][k] - myTween.objs[i][k]) * (1 / stepNum)).toFixed(3));
	                    }
	                }
	            }

	            return new Promise(function (resolve, reject) {
	                myTween.timer = setInterval(animation, inter);
	                myTween.timerOn = true;
	                myTween.paused = false;
	                // this step is to sleep for animation duration..
	                setTimeout(resolve, duration);
	            });
	        }
	    },
	    loop: false,
	    speed: 1,
	    timerOn: false,
	    timer: null,
	    paused: false,
	    // make async Function execute as Sync Function..
	    wait: function wait(targets, duration) {
	        var duration = duration || 0;
	        return new Promise(function (res, rej) {
	            setTimeout(function () {
	                if (targets instanceof Object) myTween.objs = Object.assign(myTween.objs, targets);else if (targets instanceof Function) console.log("execute Func await..");
	                targets.call(this);
	                res();
	            }, duration);
	        });
	    },
	    toggleAni: function toggleAni(paused) {
	        if (paused != undefined) {
	            this.paused = paused;
	            var status = paused ? "paused" : "playing";
	            return;
	        }
	        this.paused = !this.paused;
	    },
	    toggleLoop: function toggleLoop(loop) {
	        if (loop != undefined) {
	            this.loop = loop;
	            return;
	        }
	        this.loop = !this.loop;
	    },
	    lastAniParams: [undefined, undefined]
	};

	var sleep = exports.sleep = function sleep(time, fn) {
	    return new Promise(function (resolve, reject) {
	        setTimeout(function () {
	            if (fn && fn instanceof Function) {
	                resolve(fn());
	            } else {
	                resolve();
	            }
	        }, time);
	    });
	};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.CanvasOverlayer = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _overlay = __webpack_require__(32);

	var _overlay2 = _interopRequireDefault(_overlay);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * initCanvasOverlayer based on mapboxgl-canvas
	 */
	var CanvasOverlayer = exports.CanvasOverlayer = function (_Overlayer) {
	    _inherits(CanvasOverlayer, _Overlayer);

	    function CanvasOverlayer(opts) {
	        _classCallCheck(this, CanvasOverlayer);

	        var _this = _possibleConstructorReturn(this, (CanvasOverlayer.__proto__ || Object.getPrototypeOf(CanvasOverlayer)).call(this, opts));

	        _this.canvas = _this._init();
	        _this.redraw = _redraw.bind(_this);
	        if (opts) {
	            _this.source = opts.objs;
	        }
	        return _this;
	    }

	    _createClass(CanvasOverlayer, [{
	        key: "_init",
	        value: function _init() {
	            var canvasContainer = this.map._canvasContainer,
	                mapboxCanvas = this.map._canvas,
	                canvasOverlay = document.createElement("canvas");
	            canvasOverlay.style.position = "absolute";
	            canvasOverlay.className = "overlay-canvas";
	            canvasOverlay.width = parseInt(mapboxCanvas.style.width);
	            canvasOverlay.height = parseInt(mapboxCanvas.style.height);
	            canvasContainer.appendChild(canvasOverlay);
	            return canvasOverlay;
	        }
	    }]);

	    return CanvasOverlayer;
	}(_overlay2.default);

	function _preSetCtx(context) {
	    //默认值为source-over
	    var prev = context.globalCompositeOperation;
	    //只显示canvas上原图像的重叠部分 source-in, source, destination-in
	    context.globalCompositeOperation = 'destination-in';
	    //设置主canvas的绘制透明度
	    context.globalAlpha = 0.95;
	    //这一步目的是将canvas上的图像变的透明
	    // context.fillStyle = "rgba(0,0,0,.95)";
	    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
	    //在原图像上重叠新图像
	    context.globalCompositeOperation = prev;
	}

	/**
	 * expoid this method, can be overwritten
	 * for special render requirements..
	 * Important ! redraw may use this.map as projector!
	 */
	function _redraw(objs) {
	    if (this.canvas) {
	        var ctx = this.canvas.getContext("2d");
	        // ctx.clearRect(0,0,canv.width, canv.height);
	        _preSetCtx(ctx);
	        ctx.save();
	        // ctx.fillStyle = "rgba(240,200,20,.7)";
	        // ctx.fillRect(0,0,canv.width, canv.height);
	        ctx.shadowBlur = 4;
	        ctx.shadowColor = "rgba(255,255,255,.4)";
	        for (var i = 0; i < objs.length; i++) {
	            var x = objs[i]['lon'],
	                y = objs[i]['lat'],
	                radius = objs[i]['radius'] || 2;
	            var pix = this.lnglat2pix(x, y);
	            if (pix == null) continue;
	            ctx.fillStyle = objs[i]['color'];
	            ctx.beginPath();
	            ctx.arc(pix[0], pix[1], radius, 0, Math.PI * 2);
	            ctx.fill();
	            ctx.closePath();
	        }
	        ctx.restore();
	    }
	}

/***/ }),
/* 32 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Base class of Overlayer
	 */
	var Overlayer = function () {
	    function Overlayer(opts) {
	        _classCallCheck(this, Overlayer);

	        if (opts && opts.map) this.map = opts.map || undefined;
	    }

	    /**
	     * to be overwrite in subClass
	     */


	    _createClass(Overlayer, [{
	        key: "_init",
	        value: function _init() {}

	        // @setter

	    }, {
	        key: "setMap",
	        value: function setMap(map) {
	            this.map = map;
	            return this;
	        }
	        /**
	         * use Global map or this.map instance to project
	         */

	    }, {
	        key: "lnglat2pix",
	        value: function lnglat2pix(lng, lat) {
	            if (this.map != undefined && this.map.project instanceof Function) {
	                var lnglat = this.map.project(new mapboxgl.LngLat(lng, lat));
	                var x = lnglat.x,
	                    y = lnglat.y;
	                return [x, y];
	            }
	            return [lng, lat];
	        }
	    }]);

	    return Overlayer;
	}();

	exports.default = Overlayer;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DomOverlayer = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _overlay = __webpack_require__(32);

	var _overlay2 = _interopRequireDefault(_overlay);

	var _util = __webpack_require__(5);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var duration = 1200;

	/**
	 * initDomOverlayer
	 */

	var DomOverlayer = exports.DomOverlayer = function (_Overlayer) {
	    _inherits(DomOverlayer, _Overlayer);

	    function DomOverlayer(opts) {
	        _classCallCheck(this, DomOverlayer);

	        var _this = _possibleConstructorReturn(this, (DomOverlayer.__proto__ || Object.getPrototypeOf(DomOverlayer)).call(this, opts));

	        _this.domContainer = _this._init();
	        _this.redraw = _redraw.bind(_this);
	        if (opts && opts.map) {
	            _this.setMap(opts.map);
	            opts.map.on("move", function () {
	                _this.redraw(opts);
	            });
	        }
	        _this.doms = [];
	        _this.redraw(opts);
	        console.log("Dom overlayer add to Map...");
	        return _this;
	    }

	    _createClass(DomOverlayer, [{
	        key: '_init',
	        value: function _init() {
	            var canvasContainer = this.map._canvasContainer,
	                mapboxCanvas = this.map._canvas,
	                domContainer = document.createElement("div");
	            domContainer.style.position = "absolute";
	            domContainer.className = "overlay-dom";
	            domContainer.style.width = mapboxCanvas.style.width;
	            domContainer.style.height = mapboxCanvas.style.height;
	            canvasContainer.appendChild(domContainer);
	            return domContainer;
	        }
	    }, {
	        key: 'clearDoms',
	        value: function clearDoms() {
	            for (var i = 0; i < this.doms.length; i++) {
	                try {
	                    this.domContainer.removeChild(this.doms[i]);
	                } catch (error) {}
	            }
	        }
	    }]);

	    return DomOverlayer;
	}(_overlay2.default);

	/**
	 * domOverlay register&render above default canvas..
	 * keep in absolute geolocation..
	 */


	function _redraw(domOpts) {
	    if (domOpts && domOpts.doms) {
	        var doms = domOpts.doms;
	        this.clearDoms();
	        // append each of domPopups to domContainer.
	        for (var i = 0; i < doms.length; i++) {
	            var domOpt = doms[i];
	            var x = domOpt['lon'],
	                y = domOpt['lat'],
	                pix = this.lnglat2pix(x, y);
	            if (pix == null) continue;
	            var iconName = domOpt['icon'],
	                dom = document.createElement("div"),
	                line = document.createElement("div"),
	                point = document.createElement("div");
	            animLine(line);
	            point.style.borderRadius = '50%';
	            point.style.width = '4px';
	            point.style.height = '4px';

	            dom.innerHTML = domOpt['content'];
	            _util2.default.setIconDiv(dom, iconName);
	            dom.className = "dom-popup";
	            dom.style.position = "absolute";
	            dom.style.background = "#fff";
	            dom.style.padding = '5px';
	            // set domOverlay position. dom box animation needed.
	            dom.style.left = pix[0] + "px";
	            dom.style.top = pix[1] + "px";
	            dom.style.zIndex = 100;
	            dom.style.animation;
	            this.domContainer.appendChild(point);
	            this.domContainer.appendChild(line);
	            this.domContainer.appendChild(dom);
	            this.doms.push(dom);
	        }
	    }
	}

	function animLine(line) {
	    line.className = "dom-line";
	}

	var htmlTemplate = {};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// Forked from https://github.com/kronick/HexgridHeatmap
	var rbush = __webpack_require__(35);
	var turf = {
	    center: __webpack_require__(37),
	    hexGrid: __webpack_require__(41),
	    destination: __webpack_require__(44),
	    distance: __webpack_require__(42)
	};
	/** 
	 * Creates a hexgrid-based vector heatmap on the specified map.
	 * @constructor
	 * @param {Map} map - The map object that this heatmap should add itself to and track.
	 * @param {string} [layername=hexgrid-heatmap] - The layer name to use for the heatmap.
	 * @param {string} [addBefore] - Name of a layer to insert this heatmap underneath.
	 */
	function HexgridHeatmap(map, layername, addBefore) {
	    if (layername === undefined) layername = "hexgrid-heatmap";
	    this.map = map;
	    this.layername = layername;
	    this._setupLayers(layername, addBefore);
	    this._setupEvents();
	    // Set up an R-tree to look for coordinates as they are stored in GeoJSON Feature objects
	    this._tree = rbush(9, ['["geometry"]["coordinates"][0]', '["geometry"]["coordinates"][1]', '["geometry"]["coordinates"][0]', '["geometry"]["coordinates"][1]']);

	    this._intensity = 8;
	    this._spread = 0.1;
	    this._minCellIntensity = 0; // Drop out cells that have less than this intensity
	    this._maxPointIntensity = 20; // Don't let a single point have a greater weight than this
	    this._cellDensity = 1;

	    var thisthis = this;
	    this._checkUpdateCompleteClosure = function (e) {
	        thisthis._checkUpdateComplete(e);
	    };
	    this._calculatingGrid = false;
	    this._recalcWhenReady = false;
	}

	HexgridHeatmap.prototype = {
	    _setupLayers: function _setupLayers(layername, addBefore) {
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
	                    [0, "rgba(0,185,243,0)"], [50, "rgba(0,185,243,0.24)"], [130, "rgba(255,223,0,0.3)"], [200, "rgba(255,105,0,0.3)"]]
	                }
	            }
	        });

	        this.layer = this.map.getLayer(layername);
	        this.source = this.map.getSource(layername);
	    },
	    _setupEvents: function _setupEvents() {
	        var thisthis = this;
	        this.map.on("moveend", function () {
	            thisthis._updateGrid();
	        });
	    },

	    /**
	     * Set the data to visualize with this heatmap layer
	     * @param {FeatureCollection} data - A GeoJSON FeatureCollection containing data to visualize with this heatmap
	     * @public
	     */
	    setData: function setData(data) {
	        // Re-build R-tree index
	        this._tree.clear();
	        this._tree.load(data.features);
	    },

	    /**
	      * Set how widely points affect their neighbors
	      * @param {number} spread - A good starting point is 0.1. Higher values will result in more blurred heatmaps, lower values will highlight individual points more strongly.
	      * @public
	      */
	    setSpread: function setSpread(spread) {
	        this._spread = spread;
	    },

	    /**
	      * Set the intensity value for all points.
	      * @param {number} intensity - Setting this too low will result in no data displayed, setting it too high will result in an oversaturated map. The default is 8 so adjust up or down from there according to the density of your data.
	      * @public
	      */
	    setIntensity: function setIntensity(intensity) {
	        this._intensity = intensity;
	    },

	    /**
	      * Set custom stops for the heatmap color schem
	      * @param {array} stops - An array of `stops` in the format of the Mapbox GL Style Spec. Values should range from 0 to about 200, though you can control saturation by setting different values here.
	      */
	    setColorStops: function setColorStops(stops) {
	        if (this.layer) this.layer.setPaintProperty("fill-color", { property: "count", stops: stops });
	    },

	    /**
	      * Set the hexgrid cell density
	      * @param {number} density - Values less than 1 will result in a decreased cell density from the default, values greater than 1 will result in increaded density/higher resolution. Setting this value too high will result in slow performance.
	      * @public
	      */
	    setCellDensity: function setCellDensity(density) {
	        this._cellDensity = density;
	    },

	    /**
	      * Manually force an update to the heatmap
	      * You can call this method to manually force the heatmap to be redrawn. Use this after calling `setData()`, `setSpread()`, or `setIntensity()`
	      */
	    update: function update() {
	        this._updateGrid();
	    },

	    _generateGrid: function _generateGrid() {
	        // Rebuild grid
	        //var cellSize = Math.min(Math.max(1000/Math.pow(2,this.map.transform.zoom), 0.01), 0.1); // Constant screen size

	        var cellSize = Math.max(500 / Math.pow(2, this.map.transform.zoom) / this._cellDensity, 0.01); // Constant screen size

	        // TODO: These extents don't work when the map is rotated
	        var extents = this.map.getBounds().toArray();
	        extents = [extents[0][0], extents[0][1], extents[1][0], extents[1][1]];

	        var hexgrid = turf.hexGrid(extents, cellSize, 'kilometers');

	        var sigma = this._spread;
	        var a = 1 / (sigma * Math.sqrt(2 * Math.PI));
	        var amplitude = this._intensity;

	        var cellsToSave = [];

	        var thisthis = this;
	        hexgrid.features.forEach(function (cell) {
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

	            pois.forEach(function (poi) {
	                // TODO: Allow weight to be influenced by a property within the POI
	                var distance = turf.distance(center, poi);

	                var weighted = Math.min(Math.exp(-(distance * distance / (2 * sigma * sigma))) * a * amplitude, thisthis._maxPointIntensity);
	                strength += weighted;
	            });

	            cell.properties.count = strength;

	            if (cell.properties.count > thisthis._minCellIntensity) {
	                cellsToSave.push(cell);
	            }
	        });

	        hexgrid.features = cellsToSave;
	        return hexgrid;
	    },
	    _updateGrid: function _updateGrid() {
	        if (!this._calculatingGrid) {
	            this._calculatingGrid = true;
	            var hexgrid = this._generateGrid();
	            if (hexgrid != null) {
	                var thisthis = this;
	                this.source.on("data", this._checkUpdateCompleteClosure);
	                this.source.setData(hexgrid);
	            } else {
	                this._calculatingGrid = false;
	            }
	        } else {
	            this._recalcWhenReady = true;
	        }
	    },
	    _checkUpdateComplete: function _checkUpdateComplete(e) {
	        if (e.dataType == "source") {
	            this.source.off("data", this._checkUpdateCompleteClosure);
	            this._calculatingGrid = false;
	            if (this._recalcWhenReady) this._updateGrid();
	        }
	    }
	};

	module.exports = exports = HexgridHeatmap;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = rbush;

	var quickselect = __webpack_require__(36);

	function rbush(maxEntries, format) {
	    if (!(this instanceof rbush)) return new rbush(maxEntries, format);

	    // max entries in a node is 9 by default; min node fill is 40% for best performance
	    this._maxEntries = Math.max(4, maxEntries || 9);
	    this._minEntries = Math.max(2, Math.ceil(this._maxEntries * 0.4));

	    if (format) {
	        this._initFormat(format);
	    }

	    this.clear();
	}

	rbush.prototype = {

	    all: function () {
	        return this._all(this.data, []);
	    },

	    search: function (bbox) {

	        var node = this.data,
	            result = [],
	            toBBox = this.toBBox;

	        if (!intersects(bbox, node)) return result;

	        var nodesToSearch = [],
	            i, len, child, childBBox;

	        while (node) {
	            for (i = 0, len = node.children.length; i < len; i++) {

	                child = node.children[i];
	                childBBox = node.leaf ? toBBox(child) : child;

	                if (intersects(bbox, childBBox)) {
	                    if (node.leaf) result.push(child);
	                    else if (contains(bbox, childBBox)) this._all(child, result);
	                    else nodesToSearch.push(child);
	                }
	            }
	            node = nodesToSearch.pop();
	        }

	        return result;
	    },

	    collides: function (bbox) {

	        var node = this.data,
	            toBBox = this.toBBox;

	        if (!intersects(bbox, node)) return false;

	        var nodesToSearch = [],
	            i, len, child, childBBox;

	        while (node) {
	            for (i = 0, len = node.children.length; i < len; i++) {

	                child = node.children[i];
	                childBBox = node.leaf ? toBBox(child) : child;

	                if (intersects(bbox, childBBox)) {
	                    if (node.leaf || contains(bbox, childBBox)) return true;
	                    nodesToSearch.push(child);
	                }
	            }
	            node = nodesToSearch.pop();
	        }

	        return false;
	    },

	    load: function (data) {
	        if (!(data && data.length)) return this;

	        if (data.length < this._minEntries) {
	            for (var i = 0, len = data.length; i < len; i++) {
	                this.insert(data[i]);
	            }
	            return this;
	        }

	        // recursively build the tree with the given data from stratch using OMT algorithm
	        var node = this._build(data.slice(), 0, data.length - 1, 0);

	        if (!this.data.children.length) {
	            // save as is if tree is empty
	            this.data = node;

	        } else if (this.data.height === node.height) {
	            // split root if trees have the same height
	            this._splitRoot(this.data, node);

	        } else {
	            if (this.data.height < node.height) {
	                // swap trees if inserted one is bigger
	                var tmpNode = this.data;
	                this.data = node;
	                node = tmpNode;
	            }

	            // insert the small tree into the large tree at appropriate level
	            this._insert(node, this.data.height - node.height - 1, true);
	        }

	        return this;
	    },

	    insert: function (item) {
	        if (item) this._insert(item, this.data.height - 1);
	        return this;
	    },

	    clear: function () {
	        this.data = createNode([]);
	        return this;
	    },

	    remove: function (item, equalsFn) {
	        if (!item) return this;

	        var node = this.data,
	            bbox = this.toBBox(item),
	            path = [],
	            indexes = [],
	            i, parent, index, goingUp;

	        // depth-first iterative tree traversal
	        while (node || path.length) {

	            if (!node) { // go up
	                node = path.pop();
	                parent = path[path.length - 1];
	                i = indexes.pop();
	                goingUp = true;
	            }

	            if (node.leaf) { // check current node
	                index = findItem(item, node.children, equalsFn);

	                if (index !== -1) {
	                    // item found, remove the item and condense tree upwards
	                    node.children.splice(index, 1);
	                    path.push(node);
	                    this._condense(path);
	                    return this;
	                }
	            }

	            if (!goingUp && !node.leaf && contains(node, bbox)) { // go down
	                path.push(node);
	                indexes.push(i);
	                i = 0;
	                parent = node;
	                node = node.children[0];

	            } else if (parent) { // go right
	                i++;
	                node = parent.children[i];
	                goingUp = false;

	            } else node = null; // nothing found
	        }

	        return this;
	    },

	    toBBox: function (item) { return item; },

	    compareMinX: compareNodeMinX,
	    compareMinY: compareNodeMinY,

	    toJSON: function () { return this.data; },

	    fromJSON: function (data) {
	        this.data = data;
	        return this;
	    },

	    _all: function (node, result) {
	        var nodesToSearch = [];
	        while (node) {
	            if (node.leaf) result.push.apply(result, node.children);
	            else nodesToSearch.push.apply(nodesToSearch, node.children);

	            node = nodesToSearch.pop();
	        }
	        return result;
	    },

	    _build: function (items, left, right, height) {

	        var N = right - left + 1,
	            M = this._maxEntries,
	            node;

	        if (N <= M) {
	            // reached leaf level; return leaf
	            node = createNode(items.slice(left, right + 1));
	            calcBBox(node, this.toBBox);
	            return node;
	        }

	        if (!height) {
	            // target height of the bulk-loaded tree
	            height = Math.ceil(Math.log(N) / Math.log(M));

	            // target number of root entries to maximize storage utilization
	            M = Math.ceil(N / Math.pow(M, height - 1));
	        }

	        node = createNode([]);
	        node.leaf = false;
	        node.height = height;

	        // split the items into M mostly square tiles

	        var N2 = Math.ceil(N / M),
	            N1 = N2 * Math.ceil(Math.sqrt(M)),
	            i, j, right2, right3;

	        multiSelect(items, left, right, N1, this.compareMinX);

	        for (i = left; i <= right; i += N1) {

	            right2 = Math.min(i + N1 - 1, right);

	            multiSelect(items, i, right2, N2, this.compareMinY);

	            for (j = i; j <= right2; j += N2) {

	                right3 = Math.min(j + N2 - 1, right2);

	                // pack each entry recursively
	                node.children.push(this._build(items, j, right3, height - 1));
	            }
	        }

	        calcBBox(node, this.toBBox);

	        return node;
	    },

	    _chooseSubtree: function (bbox, node, level, path) {

	        var i, len, child, targetNode, area, enlargement, minArea, minEnlargement;

	        while (true) {
	            path.push(node);

	            if (node.leaf || path.length - 1 === level) break;

	            minArea = minEnlargement = Infinity;

	            for (i = 0, len = node.children.length; i < len; i++) {
	                child = node.children[i];
	                area = bboxArea(child);
	                enlargement = enlargedArea(bbox, child) - area;

	                // choose entry with the least area enlargement
	                if (enlargement < minEnlargement) {
	                    minEnlargement = enlargement;
	                    minArea = area < minArea ? area : minArea;
	                    targetNode = child;

	                } else if (enlargement === minEnlargement) {
	                    // otherwise choose one with the smallest area
	                    if (area < minArea) {
	                        minArea = area;
	                        targetNode = child;
	                    }
	                }
	            }

	            node = targetNode || node.children[0];
	        }

	        return node;
	    },

	    _insert: function (item, level, isNode) {

	        var toBBox = this.toBBox,
	            bbox = isNode ? item : toBBox(item),
	            insertPath = [];

	        // find the best node for accommodating the item, saving all nodes along the path too
	        var node = this._chooseSubtree(bbox, this.data, level, insertPath);

	        // put the item into the node
	        node.children.push(item);
	        extend(node, bbox);

	        // split on node overflow; propagate upwards if necessary
	        while (level >= 0) {
	            if (insertPath[level].children.length > this._maxEntries) {
	                this._split(insertPath, level);
	                level--;
	            } else break;
	        }

	        // adjust bboxes along the insertion path
	        this._adjustParentBBoxes(bbox, insertPath, level);
	    },

	    // split overflowed node into two
	    _split: function (insertPath, level) {

	        var node = insertPath[level],
	            M = node.children.length,
	            m = this._minEntries;

	        this._chooseSplitAxis(node, m, M);

	        var splitIndex = this._chooseSplitIndex(node, m, M);

	        var newNode = createNode(node.children.splice(splitIndex, node.children.length - splitIndex));
	        newNode.height = node.height;
	        newNode.leaf = node.leaf;

	        calcBBox(node, this.toBBox);
	        calcBBox(newNode, this.toBBox);

	        if (level) insertPath[level - 1].children.push(newNode);
	        else this._splitRoot(node, newNode);
	    },

	    _splitRoot: function (node, newNode) {
	        // split root node
	        this.data = createNode([node, newNode]);
	        this.data.height = node.height + 1;
	        this.data.leaf = false;
	        calcBBox(this.data, this.toBBox);
	    },

	    _chooseSplitIndex: function (node, m, M) {

	        var i, bbox1, bbox2, overlap, area, minOverlap, minArea, index;

	        minOverlap = minArea = Infinity;

	        for (i = m; i <= M - m; i++) {
	            bbox1 = distBBox(node, 0, i, this.toBBox);
	            bbox2 = distBBox(node, i, M, this.toBBox);

	            overlap = intersectionArea(bbox1, bbox2);
	            area = bboxArea(bbox1) + bboxArea(bbox2);

	            // choose distribution with minimum overlap
	            if (overlap < minOverlap) {
	                minOverlap = overlap;
	                index = i;

	                minArea = area < minArea ? area : minArea;

	            } else if (overlap === minOverlap) {
	                // otherwise choose distribution with minimum area
	                if (area < minArea) {
	                    minArea = area;
	                    index = i;
	                }
	            }
	        }

	        return index;
	    },

	    // sorts node children by the best axis for split
	    _chooseSplitAxis: function (node, m, M) {

	        var compareMinX = node.leaf ? this.compareMinX : compareNodeMinX,
	            compareMinY = node.leaf ? this.compareMinY : compareNodeMinY,
	            xMargin = this._allDistMargin(node, m, M, compareMinX),
	            yMargin = this._allDistMargin(node, m, M, compareMinY);

	        // if total distributions margin value is minimal for x, sort by minX,
	        // otherwise it's already sorted by minY
	        if (xMargin < yMargin) node.children.sort(compareMinX);
	    },

	    // total margin of all possible split distributions where each node is at least m full
	    _allDistMargin: function (node, m, M, compare) {

	        node.children.sort(compare);

	        var toBBox = this.toBBox,
	            leftBBox = distBBox(node, 0, m, toBBox),
	            rightBBox = distBBox(node, M - m, M, toBBox),
	            margin = bboxMargin(leftBBox) + bboxMargin(rightBBox),
	            i, child;

	        for (i = m; i < M - m; i++) {
	            child = node.children[i];
	            extend(leftBBox, node.leaf ? toBBox(child) : child);
	            margin += bboxMargin(leftBBox);
	        }

	        for (i = M - m - 1; i >= m; i--) {
	            child = node.children[i];
	            extend(rightBBox, node.leaf ? toBBox(child) : child);
	            margin += bboxMargin(rightBBox);
	        }

	        return margin;
	    },

	    _adjustParentBBoxes: function (bbox, path, level) {
	        // adjust bboxes along the given tree path
	        for (var i = level; i >= 0; i--) {
	            extend(path[i], bbox);
	        }
	    },

	    _condense: function (path) {
	        // go through the path, removing empty nodes and updating bboxes
	        for (var i = path.length - 1, siblings; i >= 0; i--) {
	            if (path[i].children.length === 0) {
	                if (i > 0) {
	                    siblings = path[i - 1].children;
	                    siblings.splice(siblings.indexOf(path[i]), 1);

	                } else this.clear();

	            } else calcBBox(path[i], this.toBBox);
	        }
	    },

	    _initFormat: function (format) {
	        // data format (minX, minY, maxX, maxY accessors)

	        // uses eval-type function compilation instead of just accepting a toBBox function
	        // because the algorithms are very sensitive to sorting functions performance,
	        // so they should be dead simple and without inner calls

	        var compareArr = ['return a', ' - b', ';'];

	        this.compareMinX = new Function('a', 'b', compareArr.join(format[0]));
	        this.compareMinY = new Function('a', 'b', compareArr.join(format[1]));

	        this.toBBox = new Function('a',
	            'return {minX: a' + format[0] +
	            ', minY: a' + format[1] +
	            ', maxX: a' + format[2] +
	            ', maxY: a' + format[3] + '};');
	    }
	};

	function findItem(item, items, equalsFn) {
	    if (!equalsFn) return items.indexOf(item);

	    for (var i = 0; i < items.length; i++) {
	        if (equalsFn(item, items[i])) return i;
	    }
	    return -1;
	}

	// calculate node's bbox from bboxes of its children
	function calcBBox(node, toBBox) {
	    distBBox(node, 0, node.children.length, toBBox, node);
	}

	// min bounding rectangle of node children from k to p-1
	function distBBox(node, k, p, toBBox, destNode) {
	    if (!destNode) destNode = createNode(null);
	    destNode.minX = Infinity;
	    destNode.minY = Infinity;
	    destNode.maxX = -Infinity;
	    destNode.maxY = -Infinity;

	    for (var i = k, child; i < p; i++) {
	        child = node.children[i];
	        extend(destNode, node.leaf ? toBBox(child) : child);
	    }

	    return destNode;
	}

	function extend(a, b) {
	    a.minX = Math.min(a.minX, b.minX);
	    a.minY = Math.min(a.minY, b.minY);
	    a.maxX = Math.max(a.maxX, b.maxX);
	    a.maxY = Math.max(a.maxY, b.maxY);
	    return a;
	}

	function compareNodeMinX(a, b) { return a.minX - b.minX; }
	function compareNodeMinY(a, b) { return a.minY - b.minY; }

	function bboxArea(a)   { return (a.maxX - a.minX) * (a.maxY - a.minY); }
	function bboxMargin(a) { return (a.maxX - a.minX) + (a.maxY - a.minY); }

	function enlargedArea(a, b) {
	    return (Math.max(b.maxX, a.maxX) - Math.min(b.minX, a.minX)) *
	           (Math.max(b.maxY, a.maxY) - Math.min(b.minY, a.minY));
	}

	function intersectionArea(a, b) {
	    var minX = Math.max(a.minX, b.minX),
	        minY = Math.max(a.minY, b.minY),
	        maxX = Math.min(a.maxX, b.maxX),
	        maxY = Math.min(a.maxY, b.maxY);

	    return Math.max(0, maxX - minX) *
	           Math.max(0, maxY - minY);
	}

	function contains(a, b) {
	    return a.minX <= b.minX &&
	           a.minY <= b.minY &&
	           b.maxX <= a.maxX &&
	           b.maxY <= a.maxY;
	}

	function intersects(a, b) {
	    return b.minX <= a.maxX &&
	           b.minY <= a.maxY &&
	           b.maxX >= a.minX &&
	           b.maxY >= a.minY;
	}

	function createNode(children) {
	    return {
	        children: children,
	        height: 1,
	        leaf: true,
	        minX: Infinity,
	        minY: Infinity,
	        maxX: -Infinity,
	        maxY: -Infinity
	    };
	}

	// sort an array so that items come in groups of n unsorted items, with groups sorted between each other;
	// combines selection algorithm with binary divide & conquer approach

	function multiSelect(arr, left, right, n, compare) {
	    var stack = [left, right],
	        mid;

	    while (stack.length) {
	        right = stack.pop();
	        left = stack.pop();

	        if (right - left <= n) continue;

	        mid = left + Math.ceil((right - left) / n / 2) * n;
	        quickselect(arr, mid, left, right, compare);

	        stack.push(left, mid, mid, right);
	    }
	}


/***/ }),
/* 36 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = partialSort;

	// Floyd-Rivest selection algorithm:
	// Rearrange items so that all items in the [left, k] range are smaller than all items in (k, right];
	// The k-th element will have the (k - left + 1)th smallest value in [left, right]

	function partialSort(arr, k, left, right, compare) {
	    left = left || 0;
	    right = right || (arr.length - 1);
	    compare = compare || defaultCompare;

	    while (right > left) {
	        if (right - left > 600) {
	            var n = right - left + 1;
	            var m = k - left + 1;
	            var z = Math.log(n);
	            var s = 0.5 * Math.exp(2 * z / 3);
	            var sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
	            var newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
	            var newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
	            partialSort(arr, k, newLeft, newRight, compare);
	        }

	        var t = arr[k];
	        var i = left;
	        var j = right;

	        swap(arr, left, k);
	        if (compare(arr[right], t) > 0) swap(arr, left, right);

	        while (i < j) {
	            swap(arr, i, j);
	            i++;
	            j--;
	            while (compare(arr[i], t) < 0) i++;
	            while (compare(arr[j], t) > 0) j--;
	        }

	        if (compare(arr[left], t) === 0) swap(arr, left, j);
	        else {
	            j++;
	            swap(arr, j, right);
	        }

	        if (j <= k) left = j + 1;
	        if (k <= j) right = j - 1;
	    }
	}

	function swap(arr, i, j) {
	    var tmp = arr[i];
	    arr[i] = arr[j];
	    arr[j] = tmp;
	}

	function defaultCompare(a, b) {
	    return a < b ? -1 : a > b ? 1 : 0;
	}


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	var bbox = __webpack_require__(38),
	    point = __webpack_require__(40).point;

	/**
	 * Takes a {@link Feature} or {@link FeatureCollection} and returns the absolute center point of all features.
	 *
	 * @name center
	 * @param {(Feature|FeatureCollection)} layer input features
	 * @return {Feature<Point>} a Point feature at the absolute center point of all input features
	 * @addToMap features, centerPt
	 * @example
	 * var features = {
	 *   "type": "FeatureCollection",
	 *   "features": [
	 *     {
	 *       "type": "Feature",
	 *       "properties": {},
	 *       "geometry": {
	 *         "type": "Point",
	 *         "coordinates": [-97.522259, 35.4691]
	 *       }
	 *     }, {
	 *       "type": "Feature",
	 *       "properties": {},
	 *       "geometry": {
	 *         "type": "Point",
	 *         "coordinates": [-97.502754, 35.463455]
	 *       }
	 *     }, {
	 *       "type": "Feature",
	 *       "properties": {},
	 *       "geometry": {
	 *         "type": "Point",
	 *         "coordinates": [-97.508269, 35.463245]
	 *       }
	 *     }, {
	 *       "type": "Feature",
	 *       "properties": {},
	 *       "geometry": {
	 *         "type": "Point",
	 *         "coordinates": [-97.516809, 35.465779]
	 *       }
	 *     }, {
	 *       "type": "Feature",
	 *       "properties": {},
	 *       "geometry": {
	 *         "type": "Point",
	 *         "coordinates": [-97.515372, 35.467072]
	 *       }
	 *     }, {
	 *       "type": "Feature",
	 *       "properties": {},
	 *       "geometry": {
	 *         "type": "Point",
	 *         "coordinates": [-97.509363, 35.463053]
	 *       }
	 *     }, {
	 *       "type": "Feature",
	 *       "properties": {},
	 *       "geometry": {
	 *         "type": "Point",
	 *         "coordinates": [-97.511123, 35.466601]
	 *       }
	 *     }, {
	 *       "type": "Feature",
	 *       "properties": {},
	 *       "geometry": {
	 *         "type": "Point",
	 *         "coordinates": [-97.518547, 35.469327]
	 *       }
	 *     }, {
	 *       "type": "Feature",
	 *       "properties": {},
	 *       "geometry": {
	 *         "type": "Point",
	 *         "coordinates": [-97.519706, 35.469659]
	 *       }
	 *     }, {
	 *       "type": "Feature",
	 *       "properties": {},
	 *       "geometry": {
	 *         "type": "Point",
	 *         "coordinates": [-97.517839, 35.466998]
	 *       }
	 *     }, {
	 *       "type": "Feature",
	 *       "properties": {},
	 *       "geometry": {
	 *         "type": "Point",
	 *         "coordinates": [-97.508678, 35.464942]
	 *       }
	 *     }, {
	 *       "type": "Feature",
	 *       "properties": {},
	 *       "geometry": {
	 *         "type": "Point",
	 *         "coordinates": [-97.514914, 35.463453]
	 *       }
	 *     }
	 *   ]
	 * };
	 *
	 * var centerPt = turf.center(features);
	 * centerPt.properties['marker-size'] = 'large';
	 * centerPt.properties['marker-color'] = '#000';
	 *
	 * var resultFeatures = features.features.concat(centerPt);
	 * var result = {
	 *   "type": "FeatureCollection",
	 *   "features": resultFeatures
	 * };
	 *
	 * //=result
	 */

	module.exports = function (layer) {
	    var ext = bbox(layer);
	    var x = (ext[0] + ext[2]) / 2;
	    var y = (ext[1] + ext[3]) / 2;
	    return point([x, y]);
	};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	var each = __webpack_require__(39).coordEach;

	/**
	 * Takes a set of features, calculates the bbox of all input features, and returns a bounding box.
	 *
	 * @name bbox
	 * @param {(Feature|FeatureCollection)} geojson input features
	 * @returns {Array<number>} bbox extent in [minX, minY, maxX, maxY] order
	 * @addToMap features, bboxPolygon
	 * @example
	 * var pt1 = turf.point([114.175329, 22.2524])
	 * var pt2 = turf.point([114.170007, 22.267969])
	 * var pt3 = turf.point([114.200649, 22.274641])
	 * var pt4 = turf.point([114.200649, 22.274641])
	 * var pt5 = turf.point([114.186744, 22.265745])
	 * var features = turf.featureCollection([pt1, pt2, pt3, pt4, pt5])
	 *
	 * var bbox = turf.bbox(features);
	 *
	 * var bboxPolygon = turf.bboxPolygon(bbox);
	 *
	 * //=bbox
	 *
	 * //=bboxPolygon
	 */
	module.exports = function (geojson) {
	    var bbox = [Infinity, Infinity, -Infinity, -Infinity];
	    each(geojson, function (coord) {
	        if (bbox[0] > coord[0]) bbox[0] = coord[0];
	        if (bbox[1] > coord[1]) bbox[1] = coord[1];
	        if (bbox[2] < coord[0]) bbox[2] = coord[0];
	        if (bbox[3] < coord[1]) bbox[3] = coord[1];
	    });
	    return bbox;
	};


/***/ }),
/* 39 */
/***/ (function(module, exports) {

	/**
	 * Callback for coordEach
	 *
	 * @private
	 * @callback coordEachCallback
	 * @param {[number, number]} currentCoords The current coordinates being processed.
	 * @param {number} currentIndex The index of the current element being processed in the
	 * array.Starts at index 0, if an initialValue is provided, and at index 1 otherwise.
	 */

	/**
	 * Iterate over coordinates in any GeoJSON object, similar to Array.forEach()
	 *
	 * @name coordEach
	 * @param {Object} layer any GeoJSON object
	 * @param {Function} callback a method that takes (currentCoords, currentIndex)
	 * @param {boolean} [excludeWrapCoord=false] whether or not to include
	 * the final coordinate of LinearRings that wraps the ring in its iteration.
	 * @example
	 * var features = {
	 *   "type": "FeatureCollection",
	 *   "features": [
	 *     {
	 *       "type": "Feature",
	 *       "properties": {},
	 *       "geometry": {
	 *         "type": "Point",
	 *         "coordinates": [26, 37]
	 *       }
	 *     },
	 *     {
	 *       "type": "Feature",
	 *       "properties": {},
	 *       "geometry": {
	 *         "type": "Point",
	 *         "coordinates": [36, 53]
	 *       }
	 *     }
	 *   ]
	 * };
	 * turf.coordEach(features, function (currentCoords, currentIndex) {
	 *   //=currentCoords
	 *   //=currentIndex
	 * });
	 */
	function coordEach(layer, callback, excludeWrapCoord) {
	    var i, j, k, g, l, geometry, stopG, coords,
	        geometryMaybeCollection,
	        wrapShrink = 0,
	        currentIndex = 0,
	        isGeometryCollection,
	        isFeatureCollection = layer.type === 'FeatureCollection',
	        isFeature = layer.type === 'Feature',
	        stop = isFeatureCollection ? layer.features.length : 1;

	  // This logic may look a little weird. The reason why it is that way
	  // is because it's trying to be fast. GeoJSON supports multiple kinds
	  // of objects at its root: FeatureCollection, Features, Geometries.
	  // This function has the responsibility of handling all of them, and that
	  // means that some of the `for` loops you see below actually just don't apply
	  // to certain inputs. For instance, if you give this just a
	  // Point geometry, then both loops are short-circuited and all we do
	  // is gradually rename the input until it's called 'geometry'.
	  //
	  // This also aims to allocate as few resources as possible: just a
	  // few numbers and booleans, rather than any temporary arrays as would
	  // be required with the normalization approach.
	    for (i = 0; i < stop; i++) {

	        geometryMaybeCollection = (isFeatureCollection ? layer.features[i].geometry :
	        (isFeature ? layer.geometry : layer));
	        isGeometryCollection = geometryMaybeCollection.type === 'GeometryCollection';
	        stopG = isGeometryCollection ? geometryMaybeCollection.geometries.length : 1;

	        for (g = 0; g < stopG; g++) {
	            geometry = isGeometryCollection ?
	            geometryMaybeCollection.geometries[g] : geometryMaybeCollection;
	            coords = geometry.coordinates;

	            wrapShrink = (excludeWrapCoord &&
	                (geometry.type === 'Polygon' || geometry.type === 'MultiPolygon')) ?
	                1 : 0;

	            if (geometry.type === 'Point') {
	                callback(coords, currentIndex);
	                currentIndex++;
	            } else if (geometry.type === 'LineString' || geometry.type === 'MultiPoint') {
	                for (j = 0; j < coords.length; j++) {
	                    callback(coords[j], currentIndex);
	                    currentIndex++;
	                }
	            } else if (geometry.type === 'Polygon' || geometry.type === 'MultiLineString') {
	                for (j = 0; j < coords.length; j++)
	                    for (k = 0; k < coords[j].length - wrapShrink; k++) {
	                        callback(coords[j][k], currentIndex);
	                        currentIndex++;
	                    }
	            } else if (geometry.type === 'MultiPolygon') {
	                for (j = 0; j < coords.length; j++)
	                    for (k = 0; k < coords[j].length; k++)
	                        for (l = 0; l < coords[j][k].length - wrapShrink; l++) {
	                            callback(coords[j][k][l], currentIndex);
	                            currentIndex++;
	                        }
	            } else if (geometry.type === 'GeometryCollection') {
	                for (j = 0; j < geometry.geometries.length; j++)
	                    coordEach(geometry.geometries[j], callback, excludeWrapCoord);
	            } else {
	                throw new Error('Unknown Geometry Type');
	            }
	        }
	    }
	}
	module.exports.coordEach = coordEach;

	/**
	 * Callback for coordReduce
	 *
	 * The first time the callback function is called, the values provided as arguments depend
	 * on whether the reduce method has an initialValue argument.
	 *
	 * If an initialValue is provided to the reduce method:
	 *  - The previousValue argument is initialValue.
	 *  - The currentValue argument is the value of the first element present in the array.
	 *
	 * If an initialValue is not provided:
	 *  - The previousValue argument is the value of the first element present in the array.
	 *  - The currentValue argument is the value of the second element present in the array.
	 *
	 * @private
	 * @callback coordReduceCallback
	 * @param {*} previousValue The accumulated value previously returned in the last invocation
	 * of the callback, or initialValue, if supplied.
	 * @param {[number, number]} currentCoords The current coordinate being processed.
	 * @param {number} currentIndex The index of the current element being processed in the
	 * array.Starts at index 0, if an initialValue is provided, and at index 1 otherwise.
	 */

	/**
	 * Reduce coordinates in any GeoJSON object, similar to Array.reduce()
	 *
	 * @name coordReduce
	 * @param {Object} layer any GeoJSON object
	 * @param {Function} callback a method that takes (previousValue, currentCoords, currentIndex)
	 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
	 * @param {boolean} [excludeWrapCoord=false] whether or not to include
	 * the final coordinate of LinearRings that wraps the ring in its iteration.
	 * @returns {*} The value that results from the reduction.
	 * @example
	 * var features = {
	 *   "type": "FeatureCollection",
	 *   "features": [
	 *     {
	 *       "type": "Feature",
	 *       "properties": {},
	 *       "geometry": {
	 *         "type": "Point",
	 *         "coordinates": [26, 37]
	 *       }
	 *     },
	 *     {
	 *       "type": "Feature",
	 *       "properties": {},
	 *       "geometry": {
	 *         "type": "Point",
	 *         "coordinates": [36, 53]
	 *       }
	 *     }
	 *   ]
	 * };
	 * turf.coordReduce(features, function (previousValue, currentCoords, currentIndex) {
	 *   //=previousValue
	 *   //=currentCoords
	 *   //=currentIndex
	 *   return currentCoords;
	 * });
	 */
	function coordReduce(layer, callback, initialValue, excludeWrapCoord) {
	    var previousValue = initialValue;
	    coordEach(layer, function (currentCoords, currentIndex) {
	        if (currentIndex === 0 && initialValue === undefined) {
	            previousValue = currentCoords;
	        } else {
	            previousValue = callback(previousValue, currentCoords, currentIndex);
	        }
	    }, excludeWrapCoord);
	    return previousValue;
	}
	module.exports.coordReduce = coordReduce;

	/**
	 * Callback for propEach
	 *
	 * @private
	 * @callback propEachCallback
	 * @param {*} currentProperties The current properties being processed.
	 * @param {number} currentIndex The index of the current element being processed in the
	 * array.Starts at index 0, if an initialValue is provided, and at index 1 otherwise.
	 */

	/**
	 * Iterate over properties in any GeoJSON object, similar to Array.forEach()
	 *
	 * @name propEach
	 * @param {Object} layer any GeoJSON object
	 * @param {Function} callback a method that takes (currentProperties, currentIndex)
	 * @example
	 * var features = {
	 *   "type": "FeatureCollection",
	 *   "features": [
	 *     {
	 *       "type": "Feature",
	 *       "properties": {"foo": "bar"},
	 *       "geometry": {
	 *         "type": "Point",
	 *         "coordinates": [26, 37]
	 *       }
	 *     },
	 *     {
	 *       "type": "Feature",
	 *       "properties": {"hello": "world"},
	 *       "geometry": {
	 *         "type": "Point",
	 *         "coordinates": [36, 53]
	 *       }
	 *     }
	 *   ]
	 * };
	 * turf.propEach(features, function (currentProperties, currentIndex) {
	 *   //=currentProperties
	 *   //=currentIndex
	 * });
	 */
	function propEach(layer, callback) {
	    var i;
	    switch (layer.type) {
	    case 'FeatureCollection':
	        for (i = 0; i < layer.features.length; i++) {
	            callback(layer.features[i].properties, i);
	        }
	        break;
	    case 'Feature':
	        callback(layer.properties, 0);
	        break;
	    }
	}
	module.exports.propEach = propEach;


	/**
	 * Callback for propReduce
	 *
	 * The first time the callback function is called, the values provided as arguments depend
	 * on whether the reduce method has an initialValue argument.
	 *
	 * If an initialValue is provided to the reduce method:
	 *  - The previousValue argument is initialValue.
	 *  - The currentValue argument is the value of the first element present in the array.
	 *
	 * If an initialValue is not provided:
	 *  - The previousValue argument is the value of the first element present in the array.
	 *  - The currentValue argument is the value of the second element present in the array.
	 *
	 * @private
	 * @callback propReduceCallback
	 * @param {*} previousValue The accumulated value previously returned in the last invocation
	 * of the callback, or initialValue, if supplied.
	 * @param {*} currentProperties The current properties being processed.
	 * @param {number} currentIndex The index of the current element being processed in the
	 * array.Starts at index 0, if an initialValue is provided, and at index 1 otherwise.
	 */

	/**
	 * Reduce properties in any GeoJSON object into a single value,
	 * similar to how Array.reduce works. However, in this case we lazily run
	 * the reduction, so an array of all properties is unnecessary.
	 *
	 * @name propReduce
	 * @param {Object} layer any GeoJSON object
	 * @param {Function} callback a method that takes (previousValue, currentProperties, currentIndex)
	 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
	 * @returns {*} The value that results from the reduction.
	 * @example
	 * var features = {
	 *   "type": "FeatureCollection",
	 *   "features": [
	 *     {
	 *       "type": "Feature",
	 *       "properties": {"foo": "bar"},
	 *       "geometry": {
	 *         "type": "Point",
	 *         "coordinates": [26, 37]
	 *       }
	 *     },
	 *     {
	 *       "type": "Feature",
	 *       "properties": {"hello": "world"},
	 *       "geometry": {
	 *         "type": "Point",
	 *         "coordinates": [36, 53]
	 *       }
	 *     }
	 *   ]
	 * };
	 * turf.propReduce(features, function (previousValue, currentProperties, currentIndex) {
	 *   //=previousValue
	 *   //=currentProperties
	 *   //=currentIndex
	 *   return currentProperties
	 * });
	 */
	function propReduce(layer, callback, initialValue) {
	    var previousValue = initialValue;
	    propEach(layer, function (currentProperties, currentIndex) {
	        if (currentIndex === 0 && initialValue === undefined) {
	            previousValue = currentProperties;
	        } else {
	            previousValue = callback(previousValue, currentProperties, currentIndex);
	        }
	    });
	    return previousValue;
	}
	module.exports.propReduce = propReduce;

	/**
	 * Callback for featureEach
	 *
	 * @private
	 * @callback featureEachCallback
	 * @param {Feature<any>} currentFeature The current feature being processed.
	 * @param {number} currentIndex The index of the current element being processed in the
	 * array.Starts at index 0, if an initialValue is provided, and at index 1 otherwise.
	 */

	/**
	 * Iterate over features in any GeoJSON object, similar to
	 * Array.forEach.
	 *
	 * @name featureEach
	 * @param {Object} layer any GeoJSON object
	 * @param {Function} callback a method that takes (currentFeature, currentIndex)
	 * @example
	 * var features = {
	 *   "type": "FeatureCollection",
	 *   "features": [
	 *     {
	 *       "type": "Feature",
	 *       "properties": {},
	 *       "geometry": {
	 *         "type": "Point",
	 *         "coordinates": [26, 37]
	 *       }
	 *     },
	 *     {
	 *       "type": "Feature",
	 *       "properties": {},
	 *       "geometry": {
	 *         "type": "Point",
	 *         "coordinates": [36, 53]
	 *       }
	 *     }
	 *   ]
	 * };
	 * turf.featureEach(features, function (currentFeature, currentIndex) {
	 *   //=currentFeature
	 *   //=currentIndex
	 * });
	 */
	function featureEach(layer, callback) {
	    if (layer.type === 'Feature') {
	        callback(layer, 0);
	    } else if (layer.type === 'FeatureCollection') {
	        for (var i = 0; i < layer.features.length; i++) {
	            callback(layer.features[i], i);
	        }
	    }
	}
	module.exports.featureEach = featureEach;

	/**
	 * Callback for featureReduce
	 *
	 * The first time the callback function is called, the values provided as arguments depend
	 * on whether the reduce method has an initialValue argument.
	 *
	 * If an initialValue is provided to the reduce method:
	 *  - The previousValue argument is initialValue.
	 *  - The currentValue argument is the value of the first element present in the array.
	 *
	 * If an initialValue is not provided:
	 *  - The previousValue argument is the value of the first element present in the array.
	 *  - The currentValue argument is the value of the second element present in the array.
	 *
	 * @private
	 * @callback featureReduceCallback
	 * @param {*} previousValue The accumulated value previously returned in the last invocation
	 * of the callback, or initialValue, if supplied.
	 * @param {Feature<any>} currentFeature The current Feature being processed.
	 * @param {number} currentIndex The index of the current element being processed in the
	 * array.Starts at index 0, if an initialValue is provided, and at index 1 otherwise.
	 */

	/**
	 * Reduce features in any GeoJSON object, similar to Array.reduce().
	 *
	 * @name featureReduce
	 * @param {Object} layer any GeoJSON object
	 * @param {Function} callback a method that takes (previousValue, currentFeature, currentIndex)
	 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
	 * @returns {*} The value that results from the reduction.
	 * @example
	 * var features = {
	 *   "type": "FeatureCollection",
	 *   "features": [
	 *     {
	 *       "type": "Feature",
	 *       "properties": {"foo": "bar"},
	 *       "geometry": {
	 *         "type": "Point",
	 *         "coordinates": [26, 37]
	 *       }
	 *     },
	 *     {
	 *       "type": "Feature",
	 *       "properties": {"hello": "world"},
	 *       "geometry": {
	 *         "type": "Point",
	 *         "coordinates": [36, 53]
	 *       }
	 *     }
	 *   ]
	 * };
	 * turf.featureReduce(features, function (previousValue, currentFeature, currentIndex) {
	 *   //=previousValue
	 *   //=currentFeature
	 *   //=currentIndex
	 *   return currentFeature
	 * });
	 */
	function featureReduce(layer, callback, initialValue) {
	    var previousValue = initialValue;
	    featureEach(layer, function (currentFeature, currentIndex) {
	        if (currentIndex === 0 && initialValue === undefined) {
	            previousValue = currentFeature;
	        } else {
	            previousValue = callback(previousValue, currentFeature, currentIndex);
	        }
	    });
	    return previousValue;
	}
	module.exports.featureReduce = featureReduce;

	/**
	 * Get all coordinates from any GeoJSON object.
	 *
	 * @name coordAll
	 * @param {Object} layer any GeoJSON object
	 * @returns {Array<Array<number>>} coordinate position array
	 * @example
	 * var features = {
	 *   "type": "FeatureCollection",
	 *   "features": [
	 *     {
	 *       "type": "Feature",
	 *       "properties": {},
	 *       "geometry": {
	 *         "type": "Point",
	 *         "coordinates": [26, 37]
	 *       }
	 *     },
	 *     {
	 *       "type": "Feature",
	 *       "properties": {},
	 *       "geometry": {
	 *         "type": "Point",
	 *         "coordinates": [36, 53]
	 *       }
	 *     }
	 *   ]
	 * };
	 * var coords = turf.coordAll(features);
	 * //=coords
	 */
	function coordAll(layer) {
	    var coords = [];
	    coordEach(layer, function (coord) {
	        coords.push(coord);
	    });
	    return coords;
	}
	module.exports.coordAll = coordAll;

	/**
	 * Iterate over each geometry in any GeoJSON object, similar to Array.forEach()
	 *
	 * @name geomEach
	 * @param {Object} layer any GeoJSON object
	 * @param {Function} callback a method that takes (currentGeometry, currentIndex)
	 * @example
	 * var features = {
	 *   "type": "FeatureCollection",
	 *   "features": [
	 *     {
	 *       "type": "Feature",
	 *       "properties": {},
	 *       "geometry": {
	 *         "type": "Point",
	 *         "coordinates": [26, 37]
	 *       }
	 *     },
	 *     {
	 *       "type": "Feature",
	 *       "properties": {},
	 *       "geometry": {
	 *         "type": "Point",
	 *         "coordinates": [36, 53]
	 *       }
	 *     }
	 *   ]
	 * };
	 * turf.geomEach(features, function (currentGeometry, currentIndex) {
	 *   //=currentGeometry
	 *   //=currentIndex
	 * });
	 */
	function geomEach(layer, callback) {
	    var i, j, g, geometry, stopG,
	        geometryMaybeCollection,
	        isGeometryCollection,
	        currentIndex = 0,
	        isFeatureCollection = layer.type === 'FeatureCollection',
	        isFeature = layer.type === 'Feature',
	        stop = isFeatureCollection ? layer.features.length : 1;

	  // This logic may look a little weird. The reason why it is that way
	  // is because it's trying to be fast. GeoJSON supports multiple kinds
	  // of objects at its root: FeatureCollection, Features, Geometries.
	  // This function has the responsibility of handling all of them, and that
	  // means that some of the `for` loops you see below actually just don't apply
	  // to certain inputs. For instance, if you give this just a
	  // Point geometry, then both loops are short-circuited and all we do
	  // is gradually rename the input until it's called 'geometry'.
	  //
	  // This also aims to allocate as few resources as possible: just a
	  // few numbers and booleans, rather than any temporary arrays as would
	  // be required with the normalization approach.
	    for (i = 0; i < stop; i++) {

	        geometryMaybeCollection = (isFeatureCollection ? layer.features[i].geometry :
	        (isFeature ? layer.geometry : layer));
	        isGeometryCollection = geometryMaybeCollection.type === 'GeometryCollection';
	        stopG = isGeometryCollection ? geometryMaybeCollection.geometries.length : 1;

	        for (g = 0; g < stopG; g++) {
	            geometry = isGeometryCollection ?
	            geometryMaybeCollection.geometries[g] : geometryMaybeCollection;

	            if (geometry.type === 'Point' ||
	                geometry.type === 'LineString' ||
	                geometry.type === 'MultiPoint' ||
	                geometry.type === 'Polygon' ||
	                geometry.type === 'MultiLineString' ||
	                geometry.type === 'MultiPolygon') {
	                callback(geometry, currentIndex);
	                currentIndex++;
	            } else if (geometry.type === 'GeometryCollection') {
	                for (j = 0; j < geometry.geometries.length; j++) {
	                    callback(geometry.geometries[j], currentIndex);
	                    currentIndex++;
	                }
	            } else {
	                throw new Error('Unknown Geometry Type');
	            }
	        }
	    }
	}
	module.exports.geomEach = geomEach;

	/**
	 * Callback for geomReduce
	 *
	 * The first time the callback function is called, the values provided as arguments depend
	 * on whether the reduce method has an initialValue argument.
	 *
	 * If an initialValue is provided to the reduce method:
	 *  - The previousValue argument is initialValue.
	 *  - The currentValue argument is the value of the first element present in the array.
	 *
	 * If an initialValue is not provided:
	 *  - The previousValue argument is the value of the first element present in the array.
	 *  - The currentValue argument is the value of the second element present in the array.
	 *
	 * @private
	 * @callback geomReduceCallback
	 * @param {*} previousValue The accumulated value previously returned in the last invocation
	 * of the callback, or initialValue, if supplied.
	 * @param {*} currentGeometry The current Feature being processed.
	 * @param {number} currentIndex The index of the current element being processed in the
	 * array.Starts at index 0, if an initialValue is provided, and at index 1 otherwise.
	 */

	/**
	 * Reduce geometry in any GeoJSON object, similar to Array.reduce().
	 *
	 * @name geomReduce
	 * @param {Object} layer any GeoJSON object
	 * @param {Function} callback a method that takes (previousValue, currentGeometry, currentIndex)
	 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
	 * @returns {*} The value that results from the reduction.
	 * @example
	 * var features = {
	 *   "type": "FeatureCollection",
	 *   "features": [
	 *     {
	 *       "type": "Feature",
	 *       "properties": {"foo": "bar"},
	 *       "geometry": {
	 *         "type": "Point",
	 *         "coordinates": [26, 37]
	 *       }
	 *     },
	 *     {
	 *       "type": "Feature",
	 *       "properties": {"hello": "world"},
	 *       "geometry": {
	 *         "type": "Point",
	 *         "coordinates": [36, 53]
	 *       }
	 *     }
	 *   ]
	 * };
	 * turf.geomReduce(features, function (previousValue, currentGeometry, currentIndex) {
	 *   //=previousValue
	 *   //=currentGeometry
	 *   //=currentIndex
	 *   return currentGeometry
	 * });
	 */
	function geomReduce(layer, callback, initialValue) {
	    var previousValue = initialValue;
	    geomEach(layer, function (currentGeometry, currentIndex) {
	        if (currentIndex === 0 && initialValue === undefined) {
	            previousValue = currentGeometry;
	        } else {
	            previousValue = callback(previousValue, currentGeometry, currentIndex);
	        }
	    });
	    return previousValue;
	}
	module.exports.geomReduce = geomReduce;


/***/ }),
/* 40 */
/***/ (function(module, exports) {

	/**
	 * Wraps a GeoJSON {@link Geometry} in a GeoJSON {@link Feature}.
	 *
	 * @name feature
	 * @param {Geometry} geometry input geometry
	 * @param {Object} properties properties
	 * @returns {FeatureCollection} a FeatureCollection of input features
	 * @example
	 * var geometry = {
	 *      "type": "Point",
	 *      "coordinates": [
	 *        67.5,
	 *        32.84267363195431
	 *      ]
	 *    }
	 *
	 * var feature = turf.feature(geometry);
	 *
	 * //=feature
	 */
	function feature(geometry, properties) {
	    if (!geometry) throw new Error('No geometry passed');

	    return {
	        type: 'Feature',
	        properties: properties || {},
	        geometry: geometry
	    };
	}
	module.exports.feature = feature;

	/**
	 * Takes coordinates and properties (optional) and returns a new {@link Point} feature.
	 *
	 * @name point
	 * @param {Array<number>} coordinates longitude, latitude position (each in decimal degrees)
	 * @param {Object=} properties an Object that is used as the {@link Feature}'s
	 * properties
	 * @returns {Feature<Point>} a Point feature
	 * @example
	 * var pt1 = turf.point([-75.343, 39.984]);
	 *
	 * //=pt1
	 */
	module.exports.point = function (coordinates, properties) {
	    if (!coordinates) throw new Error('No coordinates passed');
	    if (coordinates.length === undefined) throw new Error('Coordinates must be an array');
	    if (coordinates.length < 2) throw new Error('Coordinates must be at least 2 numbers long');
	    if (typeof coordinates[0] !== 'number' || typeof coordinates[1] !== 'number') throw new Error('Coordinates must numbers');

	    return feature({
	        type: 'Point',
	        coordinates: coordinates
	    }, properties);
	};

	/**
	 * Takes an array of LinearRings and optionally an {@link Object} with properties and returns a {@link Polygon} feature.
	 *
	 * @name polygon
	 * @param {Array<Array<Array<number>>>} coordinates an array of LinearRings
	 * @param {Object=} properties a properties object
	 * @returns {Feature<Polygon>} a Polygon feature
	 * @throws {Error} throw an error if a LinearRing of the polygon has too few positions
	 * or if a LinearRing of the Polygon does not have matching Positions at the
	 * beginning & end.
	 * @example
	 * var polygon = turf.polygon([[
	 *  [-2.275543, 53.464547],
	 *  [-2.275543, 53.489271],
	 *  [-2.215118, 53.489271],
	 *  [-2.215118, 53.464547],
	 *  [-2.275543, 53.464547]
	 * ]], { name: 'poly1', population: 400});
	 *
	 * //=polygon
	 */
	module.exports.polygon = function (coordinates, properties) {
	    if (!coordinates) throw new Error('No coordinates passed');

	    for (var i = 0; i < coordinates.length; i++) {
	        var ring = coordinates[i];
	        if (ring.length < 4) {
	            throw new Error('Each LinearRing of a Polygon must have 4 or more Positions.');
	        }
	        for (var j = 0; j < ring[ring.length - 1].length; j++) {
	            if (ring[ring.length - 1][j] !== ring[0][j]) {
	                throw new Error('First and last Position are not equivalent.');
	            }
	        }
	    }

	    return feature({
	        type: 'Polygon',
	        coordinates: coordinates
	    }, properties);
	};

	/**
	 * Creates a {@link LineString} based on a
	 * coordinate array. Properties can be added optionally.
	 *
	 * @name lineString
	 * @param {Array<Array<number>>} coordinates an array of Positions
	 * @param {Object=} properties an Object of key-value pairs to add as properties
	 * @returns {Feature<LineString>} a LineString feature
	 * @throws {Error} if no coordinates are passed
	 * @example
	 * var linestring1 = turf.lineString([
	 *   [-21.964416, 64.148203],
	 *   [-21.956176, 64.141316],
	 *   [-21.93901, 64.135924],
	 *   [-21.927337, 64.136673]
	 * ]);
	 * var linestring2 = turf.lineString([
	 *   [-21.929054, 64.127985],
	 *   [-21.912918, 64.134726],
	 *   [-21.916007, 64.141016],
	 *   [-21.930084, 64.14446]
	 * ], {name: 'line 1', distance: 145});
	 *
	 * //=linestring1
	 *
	 * //=linestring2
	 */
	module.exports.lineString = function (coordinates, properties) {
	    if (!coordinates) throw new Error('No coordinates passed');

	    return feature({
	        type: 'LineString',
	        coordinates: coordinates
	    }, properties);
	};

	/**
	 * Takes one or more {@link Feature|Features} and creates a {@link FeatureCollection}.
	 *
	 * @name featureCollection
	 * @param {Feature[]} features input features
	 * @returns {FeatureCollection} a FeatureCollection of input features
	 * @example
	 * var features = [
	 *  turf.point([-75.343, 39.984], {name: 'Location A'}),
	 *  turf.point([-75.833, 39.284], {name: 'Location B'}),
	 *  turf.point([-75.534, 39.123], {name: 'Location C'})
	 * ];
	 *
	 * var fc = turf.featureCollection(features);
	 *
	 * //=fc
	 */
	module.exports.featureCollection = function (features) {
	    if (!features) throw new Error('No features passed');

	    return {
	        type: 'FeatureCollection',
	        features: features
	    };
	};

	/**
	 * Creates a {@link Feature<MultiLineString>} based on a
	 * coordinate array. Properties can be added optionally.
	 *
	 * @name multiLineString
	 * @param {Array<Array<Array<number>>>} coordinates an array of LineStrings
	 * @param {Object=} properties an Object of key-value pairs to add as properties
	 * @returns {Feature<MultiLineString>} a MultiLineString feature
	 * @throws {Error} if no coordinates are passed
	 * @example
	 * var multiLine = turf.multiLineString([[[0,0],[10,10]]]);
	 *
	 * //=multiLine
	 *
	 */
	module.exports.multiLineString = function (coordinates, properties) {
	    if (!coordinates) throw new Error('No coordinates passed');

	    return feature({
	        type: 'MultiLineString',
	        coordinates: coordinates
	    }, properties);
	};

	/**
	 * Creates a {@link Feature<MultiPoint>} based on a
	 * coordinate array. Properties can be added optionally.
	 *
	 * @name multiPoint
	 * @param {Array<Array<number>>} coordinates an array of Positions
	 * @param {Object=} properties an Object of key-value pairs to add as properties
	 * @returns {Feature<MultiPoint>} a MultiPoint feature
	 * @throws {Error} if no coordinates are passed
	 * @example
	 * var multiPt = turf.multiPoint([[0,0],[10,10]]);
	 *
	 * //=multiPt
	 *
	 */
	module.exports.multiPoint = function (coordinates, properties) {
	    if (!coordinates) throw new Error('No coordinates passed');

	    return feature({
	        type: 'MultiPoint',
	        coordinates: coordinates
	    }, properties);
	};


	/**
	 * Creates a {@link Feature<MultiPolygon>} based on a
	 * coordinate array. Properties can be added optionally.
	 *
	 * @name multiPolygon
	 * @param {Array<Array<Array<Array<number>>>>} coordinates an array of Polygons
	 * @param {Object=} properties an Object of key-value pairs to add as properties
	 * @returns {Feature<MultiPolygon>} a multipolygon feature
	 * @throws {Error} if no coordinates are passed
	 * @example
	 * var multiPoly = turf.multiPolygon([[[[0,0],[0,10],[10,10],[10,0],[0,0]]]]);
	 *
	 * //=multiPoly
	 *
	 */
	module.exports.multiPolygon = function (coordinates, properties) {
	    if (!coordinates) throw new Error('No coordinates passed');

	    return feature({
	        type: 'MultiPolygon',
	        coordinates: coordinates
	    }, properties);
	};

	/**
	 * Creates a {@link Feature<GeometryCollection>} based on a
	 * coordinate array. Properties can be added optionally.
	 *
	 * @name geometryCollection
	 * @param {Array<{Geometry}>} geometries an array of GeoJSON Geometries
	 * @param {Object=} properties an Object of key-value pairs to add as properties
	 * @returns {Feature<GeometryCollection>} a GeoJSON GeometryCollection Feature
	 * @example
	 * var pt = {
	 *     "type": "Point",
	 *       "coordinates": [100, 0]
	 *     };
	 * var line = {
	 *     "type": "LineString",
	 *     "coordinates": [ [101, 0], [102, 1] ]
	 *   };
	 * var collection = turf.geometryCollection([pt, line]);
	 *
	 * //=collection
	 */
	module.exports.geometryCollection = function (geometries, properties) {
	    if (!geometries) throw new Error('No geometries passed');

	    return feature({
	        type: 'GeometryCollection',
	        geometries: geometries
	    }, properties);
	};

	var factors = {
	    miles: 3960,
	    nauticalmiles: 3441.145,
	    degrees: 57.2957795,
	    radians: 1,
	    inches: 250905600,
	    yards: 6969600,
	    meters: 6373000,
	    metres: 6373000,
	    kilometers: 6373,
	    kilometres: 6373,
	    feet: 20908792.65
	};

	/*
	 * Convert a distance measurement from radians to a more friendly unit.
	 *
	 * @name radiansToDistance
	 * @param {number} distance in radians across the sphere
	 * @param {string} [units=kilometers] can be degrees, radians, miles, or kilometers
	 * inches, yards, metres, meters, kilometres, kilometers.
	 * @returns {number} distance
	 */
	module.exports.radiansToDistance = function (radians, units) {
	    var factor = factors[units || 'kilometers'];
	    if (factor === undefined) throw new Error('Invalid unit');

	    return radians * factor;
	};

	/*
	 * Convert a distance measurement from a real-world unit into radians
	 *
	 * @name distanceToRadians
	 * @param {number} distance in real units
	 * @param {string} [units=kilometers] can be degrees, radians, miles, or kilometers
	 * inches, yards, metres, meters, kilometres, kilometers.
	 * @returns {number} radians
	 */
	module.exports.distanceToRadians = function (distance, units) {
	    var factor = factors[units || 'kilometers'];
	    if (factor === undefined) throw new Error('Invalid unit');

	    return distance / factor;
	};

	/*
	 * Convert a distance measurement from a real-world unit into degrees
	 *
	 * @name distanceToRadians
	 * @param {number} distance in real units
	 * @param {string} [units=kilometers] can be degrees, radians, miles, or kilometers
	 * inches, yards, metres, meters, kilometres, kilometers.
	 * @returns {number} degrees
	 */
	module.exports.distanceToDegrees = function (distance, units) {
	    var factor = factors[units || 'kilometers'];
	    if (factor === undefined) throw new Error('Invalid unit');

	    return (distance / factor) * 57.2958;
	};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	var point = __webpack_require__(40).point;
	var polygon = __webpack_require__(40).polygon;
	var distance = __webpack_require__(42);
	var featurecollection = __webpack_require__(40).featureCollection;

	//Precompute cosines and sines of angles used in hexagon creation
	// for performance gain
	var cosines = [];
	var sines = [];
	for (var i = 0; i < 6; i++) {
	    var angle = 2 * Math.PI / 6 * i;
	    cosines.push(Math.cos(angle));
	    sines.push(Math.sin(angle));
	}

	/**
	 * Takes a bounding box and a cell size in degrees and returns a {@link FeatureCollection} of flat-topped
	 * hexagons ({@link Polygon} features) aligned in an "odd-q" vertical grid as
	 * described in [Hexagonal Grids](http://www.redblobgames.com/grids/hexagons/).
	 *
	 * @name hexGrid
	 * @param {Array<number>} bbox extent in [minX, minY, maxX, maxY] order
	 * @param {number} cellSize dimension of cell in specified units
	 * @param {string} [units=kilometers] used in calculating cellSize, can be degrees, radians, miles, or kilometers
	 * @param {boolean} [triangles=false] whether to return as triangles instead of hexagons
	 * @returns {FeatureCollection<Polygon>} a hexagonal grid
	 * @example
	 * var bbox = [-96,31,-84,40];
	 * var cellSize = 50;
	 * var units = 'miles';
	 *
	 * var hexgrid = turf.hexGrid(bbox, cellSize, units);
	 *
	 * //=hexgrid
	 */
	module.exports = function hexGrid(bbox, cellSize, units, triangles) {
	    var xFraction = cellSize / (distance(point([bbox[0], bbox[1]]), point([bbox[2], bbox[1]]), units));
	    var cellWidth = xFraction * (bbox[2] - bbox[0]);
	    var yFraction = cellSize / (distance(point([bbox[0], bbox[1]]), point([bbox[0], bbox[3]]), units));
	    var cellHeight = yFraction * (bbox[3] - bbox[1]);
	    var radius = cellWidth / 2;

	    var hex_width = radius * 2;
	    var hex_height = Math.sqrt(3) / 2 * cellHeight;

	    var box_width = bbox[2] - bbox[0];
	    var box_height = bbox[3] - bbox[1];

	    var x_interval = 3 / 4 * hex_width;
	    var y_interval = hex_height;

	    var x_span = box_width / (hex_width - radius / 2);
	    var x_count = Math.ceil(x_span);
	    if (Math.round(x_span) === x_count) {
	        x_count++;
	    }

	    var x_adjust = ((x_count * x_interval - radius / 2) - box_width) / 2 - radius / 2;

	    var y_count = Math.ceil(box_height / hex_height);

	    var y_adjust = (box_height - y_count * hex_height) / 2;

	    var hasOffsetY = y_count * hex_height - box_height > hex_height / 2;
	    if (hasOffsetY) {
	        y_adjust -= hex_height / 4;
	    }

	    var fc = featurecollection([]);
	    for (var x = 0; x < x_count; x++) {
	        for (var y = 0; y <= y_count; y++) {

	            var isOdd = x % 2 === 1;
	            if (y === 0 && isOdd) {
	                continue;
	            }

	            if (y === 0 && hasOffsetY) {
	                continue;
	            }

	            var center_x = x * x_interval + bbox[0] - x_adjust;
	            var center_y = y * y_interval + bbox[1] + y_adjust;

	            if (isOdd) {
	                center_y -= hex_height / 2;
	            }
	            if (triangles) {
	                fc.features.push.apply(fc.features, hexTriangles([center_x, center_y], cellWidth / 2, cellHeight / 2));
	            } else {
	                fc.features.push(hexagon([center_x, center_y], cellWidth / 2, cellHeight / 2));
	            }
	        }
	    }

	    return fc;
	};

	//Center should be [x, y]
	function hexagon(center, rx, ry) {
	    var vertices = [];
	    for (var i = 0; i < 6; i++) {
	        var x = center[0] + rx * cosines[i];
	        var y = center[1] + ry * sines[i];
	        vertices.push([x, y]);
	    }
	    //first and last vertex must be the same
	    vertices.push(vertices[0]);
	    return polygon([vertices]);
	}

	//Center should be [x, y]
	function hexTriangles(center, rx, ry) {
	    var triangles = [];
	    for (var i = 0; i < 6; i++) {
	        var vertices = [];
	        vertices.push(center);
	        vertices.push([
	            center[0] + rx * cosines[i],
	            center[1] + ry * sines[i]
	        ]);
	        vertices.push([
	            center[0] + rx * cosines[(i + 1) % 6],
	            center[1] + ry * sines[(i + 1) % 6]
	        ]);
	        vertices.push(center);
	        triangles.push(polygon([vertices]));
	    }
	    return triangles;
	}


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	var getCoord = __webpack_require__(43).getCoord;
	var radiansToDistance = __webpack_require__(40).radiansToDistance;
	//http://en.wikipedia.org/wiki/Haversine_formula
	//http://www.movable-type.co.uk/scripts/latlong.html

	/**
	 * Calculates the distance between two {@link Point|points} in degrees, radians,
	 * miles, or kilometers. This uses the
	 * [Haversine formula](http://en.wikipedia.org/wiki/Haversine_formula)
	 * to account for global curvature.
	 *
	 * @name distance
	 * @param {Feature<Point>} from origin point
	 * @param {Feature<Point>} to destination point
	 * @param {string} [units=kilometers] can be degrees, radians, miles, or kilometers
	 * @returns {number} distance between the two points
	 * @example
	 * var from = {
	 *   "type": "Feature",
	 *   "properties": {},
	 *   "geometry": {
	 *     "type": "Point",
	 *     "coordinates": [-75.343, 39.984]
	 *   }
	 * };
	 * var to = {
	 *   "type": "Feature",
	 *   "properties": {},
	 *   "geometry": {
	 *     "type": "Point",
	 *     "coordinates": [-75.534, 39.123]
	 *   }
	 * };
	 * var units = "miles";
	 *
	 * var points = {
	 *   "type": "FeatureCollection",
	 *   "features": [from, to]
	 * };
	 *
	 * //=points
	 *
	 * var distance = turf.distance(from, to, units);
	 *
	 * //=distance
	 */
	module.exports = function (from, to, units) {
	    var degrees2radians = Math.PI / 180;
	    var coordinates1 = getCoord(from);
	    var coordinates2 = getCoord(to);
	    var dLat = degrees2radians * (coordinates2[1] - coordinates1[1]);
	    var dLon = degrees2radians * (coordinates2[0] - coordinates1[0]);
	    var lat1 = degrees2radians * coordinates1[1];
	    var lat2 = degrees2radians * coordinates2[1];

	    var a = Math.pow(Math.sin(dLat / 2), 2) +
	          Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);

	    return radiansToDistance(2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)), units);
	};


/***/ }),
/* 43 */
/***/ (function(module, exports) {

	/**
	 * Unwrap a coordinate from a Point Feature, Geometry or a single coordinate.
	 *
	 * @param {Array<any>|Geometry|Feature<Point>} obj any value
	 * @returns {Array<number>} coordinates
	 */
	function getCoord(obj) {
	    if (!obj) throw new Error('No obj passed');

	    var coordinates = getCoords(obj);

	    // getCoord() must contain at least two numbers (Point)
	    if (coordinates.length > 1 &&
	        typeof coordinates[0] === 'number' &&
	        typeof coordinates[1] === 'number') {
	        return coordinates;
	    } else {
	        throw new Error('Coordinate is not a valid Point');
	    }
	}

	/**
	 * Unwrap coordinates from a Feature, Geometry Object or an Array of numbers
	 *
	 * @param {Array<any>|Geometry|Feature<any>} obj any value
	 * @returns {Array<any>} coordinates
	 */
	function getCoords(obj) {
	    if (!obj) throw new Error('No obj passed');
	    var coordinates;

	    // Array of numbers
	    if (obj.length) {
	        coordinates = obj;

	    // Geometry Object
	    } else if (obj.coordinates) {
	        coordinates = obj.coordinates;

	    // Feature
	    } else if (obj.geometry && obj.geometry.coordinates) {
	        coordinates = obj.geometry.coordinates;
	    }
	    // Checks if coordinates contains a number
	    if (coordinates) {
	        containsNumber(coordinates);
	        return coordinates;
	    }
	    throw new Error('No valid coordinates');
	}

	/**
	 * Checks if coordinates contains a number
	 *
	 * @private
	 * @param {Array<any>} coordinates GeoJSON Coordinates
	 * @returns {boolean} true if Array contains a number
	 */
	function containsNumber(coordinates) {
	    if (coordinates.length > 1 &&
	        typeof coordinates[0] === 'number' &&
	        typeof coordinates[1] === 'number') {
	        return true;
	    }
	    if (coordinates[0].length) {
	        return containsNumber(coordinates[0]);
	    }
	    throw new Error('coordinates must only contain numbers');
	}

	/**
	 * Enforce expectations about types of GeoJSON objects for Turf.
	 *
	 * @alias geojsonType
	 * @param {GeoJSON} value any GeoJSON object
	 * @param {string} type expected GeoJSON type
	 * @param {string} name name of calling function
	 * @throws {Error} if value is not the expected type.
	 */
	function geojsonType(value, type, name) {
	    if (!type || !name) throw new Error('type and name required');

	    if (!value || value.type !== type) {
	        throw new Error('Invalid input to ' + name + ': must be a ' + type + ', given ' + value.type);
	    }
	}

	/**
	 * Enforce expectations about types of {@link Feature} inputs for Turf.
	 * Internally this uses {@link geojsonType} to judge geometry types.
	 *
	 * @alias featureOf
	 * @param {Feature} feature a feature with an expected geometry type
	 * @param {string} type expected GeoJSON type
	 * @param {string} name name of calling function
	 * @throws {Error} error if value is not the expected type.
	 */
	function featureOf(feature, type, name) {
	    if (!feature) throw new Error('No feature passed');
	    if (!name) throw new Error('.featureOf() requires a name');
	    if (!feature || feature.type !== 'Feature' || !feature.geometry) {
	        throw new Error('Invalid input to ' + name + ', Feature with geometry required');
	    }
	    if (!feature.geometry || feature.geometry.type !== type) {
	        throw new Error('Invalid input to ' + name + ': must be a ' + type + ', given ' + feature.geometry.type);
	    }
	}

	/**
	 * Enforce expectations about types of {@link FeatureCollection} inputs for Turf.
	 * Internally this uses {@link geojsonType} to judge geometry types.
	 *
	 * @alias collectionOf
	 * @param {FeatureCollection} featureCollection a FeatureCollection for which features will be judged
	 * @param {string} type expected GeoJSON type
	 * @param {string} name name of calling function
	 * @throws {Error} if value is not the expected type.
	 */
	function collectionOf(featureCollection, type, name) {
	    if (!featureCollection) throw new Error('No featureCollection passed');
	    if (!name) throw new Error('.collectionOf() requires a name');
	    if (!featureCollection || featureCollection.type !== 'FeatureCollection') {
	        throw new Error('Invalid input to ' + name + ', FeatureCollection required');
	    }
	    for (var i = 0; i < featureCollection.features.length; i++) {
	        var feature = featureCollection.features[i];
	        if (!feature || feature.type !== 'Feature' || !feature.geometry) {
	            throw new Error('Invalid input to ' + name + ', Feature with geometry required');
	        }
	        if (!feature.geometry || feature.geometry.type !== type) {
	            throw new Error('Invalid input to ' + name + ': must be a ' + type + ', given ' + feature.geometry.type);
	        }
	    }
	}

	module.exports.geojsonType = geojsonType;
	module.exports.collectionOf = collectionOf;
	module.exports.featureOf = featureOf;
	module.exports.getCoord = getCoord;
	module.exports.getCoords = getCoords;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	//http://en.wikipedia.org/wiki/Haversine_formula
	//http://www.movable-type.co.uk/scripts/latlong.html
	var getCoord = __webpack_require__(43).getCoord;
	var helpers = __webpack_require__(40);
	var point = helpers.point;
	var distanceToRadians = helpers.distanceToRadians;

	/**
	 * Takes a {@link Point} and calculates the location of a destination point given a distance in degrees, radians, miles, or kilometers; and bearing in degrees. This uses the [Haversine formula](http://en.wikipedia.org/wiki/Haversine_formula) to account for global curvature.
	 *
	 * @name destination
	 * @param {Feature<Point>} from starting point
	 * @param {number} distance distance from the starting point
	 * @param {number} bearing ranging from -180 to 180
	 * @param {string} [units=kilometers] miles, kilometers, degrees, or radians
	 * @returns {Feature<Point>} destination point
	 * @example
	 * var point = {
	 *   "type": "Feature",
	 *   "properties": {
	 *     "marker-color": "#0f0"
	 *   },
	 *   "geometry": {
	 *     "type": "Point",
	 *     "coordinates": [-75.343, 39.984]
	 *   }
	 * };
	 * var distance = 50;
	 * var bearing = 90;
	 * var units = 'miles';
	 *
	 * var destination = turf.destination(point, distance, bearing, units);
	 * destination.properties['marker-color'] = '#f00';
	 *
	 * var result = {
	 *   "type": "FeatureCollection",
	 *   "features": [point, destination]
	 * };
	 *
	 * //=result
	 */
	module.exports = function (from, distance, bearing, units) {
	    var degrees2radians = Math.PI / 180;
	    var radians2degrees = 180 / Math.PI;
	    var coordinates1 = getCoord(from);
	    var longitude1 = degrees2radians * coordinates1[0];
	    var latitude1 = degrees2radians * coordinates1[1];
	    var bearing_rad = degrees2radians * bearing;

	    var radians = distanceToRadians(distance, units);

	    var latitude2 = Math.asin(Math.sin(latitude1) * Math.cos(radians) +
	        Math.cos(latitude1) * Math.sin(radians) * Math.cos(bearing_rad));
	    var longitude2 = longitude1 + Math.atan2(Math.sin(bearing_rad) *
	        Math.sin(radians) * Math.cos(latitude1),
	        Math.cos(radians) - Math.sin(latitude1) * Math.sin(latitude2));

	    return point([radians2degrees * longitude2, radians2degrees * latitude2]);
	};


/***/ })
/******/ ])
});
;