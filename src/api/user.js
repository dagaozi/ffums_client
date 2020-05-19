/*
 * @Description:
 * @Author: lxc
 * @Date: 2020-05-06 20:11:06
 * @LastEditTime: 2020-05-19 20:37:36
 * @LastEditors: lxc
 */
import request from '@/utils/request'

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

/**
 *
 * @param {*} type 登录类型：（填写101）
 * @param {*} account 用户名
 * @param {*} password 密码
 */
export function login(type, account, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: { type, account, password }
  })
}

/**
 * 验证token是否有效

 * @param {*} token
 */
export function verifyToken(token) {
  return request({
    url: '/user/verifyToken',
    method: 'post',
    params: { token }
  })
}

/**
 * 新增用户
 * @param {*} account 用户名
 * @param {*} password 密码
 * @param {*} grade 等级（USER=3 SUER=6 ADMIN=9）
 */
export function register(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

