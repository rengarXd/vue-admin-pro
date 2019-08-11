import { request } from "@/utils/request"
// import request from "@/utils/request";

export const getLists = (params) => {
    return request('/api-admin/tip/rest/dm/list', 'list', params)
}

export const insert = (params) => request('/api-admin/tip/rest/dm/insert', 'insert', params)
export const update = (params) => request('/api-admin/tip/rest/dm/update', 'update', params)