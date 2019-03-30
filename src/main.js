// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import elementUIVerify from 'element-ui-verify';
import LightTimeline from 'vue-light-timeline';
import axios from 'axios'
import VueAxios from 'vue-axios'
import VCharts from 'v-charts'
import VueQuillEditor from 'vue-quill-editor'
import Vuex from 'vuex';
import VueQriously from 'vue-qriously';
import store from './store'

/*导入阿里icon*/
import './assets/icon/iconfont.css'

import '@/icons'
import moment from 'moment'
Vue.prototype.HOST = '/api';
Vue.use(Vuex);
Vue.use(VueQriously);
Vue.use(ElementUI);
Vue.use(elementUIVerify);
Vue.use(LightTimeline);

// 响应拦截
/*
axios.interceptors.response.use(res => {

  console.log("response拦截");
  console.log(res);

  // 报错执行 axios then 方法错误的回调，成功返回正确的数据
  return res.status !== 200 ? Promise.reject(res.data) : res.data;
}, res => {
  // 如果 token 验证失败则跳回登陆页，并执行 axios then 方法错误的回调
  if (res.response.status === 401) {
    router.history.push("/login");
  }
  return Promise.reject("Not Allowed");
});
*/

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (localStorage.getItem("token")) {  // 通过vuex state获取当前的token是否存在
      next();
    }
    else {
      next({
        path: '/front/userLogin',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
});


//请求发送拦截，把数据发送给后台之前做些什么......
axios.interceptors.request.use((request) => {
    let token = localStorage.getItem("token");
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
      return request;
    }else{
      //再发送给后台
      return request;
    }


}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
/*axios.defaults.withCredentials = true*/

Vue.use(VueAxios, axios);
Vue.use(VCharts);
Vue.use(VueQuillEditor);
Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)

})
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'



Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
