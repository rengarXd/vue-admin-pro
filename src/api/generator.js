import { requestDownload,request } from "@/utils/request"

export const getLists = (params) => {
    return request('/api-admin/tip/rest/generate/list', 'list', params)
}
export const generatorCode = (params) =>
//  request()
{
   
return request('/api-admin/tip/rest/generate/code', 'code', params);
}