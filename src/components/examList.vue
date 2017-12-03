/**
* 考试列表
*/
<template>
  <div class="exam_list">
    <div class="exam_item" v-for="item in examData"
         @click="checkAttempt(item.ExamId,item.TriesLimit,item.LattemptNumber,item.EndTime)">
      <div class="exam_img">
        <img src="../assets/exam_ico.png" alt="">
      </div>
      <div class="exam_desc">
        <div class="exam_name" @click="checkAttempt">{{item.ExamTitle}}</div>
        <div class="exam_date">考试截止时间：{{item.EndTime | dateFilter('yyyy.MM.dd')}}</div>
        <div class="exam_num">
          <span class="exam_tip_num">题数：{{item.ThemeCount}}题</span>
          <span class="highlight pull-right">{{item.ExamCredit.toFixed(1)}}学分</span>
        </div>
        <div class="bottom">
          <span class="exam_time">考试时间：{{item.TimeLimit}}分钟</span>
          <span class="pull-right" v-if="item.Status=='Finish'">最好成绩：<span class="green">{{(item.HighScore).toFixed(1)}}</span></span>
          <span class="highlight pull-right" v-if="item.Status=='UnFinish'">不合格</span>
          <span class="pull-right" v-if="item.Status=='UnJoin'">未考</span></div>
      </div>
    </div>
    <div class="noDataBg" v-if="noDataBg"></div>
    <div class="no-data" v-if="noData">没有更多内容了...</div>
  </div>
</template>
<script>
  import {MessageBox,Toast } from 'mint-ui';
  export default {
    data() {
      return {
        message:''
      }
    },
    props: {
      examData: Array,
      noDataBg: {
        type: Boolean,
        default: false
      },
      noData: {
        type: Boolean,
        default: false
      },
    },
    components: {},
    methods: {
      checkAttempt(id, total, current, endTime) {
        var dateEnd = new Date(endTime).getTime();
        var dateNow = new Date().getTime();
        if (dateNow < dateEnd) {
          if (current < total) {
            let count = total - current;
            MessageBox.confirm(`当前考试剩余${count}次考试机会，是否继续考试`).then(action => {
              this.$router.push({path:'/exam',query:{id}})
            });

          } else {
            this.message = "考试次数已用完";
            Toast({
              message: this.message,
              position: 'bottom',
              duration: 2000
            });
          }
        } else {
          this.message = "考试截止时间已过";
          Toast({
            message: this.message,
            position: 'bottom',
            duration: 2000
          });
        }
      }
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .exam_list {
    padding: 0 toRem(30px);
    .exam_item {
      padding: toRem(20px) 0;
      border-bottom: 1px solid $border-color-base;
      @extend %clearFix;
    }
    .exam_img {
      @extend %pull-left;
      width: toRem(90px);
      img {
        @include square(56px);
      }
    }
    .exam_desc {
      @extend %pull-left;
      width: toRem(590px);
    }
    .exam_name {
      @include ellipsis_two(2);
      font-size: toRem(28px);
      font-weight: 500;
      color: $color-text-base;
    }
    .exam_date {
      color: $color-text-secondary;
      line-height: toRem(64px);
    }
    .exam_num {
      color: $color-text-secondary;
      line-height: toRem(44px);
      .exam_tip_num {

      }
      .highlight {

      }
    }
    .bottom {
      color: $color-text-thirdly;
      line-height: toRem(44px);
      .exam_time {

      }
      .highlight {

      }
      .green{
        color: $brand-success;
      }
    }
  }
</style>
