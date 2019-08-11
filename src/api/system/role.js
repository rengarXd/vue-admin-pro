import {request} from '@/utils/request'

export function getRoutes() {
  return request({
    url: '/routes',
    method: 'get'
  })
}

export function getRoles() {
  return request({
    url: '/roles',
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: '/role',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    url: `/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/role/${id}`,
    method: 'delete'
  })
}


export const getLists = (params) => {
  return request('/api-admin/tip/rest/sysrole/list', 'list', params)
}
export const insert = (params) => request('/api-admin/tip/rest/sysrole/insert', 'insert', params)
export const update = (params) => request('/api-admin/tip/rest/sysrole/update', 'update', params)
export const deletor = (params) => request('/api-admin/tip/rest/sysrole/delete', 'delete', params)
export const getRoleMenus = (params) => {return request('/api-admin/tip/rest/sysrole/getRoleMenus', 'getRoleMenus', params)}
export const setRoleMenus = (params) => {return request('/api-admin/tip/rest/sysrole/setRoleMenus', 'setRoleMenus', params)}