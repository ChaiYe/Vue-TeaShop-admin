import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import permission from './modules/permission'
import orderData from './modules/orderData'
import  goodsData  from  './modules/goodsData'
import  commentData  from './modules/commentData'
import statisData from './modules/statisData'
import userRequestData from './modules/userRequestData'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    permission,
    orderData,
    goodsData,
    commentData,
    statisData,
    userRequestData
  },
  getters
})

export default store
