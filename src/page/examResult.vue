/**
* 考试结果
*/
<template>
  <div class="exam_result container_top">
    <!--头部-->
    <header-fix title="考试结果" fixed></header-fix>
    <div class="result_top">
      <div class="result_icon" v-if="result.PassFlag"><i class="webapp webapp-smile"></i><span>恭喜您！</span></div>
      <div class="result_icon" v-if="!result.PassFlag"><i class="webapp webapp-cry"></i><span>很遗憾！</span></div>
      <p class="get_score">您的得分：{{result.Score}}分</p>
    </div>
    <div class="result_body">
      <p><span>用时：</span><span class="pull-right">{{parseInt(result.usedTime / 1000) | formatTime}}</span></p>
      <p><span>总题数：</span><span class="pull-right">{{result.TotalCount}}题</span></p>
      <p><span>正确：</span><span class="pull-right">{{result.RightCount}}题</span></p>
      <p><span>错误：</span><span class="pull-right">{{result.TotalCount - result.RightCount}}题</span></p>
    </div>
    <div class="result_footer">
      <mt-button class="back" type="primary" @click.native="back">返回</mt-button>
      <mt-button class="oneMore" type="primary" @click.native="oneMore">再考一次</mt-button>
    </div>
  </div>

</template>
<script>
  import Vue from 'vue'
  import {Button} from 'mint-ui'
  import {headerFix} from '../components'

  Vue.component(Button.name, Button);
  export default {
    data() {
      return {
        result: null
      }
    },
    components: {
      headerFix
    },
    created() {
      this.result = JSON.parse(this.$route.query.data);
    },
    mounted() {
    },
    methods: {
      back() {
        this.$router.push('/examCenter');
      },
      oneMore() {
        this.$router.push({path: 'exam', query: {id: this.result.examId}})
      }
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .exam_result {
    background: $fill-body;
    .result_top {
      background-color: $fill-base;
      height: toRem(364px);
      text-align: center;
      .result_icon {
        padding: toRem(120px) 0 toRem(50px) 0;
        font-size: 15px;
        span {
          margin-left: toRem(20px);
        }
      }
      .get_score {
        @include ht-lineHt(60px);
        font-size: 18px;
      }
    }
    .result_body {
      background-color: $fill-base;
      font-size: 14px;
      margin-top: toRem(20px);
      padding: 0 toRem(30px);
      p {
        @include ht-lineHt(82px);
        border-top: 1px solid $border-color-light;
      }
    }
    .result_footer {
      margin-top: toRem(82px);
      @extend %clearFix;
      .back {
        @extend %pull-left;
        @include wh(300px, 80px);
        @include borderRadius(20px);
        margin-left: toRem(40px);
      }
      .oneMore {
        @extend %pull-right;
        @include wh(300px, 80px);
        @include borderRadius(20px);
        margin-right: toRem(40px);
      }
    }
    .webapp-smile {
      color: $brand-primary;
    }
    .webapp-cry {
      color: $brand-primary;
    }
  }
</style>
