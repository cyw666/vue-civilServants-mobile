# 前言

> 微信公众号 + webapp

干部网络教育培训既具有打破时空限制、方便快捷、互动性强的鲜明特点，又具有学习资源丰富、培训形式多样、投入较少、培训资源优化整合和培训对象广覆盖的独特优势。干部网络教育培训意义重大、影响深远。未来，省干部教育培训网络学院将进一步深入学习贯彻习近平总书记系列重要讲话精神，紧紧围绕“四个全面”战略布局，认真贯彻落实五大发展理念，在省委组织部的领导下，坚持服务科学发展、服务干部成长、服务学习型党组织建设，不断创新方式，强化管理，打造品牌，提高实效，推进干部网络培训工作再上新台阶，为建设富饶美丽幸福作出新的更大贡献。

## 技术栈

vue2 + vuex + vue-router + mintui + webpack + ES6/7 + axios + sass + flex + iconfont

## 项目运行

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 线上项目地址

[点击查看请戳这里](http://122.225.101.117:9064)（请用chrome手机模式预览）
账号：cyw666 密码:123123

### 微信公众号

![](https://github.com/cyw666/vue-civilServants-mobile/blob/master/screenshot/weiXinImg.jpg)

# 说明

>  开发环境 macOS 10.12.3  Chrome 56  nodejs 6.10.0

>  pc端 angular1 + grunt 兼容ie8+。[线上地址](http://test10.jy365.net/#/)

>  pc端项目重构 react + antdesign 开源项目，对react感兴趣的朋友赶紧去看看。[地址在这里](https://github.com/cyw666/react-civilServants)

# 项目布局

```
.
├── build                                       // webpack配置文件
├── config                                      // 项目打包路径
├── dist                                        // 上线项目文件，放在服务器即可正常访问
├── src                                         // 源码目录
│   ├── assets                                  // 静态资源
│   ├── components                              // 公用组件
│   ├── page                                    // 页面
│   ├── plugins                                 // 引用的插件 工具
│   ├── router
│   │   └── router.js                           // 路由配置
│   ├── service                                 // 数据交互统一调配
│   │   ├── api.js                              // api接口
│   │   ├── fetch.js                            // axios 封装
│   │   ├── filter.js                           // 过滤器
│   │   ├── getData.js                          // 获取数据的统一调配文件，对接口进行统一管理
│   │   └── mixins.js                           // vue mixins
│   ├── store                                   // vuex的状态管理
│   │   ├── action.js                           // 配置actions
│   │   ├── getters.js                          // 配置getters
│   │   ├── index.js                            // 引用vuex，创建store
│   │   ├── modules                             // store模块
│   │   ├── mutation-types.js                   // 定义常量muations名
│   │   └── mutations.js                        // 配置mutations
│   └── style
│       ├── base.scss                           // 公共样式文件
│       ├── mixin.scss                          // 样式配置文件
│   ├── App.vue                                 // 页面入口文件
│   ├── main.js                                 // 程序入口文件，加载各种公共组件
├── favicon.ico                                 // 图标
├── index.html                                  // 入口html文件
.
```

# 部分截图

### 登录页  首页
<img src="https://github.com/cyw666/vue-civilServants-mobile/blob/master/screenshot/login.png" width="365" height="660"/>  <img src="https://github.com/cyw666/vue-civilServants-mobile/blob/master/screenshot/home.png" width="371" height="660"/>


### 课程中心  考试中心

<img src="https://github.com/cyw666/vue-civilServants-mobile/blob/master/screenshot/coursecenter.png" width="371" height="660"/>  <img src="https://github.com/cyw666/vue-civilServants-mobile/blob/master/screenshot/examcenter.png" width="371" height="660"/>


### 新闻中心  播放页

<img src="https://github.com/cyw666/vue-civilServants-mobile/blob/master/screenshot/newscenter.png" width="371" height="660"/>  <img src="https://github.com/cyw666/vue-civilServants-mobile/blob/master/screenshot/play.png" width="371" height="660"/>

