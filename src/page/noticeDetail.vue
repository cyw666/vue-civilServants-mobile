/**
* 消息详情
*/
<template>
  <div class="notice_detail container_top">
    <!--头部-->
    <header-fix :title="title" fixed>
      <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
    </header-fix>
    <!--<div class="notice_title">系统消息：网上展厅作品(大型纪录片《走四方》</div>
    <div class="notice_desc">
      <span class="send_person">发送人：张某某</span>
      <span class="send_date">发布日期：2017-1-4</span>
    </div>-->
    <div class="articleDet" v-html="messageContent"></div>
  </div>
</template>
<script>
  import {Indicator} from 'mint-ui'
  import {headerFix} from '../components'
  import {goBack} from '../service/mixins'
  import noCourse from '../assets/noCourse.png'
  import {GetNoticeInfoContent} from '../service/getData'

  export default {
    mixins: [goBack],
    data() {
      return {
        title: '公告详情',
        messageContent: '',
        messageId: ''
      }
    },
    created() {
      this.messageId = this.$route.query.id || '';
    },
    mounted() {
      this.getMessageContent(this.messageId);
    },
    components: {
      headerFix
    },
    methods: {
      async getMessageContent(Id) {
        Indicator.open();
        let data = await GetNoticeInfoContent({Id});
//        Indicator.close();
        let message = data.toString().split("<body>")[1].split("</body>");
        this.messageContent = message[0];
      },
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .notice_detail {
    background-color: $fill-base;
    .articleDet {
      font-size: 16px;
      padding: toRem(40px) toRem(20px) toRem(20px) toRem(20px);
    }
    .notice_title {
      padding: toRem(20px) toRem(20px);
      font-size: 20px;
      font-weight: 600;
    }
    .notice_desc {
      @extend %clearFix;
      color: $color-text-thirdly;
      padding: 0 toRem(20px);
      .send_person {
        @extend %pull-left;
      }
      .send_date {
        @extend %pull-right;
      }
    }
  }
</style>
