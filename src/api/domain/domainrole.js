import { request } from "@/utils/request"

export const getLists = (params) => {
    return request('/api-admin/tip/rest/dmrole/list', 'list', params)
}

export const insert = (params) => request('/api-admin/tip/rest/dmrole/insert', 'insert', params)
export const update = (params) => request('/api-admin/tip/rest/dmrole/update', 'update', params)
export const deletor = (params) => request('/api-admin/tip/rest/dmrole/delete', 'delete', params)
export const treeMenu = (params) => request('/api-admin/tip/rest/dmrole/treeMenu', 'treeMenu', params)
export const searchSelector = (params) => {return request('/api-admin/tip/rest/dmrole/searchSelector', 'searchSelector', params)}
export const getRoleMenus = (params) => {return request('/api-admin/tip/rest/dmrole/getRoleMenus', 'getRoleMenus', params)}
export const setRoleMenus = (params) => {return request('/api-admin/tip/rest/dmrole/setRoleMenus', 'setRoleMenus', params)}
export const setDomainRoles = (params) => {return request('/api-admin/tip/rest/dmrole/setDomainRoles', 'setDomainRoles', params)}
export const getDomainRoles = (params) => {return request('/api-admin/tip/rest/dmrole/getDomainRoles', 'getDomainRoles', params)}
