import  {getstatisDetail} from '@/api/statisDataRequest.js'
const statisData={
  state: {
    statisData:null,
  },
  mutations: {
    SET_STATISDATA: (state, data) => {
      state.statisData=data
    },
  },
  actions:{
    getstatisData({commit}) {

      return new Promise((resolve, reject) => {
        getstatisDetail().then(res => {
          console.log(res.data);
          const data = res.data;
          commit('SET_STATISDATA', data);
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

export default statisData
