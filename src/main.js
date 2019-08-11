import Vue from 'vue'

import { getSize } from '@/utils/auth'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import '@/styles/element-variables.scss'
import '@/styles/index.scss' // global css
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import App from './App'
import store from './store'
import router from './router'
import components from './components'

import ErrorPlugin from '@/utils/errorPlugin'
Vue.use(ErrorPlugin)

import '@/icons' // icon
import '@/permission' // permission control
import '@/pwa/register-service-worker'

import * as filters from './filters' // global filters

// set ElementUI lang to EN
Vue.use(ElementUI, {
  size: getSize() || 'medium', // set element-ui default size
  locale
  // i18n: (key: string, value: string) => i18n.t(key, value)
})

Vue.use(components);
// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
