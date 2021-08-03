<template>
  <div class="unitInfoContainer">
    <el-card class="box-card">
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>单位信息上传</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 搜索按钮区 -->
      <!-- 表格区 -->
      <div class="tableContainer">
        <!-- 多选删除和上报区域 -->
        <div class="ldrDelBtn">
          <el-button type="primary" size="mini" @click="submit">上报</el-button>
        </div>
        <el-table
          ref="multipleTable"
          tooltip-effect="dark"
          style="width: 100%"
          :data="tableData"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            label="单位全称"
            width="120"
            prop="workingname"
          ></el-table-column>
          <el-table-column
            label="单位地址"
            width="120"
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
          <el-table-column label="上报状态" show-overflow-tooltip prop="status">
          </el-table-column>
          <el-table-column label="操作" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button size="mini" @click="submitData(scope.row)" v-if="scope.row.status=='已上报'?false: true"
                >上报</el-button>
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
      issubord: this.$store.state.issubord,
      pageInst: {
        currentPage: 1,
        pageSizes: [10, 20, 30, 40],
        pageSize: 5,
        total: 0,
      },
      serchData: {
        workingname: "",
        address: "",
        personName: "",
        time: "",
        status: ""
      },
      AllDatas: [],
      tableData: [],
    }
  },
  mounted() {
    this.AllDatas = []
    this.$axios
      .get("http://10.11.42.189:8080/important/exUnits")
      .then((res) => {
        // console.log(this.AllDatas)
        this.AllDatas = res.data.data.ExUnitList
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
    // 上报表格内容
    submitData(row) {
      // console.log(row)
      this.$axios.get(`http://10.11.42.189:8080/important/sendInfo3/${row.id}`)
      .then((res)=>{
        console.log(res)
        if(res.data.success){
          this.$message({
              type: "success",
              message: "上报成功!",
              duration: 1500,
            });
        }else{
          this.$message({
          type: "error",
          message: "上报失败!",
          duration: 1500,
        });
        }
      }).catch((error)=>{
        this.$message({
          type: "error",
          message: "上报失败!" +error,
          duration: 1500,
        })
      })
    },
    // 搜索
    serchMethod() {
      // console.log({...this.serchData})
      this.$axios.get("http://10.11.42.189:8080/important/selectExUnits",{
        params: {
          ...this.serchData
        }
      })
      .then((res)=>{
        console.log(res.data)
        if(res.data.success){
          this.tableData = res.data.data.list
        }else{
          this.tableData = []
        }
      }).catch((error)=>{
        console.log(error)
      }).then(()=>{
        this.pageMethod(this.tableData)
      })
    },
    // 搜索重置
    serchReset() {
      this.serchData = {
        workingname: "",
        address: "",
        personName: "",
        time: "",
        status: ""
      },
      this.pageMethod(this.AllDatas);
    },
    // 全选框要删除或上报的内容
    handleSelectionChange(val) {
      console.log(val);
      this.selectData = []
      for(let i=0;i<val.length;i++){
        this.selectData.push(val[i].id)
      }
    },
    submit() {
      if (this.selectData && this.selectData.length > 0) {
        console.log(this.selectData);
        this.$message({
          type: "success",
          message: "上报成功!",
          duration: 1500,
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.unitInfoContainer {
  .el-breadcrumb {
    padding-bottom: 20px;
    // border-bottom: 1px solid rgb(20, 45, 87);
  }
  .serchBox {
    margin-top: 15px;
    display: flex;
    flex-wrap: wrap;
    .el-input {
      padding-bottom: 10px;
      padding-left: 10px;
      width: 30%;
    }
  }
  .serchBtn {
    float: right;
    margin-top: 15px;
    padding-left: 15px;
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