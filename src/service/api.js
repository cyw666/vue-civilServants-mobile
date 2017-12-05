/**
 * 页面接口api
 */
// const API_URL = 'http://test10.jy365.net/api';
const API_URL = '/api';
const Platform = '/wechat';
export default {
  //判断用户是否存在
  CheckUserIsExit: {
    url: API_URL + Platform + '/CheckUserIsExit',
    data: {Account: ''}
  },
  //登陆
  Login: {
    url: API_URL + Platform + '/Login',
    data: {Code: '', Account: '', Password: '', Mac: '', CId: ''}
  },
  //获取用户信息
  GetUserInfo: {
    url: API_URL + Platform + '/GetUserInfo',
    data: {}
  },
  //轮播
  GetLink: {
    url: API_URL + Platform + '/GetLink',
    data: {Page: 1, Rows: 5}
  },
  //课程列表
  GetCourseInfoList: {
    url: API_URL + Platform + '/GetCourseInfoList',
    data: {TeacherName: '', ChannelId: '', Keyword: '', Sort: 'Id', Order: 'desc', Page: '1', Rows: '10'}
  },
  //课程分类
  GetChannelInfoList: {
    url: API_URL + Platform + '/GetChannelInfoList',
    data: {ParentId: 0}
  },
  //考试分类
  GetExamType: {
    url: API_URL + Platform + '/GetExamType',
    data: {ParentId: 0, ParentCode: ''}
  },
  //考试列表
  GetExamList: {
    url: API_URL + Platform + '/GetExamList',
    data: {ExamType: 'All', TypeId: '', Keyword: '', Page: 1, Rows: 10}
  },
  //获取考试题
  GetExam: {
    url: API_URL + Platform + '/GetExam',
    data: {Id: ''}
  },
  //提交考试题
  UpdateUserExam: {
    url: API_URL + Platform + '/UpdateUserExam',
    data: {ExamId: '', Data: null}
  },
  //退出登录
  LoginOut: {
    url: API_URL + Platform + '/LoginOut',
    data: {Mac: ''}
  },
  //消息中心
  GetMessageCenter: {
    url: API_URL + Platform + '/GetMessageCenter',
    data: {Page: 1, Rows: 10, Keyword: ''}
  },
  //通知内容
  GetNoticeInfoContent: {
    url: API_URL + Platform + '/GetNoticeInfoContent',
    data: {}
  },
  //课程详情
  GetCourseDetail: {
    url: API_URL + Platform + '/GetCourseDetail',
    data: {Id: ''}
  },
  //历史记录 Type => All:表示所有， Today:表示今天记录，Earlier:表示更早
  GetHistoryCourse: {
    url: API_URL + Platform + '/GetHistoryCourse',
    data: {Type: "", Keyword: "", Sort: "sort", Order: "desc", Page: 1, Rows: 20}
  },
  //用户课程列表 Finish => 1：完成课程，0：未完成课程 ,2：表示全部
  GetUserCourseInfoList: {
    url: API_URL + Platform + '/GetUserCourseInfoList',
    data: {Finish: "2", Keyword: "",Page: 1, Rows: 10}
  },
  //文章频道
  GetArticleChannelInfoList: {
    url: API_URL + Platform + '/GetArticleChannelInfoList',
    data: {ParentId: "", ParentCode: ""}
  },
  //文章列表
  GetArticleInfoList: {
    url: API_URL + Platform + '/GetArticleInfoList',
    data: {CategoryId: '', Keyword: '', CategoryCode: '', Page: '1', Rows: '10'}
  },
  //文章详情
  ArticleDetail: {
    url: API_URL + Platform + '/ArticleDetail',
    data: {Id:''}
  },
  //排行榜 RankType => 1：学时， 2：课程，3：单位
  GetRankInfoList: {
    url: API_URL + Platform + '/GetRankInfoList',
    data: {RankType:'',TotalCount:'20'}
  },
  //培训班分类
  GetTrainingTypeList: {
    url: API_URL + Platform + '/GetTrainingTypeList',
    data: {}
  },
  //培训班列表 JoinStatus => Join：参加； UnJoin：未参加 ；UnAudit：审核中；
  GetTrainingClass: {
    url: API_URL + Platform + '/GetTrainingClass',
    data: {TypeId: '', TrainName: '', JoinStatus: '', Page: '1', Rows: '20'}
  },
  //培训班详情
  GetTrainingDetail: {
    url: API_URL + Platform + '/GetTrainingDetail',
    data: {Id: ''}
  },
  //签到列表
  GetClassUserSignList: {
    url: API_URL + Platform + '/GetClassUserSignList',
    data: {TrainingId: '', TodayFlag: '', Order: 'desc', Page: '1', Rows: '20'}
  },
  //取消报名培训班
  UpdateTrainingStudentdown: {
    url: API_URL + Platform + '/UpdateTrainingStudentdown',
    data: {Id: ''}
  },
  //报名培训班
  UpdateTrainingStudentup: {
    url: API_URL + Platform + '/UpdateTrainingStudentup',
    data: {Id: ''}
  },
};
