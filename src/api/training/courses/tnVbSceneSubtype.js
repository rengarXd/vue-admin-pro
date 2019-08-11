import { request } from "@/utils/request"

 export const getLists = (params) => {
     return request('/api-train/tip/rest/tn/vb/sub/list', 'list', params)
 }

export const insert = (params) => request('/api-train/tip/rest/tn/vb/sub/insert', 'insert', params)
export const update = (params) => request('/api-train/tip/rest/tn/vb/sub/update', 'update', params)
export const deletor = (params) => request('/api-train/tip/rest/tn/vb/sub/delete', 'delete', params)
export const searchSelector = (params) => {return request('/api-train/tip/rest/tn/vb/sub/searchSelector', 'searchSelector', params)}
export const get = (params) => {return request('/api-train/tip/rest/tn/vb/sub/get', 'get', params)}
