import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [{
  //     path: 'dashboard',
  //     name: 'Dashboard',
  //     component: () => import('@/views/dashboard/index'),
  //     meta: { title: 'Dashboard', icon: 'dashboard' }
  //   }]
  // },
  // {
  //   path: '/home',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://baidu.com',
  //       meta: { title: '患者列表', icon: 'peoples' }
  //     }
  //   ]
  // },
  {
    path: '/',
    component: Layout,
    redirect: '/list',
    meta: { title: '患者', icon: 'people' },
    children: [
      {
        path: 'list',
        name: 'PatientList',
        component: () => import('@/views/patientlist/index'),
        meta: { title: '患者列表', icon: 'people' }
      },
      {
        path: 'info',
        name: 'PatientInfo',
        component: () => import('@/views/patient/index'),
        meta: { title: '患者信息', icon: 'people' }
      }
    ]
  },
  {
    path: '/followup',
    component: Layout,
    redirect: '/followup',
    children: [
      {
        path: 'followup',
        name: 'Followup',
        component: () => import('@/views/followup/index'),
        meta: { title: '随访管理', icon: 'example' }
      }
    ]
  },

  {
    path: '/dataindex',
    component: Layout,
    redirect: '/dataindex/table',
    name: 'Example',
    meta: { title: '指标管理', icon: 'dataindex' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '实验室指标', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '特检指标', icon: 'tree' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '人体成分', icon: 'tree' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '其他信息', icon: 'tree' }
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '标本管理', icon: 'form' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: '系统设置',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: '指标维护' }
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: '用户管理' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
