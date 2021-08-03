import Vue from 'vue'
import VueRouter from 'vue-router'
import MainCom from '../components/MainCom.vue'
import Login from '../components/Login.vue'
// import Regist from '../components/Regist.vue'
import indexCom from '../components/IndexCom.vue'

import Infosys from '../view/infoSys.vue'
import unitSys from '../view/UnitInfo.vue'
import ComroomSys from '../view/MotorRoomInfo.vue'
import HardwareSys from '../view/HardwareSys.vue'
import ThreatenSys from '../view/ThreatenSys.vue'
import ConnectTest from '../view/NodeRegister.vue'
import handleUnit from '../view/handleUnitSys.vue'
// import handleComroom from '../view/handleComroom.vue'
// import handleInfo from '../view/handleInfo.vue'
// import handleHardware from '../view/handleHardware.vue'
import handleThrea from '../view/handleThrea.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/login',
        component: Login
    },
    // {
    //     path:'/regist',
    //     component: Regist
    // },
    {
        path: '/index',
        component: indexCom,
        children: [
            {
                path: '',
                // name: 'index',
                component: MainCom
            },
            {
                path: 'infoSys',
                name: 'infoSys',
                component: Infosys
            },
            {
                path: 'unitSys',
                component: unitSys
            },
            {
                path: 'ComroomSys',
                component: ComroomSys
            },
            {
                path: 'hardwareSys',
                component: HardwareSys
            },
            {
                path: 'threaten',
                component: ThreatenSys
            },
            {
                path: 'connectTest',
                component: ConnectTest
            },
            {
                path: 'handle/unitSys',
                component: handleUnit
            },
            {
                path: 'handle/ComroomSys',
                
            },
            {
                path: 'handle/infoSys',
            },
            {
                path: 'handle/hardwareSys',
            },
            {
                path:'handle/threaten',
                component: handleThrea
            },
        ]
    },
]

const router = new VueRouter({
    routes
})
// router.beforeEach((to, from, next) => {
//     if (to.path === '/login') return next()
//     // 获取token,查看是否登录
//     else{
//         if(!sessionStorage.getItem("userInfo")){
//             return next('/login')
//         }
//     }
//     next()
//   })
export default router