import AdminInfo from '@/view/adminInfo'
import UserInfo  from  '@/view/userInfo'
import TeaTaste from '@/view/teaInfo/tea_taste'
import Brand from '@/view/teaInfo/brand'
import Gategory from '@/view/Category'
import LogInfo from '@/view/LogInfo'
import  Permission from '@/view/system/permission'
import Add from '@/view/teaInfo/product/add'

const SystemRouter = [
 /* {
  path: '/',
  name: '系统管理',
  hidden: false,
    component: () => import('@/view/layout/Layout'),
  iconCls: 'el-icon-third-desktop',
  children: [
    {
    path: '/system/log',
    component: LogInfo,
    name: '操作日志',
      hidden: true,
  },{
    path:'/system/teataste',
    component:TeaTaste,
    name:'茶叶口味'
  },{
    path:'/system/Brand',
    component:Brand,
    name:'品牌'
  },{
    path:'/system/gategory',
    component:Gategory,
    name:'分类'
  },{
    path:'/system/permission',
    component:Permission,
    name:'权限'
  },{
    path:'/system/add/:id',
    component:Add,
    name:'添加'
  },{
    path:'slide',
    name:'轮播图',
    component:()=>import('@/view/Carousel')
  }, {
    path: '/system/dashboard',
    name: '仪表盘',
    component: () => import('../view/Dashboard/index.vue')
  },{
    path:'/system/order',
    name:'订单信息',
    component:()=>import('@/view/Order/order.vue')
  }
  ]
  },
  {
    path:'/system/goods',
    name:'商品管理',
    component:()=>import('@/view/teaInfo/product'),
    iconCls: 'el-icon-third-desktop',
    children:[
      {
        path:'/system/goodList',
        name:'商品列表',
        component:()=>import('@/view/teaInfo/product')
      }
    ]
  },
  {
    path:'/system/users',
    name:'用户管理',
    iconCls: 'el-icon-third-desktop',
    children:[
      {
        path: '/system/adminInfo',
        component: AdminInfo,
        name: '管理员信息'
      },{
        path: '/system/userInfo',
        component: UserInfo,
        name: '会员信息'
      }
    ]
  }*/
]

export {
  SystemRouter
}
