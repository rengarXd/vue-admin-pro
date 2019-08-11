import { request } from "@/utils/request"

 export const getLists = (params) => {
     return request('/api-train/tip/rest/tn/vb/sl/list', 'list', params)
 }

export const insert = (params) => request('/api-train/tip/rest/tn/vb/sl/insert', 'insert', params)
export const update = (params) => request('/api-train/tip/rest/tn/vb/sl/update', 'update', params)
export const deletor = (params) => request('/api-train/tip/rest/tn/vb/sl/delete', 'delete', params)
export const searchSelector = (params) => {return request('/api-train/tip/rest/tn/vb/sl/searchSelector', 'searchSelector', params)}
export const get = (params) => {return request('/api-train/tip/rest/tn/vb/sl/get', 'get', params)}
