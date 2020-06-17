/*
 * @Description:
 * @Author: lxc
 * @Date: 2020-06-06 23:31:11
 * @LastEditTime: 2020-06-17 18:46:38
 * @LastEditors: lxc
 */
import request from '@/utils/request'
import axios from 'axios'

/**
 * 根据随访id获取指标信息

 * @param {*} followId
 */
export function findByFollowId(followId) {
  return request({
    url: '/itemRecord/getByFollowId',
    method: 'post',
    params: { followId }
  })
}

/**
 * 新增指标项
 * @param {*} followId 随访ID
 * @param {*} itemId 指标ID
 * @param {*} itemValue 选项配置（用特殊符号分割）
 * @param {*} opUserId 操作者ID
 */
export function addOrUpdate(data) {
  return request({
    url: '/itemRecord/addOrUpdate',
    method: 'post',
    data
  })
}

export function getRecordData(followId) {
  axios
    .all([
      request({
        url: '/itemRecord/getByFollowId',
        method: 'post',
        params: { followId }
      }),
      request({
        url: '/itemConfig/getAll',
        method: 'get'
      })
    ])
    .then(
      axios.spread(function(recordRes, configRes) {
        console.log('configRes', configRes)
        console.log('recordRes', recordRes)
        return { ok: true, data: '测试' }
      })
    )
}
