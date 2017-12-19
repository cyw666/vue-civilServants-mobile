/*路由*/

import App from '../App.vue'

const Home = r => require.ensure([], () => r(require('../page/home.vue')), 'home')
const Login = r => require.ensure([], () => r(require('../page/login.vue')), 'login')
const Error = r => require.ensure([], () => r(require('../page/error.vue')), 'error')
const CourseCenter = r => require.ensure([], () => r(require('../page/courseCenter.vue')), 'courseCenter')
const CourseSearch = r => require.ensure([], () => r(require('../page/courseSearch.vue')), 'courseSearch')
const ExamCenter = r => require.ensure([], () => r(require('../page/examCenter.vue')), 'examCenter')
const Exam = r => require.ensure([], () => r(require('../page/exam.vue')), 'exam')
const ExamResult = r => require.ensure([], () => r(require('../page/examResult.vue')), 'examResult')
const ExamSearch = r => require.ensure([], () => r(require('../page/examSearch.vue')), 'examSearch')
const PersonalCenter = r => require.ensure([], () => r(require('../page/personalCenter.vue')), 'personalCenter')
const Message = r => require.ensure([], () => r(require('../page/message.vue')), 'message')
const MessageDetail = r => require.ensure([], () => r(require('../page/messageDetail.vue')), 'messageDetail')
const History = r => require.ensure([], () => r(require('../page/history.vue')), 'history')
const MyCourse = r => require.ensure([], () => r(require('../page/myCourse.vue')), 'myCourse')
const NewsCenter = r => require.ensure([], () => r(require('../page/newsCenter.vue')), 'newsCenter')
const NewsSearch = r => require.ensure([], () => r(require('../page/newsSearch.vue')), 'newsSearch')
const NewsDetails = r => require.ensure([], () => r(require('../page/newsDetails.vue')), 'newsDetails')
const RankList = r => require.ensure([], () => r(require('../page/rankList.vue')), 'rankList')
const ClassGarden = r => require.ensure([], () => r(require('../page/classGarden.vue')), 'classGarden')
const ClassSearch = r => require.ensure([], () => r(require('../page/classSearch.vue')), 'classSearch')
const ClassDetail = r => require.ensure([], () => r(require('../page/classDetail.vue')), 'classDetail')
const SignDetail = r => require.ensure([], () => r(require('../page/signDetail.vue')), 'signDetail')
const Ebook = r => require.ensure([], () => r(require('../page/ebook.vue')), 'ebook')
const EbookSearch = r => require.ensure([], () => r(require('../page/ebookSearch.vue')), 'ebookSearch')
const EbookChapterList = r => require.ensure([], () => r(require('../page/ebookChapterList.vue')), 'ebookChapterList')
const EbookDetail = r => require.ensure([], () => r(require('../page/ebookDetail.vue')), 'ebookDetail')
const MyCredit = r => require.ensure([], () => r(require('../page/myCredit.vue')), 'myCredit')
const Advise = r => require.ensure([], () => r(require('../page/advise.vue')), 'advise')
const Setting = r => require.ensure([], () => r(require('../page/setting.vue')), 'setting')
const UserInfoEdit = r => require.ensure([], () => r(require('../page/userInfoEdit.vue')), 'userInfoEdit')
const ChangeMobile = r => require.ensure([], () => r(require('../page/changeMobile.vue')), 'changeMobile')
const ChangePwd = r => require.ensure([], () => r(require('../page/changePwd.vue')), 'changePwd')
const Register = r => require.ensure([], () => r(require('../page/register.vue')), 'register')
const Communication = r => require.ensure([], () => r(require('../page/communication.vue')), 'communication')
const AddCommunication = r => require.ensure([], () => r(require('../page/addCommunication.vue')), 'addCommunication')
const PlayMp4 = r => require.ensure([], () => r(require('../page/playMp4.vue')), 'playMp4')
const PlayJYAicc = r => require.ensure([], () => r(require('../page/playJYAicc.vue')), 'playJYAicc')
const PlayH5 = r => require.ensure([], () => r(require('../page/playH5.vue')), 'playH5')
const Notice = r => require.ensure([], () => r(require('../page/notice.vue')), 'notice')

