// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import './assets/iconfont/iconfont.css'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './service/filter'

import './style/base.scss'
import routes from './router'
import store from './store/'
import {setStore, userAgent} from './plugins/utils'

//注册全局组建
/*import mbTag from './components/mbTag.vue'
Vue.component(mbTag.name, mbTag);*/


Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(MintUI);

//修改title
const changeTitle = (title) => {
  if (title) {
    document.title = title;
  }
}
const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  let title = to.meta.title;
  changeTitle(title);
  next();
})
router.afterEach((to, from) => {
  /*存入当前url*/
  let currentUrl = to.fullPath;
  setStore("currentUrl", currentUrl);
  /*判断mobile weixin*/
  let agent = userAgent();
  setStore('userAgent', agent);
})

var vm = new Vue({
  router,
  store
}).$mount('#app')