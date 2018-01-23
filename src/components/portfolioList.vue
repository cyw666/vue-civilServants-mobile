/**
* 学习档案列表
*/
<template>
  <div class="portfolio_container">
    <div class="clearFix collect_content" v-for="(item,index) in learningData">
      <div class="left_content">{{sortNum(index + 1)}}.</div>
      <div class="right_content">
        <p class="collect_title">
          <span class="error">看书 | </span>
          <span>{{item.title}}</span>
        </p>
        <p class="collect_date">
          <span>日期：{{item.date}}</span>
          <span class="score">2.0学分</span>
        </p>
      </div>
    </div>
    <div class="noDataBg" v-if="noDataBg"></div>
    <div class="no-data" v-if="noData">没有更多内容了...</div>
  </div>
</template>
<script>
  export default {
    mixins: [],
    data() {
      return {}
    },
    created() {
      
    },
    mounted() {
      
    },
    props: {
      learningData:{
        type:Array
      },
      noDataBg:{
        type:Boolean,
        default:false
      },
      noData:{
        type:Boolean,
        default:false
      }
    },
    components: {},
    computed: {},
    updated() {
      
    },
    methods: {
      sortNum(num) {
        let index = parseInt(num);
        if (index < 10) {
          return `0${index}`
        }
        return index
      },
    },
    watch: {}
    
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .portfolio_container {
    padding: 0 toRem(25px);
    background-color: $fill-base;
  }

  .collect_content {
    width: 100%;
    padding: toRem(30px) 0;
    border-bottom: 1px solid $border-color-light;
  }

  .left_content {
    @extend %pull-left;
    width: 10%;
    line-height: toRem(41px);
    font-size: 14px;
  }

  .right_content {
    @extend %pull-left;
    width: 90%;
    font-size: 14px;
    .collect_title {
      height: toRem(82px);
      line-height: toRem(41px);
      @include ellipsis_two();
    }
    .collect_date {
      font-size: 13px;
      color: $color-text-secondary;
      .score {
        color: $brand-primary;
        @extend %pull-right;
      }
    }
  }

  .error {
    color: $brand-error;
  }
</style>
