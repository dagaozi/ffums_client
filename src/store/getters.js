/*
 * @Description:
 * @Author: lxc
 * @Date: 2020-06-06 23:31:11
 * @LastEditTime: 2020-06-11 22:44:29
 * @LastEditors: lxc
 */
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  patientinfo: state => state.patient.info,
  category: state => state.category.selectCategory,
  level: state => state.user.level
}
export default getters
