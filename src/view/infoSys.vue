<template>
  <div class="unitInfoContainer">
    <el-card class="box-card">
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>信息系统信息上传</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 搜索按钮区 -->
      <div class="serchBtn">
        <el-button type="primary" size="mini" @click="serchMethod"
          >查询</el-button
        >
        <el-button type="success" size="mini" @click="serchReset"
          >重置</el-button
        >
      </div>
      <!-- 搜索区 -->
      <div class="serchBox">
        <el-input placeholder="请输入内容" size="mini" v-model="serchData.stmIden">
          <template slot="prepend">系统标识</template>
        </el-input>
        <!-- <el-input placeholder="请输入内容" size="mini" v-model="serchData.type">
          <template slot="prepend">系统类型</template>
          <el-select slot="append" style="width: 35px" v-model="serchData.type">
            <el-option label="餐厅名" value="餐厅名"></el-option>
            <el-option label="订单号" value="订单号"></el-option>
            <el-option label="用户电话" value="用户电话"></el-option>
          </el-select>
        </el-input> -->
        <el-input placeholder="请输入内容" size="mini" v-model="serchData.units">
          <template slot="prepend">建设单位</template>
        </el-input>
        <el-input placeholder="请输入内容" size="mini" v-model="serchData.time">
          <template slot="prepend">更新时间</template>
        </el-input>
        <el-input placeholder="请输入内容" size="mini"  v-model="serchData.type">
          <template slot="prepend">上报状态</template>
          <el-select slot="append" style="width: 35px" v-model="serchData.type">
            <el-option label="未处理" value="未处理"></el-option>
            <el-option label="已处理" value="已处理"></el-option>
          </el-select>
        </el-input>
        <!-- <br/> -->
      </div>

      <!-- 表格区 -->
      <div class="tableContainer">
        <!-- 多选删除和上报区域 -->
        <div class="ldrDelBtn">
          <el-button type="primary" size="mini" @click="submit">上报</el-button>
          <el-button type="success" size="mini" @click="open">删除</el-button>
          <el-button
            type="success"
            size="mini"
            class="addBtn"
            @click="addUnitInfoDialogVisible = true"
            >新增</el-button
          >
        </div>
        <el-table
          ref="multipleTable"
          tooltip-effect="dark"
          style="width: 100%"
          :data="tableData"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="系统标识" width="120" prop="stmIden">
          </el-table-column>
          <el-table-column label="系统全称" width="120" prop="stmFullName">
          </el-table-column>
          <el-table-column
            label="系统类型"
            show-overflow-tooltip
            prop="type"
          >
          </el-table-column>
          <el-table-column
            label="所属建设单位"
            show-overflow-tooltip
            prop="units"
          >
          </el-table-column>
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
          <el-table-column
            label="最近更新时间"
            show-overflow-tooltip
            prop="time"
          >
          </el-table-column>
          <!-- <el-table-column
            label="上报状态"
            show-overflow-tooltip
            prop="workingname"
          >
          </el-table-column> -->
          <el-table-column label="操作" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button size="mini" @click="submitData(scope.row)"
                >上报</el-button
              >
              <el-button size="mini" type="danger" @click="submitRomve(scope.row)">删除</el-button>
              <!-- <el-button size="mini" type="danger">修改</el-button> -->
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
    <!-- 新增对话框 -->
    <el-dialog
      title="新增信息系统信息"
      :visible.sync="addUnitInfoDialogVisible"
      width="40%"
      top="50px"
    >
      <el-form status-icon label-width="100px">
        <el-form-item label="系统标识">
          <el-input autocomplete="off" v-model="newFormdata.stmIden"></el-input>
        </el-form-item>
        <el-form-item label="系统全称">
          <el-input autocomplete="off" v-model="newFormdata.stmFullName"></el-input>
        </el-form-item>
        <el-form-item label="系统类型" v-model="newFormdata.type">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="所属建设单位" v-model="newFormdata.units">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="联系人姓名" v-model="newFormdata.personName">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="联系人电话" v-model="newFormdata.personPhone">
          <el-input></el-input>
        </el-form-item>
        <!-- <el-form-item label="最近更新时间" v-model="newFormdata.stmFullName">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="上报状态" v-model="newFormdata.stmFullName">
          <el-input></el-input>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="submitUnitInfoForm">提交</el-button>
          <el-button @click="resetUnitInfoForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addUnitInfoDialogVisible: false,
      issubord: this.$store.state.issubord,
      pageInst: {
        currentPage: 1,
        pageSizes: [10, 20, 30, 40],
        pageSize: 5,
        total: 0,
      },
      serchData: {
        stmIden: "",
        type: "",
        units: "",
        time: "",
      },
      AllDatas: [],
      tableData: [],
      newFormdata: {
        name: "",
        address: "",
        personName: "",
        personPhone: null,
        status: "未处理",
        // data: '',
      },
    }
  },
  mounted() {
    // this.AllDatas = Object.assign([],this.tableData)
    this.AllDatas = []
    this.$axios
      .get("http://10.11.42.189:8080/important/exmassages")
      .then((res) => {
        // console.log(res)
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
    // 提交新增表单
    submitUnitInfoForm() {
      console.log("提交单位信息表单");
      this.$axios
        .post("http://10.11.42.189:8080/important/addexmessages", {
          ...this.newFormdata,
        })
        .then((res) => {
          const status = res.data.data.res;
          if (status == 1) {
            this.$message({
              type: "success",
              message: "提交成功!",
              duration: 1500,
            });
          } else {
            this.$message({
              type: "error",
              message: "提交失败!",
              duration: 1500,
            });
          }
          this.$router.go(0);
        })
        .catch((error) => {
          console.log(error);
          this.$message({
            type: "error",
            message: "提交失败!" + error,
            duration: 1500,
          });
        });
      this.addUnitInfoDialogVisible = !this.addUnitInfoDialogVisible;
    },
    // 重置新增表单
    resetUnitInfoForm() {
      console.log("重置单位信息表单");
      this.newFormdata = {
        workingname: "",
        address: "",
        person_name: "",
        person_phone: null,
        status: "未处理",
        // data: '',
      };
      // this.addUnitInfoDialogVisible = !this.addUnitInfoDialogVisible
    },
    // 上报表格内容
    submitData(row) {
      // console.log(row)
      this.$axios.get(`http://10.11.42.189:8080/important/sendInfo4/${row.id}`)
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
    submitRomve(row){
      // console.log(row.id)
      this.$axios.get(`http://10.11.42.189:8080/important/deleteExMessage/${row.id}`)
      .then((res)=>{
        console.log(res)
        if(res.data.success){
          this.$message({
              type: "success",
              message: "删除成功!",
              duration: 1500,
            });
        }else{
          this.$message({
          type: "error",
          message: "删除失败!",
          duration: 1500,
        });
        }
      }).catch((error)=>{
        this.$message({
          type: "error",
          message: "删除失败!" +error,
          duration: 1500,
        })
      })
    },
    // 搜索
    serchMethod() {
      // const len = this.AllDatas.length;
      // const showData = [];
      // if (
      //   this.serchData.unitname == "" &&
      //   this.serchData.ralname == "" &&
      //   this.serchData.data == "" &&
      //   this.serchData.complete == ""
      // ) {
      //   return;
      // }
      // for (let i = 0; i < len; i++) {
      //   if (
      //     (this.serchData.unitname == "" ||
      //       this.serchData.unitname == this.AllDatas[i].workingname) &&
      //     (this.serchData.ralname == "" ||
      //       this.serchData.ralname == this.AllDatas[i].person_name) &&
      //     (this.serchData.data == "" ||
      //       this.serchData.data == this.AllDatas[i].time) &&
      //     (this.serchData.complete == "" ||
      //       this.serchData.complete == this.AllDatas[i].status)
      //   ) {
      //     showData.push(this.AllDatas[i]);
      //   }
      // }
      // this.tableData = showData;
      // this.pageMethod(this.tableData);
      this.$axios.post("http://10.11.42.189:8080/important/selectExMessages",{
        ...this.serchData
      })
      .then((res)=>{
        console.log(res.data)
        this.tableData = res.data
      }).catch((error)=>{
        console.log(error)
      }).then(()=>{
        this.pageMethod(this.tableData)
      })
    },
    // 搜索重置
    serchReset() {
      this.serchData = {
        stmIden: "",
        type: "",
        units: "",
        time: "",
      };
      // this.pageInst.currentPage = 1
      this.pageMethod(this.AllDatas);
    },
    // 全选框要删除或上报的内容
    handleSelectionChange(val) {
      console.log(val);
      this.selectData = val;
      
    },
    // 全选框删除
    open() {
      if (this.selectData && this.selectData.length > 0) {
        this.$confirm("是否删除", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            //请求内容。。。
            // ...
            console.log(this.selectData)
            this.$axios.get(`http://10.11.42.189:8080/important/deleteExUnits/${this.selectData[0].id}`)
            .then((res)=>{
              console.log(res.data)
              this.$message({
              type: "success",
              message: "删除成功!",
              duration: 1500,
            })
            }).catch((error)=>{
                this.$message({
                type: "error",
                message: "删除失败!" + error,
                duration: 1500,
              })
            })
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
              duration: 1500,
            });
          });
      }
    },
    // 全选框上报
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
    border-bottom: 1px solid rgb(20, 45, 87);
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
