import request from '@/utils/request'

/**
 * 新增指标项
 * @param {*} name 指标名称
 * @param {*} inputType 输入类型 {1:文字/2:选项}
 * @param {*} typeOption 选项配置（用特殊符号分割）
 * @param {*} sort 排序
 */
export function addConfig(name, inputType, typeOption, sort) {
    return request({
        url: '/itemconfig/add',
        method: 'post',
        params: { name, inputType, typeOption, sort }
    })
}

/**
 * 更新指标
 * @param {*} name 
 * @param {*} inputType 
 * @param {*} typeOption 
 * @param {*} sort 
 */

export function updateConfig(name, inputType, typeOption, sort) {
    return request({
        url: '/itemconfig/update',
        method: 'get',
        params: { name, inputType, typeOption, sort }
    })
}

/**
 * 获取所有指标配置
 */
export function getAllConfig() {
    return request({
        url: '/itemconfig/getAll',
        method: 'get',
    })
}