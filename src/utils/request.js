import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
// import router from '@/router'

const timeout = 10000
// 创建AXIOS实例
const service = axios.create({
  baseURL: globals.SERVER_URL, // url = base url + request url
  // withCredentials: true, // 跨域请求时发送cookie
  timeout // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      // 让每个请求携带令牌
      // ['token']是自定义头密钥
      config.headers['token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * 通过自定义代码确定请求状态
   * 您还可以通过HTTP状态代码判断状态
   */
  response => {
    const res = response.data
    // 如果status状态不是0，则判断为错误。
    if (res.status !== "0") {
      if (res.errCode === "10000" || res.errCode === "10005") {
        // to re-login
        MessageBox.confirm('您已注销，可以取消以留在此页，或重新登录。', '注销确认', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      // else if (res.errCode === "20001" || res.errCode === "20002" || res.errCode === "20003" || res.errCode === "10001" || res.errCode === "10002" || res.errCode === "10003" || res.errCode === "10004" || res.errCode === "10006") 
      else if (res.errMsg) {
        Message.error(res.errMsg)
      }
      else {
        MessageBox.alert(JSON.stringify(res) || 'Error', '服务器返回错误')
      }
      return Promise.reject(res)
    } else {
      return res
    }
  },
  error => {
    // console.error('请求错误===》' + JSON.stringify(error.response)) // for debug
    if (error.response && error.response.status === 404) {
      if (error.response.data.path) {
        Message.error('未找到对应方法===>  ' + error.response.data.path)
      } else {
        MessageBox.alert(JSON.stringify(error.response.data), '错误信息')
      }
    } else {
      Message({
        message: error,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
export const request = (url, param, data) => {
  let datas = new FormData();
  datas.append('requestParams', JSON.stringify({
    "service": param, "version": "1.0", "source": "10", request: data
  }));
  return service({
    url,
    method: 'post',
    data: datas
  }).then(res => res.response).catch((err) => {
    throw new Error(JSON.stringify(err) || 'Error')
  })
}

export const requestMock = (url, param, data) => {
  return service({
    url,
    method: 'post',
    data: {
      requestParams: {
        "service": param, "version": "1.0", "source": "10", request: data
      }
    }
  }).then(res => res.response)
}