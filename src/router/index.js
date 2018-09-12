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
import apiDebugView from '@/views/api/apiDebug'
import userAccountView from '@/views/account/userAccount'
import accountDetailView from '@/views/account/accountDetail'
import depositListView from '@/views/account/depositList'
import modelView from '@/views/model/modelInfo'
import notFoundView from '@/components/404.vue'

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
          alias: '',           //alias：路径别名，当路径为''时，加载dashboardView组件
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
        }, {
          path: 'api/debug',
          component: apiDebugView,
          name: 'API调试',
          meta: {description: ''}
        },{
          path: 'account/list',
          component: userAccountView,
          name: '用户账户',
          meta: {description: ''}
        },{
          path: 'account/detail',
          component: accountDetailView,
          name: '账户明细',
          meta: {description: ''}
        },{
          path: 'account/deposit',
          component: depositListView,
          name: '充值记录',
          meta: {description: ''}
        },{
          path: 'api/model',
          component: modelView,
          name: 'Model',
          meta: {description: ''}
        }]
    }, {
      // not found handler
      path: '*',
      component: notFoundView
    }
  ],
  mode: 'history',
  linkExactActiveClass: 'active',
  scrollBehavior: function(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})
