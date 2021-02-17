import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '../src/assets/css/global.css';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/fonts/iconfont.css'
import axios from 'axios';
import ElementUI from 'element-ui';
import TreeTable from 'vue-table-with-tree-grid'
import './plugins/elements.js'
axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1";
axios.interceptors.request.use( config=>{
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http =axios;
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.component('tree-table',TreeTable)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
