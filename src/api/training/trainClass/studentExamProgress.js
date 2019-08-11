import { request } from "@/utils/request"
export const getLists = (params) => {
    return request('/api-train/tip/rest/tn/examprogress/list', 'list', params)
}
export const coursesDaySelector = (params) => {return request('/api-train/tip/rest/tn/examprogress/coursesDaySelector', 'coursesDaySelector', params)}