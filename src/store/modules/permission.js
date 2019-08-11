import { constantRoutes } from '@/router'
import Layout from '@/layout'

/**
 * 获取权限路由
 * @param roles 原始路由
 * @param route 后台返回配置路由
 */
// function getRightRoute(roles, route) {
//     let arry1 = roles;
//     let arry2 = route;
//     let arry3 = new Array();

//     let j = 0;

//     for (let i = 0; i < arry1.length; i++) {
//         for (let k = 0; k < arry2.length; k++) {
//             if (arry1[i].path == arry2[k].path) {
//                 arry3[j] = arry1[i];
//                 ++j;
//                 if(arry2[k].children) getRightRoute(roles, route)
//             }
//         }
//     }
//     return arry3;
// }
function getRightRoute(route) {
    let res = []
    route.forEach(item => {
        let { path, redirect, children, component, meta, hidden } = item;
        let obj = { path, hidden, redirect: redirect || null, meta, component: component === 'Layout' ? Layout : () => import(`@/${component}.vue`) }
        if (meta) {
            obj = { path, hidden, redirect: redirect || null, meta, component: component === 'Layout' ? Layout : () => import(`@/${component}.vue`) }
        }
        if (children) {
            obj.children = getRightRoute(children)
        }
        res.push(obj)
    })
    return res
}

const state = {
    routes: [],
    addRoutes: []
}

const mutations = {
    SET_ROUTES: (state, routes) => {
        state.addRoutes = routes
        state.routes = constantRoutes.concat(routes)
    }
}

const actions = {
    generateRoutes({ commit }, routes) {
        return new Promise(resolve => {
            let accessedRoutes = getRightRoute(routes)
            // console.log(accessedRoutes)
            commit('SET_ROUTES', accessedRoutes)
            resolve(accessedRoutes)
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
