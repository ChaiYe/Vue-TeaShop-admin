import Main from '@/view/layout/Layout'
import Contract from '@/components/system/Contract'
import AdminInfo from '@/view/adminInfo'
import  AdminAdd from '@/view/adminInfo/add'
import UserInfo  from  '@/view/userInfo'
import TeaTaste from '@/view/teaInfo/tea_taste'
import Brand from '@/view/teaInfo/brand'
import Echart  from '@/view/Dashboard/components/LineChart'
import  Editor from '@/components/EditorDemo'
import ImageUpload  from  '@/components/ImageUploadDemo'
import  GroupInfo from '@/view/Dashboard'
import Gategory from '@/view/Category'
import LogInfo from '@/view/LogInfo'
import  Permission from '@/view/system/permission'
import Add from '@/view/teaInfo/product/add'
import GoodList from '@/view/teaInfo/product/index.vue';

const SystemRouter = [{
  path: '/system',
  name: '系统管理',
  component: Main,
  iconCls: 'el-icon-third-desktop',
  children: [{
    path: '/system/log',
    component: LogInfo,
    name: '操作日志'
  },{
    path: '/system/adminInfo',
    component: AdminInfo,
    name: '管理员信息'
  },{
    path: '/system/userInfo',
    component: UserInfo,
    name: '用户信息'
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
    path:'/system/add',
    component:Add,
    name:'添加'
  },{
    path:'/system/goodList',
    name:'商品列表',
    component:()=>import('@/view/teaInfo/product')
  },{
    path:'/system/slide',
    name:'轮播图',
    component:()=>import('@/view/Carousel')
  }
  ]
  },
]

export {
  SystemRouter
}
