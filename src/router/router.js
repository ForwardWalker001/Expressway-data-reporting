import Vue from 'vue'
import VueRouter from 'vue-router'
import MainCom from '../components/MainCom.vue'

import Infosys from '../view/infoSys.vue'
import unitSys from '../view/UnitInfo.vue'
import ComroomSys from '../view/MotorRoomInfo.vue'
import HardwareSys from '../view/HardwareSys.vue'
import ThreatenSys from '../view/ThreatenSys.vue'
import ConnectTest from '../view/NodeRegister.vue'
import UserCom from '../view/UserCom.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect : '/index'
    },
    {
        path: '/index',
        name: 'index',
        component: MainCom
    },
    {
        path: '/infoSys',
        name: 'infoSys',
        component: Infosys
    },
    {
        path: '/unitSys',
        component: unitSys
    },
    {
        path:'/ComroomSys',
        component: ComroomSys
    },
    {
        path: '/hardwareSys',
        component: HardwareSys
    },
    {
        path: '/threaten',
        component: ThreatenSys
    },
    {
        path: '/connectTest',
        component: ConnectTest
    },
    {
        path: '/user',
        component: UserCom
    }
]

const router = new VueRouter({
    routes
  })
  
  export default router