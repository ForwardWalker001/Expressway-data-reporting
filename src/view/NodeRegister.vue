<template>
  <div class="nodeRegisterContainer">
    <el-card class="box-card">
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">级联管理</el-breadcrumb-item>
        <el-breadcrumb-item>节点注册配置</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 配置表单 -->
      <el-form label-width="120px">
        <el-form-item label="省平台IP">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="级联平台名称">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input></el-input>
        </el-form-item>
        <!-- <el-form-item label="省平台域名信息">
          <el-input disabled></el-input>
        </el-form-item> -->
        <el-form-item size="large">
          <el-button type="primary">保存</el-button>
          <el-button>连通性测试</el-button>
          <el-button>注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.el-breadcrumb {
  padding-bottom: 15px;
  border-bottom: 1px solid rgb(20, 45, 87);
}
.el-form {
  padding-top: 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .el-form-item {
      width: 40%;
      margin-right: 20px;
  }
}
</style>