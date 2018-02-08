<template>
  <div class="footerFix">
    <mt-tabbar :value="selected" fixed>
      <mt-tab-item id="home" href="#/home">
        <img class="footer_icon_1" v-if="selected == 'home'" slot="icon" src="../assets/home_ico2.png">
        <img class="footer_icon_1" v-else slot="icon" src="../assets/home_ico1.png">
        <!--<i v-if="selected == 'home'" slot="icon" class="webapp webapp-homefill" style="color: #ec4747"></i>
        <i v-else slot="icon" class="webapp webapp-home" style="color: #8a8a8a"></i>-->
        主页
      </mt-tab-item>
      <mt-tab-item id="courseCenter" href="#/courseCenter">
        <img class="footer_icon_2" v-if="selected == 'courseCenter'" slot="icon" src="../assets/course_ico2.png">
        <img class="footer_icon_2" v-else slot="icon" src="../assets/course_ico1.png">
        课程
      </mt-tab-item>
      <mt-tab-item id="examCenter" href="#/examCenter">
        <img class="footer_icon_3" v-if="selected == 'examCenter'" slot="icon" src="../assets/exam_ico2.png">
        <img class="footer_icon_3" v-else slot="icon" src="../assets/exam_ico1.png">
        <!--<i v-if="selected == 'examCenter'" slot="icon" class="webapp webapp-exam-fill" style="color: #ec4747"></i>
        <i v-else slot="icon" class="webapp webapp-examination_paper" style="color: #8a8a8a"></i>-->
        考试
      </mt-tab-item>
      <mt-tab-item id="personalCenter" href="#/personalCenter">
        <img class="footer_icon_4" v-if="selected == 'personalCenter'" slot="icon" src="../assets/person_ico2.png">
        <img class="footer_icon_4" v-else slot="icon" src="../assets/person_ico1.png">
        <!--<i v-if="selected == 'personalCenter'" slot="icon" class="webapp webapp-accountfilling" style="color: #ec4747"></i>
        <i v-else slot="icon" class="webapp webapp-account" style="color: #8a8a8a"></i>-->
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { Tabbar, TabItem } from 'mint-ui'

  Vue.component(Tabbar.name, Tabbar)
  Vue.component(TabItem.name, TabItem)
  export default {
    name: 'footerFix',
    props: ['selected'],
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .footerFix {
    .mint-tab-item-icon {
      .webapp {
        font-size: 24px;
      }
    }
    .mint-tabbar > .mint-tab-item.is-selected {
      background-color: #eaeaea;
      color: $brand-primary;
    }
    .mint-tab-item {
      padding: toRem(14px) 0;
    }
    .mint-tab-item-icon {
      width: toRem(48px);
      height: toRem(48px);
      margin: 0 auto 0;
      & > {
        .footer_icon_1 {
          width: toRem(48px);
          height: toRem(41px);
          margin: 0 auto;
        }
        .footer_icon_2 {
          width: toRem(38px);
          height: toRem(39px);
          margin: 0 auto;
        }
        .footer_icon_3 {
          width: toRem(42px);
          height: toRem(38px);
          margin: 0 auto;
        }
        .footer_icon_4 {
          width: toRem(38px);
          height: toRem(39px);
          margin: 0 auto;
        }
      }
    }
    .mint-tab-item-label {
      font-size: 12px;
    }
  }
</style>
