import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/scss/common.scss'
//注册全局插件
import {MySocket,MyCom} from './plugins/index';
Vue.use(MySocket)
Vue.use(MyCom)
//ui插件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