const routes = [
  {
    path: '/',
    component: App,
    children: [
      {
        path: '',
        redirect: '/home',
        meta: {title: '首页'},
      },
      //登陆
      {
        name: 'login',
        path: '/login',
        component: Login,
        meta: {title: '登陆'},
      },
      //首页
      {
        name: 'home',
        path: '/home',
        component: Home,
        meta: {title: '首页'},
      },
      //课程中心
      {
        name: 'courseCenter',
        path: '/courseCenter',
        component: CourseCenter,
        meta: {title: '课程中心'},
      },
      //课程搜索
      {
        name: 'courseSearch',
        path: '/courseSearch',
        component: CourseSearch,
        meta: {title: '课程搜索'},
      },
      //考试中心
      {
        name: 'examCenter',
        path: '/examCenter',
        component: ExamCenter,
        meta: {title: '考试中心'},
      },
      //考试
      {
        name: 'exam',
        path: '/exam',
        component: Exam,
        meta: {title: '考试'},
      },
      //考试结果
      {
        name: 'examResult',
        path: '/examResult',
        component: ExamResult,
        meta: {title: '考试结果'},
      },
      //搜索考试
      {
        name: 'examSearch',
        path: '/examSearch',
        component: ExamSearch,
        meta: {title: '搜索考试'},
      },
      //个人中心
      {
        name: 'personalCenter',
        path: '/personalCenter',
        component: PersonalCenter,
        meta: {title: '个人中心'},
      },
      //消息中心
      {
        name: 'message',
        path: '/message',
        component: Message,
        meta: {title: '消息中心'},
      },
      //通知内容
      {
        name: 'messageDetail',
        path: '/messageDetail',
        component: MessageDetail,
        meta: {title: '通知内容'},
      },
      //历史记录
      {
        name: 'history',
        path: '/history',
        component: History,
        meta: {title: '历史记录'},
      },
      //我的课程
      {
        name: 'myCourse',
        path: '/myCourse',
        component: MyCourse,
        meta: {title: '我的课程'},
      },
      //新闻中心
      {
        name: 'newsCenter',
        path: '/newsCenter',
        component: NewsCenter,
        meta: {title: '新闻中心'},
      },
      //新闻搜索
      {
        name: 'newsSearch',
        path: '/newsSearch',
        component: NewsSearch,
        meta: {title: '新闻搜索'},
      },
      //新闻详情
      {
        name: 'newsDetails',
        path: '/newsDetails',
        component: NewsDetails,
        meta: {title: '新闻详情'},
      },
      //通知公告
      {
        name: 'notice',
        path: '/notice',
        component: Notice,
        meta: {title: '通知公告'},
      },
      //排行榜
      {
        name: 'rankList',
        path: '/rankList',
        component: RankList,
        meta: {title: '排行榜'},
      },
      //班级园地
      {
        name: 'classGarden',
        path: '/classGarden',
        component: ClassGarden,
        meta: {title: '班级园地'},
      },
      //班级搜索
      {
        name: 'classSearch',
        path: '/classSearch',
        component: ClassSearch,
        meta: {title: '班级搜索'},
      },
      //班级详情
      {
        name: 'classDetail',
        path: '/classDetail',
        component: ClassDetail,
        meta: {title: '班级详情'},
      },
      //签到详情
      {
        name: 'signDetail',
        path: '/signDetail',
        component: SignDetail,
        meta: {title: '签到详情'},
      },
      //电子书
      {
        name: 'ebook',
        path: '/ebook',
        component: Ebook,
        meta: {title: '电子书'},
      },
      //电子书搜索
      {
        name: 'ebookSearch',
        path: '/ebookSearch',
        component: EbookSearch,
        meta: {title: '电子书搜索'},
      },
      //电子书章节
      {
        name: 'ebookChapterList',
        path: '/ebookChapterList',
        component: EbookChapterList,
        meta: {title: '电子书章节'},
      },
      //电子书章节内容
      {
        name: 'ebookDetail',
        path: 'ebookDetail',
        component: EbookDetail,
        meta: {title: '内容'},
      },
      //我的学分
      {
        name: 'myCredit',
        path: 'myCredit',
        component: MyCredit,
        meta: {title: '我的学分'},
      },
      //反馈中心
      {
        name: 'advise',
        path: 'advise',
        component: Advise,
        meta: {title: '反馈'},
      },
      //设置中心
      {
        name: 'setting',
        path: 'setting',
        component: Setting,
        meta: {title: '设置'},
      },
      //个人信息修改
      {
        name: 'userInfoEdit',
        path: 'userInfoEdit',
        component: UserInfoEdit,
        meta: {title: '个人信息修改'},
      },
      //修改手机号码
      {
        name: 'changeMobile',
        path: 'changeMobile',
        component: ChangeMobile,
        meta: {title: '修改手机号码'},
      },
      //修改密码
      {
        name: 'changePwd',
        path: 'changePwd',
        component: ChangePwd,
        meta: {title: '修改密码'},
      },
      //注册
      {
        name: 'register',
        path: 'register',
        component: Register,
        meta: {title: '注册'},
      },
      //交流评论
      {
        name: 'addCommunication',
        path: 'addCommunication',
        component: AddCommunication,
        meta: {title: '交流评论'},
      },
      //添加评论
      {
        name: 'communication',
        path: 'communication',
        component: Communication,
        meta: {title: '添加评论'},
      },
      //mp4播放
      {
        name: 'playMp4',
        path: 'playMp4',
        component: PlayMp4,
        meta: {title: 'mp4课程播放'},
      },
      //JYAicc播放页
      {
        name: 'playJYAicc',
        path: 'playJYAicc',
        component: PlayJYAicc,
        meta: {title: '精英课程播放'},
      },
      //h5播放
      {
        name: 'playH5',
        path: 'playH5',
        component: PlayH5,
        meta: {title: 'h5课程播放'},
      },
      //error
      {
        name: 'error',
        path: '/error',
        component: Error,
        meta: {title: 'error'},
      },
    ]
  },
  {path: "*", redirect: '/error'},
]
export default routes
