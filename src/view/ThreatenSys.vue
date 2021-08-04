<template>
  <el-card>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>威胁情报信息</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="serchBtn">
      <el-button type="primary" size="mini" @click="serchMethod"
        >查询</el-button
      >
      <el-button type="success" size="mini" @click="serchReset">重置</el-button>
    </div>
    <!-- 搜索区 -->
    <div class="serchBox">
      <el-input
        placeholder="请输入内容"
        size="mini"
        v-model="serchData.enrichmentsThreatTypeLevel"
      >
        <template slot="prepend">所属威胁等级</template>
      </el-input>
      <el-input
        placeholder="请输入内容"
        size="mini"
        v-model="serchData.enrichmentsGeoIpSrcAddrCountryCn"
      >
        <template slot="prepend">源ip所属地区名称</template>
      </el-input>
      <el-input
        placeholder="请输入内容"
        size="mini"
        v-model="serchData.enrichmentsGeoIpDstAddrCountryCn"
      >
        <template slot="prepend">目的IP所属地区名称</template>
      </el-input>
      <el-input placeholder="请输入内容" size="mini" v-model="serchData.enrichmentsThreatTypeAlias">
        <template slot="prepend">威胁的具体类型</template>
      </el-input>
    </div>
    <el-button
      type="success"
      size="mini"
      style="float: right; margin: 0 0 20px"
      @click="addUnitInfoDialogVisible = true"
      >新增</el-button
    >
    <el-table :data="tableData"  style="width: 100%">
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
        label="目的ip所属地区名称"
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
            >上传</el-button
          >
          <el-button type="text" size="medium" @click="remove(scope.row)"
            >删除</el-button
          >
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
    <el-dialog
      title="威胁情报上传"
      :visible.sync="addUnitInfoDialogVisible"
      width="40%"
    >
      <el-form status-icon label-width="100px">
        <el-form-item>
          <el-upload
            class="upload-demo"
            ref="upload"
            action="http://10.11.44.74:8888/test/threatintelligence/getInformation"
            name="originalFile"
            :on-error="handleError"
            :on-success="handleSuccess"
            :file-list="fileList"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary"
              >选取文件</el-button
            >
            <el-button
              style="margin-left: 10px"
              size="small"
              type="success"
              @click="submitUpload"
              >提交</el-button
            >
            <div slot="tip" class="el-upload__tip">请上传包含威胁信息的文件</div>
          </el-upload>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      addUnitInfoDialogVisible: false,
      fileList: [],
      pageInst: {
        currentPage: 1,
        pageSizes: [10, 20, 30, 40],
        pageSize: 5,
        total: 0,
      },
      serchData: {
        enrichmentsThreatTypeLevel: "",
        enrichmentsGeoIpSrcAddrCountryCn: "",
        enrichmentsThreatTypeAlias: "",
        enrichmentsGeoIpDstAddrCountryCn: "",
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
    serchMethod() {
      this.$axios
        .post("test/threatintelligence/findByCondition", {
            ...this.serchData,
        })
        .then((res) => {
          if (res.data.success) {
            this.tableData = res.data.data.wraperList;
          } else {
            this.tableData = [];
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .then(() => {
          this.pageMethod(this.tableData);
        });
    },
    // 搜索重置
    serchReset() {
      this.serchData = {
        enrichmentsThreatTypeLevel: "",
        enrichmentsGeoIpSrcAddrCountryCn: "",
        enrichmentsThreatTypeAlias: "",
        enrichmentsGeoIpDstAddrCountryCn: "",
      },
        // this.pageInst.currentPage = 1
        this.pageMethod(this.AllDatas);
    },
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
          "test/threatintelligence/selectAllInformation"
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

    submitUpload() {
      this.$refs.upload.submit();
    },
    handleError(err) {
      this.$message({
        type: "error",
        message: "上传失败!" + err,
        duration: 1500,
      });
    },
    handleSuccess(res) {
      if (res.success) {
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
    },
    handleClick(row) {
      this.$axios
        .get(
          `test/threatintelligence/sendInfromation/${row.id}`
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
    remove(row) {
      // console.log(row.id);
      this.$confirm("是否删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //请求内容。。。
          this.$axios
            .get(
              `test/threatintelligence/deleteInfromation/${row.id}`
            )
            .then((res) => {
              // console.log(res.data)
              if (res.data.success) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                  duration: 1500,
                });
              } else {
                this.$message({
                  type: "error",
                  message: "删除失败!",
                  duration: 1500,
                });
              }
            })
            .catch((error) => {
              this.$message({
                type: "error",
                message: "删除失败!" + error,
                duration: 1500,
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
            duration: 1500,
          });
        });
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
.el-breadcrumb {
  padding-bottom: 20px;
  border-bottom: 1px solid rgb(20, 45, 87);
}
.serchBox {
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;
  .el-input {
    padding-bottom: 10px;
    padding-left: 10px;
    width: 35%;
  }
}
.serchBtn {
  float: right;
  margin-top: 15px;
  padding-left: 15px;
}
</style>