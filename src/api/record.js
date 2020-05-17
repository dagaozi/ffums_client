import request from '@/utils/request'



/**
 * 根据随访id获取指标信息

 * @param {*} followId 
 */
export function findByFollowId(followId) {
    return request({
        url: '/record/findByFollowId',
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
export function addOrUpdate(followId,itemId,itemValue,opUserId) {
    return request({
        url: '/record/findByFollowId',
        method: 'post',
        params: { followId,itemId,itemValue,opUserId}
    })
}