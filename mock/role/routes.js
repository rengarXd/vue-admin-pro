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

  {
    path: '/',
    component: 'layout/Layout',
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  // {
  //   path: '/usermanager',
  //   component: 'layout/Layout',
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Usermanager',
  //       component: () => import('@/views/usermanager/index'),
  //       meta: { title: '用户管理', icon: 'form' }
  //     }
  //   ]
  // },
  {
    path: '/setting',
    component: 'layout/Layout',
    children: [
      {
        path: 'index',
        name: 'setting',
        component: () => import('@/views/setting/index'),
        meta: { title: '系统设置', icon: 'form' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
