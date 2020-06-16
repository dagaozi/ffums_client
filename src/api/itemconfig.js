/*
 * @Description:
 * @Author: lxc
 * @Date: 2020-05-18 08:47:24
 * @LastEditTime: 2020-06-12 09:07:14
 * @LastEditors: lxc
 */
import request from '@/utils/request'

/**
 * 新增指标项
 * @param {*} name 指标名称
 *  @param {*} categoryId 目录id
 * @param {*} inputType 输入类型 {1:文字/2:选项}
 * @param {*} typeOption 选项配置（用特殊符号分割）
 * @param {*} sort 排序
 */
export function addConfig(data) {
  return request({
    url: '/itemConfig/add',
    method: 'post',
    data
  })
}

/**
 * 更新指标
 * @param {*} name
 * @param {*} inputType
 * @param {*} typeOption
 * @param {*} sort
 */

export function updateConfig(data) {
  return request({
    url: '/itemConfig/update',
    method: 'post',
    data
  })
}

/**
 * 获取所有指标配置
 */
export function getAllConfig() {
  return request({
    url: '/itemConfig/getAll',
    method: 'get'
  })
}

export function deleteConfig(id) {
  return request({
    url: '/itemConfig/delete',
    method: 'post',
    data: { id }
  })
}
