import { request } from "@/utils/request"
export const getLists = (params) => {
    return request('/api-train/tip/rest/tn/courses/findScheduleProgressByPage', 'findScheduleProgressByPage', params)
}