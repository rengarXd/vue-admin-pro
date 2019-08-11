import { request } from "@/utils/request"
export const getLists = (params) => {
    return request('/api-train/tip/rest/tn/exerciseprogress/list', 'list', params)
}