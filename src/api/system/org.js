import { request } from "@/utils/request"

// export const getLists = (params) => {
//     return request('/api-admin/tip/rest/sysorg/list', 'list', params)
// }

export const insert = (params) => request('/api-admin/tip/rest/sysorg/insert', 'insert', params)
export const update = (params) => request('/api-admin/tip/rest/sysorg/update', 'update', params)
export const deletor = (params) => request('/api-admin/tip/rest/sysorg/delete', 'delete', params)
export const treeOrg = (params) => request('/api-admin/tip/rest/sysorg/treeOrgs', 'treeMenu', params)
export const searchSelector = (params) => {return request('/api-admin/tip/rest/sysorg/searchSelector', 'searchSelector', params)}
export const insertOrgType = (params) => request('/api-admin/tip/rest/sysorg/insertOrgType', 'insertOrgType', params)
export const updateOrgType = (params) => request('/api-admin/tip/rest/sysorg/updateOrgType', 'updateOrgType', params)
export const deleteOrgType = (params) => request('/api-admin/tip/rest/sysorg/deleteOrgType', 'deleteOrgType', params)
export const treeOrgtypes = (params) => request('/api-admin/tip/rest/sysorg/treeOrgtypes', 'treeOrgtypes', params)
export const areaTrees = (params) => request('/api-admin/tip/rest/areas/treeProvince', 'treeProvince', params)
