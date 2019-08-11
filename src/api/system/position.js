import { request } from "@/utils/request"
export const getLists = (params) => {
    return request('/api-admin/tip/rest/position/list', 'list', params)
}
export const deletor = (params) => request('/api-admin/tip/rest/position/delete', 'delete', params)
export const insert = (params) => request('/api-admin/tip/rest/position/insert', 'insert', params)
export const update = (params) => request('/api-admin/tip/rest/position/update', 'update', params)
export const positionSelector= (params) => request('/api-admin/tip/rest/position/positionSelector', 'positionSelector', params)
