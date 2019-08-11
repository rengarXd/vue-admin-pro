import { request } from "@/utils/request"
export const getLists = (params) => {
    return request('/api-admin/tip/rest/areas/list', 'list', params)
}
export const deletor = (params) => request('/api-admin/tip/rest/areas/delete', 'delete', params)
export const insert = (params) => request('/api-admin/tip/rest/areas/insert', 'insert', params)
export const update = (params) => request('/api-admin/tip/rest/areas/update', 'update', params)
