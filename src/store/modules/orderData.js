const orderData={
  state: {
    datamsg:[100,1000],
  },
  mutations: {
    SET_DATAMSG: (state, data) => {
      state.datamsg=data
    },
  },
  actions:{
    AddDataMsg({commit},data) {
      commit('SET_DATAMSG', data)
    }
  }
}
export default orderData


