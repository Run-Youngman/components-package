<template>
  <div class="mapbox-container">
    <div class="mapbox-container" id="mapContainer">
        <slot></slot>
    </div>
  </div>
</template>
  <script>
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import DistanceTool from "../utils/DistanceTool.js";
import DrawTool from "../utils/DrawTool.js";
import { config } from "../config/config";
var map = null;
var drawTool = null;
export default {
    provide() {
    return {
      distance: this.getDistance,
    }
  },
  props: {
    onload: {
      type: Function,
    },
  },
  data() {
    return {
        distance: null
    };
  },
  methods: {
    addBaseMap() {
      map.addSource("tdtVec", {
        type: "raster",
        tiles: [config.tdTVecUrl],
        //分辨率
        tileSize: 256,
      });
      map.addSource("tdtCva", {
        type: "raster",
        tiles: [config.tdTFlagUrl],
        tileSize: 256,
      });
      map.addLayer({
        id: "tdtVec",
        type: "raster",
        source: "tdtVec",
        minzoom: 0,
        maxzoom: 17,
      });
      map.addLayer({
        id: "tdtCva",
        type: "raster",
        source: "tdtCva",
        minzoom: 0,
        maxzoom: 17,
      });
    },
    getDistance() {
        return this.distance
    },
    drwaLine(array, id, options) {
        drawTool.drwaLine(array, id, options)
    }
  },
  mounted() {
    let that = this;
    mapboxgl.accessToken = config.pk;
    map = new mapboxgl.Map({
      container: "mapContainer",
      // style: "mapbox://styles/mapbox/streets-v11",
      // style: {
      //   // 加载空白底图
      style: {
        version: 8,
        layers: [],
        sources: {},
      },
      center: [120.52504674844783, 30.0506195981487],
      zoom: 10.168342029971926,
    });
    this.distance = new DistanceTool(map);
    drawTool = new DrawTool(map);
    map.on("load", () => {
      that.onload();
    });
  },
};
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
.start-compute {
  position: absolute;
  left: 20px;
  top: 20px;
  color: aqua;
  cursor: pointer;
  z-index: 999;
}
</style>
    <style>
.mapbox-container {
  width: 100%;
  height: 820px;
  padding: 0;
  margin: 0;
}
.station_label {
  background-color: transparent;
  width: 64px;
  height: 18px;
}
.station_label > span {
  width: max-content;
  color: #b1efff;
  letter-spacing: 0.04em;
  background-color: #1857c1;
  display: block;
  padding: 2px 4px;
}
</style>
    