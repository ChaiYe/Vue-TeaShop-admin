import  {getGoodsDetail} from '@/api/goodRequest.js'
const goodsData={
  state: {
    goodsData:null,
  },
  mutations: {
    SET_GOODSDATA: (state, data) => {
      state.goodsData=data
    },
  },
  actions:{
    getGoodsData({commit},goodsId) {

      return new Promise((resolve, reject) => {
        getGoodsDetail(goodsId).then(res => {
          console.log("异步请求结束");
          console.log(res);
          const data = res.data;
          commit('SET_GOODSDATA', data);
          /*resolve表示已解决*/
          resolve();
        }).catch(error => {
          /*已失败*/
          console.log(error);
          reject(error)
        })
      });
      /*axios.get(this.HOST + "/sys/goods/queryForGoodsItem?goodsId="+goodsId).then((res)=> {
        console.log(res.data);
         const product=res.data;
        commit('SET_GOODSDATA', product)
      }).catch( (error) =>{
        console.log(error);
      })*/

    }
  }
}

export default goodsData


