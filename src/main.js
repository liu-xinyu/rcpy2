// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import axios from 'axios'
import {Message} from 'element-ui'
import qs from 'qs';
Vue.prototype.$qs = qs;

// axios.interceptors.request.use(config=>{
//   console.log(config.headers.Authorization);
//   console.log(config.headers.token);
//   config.headers.Authorization=window.sessionStorage.getItem('token');

//   return config;
// })
Vue.prototype.axios=axios;

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$message=Message
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
