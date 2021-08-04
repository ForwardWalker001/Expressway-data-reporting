<template>
  <div class="main">
    <div class="title">
      <span>攻击时间</span>
      <span>攻击源</span>
      <span>被攻击地</span>
      <span>攻击类型</span>
      <span>风险等级</span>
    </div>
    <div class="mainContainer">
        
      <div
        class="msgList"
        id="loopContainer"
        v-for="(item) in dataList"
        :key="item.id"
      >
        <span>
          {{ item.timestamp.slice(0, 10) }}
        </span>
        <span>{{ item.enrichmentsGeoIpSrcAddrCountryCn }}</span>
        <span>{{ item.enrichmentsGeoIpDstAddrCountryCn }}</span>
        <span>
          {{ item.enrichmentsThreatTypeAlias }}
        </span>
        <span
          :class="item.enrichmentsThreatTypeLevel == '最高级别' ? 'red' : null"
          >{{ item.enrichmentsThreatTypeLevel }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataList: [],
    };
  },
  created() {
    this.getInfo();
  },
  mounted() {
    //this.getInfo()
  },
  methods: {
    async getInfo() {
      var { data: res } = await this.$axios.get(
        "test/threatintelligence/selectAllInformation"
      );
      this.dataList = res.data.InformationList;
      // console.log(this.dataList);
    },
  },
};
</script>

<style lang="less" scoped>
/* .main {
    
} */
span {
  display: inline-block;
  width: 100px;
  text-align: center;
  transform: scale(0.8);
}
.red {
  color: rgb(255, 28, 28);
}
.title {
  position: relative;
  //display: block;
  // width: 550px;
  color: rgb(15, 140, 216);
  font-size: 12px;
  top: 350px;
  display: flex;
  justify-content: space-around;
}
.mainContainer {
  //position: sticky;
  position: relative;
  width: 100%;
  height: 190px;
  //background: red;
  left: 50%;
  top: 360px;
  //transform: translate(-50%, -50%);
  transform: translateX(-50%);
  overflow: hidden;
  .msgList {
    position: relative;
    animation: loopAnimition 20s linear;
    //animation-direction: reverse;
    animation-iteration-count: infinite;
    font-size: 12px;
    color: #fefefe;
    opacity: 0.8;
    display: flex;
    justify-content: space-around;
  }
}
@keyframes loopAnimition {
  0% {
    top: -20px;
  }
  100% {
    top: -400px;
  }
}
</style>