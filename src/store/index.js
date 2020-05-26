/*
 * @Description:
 * @Author: lxc
 * @Date: 2020-05-06 20:11:06
 * @LastEditTime: 2020-05-20 11:11:19
 * @LastEditors: lxc
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import patient from './modules/patient'
import category from './modules/category'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    patient,
    category
  },
  getters,
  plugins: [createPersistedState()]
})

export default store
