// import Cookies from 'js-cookie'
import { getSidebarStatus, getSize, setSidebarStatus, setSize } from '@/utils/auth'
const state = {
  sidebar: {
    // opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    opened: getSidebarStatus() !== 'closed',
    withoutAnimation: false
  },
  /**
 * @type {string}
 * @description 设备
 */
  device: 'desktop',
  /**
   * @type {string}
   * @description 尺寸
   */
  size: getSize() || 'small',
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      // Cookies.set('sidebarStatus', 1)
      setSidebarStatus('opened')
    } else {
      // Cookies.set('sidebarStatus', 0)
      setSidebarStatus('closed')
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    // Cookies.set('sidebarStatus', 0)
    setSidebarStatus('closed')
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_SIZE: (state, size) => {
    state.size = size
    setSize(size)
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  SetSize({ commit }, size) {
    commit('SET_SIZE', size)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
