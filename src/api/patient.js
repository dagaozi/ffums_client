/*
 * @Description:
 * @Author: lxc
 * @Date: 2020-05-18 08:47:24
 * @LastEditTime: 2020-05-18 14:56:40
 * @LastEditors: lxc
 */
import request from '@/utils/request'

/**
 * 删除患者以及患者的随访信息
 * @param {*} id
 */
export function deletePatientInfo(id) {
  return request({
    url: '/patient/delete',
    method: 'post',
    params: { id }
  })
}

/**
 * 搜索患者 参数可以传一个也可以三个都传
 * @param {*} name 姓名
 * @param {*} idCard 身份证
 * @param {*} inPatientId 住院号
 */
export function searchPatientInfo(name, idCard, inPatientId) {
  return request({
    url: '/patient/search',
    method: 'get',
    params: { name, idCard, inPatientId }
  })
}

/**
 * 新增患者
 * @param {*} data
 */
export function addPatient(data) {
  return request({
    url: '/patient/add',
    method: 'post',
    data
  })
}

/**
 * 更新患者信息
 * @param {*} data
 */
export function updatePatient(data) {
  return request({
    url: '/patient/update',
    method: 'post',
    data
  })
}

/**
 * 获取患者
 * @param {*} id
 */
export function getPatientInfo(id) {
  return request({
    url: '/patient/getPatient',
    method: 'get',
    params: { id }
  })
}

/**
 *  获取所有患者
 */
export function getPatientList() {
  return request({
    url: '/patient/getPatients',
    method: 'get'
  })
}

