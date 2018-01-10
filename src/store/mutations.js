import {
  GET_USERINFO,
  GET_USERAGENT,
} from './mutation-types.js'

export default {
  // 获取用户信息
  [GET_USERINFO](state, userInfo) {
    state.userInfo = userInfo;
  },
  // 获取userAgent
  [GET_USERAGENT](state, userAgent) {
    state.userAgent = userAgent;
  },
}
