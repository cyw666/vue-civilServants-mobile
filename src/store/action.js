import {
  GetUserInfo
} from '../service/getData'
import {
	GET_USERINFO,
} from './mutation-types.js'

export default {
	async getUserInformation({state,commit} ,data) {
		let userInfor = await GetUserInfo(data);
    commit(GET_USERINFO, userInfor.data)
	},
}
