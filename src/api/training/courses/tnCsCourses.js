import { request } from "@/utils/request"

 export const getLists = (params) => {
     return request('/api-train/tip/rest/tn/cs/cs/list', 'list', params)
 }

export const insert = (params) => request('/api-train/tip/rest/tn/cs/cs/insert', 'insert', params)
export const update = (params) => request('/api-train/tip/rest/tn/cs/cs/update', 'update', params)
export const deletor = (params) => request('/api-train/tip/rest/tn/cs/cs/delete', 'delete', params)
export const searchSelector = (params) => {return request('/api-train/tip/rest/tn/cs/cs/searchSelector', 'searchSelector', params)}
export const getTree = (params) => {return request('/api-train/tip/rest/tn/cs/cs/tree', 'tree', params)}
