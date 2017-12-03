<template>
  <div class="home">
    <Header-fix title="主页" fixed>
      <router-link slot="left" to="/message"><img class="message" src="../assets/message.png" alt="消息"></router-link>
      <div slot="right">
        <img src="../assets/info_show.png" @click="toggleModel" alt="用户信息" class="info_show">
        <router-link to="/history"><img class="history" src="../assets/history.png" alt="历史记录"></router-link>
      </div>
    </Header-fix>
    <div class="container">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in swipeData" key="$index">
          <a @click.prevent="judgeUrl(item.Type,item.Id)">
            <error-img :src="item.Icon"></error-img>
          </a>
        </mt-swipe-item>
      </mt-swipe>
      <section class="guide_list">
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
          <router-link to="/ebookList">
            <img src="../assets/ebook_ico.png" alt="电子书">
            <p>电子书</p>
          </router-link>
        </div>
      </section>
      <div class="boundary"></div>
      <section class="recommend_course">
        <div class="recommend_title"><span class="red_line"></span>课程推荐</div>
        <div class="recommend_course_list">
          <ul>
            <li v-for="item in recommendCourseData" :key="item.Id">
              <div class="recommend_course_item">
                <a @click="toPlay(item.CourseType,item.CourseId)">
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
    <Footer-fix selected="home"></Footer-fix>
    <transition name="fade">
      <div class="info" v-if="showModel">
        <div class="info_content">
          <div class="info_layer_avatar">
            <img src="../assets/user_avatar.png" alt="用户头像" class="avatar">
            <img src="../assets/cancel.png" @click="toggleModel" alt="关闭" class="cancel">
            <p>{{userInformation.Username}}</p>
          </div>
          <div class="info_detail">
            <h4>您好，欢迎来到干部教育网络学院学习平台</h4>
            <p><span>已获{{userInformation.TotalCredit}}学分，排名第{{userInformation.ScoreRank}}名</span></p>
          </div>
        </div>
      </div>
    </transition>
  </div>

</template>
<script>
  import { Indicator } from 'mint-ui';
  import {GetCourseInfoList, GetLink, GetUserInfo} from '../service/getData'
  import FooterFix from '../components/footerFix.vue'
  import errorImg from '../components/errorImg.vue'
  import HeaderFix from '../components/header.vue'
  import noCourse from '../assets/noCourse.png'
  export default {
    name: 'home',
    data() {
      return {
        userInformation: null,
        showModel: false,
        swipeData: [],
        recommendCourseData: [],
        noCourse
      }
    },
    components: {
      FooterFix,
      errorImg,
      HeaderFix,
    },
    mounted() {
      this.getUserInfor();
      this.getRecommendCourse();
      this.getSwipeData();
    },
    computed: {},
    methods: {
      async getUserInfor() {
        let data = await GetUserInfo();
        if (data.Type == 1) {
          this.userInformation = data.Data;
        } else if (data.Type != 401) {
          alert(data.Message);
        }
      },
      async getRecommendCourse() {
        let data = await GetCourseInfoList({ChannelId:-3});
        this.recommendCourseData = data.Data.List;
      },
      async getSwipeData() {
        let data = await GetLink();
        if (data.Type == 1) {
          this.swipeData = data.Data;
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
            path = `/articleDetail`
            break;
          case "Course":
            path = `/courseDetail`
            break;
          case "ArticleList":
            path = `/newsCenter`
            break;
        }
        this.$router.push({path, query: {id}})
      },
      toPlay(type,id){
        if(type == "Mp4"){
          this.$router.push({path:'/playMp4',query:{id}})
        }else if(type == "JYAicc"){
          this.$router.push({path:'/playJYAicc',query:{id}})
        }
      }
    }
  }
</script>
<style lang="scss" scoped rel="stylesheet/scss">
  @import "../style/mixin";

  .home {
    .message {
      width: toRem(50px);
    }
    .info_show {
      width: toRem(50px);
      margin-right:toRem(15px);
    }
    .history {
      width: toRem(50px);
    }
    .info {
      width: 100%;
      height: 100%;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 1000;
      background-color: $fill-mask;
      .info_content {
        position: relative;
        @include wh(580px, 533px);
        margin: toRem(250px) auto;
        background: url(../assets/info_bg.png) no-repeat center center;
        background-size: 100% 100%;
        .info_layer_avatar {
          text-align: center;
          line-height: toRem(60px);
          font-size: toRem(24px);
        }
        .avatar {
          margin-top: toRem(18px);
          @include square(117px);
        }
        .cancel {
          position: absolute;
          right: toRem(20px);
          top: toRem(20px);
          @include square(26px);
        }
        .info_detail {
          text-align: center;
          padding: toRem(100px) toRem(10px) 0 toRem(10px);
          h4 {
            font-size: toRem(28px);
          }
          p {
            margin-top: toRem(40px);
            color: $color-text-secondary;
            font-size: toRem(26px);
          }
        }
      }
    }
    .mint-swipe {
      margin-top: toRem(90px);
      height: toRem(360px);
      img {
        width: 100%;
        height: 100%;
      }
    }
    .guide_list {
      @extend %clearFix;
      text-align: center;
      background-color: #fff;
      .guide_item {
        @extend %pull-left;
        width: 20%;
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
      padding: toRem(30px) 0 toRem(30px) toRem(25px);
      background-color: #fff;
      .recommend_title {
        font-size: toRem(36px);
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
            width: 100%;
            height: toRem(240px);
          }
          .course_title {
            width: 100%;
            @extend %ellipsis;
            text-align: left;
            line-height: toRem(40px);
          }
          .clearFix{
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
