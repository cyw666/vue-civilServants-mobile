<template>
  <div class="home_index container_both">
    <header-fix title="主页" fixed>
      <router-link slot="left" to="/message" class="message">
        <i class="webapp webapp-email"></i>
      </router-link>
      <div slot="right" class="clearFix">
        <router-link to="/history" class="history">
          <i class="webapp webapp-time"></i>
        </router-link>
        <img src="../assets/info_show.png" @click="toggleModel" alt="用户信息" class="info_show"/>
      </div>
    </header-fix>
    <div class="container">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in swipeData" key="$index">
          <a @click.prevent="judgeUrl(item.Type,item.Id)">
            <error-img :src="item.Icon"></error-img>
          </a>
        </mt-swipe-item>
      </mt-swipe>
      <section class="guide_list">
        <div class="guide_container">
          <div class="guide_item">
            <router-link to="/myCourse">
              <img src="../assets/my_course.png" alt="我的课程">
              <p>我的课程</p>
            </router-link>
          </div>
          <div class="guide_item">
            <router-link to="/newsCenter">
              <img src="../assets/news_ico.png" alt="资讯中心">
              <p>资讯中心</p>
            </router-link>
          </div>
          <div class="guide_item">
            <router-link to="/rankList">
              <img src="../assets/rank_ico.png" alt="排行榜">
              <p>排行榜</p>
            </router-link>
          </div>
          <div class="guide_item">
            <router-link to="/classGarden">
              <img src="../assets/class_ico.png" alt="班级园地">
              <p>班级园地</p>
            </router-link>
          </div>
          <div class="guide_item">
            <router-link to="/ebook">
              <img src="../assets/ebook_ico.png" alt="电子书">
              <p>电子书</p>
            </router-link>
          </div>
          <div class="guide_item">
            <router-link to="/communication">
              <img src="../assets/communication_ico.png" alt="交流评论">
              <p>交流评论</p>
            </router-link>
          </div>
          <div class="guide_item">
            <router-link to="/notice">
              <img src="../assets/notice_ico.png" alt="通知公告">
              <p>通知公告</p>
            </router-link>
          </div>
        </div>
      </section>
      <div class="boundary"></div>
      <section class="recommend_course">
        <div class="recommend_title"><span class="red_line"></span>课程推荐</div>
        <div class="recommend_course_list">
          <ul>
            <li v-for="item in recommendCourseData" :key="item.Id">
              <div class="recommend_course_item" @click="toPlay(item.CourseType,item.CourseId)">
                <a>
                  <error-img :src="item.CourseImg" :error-src="noCourse"></error-img>
                  <p class="course_title">{{item.CourseName}}</p>
                </a>
                <p class="clearFix"><span class="teacher pull-left">讲师：{{item.TeacherName}}</span><span
                    class="highlight pull-right">{{item.Credit}}学分</span></p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
    <footer-fix selected="home"></footer-fix>
    <mb-model :isShow.sync="showModel">
      <div class="info_content" slot>
        <div class="info_layer_avatar">
          <img class="avatar" src="../assets/user_avatar.png" alt="用户头像">
          <p>{{userInfo.Username}}</p>
        </div>
        <div class="info_detail">
          <h4>您好，欢迎来到干部教育网络学院学习平台</h4>
          <p><span>已获{{userInfo.TotalCredit}}学分，排名第{{userInfo.ScoreRank}}名</span></p>
        </div>
      </div>
    </mb-model>
  </div>

