import _vue from 'vue'
import store from '@/store'
import { isString, isArray } from '@/utils/validate'
import settings from '@/settings'

// 你可以在settings.js中这样设置
// errorLog:'production' | ['production', 'development']
const { errorLog: needErrorLog } = settings

function checkNeed() {
    const env = process.env.NODE_ENV
    if (isString(needErrorLog)) {
        return env === needErrorLog
    }
    if (isArray(needErrorLog)) {
        return needErrorLog.includes(env)
    }
    return false
}
/**
 * 全局异常处理
 * @param {
    * } error 
    * @param {*} vm 
    */
const errorHandler = (err, vm, info, a) => {
    // console.error('抛出全局异常')
    // console.error(vm)
    // console.error(error)
    // console.error(info)
    // _vue.nextTick(() => {

    // })
    _vue.nextTick(() => {
        store.dispatch('errorLog/addErrorLog', {
            err,
            vm,
            info,
            url: window.location.href
        })
        console.error(err, info)
    })
}
let GlobalError = {
    install: (Vue, options) => {
        /**
         * 全局异常处理
         * @param {
         * } error 
         * @param {*} vm 
         */
        if (checkNeed()) Vue.config.errorHandler = errorHandler
        Vue.mixin({
            beforeCreate() {
                const methods = this.$options.methods || {}
                Object.keys(methods).forEach(key => {
                    let fn = methods[key]
                    this.$options.methods[key] = function (...args) {
                        let ret = fn.apply(this, args)
                        if (ret && typeof ret.then === 'function' && typeof ret.catch === "function") {
                            return ret.catch(errorHandler)
                        } else { // 默认错误处理
                            return ret
                        }
                    }
                })
            }
        })
        Vue.prototype.$throw = errorHandler
    }
}
export default GlobalError
