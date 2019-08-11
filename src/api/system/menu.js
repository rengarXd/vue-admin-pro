import { request } from "@/utils/request"

export const getLists = (params) => {
    return request('/api-admin/tip/rest/dmenu/list', 'list', params)
}

export const insert = (params) => request('/api-admin/tip/rest/dmenu/insert', 'insert', params)
export const update = (params) => request('/api-admin/tip/rest/dmenu/update', 'update', params)
export const deletor = (params) => request('/api-admin/tip/rest/dmenu/delete', 'delete', params)
export const treeMenu = (params) => request('/api-admin/tip/rest/dmenu/treeMenu', 'treeMenu', params)
export const domainTreeMenu = (params) => request('/api-admin/tip/rest/dmenu/domainTreeMenu', 'domainTreeMenu', params)
export const searchSelector = (params) => {return request('/api-admin/tip/rest/dmenu/searchSelector', 'searchSelector', params)}
