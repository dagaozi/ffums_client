/*
 * @Description:
 * @Author: lxc
 * @Date: 2020-05-18 08:47:24
 * @LastEditTime: 2020-06-12 09:32:00
 * @LastEditors: lxc
 */
import request from '@/utils/request'

/**
 * 根据病人获取随访记录
 * @param {*} id
 */
export function getByPatientId(id) {
  return request({
    url: '/followup/getByPatientId',
    method: 'get',
    params: { patientId: id }
  })
}

export function deleteFollowUp(followId) {
  return request({
    url: '/followup/delete',
    method: 'post',
    params: { followId }
  })
}

export function updateFollowUp(data) {
  return request({
    url: '/followup/update',
    method: 'post',
    data
  })
}

/**
 * 添加随访记录
 * @param {*} data
 */
export function addFollowUp(data) {
  return request({
    url: '/followup/add',
    method: 'post',
    data
  })
}
