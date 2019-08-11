import { request } from "@/utils/request"

 export const getLists = (params) => {
     return request('/api-train/tip/rest/tn/cs/qu/list', 'list', params)
 }

export const insert = (params) => request('/api-train/tip/rest/tn/cs/qu/insert', 'insert', params)
export const update = (params) => request('/api-train/tip/rest/tn/cs/qu/update', 'update', params)
export const deletor = (params) => request('/api-train/tip/rest/tn/cs/qu/delete', 'delete', params)
export const searchSelector = (params) => {return request('/api-train/tip/rest/tn/cs/qu/searchSelector', 'searchSelector', params)}
export const get = (params) => {return request('/api-train/tip/rest/tn/cs/qu/get', 'get', params)}
