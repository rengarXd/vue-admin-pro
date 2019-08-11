import {request} from '@/utils/request'
export const getLists = (params) => {
  return request('/api-admin/tip/rest/person/list', 'list', params)
}
export const insert = (params) => request('/api-admin/tip/rest/person/insert', 'insert', params)
export const update = (params) => request('/api-admin/tip/rest/person/update', 'update', params)
export const deletor = (params) => request('/api-admin/tip/rest/person/delete', 'delete', params)
export const personSelector = (params) => request('/api-admin/tip/rest/person/personSelector', 'personSelector', params)