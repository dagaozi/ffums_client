/*
 * @Description:
 * @Author: lxc
 * @Date: 2020-05-20 11:10:03
 * @LastEditTime: 2020-05-20 11:10:57
 * @LastEditors: lxc
 */
const state = {
  selectCategory: {}
}

const mutations = {
  setSelectCategory: (state, selectCategory) => {
    state.selectCategory = selectCategory
  }
}

const actions = {
  setSelectCategory({ commit }, selectCategory) {
    commit('setSelectCategory', selectCategory)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
