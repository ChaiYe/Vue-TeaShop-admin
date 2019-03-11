import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Login from '@/view/login';
import Dashboard from '@/components/Dashboard'
import Main from '@/view/layout/Layout'
import AdminInfo from '@/view/adminInfo'
import  AdminAdd from '@/view/adminInfo/add'
import UserInfo  from  '@/view/userInfo'
import TeaTaste from '@/view/teaInfo/tea_taste'
import Brand from '@/view/teaInfo/brand'
import AddProduct from  '@/view/teaInfo/product/add'
import Slide from  '@/view/slide'
import  RoleInfo from '@/view/system/roleInfo'
import  PermissionInfo  from '@/view/system/permission'

let routes = [{
  path:'/',
  component: Main,
  hidden: true,
  children: [{
    path: '/',
    component:Dashboard,
    name:'首页'
  },
  ]
}
  ,{
    path:'/adminlogin',
    component:Login,
    name:'登录',
  }
]

import {
  SystemRouter
} from './system'

for (let i in SystemRouter){
  routes.push(SystemRouter[i])
}

const router = new Router({
  routes: routes
})

export default router;

