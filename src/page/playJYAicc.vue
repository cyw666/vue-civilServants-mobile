/**
* JYAicc播放页
*/
<template>
  <div class="play_Jyaicc container_top">
    <!--头部-->
    <header-fix title="视频播放" fixed>
      <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
    </header-fix>
    <div class="player">
      <video id="myVideo" preload="meta" :src="activeNode.Mp4" controls
             style="object-fit:fill"
             x5-video-player-type="h5"
             webkit-playsinline="true"
             playsinline="true"
             x-webkit-airplay="true"
             x5-video-player-fullscreen="true"
             x5-video-orientation="portraint">
      </video>
    </div>
    <div class="course_detail">
      <mt-navbar v-model="selected">
        <mt-tab-item id="introduce">介绍</mt-tab-item>
        <mt-tab-item id="catalogue">目录</mt-tab-item>
        <mt-tab-item id="evaluate">评价</mt-tab-item>
      </mt-navbar>
      <!-- tab-container -->
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="introduce">
          <course-introduce :course-details="courseDetails"></course-introduce>
        </mt-tab-container-item>
        <mt-tab-container-item id="catalogue">
          <ul class="course_menu">
            <li v-for="(item,index) in nodeList"
                :class="{'highlight':item.NodeId==activeNodeId}"
                @click.stop="otherNode(index)">
              <span class="title">{{item.NodeName}}</span>
              <p class="status">
                <span class="green" v-if="item.Status=='C'">已完成</span>
                <span v-else>未完成</span>
              </p>
            </li>
          </ul>
        </mt-tab-container-item>
        <mt-tab-container-item id="evaluate">
          <course-comment :course-id="courseId"></course-comment>
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
  import {MessageBox} from 'mint-ui'
  import {headerFix, courseIntroduce, courseComment} from '../components'
  import {goBack} from '../service/mixins'
  import {GetCourseDetail, SyncUserStudyData} from '../service/getData'

  export default {
    mixins: [goBack],
    data() {
      return {
        isOpen: true, //是否打开app
        autoPlay: false, //是否自动播放
        selected: 'introduce', //被选择便签页id
        courseId: '', //课程id
        courseDetails: {}, //课程详情信息
        readyState: 0, //视频是否准备就绪
        nodeList: [], //节点数据
        nodeLength: 0, //节点数据
        duration: 0, //视频时长
        activeNodeIndex: "", //正在播放的索引
        activeNodeId: "", //正在播放的id
        activeNode: { //正在播放的节点数据
          NodeId: '',
          Mp4: '',
          Status: '',
          Time: 0,
        },
        myVideo: null, //video对象
        progressTime: 0, //记录视频完成进度位置
      }
    },
    created() {
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
    },
    components: {
      headerFix,
      courseIntroduce,
      courseComment,
    },
    computed: {},
    methods: {
      //课程详情
      async getCourseDetail() {
        let data = await GetCourseDetail({Id: this.courseId});
        if (data.Type == 1) {
          this.courseDetails = data.Data;
          this.nodeList = data.Data.NodeList;
          this.nodeLength = data.Data.NodeList.length;
          this.activeNodeId = data.Data.LastNodeId;
        }
      },
      //提交进度
      async updateProgress(NodeId, Time, Status) {
        let data = await SyncUserStudyData({
          CourseId: this.courseId,
          Data: [{NodeId, Time, Status}]
        });
        if (data.Type == 1) {
          this.nodeList = data.Data.NodeList;
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
            this.duration = this.myVideo.duration; //当前时间
            /*播放前判断是否播放完毕*/
            if (this.activeNode.Status == 'C') {
              /*播放已经完毕 是否播放下一章节*/
              this.nextNode();
            } else {
              this.myVideo.currentTime = this.progressTime;
              /*是否自动播放*/
              if (this.autoPlay) {
//                this.myVideo.play();
              }
            }
            /*监听视频播放位置*/
            this.myVideo.addEventListener('timeupdate', () => {
              let currentTime = this.myVideo.currentTime;
              if (currentTime > 0) {
                /*视频已经播放完毕*/
                if (this.activeNode.Status == "C") {
                  this.progressTime = currentTime;
                } else {
                  /*视频未播放完毕 禁止拖拽*/
                  if (currentTime > this.progressTime - 2 && currentTime < this.progressTime + 1) {
                    this.progressTime = currentTime;
                  } else if (currentTime > this.progressTime + 2) {
                    this.myVideo.currentTime = this.progressTime;
                  }
                }
              }
            });
            /*监听视频播放结束*/
            this.myVideo.addEventListener('ended', () => {
              this.activeNode.Status = 'C';
              this.updateProgress(this.activeNode.NodeId, this.myVideo.currentTime, this.activeNode.Status);
              this.nextNode();
            });
          }
        }, 200);
      },
      /*播放其他章节*/
      playNode(index) {
        this.updateProgress(this.activeNode.NodeId, this.progressTime, this.activeNode.Status);
        this.activeNodeIndex = index;
      },
      /*是否播放下一章节*/
      nextNode() {
        /*不是最后一个节点播放下一章节*/
        if (this.nodeLength != this.activeNodeIndex + 1) {
          MessageBox.confirm('本章节播放完毕，是否播放下一章节！').then(action => {
            this.autoPlay = true;
            let nextNodeIndex = this.activeNodeIndex + 1
            this.playNode(nextNodeIndex);
          }).catch(error => {
            this.progressTime = 0;
            this.myVideo.currentTime = 0;
            this.myVideo.play();
            this.autoPlay = true;
          });
        }
      },
      /*点击节点播放其他章节*/
      otherNode(index) {
        this.autoPlay = false;
        this.playNode(index);
      }
    },
    beforeDestroy() {
      this.updateProgress(this.activeNode.NodeId, this.progressTime, this.activeNode.Status);
    },
    watch: {
      activeNodeIndex: function (val) {
        let dataList = this.nodeList;
        if (dataList) {
          let node = dataList[val];
          this.activeNodeId = node.NodeId;
        }
      },
      activeNodeId: function (val) {
        if (!val) return;
        let dataList = this.nodeList;
        dataList && dataList.forEach((item, index) => {
          if (val == item.NodeId) {
            this.activeNode = item;
            this.activeNodeIndex = index;
            this.progressTime = item.Time;
            this.playFunc();
          }
        })
      },
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .play_Jyaicc {
    .course_menu {
      padding: 0 toRem(30px);
      font-size: 15px;
      li {
        padding: toRem(20px) 0;
        @extend %clearFix;
      }
      .title {
        @extend %pull-left;
        width: 7rem;
      }
      .status {
        @extend %pull-left;
        color: $color-text-thirdly;
        font-size: 14px;
      }
      .green {
        color: $brand-success;
      }
    }
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
        color: $color-text-reverse;
        /*font-size: 20px;*/
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
