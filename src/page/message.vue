/**
* 消息中心
*/
<template>
  <div class="message">
    <!--头部-->
    <header-fix title="消息中心" fixed>
      <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
    </header-fix>
    <section v-infinite-scroll="getMessageList"
             infinite-scroll-immediate-check="immediate"
             infinite-scroll-disabled="loading"
             infinite-scroll-distance="10">
      <div class="message_list">
        <div class="message_item" v-for="item in messageData" @click.stop="linkTo(item.Type,item.Id)">
          <div class="message_title" :class="{'read':item.ReadFlag}">{{item.Title}}</div>
          <div class="message_info clearFix">
            <span class="pull-left">{{item.Createdate | dateFilter('yyyy.MM.dd')}}</span>
            <span class="pull-right" v-if="item.Type=='Course'"><img src="../assets/video_ico.png" alt=""></span>
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
  import {goBack, toPlay} from '../service/mixins'
  import {GetMessageCenter, GetCourseDetail} from '../service/getData'

  export default {
    mixins: [goBack, toPlay],
    data() {
      return {
        keyword: '',
        messageData: [],
        loading: false,
        immediate: false,
        page: 1,
        noData: false,
        noDataBg: false,
      }
    },
    mounted() {
      this.getMessageList();
    },
    components: {
      headerFix
    },
    methods: {
      //获取消息列表
      async getMessageList() {
        this.noData = false;
        this.noDataBg = false;
        this.loading = true;
        Indicator.open();
        let data = await GetMessageCenter({Keyword: this.keyword, Page: this.page});
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
          this.messageData = this.messageData.concat(list);
          this.loading = false;
          this.page += 1;
        }
      },
      async getCourseDetail(Id) {
        let data = await GetCourseDetail({Id});
        if (data.Type == 1) {
          this.toPlay(data.Data.CourseType, Id);
        } else if (data.Type != 401) {
          MessageBox('警告', data.Message);
        }
      },
      linkTo: function (type, id) {
        if (type == 'Notice') {
          this.$router.push({path: '/messageDetail', query: {id, title: '消息详情'}})
        } else {
          this.getCourseDetail(id);
        }
      },
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .message {
    .message_list {
      padding: toRem(92px) toRem(30px) 0 toRem(30px);
    }
    .message_item {
      padding: toRem(30px) 0;
      border-bottom: 1px solid $border-color-base;
    }
    .message_title {
      margin-bottom: toRem(20px);
      color: $color-text-base;
      &.read {
        color: $color-text-secondary;
      }
    }
    .message_info {
      color: $color-text-secondary;
      img {
        width: toRem(33px);
      }
    }
  }
</style>
