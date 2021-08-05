<template>
  <div class="MainContainer">
    <!-- 头部的盒子 -->
    <header>
      <h2>高速公路数据可视化</h2>
      <div class="backBtn" @click="goBcak">返回主页面</div>
    </header>
    <!-- 页面主体部分 -->
    <section class="mainbox">
      <div class="column column1">
        <div class="panel bar">
          <h2>柱形图-各信息上报情况</h2>
          <div class="chart"></div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel line">
          <h2>
            折线图-信息上报曲线<a href="javascript:;">2020</a
            ><a href="javascript:;">2021</a>
          </h2>
          <div class="chart"></div>
          <div class="panel-footer"></div>
        </div>
      </div>
      <div class="column">
        <!-- no模块制作 -->
        <div class="no">
          <div class="no-hd">
            <ul>
              <li>{{ handleYN.Y }}</li>
              <li>{{ handleYN.N }}</li>
            </ul>
          </div>
          <div class="no-bd">
            <ul>
              <li>已处理信息</li>
              <li>未处理信息</li>
            </ul>
          </div>
        </div>
        <!-- 地图模块 -->
        <div class="map">
          <div class="map1"></div>
          <div class="map2"></div>
          <div class="map3"></div>
          <div class="chart"></div>
          <msg-show></msg-show>
        </div>
      </div>
      <div class="column column2">
        <div class="panel bar2">
          <h2>柱形图-指示器事件信息</h2>
          <div class="chart"></div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel pie">
          <h2>饼形图-威胁情报类型分布</h2>
          <div class="chart"></div>
          <div class="panel-footer"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import "../../node_modules/echarts/map/js/china.js"; // 引入中国地图数据
