<template>
  <div class="unitInfoContainer">
    <el-card class="box-card">
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>单位信息上传</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 搜索按钮区 -->
      <div class="serchBtn">
        <el-button type="primary" size="mini" @click="serchMethod">查询</el-button>
        <el-button type="success" size="mini" @click="serchReset">重置</el-button>
      </div>
      <!-- 搜索区 -->
      <div class="serchBox">
        <el-input placeholder="请输入内容" size="mini" v-model="serchData.unitname">
          <template slot="prepend">单位全称</template>
        </el-input>
        <el-input placeholder="请输入内容" size="mini" v-model="serchData.ralname">
          <template slot="prepend">联系人姓名</template>
        </el-input>
        <el-input placeholder="请输入内容" size="mini" v-model="serchData.complete">
          <template slot="prepend">上报状态</template>
          <el-select  slot="append" style="width:35px" v-model="serchData.complete">
            <el-option label="未处理" value="未处理"></el-option>
            <el-option label="已处理" value="已处理"></el-option>
          </el-select>
        </el-input>
        <el-input placeholder="请输入内容" size="mini" v-model="serchData.data">
          <template slot="prepend">更新时间</template>
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
        <el-table ref="multipleTable" tooltip-effect="dark"  style="width: 100%" :data="tableData"
        @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="单位全称" width="120" prop="unitname"> </el-table-column>
          <el-table-column label="单位地址" width="120" prop="address"> </el-table-column>
          <el-table-column label="联系人姓名" show-overflow-tooltip prop="ralname">
          </el-table-column>
          <el-table-column label="联系人电话" show-overflow-tooltip prop="num">
          </el-table-column>
          <el-table-column label="更新时间" show-overflow-tooltip prop="data">
          </el-table-column>
          <el-table-column label="上报状态" show-overflow-tooltip prop="complete">
          </el-table-column>
          <el-table-column label="操作" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button size="mini" @click="submitData(scope.row)">上报</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页区 -->
      <div class="paginationContainer">
        <el-pagination
          :current-page="1"
          :page-size="10"
          layout="total, prev, pager, next, jumper"
          :total="tableData.length"
        >
        </el-pagination>
      </div>
    </el-card>
    <!-- 新增对话框 -->
    <el-dialog
      title="新增单位信息"
      :visible.sync="addUnitInfoDialogVisible"
      width="40%"
    >
      <el-form status-icon label-width="100px">
        <el-form-item label="单位全称">
          <el-input autocomplete="off" v-model="newFormdata.unitname"></el-input>
        </el-form-item>
        <el-form-item label="单位地址">
          <el-input autocomplete="off" v-model="newFormdata.address"></el-input>
        </el-form-item>
        <el-form-item label="联系人姓名">
          <el-input v-model="newFormdata.ralname"></el-input>
        </el-form-item>
         <el-form-item label="联系人电话">
          <el-input v-model="newFormdata.num"></el-input>
        </el-form-item>
         <el-form-item label="上报时间">
          <el-input v-model="newFormdata.data"></el-input>
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
      serchData : {
        unitname : '',
        ralname:'',
        complete: '',
        data:''
      },
      tableData: [{
          id : 1,
          unitname: '杭州',
          address: '杭州滨江区',
          ralname: '123',
          num: 4567890,
          data: '2021',
          complete: '未处理'
        },
        {
          id : 2,
          unitname: '杭州',
          address: '杭州滨江区',
          ralname: '123',
          num: 4567890,
          data: '2021',
          complete: '未处理'
        }],
        newFormdata: {
          unitname: '',
          address: '',
          ralname: '',
          num: null,
          data: '',
        },
    }
  },
  mounted(){
    this.datas = Object.assign([],this.tableData)
  },
  methods: {
    // 提交新增表单
    submitUnitInfoForm() {
      console.log("提交单位信息表单")

      this.addUnitInfoDialogVisible = !this.addUnitInfoDialogVisible
    },
    // 重置新增表单
    resetUnitInfoForm() {
      console.log("重置单位信息表单")
      this.newFormdata = {
          unitname: '',
          address: '',
          ralname: '',
          num: null,
          data: '',
        }
      // this.addUnitInfoDialogVisible = !this.addUnitInfoDialogVisible
    },
    // 上报表格内容
    submitData(row){
      // console.log(row)
      if(row){
        this.$message({
          type: 'success',
          message: '上报成功!',
          duration: 1500
        });
      }
    },

    // 搜索
    serchMethod(){
      const len = this.datas.length
      const showData = []
      if(this.serchData.unitname==""&&this.serchData.ralname==""&&this.serchData.data==""&&
      this.serchData.complete==""){
        return
      }
      for(let i=0;i<len;i++){
        if((this.serchData.unitname==""||this.serchData.unitname==this.datas[i].unitname) &&
            (this.serchData.ralname==""||this.serchData.ralname==this.datas[i].ralname) &&
            (this.serchData.data==""||this.serchData.data==this.datas[i].data) &&
            (this.serchData.complete==""||this.serchData.complete==this.datas[i].complete)){
              showData.push(this.datas[i])
            }
        }
      this.tableData = showData
    },
    // 搜索重置
    serchReset(){
      this.serchData = {
        unitname : '',
        ralname:'',
        complete: '',
        data:''
      }
      // console.log(this.serchData)
    },
    // 全选框要删除或上报的内容
    handleSelectionChange(val){
      // console.log(val)
      this.selectData = val
    },
    // 全选框删除
    open() {
      if( this.selectData && this.selectData.length>0){
      this.$confirm('是否删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //请求内容。。。
        // ...
        this.$message({
          type: 'success',
          message: '删除成功!',
          duration: 1500
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
          duration: 1500
        });          
      });
      }
    },
    // 全选框上报
    submit(){
      if( this.selectData && this.selectData.length>0){
        console.log(this.selectData)
        this.$message({
          type: 'success',
          message: '上报成功!',
          duration: 1500
        });
      }
    },
  }
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