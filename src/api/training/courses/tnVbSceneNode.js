import { request } from "@/utils/request"

 export const getLists = (params) => {
     return request('/api-train/tip/rest/tn/vb/sn/list', 'list', params)
 }

export const insert = (params) => request('/api-train/tip/rest/tn/vb/sn/insert', 'insert', params)
export const update = (params) => request('/api-train/tip/rest/tn/vb/sn/update', 'update', params)
export const deletor = (params) => request('/api-train/tip/rest/tn/vb/sn/delete', 'delete', params)
export const searchSelector = (params) => {return request('/api-train/tip/rest/tn/vb/sn/searchSelector', 'searchSelector', params)}
export const get = (params) => {return request('/api-train/tip/rest/tn/vb/sn/get', 'get', params)}
