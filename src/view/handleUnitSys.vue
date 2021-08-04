<template>
  <div class="unitInfoContainer">
    <el-card class="box-card">
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>单位信息</el-breadcrumb-item>
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
          <el-table-column
            label="单位全称"
            width="200"
            prop="workingname"
          ></el-table-column>
          <el-table-column
            label="单位地址"
            width="200"
            prop="address"
          ></el-table-column>
          <el-table-column
            label="联系人姓名"
            show-overflow-tooltip
            prop="personName"
          >
          </el-table-column>
          <el-table-column
            label="联系人电话"
            show-overflow-tooltip
            prop="personPhone"
          >
          </el-table-column>
          <el-table-column label="更新时间" show-overflow-tooltip prop="time">
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
      pageInst: {
        currentPage: 1,
        pageSizes: [10, 20, 30, 40],
        pageSize: 5,
        total: 0,
      },
      AllDatas: [],
      tableData: [],
    }
  },
  mounted() {
    this.AllDatas = []
    this.$axios
      .get("exUnitServer/list")
      .then((res) => {
        // console.log(res)
        this.AllDatas = res.data.data.data
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        if(this.AllDatas){
          this.pageMethod(this.AllDatas);
          this.tableData = this.AllDatas.slice(0, this.pageInst.pageSize);
        }
      });
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
  }
}
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