/**
* 签到列表
*/
<template>
  <div class="sign_list">
    <ul>
      <li v-for="item in signData">
        <div>
          <span>上午</span>
          <span class="class_on_off">(上课)</span>
          <span class="sign_or_not sign_in" v-if="item.AmSignIn.SignFlag == true">已签</span>
          <span class="sign_or_not" v-if="item.AmSignIn.SignFlag == false">未签</span>
          <span class="finish">上午</span>
          <span class="class_on_off">(下课)</span>
          <span class="sign_or_not sign_in" v-if="item.AmSignOut.SignFlag == true">已签</span>
          <span class="sign_or_not" v-if="item.AmSignOut.SignFlag == false">未签</span>
        </div>
        <div>
          <span>下午</span>
          <span class="class_on_off">(上课)</span>
          <span class="sign_or_not sign_in" v-if="item.PmSignIn.SignFlag == true">已签</span>
          <span class="sign_or_not" v-if="item.PmSignIn.SignFlag == false">未签</span>
          <span class="finish">下午</span>
          <span class="class_on_off">(下课)</span>
          <span class="sign_or_not sign_in" v-if="item.PmSignOut.SignFlag == true">已签</span>
          <span class="sign_or_not" v-if="item.PmSignOut.SignFlag == false">未签</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        signData: [
          {
            "TrainingId": 1,
            "OpenFlag": true,
            "AmSignIn": {
              "SignType": "sample string 1",
              "BeginTime": "00:00:00.1234567",
              "EndTime": "00:00:00.1234567",
              "SignFlag": true,
              "RequireSignTime": "sample string 5",
              "SignDate": "2017-12-06 10:16:40"
            },
            "AmSignOut": {
              "SignType": "sample string 1",
              "BeginTime": "00:00:00.1234567",
              "EndTime": "00:00:00.1234567",
              "SignFlag": true,
              "RequireSignTime": "sample string 5",
              "SignDate": "2017-12-06 10:16:40"
            },
            "PmSignIn": {
              "SignType": "sample string 1",
              "BeginTime": "00:00:00.1234567",
              "EndTime": "00:00:00.1234567",
              "SignFlag": true,
              "RequireSignTime": "sample string 5",
              "SignDate": "2017-12-06 10:16:40"
            },
            "PmSignOut": {
              "SignType": "sample string 1",
              "BeginTime": "00:00:00.1234567",
              "EndTime": "00:00:00.1234567",
              "SignFlag": true,
              "RequireSignTime": "sample string 5",
              "SignDate": "2017-12-06 10:16:40"
            },
            "SignInCode": "sample string 3",
            "SignInDate": "2017-12-06 10:16:40"
          },
        ]
      }
    },
    created() {
      
    },
    mounted() {
      
    },
    props: [],
    components: {},
    computed: {},
    updated() {
      
    },
    methods: {},
    watch: {}
    
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .sign_list {
    ul {
      padding: toRem(20px) toRem(60px);
      line-height: toRem(40px);
    }
    .sign_or_not {
      color: $brand-error;
      margin-left: toRem(20px);
    }
    .sign_in {
      color: $brand-success;
    }
    .finish {
      margin-left: toRem(95px);
    }
  }
</style>
