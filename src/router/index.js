import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import loginView from '@/views/login'
import userView from '@/views/user/userList'
import dictView from '@/views/dict/dictList'
import heroView from '@/views/hero/heroList'
import botView from '@/views/bot/botList'
import storeView from '@/views/bot/storeList'
import apiDocView from '@/views/api/apiDoc'

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
          path: 'dict',
          component: dictView,
          name: '数据字典管理',
          meta: {description: ''}
        },{
          path: 'hero',
          component: heroView,
          name: '英雄资料管理',
          meta: {description: ''}
        },{
          path: 'bot/account',
          component: botView,
          name: '机器人帐号',
          meta: {description: ''}
        },{
          path: 'bot/store',
          component: storeView,
          name: '机器人库存',
          meta: {description: ''}
        },{
          path: 'api/doc',
          component: apiDocView,
          name: 'API文档',
          meta: {description: ''}
        }]
    }
  ]
})
