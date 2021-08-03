<template>
  <el-card>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>威胁情报信息</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索区 -->
    <el-table :data="tableData" border style="width: 100%;margin-top:30px">
      <el-table-column
        align="center" fixed
        prop="enrichmentsThreatTypeLevel"
        label="所属威胁等级"
        width="120"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="probeId"
        label="ip 所属机构"
        width="120"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="ipDstPort"
        label="目的ip 端口"
        width="120"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="threatNum"
        label="具体威胁的次数"
        width="120"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="enrichmentsIpSrcAddrAssetName"
        label="目的ip 的资产名称"
        width="120"
      >
      </el-table-column
      ><el-table-column
        align="center"
        prop="enrichmentsIpSrcAddrSsetType"
        label="源ip 的资产类型"
        width="120"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="enrichmentsThreatNameLevel"
        label="威胁名称所属的威胁等级"
        width="120"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="classification"
        label="攻击名称id"
        width="120">
      </el-table-column>
      <el-table-column
        prop="sid"
        align="center"
        label="所属特征id "
        width="120">
      </el-table-column>
      <el-table-column
        align="center"
        prop="sourceType"
        label="标记日志类型"
        width="120">
      </el-table-column>
      <el-table-column
        align="center"
        prop="enrichmentsThreatStatus"
        label="具体威胁状态"
        width="120">
      </el-table-column>
      <el-table-column
        align="center"
        prop="ipDstAddr"
        label="目的ip地址"
        width="120">
      </el-table-column>
      <el-table-column
        align="center"
        prop="enrichmentsThreatName"
        label="具体威胁名称"
        width="120">
      </el-table-column>
      <el-table-column
        align="center"
        prop="enrichmentsDirection"
        label="所属威胁方向"
        width="120">
      </el-table-column>
      <el-table-column
        align="center"
        prop="enrichmentsGeoIpSrcAddrCountryCn"
        label="源ip所属地区名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="subIp"
        align="center"
        label="数据上报来源ip"
        width="120"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="enrichmentsIpDstAddrAssetType"
        label="目的 ip的资产类型"
        width="120"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="ipSrcAddr"
        label="威胁源ip"
        width="120"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="enrichmentsGeoIpDstAddrCountryCn"
        label="目的ip所属国家名称"
        width="120"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="enrichmentsThreatTypeAlias"
        label="威胁的具体类型"
        width="120"
      >
      </el-table-column>
      <el-table-column align="center" prop="timestamp" label="时间" width="120">
      </el-table-column>
      <el-table-column
        align="center"
        fixed="right"
        prop="status"
        label="发布状态"
        width="120"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.status == 1">已发布</span>
          <span v-else>未发布</span>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click="handleClick(scope.row)"
            type="text"
            size="medium"
            v-if="scope.row.status == 0"
            >上传</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- hide-on-single-page -->
    <div class="paginationContainer">
      <el-pagination
        :current-page="pageInst.currentPage"
        :page-size="pageInst.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="pageInst.total"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      fileList: [],
      pageInst: {
        currentPage: 1,
        pageSizes: [10, 20, 30, 40],
        pageSize: 5,
        total: 0,
      },
      AllDatas: [],
      tableData: [],
    };
  },
  mounted() {
    this.AllDatas = [];
    this.updateData();
    // this.setIntervalData();

  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    pageMethod(datas) {
      this.pageInst.total = datas.length;
      this.tableData = datas.slice(0, this.pageInst.pageSize);
    },
    // 定时查询
    setIntervalData() {
      let i = 0;
      this.timer = setInterval(() => {
        this.updateData();
        console.log(++i);
      }, 3000);
    },
    updateData() {
      this.$axios
        .get(
          "http://10.11.44.74:8888/test/threatintelligence/selectAllInformation"
        )
        .then((res) => {
          this.AllDatas = res.data.data.InformationList;
        })
        .catch((error) => {
          console.log(error);
        })
        .then(() => {
          this.pageMethod(this.AllDatas)
          this.tableData = this.AllDatas.slice(0, this.pageInst.pageSize);
        });
    },

    handleClick(row) {
      this.$axios
        .get(
          `http://10.11.44.74:8888/test/threatintelligence/sendInfromation/${row.id}`
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.success) {
            this.$message({
              type: "success",
              message: "上传成功!",
              duration: 1500,
            });
          } else {
            this.$message({
              type: "error",
              message: "上传失败!",
              duration: 1500,
            });
          }
        })
        .catch((error) => {
          // console.log(error)
          this.$message({
            type: "error",
            message: "上传失败!" + error,
            duration: 1500,
          });
        });
      // location.reload()
    },
    handleCurrentChange(page) {
      this.tableData = this.AllDatas.slice(
        this.pageInst.pageSize * (page - 1),
        this.pageInst.pageSize * page
      );
    },
  },
};
</script>
<style lang="less" scoped>
.paginationContainer {
  float: right;
  padding-top: 15px;
}
</style>