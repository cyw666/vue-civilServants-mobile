/**
* 排行傍
*/
<template>
  <div class="rankList container_top">
    <!--头部-->
    <header-fix title="排行榜" fixed>
      <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
    </header-fix>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">学员排名</mt-tab-item>
      <mt-tab-item id="2">课程排名</mt-tab-item>
      <mt-tab-item id="3">单位排名</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <table class="table">
          <thead class="fixed_rank_title">
          <tr>
            <th class="rank">排名</th>
            <th class="student">学员</th>
            <th class="credit">学分</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in studentData" :key="item.index">
            <td v-if="index<3" class="rank"
                :class="{'rank_bg_one':index==0,'rank_bg_two':index==1,'rank_bg_three':index==2,}"></td>
            <td v-if="index>=3" class="rank">{{item.index}}</td>
            <td class="student">{{item.name}}</td>
            <td class="credit">{{item.value}}</td>
          </tr>
          </tbody>
        </table>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <table class="table">
          <thead class="fixed_rank_title">
          <tr>
            <th class="rank">排名</th>
            <th class="student">课程</th>
            <th class="credit">播放次数</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in courseData" :key="item.index">
            <td v-if="index<3" class="rank"
                :class="{'rank_bg_one':index==0,'rank_bg_two':index==1,'rank_bg_three':index==2,}"></td>
            <td v-if="index>=3" class="rank">{{item.index}}</td>
            <td class="student">{{item.name}}</td>
            <td class="credit">{{item.value}}</td>
          </tr>
          </tbody>
        </table>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <table class="table">
          <thead class="fixed_rank_title">
          <tr>
            <th class="rank">排名</th>
            <th class="student">单位</th>
            <th class="credit">学分</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in groupData" :key="item.index">
            <td v-if="index<3" class="rank"
                :class="{'rank_bg_one':index==0,'rank_bg_two':index==1,'rank_bg_three':index==2,}"></td>
            <td v-if="index>=3" class="rank">{{item.index}}</td>
            <td class="student">{{item.name}}</td>
            <td class="credit">{{item.value}}</td>
          </tr>
          </tbody>
        </table>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {Navbar, TabItem, TabContainer, TabContainerItem} from 'mint-ui'
  import {headerFix} from '../components'
  import {goBack} from '../service/mixins'
  import {GetRankInfoList} from '../service/getData'

  Vue.component(Navbar.name, Navbar);
  Vue.component(TabItem.name, TabItem);
  Vue.component(TabContainer.name, TabContainer);
  Vue.component(TabContainerItem.name, TabContainerItem);
  export default {
    mixins: [goBack],
    data() {
      return {
        selected: "1",
        studentData: [],
        courseData: [],
        groupData: [],
      }
    },
    mounted() {
      this.getRankList("1");
      this.getRankList("2");
      this.getRankList("3");
    },
    components: {
      headerFix,
    },
    methods: {
      //排行榜
      async getRankList(RankType) {
        let data = await GetRankInfoList({RankType});
        if (data.Type == 1) {
          if (RankType == "1") {
            this.studentData = data.Data.List;
          } else if (RankType == "2") {
            this.courseData = data.Data.List;
          } else if (RankType == "3") {
            this.groupData = data.Data.List;
          }
        }
      },
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .rankList {
    padding-top: toRem(280px);
    .mint-navbar {
      position: fixed;
      top: toRem(92px);
      left: 0;
      width: 100%;
      background-color: $fill-body;
      z-index: 10;
    }
    .fixed_rank_title {
      position: fixed;
      top: toRem(204px);
      left: 0;
      width: 100%;
      background-color: $fill-body;
      z-index: 10;
    }
    .table {
      width: 100%;
      text-align: center;
      th, td {
        text-align: center;
      }
      th {
        line-height: toRem(75px);
        text-align: center;
        background: #e8e8e8;
        font-size: 15px;
      }
      td {
        line-height: toRem(70px);
        font-size: 14px;
      }
      .rank {
        width: toRem(225px);
      }
      .student {
        width: toRem(302px);
        line-height: toRem(55px);
        padding: toRem(10px) 0;
        @include ellipsis_two(2);
      }
      .sm_height {
        line-height: toRem(40px);
      }
      .credit {
        width: toRem(225px);
      }
    }
  }
</style>
