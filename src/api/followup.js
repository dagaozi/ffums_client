import request from '@/utils/request'


/**
 * 根据病人获取随访记录
 * @param {*} id 
 */
export function getByPatientId(id) {
    return request({
        url: '/followup/getByPatientId',
        method: 'get',
        params: { id }
    })
}


/**
 * 添加随访记录
 * @param {*} data 
 */
export function addFollowUp(data) {
    return request({
        url: '/followup/getByPatientId',
        method: 'get',
        data
    })
}

