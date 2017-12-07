import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import userView from '@/views/user'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component:index,
      children: [
        {
          path: 'user',
          alias: '',
          component: userView,
          name: '用户管理',
          meta: {description: ''}
        }]
    }
  ]
})
