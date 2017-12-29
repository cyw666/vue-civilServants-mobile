/**
 * ajax请求
 */
'use strict'
import {Toast} from 'mint-ui'
import axios from 'axios'
import qs from 'qs'
import {getStore} from '../plugins/utils'

// axios.defaults.baseURL = 'http://test10.jy365.net';
axios.defaults.timeout = 10000;
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
//拦截器
axios.interceptors.request.use(config => {
  // 将aspxauth添加到请求头
  let aspxauth = localStorage.getItem('ASPXAUTH');
  if (aspxauth) {
    config.headers.ASPXAUTH = aspxauth;
  }
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})

function checkStatus(response) {
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    // console.log(response);
    //用户掉线
    if (response.data.Type == 401) {
      Toast({message: "账号掉线，请重新登录", position: 'bottom'});
      var currentUrl = getStore("currentUrl");
      window.localStorage.removeItem('ASPXAUTH');
      if (getStore("userAgent").weixin) {
        window.location = getStore("URL");
      } else if (getStore("userAgent").mobile) {
        var loginUrl = "/#/login?currentUrl=" + encodeURIComponent(currentUrl);
        window.location.href = loginUrl;
      }
    }
    //存储aspxauth身份验证
    if (response.headers.aspxauth) {
      window.localStorage.setItem('ASPXAUTH', response.headers.aspxauth);
    }
    // 如果不需要除了data之外的数据，可以直接 return response.data
    return response.data
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常：' + response.data.Message
  }
}

function checkCode(res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === -404) {
    console.log(res.msg)
  }
  return res
}

export default {
  post(url, data) {
    return axios({
      method: 'post',
      url,
      data: qs.stringify(data),
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  get(url, params) {
    return axios({
      method: 'get',
      url,
      params
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  }
}
