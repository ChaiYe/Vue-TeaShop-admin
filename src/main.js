// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import elementUIVerify from 'element-ui-verify';
import axios from 'axios'
import VueAxios from 'vue-axios'
import VCharts from 'v-charts'
import VueQuillEditor from 'vue-quill-editor'
import Vuex from 'vuex';
import store from './store'



/*导入阿里icon*/
import './assets/icon/iconfont.css'

import '@/icons'
Vue.prototype.HOST = '/api';
Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(elementUIVerify);
Vue.use(VueAxios, axios);
Vue.use(VCharts);
Vue.use(VueQuillEditor);
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
