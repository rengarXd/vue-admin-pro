import { request } from "@/utils/request"

 export const getLists = (params) => {
     return request('/api-train/tip/rest/tn/cs/cn/list', 'list', params)
 }

export const insert = (params) => request('/api-train/tip/rest/tn/cs/cn/insert', 'insert', params)
export const update = (params) => request('/api-train/tip/rest/tn/cs/cn/update', 'update', params)
export const deletor = (params) => request('/api-train/tip/rest/tn/cs/cn/delete', 'delete', params)
export const searchSelector = (params) => {return request('/api-train/tip/rest/tn/cs/cn/searchSelector', 'searchSelector', params)}
export const get = (params) => {return request('/api-train/tip/rest/tn/cs/cn/get', 'get', params)}
