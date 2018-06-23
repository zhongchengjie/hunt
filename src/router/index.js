import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import loginView from '@/views/login'
import dashboardView from '@/views/dashboard'
import userView from '@/views/user/userList'
import dictView from '@/views/dict/dictList'
import heroView from '@/views/hero/heroList'
import botView from '@/views/bot/botList'
import storeView from '@/views/bot/storeList'
import apiDocView from '@/views/api/apiDoc'
import modelView from '@/views/model/modelInfo'

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
          path: 'dashboard',
          component: dashboardView,
          alias: '',
          name: '仪表盘',
          meta: {description: ''}
        },{
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
        },{
          path: 'api/model',
          component: modelView,
          name: 'Model',
          meta: {description: ''}
        }]
    }
  ],
  mode: 'history',
  linkExactActiveClass: 'active',
  scrollBehavior: function(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})
