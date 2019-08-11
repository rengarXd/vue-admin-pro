import { request } from "@/utils/request"

 export const getLists = (params) => {
     return request('/api-train/tip/rest/tn/vb/ver/list', 'list', params)
 }

export const insert = (params) => request('/api-train/tip/rest/tn/vb/ver/insert', 'insert', params)
export const update = (params) => request('/api-train/tip/rest/tn/vb/ver/update', 'update', params)
export const deletor = (params) => request('/api-train/tip/rest/tn/vb/ver/delete', 'delete', params)
export const searchSelector = (params) => {return request('/api-train/tip/rest/tn/vb/ver/searchSelector', 'searchSelector', params)}
export const get = (params) => {return request('/api-train/tip/rest/tn/vb/ver/get', 'get', params)}
