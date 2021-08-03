<template>
  <el-menu
    class="el-menu-demo headBar"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
  </el-menu>
</template>

<script>
export default {
 
};
</script>
 <style scoped>
 .headBar {
    width: 100%;
    height: 30px;
    float: right;
    display: flex;
    justify-content: space-between;
 }
 .el-menu.el-menu--horizontal{
     border : 0px;
 }
 /* #span{
   line-height: 50px;
   color: #b59393;
   font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
   font-size: 16px;
 } */
 .userbut {
    font-size: 12px;
    position: absolute;
    right: 20px; 
    
 }
</style>