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

const routes  = [
  {
    path: '/',
    component: App,
    children:[
      {
        path: '',
        redirect: '/home'
      },
      //登陆
      {
        name:'login',
        path: '/login',
        component: Login
      },
      //首页
      {
        name:'home',
        path: '/home',
        component: Home
      },
      //课程中心
      {
        name:'courseCenter',
        path: '/courseCenter',
        component: CourseCenter
      },
      //课程搜索
      {
        name:'courseSearch',
        path: '/courseSearch',
        component: CourseSearch
      },
      //考试中心
      {
        name:'examCenter',
        path: '/examCenter',
        component: ExamCenter
      },
      //考试
      {
        name:'exam',
        path: '/exam',
        component: Exam
      },
      //考试结果
      {
        name:'examResult',
        path: '/examResult',
        component: ExamResult
      },
      //搜索考试
      {
        name:'examSearch',
        path: '/examSearch',
        component: ExamSearch
      },
      //个人中心
      {
        name:'personalCenter',
        path: '/personalCenter',
        component: PersonalCenter
      },
      //消息中心
      {
        name:'message',
        path: '/message',
        component: Message
      },
      //通知内容
      {
        name:'messageDetail',
        path: '/messageDetail',
        component: MessageDetail
      },
      //历史记录
      {
        name:'history',
        path: '/history',
        component: History
      },
      //我的课程
      {
        name:'myCourse',
        path: '/myCourse',
        component: MyCourse
      },
      //新闻中心
      {
        name:'newsCenter',
        path: '/newsCenter',
        component: NewsCenter
      },
      //新闻搜索
      {
        name:'newsSearch',
        path: '/newsSearch',
        component: NewsSearch
      },
      //新闻详情
      {
        name:'newsDetails',
        path: '/newsDetails',
        component: NewsDetails
      },
      //error
      {
        name:'error',
        path: '/error',
        component: Error
      },
    ]
  },
  {path: "*", redirect: '/error'},
]
export default routes
