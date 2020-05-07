/*
 * @Description:
 * @Author: lxc
 * @Date: 2020-05-07 08:51:59
 * @LastEditTime: 2020-05-07 09:07:18
 * @LastEditors: lxc
 */

const state = {
  info: {}
}

const mutations = {
  SET_INFO: (state, info) => {
    state.info = info
  }
}

const actions = {
  setInfo({ commit }, info) {
    commit('SET_INFO', info)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
