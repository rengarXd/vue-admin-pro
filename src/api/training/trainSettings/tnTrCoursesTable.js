import { request } from "@/utils/request"

 export const getLists = (params) => {
     return request('/api-train/tip/rest/tn/tr/tbl/list', 'list', params)
 }

export const insert = (params) => request('/api-train/tip/rest/tn/tr/tbl/insert', 'insert', params)
export const update = (params) => request('/api-train/tip/rest/tn/tr/tbl/update', 'update', params)
export const deletor = (params) => request('/api-train/tip/rest/tn/tr/tbl/delete', 'delete', params)
export const searchSelector = (params) => {return request('/api-train/tip/rest/tn/tr/tbl/searchSelector', 'searchSelector', params)}
export const get = (params) => {return request('/api-train/tip/rest/tn/tr/tbl/get', 'get', params)}
