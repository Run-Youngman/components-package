import mapboxgl from "mapbox-gl";

export default class DrawTool {
    constructor(map) {
        this.map = map;
        window.mapbox = map;
    }
    /**
     *  根据提供坐标点，以及图片id，将图片放置到指定位置
     * @param {绘制坐标点，支持多个} stations 
     * @param {绘制图层ID} id 
     * @param {使用的图片ID} image 
     * @param {图片尺寸} iconSize 
     */
    drwaMarker(stations, id, image, iconSize) {
        let features = stations.map((item) => {
            return {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: item,
                },
            };
        });
        this.map.addLayer({
            id: id,
            type: "symbol",
            source: {
                type: "geojson",
                data: {
                    type: "FeatureCollection",
                    features: features,
                },
            },
            layout: {
                "icon-image": image,
                "icon-size": iconSize || 0.9,
            },
        });
    }
    /**
     * 
     * @param {站点列表} stations 
     * @param {绘制线路图层ID} id 
     * @param {绘制线路选项} options 
     */
    drwaLine(stations, id, options) {
        this.map.addLayer({
            id: id,
            type: "line",
            source: {
                type: "geojson",
                data: {
                    type: "Feature",
                    properties: {},
                    geometry: {
                        type: "LineString",
                        coordinates: stations,
                    },
                },
            },
            layout: options.layout,
            paint: options.paint
        });
    }

    /**
     * 
     * @param {坐标} positions 
     * @param {绘制样式包含label以及font} style 
     * @param {较坐标点偏移} offset 
     * @returns 
     */
    drawAreaLabel(positions, style, offset) {
        let array = []
        positions.map((item) => {
          const el = document.createElement("div");
        //   el.setAttribute("class", "area_label");
          el.setAttribute("class", style.label);
          const span = document.createElement("div");
        //   span.setAttribute("class", "area_font")
          span.setAttribute("class", style.font)
          span.textContent = item.name;
          el.appendChild(span);
          array.push(   // save the label ref to remove
            new mapboxgl.Marker(el, {
            //   offset: [0, -20],
              offset: offset,
            })
              .setLngLat(item.latlng)
              .addTo(this.map)
          );
        });
        return array
      }
}