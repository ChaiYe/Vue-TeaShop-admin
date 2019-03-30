import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken, setToken } from '@/utils/auth'

const service = axios.create({
  timeout: 7000
});

service.interceptors.request.use((request) => {
  console.log(request);
  let token = localStorage.getItem("token");
  console.log("token is  "+token);
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  //再发送给后台
  return request;

}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
/*
service.interceptors.request.use(
  config => {
    if (store.getters.token) {//获取存储的token
      config.headers['jwtHeader'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
)
*/


/*service.interceptors.response.use(
  response=>{
  //如果返回有token则为设置成新的token
  if(response.headers.newtoken){
    setToken(response.headers.newtoken)
  }
    const res = response.data;
    if (res.code !== 200) {
      /!*设置ElementUI弹出框信息*!/
      Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000
      });

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      //用户名和密码其中之一或两者都无效
      if(res.code === 401){
        setToken('')
        router.push("/login")
      }
      return Promise.reject('error')
    }else{
      return response.data
    }


},
  error => {
    return Promise.reject('服务不可用，请重新再试');
  }
);*/


export default service
