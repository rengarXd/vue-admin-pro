// import request from '@/utils/request'
import { request } from "@/utils/request"

export function insert(data) {
  return request('/api-admin/tip/rest/user/insert', 'insert', data)
}

export function update(data) {
  return request('/api-admin/tip/rest/user/update', 'update', data)
}

export function del(userId) {
  return request('/api-admin/tip/rest/user/delete', 'delete', { userId })
}

export function list(data) {
  return request('/api-admin/tip/rest/user/list', 'list', data)
}
// 重置密码
export function resetPwd(data) {
  return request('/api-admin/tip/rest/user/resetPwd', 'resetPwd', data)
}
// 修改密码
export function changePwd(data) {
  return request('/api-admin/tip/rest/user/changePwd', 'changePwd', data)
}

export function getUserRoles(userId, notIn) {
  return request('/api-admin/tip/rest/user/getUserRoles', 'getUserRoles', { userId, notIn })
}

export function addUserRoles(userId, roleIds) {
  return request('/api-admin/tip/rest/user/addUserRoles', 'addUserRoles', { userId, roleIds: roleIds.join() })
}