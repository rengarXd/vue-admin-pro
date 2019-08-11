import { request } from "@/utils/request"

 export const getLists = (params) => {
     return request('/api-train/tip/rest/tn/tr/tblitem/list', 'list', params)
 }

export const insert = (params) => request('/api-train/tip/rest/tn/tr/tblitem/insert', 'insert', params)
export const update = (params) => request('/api-train/tip/rest/tn/tr/tblitem/update', 'update', params)
export const deletor = (params) => request('/api-train/tip/rest/tn/tr/tblitem/delete', 'delete', params)
export const searchSelector = (params) => {return request('/api-train/tip/rest/tn/tr/tblitem/searchSelector', 'searchSelector', params)}
export const get = (params) => {return request('/api-train/tip/rest/tn/tr/tblitem/get', 'get', params)}
