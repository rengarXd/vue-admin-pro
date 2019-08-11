import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import md5 from 'js-md5';

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  domainName: '',
  account: '',
  description: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_domainName: (state, domainName) => {
    state.domainName = domainName
  },
  SET_ACCOUNT: (state, account) => {
    state.account = account
  },
  SET_DESCRIPTION(state, description) {
    state.description = description
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, domain } = userInfo
    return new Promise((resolve, reject) => {
      login({ userAccount: username.trim(), pwd: md5(md5(password)), domainCode: domain.trim() }).then(res => {
        // console.log(res)
        commit('SET_TOKEN', res.token)
        setToken(res.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // console.log('用户信息')
      getInfo(state.token).then(response => {
        if (!response) {
          reject('验证失败，请重新登录！')
        }
        const { userName, domainName, userAccount, title } = response
        commit('SET_NAME', userName)
        commit('SET_ACCOUNT', userAccount)
        commit('SET_domainName', domainName)
        commit('SET_DESCRIPTION', title)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout({ token: state.token }).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ACCOUNT', '')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resetRouter()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

