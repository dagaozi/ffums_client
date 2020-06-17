/*
 * @Description:
 * @Author: lxc
 * @Date: 2020-06-06 23:31:11
 * @LastEditTime: 2020-06-17 16:12:50
 * @LastEditors: lxc
 */
import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  console.log('beforeEach to->', to, ' from->', from)
  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else if (to.path === '/all') {
      // next({ path: '/all' })
      if (store.getters.patientinfo && store.getters.patientinfo.id) {
        next()
      } else {
        next({ path: '/list' })
        Message.error('请先选择患者再点击信息录入')
        NProgress.done()
      }
    } else if (
      to.path === '/nested/menu1' ||
      to.path === '/nested/menu2' ||
      to.path === '/nested/menu3'
    ) {
      if (store.getters.level && store.getters.level === 9) {
        next()
      } else {
        next({ path: '/list' })
        Message.error('你暂无权限')
        NProgress.done()
      }
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info
          await store.dispatch('user/getInfo')
          next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
