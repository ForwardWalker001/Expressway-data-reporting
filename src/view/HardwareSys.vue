<template>
  <div class="unitInfoContainer">
    <el-card class="box-card">
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>硬件资源信息上传</el-breadcrumb-item>
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
        <el-input placeholder="请输入内容" size="mini" v-model="serchData.name">
          <template slot="prepend">硬件名称</template>
        </el-input>
        <el-input placeholder="请输入内容" size="mini" v-model="serchData.type">
          <template slot="prepend">硬件分类</template>
        </el-input>
        <!-- <el-input placeholder="请输入内容" size="mini"  v-model="serchData.time">
          <template slot="prepend">硬件IP</template>
        </el-input> -->
        <el-input placeholder="请输入内容" size="mini" v-model="serchData.time">
          <template slot="prepend">时间</template>
        </el-input>
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
          <!-- <el-table-column label="硬件id" width="120" prop="id"> </el-table-column> -->
          <el-table-column label="硬件名称" width="120" prop="name">
          </el-table-column>
          <el-table-column label="硬件分类" show-overflow-tooltip prop="type">
          </el-table-column>
          <!-- <el-table-column label="硬件分类" show-overflow-tooltip prop="id">
          </el-table-column> -->
          <el-table-column
            label="联系人"
            show-overflow-tooltip
            prop="personName"
          >
          </el-table-column>
          <el-table-column label="地址" show-overflow-tooltip prop="address">
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
          <!-- <el-table-column label="上报状态" show-overflow-tooltip prop="id">
          </el-table-column> -->
          <el-table-column label="操作" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="submitRomve(scope.row)"
                >删除</el-button
              >
              <el-button size="mini" @click="submitData(scope.row)"
                >上报</el-button
              >
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
      title="新增硬件资源信息"
      :visible.sync="addUnitInfoDialogVisible"
      width="40%"
      top="50px"
    >
      <el-form status-icon label-width="100px">
        <el-form-item label="硬件名称">
          <el-input autocomplete="off" v-model="newFormdata.name"></el-input>
        </el-form-item>
        <el-form-item label="硬件分类">
          <el-input autocomplete="off" v-model="newFormdata.type"></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="newFormdata.personName"></el-input>
        </el-form-item>
        <el-form-item label="联系人电话">
          <el-input v-model="newFormdata.personPhone"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="newFormdata.address"></el-input>
        </el-form-item>
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
        name: "",
        type: "",
        time: "",
      },
      AllDatas: [],
      tableData: [],
      newFormdata: {
        name: "",
        address: "",
        personName: "",
        personPhone: null,
        type: "",
        // data: '',
      },
    };
  },
  mounted() {
    this.AllDatas = [];
    this.$axios
      .get("exHardware/list")
      .then((res) => {
        this.AllDatas = res.data.data.data;
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        if (this.AllDatas) {
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
      this.$axios
        .post("exHardware/save", {
          ...this.newFormdata,
        })
        .then((res) => {
          // console.log(res)
          const status = res.data.success;
          if (status) {
            this.$message({
              type: "success",
              message: "提交成功!",
              duration: 1500,
            });
            this.$router.go(0);
          } else {
            this.$message({
              type: "error",
              message: "提交失败!",
              duration: 1500,
            });
          }
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
      };
    },
    // 上报表格内容
    submitData(row) {
      // console.log(row)
      this.$axios
        .post("exHardware/send", {
          ...row,
        })
        .then((res) => {
          // console.log(res.data)
          if (res.data.success) {
            this.$message({
              type: "success",
              message: "上报成功!",
              duration: 1500,
            });
          } else {
            this.$message({
              type: "error",
              message: "上报失败!",
              duration: 1500,
            });
          }
        })
        .catch((error) => {
          this.$message({
            type: "error",
            message: "上报失败!" + error,
            duration: 1500,
          });
        });
    },
    submitRomve(row) {
      console.log(row.id);
      this.$axios
        .delete(`exHardware/delete/${row.id}`)
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            this.$message({
              type: "success",
              message: "删除成功!",
              duration: 1500,
            });
            this.$router.go(0)
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
    },
    // 搜索
    serchMethod() {
      this.$axios
        .get("important/selectexhardwares", {
          params: {
            ...this.serchData,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.tableData = res.data.list;
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
        unitname: "",
        ralname: "",
        complete: "",
        data: "",
      };
      // this.pageInst.currentPage = 1
      this.pageMethod(this.AllDatas);
    },
    // 全选框要删除或上报的内容
    handleSelectionChange(val) {
      // console.log(val);
      this.selectData = [];
      for (let i = 0; i < val.length; i++) {
        this.selectData.push(val[i].id);
      }
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
            this.$axios
              .post(`exHardware/deleteBatch`, {
                Ids: this.selectData,
              })
              .then((res) => {
                // console.log(res.data);
                if (res.data.success) {
                  this.$message({
                    type: "success",
                    message: "删除成功!",
                    duration: 1500,
                  });
                  this.$router.go(0);
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
      }
    },
    // 全选框上报
    submit() {
      if (this.selectData && this.selectData.length > 0) {
        this.$axios
          .post(`exHardware/sendBatch`, {
            Ids: this.selectData,
          })
          .then((res) => {
            console.log(res.data);
            if (res.data.success) {
              this.$message({
                type: "success",
                message: "上报成功!",
                duration: 1500,
              });
              // this.$router.go(0);
            } else {
              this.$message({
                type: "error",
                message: "上报失败!",
                duration: 1500,
              });
            }
          })
          .catch((error) => {
            this.$message({
              type: "error",
              message: "上报失败!" + error,
              duration: 1500,
            });
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
