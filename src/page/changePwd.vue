/**
* 修改密码
*/
<template>
  <div class="change_pwd container_top">
    <!--头部-->
    <header-fix title="修改密码" fixed>
      <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
    </header-fix>
    <div class="change_mobile_list">
      <div class="change_mobile_item">
        <input class="old_pwd" v-model="sendData.OldPassword" type="password" placeholder="输入旧密码"/>
      </div>
      <div class="change_mobile_item">
        <input class="new_pwd" v-model="sendData.Password" type="password" placeholder="输入新密码"/>
      </div>
      <div class="change_mobile_item">
        <input class="confirm_pwd" v-model="confirmPwd" type="password" placeholder="确认新密码"/>
      </div>
    </div>
    <div class="submit_edit">
      <mt-button type="primary" size="large" @click.native="updatePwd">提交</mt-button>
    </div>
  </div>
</template>
<script>
  import {MessageBox, Toast} from 'mint-ui'
  import {headerFix} from '../components'
  import {goBack} from '../service/mixins'
  import {SetUserPassword} from '../service/getData'

  export default {
    mixins: [goBack],
    data() {
      return {
        sendData: {
          OldPassword: '',
          Password: ''
        },
        confirmPwd: '',
        isPassConfirm: false,
      }
    },
    components: {
      headerFix
    },
    methods: {
      async updatePwd() {
        if (!this.sendData.OldPassword) {
          Toast({message: "输入旧密码！", position: 'bottom'});
        } else if (!this.sendData.Password) {
          Toast({message: "请输入新密码！", position: 'bottom'});
        } else if (this.sendData.OldPassword == this.sendData.Password) {
          Toast({message: "新旧密码不能一致！", position: 'bottom'});
        } else if (!this.isPassConfirm) {
          Toast({message: "两次输入新密码不一致！", position: 'bottom'});
        } else {
          let data = await SetUserPassword(this.sendData);
          if (data.Type == 1) {
            Toast({message: "修改成功,请重新登陆！", position: 'bottom'});
            this.$router.push('/login');
          } else if (data.Type != 401) {
            MessageBox('警告', data.Message);
          }
        }
      },
    },
    watch: {
      confirmPwd: function (val) {
        if (val == this.sendData.Password) {
          this.isPassConfirm = true;
        } else {
          this.isPassConfirm = false;
        }
      },
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .change_pwd {
    background-color: $fill-body;
    .change_mobile_item {
      background-color: $fill-base;
      margin-top: toRem(20px);
      input {
        display: inline-block;
        width: 100%;
        padding: toRem(20px) toRem(20px);
        line-height: 1.2em;
        font-size: 14px;
      }
    }
    .submit_edit {
      margin-top: toRem(50px);
      padding: 0 toRem(30px);
    }
  }
</style>
