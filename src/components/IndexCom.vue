<template>
    <div >
        <span class="span" id="img">数据上报系统</span>
        <el-container>
            <el-header style="height:30px; padding:0">
                <head-bar></head-bar>
            </el-header>
            <el-container>
            <el-aside width="150px" style="background-color:#545c64">
                <left-bar></left-bar>
            </el-aside>
            <el-main style="padding:20px">
                <router-view id="content"></router-view>
            </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import HeadBar from './HeadBar.vue'
import LeftBar from './LeftBar.vue'

export default {
    components: {
        HeadBar,
        LeftBar
    },
    data(){
        return{
           
        }
    },
    created(){
        
    },
    methods:{
        
    }
}
</script>

<style scoped>
#img {
    width: 150px;
    height: 46px;
    position: absolute;
    top:5px;
    left: 0px;
    z-index:100;
}
 .span{
   line-height: 50px;
   color: #03a9f4;
   font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
   font-size: 16px;
   text-align: center;
 }
 .el-main{
     padding: 0px;
 }
</style>