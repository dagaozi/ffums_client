/*
 * @Description:
 * @Author: lxc
 * @Date: 2020-05-18 08:47:24
 * @LastEditTime: 2020-05-26 09:55:35
 * @LastEditors: lxc
 */
import request from '@/utils/request'

/**
 *
 * @param {*} name 目录名称
 * @param {*} categoryId 所属类别 {1:实验室指标/2:特检指标/3:人体成分/:4其他信息}
 * @param {*} sort 排序
 */
export function addItemCategoryConfig(data) {
  return request({
    url: '/itemCategoryconfig/add',
    method: 'post',
    data
  })
}

export function updateItemCategoryConfig(data) {
  return request({
    url: '/itemCategoryconfig/update',
    method: 'post',
    data
  })
}

/**
 * 获取所有指标目录
 * @param {*} id
 */
export function getAllItemCategoryConfig() {
  return request({
    url: '/itemCategoryconfig/getAll',
    method: 'get'
  })
}

/**
 * 获取目录
 * @param {*} id
 */
export function getItemCategoryConfigById(id) {
  return request({
    url: '/itemCategoryconfig/getbyId',
    method: 'get',
    params: { id: id }
  })
}

export function getItemCategoryConfigByName(categoryName) {
  return request({
    url: '/itemCategoryconfig/getByCategoryName',
    method: 'get',
    params: { categoryName: categoryName }
  })
}

export function deleteCategory(followId) {
  return request({
    url: '/delete',
    method: 'post',
    data: { followId: followId }
  })
}
