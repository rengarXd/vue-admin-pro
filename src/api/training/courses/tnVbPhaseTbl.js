import { request } from "@/utils/request"

 export const getLists = (params) => {
     return request('/api-train/tip/rest/tn/vb/ph/list', 'list', params)
 }

export const insert = (params) => request('/api-train/tip/rest/tn/vb/ph/insert', 'insert', params)
export const update = (params) => request('/api-train/tip/rest/tn/vb/ph/update', 'update', params)
export const deletor = (params) => request('/api-train/tip/rest/tn/vb/ph/delete', 'delete', params)
export const searchSelector = (params) => {return request('/api-train/tip/rest/tn/vb/ph/searchSelector', 'searchSelector', params)}
export const get = (params) => {return request('/api-train/tip/rest/tn/vb/ph/get', 'get', params)}
