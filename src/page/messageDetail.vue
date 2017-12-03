/**
* template
*/
<template>
  <div class="message_detail">
    <!--头部-->
    <Header-fix title="消息详情" fixed>
      <a @click="goBack" slot="left"><img class="back_img" src="../assets/arrow.png" alt=""></a>
    </Header-fix>
    <div class="articleDet" v-html="messageContent"></div>
  </div>
</template>
<script>
  import HeaderFix from '../components/header.vue'
  import {goBack} from '../service/mixins'
  import {GetNoticeInfoContent} from '../service/getData'
  export default {
    mixins: [goBack],
    data() {
      return {
        messageContent:'',
        messageId:''
      }
    },
    created() {
      this.messageId = this.$route.query.id||'';
    },
    mounted() {
      this.getMessageContent(this.messageId);
    },
    props: [],
    components: {
      HeaderFix
    },
    methods: {
      async getMessageContent(Id){
        let data = await GetNoticeInfoContent({Id});
//        let reg = /<body>(.*)<\/body>/g;
//        let message = reg.exec(data.toString());
        let message = data.toString().split("<body>")[1].split("</body>");
        this.messageContent = message[0];
      },
    },
    watch: {}
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";
  .articleDet{
    font-size: toRem(32px);
    text-indent: 2em;
    padding: toRem(20px);
    margin-top: toRem(92px);
  }
</style>
