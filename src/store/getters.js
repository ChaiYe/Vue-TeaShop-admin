const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  username: state => state.user.username,
  roles: state => state.user.roles,
  user: state => state.user.user,
  menus: state => state.user.menus,
  menu: state => state.permission.routers,
  apiRouters: state => state.permission.apiRouters,
  orderdata:state=>state.orderData.datamsg,
  goodsData:state=>state.goodsData.goodsData,
  commentData:state=>state.commentData.commentData,
  statisData:state=>state.statisData.statisData,
  userName:state=>state.userRequestData.userName,
}
export default getters
