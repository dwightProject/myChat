import Vue from 'vue'
import Router from 'vue-router'
const ChatHome = ()=> import('@/container/chatHome/ChatHome')
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'chatHome',
      component: ChatHome
    }
  ]
})
