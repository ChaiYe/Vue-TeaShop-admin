import  {getCommentData} from '@/api/commentRequest.js'
const commentData={
  state: {
    commentData:null,
  },
  mutations: {
    SET_COMMENTDATA: (state, data) => {
      state.commentData=data
    },
  },
  actions:{
    getCommentsData({commit},goodsId) {
      return new Promise((resolve, reject) => {
        getCommentData(goodsId).then(res => {
          console.log("异步请求评论结束");
          console.log(res);
          const data = res.data;
          commit('SET_COMMENTDATA', data);
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

export default commentData
