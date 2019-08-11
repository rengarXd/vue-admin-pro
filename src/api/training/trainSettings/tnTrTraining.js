import { request } from "@/utils/request"

export const getLists = (params) => {
    return request('/api-train/tip/rest/tn/tr/main/list', 'list', params)
}

export const insert = (params) => request('/api-train/tip/rest/tn/tr/main/insert', 'insert', params)
export const update = (params) => request('/api-train/tip/rest/tn/tr/main/update', 'update', params)
export const deletor = (params) => request('/api-train/tip/rest/tn/tr/main/delete', 'delete', params)
export const searchSelector = (params) => {return request('/api-train/tip/rest/tn/tr/main/searchSelector', 'searchSelector', params)}
export const get = (params) => {return request('/api-train/tip/rest/tn/tr/main/get', 'get', params)}
export const getTcList = (params) => {return request('/api-train/tip/rest/tn/tr/main/getTcList', 'getTcList', params)}
export const addTc = (params) => {return request('/api-train/tip/rest/tn/tr/main/addTc', 'addTc', params)}
export const removeTc = (params) => {return request('/api-train/tip/rest/tn/tr/main/removeTc', 'removeTc', params)}