import msgShow from "../view/MsgShow";
export default {
  components: {
    msgShow,
  },
  data() {
    return {
      zhupic: [0, 0, 0, 0],
      mapData: [],
      count: [],
      pieData: [],
      map1: null,
      map2: null,
      map3: null,
      map4: null,
      map6: null,
      handleYN: {
        Y: 0,
        N: 0,
      },
    };
  },
  created() {},
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.map1 && this.map1.dispose();
    this.map1 = null;

    this.map2 && this.map2.dispose();
    this.map2 = null;

    this.map3 && this.map3.dispose();
    this.map3 = null;

    this.map4 && this.map4.dispose();
    this.map4 = null;

    this.map6 && this.map6.dispose();
    this.map6 = null;
  },
  methods: {
    init() {
      this.init01();

      this.init02();
      this.init03();
      this.init04();
      //this.init05();
      this.init06();
      //this.init07();
      this.handle1();
    },
    //返回主界面
    goBcak() {
      this.$router.push("/menuIndex/unitSys");
    },
    async handle1() {
      var { data: res } = await this.$axios.get(
        "test/threatintelligence/selectAllInformation"
      );
      res.data.InformationList.forEach((item) => {
        var status = item.status;
        if (status == 1) this.handleYN.Y++;
        if (status == 0) this.handleYN.N++;
      });
    },
    //地图模块
    async handle2() {
      var { data: res1 } = await this.$axios.get("exUnitServer/count");
      this.zhupic[0] = res1.data.data;
      //console.log(res1)

      var { data: res2 } = await this.$axios.get("exMachineRoomServer/count");
      this.zhupic[1] = res2.data.data;

      var { data: res3 } = await this.$axios.get("exMessageServer/count");
      this.zhupic[2] = res3.data.data;

      var { data: res4 } = await this.$axios.get("exHardwareServer/count");
      this.zhupic[3] = res4.data.data;

      console.log(this.zhupic);
    },
    //地图模块

    async init01() {
      var myChart = this.$echarts.init(document.querySelector(".map .chart"));

      await this.getAllInformation();

      var geoCoordMap = {
        上海: [121.4648, 31.2891],

        东莞: [113.8953, 22.901],

        东营: [118.7073, 37.5513],

        中山: [113.4229, 22.478],

        临汾: [111.4783, 36.1615],

        临沂: [118.3118, 35.2936],

        丹东: [124.541, 40.4242],

        丽水: [119.5642, 28.1854],

        乌鲁木齐: [87.9236, 43.5883],

        佛山: [112.8955, 23.1097],

        保定: [115.0488, 39.0948],

        兰州: [103.5901, 36.3043],

        包头: [110.3467, 41.4899],

        北京: [116.4551, 40.2539],

        北海: [109.314, 21.6211],

        南京: [118.8062, 31.9208],

        南宁: [108.479, 23.1152],

        南昌: [116.0046, 28.6633],

        南通: [121.1023, 32.1625],

        厦门: [118.1689, 24.6478],

        台州: [121.1353, 28.6688],

        合肥: [117.29, 32.0581],

        呼和浩特: [111.4124, 40.4901],

        咸阳: [108.4131, 34.8706],

        哈尔滨: [127.9688, 45.368],

        唐山: [118.4766, 39.6826],

        嘉兴: [120.9155, 30.6354],

        大同: [113.7854, 39.8035],

        大连: [122.2229, 39.4409],

        天津: [117.4219, 39.4189],

        太原: [112.3352, 37.9413],

        威海: [121.9482, 37.1393],

        宁波: [121.5967, 29.6466],

        宝鸡: [107.1826, 34.3433],

        宿迁: [118.5535, 33.7775],

        常州: [119.4543, 31.5582],

        广州: [113.5107, 23.2196],

        廊坊: [116.521, 39.0509],

        延安: [109.1052, 36.4252],

        张家口: [115.1477, 40.8527],

        徐州: [117.5208, 34.3268],

        德州: [116.6858, 37.2107],

        惠州: [114.6204, 23.1647],

        成都: [103.9526, 30.7617],

        扬州: [119.4653, 32.8162],

        承德: [117.5757, 41.4075],

        拉萨: [91.1865, 30.1465],

        无锡: [120.3442, 31.5527],

        日照: [119.2786, 35.5023],

        昆明: [102.9199, 25.4663],

        杭州: [119.5313, 29.8773],

        枣庄: [117.323, 34.8926],

        柳州: [109.3799, 24.9774],

        株洲: [113.5327, 27.0319],

        武汉: [114.3896, 30.6628],

        汕头: [117.1692, 23.3405],

        江门: [112.6318, 22.1484],

        沈阳: [123.1238, 42.1216],

        沧州: [116.8286, 38.2104],

        河源: [114.917, 23.9722],

        泉州: [118.3228, 25.1147],

        泰安: [117.0264, 36.0516],

        泰州: [120.0586, 32.5525],

        济南: [117.1582, 36.8701],

        济宁: [116.8286, 35.3375],

        海口: [110.3893, 19.8516],

        淄博: [118.0371, 36.6064],

        淮安: [118.927, 33.4039],

        深圳: [114.5435, 22.5439],

        清远: [112.9175, 24.3292],

        温州: [120.498, 27.8119],

        渭南: [109.7864, 35.0299],

        湖州: [119.8608, 30.7782],

        湘潭: [112.5439, 27.7075],

        滨州: [117.8174, 37.4963],

        潍坊: [119.0918, 36.524],

        烟台: [120.7397, 37.5128],

        玉溪: [101.9312, 23.8898],

        珠海: [113.7305, 22.1155],

        盐城: [120.2234, 33.5577],

        盘锦: [121.9482, 41.0449],

        石家庄: [114.4995, 38.1006],

        福州: [119.4543, 25.9222],

        秦皇岛: [119.2126, 40.0232],

        绍兴: [120.564, 29.7565],

        聊城: [115.9167, 36.4032],

        肇庆: [112.1265, 23.5822],

        舟山: [122.2559, 30.2234],

        苏州: [120.6519, 31.3989],

        莱芜: [117.6526, 36.2714],

        菏泽: [115.6201, 35.2057],

        营口: [122.4316, 40.4297],

        葫芦岛: [120.1575, 40.578],

        衡水: [115.8838, 37.7161],

        衢州: [118.6853, 28.8666],

        西宁: [101.4038, 36.8207],

        西安: [109.1162, 34.2004],

        贵阳: [106.6992, 26.7682],

        连云港: [119.1248, 34.552],

        邢台: [114.8071, 37.2821],

        邯郸: [114.4775, 36.535],

        郑州: [113.4668, 34.6234],

        鄂尔多斯: [108.9734, 39.2487],

        重庆: [107.7539, 30.1904],

        金华: [120.0037, 29.1028],

        铜川: [109.0393, 35.1947],

        银川: [106.3586, 38.1775],

        镇江: [119.4763, 31.9702],

        长春: [125.8154, 44.2584],

        长沙: [113.0823, 28.2568],

        长治: [112.8625, 36.4746],

        阳泉: [113.4778, 38.0951],

        青岛: [120.4651, 36.3373],

        韶关: [113.7964, 24.7028],
      };

      var planePath = "arrow";

      var convertData = function (data) {
        var res = [];

        for (var i = 0; i < data.length; i++) {
          var dataItem = data[i][0];

          var fromCoord = geoCoordMap[dataItem[0].name];

          var toCoord = geoCoordMap[dataItem[1].name];

          if (fromCoord && toCoord) {
            res.push({
              fromName: dataItem[0].name,

              toName: dataItem[1].name,

              coords: [fromCoord, toCoord],

              value: dataItem[1].value,
            });
          }
        }

        /*  console.log("init01 convertData res");

        console.log(res); */

        return res;
      };

      var color = ["#a6c84c", "#ffa022", "#46bee9"];

      var series = [];

      this.mapData.forEach(function (item, i) {
        series.push({
          type: "lines",

          zlevel: 2,

          symbol: ["none", "arrow"],

          symbolSize: 10,

          effect: {
            show: true,

            period: 6,

            trailLength: 0,

            symbol: planePath,

            symbolSize: 15,
          },

          lineStyle: {
            normal: {
              color: color[i % 3],

              width: 1,

              opacity: 0.6,

              curveness: 0.2,
            },
          },

          data: convertData(item),
        });
      });

      var option = {
        tooltip: {
          trigger: "item",

          formatter: function (params) {
            if (params.seriesType == "effectScatter") {
              return "线路：" + params.data.name + "" + params.data.value[2];
            } else if (params.seriesType == "lines") {
              return (
                params.data.fromName +
                ">" +
                params.data.toName +
                "<br />" +
                params.data.value
              );
            } else {
              return params.name;
            }
          },
        },

        geo: {
          map: "china",

          // 把地图放大1.2倍

          zoom: 1.2,

          label: {
            // 鼠标移动显示区域名称

            emphasis: {
              show: true,

              color: "#fff",
            },
          },

          roam: true,

          // 地图样式修改

          itemStyle: {
            normal: {
              areaColor: "rgba(34, 70, 168, 0.7)",

              borderColor: "#0692a4",
            },

            emphasis: {
              areaColor: "rgba(119, 139, 224, 0.548)",
            },
          },
        },

        series: series,
      };

      myChart.setOption(option);

      window.addEventListener("resize", function () {
        myChart.resize();
      });

      this.map1 = myChart;

      //console.log(myChart);
    },
    //柱形图左一
    async init02() {
      await this.handle2();
      //1，实例化对象
      var myChart = this.$echarts.init(document.querySelector(".bar .chart"));
      //2，指定配置项和数据
      var option = {
        color: ["#2f89cf"],
        // 提示框组件
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        // 修改图表位置大小
        grid: {
          left: "0%",
          top: "10px",
          right: "0%",
          bottom: "4%",
          containLabel: true,
        },
        // x轴相关配置
        xAxis: [
          {
            type: "category",
            data: ["单位信息", "机房信息", "信息系统", "硬件资源"],
            axisTick: {
              alignWithLabel: true,
            },
            // 修改刻度标签，相关样式
            axisLabel: {
              color: "rgba(255,255,255,0.8)",
              fontSize: 10,
            },
            // x轴样式不显示
            axisLine: {
              show: false,
            },
          },
        ],
        // y轴相关配置
        yAxis: [
          {
            type: "value",
            // 修改刻度标签，相关样式
            axisLabel: {
              color: "rgba(255,255,255,0.6)",
              fontSize: 12,
            },
            // y轴样式修改
            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255,0.6)",
                width: 2,
              },
            },
            // y轴分割线的颜色
            splitLine: {
              lineStyle: {
                color: "rgba(255,255,255,0.1)",
              },
            },
          },
        ],
        // 系列列表配置
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "35%",
            // ajax传动态数据
            data: this.zhupic,
            itemStyle: {
              // 修改柱子圆角
              barBorderRadius: 10,
            },
          },
        ],
      };
      myChart.setOption(option);
      //4.让图表根随屏幕自动去适应
      // window.addEventListener("resize", function () {
      //   myChart.resize();
      // });
      this.map2 = myChart;
    },
    //柱形图右一
    async init03() {
      await this.handle();
  
      // 1.实例化对象
      var myChart = this.$echarts.init(document.querySelector(".bar2 .chart"));
      // 声明颜色数组
      var myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448"];
      // 2.指定配置项和数据
      var option = {
        grid: {
          top: "10%",
          left: "22%",
          bottom: "10%",
          // containLabel: true
        },
        xAxis: {
          // 不显示x轴相关信息
          show: false,
        },
        yAxis: [
          {
            type: "category",
            // y轴数据反转，与数组的顺序一致
            inverse: true,
            // 不显示y轴线和刻度
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            // 将刻度标签文字设置为白色
            axisLabel: {
              color: "#fff",
            },
            data: ["最高级别", "高危", "中危", "低危"],
          },
          {
            // y轴数据反转，与数组的顺序一致
            inverse: true,
            show: true,
            // 不显示y轴线和刻度
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            // 将刻度标签文字设置为白色
            axisLabel: {
              color: "#fff",
            },
            //data: [60, 30, 50, 70],
          },
        ],
        series: [
          {
            // 第一组柱子（条状）
            name: "条",
            type: "bar",
            // 柱子之间的距离
            barCategoryGap: 50,
            // 柱子的宽度
            barWidth: 10,
            // 层级 相当于z-index
            yAxisIndex: 0,
            // 柱子更改样式
            itemStyle: {
              barBorderRadius: 20,
              // 此时的color可以修改柱子的颜色
              color: function (params) {
                // params 传进来的是柱子的对象
                // dataIndex 是当前柱子的索引号
                // console.log(params);
                return myColor[params.dataIndex];
              },
            },
            data: this.count,
            // 显示柱子内的百分比文字
            label: {
              show: true,
              position: "inside",
              // {c} 会自动解析为数据（data内的数据）
              //formatter: "{c}%",
            },
          },
          {
            // 第二组柱子（框状 border）
            name: "框",
            type: "bar",
            // 柱子之间的距离
            barCategoryGap: 50,
            // 柱子的宽度
            barWidth: 14,
            // 层级 相当于z-index
            yAxisIndex: 1,
            // 柱子修改样式
            itemStyle: {
              color: "none",
              borderColor: "#00c1de",
              borderWidth: 2,
              barBorderRadius: 15,
            },
            //data: [100, 100, 100, 100, 100],
          },
        ],
      };
      // 3.把配置项给实例对象
      myChart.setOption(option);

      // 4.让图表随屏幕自适应
      // window.addEventListener("resize", function () {
      //   myChart.resize();
      // });
      this.map3 = myChart;
    },
    //折线图左二
    init04() {
      // 年份对应数据
      var yearData = [
        {
          data: [
            // 四个数组是因为有两条线
            [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
            [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],
            [90, 80, 100, 60, 150, 200, 230, 180, 150, 200, 240, 190],
            [123, 54, 234, 60, 80, 150, 243, 200, 70, 345, 232, 200],
          ],
        },
      ];

      var myChart = this.$echarts.init(document.querySelector(".line .chart"));
      var option = {
        // 修改四条线的颜色
        color: ["#00f2f1", "#ed3f35", "#FFB6C1", "#9370DB"],
        tooltip: {
          trigger: "axis",
        },
        // 图例组件
        legend: {
          // 当serise 有name值时， legend 不需要写data
          // 修改图例组件文字颜色
          textStyle: {
            color: "#4c9bfd",
          },
          right: "10%",
        },
        grid: {
          top: "20%",
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
          show: true, // 显示边框
          borderColor: "#012f4a", // 边框颜色
        },
        xAxis: {
          type: "category",
          boundaryGap: false, // 去除轴间距
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
          ],
          // 去除刻度线
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: "#4c9bfb", // x轴文本颜色
          },
          axisLine: {
            show: false, // 去除轴线
          },
        },
        yAxis: {
          type: "value",
          // 去除刻度线
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: "#4c9bfb", // x轴文本颜色
          },
          axisLine: {
            show: false, // 去除轴线
          },
          splitLine: {
            lineStyle: {
              color: "#012f4a",
            },
          },
        },
        series: [
          {
            type: "line",
            smooth: true, // 圆滑的线
            name: "单位信息",
            data: yearData[0].data[0],
          },
          {
            type: "line",
            smooth: true, // 圆滑的线
            name: "机房信息",
            data: yearData[0].data[1],
          },
          {
            type: "line",
            smooth: true, // 圆滑的线
            name: "信息系统",
            data: yearData[0].data[2],
          },
          {
            type: "line",
            smooth: true, // 圆滑的线
            name: "硬件资源",
            data: yearData[0].data[3],
          },
        ],
      };
      myChart.setOption(option);

      // 4.让图表随屏幕自适应
      // window.addEventListener("resize", function () {
      //   myChart.resize();
      // });
      this.map4 = myChart;
    },
    //折线图右二

    //饼状图左三
    async init06() {
      await this.handlePie();
      var myChart = this.$echarts.init(document.querySelector(".pie .chart"));
      var option = {
        color: [
          "#1089E7",
          "#F57474",
          "#56D0E3",
          "#F8B448",
          "#8B78F6",
          "#D9D919",
        ],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          // 垂直居中,默认水平居中
          // orient: 'vertical',

          bottom: 0,
          left: 10,
          // 小图标的宽度和高度
          itemWidth: 10,
          itemHeight: 10,
          // 修改图例组件的文字为 12px
          textStyle: {
            color: "rgba(255,255,255,.5)",
            fontSize: "10",
          },
        },
        series: [
          {
            name: "攻击类型",
            type: "pie",
            // 设置饼形图在容器中的位置
            center: ["50%", "42%"],
            // 修改饼形图大小，第一个为内圆半径，第二个为外圆半径
            radius: ["40%", "60%"],
            avoidLabelOverlap: false,
            // 图形上的文字
            label: {
              show: false,
              position: "center",
            },
            // 链接文字和图形的线
            labelLine: {
              show: false,
            },
            data: [
              {
                value: this.pieData[0],
                name: "流量攻击",
              },
              {
                value: this.pieData[1],
                name: "木马通信",
              },
              {
                value: this.pieData[2],
                name: "CC攻击",
              },
              {
                value: this.pieData[3],
                name: "网络监听",
              },
              {
                value: this.pieData[4],
                name: "IP攻击",
              },
            ],
          },
        ],
      };

      myChart.setOption(option);
      // window.addEventListener("resize", function () {
      //   myChart.resize();
      // });
      this.map6 = myChart;
    },
    //饼状图右三

    //获取数据维系情报信息
    async getAllInformation() {
      var { data: res } = await this.$axios.get(
        "test/threatintelligence/selectAllInformation"
      );
      if (res.code == 20000) {
        var InformationList = res.data.InformationList;
        this.handleInformation(InformationList);
      }
      //console.log(res);
    },
    //对获得的威胁情报进行处理
    handleInformation(InformationList) {
      var tempInformationList = [];
      InformationList.forEach((item) => {
        var s = item.enrichmentsGeoIpSrcAddrCountryCn;
        var d = item.enrichmentsGeoIpDstAddrCountryCn;
        var v = item.threatNum;
        var q = [{ name: s }, { name: d, value: v }];
        tempInformationList.push(q);
      });
      var map = new Map();
      for (let i = 0; i < tempInformationList.length; i++) {
        if (map.has(tempInformationList[i][0].name)) {
          var tempArr = Array.from(map.get(tempInformationList[i][0].name));
          tempArr.push(tempInformationList[i]);
          //console.log(tempArr)
          map.set(tempInformationList[i][0].name, tempArr);
        } else {
          var arr = [];
          arr.push(tempInformationList[i]);
          map.set(tempInformationList[i][0].name, arr);
          //console.log(tempInformationList[i][0].name)
          //console.log(map.has(tempInformationList[i][0].name))
          //console.log(arr)
        }
      }
      var res = [];
      map.forEach((item) => {
        res.push([item]);
        //console.log(res);
      });
      this.mapData = res;
      //console.log(this.mapData)
    },
    //威胁情报类型
    async handle() {
      var { data: res } = await this.$axios.get(
        "test/threatintelligence/selectAllInformation"
      );
      //this.info = res.data.InformationList
      var count = [0, 0, 0, 0];
      // console.log(count);
      res.data.InformationList.forEach((item) => {
        var type = item.enrichmentsThreatTypeLevel;
        if (type == "最高级别") count[0]++;
        if (type == "高危") count[1]++;
        if (type == "中危") count[2]++;
        if (type == "低危") count[3]++;
      });
      this.count = count;
      //return count
    },
    //攻击类型
    async handlePie() {
      var { data: res } = await this.$axios.get(
        "test/threatintelligence/selectAllInformation"
      );
      var pieData = [0, 0, 0, 0, 0];
      //console.log(count);
      res.data.InformationList.forEach((item) => {
        var type = item.enrichmentsThreatTypeAlias;
        if (type == "流量攻击") pieData[0]++;
        if (type == "木马通信") pieData[1]++;
        if (type == "CC攻击") pieData[2]++;
        if (type == "网络监听") pieData[3]++;
        if (type == "IP攻击") pieData[4]++;
      });
      this.pieData = pieData;
    },
  },
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.MainContainer {
  width: 100%;
  height: 100vh;
  background-color: rgb(10, 22, 72);
}
li {
  list-style: none;
}
/* 声明字体 */
@font-face {
  font-family: electronicFont;
  src: url(../font/DS-DIGIT.TTF);
}
body {
  background: url(../images/bg.jpg);
  line-height: 1.15;
}
header {
  position: relative;
  height: 60px;
  background: url(../images/head_bg.png);
  background-color: rgb(9, 20, 60);
  background-size: 100% 100%;
  .backBtn {
    display: inline-block;
    position: absolute;
    height: 20px;
    right: 0;
    top: 0;
    margin-right: 15px;
    margin-top: 15px;
    color: #fff;
    cursor: pointer;
  }
}
header h2 {
  line-height: 60px;
  text-align: center;
  color: #fff;
}
.mainbox {
  display: flex;
  min-width: 1024px;
  max-width: 1920px;
  // height: calc(100vh-60px);
  height: 90vh;
  margin: 0 auto;
  padding: 0.125rem 0.125rem 0;
}
.mainbox .column1,
.column2 {
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.mainbox .column:nth-child(2) {
  flex: 5;
  margin: 0 0.125rem 0.1875rem;
  overflow: hidden;
}
.mainbox .panel {
  position: relative;
  height: 180px;
  padding: 0 0.1875rem 0.5rem;
  border: 1px solid rgba(25, 186, 139, 0.17);
  margin-bottom: 0.1875rem;
  background: url(../images/line.png) rgba(255, 255, 255, 0.03);
}
.mainbox .panel::before {
  position: absolute;
  top: 0;
  left: 0;
  width: 10px;
  height: 10px;
  border-left: 2px solid #02a6b5;
  border-top: 2px solid #02a6b5;
  content: "";
}
.mainbox .panel::after {
  position: absolute;
  top: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-right: 2px solid #02a6b5;
  border-top: 2px solid #02a6b5;
  content: "";
}
.mainbox .panel .panel-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}
.mainbox .panel .panel-footer::before {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 10px;
  height: 10px;
  border-left: 2px solid #02a6b5;
  border-bottom: 2px solid #02a6b5;
  content: "";
}
.mainbox .panel .panel-footer::after {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-right: 2px solid #02a6b5;
  border-bottom: 2px solid #02a6b5;
  content: "";
}
.mainbox .panel h2 {
  height: 0.6rem;
  color: #fff;
  line-height: 0.6rem;
  text-align: center;
  font-size: 0.25rem;
  font-weight: 400;
}
.mainbox .panel h2 a {
  color: #fff;
  text-decoration: none;
  margin: 0 0.125rem;
}
.mainbox .panel .chart {
  height: 160px;
}
.no {
  background-color: rgb(10, 22, 72);
  height: 80px;
  //background-color: rgba(101, 132, 226, 0.1);
  padding: 0;
}
.no .no-hd {
  position: relative;
  border: 1px solid rgba(25, 186, 139, 0.17);
}
.no .no-hd::before {
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  width: 30px;
  height: 10px;
  border-top: 2px solid #02a6b5;
  border-left: 2px solid #02a6b5;
}
.no .no-hd::after {
  position: absolute;
  bottom: 0;
  right: 0;
  content: "";
  width: 30px;
  height: 10px;
  border-bottom: 2px solid #02a6b5;
  border-right: 2px solid #02a6b5;
}
.no .no-hd ul {
  display: flex;
}
.no .no-hd ul li {
  position: relative;
  height: 35px;
  flex: 1;
  line-height: 1rem;
  font-size: 20px;
  color: #ffeb7b;
  text-align: center;
  line-height: 35px;
  font-family: "electronicFont";
}
.no .no-hd ul li::after {
  content: "";
  position: absolute;
  top: 25%;
  right: 0;
  height: 50%;
  width: 1px;
  background: rgba(255, 255, 255, 0.2);
}
.no .no-bd ul {
  display: flex;
}
.no .no-bd ul li {
  flex: 1;
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.225rem;
  height: 40px;
  line-height: 40px;
  padding-top: 0.125rem;
}
.map {
  position: relative;
  height: 10.125rem;
}
.map .map1 {
  width: 6.475rem;
  height: 6.475rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-size: 100% 100%;
  opacity: 0.3;
}
.map .map2 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8.0375rem;
  height: 8.0375rem;
  background-size: 100% 100%;
  opacity: 0.6;
}
.map .map3 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 7.075rem;
  height: 7.075rem;
  background-size: 100% 100%;
  opacity: 0.6;
}
.map .chart {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 465px !important;
  background-size: 100% 100%;
}
@media screen and (max-width: 1024px) {
  html {
    font-size: 42px !important;
  }
}
@media screen and (min-width: 1920px) {
  html {
    font-size: 80px !important;
  }
}
</style>