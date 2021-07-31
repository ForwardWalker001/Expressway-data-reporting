<template>
  <div id="pip">饼状图</div>
</template>

<script>
export default {
  data() {
    return {
      initChart: null,
      resChart: null,
      option: {
        title: {
          text: "总信息上报情况",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
            toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
        series: [
          {
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "机房信息上报" },
              { value: 735, name: "单位信息上报" },
              { value: 580, name: "信息系统上报" },
              { value: 484, name: "硬件资源上报" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
    };
  },
  mounted() {
    this.initEcharts(this.option);
  },
  methods: {
    initEcharts(option) {
      var dom = document.getElementById("pip");
      this.initChart = this.$echarts.init(dom);
      this.resChart = this.initChart.setOption(option);
    },
  },
};
</script>

<style lang="less" scoped>
#pip {
  width: 400px;
  height: 300px;
}
</style>