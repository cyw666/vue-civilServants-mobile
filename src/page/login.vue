<template>
  <div class="userLogin container_top">
    <!--头部-->
    <header-fix title="登陆" fixed></header-fix>
    <div class="login_banner">
      <img src="../assets/login_ico.png">
    </div>
    <div class="user_login">
      <form>
        <div class="form-group">
          <i class="webapp webapp-account"></i>
          <input v-model="Account" class="form-control" type="text" placeholder="请输入用户名">
          <span class="acError" v-if="acError">用户名不能包含汉子</span>
        </div>
        <div class="form-group">
          <i class="webapp webapp-lock"></i>
          <input v-model="Password" class="form-control" type="password" placeholder="请输入密码">
          <span class="pwError" v-if="pwError">密码长度6~16位</span>
        </div>
      </form>
      <mt-button size="large" type="primary" @click.native="clickLogin">登陆</mt-button>
      <div class="checkbox">
        <label>
          <input v-model="Remember" type="checkbox"> &nbsp;记住密码
        </label>
        <a class="forget" @click="showForgetMessage">忘记密码？</a>
      </div>
      <div class="register_btn">
        <mt-button size="normal" type="primary" @click.native="toRegister" plain>
          注册账号
        </mt-button>
      </div>
    </div>
  </div>
</template>
<script>
  import CryptoJS from 'crypto-js'
  import {mapState, mapActions} from 'vuex'
  import {MessageBox, Toast, Indicator} from 'mint-ui'
  import {headerFix} from '../components'
  import {Login} from '../service/getData'
  import {getStore, setStore, removeStore, getQueryString} from '../plugins/utils'

  export default {
    name: 'login',
    data() {
      return {
        Account: '',
        Password: '',
        Remember: true,
        Code: '',
        backUrl: '',
        key: "jy365jy365jy365y",
        iv: "0392039203920300",
        pwError: false,
        acError: false
      }
    },
    components: {
      headerFix,
    },
    created() {
      this.Code = this.$route.query.code;
    },
    mounted() {
      let backUrl = this.$route.query.currentUrl;
      if (backUrl) {
        this.backUrl = backUrl;
      } else {
        this.backUrl = '/';
      }
      this.Account = this.decrypt(localStorage.getItem('a_app'));
      this.Password = this.decrypt(localStorage.getItem('p_app'));
      this.Remember = getStore("remember");
    },
    computed: {
      ...mapState(['userAgent', 'weLoginUrl', 'weIndexUrl'])
    },
    methods: {
      ...mapActions(["getUserAgent"]),
      async clickLogin() {
        if (!this.Account || !this.Password) {
          Toast({message: '用户名或密码不能为空！', position: 'bottom'});
          return;
        }
        let loginParams = {
          Account: this.Account,
          Password: this.Password,
          Code: this.Code,
          Mac: this.Account
        }
        Indicator.open();
        let res = await Login(loginParams);
        Indicator.close();
        if (res.Type == 1) {
          if (this.Remember) {
            this.encrypt("a_app", this.Account);
            this.encrypt("p_app", this.Password);
            setStore("remember", true);
          } else {
            this.encrypt("a_app", "");
            this.encrypt("p_app", "");
            setStore("remember", false);
          }
          /*判断 weixin,mobile*/
          if (this.userAgent.weixin) {
            window.location = this.weIndexUrl;
          } else {
            this.$router.replace(this.backUrl);
          }
        } else if (res.Type == 0) {
          MessageBox('警告', res.Message);
        }
        else {
          MessageBox('警告', "登陆异常!");
        }
      },
      encrypt(name, value) {
        let encryptText = CryptoJS.AES.encrypt(value, CryptoJS.enc.Utf8.parse(this.key), {
          iv: CryptoJS.enc.Utf8.parse(this.iv),
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
        });
        localStorage.setItem(name, encryptText);
      },
      decrypt(value) {
        let decryptText = CryptoJS.AES.decrypt(value || " ", CryptoJS.enc.Utf8.parse(this.key), {
          iv: CryptoJS.enc.Utf8.parse(this.iv),
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
        }).toString(CryptoJS.enc.Utf8);
        return decryptText;
      },
      toRegister() {
        this.$router.push("/register")
      },
      showForgetMessage() {
        MessageBox.alert("如果忘记密码，请联系本单位联络员或客服0571-28990788", "温馨提示");
      }
    },
    watch: {
      Password(val) {
        if (!val) return;
        let flag = false;
        let length = val.length;
        if (length < 6 || length > 16) {
          flag = true;
        }
        this.pwError = flag;
      },
      Account(val) {
        if (!val) return;
        let flag = 0;
        let reg = /^[\u4e00-\u9fa5]+$/;
        let arr = val.split('');
        for (var i in arr) {
          if (reg.test(arr[i])) {
            flag = true;
            break;
          }
        }
        this.acError = flag;
      },
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../style/mixin';

  .userLogin {
    width: 100%;
    height: 100vh;
    background: url("../assets/login_bg.png") no-repeat center bottom;
    background-size: 100% 100%;
    .login_banner {
      width: 100%;
      text-align: center;
      img {
        width: toRem(148px);
        padding: toRem(90px) 0;
      }
    }
    .user_login {
      padding: 0 toRem(40px);
      .form-control {
        border: none;
        padding-left: toRem(80px);
      }
      .form-group {
        border: 1px solid $border-color-base;
        background: #fff;
        position: relative;
        width: 100%;
        margin-bottom: toRem(20px);
        .webapp {
          color: $color-text-thirdly;
          position: absolute;
          top: toRem(23px);
          left: toRem(20px);
        }
      }
      .pwError, .acError {
        position: absolute;
        right: toRem(10px);
        top: 0;
        color: $brand-error;
        @include ht-lineHt(80px);
      }
      .checkbox {
        color: $color-text-thirdly;
        padding: 0 toRem(20px);
        input[type=checkbox] {
          width: toRem(24px);
          height: toRem(24px);
          margin: 0;
        }
      }
      .forget {
        @extend %pull-right;
        display: inline-block;
        @include ht-lineHt(90px);
        color: $color-text-thirdly;
      }
      .register_btn {
        padding-top: toRem(90px);
        text-align: center;
        .mint-button {
          height: toRem(75px);
        }
      }
    }
  }

</style>
