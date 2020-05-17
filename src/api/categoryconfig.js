import request from '@/utils/request'


/**
 * 
 * @param {*} name 目录名称
 * @param {*} categoryId 所属类别 {1:实验室指标/2:特检指标/3:人体成分/:4其他信息}
 * @param {*} sort 排序
 */
export function addItemCategoryConfig(name, categoryId, sort) {
    return request({
        url: '/itemCategoryconfig/add',
        method: 'post',
        params: { name, categoryId, sort }
    })
}

export function updateItemCategoryConfig(name, categoryId) {
    return request({
        url: '/itemCategoryconfig/update',
        method: 'get',
        params: { name, categoryId }
    })
}

/**
 * 获取所有指标目录
 * @param {*} id 
 */
export function getAllItemCategoryConfig() {
    return request({
        url: '/itemCategoryconfig/getAll',
        method: 'get',
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
        params: { id }
    })
}

