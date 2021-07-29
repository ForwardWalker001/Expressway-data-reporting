<template>
  <el-menu
    :default-active="active"
    class="el-menu-demo headBar"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <span id="span">数据上报系统</span>
    <!-- <el-menu-item index="/index" style="margin-right:100px;height: 50px;
    line-height: 50px;">处理中心</el-menu-item>
    <el-menu-item class="userbut" index="/user" style="height: 50px;
    line-height: 50px;">
      <div>
        <el-avatar :size="20" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
        <span> 用户名</span>
      </div> 
    </el-menu-item> -->
  </el-menu>
</template>

<script>
export default {
  // data() {
  //   return {
  //     active: '/index'
  //   };
  // },
  // mounted(){
  //   if(this.$route.path == '/user')this.active = '/user'
  //   else{
  //     this.active = '/index'
  //   }
  // },
  // methods: {
  //   handleSelect(key) {
  //     if(key == '/user' && this.$route.path !="/user")this.$router.push('/user')
  //     else if(key == '/index' && this.$route.path !="/index"){
  //       this.$router.push('/index')
  //     }
  //   },
  // },
  // watch:{
  //   $route: {
  //     handler:function(to){
  //       console.log('1' + to.path)

  //       this.active = to.path
  //       if(to.path!=='/index'&&to.path!=='/user'){
  //         this.active = '/index'
  //       }
  //       console.log(this.active)
  //     },
  //     deep: true
  //   }
  // }
};
</script>
 <style scoped>
 .headBar {
    width: 100%;
    height: 50px;
    float: right;
    display: flex;
    justify-content: space-between;
 }
 .el-menu.el-menu--horizontal{
     border : 0px;
 }
 #span{
   line-height: 50px;
   color: #b59393;
   font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
   font-size: 16px;
 }
 .userbut {
    font-size: 12px;
    position: absolute;
    right: 20px; 
    
 }
</style>