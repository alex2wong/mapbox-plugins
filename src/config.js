export default {
    tk: "pk.eyJ1IjoiaHVhbmd5aXhpdSIsImEiOiI2WjVWR1hFIn0.1P90Q-tkbHS38BvnrhTI6w",
    mapStyles: {
        "version": 8,
        "sprite": "https://alex2wong.github.io/mapbox-plugins/assets/sprite",
        // "sprite": "../../assets/sprite",
        "glyphs": "https://alex2wong.github.io/mapbox-plugins/{fontstack}/{range}.pbf",
        "sources": {
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
        },
        "layers": [
            {
                'id': 'custom-tms',
                'type': 'raster',
                'source': 'custom-tms',
                'paint': {}
            },
        ]
    }
}