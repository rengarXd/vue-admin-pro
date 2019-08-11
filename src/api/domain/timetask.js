import { request } from "@/utils/request"
export const getLists = (params) => {
    return request('/api-admin/tip/rest/timeTask/list', 'list', params)
}
export const deletor = (params) => request('/api-admin/tip/rest/timeTask/delete', 'delete', params)
export const insert = (params) => request('/api-admin/tip/rest/timeTask/insert', 'insert', params)
export const update = (params) => request('/api-admin/tip/rest/timeTask/update', 'update', params)
