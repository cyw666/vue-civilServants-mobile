/**
* 成果展示详情
*/
<template>
  <div class="result_show_detail container_top">
    <header-fix title="成果展示详情" fixed>
      <a slot="left" @click="goBack"><i class="webapp webapp-back"></i></a>
    </header-fix>
    <div class="detail_desc">
      <h1>合肥终身学习网全民学习活动启动仪式</h1>
      <div class="desc">
        描述：
        <span class="prev_desc">{{prevDesc}}</span>
        <span v-if="!showAllDesc">...</span>
        <span class="next_desc" v-if="showAllDesc">
          {{nextDesc}}
        </span>
        <a class="toggle_detail" @click="toggleDesc">{{showAllDesc ? '收起全文' : '展开全文'}}</a>
      </div>
      <div class="detail_img">
        <img src="../assets/show_detail1.png" alt="">
        <img src="../assets/show_detail2.png" alt="">
        <img src="../assets/show_detail3.png" alt="">
      </div>
      <div class="detail_btn">
        <mt-button size="normal" type="primary" plain>
          <i class="webapp webapp-goodfill"></i>125
        </mt-button>
        <mt-button size="normal" type="primary" plain>
          评论53
        </mt-button>
      </div>
    </div>
    <div class="comment_list">
      <div class="comment_item">
        <div class="left_avatar"><img src="../assets/male.png" alt=""/></div>
        <div class="right_content">
          <p class="name">
            <span>啦啦啦丶</span>
          </p>
          <p class="date">2017.1.14</p>
          <p class="content">有竞争才会有进步。</p>
        </div>
      </div>
      <div class="comment_item">
        <div class="left_avatar"><img src="../assets/male2.png" alt=""/></div>
        <div class="right_content">
          <p class="name">
            <span>啦啦啦丶</span>
          </p>
          <p class="date">2017.1.14</p>
          <p class="content">有竞争才会有进步。</p>
        </div>
      </div>
      <div class="comment_item">
        <div class="left_avatar"><img src="../assets/male2.png" alt=""/></div>
        <div class="right_content">
          <p class="name">
            <span>啦啦啦丶</span>
          </p>
          <p class="date">2017.1.14</p>
          <p class="content">有竞争才会有进步。</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { Button } from 'mint-ui'
  import { headerFix } from '../components'
  import { goBack } from '../service/mixins'

  Vue.component(Button.name, Button)
  export default {
    mixins: [goBack],
    data () {
      return {
        id: '',
        desc: '2017年全民终身学习活动周全国总开幕式在安徽省合肥市举行从是次大会上获悉，五年来，我国各类成人继续教育学校开展的培训规模超过2亿人次，各类成人继续教育学校开展的培训规模超过2亿人次，各类成人继续教育学校开展的培训规模超过2亿人次。',
        prevDesc: '',
        nextDesc: '',
        showAllDesc: false
      }
    },
    created () {
      this.id = this.$route.query.id || ''
    },
    mounted () {
      this.prevDesc = this.desc.substring(0, 70)
      this.nextDesc = this.desc.substring(70)
    },
    props: [],
    components: {
      headerFix
    },
    computed: {},
    updated () {
      
    },
    methods: {
      toggleDesc () {
        this.showAllDesc = !this.showAllDesc
      }
    },
    watch: {}
    
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .result_show_detail {
    padding-left: toRem(20px);
    padding-right: toRem(20px);
    background-color: $fill-base;
    .detail_desc {
      border-bottom: 1px solid $border-color-base;
      h1 {
        padding: toRem(30px) 0;
        text-align: center;
        font-size: 17px;
        font-weight: bold;
      }
      .prev_desc, .next_desc {
        color: $color-text-thirdly;
      }
      .toggle_detail {
        color: $brand-primary;
      }
    }
    .detail_img {
      padding: toRem(50px) 0;
      img {
        @include wh(230px, 230px);
      }
    }
    .detail_btn {
      padding-bottom: toRem(70px);
      text-align: center;
      .mint-button--primary.is-plain {
        border: 1px solid #bdc0c3;
        background-color: transparent;
        color: #bdc0c3;
        height: toRem(60px);
        padding: 0 toRem(65px);
        margin: 0 toRem(50px);
      }
      .webapp {
        color: #bdc0c3;
      }
    }
    .comment_item {
      @extend %clearFix;
      padding: toRem(20px) 0 toRem(30px);
      border-bottom: 1px solid $border-color-light;
      .left_avatar {
        @extend %pull-left;
        width: toRem(80px);
        img {
          width: toRem(65px);
        }
      }
      .right_content {
        @extend %pull-left;
        width: toRem(600px);
        .name {
          font-size: 14px;
          font-weight: 600;
        }
        .date {
          color: $color-text-thirdly;
          padding: toRem(10px) 0;
        }
        .content {
          color: $color-text-secondary;
        }
      }
    }
  }
</style>
