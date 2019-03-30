import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Login from '@/view/login';
import Dashboard from '@/components/Dashboard'
import Main from '@/view/layout/Layout'


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
  }

]

import {
  SystemRouter
} from './system'

import {UserHomeRouter} from './userhome'

for (let i in SystemRouter){
  routes.push(SystemRouter[i])
}
for (let i in UserHomeRouter){
  routes.push(UserHomeRouter[i])
}


const router = new Router({
  mode: 'history',
  routes: routes
})

export default router;

