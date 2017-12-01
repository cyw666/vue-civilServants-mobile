<template>
  <div class="footerFix">
    <mt-tabbar :value="selected" fixed>
      <mt-tab-item id="home" href="#/home">
        <img v-if="selected == 'home'" slot="icon" src="../assets/home_ico2.png">
        <img v-else slot="icon" src="../assets/home_ico1.png">
        主页
      </mt-tab-item>
      <mt-tab-item id="courseCenter" href="#/courseCenter">
        <img v-if="selected == 'courseCenter'" slot="icon" src="../assets/course_ico2.png">
        <img v-else slot="icon" src="../assets/course_ico1.png">
        课程
      </mt-tab-item>
      <mt-tab-item id="examCenter" href="#/examCenter">
        <img v-if="selected == 'exam'" slot="icon" src="../assets/exam_ico2.png">
        <img v-else slot="icon" src="../assets/exam_ico1.png">
        考试
      </mt-tab-item>
      <mt-tab-item id="personalCenter" href="#/personalCenter">
        <img v-if="selected == 'personalCenter'" slot="icon" src="../assets/person_ico2.png">
        <img v-else slot="icon" src="../assets/person_ico1.png">
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
  export default {
    name:'footerFix',
    props: ['selected'],
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .footerFix {
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
      margin: 0 auto toRem(5px);
    }
    .mint-tab-item-label{
      font-size: toRem(24px);
    }
  }
</style>
