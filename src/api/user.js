// import request from '@/utils/request'
import { request } from "@/utils/request"
// import {requestMock} from "@/utils/request"
// export function login(data) {
//   return request('/api-auth/tip/rest/auth/login', 'login', data)
// }
export function login(data) {
  return request('/api-auth/tip/rest/auth/login', 'login', data)
}

export function getInfo(token) {
  return request('api-auth/tip/rest/auth/getUserInfo', 'getUserInfo', { token })
}

export function logout(data) {
  return request('/api-auth/tip/rest/auth/logout', 'logout', data)
}
