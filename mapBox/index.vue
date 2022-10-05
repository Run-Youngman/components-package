<template>
  <div class="mapbox-container">
    <mapb ref="mapbox" :onload="onload">
      <distance-tool></distance-tool>
    </mapb>
  </div>
</template>
<script>
import mapb from './component/map'
import DistanceTool from './tool/DistanceTool'
export default {
  name: "mapBox",
  components: {
    mapb,
    DistanceTool
  },
  data() {
    return {
      array1: [
        [120.58305616239, 30.052273283894],
        [120.58823713531, 30.052169796647],
      ],
      array2: [
        [120.53424061787, 30.09975780023],
        [120.53412482843, 30.094867682257],
      ],
      array3: [
        [120.35247831162, 30.171896146158],
        [120.35505927994, 30.166079711287],
       
      ]
    };
  },
  methods: {
    onload() {
      this.$refs.mapbox.addBaseMap()
      this.drwaLine()
    },
    drwaLine() {
      let options = {
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#6FFFFF",
          "line-width": 4,
          // "line-dasharray": [1, 1], // 绘制线段
        },
      };
      this.$refs.mapbox.drwaLine(this.array1, "line1", options);
      this.$refs.mapbox.drwaLine(this.array2, "line2", options);
      this.$refs.mapbox.drwaLine(this.array3, "line3", options);
    }
  },
  mounted() {

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
  