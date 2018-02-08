import {
  GetUserInfo
} from '../service/getData'
import { userAgent } from '../plugins/utils'
import {
  GET_USERINFO,
  GET_USERAGENT,
} from './mutation-types.js'

export default {
  async getUserInformation ({state, commit}, payload) {
    let data = await GetUserInfo(payload)
    if (data.Type == 1) {
      commit(GET_USERINFO, data.Data)
    } else if (data.Type != 401) {
      alert(data.Message)
    }
  },
  getUserAgent ({state, commit}, payload) {
    let data = userAgent()
    commit(GET_USERAGENT, data)
  }
}
