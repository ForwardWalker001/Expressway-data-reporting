<template>
    <div >
        <img id="img" src="../assets/Ahlogo.png" alt="加载中">
        <router-link to="/index"></router-link>
        <router-link to="/infoSys"></router-link>
        <router-link to="/unitSys"></router-link>
        <router-link to="/ComroomSys"></router-link>
        <router-link to="/hardwareSys"></router-link>
        <router-link to="/threaten"></router-link>
        <router-link to="/connectTest"></router-link>
        <el-container>
            <el-header style="height:50px; padding:0">
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
        // this.$axios.get('http://10.11.44.74:8080/test/threatintelligence/selectAllInformation')
        // .then((res) => {
        //     console.log(res)
        // })
        // console.log(this.$axios)
    },
    methods:{
        
    }
}
</script>

<style scoped>
#content {
    /* width: 400px; */
    /* float: left; */
    /* margin-top: 40px; */
    /* margin: 40px  0px ; */
    /* display: flex; */
    /* justify-content: center; */
}
#img {
    width: 150px;
    height: 46px;
    position: absolute;
    top:5px;
    left: 5px;
    z-index:100;
}

</style>