/**
* 班级园地
*/
<template>
  <div class="class_garden container_top">
    <!--头部-->
    <header-fix title="班级园地" fixed>
      <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
      <div slot="right" class="clearFix">
        <a class="filter" @click="toggleFilter">
          <span>筛选</span>
          <i v-if="showFilter" class="webapp webapp-less"></i>
          <i v-if="!showFilter" class="webapp webapp-moreunfold"></i>
        </a>
        <router-link class="pull-right" to="/classSearch">
          <i class="webapp webapp-search"></i>
        </router-link>
      </div>
    </header-fix>
    <mt-navbar v-model="typeId">
      <mt-tab-item v-for="item in classCategory" :key="item.TypeId" :id="item.TypeId">{{item.TypeName}}</mt-tab-item>
    </mt-navbar>

    <class-list :data="classGardenData" :no-data-bg="noDataBg"></class-list>
    <div class="filter_layer" v-if="showFilter" @click="toggleFilter"></div>
    <div class="filter_list" :class="{'show':showFilter}">
      <p class="filter_item filter_title"><span>筛选条件</span></p>
      <p class="filter_item" @click="filterClass('')">
        <i class="webapp webapp-order" style="color: #00aeff;"></i>
        <span>默认</span>
        <i v-if="joinStatus==''" class="webapp webapp-selected" style="color: #ee3f3f;"></i>
      </p>
      <p class="filter_item" @click="filterClass('Join')">
        <i class="webapp webapp-smile" style="color: #5fbe81;"></i>
        <span>已报名</span>
        <i v-if="joinStatus=='Join'" class="webapp webapp-selected" style="color: #ee3f3f;"></i>
      </p>
      <p class="filter_item" @click="filterClass('UnAudit')">
        <i class="webapp webapp-cry" style="color: #ee3f3f;"></i>
        <span>审核中</span>
        <i v-if="joinStatus=='UnAudit'" class="webapp webapp-selected" style="color: #ee3f3f;"></i>
      </p>
      <p class="filter_item" @click="filterClass('UnJoin')">
        <i class="webapp webapp-cry" style="color: #999999;"></i>
        <span>未报名</span>
        <i v-if="joinStatus=='UnJoin'" class="webapp webapp-selected" style="color: #ee3f3f;"></i>
      </p>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { Indicator, Navbar, TabItem } from 'mint-ui'
  import { headerFix, classList } from '../components'
  import { goBack } from '../service/mixins'
  import { GetTrainingTypeList, GetTrainingClass } from '../service/getData'

  Vue.component(Navbar.name, Navbar)
  Vue.component(TabItem.name, TabItem)
  export default {
    mixins: [goBack],
    data () {
      return {
        typeId: '', //培训班类型
        showFilter: false, //是否显示筛选
        joinStatus: '',//筛选type
        classCategory: [],
        classGardenData: [],
        noDataBg: false,
      }
    },
    created () {

    },
    mounted () {
      this.getClassCategory()
    },
    components: {
      headerFix,
      classList,
    },
    methods: {
      /*筛选切换*/
      toggleFilter () {
        this.showFilter = !this.showFilter
      },
      //班级分类
      async getClassCategory () {
        let data = await GetTrainingTypeList()
        if (data.Type == 1) {
          this.typeId = data.Data.TrainClassList[0].TypeId
          this.classCategory = data.Data.TrainClassList
          this.getClassList()
        }
      },
      //班级列表
      async getClassList () {
        this.noDataBg = false
        Indicator.open()
        let data = await GetTrainingClass({TypeId: this.typeId, JoinStatus: this.joinStatus})
        Indicator.close()
        if (data.Type == 1) {
          let list = data.Data.List
          if (list.length == 0) {
            this.noDataBg = true
          }
          this.classGardenData = list
        }
      },
      //点击筛选搜索
      filterClass (type) {
        this.showFilter = false
        if (type != this.joinStatus) {
          this.joinStatus = type
        }
      }
    },
    watch: {
      typeId: function (val) {
        this.getClassList()
      },
      joinStatus: function (val) {
        this.getClassList()
      }
    }

  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .class_garden {
    padding-top: toRem(204px);
    .mint-navbar {
      position: fixed;
      top: toRem(92px);
      width: 100%;
      z-index: 100;
    }
    .filter {
      @extend %pull-left;
      color: $color-text-reverse;
      font-size: 14px;
      margin-right: toRem(10px);
      width: toRem(110px);
      height: toRem(92px);
      line-height: toRem(92px);
      @include flex();
      align-items: center;
      .webapp {
        font-size: 20px;
      }
    }
    .search {
      width: toRem(39px);
    }
    .filter_layer {
      position: absolute;
      top: toRem(92px);
      left: 0;
      right: 0;
      height: 100vh;
      background-color: rgba(0, 0, 0, .4);
      z-index: 50;
    }
    .filter_list {
      position: absolute;
      max-height: 0;
      overflow: hidden;
      left: 0;
      right: 0;
      top: toRem(92px);
      z-index: 100;
      background-color: $fill-base;
      font-size: 15px;
      transition: max-height ease 0.5s;
      &.show {
        max-height: toRem(430px);
      }
    }
    .filter_item {
      @include ht-lineHt(86px);
      padding: 0 toRem(30px);
      span {
        margin-left: toRem(30px);
      }
      img {
        width: toRem(28px);
      }
      .webapp-selected {
        @extend %pull-right;
        font-size: 25px;
      }
      &.filter_title {
        background-color: $fill-grey;
        padding: 0;
        span {
          margin-left: toRem(30px);
        }
      }
    }
  }
</style>
