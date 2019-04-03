import request from '@/api/request'

export function getstatisDetail() {
  return request({
    url: '/api/sys/statistical/statisticalData',
    method: 'get'
  })
}
