/**
* 通知公告
*/
<template>
  <div class="notice_center container_top">
    <!--头部-->
    <header-fix title="站内信" fixed>
      <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
      <span slot="right" @click.stop="toggleWrite">写信</span>
    </header-fix>
    <section v-if="tabId=='send'"
             v-infinite-scroll="getNoticeInfoList"
             infinite-scroll-immediate-check="immediate"
             infinite-scroll-disabled="loading"
             infinite-scroll-distance="10">
      send
      <notice-list :notice-data="noticeData" :no-data-bg="noDataBg" :no-data="noData"></notice-list>
    </section>
    <section v-if="tabId=='accept'"
             v-infinite-scroll="getNoticeInfoList"
             infinite-scroll-immediate-check="immediate"
             infinite-scroll-disabled="loading"
             infinite-scroll-distance="10">
      accept
      <notice-list :notice-data="noticeData" :no-data-bg="noDataBg" :no-data="noData"></notice-list>
    </section>
    <div class="notice_bottom">
      <span class="send" :class="tabId=='send'&&'active'" @click="changeTabId('send')">收件箱(10)</span>
      <span class="accept" :class="tabId=='accept'&&'active'" @click="changeTabId('accept')">发件箱(20)</span>
    </div>
    <!--写信-->
    <transition name="slide-left">
      <div class="write_edit container_top" v-if="showWrite">
        <!--头部-->
        <header-fix slot="header" title="写信" fixed>
          <span slot="left" @click="toggleWrite">取消</span>
          <span slot="right" @click="sendWrite">发送</span>
        </header-fix>
        <div class="write_body">
          <div class="write_item">
            <span>收件人:</span>
            <input type="text" v-model="sendInfo.person">
          </div>
          <div class="write_item">
            <span>主&nbsp;&nbsp;&nbsp;&nbsp;题:</span>
            <input type="text" v-model="sendInfo.theme">
          </div>
          <div class="write_item">
            <textarea v-model="sendInfo.content" placeholder="在此输入消息内容，输入完毕点击发送！"></textarea>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import Vue from 'vue';
  import {Indicator, InfiniteScroll, Toast} from 'mint-ui'
  import {headerFix, noticeList} from '../components'
  import {goBack} from '../service/mixins'
  import {GetNoticeInfoList} from '../service/getData'

  Vue.use(InfiniteScroll);
  export default {
    mixins: [goBack],
    data() {
      return {
        tabId: 'send',
        noticeData: [],
        page: 1,
        loading: false,
        immediate: false,
        noDataBg: false,
        noData: false,

        showWrite: false,
        sendInfo: {
          person: '',
          theme: '',
          content: '',
        }
      }
    },
    mounted() {
      this.getNoticeInfoList();
    },
    components: {
      headerFix,
      noticeList,
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
      sendWrite() {
        if (!this.sendInfo.person) {
          Toast({message: '收件人不能为空', position: 'bottom'});
        } else if (!this.sendInfo.theme) {
          Toast({message: '主题不能为空', position: 'bottom'});
        } else if (!this.sendInfo.content) {
          Toast({message: '内容不能为空', position: 'bottom'});
        } else {
          this.toggleWrite();
          console.log('sendInfo', this.sendInfo);
        }
      },
      toggleWrite() {
        this.showWrite = !this.showWrite;
      },
      changeTabId(tabId) {
        this.tabId = tabId;
      }
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
