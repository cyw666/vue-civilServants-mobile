import {
  GetUserInfo
} from '../service/getData'
import {
	GET_USERINFO,
} from './mutation-types.js'

export default {
	async getUserInformation({state,commit} ,payload) {
		let data = await GetUserInfo(payload);
    if (data.Type == 1) {
      commit(GET_USERINFO, data.Data);
    } else if (data.Type != 401) {
      alert(data.Message);
    }
	},
}
