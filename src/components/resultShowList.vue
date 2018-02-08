/**
* 成果展示列表
*/
<template>
  <div class="result_show_list">
    <ul>
      <li @click="goDetail('1')">
        <img src="../assets/resultshow.png" alt="">
        <p class="result_title">2017全民终身学习活动周全大会表彰成果展示</p>
        <div class="restule_desc clearFix">
          <span class="result_good pull-left"><i class="webapp webapp-goodfill"></i>134</span>
          <span class="result_comment pull-right"><i class="webapp webapp-commentfill"></i>25</span>
        </div>
      </li>
      <li>
        <img src="../assets/resultshow2.png" alt="">
        <p class="result_title">2017全民终身学习活动周全大会表彰成果展示</p>
        <div class="restule_desc clearFix">
          <span class="result_good pull-left"><i class="webapp webapp-goodfill"></i>134</span>
          <span class="result_comment pull-right"><i class="webapp webapp-commentfill"></i>25</span>
        </div>
      </li>
      <li>
        <img src="../assets/resultshow.png" alt="">
        <p class="result_title">2017全民终身学习活动周全大会表彰成果展示</p>
        <div class="restule_desc clearFix">
          <span class="result_good pull-left"><i class="webapp webapp-goodfill"></i>134</span>
          <span class="result_comment pull-right"><i class="webapp webapp-commentfill"></i>25</span>
        </div>
      </li>
      <li>
        <img src="../assets/resultshow2.png" alt="">
        <p class="result_title">2017全民终身学习活动周全大会表彰成果展示</p>
        <div class="restule_desc clearFix">
          <span class="result_good pull-left"><i class="webapp webapp-goodfill"></i>134</span>
          <span class="result_comment pull-right"><i class="webapp webapp-commentfill"></i>25</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    mixins: [],
    data () {
      return {}
    },
    created () {
      
    },
    mounted () {
      
    },
    props: [],
    components: {},
    computed: {},
    updated () {
      
    },
    methods: {
      goDetail (id) {
        this.$router.push({path: 'resultShowDetail', query: {id}})
      }
    },
    watch: {}
    
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .result_show_list {
    ul {
      @extend %clearFix;
      li {
        @extend %pull-left;
        width: 50%;
        background-color: $fill-base;
        margin-top: toRem(20px);
        text-align: center;
        img {
          width: toRem(341px);
          height: toRem(211px);
        }
        &:nth-child(odd) {
          padding: toRem(30px) toRem(20px) toRem(30px) toRem(20px);
        }
        &:nth-child(even) {
          padding: toRem(30px) toRem(20px) toRem(30px) 0;
        }
      }
      .restule_desc {
        color: $color-text-thirdly;
        .webapp {
          color: $color-text-thirdly;
          font-size: 14px;
          margin-right: toRem(5px);
        }
      }
      .result_title {
        @include ellipsis_two(1);
        text-align: left;
        margin: toRem(20px) 0;
      }
      .result_good {

      }
      .result_comment {

      }
    }
  }
</style>
