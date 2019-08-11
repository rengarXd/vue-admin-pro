import { request } from "@/utils/request"
export const getLists = (params) => {
    return request('/api-train/tip/rest/tn/courses/list', 'list', params)
}
export const coursesItemSelector= (params) => request('/api-train/tip/rest/tn/courses/coursesItemSelector', 'coursesItemSelector', params)
