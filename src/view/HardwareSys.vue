<template>
  <div class="unitInfoContainer">
    <el-card class="box-card">
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>硬件资源信息上传</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 搜索按钮区 -->
      <div class="serchBtn">
        <el-button type="primary" size="mini">查询</el-button>
        <el-button type="success" size="mini">重置</el-button>
      </div>
      <!-- 搜索区 -->
      <div class="serchBox">
        <el-input placeholder="请输入内容" size="mini" >
          <template slot="prepend">硬件名称</template>
        </el-input>
        <el-input placeholder="请输入内容" size="mini">
          <template slot="prepend">硬件分类</template>
          <el-select slot="append" style="width:35px">
            <el-option label="餐厅名" value="餐厅名"></el-option>
            <el-option label="订单号" value="订单号"></el-option>
            <el-option label="用户电话" value="用户电话"></el-option>
          </el-select>
        </el-input>
        <el-input placeholder="请输入内容" size="mini">
          <template slot="prepend">硬件IP</template>
        </el-input>

        <el-input placeholder="请输入内容" size="mini">
          <template slot="prepend">更新时间</template>
        </el-input>
      </div>
      
      <!-- 表格区 -->
      <div class="tableContainer">
        <!-- 多选删除和上报区域 -->
        <div class="ldrDelBtn">
          <el-button type="primary" size="mini">上报</el-button>
          <el-button type="success" size="mini">删除</el-button>
          <el-button
            type="success"
            size="mini"
            class="addBtn"
            @click="addUnitInfoDialogVisible = true"
            >新增</el-button
          >
        </div>
        <el-table ref="multipleTable" tooltip-effect="dark" style="width: 100%">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="硬件id" width="120" prop="id"> </el-table-column>
          <el-table-column label="硬件名称" width="120" prop="name"> </el-table-column>
          <el-table-column label="硬件类型" show-overflow-tooltip prop="type">
          </el-table-column>
          <!-- <el-table-column label="硬件分类" show-overflow-tooltip prop="id">
          </el-table-column> -->
          <el-table-column label="联系人" show-overflow-tooltip prop="person_name">
          </el-table-column>
          <el-table-column label="地址" show-overflow-tooltip prop="address">
          </el-table-column>
          <el-table-column label="联系人电话" show-overflow-tooltip prop="person_phone">
          </el-table-column>
          <el-table-column label="最近更新时间" show-overflow-tooltip prop="time">
          </el-table-column>
          <el-table-column label="上报状态" show-overflow-tooltip prop="id">
          </el-table-column>
          <el-table-column label="操作" show-overflow-tooltip>
            <template>
              <el-button size="mini">上报</el-button>
              <!-- <el-button size="mini" type="danger">删除</el-button>
              <el-button size="mini" type="danger">修改</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页区 -->
      <div class="paginationContainer">
        <el-pagination
          :current-page="4"
          
          :page-size="100"
          layout="total, prev, pager, next, jumper"
          :total="400"
        >
        </el-pagination>
      </div>
    </el-card>
    <!-- 新增对话框 -->
    <el-dialog
      title="新增硬件资源信息"
      :visible.sync="addUnitInfoDialogVisible"
      width="40%" top="50px"
    >
      <el-form status-icon label-width="100px">
        <el-form-item label="硬件标识">
          <el-input autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="硬件名称">
          <el-input autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="硬件IP">
          <el-input></el-input>
        </el-form-item>
         <el-form-item label="硬件分类">
          <el-input></el-input>
        </el-form-item>
         <el-form-item label="所属系统">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="硬件序列号">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="硬件状态">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="更新时间">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="上报状态">
          <el-input></el-input>
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
    }
  },
  mounted(){
    //获取信息接口
    // http://yapi.smart-xwork.cn/mock/81866/important/exhardwares
    // 增加数据接口
    // http://yapi.smart-xwork.cn/mock/81866/important/addexhardwares
  },
  methods: {
    submitUnitInfoForm() {
      console.log("提交单位信息表单")
      this.addUnitInfoDialogVisible = !this.addUnitInfoDialogVisible
    },
    resetUnitInfoForm() {
      console.log("重置单位信息表单")
      this.addUnitInfoDialogVisible = !this.addUnitInfoDialogVisible
    }
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
