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
};
