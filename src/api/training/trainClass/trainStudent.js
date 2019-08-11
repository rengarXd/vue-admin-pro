import { request } from "@/utils/request"
export const getLists = (params) => {
    return request('/api-train/tip/rest/tn/tcs/list', 'list', params)
}
export const deletor = (params) => request('/api-train/tip/rest/tn/tcs/delete', 'delete', params)
export const insert = (params) => request('/api-train/tip/rest/tn/tcs/insert', 'insert', params)
export const update = (params) => request('/api-train/tip/rest/tn/tcs/update', 'update', params)
export const studentSelector = (params) => request('/api-train/tip/rest/tn/tcs/studentSelector', 'studentSelector', params)