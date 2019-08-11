import { request } from "@/utils/request"
export const getLists = (params) => {
    return request('/api-train/tip/rest/tn/tc/list', 'list', params)
}
export const deletor = (params) => request('/api-train/tip/rest/tn/tc/delete', 'delete', params)
export const insert = (params) => request('/api-train/tip/rest/tn/tc/insert', 'insert', params)
export const update = (params) => request('/api-train/tip/rest/tn/tc/update', 'update', params)
export const positionSelector= (params) => request('/api-admin/tip/rest/tn/tc/positionSelector', 'positionSelector', params)