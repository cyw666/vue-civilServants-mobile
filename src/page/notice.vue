/**
* 通知公告
*/
<template>
  <div class="notice_center container_top">
    <!--头部-->
    <header-fix title="通知公告" fixed>
      <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
    </header-fix>
    <section v-infinite-scroll="getNoticeInfoList"
             infinite-scroll-immediate-check="immediate"
             infinite-scroll-disabled="loading"
             infinite-scroll-distance="10">
      <notice-list :notice-data="noticeData" :no-data-bg="noDataBg" :no-data="noData"></notice-list>
    </section>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { Indicator, InfiniteScroll } from 'mint-ui'
  import { headerFix, noticeList } from '../components'
  import { goBack } from '../service/mixins'
  import { GetNoticeInfoList } from '../service/getData'

  Vue.use(InfiniteScroll)
  export default {
    mixins: [goBack],
    data () {
      return {
        noticeData: [],
        page: 1,
        loading: false,
        immediate: false,
        noDataBg: false,
        noData: false,
      }
    },
    mounted () {
      this.getNoticeInfoList()
    },
    components: {
      headerFix,
      noticeList,
    },
    methods: {
      async getNoticeInfoList () {
        this.noData = false
        this.noDataBg = false
        this.loading = true
        Indicator.open()
        let data = await GetNoticeInfoList({Page: this.page})
        Indicator.close()
        if (data.Type == 1) {
          let list = data.Data.List
          if (list.length == 0 && this.page > 1) {
            this.noData = true
            return
          }
          if (list.length == 0 && this.page == 1) {
            this.noDataBg = true
            return
          }
          this.noticeData = this.noticeData.concat(list)
          this.loading = false
          this.page += 1
        }
      },
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .notice_center {
    background-color: $fill-base;
    .notice_bottom {
      position: fixed;
      z-index: 10;
      bottom: 0;
      left: 0;
      width: 100%;
      @include flex(space-between);
      background-color: $fill-base;
      font-size: 14px;
      text-align: center;
      span {
        width: 50%;
        padding: toRem(26px) 0;
        color: $brand-primary;
        border-top: 1px solid $brand-primary;
        &.active {
          color: $color-text-reverse;
          background-color: $brand-primary;
        }
      }
    }
    .write_edit {
      position: fixed;
      z-index: 1000;
      top: 0;
      right: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: $fill-body;
      .write_body {

      }
      .write_item {
        font-size: 14px;
        padding: 0 toRem(25px);
        background-color: $fill-base;
        input {
          display: inline-block;
          width: 83%;
          padding: toRem(25px) toRem(10px);
          line-height: 1.2em;
        }
        border-bottom: 1px solid $border-color-light;
        textarea {
          height: toRem(800px);
          font-size: 12px;
          margin-top: toRem(20px);
          padding: toRem(30px) 0;
        }
      }
    }
  }
</style>
