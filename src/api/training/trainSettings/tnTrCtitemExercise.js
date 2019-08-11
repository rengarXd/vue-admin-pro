import { request } from "@/utils/request"

 export const getLists = (params) => {
     return request('/api-train/tip/rest/tn/tr/tcex/list', 'list', params)
 }

export const insert = (params) => request('/api-train/tip/rest/tn/tr/tcex/insert', 'insert', params)
export const update = (params) => request('/api-train/tip/rest/tn/tr/tcex/update', 'update', params)
export const deletor = (params) => request('/api-train/tip/rest/tn/tr/tcex/delete', 'delete', params)
export const searchSelector = (params) => {return request('/api-train/tip/rest/tn/tr/tcex/searchSelector', 'searchSelector', params)}
export const get = (params) => {return request('/api-train/tip/rest/tn/tr/tcex/get', 'get', params)}
