/**
* 历史记录
*/
<template>
  <div class="history">
    <!--头部-->
    <header-fix title="历史记录" fixed>
      <a @click="goBack" slot="left"><img class="back_img" src="../assets/arrow.png" alt=""></a>
    </header-fix>
    <div class="history_container">
      <div class="history_course">
        <div class="history_title"><span class="red_line"></span><span>今天</span></div>
        <div class="history_content" v-for="item in todayHistory" @click.stop="toPlay(item.CourseType,item.CourseId)">
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
        <div class="history_title"><span class="red_line"></span><span>更早</span></div>
        <div class="history_content" v-for="item in earlyHistory">
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
  </div>
</template>
<script>
  import {headerFix, errorImg} from '../components'
  import {goBack, toPlay} from '../service/mixins'
  import noCourse from '../assets/noCourse.png'
  import {GetHistoryCourse} from '../service/getData'

  export default {
    mixins: [goBack, toPlay],
    data() {
      return {
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
    props: [],
    components: {
      headerFix,
      errorImg,
    },
    computed: {},
    updated() {
      
    },
    methods: {
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
    watch: {}
    
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .history {
    .history_container {
      margin-top: toRem(92px);
    }
    .history_course {
      margin-top: toRem(20px);
      padding: toRem(20px) toRem(30px);
    }
    .history_title {
      font-size: toRem(30px);
      padding: toRem(15px) 0;
    }
    .history_content {
      @extend %clearFix;
      padding: toRem(20px) 0;
      border-bottom: 1px solid $border-color-base;
      .left_img {
        width: toRem(244px);
        @extend %pull-left;
        img {
          @include wh(244px, 148px);
        }
      }
      .right_content {
        @extend %pull-right;
        width: toRem(425px);
        h4 {
          font-size: toRem(28px);
          margin-bottom: toRem(45px);
          @include ellipsis_two;
        }
        span {
          font-size: toRem(24px);
          color: $color-text-secondary;
        }
      }
    }
  }
</style>
