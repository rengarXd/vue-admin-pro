import { request } from "@/utils/request"

 export const getLists = (params) => {
     return request('/api-train/tip/rest/tn/cs/cf/list', 'list', params)
 }

export const insert = (params) => request('/api-train/tip/rest/tn/cs/cf/insert', 'insert', params)
export const update = (params) => request('/api-train/tip/rest/tn/cs/cf/update', 'update', params)
export const deletor = (params) => request('/api-train/tip/rest/tn/cs/cf/delete', 'delete', params)
export const searchSelector = (params) => {return request('/api-train/tip/rest/tn/cs/cf/searchSelector', 'searchSelector', params)}
export const get = (params) => {return request('/api-train/tip/rest/tn/cs/cf/get', 'get', params)}
