// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './plugins/flexible_css'
import './plugins/flexible'
import Vue from 'vue'
import VueRouter from 'vue-router'
import MintUI from 'mint-ui'
import 'vue-awesome/dist/vue-awesome';
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import './style/base.scss'
import 'mint-ui/lib/style.css'
import routes  from './router'
import store from './store/'
Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(MintUI);
Vue.component('icon', Icon);

const router = new VueRouter({
  routes
})
/*router.beforeEach((to, from, next) => {
  // console.log(to,from)
  if(to.path=='/userLogin') {next();return}
  if(to.path=='/'){next();return}
  if(to.path=='/home'){next();return}
  next();
})*/

new Vue({
  router,
  store
}).$mount('#app')
