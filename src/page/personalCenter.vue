/**
* 个人中心
*/
<template>
  <div class="personalCenter">
    <div class="person_top">
      <img src="../assets/person_cener_avatar.png" alt="">
      <div class="my_info">
        <h4>{{userInfo.Username}}</h4>
        <p>规定学分：{{userInfo.NeedCredit}}<span class="shuxian">|</span>已修学分：{{userInfo.TotalCredit}}</p>
      </div>
    </div>
    <div class="cell_list_one">
      <mt-cell title="我的学分" is-link to="/myCredit">
        <i slot="icon" class="webapp webapp-flower" style="color: #fde58b;"></i>
      </mt-cell>
      <mt-cell title="我的课程" is-link to="/myCourse">
        <i slot="icon" class="webapp webapp-kecheng" style="color: #ffb5aa;"></i>
      </mt-cell>
    </div>
    <div class="cell_list_two">
      <mt-cell title="我的考试" is-link to="/examCenter">
        <i slot="icon" class="webapp webapp-exam" style="color: #c0e5a2;"></i>
      </mt-cell>
      <mt-cell title="信息反馈" is-link to="/advise">
        <i slot="icon" class="webapp webapp-advise" style="color: #cebcf0;"></i>
      </mt-cell>
    </div>
    <div class="cell_list_three">
      <mt-cell title="设置" is-link to="/setting">
        <i slot="icon" class="webapp webapp-set" style="color: #ecc1dd;"></i>
      </mt-cell>
    </div>
    <div class="exit">
      <mt-button @click.native="exit" type="primary" size="large">退出登录</mt-button>
    </div>
    <footer-fix selected="personalCenter"></footer-fix>
  </div>
</template>
<script>
  import {mapState, mapActions} from 'vuex'
  import {footerFix} from '../components'
  import {LoginOut} from '../service/getData'

  export default {
    data() {
      return {}
    },
    mounted() {
      this.getUserInformation();
    },
    computed: {
      ...mapState(["userInfo"]),
    },
    components: {
      footerFix
    },
    methods: {
      ...mapActions(["getUserInformation"]),
      async exit() {
        let data = await LoginOut();
        if (data.Type == 1) {
          this.$router.push('/login')
        }
      }
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .personalCenter {
    height: 100vh;
    background-color: $fill-body;
    .person_top {
      width: 10rem;
      height: toRem(390px);
      background: url("../assets/person_center_bg.png") no-repeat center;
      background-size: 10rem toRem(390px);
      @include flex(center);
      align-items: center;
      img {
        @include square(128px);
        margin-top: toRem(65px);
      }
      .my_info {
        padding: 0 toRem(30px);
        color: $color-text-reverse;
        margin-top: toRem(65px);
        h4 {
          font-size: 16px;
          color: $color-text-reverse;
          margin-bottom: toRem(30px);
        }
        p {
          font-size: 14px;
        }
        .shuxian {
          margin: 0 toRem(30px);
        }
      }
    }

    .cell_list_one, .cell_list_two, .cell_list_three {
      padding: 0 toRem(30px);
      background-color: $fill-base;
    }

    .cell_list_two {
      margin: toRem(30px) 0;
    }

    .exit {
      padding-bottom: toRem(110px);
      margin: toRem(60px) toRem(30px) 0 toRem(40px);
    }
    .webapp{
      font-size: toRem(32px);
    }
    .flower{
      color: #fde58b;
    }
  }
</style>
