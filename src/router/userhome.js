const UserHomeRouter = [
    {
    path:'/front/userHome',
    component:()=>import('@/view/Front/UserHome/userHome.vue'),
    name:'用户主页',
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
      children:[
        {path: '/', redirect: 'center'},
        {
          path:'/front/userHome/center',
          component:()=>import('@/view/Front/UserHome/center.vue'),
          name:'用户中心',
          meta: {
            requireAuth: true,
          },
        },{
        path:'/front/userHome/address',
        component:()=>import('@/view/Front/UserHome/Setting/address.vue'),
        name:'地址管理',
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      },{
        path:'/front/userHome/order/:orderStatus',
        component:()=>import('@/view/Front/UserHome/orderItem.vue'),
        name:'订单',
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      },{
          path:'/front/userHome/collection',
        component:()=>import('@/view/Front/UserHome/Setting/userCollection.vue'),
        name:'收藏',
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      },{
        path:'/front/userHome/footprint',
        component:()=>import('@/view/Front/UserHome/Setting/footprint.vue'),
        name:'足迹',
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      },{
        path:'/front/userHome/headCut',
          component:()=>import('@/view/Front/UserHome/Setting/headCut.vue'),
          name:'头像',
          meta:{
            requireAuth:true
          }
        },{
          path:'/front/userHome/userInfo',
          component:()=>import('@/view/Front/UserHome/Setting/userInfo.vue'),
          name:'用户信息',
          meta:{
            requireAuth:true
          }
        }
      ],
  }
];

export { UserHomeRouter}
