/**
* 历史记录
*/
<template>
  <div class="history container_top">
    <!--头部-->
    <header-fix title="播放记录" fixed>
      <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
    </header-fix>
    <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" ref="loadmore">
      <div class="history_container">
        <div class="history_course">
          <div class="history_title"><span class="primary_line"></span><span>今天</span></div>
          <div class="history_content" v-for="item in todayHistory"
               :key="item.CourseId"
               @click.stop="toPlay(item.CourseType,item.CourseId)">
            <div class="left_img">
              <error-img :src="item.CourseImg" :error-src="noCourse"></error-img>
            </div>
            <div class="right_content">
              <h4>{{item.CourseName}}</h4>
              <span>已看{{item.BrowseScore}}%，剩余{{item.Remainder}}分钟</span>
            </div>
          </div>
        </div>
        <div class="history_course">
          <div class="history_title"><span class="primary_line"></span><span>更早</span></div>
          <div class="history_content" v-for="item in earlyHistory"
               :key="item.CourseId"
               @click.stop="toPlay(item.CourseType,item.CourseId)">
            <div class="left_img">
              <error-img :src="item.CourseImg" :error-src="noCourse"></error-img>
            </div>
            <div class="right_content">
              <h4>{{item.CourseName}}</h4>
              <span>已看{{item.BrowseScore}}%，剩余{{item.Remainder}}分钟</span>
            </div>
          </div>
        </div>
      </div>
    </mt-loadmore>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {Loadmore} from 'mint-ui';
  import {headerFix, errorImg} from '../components'
  import {goBack, toPlay} from '../service/mixins'
  import noCourse from '../assets/noCourse.png'
  import {GetHistoryCourse} from '../service/getData'

  Vue.component(Loadmore.name, Loadmore);
  export default {
    mixins: [goBack, toPlay],
    data() {
      return {
        topStatus: '',
        noCourse,
        todayHistory: [],
        earlyHistory: []
      }
    },
    created() {
      
    },
    mounted() {
      this.getTodayHistory();
      this.getEarlierHistory();
    },
    components: {
      headerFix,
      errorImg,
    },
    methods: {
      loadTop() {
        this.getTodayHistory();
        this.getEarlierHistory();
        this.$refs.loadmore.onTopLoaded();
      },
      handleTopChange(status) {
        this.topStatus = status;
      },
      //今天历史记录
      async getTodayHistory() {
        let data = await GetHistoryCourse({Type: 'Today'});
        if (data.Type == 1) {
          let list = data.Data.List;
          this.todayHistory = list;
        }
      },
      //更早历史记录
      async getEarlierHistory() {
        let data = await GetHistoryCourse({Type: 'Earlier'});
        if (data.Type == 1) {
          let list = data.Data.List;
          this.earlyHistory = list;
        }
      },
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .history {
    .history_container {
    }
    .history_course {
      padding: toRem(20px) toRem(30px) 0 toRem(30px);
      margin-bottom: toRem(20px);
      background-color: $fill-base;
    }
    .history_title {
      font-size: 15px;
    }
    .history_content {
      @extend %clearFix;
      padding: toRem(20px) 0;
      border-bottom: 1px solid $border-color-base;
      .left_img {
        width: toRem(200px);
        @extend %pull-left;
        img {
          @include wh(186px, 106px);
        }
      }
      .right_content {
        @extend %pull-right;
        width: toRem(470px);
        h4 {
          font-size: 14px;
          height: toRem(76px);
          line-height: toRem(38px);
          @include ellipsis_two;
        }
        span {
          font-size: 12px;
          color: $color-text-secondary;
        }
      }
    }
  }
</style>
