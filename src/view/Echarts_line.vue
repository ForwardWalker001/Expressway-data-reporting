<template>
  <div id="line" ref="chart" style="width:65%;height:450px">折线图</div>
</template>

<script>
export default {
  data() {
    return {
      initChart: null,
      resChart: null,
      option: {
        title: {
          text: "近十天信息上报数量",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: ["单位信息", "机房信息", "信息系统信息", "硬件资源信息", "威胁情报"],
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["一", "二", "三", "四", "五", "六", "七","八","九","十"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "单位信息",
            type: "line",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [120, 132, 101, 134, 90, 230, 210,100,300,350],
          },
          {
            name: "机房信息",
            type: "line",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [220, 182, 191, 234, 290, 330, 310,200,500,450],
          },
          {
            name: "信息系统信息",
            type: "line",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [150, 232, 201, 154, 190, 330, 410,650,230,120],
          },
          {
            name: "硬件资源信息",
            type: "line",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [320, 332, 301, 334, 390, 330, 320,400,200,120],
          },
          {
            name: "威胁情报",
            type: "line",
            label: {
              show: true,
              position: "top",
            },
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [820, 932, 901, 934, 1290, 1330, 1320,100,300,200],
          },
        ],
      },
    };
  },
  mounted() {
    this.initEcharts(this.option);
    window.addEventListener('resize', this.handleResize)
  },
  methods: {
    initEcharts(option) {
      const dom = this.$refs.chart;
      this.initChart = this.$echarts.init(dom);
      this.resChart = this.initChart.setOption(option);
    },
    handleResize () {
      this.initChart && this.initChart.resize()
    }
  },
  beforeDestroy() {
    this.initChart && this.initChart.dispose()
    this.initChart = null
    window.removeEventListener('resize', this.handleResize)
  }
};
</script>

<style lang="less" scoped>
#line {
  margin: 50px auto;
}
</style>