/**
* 消息详情
*/
<template>
  <div class="message_detail container_top">
    <!--头部-->
    <header-fix :title="title" fixed>
      <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
    </header-fix>
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
        title: '',
        messageContent: '',
        messageId: ''
      }
    },
    created() {
      this.messageId = this.$route.query.id || '';
      this.title = this.$route.query.title || '';
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

  .message_detail {
    .articleDet {
      font-size: 16px;
      padding: toRem(20px);
    }
  }
</style>
