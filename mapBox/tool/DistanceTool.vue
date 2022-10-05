<template>
  <div class="measure" @click="openMeasure()">
    <img src="@/assets/logo.png" alt="" />
  </div>
</template>
  <script>
export default {
  inject: ["distance"],
  data() {
    return {
      showMeasure: true,
    };
  },
  methods: {
    //打开测量工具
    openMeasure() {
      if (this.showMeasure) {
        this.distance().start();
      } else {
        this.distance().cancel();
      }
      this.showMeasure = !this.showMeasure;
    },
  },
};
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
    .measure {
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 100;
        cursor: pointer;
    }
</style>
    