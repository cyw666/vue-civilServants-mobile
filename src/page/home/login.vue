<template>
  <div class="userLogin">
    <div class="login_banner">
      <img src="../../assets/login_ico.png">
    </div>
    <div class="user_login">
      <form class="form-horizontal">
        <div class="form-group">
          <label for="userName" class="control-label">用户名</label>
          <input v-model="Account" class="form-control" id="userName" type="text" placeholder="请输入用户名">
          <span class="acError" v-if="acError">用户名不能包含汉子</span>
        </div>
        <div class="form-group">
          <label for="userPassword" class="control-label">密 码</label>
          <input v-model="Password" class="form-control" id="userPassword" type="password" placeholder="请输入密码">
          <span class="pwError" v-if="pwError">密码长度6~16位</span>
        </div>
      </form>
      <div class="checkbox">
        <label>
          <input v-model="Remember" type="checkbox"> &nbsp;记住密码
        </label>
        <a class="forget" @click="showForgetMessage">忘记密码？</a>
      </div>
      <mt-button size="large" type="primary" @click="clickLogin">确定</mt-button>
      <div class="register">
        <mt-button size="normal" type="primary" @click="toRegister" plain>
          注册账号
        </mt-button>
        <!--<router-link :to="{ path: '/login', query: { path: '/home',params:JSON.stringify({id:10})}}">Register</router-link>-->
      </div>
    </div>
  </div>
</template>
<script>
  import CryptoJS from 'crypto-js'
  import {mapState, mapActions} from 'vuex'
  import {MessageBox} from 'mint-ui'
  import {Login} from '../../service/getData'
  import {getStore, setStore, removeStore} from '../../plugins/utils'

  export default {
    name: 'login',
    data() {
      return {
        Account: '',
        Password: '',
        Remember: true,
        Code: '',
        key: "jy365jy365jy365y",
        iv: "0392039203920300",
        pwError: false,
        acError: false,
      }
    },
    mounted() {
      this.Code = this.$route.query.code || '';
      this.Account = this.decrypt(localStorage.getItem('a_app'));
      this.Password = this.decrypt(localStorage.getItem('p_app'));
      this.Remember = getStore("remember");
//      this.getUserInformation();
    },
    props: [],
    components: {},
    computed: {
      ...mapState([])
    },
    updated() {

    },
    methods: {
      ...mapActions(["getUserInformation"]),
      async clickLogin() {
        if (!this.Account || !this.Password) {
          alert('用户名或密码不能为空！');
          return
        }
        let loginParams = {
          Account: this.Account,
          Password: this.Password,
          Code: this.Code,
          Mac: this.Account
        }
        let res = await Login(loginParams);
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
          let path = this.$route.query.path || '/';
          let params = this.$route.query.params;
          let query = params&&JSON.parse(params);
          this.$router.push({path, query});
        } else if (res.Type == 0) {
          alert(res.Message);
        }
        else {
          alert('登陆失败！');
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
      showForgetMessage(){
        MessageBox.alert("如果忘记密码，请联系本单位联络员或客服0571-28990788","温馨提示");
      }
    },
    watch: {
      Password(val) {
        let flag = false;
        let length = val.length;
        if (length < 6 || length > 16) {
          flag = true;
        }
        this.pwError = flag;
      },
      Account(val) {
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
  @import '../../style/mixin';

  .userLogin {
    height: 100vh;
    background: url("../../assets/login_bg.png") no-repeat center bottom;
    background-size: 100% 100%;
    .login_banner {
      width: 100%;
      overflow: hidden;
      img {
        display: block;
        margin: toRem(125px) auto;
        width: toRem(148px);
      }
    }
    .user_login {
      border-top: 2px solid #ddd;
      padding-left: toRem(20px);
      padding-right: toRem(20px);
      .form-horizontal {
        background: #fff;
      }
      .form-control {
        border: none;
      }
      .form-group {
        border-bottom: 2px solid $border-color-base;
        position: relative;
        label {
          width: toRem(120px);
        }
      }
      .pwError, .acError {
        position: absolute;
        right: 0;
        top: 0;
        color: $brand-error;
        @include ht-lineHt(90px);
      }
      .mint-button {
        margin-top: toRem(30px);
      }
      .checkbox {
        color: $color-text-thirdly;
        padding: 0 toRem(20px);
      }
      .forget {
        @extend %pull-right;
        display: inline-block;
        @include ht-lineHt(90px);
        color: $color-text-thirdly;
      }
      .register {
        margin-top: toRem(150px);
        text-align: center;
      }
    }
  }

</style>
