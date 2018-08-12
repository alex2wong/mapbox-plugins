const satSource = {
    "custom-tms": {   
        'type': 'raster',
        'tiles': [
            // "https://huangyixiu.co:3003/proxy?proxyURI=http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
            "http://www.google.cn/maps/vt?lyrs=s@702&gl=cn&x={x}&y={y}&z={z}",
            // "https://c.tiles.mapbox.com/v3/osmbuildings.kbpalbpk/{z}/{x}/{y}.png",
            // "http://b.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ],
        'tileSize': 256
    },
};

const streetSource = {
    "custom-tms": {   
        'type': 'raster',
        'tiles': [
            'http://www.google.cn/maps/vt?pb=!1m5!1m4!1i{z}!2i{x}!3i{y}!4i256!2m3!1e0!2sm!3i342009817!3m9!2sen-US!3sCN!5e18!12m1!1e47!12m3!1e37!2m1!1ssmartmaps!4e0&token=32965',
        ],
        'tileSize': 256
    },
}

const tk = "pk.eyJ1IjoiaHVhbmd5aXhpdSIsImEiOiI2WjVWR1hFIn0.1P90Q-tkbHS38BvnrhTI6w";

const basicStyle = {
    "version": 8,
    "sprite": "https://alex2wong.github.io/mapbox-plugins/assets/sprite",
    // "sprite": "../../assets/sprite",
    "glyphs": "https://alex2wong.github.io/mapbox-plugins/{fontstack}/{range}.pbf",
    "sources": satSource,
    "layers": [
        {
            'id': 'custom-tms',
            'type': 'raster',
            'source': 'custom-tms',
            'paint': {}
        },
    ]
}

const streetStyle = {
    "version": 8,
    "sprite": "https://alex2wong.github.io/mapbox-plugins/assets/sprite",
    // "sprite": "../../assets/sprite",
    "glyphs": "https://alex2wong.github.io/mapbox-plugins/{fontstack}/{range}.pbf",
    "sources": streetSource,
    "layers": [
        {
            'id': 'custom-tms',
            'type': 'raster',
            'source': 'custom-tms',
            'paint': {}
        },
    ]
}

export {
    tk,
    basicStyle,
    streetStyle,
};
