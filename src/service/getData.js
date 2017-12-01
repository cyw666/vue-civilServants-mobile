import fetch from './fetch'
import Api from './api'

/**
 *判断用户是否存在
 */
export const CheckUserIsExit = (data) => fetch.post(Api.CheckUserIsExit.url, {...Api.CheckUserIsExit.data, ...data});

/**
 * 登陆
 */
export const Login = (data) => fetch.post(Api.Login.url, {...Api.Login.data, ...data});

/**
 * 用户信息
 */
export const GetUserInfo = (data) => fetch.post(Api.GetUserInfo.url, {...Api.GetUserInfo.data, ...data});

/**
 * 轮播
 */
export const GetLink = (data) => fetch.post(Api.GetLink.url, {...Api.GetLink.data, ...data});


/**
 * 课程列表
 */
export const GetCourseInfoList = (data) => fetch.post(Api.GetCourseInfoList.url, {...Api.GetCourseInfoList.data, ...data});

/**
 * 课程分类
 */
export const GetChannelInfoList = (data) => fetch.post(Api.GetChannelInfoList.url, {...Api.GetChannelInfoList.data, ...data});

/**
 * 考试分类
 */
export const GetExamType = (data) => fetch.post(Api.GetExamType.url, {...Api.GetExamType.data, ...data});

/**
 * 考试列表
 */
export const GetExamList = (data) => fetch.post(Api.GetExamList.url, {...Api.GetExamList.data, ...data});















