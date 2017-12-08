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
      //排行榜
      {
        name:'rankList',
        path: '/rankList',
        component: RankList
      },
      //班级园地
      {
        name:'classGarden',
        path: '/classGarden',
        component: ClassGarden
      },
      //班级搜索
      {
        name:'classSearch',
        path: '/classSearch',
        component: ClassSearch
      },
      //班级搜索
      {
        name:'classDetail',
        path: '/classDetail',
        component: ClassDetail
      },
      //签到详情
      {
        name:'signDetail',
        path: '/signDetail',
        component: SignDetail
      },
      //电子书
      {
        name:'ebook',
        path: '/ebook',
        component: Ebook
      },
      //电子书搜索
      {
        name:'ebookSearch',
        path: '/ebookSearch',
        component: EbookSearch
      },
      //电子书章节
      {
        name:'ebookChapterList',
        path: '/ebookChapterList',
        component: EbookChapterList
      },
      //电子书章节内容
      {
        name:'ebookDetail',
        path: 'ebookDetail',
        component: EbookDetail
      },
      //我的学分
      {
        name:'myCredit',
        path: 'myCredit',
        component: MyCredit
      },
      //反馈中心
      {
        name:'advise',
        path: 'advise',
        component: Advise
      },
      //设置中心
      {
        name:'setting',
        path: 'setting',
        component: Setting
      },
      //个人信息修改
      {
        name:'userInfoEdit',
        path: 'userInfoEdit',
        component: UserInfoEdit
      },
      //修改手机号码
      {
        name:'changeMobile',
        path: 'changeMobile',
        component: ChangeMobile
      },
      //修改密码
      {
        name:'changePwd',
        path: 'changePwd',
        component: ChangePwd
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
