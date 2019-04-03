 import request from '@/api/request'
 export function getUserName() {
   return request({
     url: '/api/sys/userLogin/getLoginUserName',
     method: 'get',
   })
 }
