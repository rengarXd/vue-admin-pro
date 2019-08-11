import { request } from "@/utils/request"

 export const getLists = (params) => {
     return request('/api-train/tip/rest/tn/tr/tcl/list', 'list', params)
 }

export const insert = (params) => request('/api-train/tip/rest/tn/tr/tcl/insert', 'insert', params)
export const update = (params) => request('/api-train/tip/rest/tn/tr/tcl/update', 'update', params)
export const deletor = (params) => request('/api-train/tip/rest/tn/tr/tcl/delete', 'delete', params)
export const searchSelector = (params) => {return request('/api-train/tip/rest/tn/tr/tcl/searchSelector', 'searchSelector', params)}
export const get = (params) => {return request('/api-train/tip/rest/tn/tr/tcl/get', 'get', params)}
