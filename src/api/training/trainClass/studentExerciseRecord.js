import { request } from "@/utils/request"
export const getLists = (params) => {
    return request('/api-train/tip/rest/tn/exerciserecord/list', 'list', params)
}
export const questionSelector= (params) => request('/api-train/tip/rest/tn/exerciserecord/questionSelector', 'questionSelector', params)