/*
 * @Description:
 * @Author: lxc
 * @Date: 2020-06-06 23:31:11
 * @LastEditTime: 2020-06-15 21:37:36
 * @LastEditors: lxc
 */
import request from '@/utils/request'

/**
 * 根据随访id获取指标信息

 * @param {*} followId
 */
export function findByFollowId(followId) {
  return request({
    url: '/itemRecord/getByFollowId',
    method: 'post',
    data: { followId }
  })
}

/**
 * 新增指标项
 * @param {*} followId 随访ID
 * @param {*} itemId 指标ID
 * @param {*} itemValue 选项配置（用特殊符号分割）
 * @param {*} opUserId 操作者ID
 */
export function addOrUpdate(followId, itemId, itemValue, opUserId) {
  return request({
    url: '/itemRecord/addOrUpdate',
    method: 'post',
    data: { followId, itemId, itemValue, opUserId }
  })
}
