import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import userView from '@/views/user/userList'
import botView from '@/views/bot/botList'
import dictView from '@/views/dict/dictList'
import heroView from '@/views/hero/heroList'

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
        },{
          path: 'bot',
          alias: '',
          component: botView,
          name: '机器人管理',
          meta: {description: ''}
        },{
          path: 'dict',
          alias: '',
          component: dictView,
          name: '数据字典管理',
          meta: {description: ''}
        },{
          path: 'hero',
          alias: '',
          component: heroView,
          name: '英雄资料管理',
          meta: {description: ''}
        }]
    }
  ]
})
