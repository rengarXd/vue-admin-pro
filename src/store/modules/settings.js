import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'

const { showSettings, tagsView, fixedHeader, sidebarLogo,title } = defaultSettings


export default {
  namespaced: true,
  state: {
    theme: variables.theme,
    showSettings: showSettings,
    tagsView: tagsView,
    fixedHeader: fixedHeader,
    sidebarLogo: sidebarLogo,
    title
  },
  mutations: {
    CHANGE_SETTING: (state, { key, value }) => {
      if (state.hasOwnProperty(key)) {
        state[key] = value
      }
    }
  },
  actions: {
    changeSetting({ commit }, data) {
      commit('CHANGE_SETTING', data)
    }
  }
}

