/**
* 通知公告
*/
<template>
  <div class="notice_center">
    <!--头部-->
    <header-fix title="通知公告" fixed>
      <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
    </header-fix>
    <section v-infinite-scroll="getNoticeInfoList"
             infinite-scroll-immediate-check="immediate"
             infinite-scroll-disabled="loading"
             infinite-scroll-distance="10">
      <div class="notice_list">
        <div class="notice_item" v-for="(item,index) in noticeData" :key="index" @click.stop="linkTo(item.NoticeId)">
          <div class="title clearFix">
            <span class="pull-left">{{item.NoticeTitle}}</span>
            <span class="pull-right"><i class="webapp webapp-more"></i></span>
          </div>
          <div class="desc clearFix">
            <span class="author pull-left">作者：{{item.NoticeAuthor}}</span>
            <span class="date pull-right">{{item.NoticeCreatedate | dateFilter}}</span>
          </div>
        </div>
        <div class="noDataBg" v-if="noDataBg"></div>
        <div class="no-data" v-if="noData">没有更多内容了...</div>
      </div>
    </section>
  </div>
</template>
<script>
  import {Indicator} from 'mint-ui'
  import {headerFix} from '../components'
  import {goBack} from '../service/mixins'
  import {GetNoticeInfoList} from '../service/getData'

  export default {
    mixins: [goBack],
    data() {
      return {
        noticeData: [],
        page: 1,
        loading: false,
        immediate: false,
        noDataBg: false,
        noData: false,
      }
    },
    created() {
      
    },
    mounted() {
      this.getNoticeInfoList();
    },
    props: [],
    components: {
      headerFix,
    },
    computed: {},
    updated() {
      
    },
    methods: {
      async getNoticeInfoList() {
        this.noData = false;
        this.noDataBg = false;
        this.loading = true;
        Indicator.open();
        let data = await GetNoticeInfoList({Page: this.page});
        Indicator.close();
        if (data.Type == 1) {
          let list = data.Data.List;
          if (list.length == 0 && this.page > 1) {
            this.noData = true;
            return;
          }
          if (list.length == 0 && this.page == 1) {
            this.noDataBg = true;
            return;
          }
          this.noticeData = this.noticeData.concat(list);
          this.loading = false;
          this.page += 1;
        }
      },
      linkTo: function (id) {
        this.$router.push({path: '/messageDetail', query: {id, title: '通知详情'}})
      },
    },
    watch: {}
    
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .notice_center {
    padding-top: toRem(92px);
    .notice_list {
      padding: 0 toRem(30px);
    }
    .notice_item {
      border-bottom: 1px solid $border-color-base;
      padding: toRem(10px) 0;
      .title {
        .pull-left {
          width: 90%;
        }
        .pull-right {
          width: 10%;
          text-align: right;
          font-size: 25px;
          color: $color-text-thirdly;
        }
      }
      .desc {
        margin-top: toRem(10px);
        color: $color-text-thirdly;
        .pull-right {
          text-align: right;
        }
      }
      .webapp-more {
        color: #666;
        font-size: 20px;
      }
    }
  }
</style>