</template>
<script>
  import axios from 'axios'
  import {mapState, mapActions, mapMutations} from 'vuex'
  import {Indicator, MessageBox} from 'mint-ui';
  import {headerFix, errorImg, footerFix, mbModel} from '../components'
  import {GetCourseInfoList, GetLink, GetCourseDetail, GetUserInfo, Login} from '../service/getData'
  import {toPlay} from '../service/mixins'
  import noCourse from '../assets/noCourse.png'
  import {getStore, setStore, removeStore, getQueryString, userAgent} from '../plugins/utils'

  export default {
    name: 'home',
    mixins: [toPlay],
    data() {
      return {
        userInfo: {},
        showModel: false,
        swipeData: [],
        recommendCourseData: [],
        noCourse,
        code: '',
      }
    },
    components: {
      footerFix,
      errorImg,
      headerFix,
      mbModel,
    },
    created() {
      this.code = this.$route.query.code;
      this.getUserAgent();
    },
    mounted() {
      this.getRecommendCourse();
      this.getSwipeData();
      let ASPXAUTH = window.localStorage.getItem('ASPXAUTH');
      if (ASPXAUTH) {
        this.getUserInformation();
      } else {
        /*自动登陆*/
        this.login();
      }
    },
    computed: {
      ...mapState(['userAgent', 'weLoginUrl', 'weIndexUrl']),
    },
    methods: {
      ...mapActions(['getUserAgent']),
      async login() {
        let res = await Login({Code: this.code});
        if (res.Type == 1) {
          /*登陆成功*/
          this.getUserInformation();
        } else {
          MessageBox('警告', res.Message);
          if (this.userAgent.weixin) {
            window.location = this.weLoginUrl;
          } else {
            window.location.href = '/#/login';
          }
        }
      },
      async getUserInformation() {
        let data = await GetUserInfo();
        if (data.Type == 1) {
          this.userInfo = data.Data;
        } else if (data.Type != 401) {
          alert(data.Message);
        }
      },
      async getRecommendCourse() {
        let data = await GetCourseInfoList({ChannelId: -3});
        if (data.Type == 1) {
          this.recommendCourseData = data.Data.List;
        }
      },
      async getSwipeData() {
        let data = await GetLink();
        if (data.Type == 1) {
          this.swipeData = data.Data;
        }
      },
      async getCourseDetail(Id) {
        let data = await GetCourseDetail({Id});
        if (data.Type == 1) {
          this.toPlay(data.Data.CourseType, Id);
        } else if (data.Type != 401) {
          MessageBox('警告', data.Message);
        }
      },
      toggleModel() {
        this.showModel = !this.showModel;
      },
      judgeUrl(type, id) {
        let path = "";
        switch (type) {
          case "CourseList":
            path = `/courseCenter`
            break;
          case "Article":
            path = `/newsDetails`
            break;
          case "Course":
            this.getCourseDetail(id);
            break;
          case "ArticleList":
            path = `/newsCenter`
            break;
        }
        this.$router.push({path, query: {id}})
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .home_index {
    .container {
    }
    .header {
      .message {
        @extend %pull-left;
        height: toRem(92px);
      }
      .webapp {
        color: $color-text-reverse;
        font-size: toRem(50px);
      }
      .history {
        @extend %pull-right;
        height: toRem(92px);
      }
      .info_show {
        width: toRem(50px);
        margin-right: toRem(25px);
        @extend %pull-right;
        margin-top: toRem(18px);
      }
    }
    .info_content {
      background: url(../assets/info_bg.png) no-repeat center center;
      background-size: 100% 100%;
      height: toRem(533px);
      .info_layer_avatar {
        text-align: center;
        line-height: toRem(60px);
        font-size: 12px;
      }
      .avatar {
        margin-top: toRem(18px);
        @include square(117px);
      }
      .info_detail {
        text-align: center;
        padding: toRem(100px) toRem(10px) 0 toRem(10px);
        h4 {
          font-size: 14px;
        }
        p {
          margin-top: toRem(40px);
          color: $color-text-secondary;
          font-size: 13px;
        }
      }
    }

    .mint-swipe {
      height: toRem(360px);
      img {
        width: 100%;
        height: 100%;
      }
    }

    .guide_list {
      width: 100%;
      height: toRem(203px);
      overflow-x: scroll;
      overflow-y: hidden;
      @extend %clearFix;
      &::-webkit-scrollbar {
        width: 0px;
      }
      .guide_container {
        width: 140%;
        height: toRem(203px);
        text-align: center;
        background-color: #fff;
      }
      .guide_item {
        @extend %pull-left;
        width: toRem(150px);
        padding: toRem(35px) 0;
        p {
          line-height: toRem(50px);
        }
        img {
          width: toRem(84px);
        }
      }
    }
    .boundary {
      display: block;
      width: 100%;
      height: toRem(20px);
      background-color: #ebf1f1;
    }
    .recommend_course {
      padding: toRem(30px) 0 toRem(20px) toRem(25px);
      background-color: #fff;
      .recommend_title {
        font-size: 18px;
        line-height: toRem(62px);
      }
      .recommend_course_list {
        ul {
          @extend %clearFix;
        }
        li {
          @extend %pull-left;
          width: 50%;
          text-align: center;
          margin-top: toRem(30px);
          .recommend_course_item {
            padding-right: toRem(25px);
          }
          img {
            width: toRem(335px);
            height: toRem(178px);
          }
          .course_title {
            width: 100%;
            @extend %ellipsis;
            text-align: left;
            line-height: toRem(40px);
          }
          .clearFix {
            line-height: toRem(40px);
          }
          .teacher {
            color: $color-text-secondary;
          }
        }
      }
    }
  }
</style>
