<template>
    <el-col class="leftBar" >
    <el-menu
      :default-active="routActive"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router >
      <el-menu-item index="/index">
        <i class="el-icon-menu"></i>
        <span slot="title" >首页</span>
      </el-menu-item>
      <el-submenu  index="1">
        <template slot="title" >
          <i class="el-icon-document"></i>
          <span >信息上传</span>
        </template>
        <el-menu-item-group style="padding:0px">
          <el-menu-item index="/index/unitSys" >单位信息</el-menu-item>
          <el-menu-item index="/index/ComroomSys" >机房信息</el-menu-item>
          <el-menu-item index="/index/infoSys" >信息系统信息</el-menu-item>
          <el-menu-item index="/index/hardwareSys" >硬件资源信息</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/index/threaten">
        <i class="el-icon-warning-outline"></i>
        <span slot="title" >威胁情报</span>
      </el-menu-item>
      <el-submenu  index="2">
        <template slot="title" >
          <i class="el-icon-s-check"></i>
          <span >信息处理</span>
        </template>
        <el-menu-item-group style="padding:0px">
          <!-- <el-menu-item index="1-1" ><span @click="changRou('选项1')">选项1</span></el-menu-item> -->
          <el-menu-item index="/index/handle/unitSys" >单位信息处理</el-menu-item>
          <el-menu-item index="/index/handle/ComroomSys" >机房信息处理</el-menu-item>
          <el-menu-item index="/index/handle/infoSys" >信息系统处理</el-menu-item>
          <el-menu-item index="/index/handle/hardwareSys" >硬件资源处理</el-menu-item>
          <el-menu-item index="/index/handle/threaten" >威胁情报处理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      
      <el-menu-item index="/index/connectTest">
        <i class="el-icon-setting"></i>
        <span slot="title">节点注册</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</template>

<script>
  export default {
    data(){
      return {
        routActive : this.$route.path
      }
    },
    mounted(){
      
    },
    methods: {
      // handleOpen(key, keyPath) {
      //   console.log(key, keyPath);
      // },
      // handleClose(key, keyPath) {
      //   console.log(key, keyPath);
      // },
    },
  }
</script>

<style scoped>
.el-submenu .el-menu-item{
  min-width: 130px;
}
/* .el-menu-item-group__title {
     padding: 0px !important;
} */
.leftBar {
  /* width:130px;  */
  height:calc(100vh - 30px);
  min-width: 130px;
  padding-top: 30px;
  background-color:#545c64;
  display: inline-block;
}
.el-menu {
    border-right: solid 0px #e6e6e6;
}
</style>