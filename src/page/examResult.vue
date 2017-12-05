/**
* 考试结果
*/
<template>
  <div class="exam_result">
    <!--头部-->
    <header-fix title="考试结果" fixed></header-fix>
    <div class="result_top">
      <div class="result_icon" v-if="result.PassFlag"><img src="../assets/happy.png" alt=""><span>恭喜您！</span></div>
      <div class="result_icon" v-if="!result.PassFlag"><img src="../assets/unHappy.png" alt=""><span>很遗憾！</span></div>
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
  import {headerFix} from '../components'

  export default {
    data() {
      return {
        result: null
      }
    },
    props: {},
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
    watch: {}
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .exam_result {
    height: 100vh;
    background: $fill-tap;
    margin-top: toRem(92px);
    .result_top {
      background-color: $fill-base;
      height: toRem(364px);
      text-align: center;
      .result_icon {
        padding: toRem(120px) 0 toRem(50px) 0;
        font-size: toRem(30px);
      }
      img {
        margin-right: toRem(20px);
      }
      .get_score {
        @include ht-lineHt(60px);
        font-size: toRem(38px);
      }
    }
    .result_body {
      background-color: $fill-base;
      padding: 0 toRem(30px);
      font-size: toRem(28px);
      margin-top: toRem(20px);
      p {
        @include ht-lineHt(82px);
        border-top: 1px solid $border-color-base;
      }
    }
    .result_footer {
      margin-top: toRem(100px);
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
  }
</style>
