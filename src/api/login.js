import request from '@/api/request'
/*登录请求*/
export function login(username, password) {
  return request({
    url: this.HOST+'/api/sys/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

/*获取登录用户的信息*/
export function getInfo(token) {
  return request({
    url: '/getUserInfo',
    method: 'get',
    params: { token }
  })
}

/*登出*/
export function logout() {
  return request({
    url: 'user/logout',
    method: 'post'
  })
}
