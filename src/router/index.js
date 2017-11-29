/*路由*/
import App from '../App.vue'

const HelloWorld = r => require.ensure([], () => r(require('../components/HelloWorld.vue')), 'helloWorld')
const Home = r => require.ensure([], () => r(require('../page/home/home.vue')), 'home')
const Login = r => require.ensure([], () => r(require('../page/home/login.vue')), 'login')
const Error = r => require.ensure([], () => r(require('../page/error.vue')), 'error')

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
        path: '/login',
        component: Login
      },
      //首页
      {
        path: '/home',
        component: Home
      },
      //HelloWorld
      {
        path: '/hello',
        component: HelloWorld
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
