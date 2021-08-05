<template>
  <div class="unitInfoContainer">
    <el-card class="box-card">
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>节点连接状态</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 搜索按钮区 -->
      <!-- 表格区 -->
      <div class="tableContainer">
        <el-table
          ref="multipleTable"
          tooltip-effect="dark"
          style="width: 100%"
          :data="tableData"
        >
          <el-table-column label="ip" width="400" prop="ip" align="center"></el-table-column>
          <el-table-column align="center"
            label="级联平台"
            width="400"
            prop="platformname"
          ></el-table-column>
          <el-table-column label="状态" show-overflow-tooltip prop="status" align="center">
            <template slot-scope="scope">
              <el-tag type="success" effect="dark" v-if="scope.row.status"
                >已连接</el-tag>
              <el-tag type="danger" effect="dark" v-else >未连接</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页区 -->
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      ledColor: false,
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
    this.heartbeatCon();
    this.setIntervalData()
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    handleCurrentChange(page) {
      this.tableData = this.AllDatas.slice(
        this.pageInst.pageSize * (page - 1),
        this.pageInst.pageSize * page
      );
    },
    // 页面数据更新后，分布功能也要更新
    pageMethod(datas) {
      this.pageInst.total = datas.length;
      this.tableData = datas.slice(0, this.pageInst.pageSize);
    },
    // 定时任务
    setIntervalData() {
      this.timer = setInterval(() => {
        this.heartbeatCon();
      }, 3000);
    },
    heartbeatCon() {
      this.$axios
      .get("exUser/list")
      .then((res) => {
        this.AllDatas = res.data.data.data;
      })
      .catch((error) => {
        console.log(error);
        // this.ledColor = false;
      })
      .then(() => {
        if (this.AllDatas) {
          this.pageMethod(this.AllDatas);
          this.tableData = this.AllDatas.slice(0, this.pageInst.pageSize);
        }
      });
    }
  },
};
</script>

<style lang="less" scoped>
.unitInfoContainer {
  .el-breadcrumb {
    padding-bottom: 20px;
    // border-bottom: 1px solid rgb(20, 45, 87);
  }
  .tableContainer {
    margin-top: 20px;
    border-top: 1px solid rgb(20, 45, 87);
    .ldrDelBtn {
      padding-top: 15px;
      .addBtn {
        float: right;
      }
    }
  }
  .paginationContainer {
    float: right;
    padding-top: 15px;
  }
}
</style>