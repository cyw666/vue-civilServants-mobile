/*路由*/
import App from '../App.vue'

const Home = r => require.ensure([], () => r(require('../page/home/home.vue')), 'home')
const Login = r => require.ensure([], () => r(require('../page/home/login.vue')), 'login')
const Error = r => require.ensure([], () => r(require('../page/error.vue')), 'error')
const CourseCenter = r => require.ensure([], () => r(require('../page/courseCenter.vue')), 'courseCenter')
const CourseSearch = r => require.ensure([], () => r(require('../page/courseSearch.vue')), 'courseSearch')
const ExamCenter = r => require.ensure([], () => r(require('../page/examCenter.vue')), 'examCenter')

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
