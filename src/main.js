import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router/router.js'
import store from './store/store.js'
import * as echarts from 'echarts'
import axios from 'axios'

axios.defaults.baseURL = 'http://10.11.44.74:8888'
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
Vue.use(ElementUI);

Vue.config.productionTip = false

document.title = '滨江区高速公路数据上报'
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
