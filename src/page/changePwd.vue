/**
* 修改密码
*/
<template>
  <div class="change_pwd">
    <!--头部-->
    <header-fix title="修改密码" fixed>
      <a @click="goBack" slot="left"><img class="back_img" src="../assets/arrow.png" alt=""></a>
    </header-fix>
    <div class="change_mobile_list">
      <div class="change_mobile_item">
        <input class="old_pwd" v-model="sendData.OldPassword" type="text" placeholder="输入旧密码"/>
      </div>
      <div class="change_mobile_item">
        <input class="new_pwd" v-model="sendData.Password" type="text" placeholder="输入新密码"/>
      </div>
      <div class="change_mobile_item">
        <input class="confirm_pwd" v-model="confirmPwd" type="text" placeholder="确认新密码"/>
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
          MessageBox('警告', '输入旧密码！');
        } else if (!this.sendData.Password) {
          MessageBox('警告', '请输入新密码！');
        } else if (!this.isPassConfirm) {
          MessageBox('警告', '两次输入新密码不一致！');
        } else if (this.sendData.OldPassword == this.sendData.Password) {
          MessageBox('警告', '新密码与旧密码不能一致！');
        } else {
          let data = await SetUserPassword(this.sendData);
          if (data.Type == 1) {
            Toast({message: "修改成功！", position: 'bottom', duration: 2000});
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
    padding-top: toRem(92px);
    height: 92vh;
    background-color: $fill-body;
    .change_mobile_item {
      background-color: $fill-base;
      margin-top: toRem(20px);
      input {
        display: inline-block;
        width: 90%;
        @include ht-lineHt(88px);
        padding-left: toRem(20px);
        font-size: toRem(28px);
      }
    }
    .submit_edit {
      margin-top: toRem(50px);
      padding: 0 toRem(30px);
    }
  }
</style>
