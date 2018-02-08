/**
* 考试记录列表
*/
<template>
  <div class="exam_history_list">
    <div class="exam_item" v-for="item in historyData" :key="item.ExamId">
      <div class="exam_img">
        <img src="../assets/exam_ico.png" alt="">
      </div>
      <div class="exam_desc">
        <div class="exam_name">{{item.ExamTitle}}</div>
        <div class="exam_date">考试时间：{{item.EndTime | dateFilter('yyyy.MM.dd')}}</div>
        <div class="exam_num">
          <span class="exam_tip_num">所获学分：{{item.ExamCredit}}学分</span>
          <span class="pull-right">最好成绩：<span class="highlight">{{item.ExamCredit.toFixed(1)}}分</span></span>
        </div>
      </div>
    </div>
    <div class="noDataBg" v-if="noDataBg"></div>
    <div class="no-data" v-if="noData">没有更多内容了...</div>
  </div>
</template>
<script>
  export default {
    data () {
      return {}
    },
    props: {
      historyData: Array,
      noDataBg: {
        type: Boolean,
        default: false
      },
      noData: {
        type: Boolean,
        default: false
      },
    },
    methods: {},
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .exam_history_list {
    .exam_item {
      background-color: $fill-base;
      padding: toRem(20px) toRem(30px);
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
      font-size: 14px;
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
        color: $brand-success;
      }
    }
  }
</style>
