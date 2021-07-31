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
          <el-button type="primary" @click="preservat">保存</el-button>
          <el-button @click="closeCard(true,1)">连通性测试</el-button>
          <el-button @click="closeCard(true,2)">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- <div class="cardCla">{{text}}</div> -->
    <el-card class="cardCla" v-if="showCard">
      <el-button type="text" icon="el-icon-close" class="closeIcon" @click="closeCard(false)"></el-button>
      <span>{{text}}</span>
      <div>
        
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data(){
    return {
      showCard: false,
      text : "",
    }
  },
  methods:{
    preservat(){
      // this.text = "+++++++"
    },
    closeCard(booolen,status){
      this.showCard = booolen
      if(booolen){
        if(status==1)this.text = "连通性测试中，请稍后...."
        else if(status==2)this.text = "注册完成"
      }
    }
  },
};
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
.cardCla{
  padding: 10px;
  margin: 50px auto;
  height: 200px;
  border-radius: 10px;
}
.closeIcon{
  position: relative;
  top:-30px;
  right: -10px;
  float: right;
}
</style>