<template>
    <el-col class="leftBar" >
    <el-menu
      :default-active="routActive"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router >
      <el-menu-item index="/index" >
        <i class="el-icon-menu"></i>
        <span slot="title" >首页</span>
      </el-menu-item>
      <el-submenu  index="">
        <template slot="title" >
          <i class="el-icon-document"></i>
          <span >信息上传</span>
        </template>
        <el-menu-item-group style="padding:0px">
          <!-- <el-menu-item index="1-1" ><span @click="changRou('选项1')">选项1</span></el-menu-item> -->
          <el-menu-item index="/unitSys" >单位信息</el-menu-item>
          <el-menu-item index="/ComroomSys" >机房信息</el-menu-item>
          <el-menu-item index="/infoSys" >信息系统信息</el-menu-item>
          <el-menu-item index="/hardwareSys" >硬件资源信息</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/threaten" >
        <i class="el-icon-warning-outline"></i>
        <span slot="title" >威胁情报</span>
      </el-menu-item>
      <el-menu-item index="/connectTest">
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
      // console.log(this.$route.path)
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
        
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
    },
    // watch:{
    //   $route: {
    //      handler:function(to){
    //           this.routActive = to.path
    //         },
    //         deep: true
    //     }
    // }
  }
</script>

<style scoped>
.el-submenu .el-menu-item{
  min-width: 130px;
}
.el-menu-item-group__title {
    /* padding: 0px !important; */
}
.leftBar {
  /* width:130px;  */
  height:calc(100vh - 50px);
  min-width: 130px;
  padding-top: 30px;
  background-color:#545c64;
  display: inline-block;
}
.el-menu {
    border-right: solid 0px #e6e6e6;
}
</style>