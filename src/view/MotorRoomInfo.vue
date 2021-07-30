<template>
  <div class="unitInfoContainer">
    <!-- <span>机房信息上传组件</span> -->
    <el-card class="box-card">
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>机房信息上传</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 搜索按钮区 -->
      <div class="serchBtn">
        <el-button type="primary" size="mini">查询</el-button>
        <el-button type="success" size="mini">重置</el-button>
      </div>
      <!-- 搜索区 -->
      <div class="serchBox">
        <el-input placeholder="请输入内容" size="mini">
          <template slot="prepend">机房名称</template>
        </el-input>
        <el-input placeholder="请输入内容" size="mini">
          <template slot="prepend">机房类型</template>
          <el-select slot="append" style="width:35px">
            <el-option label="餐厅名" value="餐厅名"></el-option>
            <el-option label="订单号" value="订单号"></el-option>
            <el-option label="用户电话" value="用户电话"></el-option>
          </el-select>
        </el-input>
        <el-input placeholder="请输入内容" size="mini">
          <template slot="prepend">机房运营商</template>
          <el-select slot="append" style="width:35px">
            <el-option label="餐厅名" value="餐厅名"></el-option>
            <el-option label="订单号" value="订单号"></el-option>
            <el-option label="用户电话" value="用户电话"></el-option>
          </el-select>
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
            @click="addMRInfoDialogVisible = true"
            >新增</el-button
          >
        </div>
        <el-table ref="multipleTable" tooltip-effect="dark" style="width: 100%">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="机房ID" width="120" prop="id"> </el-table-column>
          <el-table-column label="机房名称" width="120" prop="name"> </el-table-column>
          <el-table-column label="机房类型" show-overflow-tooltip prop="type">
          </el-table-column>
          <el-table-column label="联系人姓名" show-overflow-tooltip prop="person_name">
          </el-table-column>
          <el-table-column label="联系人邮箱" show-overflow-tooltip prop="email">
          </el-table-column>
          <el-table-column label="机房地址" show-overflow-tooltip prop="address">
          </el-table-column>
          <el-table-column label="最近更新时间" show-overflow-tooltip prop="time">
          </el-table-column>
          <!-- <el-table-column label="上报状态" show-overflow-tooltip prop="workingname">
          </el-table-column> -->
          <el-table-column label="操作" show-overflow-tooltip >
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
      title="新增机房信息"
      :visible.sync="addMRInfoDialogVisible"
      width="40%"
      top="50px"
    >
      <el-form status-icon label-width="100px">
        <el-form-item label="机房名称">
          <el-input autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="机房类型">
          <el-input autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="机房运营商">
          <el-input autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系人姓名">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="联系人电话">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="上报时间">
          <el-input></el-input>
        </el-form-item>
        <!-- <span style="margin-left: -10px;">最近更新时间：</span> -->
        <el-form-item label="更新时间">
          <el-input></el-input>
        </el-form-item>
        <el-form-item style="margin-top: 5px;">
          <el-button type="primary" @click="submitMRInfoForm">提交</el-button>
          <el-button @click="resetMRInfoForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addMRInfoDialogVisible: false,

    };
  },
  mounted(){
    // http://yapi.smart-xwork.cn/mock/81866/important/exMachineRooms
    // 新增表单接口
    // http://yapi.smart-xwork.cn/mock/81866/important/addexMachineRooms
  },
  methods: {
    submitMRInfoForm() {
      console.log("提交单位信息表单");
      this.addMRInfoDialogVisible = !this.addMRInfoDialogVisible;
    },
    resetMRInfoForm() {
      console.log("重置单位信息表单");
      this.addMRInfoDialogVisible = !this.addMRInfoDialogVisible;
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