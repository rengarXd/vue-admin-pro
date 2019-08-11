import { request } from "@/utils/request"

 export const getLists = (params) => {
     return request('/api-train/tip/rest/tn/tr/et/list', 'list', params)
 }

export const insert = (params) => request('/api-train/tip/rest/tn/tr/et/insert', 'insert', params)
export const update = (params) => request('/api-train/tip/rest/tn/tr/et/update', 'update', params)
export const deletor = (params) => request('/api-train/tip/rest/tn/tr/et/delete', 'delete', params)
export const searchSelector = (params) => {return request('/api-train/tip/rest/tn/tr/et/searchSelector', 'searchSelector', params)}
export const get = (params) => {return request('/api-train/tip/rest/tn/tr/et/get', 'get', params)}
