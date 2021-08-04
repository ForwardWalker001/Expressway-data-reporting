<template>
    <el-col class="leftBar" >
    <el-menu
      :default-active="routActive"
      open='1'
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router >
      <el-menu-item index="/index">
        <i class="el-icon-menu"></i>
        <span slot="title" >可视化展示</span>
      </el-menu-item>
      <el-submenu  index="1">
        <template slot="title" >
          <i class="el-icon-document"></i>
          <span >信息上传</span>
        </template>
        <el-menu-item-group style="padding:0px">
          <el-menu-item index="/menuIndex/unitSys">单位信息</el-menu-item>
          <el-menu-item index="/menuIndex/ComroomSys" >机房信息</el-menu-item>
          <el-menu-item index="/menuIndex/infoSys" >信息系统信息</el-menu-item>
          <el-menu-item index="/menuIndex/hardwareSys" >硬件资源信息</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/menuIndex/threaten">
        <i class="el-icon-warning-outline"></i>
        <span slot="title" >威胁情报</span>
      </el-menu-item>
      <el-submenu  index="2">
        <template slot="title" >
          <i class="el-icon-s-check"></i>
          <span >信息展示</span>
        </template>
        <el-menu-item-group style="padding:0px">
          <el-menu-item index="/menuIndex/handle/unitSys" >单位信息</el-menu-item>
          <el-menu-item index="/menuIndex/handle/ComroomSys" >机房信息</el-menu-item>
          <el-menu-item index="/menuIndex/handle/infoSys" >信息系统</el-menu-item>
          <el-menu-item index="/menuIndex/handle/hardwareSys" >硬件资源</el-menu-item>
          <el-menu-item index="/menuIndex/handle/threaten" >威胁情报</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/menuIndex/connectTest">
        <i class="el-icon-setting"></i>
        <span slot="title">节点注册</span>
      </el-menu-item>
      <el-menu-item index="/menuIndex/ConnectStatus">
        <i class="el-icon-s-operation"></i>
        <span slot="title">节点连接状态</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</template>

<script>
  export default {
    data(){
      return {
        // collapse:true,
        routActive : this.$route.path
      }
    },
    mounted(){
      
    },
    methods: {

    },
  }
</script>

<style scoped>
.el-submenu .el-menu-item{
  min-width: 130px;
}
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