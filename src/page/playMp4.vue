/**
* Mp4播放页
*/
<template>
  <div class="play_Mp4 container_top">
    <!--头部-->
    <header-fix title="视频播放" fixed>
      <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
    </header-fix>
    <div class="player">
      <video id="myVideo" preload="meta" :src="courseDetails.OnlineUrl" controls
             style="object-fit:fill"
             x5-video-player-type="h5"
             webkit-playsinline="true"
             playsinline="true"
             x-webkit-airplay="true"
             x5-video-player-fullscreen="true"
             x5-video-orientation="portraint">
      </video>
      <!--<video v-else id="myVideo" preload="meta" :src="courseDetails.OnlineUrl" controls></video>-->
    </div>
    <div class="course_detail">
      <mt-navbar v-model="selected">
        <mt-tab-item id="introduce">介绍</mt-tab-item>
        <mt-tab-item id="relatedCourse">相关课程</mt-tab-item>
        <!--<mt-tab-item id="notes">学习笔记</mt-tab-item>-->
        <mt-tab-item id="evaluate">评价</mt-tab-item>
      </mt-navbar>
      <!-- tab-container -->
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="introduce">
          <course-introduce :course-details="courseDetails"></course-introduce>
        </mt-tab-container-item>
        <mt-tab-container-item id="relatedCourse">
          <section v-infinite-scroll="getRelatedCourse"
                   infinite-scroll-immediate-check="immediate"
                   infinite-scroll-disabled="loading"
                   infinite-scroll-distance="10">
            <course-list :course-data="courseData" :no-data-bg="noDataBg" :no-data="noData"></course-list>
          </section>
        </mt-tab-container-item>
        <!--<mt-tab-container-item id="notes">
          学习笔记
        </mt-tab-container-item>-->
        <mt-tab-container-item id="evaluate">
          <course-comment :course-id="courseId" :comment-credit="courseDetails.CommentCredit"></course-comment>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <div v-if="isOpen" class="open_app">
      <span>打开APP，可享课程下载服务</span><a id="btnOpenApp" class="openApp" href="javascript:void(0);">打开</a>
      <a class="close_tip" @click="isOpen = !isOpen">
        <i class="webapp webapp-close"></i>
      </a>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {Toast, Indicator, Navbar, TabItem, TabContainer, TabContainerItem} from 'mint-ui'
  import {headerFix, courseIntroduce, courseComment, courseNotes, courseList} from '../components'
  import {goBack} from '../service/mixins'
  import {GetCourseDetail, UploadTimeNode, RelatedCourse} from '../service/getData'
  import {timeFormat, getStore} from '../plugins/utils'

  Vue.component(Navbar.name, Navbar);
  Vue.component(TabItem.name, TabItem);
  Vue.component(TabContainer.name, TabContainer);
  Vue.component(TabContainerItem.name, TabContainerItem);
  export default {
    mixins: [goBack],
    data() {
      return {
        isWeChat: false, //是否是微信
        isOpen: true,
        selected: 'introduce',
        courseId: '', //课程id
        courseDetails: {}, //课程详情信息
        readyState: 0, //视频是否准备就绪
        duration: 0, //视频时长
        browseScore: 0, //百分比进度
        myVideo: null, //video对象
        lastLocation: 0, //记录上次播放的位置
        progressTime: 0, //记录视频完成进度位置
        updateTimer: 0, //提交进度定时器
        /*相关课程*/
        courseData: [],
        loading: false,
        immediate: false,
        page: 1,
        noData: false,
        noDataBg: false,
      }
    },
    created() {
      if (getStore("userAgent").weixin) {
        this.isWeChat = true;
      } else if (getStore("userAgent").mobile) {
        this.isWeChat = false;
      }
      this.courseId = this.$route.query.id;
    },
    mounted() {
      /*初始化 打开APP*/
      new Mlink({
        mlink: "https://afaki8.mlinks.cc/A0BP?Title=&Content=&Id=" + this.courseId + "&Type=Course&Token=" + localStorage.getItem("ASPXAUTH"),
        button: document.querySelector("a#btnOpenApp")
      });
      /*获取video对象*/
      this.myVideo = document.getElementById("myVideo");
      /*获取课程详情*/
      this.getCourseDetail();
      this.getRelatedCourse();
    },
    components: {
      headerFix,
      courseIntroduce,
      courseComment,
      courseNotes,
      courseList,
    },
    computed: {},
    methods: {
      //相关课程
      async getRelatedCourse() {
        this.noData = false;
        this.noDataBg = false;
        this.loading = true;
        Indicator.open();
        let data = await RelatedCourse({CourseId: this.courseId, Page: this.page});
        Indicator.close();
        if (data.Type == 1) {
          let list = data.Data.List;
          if (list.length == 0 && this.page > 1) {
            this.noData = true;
            return;
          }
          if (list.length == 0 && this.page == 1) {
            this.noDataBg = true;
            return;
          }
          this.courseData = this.courseData.concat(list);
          this.loading = false;
          this.page += 1;
        }
      },
      //课程详情
      async getCourseDetail() {
        let data = await GetCourseDetail({Id: this.courseId});
        if (data.Type == 1) {
          this.courseDetails = data.Data;
          this.lastLocation = data.Data.LastLocation;
          this.browseScore = data.Data.BrowseScore;
          this.playFunc();
        }
      },
      //提交进度
      async updateProgress() {
        let TimeNode = timeFormat(this.myVideo.currentTime);
        let data = await UploadTimeNode({CourseId: this.courseId, TimeNode});
        if (data.Type == 1) {
          //提交成功
        } else if (data.Type != 401) {
          Toast({message: data.Message, position: 'bottom'});
        }
      },
      /*播放方法*/
      playFunc() {
        this.myVideo.load();
        let timer = setInterval(() => {
          let readyState = this.myVideo.readyState;
          this.readyState = readyState;
          if (readyState == 4) {
            /*准备好可以播放时清除定时器*/
            clearInterval(timer);
            timer = null;
            this.duration = (this.myVideo.duration).toFixed(2); //当前时间
            this.progressTime = this.myVideo.duration * (parseFloat(this.browseScore) / 100);
            this.myVideo.currentTime = this.lastLocation;
            /*监听视频播放位置*/
            this.myVideo.addEventListener('timeupdate', () => {
              let currentTime = this.myVideo.currentTime;
              if (currentTime > 0) {
                if (currentTime > this.progressTime - 2 && currentTime < this.progressTime + 1) {
                  //视频播放位置接近时候，视频完成进度位置前进
                  this.progressTime = currentTime;
                } else if (currentTime > this.progressTime + 2) {
                  //视频未播放区域 禁止拖拽
                  this.myVideo.currentTime = this.progressTime;
                }
              }
            });
            /*监听视频播放结束*/
            this.myVideo.addEventListener('ended', () => {
              /*判断是否是拖拽到结束*/
              if (this.progressTime > this.duration - 2) {
                this.updateProgress();
              } else {
                this.myVideo.play();
              }
            });
            this.updateTimer = setInterval(() => {
              this.updateProgress();
            }, 60000);
          }
        }, 100);
      },
    },
    beforeDestroy() {
      this.updateProgress();
      clearInterval(this.updateTimer);
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .play_Mp4 {
    .open_app {
      position: fixed;
      left: 0;
      bottom: 0;
      text-indent: 1rem;
      font-size: 14px;
      @include ht-lineHt(105px);
      background: rgba(0, 0, 0, 0.8);
      width: 100%;
      color: $color-text-reverse;
      .openApp {
        color: #fff;
        padding: toRem(15px) toRem(30px);
        background: $brand-primary;
        margin-left: 1rem;
        border-radius: toRem(12px);
      }
      .close_tip {
        font-size: 20px;
        position: absolute;
        right: toRem(10px);
        bottom: 0;
        top: toRem(10px);
        height: toRem(40px);
        line-height: toRem(40px);
      }
    }
    .player {
      padding-top: 0.2rem;
      width: 10rem;
      height: 5.8rem;
      margin: 0 auto;
      position: relative;
      background: #000;
      video {
        height: 100%;
        width: 100%;
        margin: 0 auto;
      }
    }
  }
</style>