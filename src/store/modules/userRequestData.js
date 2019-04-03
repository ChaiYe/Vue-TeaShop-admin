import  {getUserName} from '@/api/userRequest.js'
const userData= {
  state: {
    userName: null,
  },
  mutations: {
    SET_USERNAME: (state, data) => {
      state.userName = data
    },
  },
  actions: {
    getUserData({commit}, data) {
      return new Promise((resolve, reject) => {
        getUserName().then(res => {
          console.log("异步获取用户名");
          const data = res.data;
          localStorage.setItem("username", data);
          commit('SET_USERNAME', data);
          /*resolve表示已解决*/
          resolve();
        }).catch(error => {
          /*已失败*/
          console.log(error);
          reject(error)
        })
      });
    }
  }
}
export default userData
