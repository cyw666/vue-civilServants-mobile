/**
* template
*/
<template>
  <div class="message_detail">
    <!--头部-->
    <header-fix title="消息详情" fixed>
      <a @click="goBack" slot="left"><img class="back_img" src="../assets/arrow.png" alt=""></a>
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
        Indicator.close();
        let message = data.toString().split("<body>")[1].split("</body>");
        this.messageContent = message[0];
      },
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .articleDet {
    font-size: toRem(32px);
    text-indent: 2em;
    padding: toRem(20px);
    margin-top: toRem(92px);
  }
</style>
