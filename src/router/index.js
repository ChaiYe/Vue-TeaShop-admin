import Vue from 'vue'
import Router from 'vue-router'





import AdminInfo from '@/view/adminInfo'
import UserInfo  from  '@/view/userInfo'
import TeaTaste from '@/view/teaInfo/tea_taste'
import Brand from '@/view/teaInfo/brand'
import Gategory from '@/view/Category'
import LogInfo from '@/view/LogInfo'
import  Permission from '@/view/system/permission'
import Add from '@/view/teaInfo/product/add'
Vue.use(Router)

import Login from '@/view/login';
import Main from '@/view/layout/Layout'


let routes = [
  {
    path: '/system',
    name: '系统管理',
    component: () => import('@/view/layout/Layout'),
    iconCls: 'el-icon-third-desktop',
    children: [
      {
        path: '/',
        component:() => import('../view/Dashboard/index.vue'),
        name:'仪表盘'
      },
     {
        path:'/slide',
        name:'轮播图',
        component:()=>import('@/view/Carousel'),
      },{
        path: '/system/log',
        component: LogInfo,
        name: '操作日志',
      },{
        path:'/system/order',
        name:'订单信息',
        component:()=>import('@/view/Order/order.vue'),

      }
    ]
  },
  {
    path:'/system/goods',
    name:'商品管理',
    component: () => import('@/view/layout/Layout'),
    iconCls: 'el-icon-third-golden-fill',
    children:[
      {
        path:'/system/goodList',
        name:'商品列表',
        component:()=>import('@/view/teaInfo/product'),
      },{
        path:'/system/add/:id',
        component:Add,
        name:'添加',
      },{
        path:'/system/gategory',
        component:Gategory,
        name:'分类',
      },{
        path:'/system/teataste',
        component:TeaTaste,
        name:'茶叶口味',
      },{
        path:'/system/Brand',
        component:Brand,
        name:'品牌',
      }
    ]
  },
  {
    path:'/system/users',
    name:'用户管理',
    iconCls: 'el-icon-third-contacts',
    component: () => import('@/view/layout/Layout'),
    children:[
      {
        path: '/system/adminInfo',
        component: AdminInfo,
        name: '管理员信息',
        iconCls: 'el-icon-third-desktop',
      },{
        path: '/system/userInfo',
        component: UserInfo,
        name: '会员信息',
        iconCls: 'el-icon-third-desktop',
      }
    ]
  }
  ,{
    path:'/adminlogin',
    component:Login,
    name:'登录',
  },{
    path:'/front',
    component:()=>import('@/view/Front/HomePage/homepage.vue'),
    name:'百草茶城'
  },{
    path:'/front/searchResult/:keywords',
    component:()=>import('@/view/Front/SearchPage/goodList.vue'),
    name:'搜索结果'
  },{
    path:'/front/searchByTeaTeast/:teaTasteId',
    component:()=>import('@/view/Front/SearchPage/goodListByTeaTaste.vue'),
    name:'搜索结果',
  },{
    path:'/front/goods/queryForGoodsItem',
    component: () => import('@/view/Front/GoodsDetails/goodsDetail.vue'),
    name:'商品详情',
    children:[
      {path: '/', redirect: 'detail'},
      {path:'/front/goods/queryForGoodsItem/comment/:goodsId',component:()=>import('@/view/Front/GoodsDetails/comment.vue')},
      {path:'/front/goods/queryForGoodsItem/detail/:goodsId',component:()=>import('@/view/Front/GoodsDetails/goodsDesc.vue')}
    ],
  },{
      path:'/front/register',
      component:()=>import('@/view/Front/Registered/registered.vue'),
      name:'注册'
  },{
    path:'/front/shoppingCart',
    name:'购物车',
    component:()=>import('@/view/Front/ShoppingCar/shoppingCar')
  },{
    path:'/front/settlement',
    name:'结算页面',
    component:()=>import('@/view/Front/Settlement/settlement.vue'),
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
  },{
    path:'/front/pay/:payId',
    name:'支付宝支付页面',
    component:()=>import('@/view/Front/Pay/pay.vue'),
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    }
  },{
    path:'/front/userLogin',
    name:'用户登录',
    component:()=>import('@/view/Front/Login/Login.vue')
  },
  {
    name: '404',
    path: '/404',
    component: () => import('@/view/ErrorPage/404.vue')
  },
  {
    path: '*',    // 此处需特别注意至于最底部
    redirect: '/404'
  }
]


import {UserHomeRouter} from './userhome'

for (let i in UserHomeRouter){
  routes.push(UserHomeRouter[i])
}


const router = new Router({
  mode: 'history',
  routes: routes
})

export default router;

