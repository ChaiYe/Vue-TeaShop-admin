import request from '@/api/request'

export function getGoodsDetail(goodsId) {
  return request({
    url: '/api/sys/goods/queryForGoodsItem',
    method: 'get',
    params:{goodsId}
  })
}
