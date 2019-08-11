import Cookies from 'js-cookie'

const TokenKey = 'vue_admin__token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
// App
const sidebarStatusKey = 'sidebar_status'
export const getSidebarStatus = () => Cookies.get(sidebarStatusKey)
export const setSidebarStatus = (sidebarStatus) => Cookies.set(sidebarStatusKey, sidebarStatus)

const languageKey = 'language'
export const getLanguage = () => Cookies.get(languageKey)
export const setLanguage = (language) => Cookies.set(languageKey, language)

const sizeKey = 'size'
export const getSize = () => Cookies.get(sizeKey)
export const setSize = (size) => Cookies.set(sizeKey, size)