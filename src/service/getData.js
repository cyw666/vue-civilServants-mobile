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

/**
 * 获取考试题
 */
export const GetExam = (data) => fetch.post(Api.GetExam.url, {...Api.GetExam.data, ...data});

/**
 * 提交考试题
 */
export const UpdateUserExam = (data) => fetch.post(Api.UpdateUserExam.url, {...Api.UpdateUserExam.data, ...data});
/**
 * 退出登录
 */
export const LoginOut = (data) => fetch.post(Api.LoginOut.url, {...Api.LoginOut.data, ...data});

/**
 * 消息中心
 */
export const GetMessageCenter = (data) => fetch.post(Api.GetMessageCenter.url, {...Api.GetMessageCenter.data, ...data});

/**
 * 通知内容
 */
export const GetNoticeInfoContent = (data) => fetch.post(Api.GetNoticeInfoContent.url+'/'+data.Id, {...Api.GetNoticeInfoContent.data, ...data});

/**
 * 课程详情
 */
export const GetCourseDetail = (data) => fetch.post(Api.GetCourseDetail.url, {...Api.GetCourseDetail.data, ...data});


/**
 *  历史记录 Type => All:表示所有， Today:表示今天记录，Earlier:表示更早
 */
export const GetHistoryCourse = (data) => fetch.post(Api.GetHistoryCourse.url, {...Api.GetHistoryCourse.data, ...data});

/**
 *  用户课程列表 Finish => 1：完成课程，0：未完成课程 ,2：表示全部
 */
export const GetUserCourseInfoList = (data) => fetch.post(Api.GetUserCourseInfoList.url, {...Api.GetUserCourseInfoList.data, ...data});

/**
 *  文章频道
 */
export const GetArticleChannelInfoList = (data) => fetch.post(Api.GetArticleChannelInfoList.url, {...Api.GetArticleChannelInfoList.data, ...data});

/**
 *  文章列表
 */
export const GetArticleInfoList = (data) => fetch.post(Api.GetArticleInfoList.url, {...Api.GetArticleInfoList.data, ...data});

/**
 *  文章详情
 */
export const ArticleDetail = (data) => fetch.post(Api.ArticleDetail.url, {...Api.ArticleDetail.data, ...data});

/**
 *  排行榜 RankType => 1：学时， 2：课程，3：单位
 */
export const GetRankInfoList = (data) => fetch.post(Api.GetRankInfoList.url, {...Api.GetRankInfoList.data, ...data});

/**
 *  培训班分类
 */
export const GetTrainingTypeList = (data) => fetch.post(Api.GetTrainingTypeList.url, {...Api.GetTrainingTypeList.data, ...data});

/**
 *  培训班列表 JoinStatus => Join：参加； UnJoin：未参加 ；UnAudit：审核中；
 */
export const GetTrainingClass = (data) => fetch.post(Api.GetTrainingClass.url, {...Api.GetTrainingClass.data, ...data});

/**
 *  培训班详情
 */
export const GetTrainingDetail = (data) => fetch.post(Api.GetTrainingDetail.url, {...Api.GetTrainingDetail.data, ...data});

/**
 *  签到列表
 */
export const GetClassUserSignList = (data) => fetch.post(Api.GetClassUserSignList.url, {...Api.GetClassUserSignList.data, ...data});

/**
 *  取消报名
 */
export const UpdateTrainingStudentdown = (data) => fetch.post(Api.UpdateTrainingStudentdown.url, {...Api.UpdateTrainingStudentdown.data, ...data});

/**
 *  报名培训班
 */
export const UpdateTrainingStudentup = (data) => fetch.post(Api.UpdateTrainingStudentup.url, {...Api.UpdateTrainingStudentup.data, ...data});

/**
 *  电子书
 */
export const GetBookInfoList = (data) => fetch.post(Api.GetBookInfoList.url, {...Api.GetBookInfoList.data, ...data});

/**
 *  电子书章节
 */
export const GetBookChapterInfoList = (data) => fetch.post(Api.GetBookChapterInfoList.url, {...Api.GetBookChapterInfoList.data, ...data});

/**
 *  电子书章节内容
 */
export const GetBookChapterContent = (data) => fetch.post(Api.GetBookChapterContent.url, {...Api.GetBookChapterContent.data, ...data});

/**
 *  留言类型
 */
export const CommentType = (data) => fetch.post(Api.CommentType.url, {...Api.CommentType.data, ...data});

/**
 *  添加留言
 */
export const AddMessage = (data) => fetch.post(Api.AddMessage.url, {...Api.AddMessage.data, ...data});

/**
 *  修改用户信息
 */
export const UpdateUserInfo = (data) => fetch.post(Api.UpdateUserInfo.url, {...Api.UpdateUserInfo.data, ...data});

/**
 *  获取职级列表
 */
export const GetGradeList = (data) => fetch.post(Api.GetGradeList.url, {...Api.GetGradeList.data, ...data});

/**
 *  获取学历列表
 */
export const GetDegreeList = (data) => fetch.post(Api.GetDegreeList.url, {...Api.GetDegreeList.data, ...data});

/**
 *  修改手机号
 */
export const UpdateMobile = (data) => fetch.post(Api.UpdateMobile.url, {...Api.UpdateMobile.data, ...data});

/**
 *  发送验证码
 */
export const SendMsg = (data) => fetch.post(Api.SendMsg.url, {...Api.SendMsg.data, ...data});

/**
 *  修改密码
 */
export const SetUserPassword = (data) => fetch.post(Api.SetUserPassword.url, {...Api.SetUserPassword.data, ...data});








