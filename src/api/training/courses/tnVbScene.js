import { request } from "@/utils/request"

 export const getLists = (params) => {
     return request('/api-train/tip/rest/tn/vb/sc/list', 'list', params)
 }

export const insert = (params) => request('/api-train/tip/rest/tn/vb/sc/insert', 'insert', params)
export const update = (params) => request('/api-train/tip/rest/tn/vb/sc/update', 'update', params)
export const deletor = (params) => request('/api-train/tip/rest/tn/vb/sc/delete', 'delete', params)
export const searchSelector = (params) => {return request('/api-train/tip/rest/tn/vb/sc/searchSelector', 'searchSelector', params)}
export const get = (params) => {return request('/api-train/tip/rest/tn/vb/sc/get', 'get', params)}
export const getSceneVerbals = (params) => {return request('/api-train/tip/rest/tn/vb/sc/getSceneVerbals', 'getSceneVerbals', params)}
export const setSceneVerbals = (params) => {return request('/api-train/tip/rest/tn/vb/sc/setSceneVerbals', 'setSceneVerbals', params)}
export const removeSceneVerbals = (params) => {return request('/api-train/tip/rest/tn/vb/sc/removeSceneVerbals', 'removeSceneVerbals', params)}
