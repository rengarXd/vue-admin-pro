import { request } from "@/utils/request"

 export const getLists = (params) => {
     return request('/api-train/tip/rest/tn/tr/tce/list', 'list', params)
 }

export const insert = (params) => request('/api-train/tip/rest/tn/tr/tce/insert', 'insert', params)
export const update = (params) => request('/api-train/tip/rest/tn/tr/tce/update', 'update', params)
export const deletor = (params) => request('/api-train/tip/rest/tn/tr/tce/delete', 'delete', params)
export const searchSelector = (params) => {return request('/api-train/tip/rest/tn/tr/tce/searchSelector', 'searchSelector', params)}
export const get = (params) => {return request('/api-train/tip/rest/tn/tr/tce/get', 'get', params)}
