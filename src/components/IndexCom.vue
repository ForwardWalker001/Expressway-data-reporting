<template>
    <div >
        <!-- <img id="img" src="../assets/Ahlogo.png" alt="加载中"> -->
        <span class="span" id="img">数据上报系统</span>
        <router-link to="/index"></router-link>
        <router-link to="/infoSys"></router-link>
        <router-link to="/unitSys"></router-link>
        <router-link to="/ComroomSys"></router-link>
        <router-link to="/hardwareSys"></router-link>
        <router-link to="/threaten"></router-link>
        <router-link to="/connectTest"></router-link>
        <el-container>
            <el-header style="height:30px; padding:0">
                <head-bar></head-bar>
            </el-header>
            <el-container>
            <el-aside width="150px" style="background-color:#545c64">
                <left-bar></left-bar>
            </el-aside>
            <el-main>
                <router-view id="content"></router-view>
            </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import HeadBar from './HeadBar.vue'
import LeftBar from './LeftBar.vue'
// import MainCom from './MainCom.vue'

export default {
    components: {
        HeadBar,
        LeftBar,
        // MainCom
    },
    data(){
        return{
        }
    },
    mounted(){
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
</style>