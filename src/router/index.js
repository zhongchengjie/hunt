import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import loginView from '@/views/login'
import userView from '@/views/user/userList'
import botView from '@/views/bot/botList'
import dictView from '@/views/dict/dictList'
import heroView from '@/views/hero/heroList'

Vue.use(Router)

export default new Router({
  routes: [
    {
	     path: '/login',
	     component: loginView
	  },
    {
      path: '/',
      name: 'index',
      component:index,
      children: [
        {
          path: 'user',
          component: userView,
          name: '用户管理',
          meta: {description: ''}
        },{
          path: 'bot',
          component: botView,
          name: '机器人管理',
          meta: {description: ''}
        },{
          path: 'dict',
          component: dictView,
          name: '数据字典管理',
          meta: {description: ''}
        },{
          path: 'hero',
          component: heroView,
          name: '英雄资料管理',
          meta: {description: ''}
        }]
    }
  ]
})
