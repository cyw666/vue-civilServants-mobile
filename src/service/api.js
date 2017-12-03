/**
 * 页面接口api
 */
// const API_URL = 'http://test10.jy365.net/api';
const API_URL = '/api';
const Platform = '/wechat';
export default {
  //判断用户是否存在
  CheckUserIsExit:{
    url:API_URL+Platform+'/CheckUserIsExit',
    data:{Account:''}
  },
  //登陆
  Login:{
    url:API_URL+Platform+'/Login',
    data:{Code:'',Account:'',Password:'',Mac:'',CId:''}
  },
  //获取用户信息
  GetUserInfo:{
    url:API_URL+Platform+'/GetUserInfo',
    data:{}
  },
  //轮播
  GetLink:{
    url:API_URL+Platform+'/GetLink',
    data:{Page:1,Rows:5}
  },
  //课程列表
  GetCourseInfoList:{
    url:API_URL+Platform+'/GetCourseInfoList',
    data: {TeacherName: '', ChannelId: '', Keyword: '', Sort: 'Id', Order: 'desc', Page: '1', Rows: '10'}
  },
  //课程分类
  GetChannelInfoList:{
    url:API_URL+Platform+'/GetChannelInfoList',
    data: {ParentId: 0}
  },
  //考试分类
  GetExamType:{
    url:API_URL+Platform+'/GetExamType',
    data: {ParentId: 0, ParentCode: ''}
  },
  //考试列表
  GetExamList:{
    url:API_URL+Platform+'/GetExamList',
    data: {ExamType: 'All', TypeId: '', Keyword: '', Page: 1, Rows: 10}
  },
  //获取考试题
  GetExam:{
    url:API_URL+Platform+'/GetExam',
    data: {Id:''}
  },
  //提交考试题
  UpdateUserExam:{
    url:API_URL+Platform+'/UpdateUserExam',
    data: {ExamId:'',Data:null}
  },
  //退出登录
  LoginOut:{
    url:API_URL+Platform+'/LoginOut',
    data: {Mac:''}
  },
  //消息中心
  GetMessageCenter:{
    url:API_URL+Platform+'/GetMessageCenter',
    data: {Page:1,Rows:10,Keyword:''}
  },
  //通知内容
  GetNoticeInfoContent:{
    url:API_URL+Platform+'/GetNoticeInfoContent',
    data: {}
  },
  //课程详情
  GetCourseDetail:{
    url:API_URL+Platform+'/GetCourseDetail',
    data: {Id:''}
  },
};
