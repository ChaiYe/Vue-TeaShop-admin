import request from '@/api/request'

export function getCommentData(goodsId) {
  return request({
    url: '/api/sys/evaluation/queryEvaluationByGoodsId',
    method: 'get',
    params:{goodsId}
  })
}
