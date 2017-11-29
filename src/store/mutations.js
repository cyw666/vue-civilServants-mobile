import {
  GET_USERINFO,
} from './mutation-types.js'

export default {
	// 获取用户信息
	[GET_USERINFO](state, userInfo) {
		state.userInfo = userInfo;
	},
}
