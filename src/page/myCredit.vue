/**
* 我的学时
*/
<template>
  <div class="my_credit container_top">
    <!--头部-->
    <header-fix title="我的学分" fixed>
      <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
    </header-fix>
    <div class="cell_list_one">
      <mt-cell title="用户名" :value="userInfo.Username"></mt-cell>
      <mt-cell title="部门" :value="userInfo.GroupName"></mt-cell>
      <mt-cell title="用户职务" :value="userInfo.UserZW"></mt-cell>
    </div>
    <div class="split"></div>
    <div class="cell_list_two">
      <mt-cell title="必修课程学分" :value="userInfo.RequiredCredit"></mt-cell>
      <mt-cell title="选修课程学分" :value="userInfo.ElectiveCredit"></mt-cell>
      <mt-cell title="考试获得学分" :value="userInfo.ExamCredit"></mt-cell>
      <mt-cell title="培训获得学分" :value="userInfo.TrainningCredit"></mt-cell>
      <mt-cell title="获得总学分" :value="userInfo.TotalCredit"></mt-cell>
    </div>
    <div class="split"></div>
    <div class="cell_list_three">
      <mt-cell title="要求必修学分" :value="userInfo.NeedRequiredCredit"></mt-cell>
      <mt-cell title="要求总学分" :value="userInfo.NeedCredit"></mt-cell>
      <mt-cell title="考核结果" :value="userInfo.PassFlag?'通过':'未通过'"></mt-cell>
      <mt-cell title="您的学分排名" :value="userInfo.ScoreRank"></mt-cell>
    </div>

  </div>
</template>
<script>
  import Vue from 'vue'
  import {Cell} from 'mint-ui';
  import {mapState, mapActions} from 'vuex'
  import {headerFix} from '../components'

  Vue.component(Cell.name, Cell);

  export default {
    data() {
      return {}
    },
    mounted() {
      this.getUserInformation();
    },
    components: {
      headerFix
    },
    computed: {
      ...mapState(["userInfo"]),
    },
    methods: {
      ...mapActions(["getUserInformation"]),
      goBack() {
        this.$router.push('/personalCenter');
      },
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .my_credit {
    .cell_list_one, .cell_list_two, .cell_list_three {
      padding: 0 toRem(20px);
    }
    .mint-cell-wrapper {
      padding: 0;
    }
    .split {
      display: block;
      width: 100%;
      height: toRem(20px);
      background-color: #e8e8e8;
    }
  }
</style>
