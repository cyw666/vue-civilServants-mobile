/**
* 考试中心
*/
<template>
  <div class="examCenter">
    <Header-fix :title="examTitle" fixed>
      <a slot="left" @click="toggleNav"><img class="slide" src="../assets/slide.png"></a>
      <div slot="right" class="clearFix">
        <a class="filter" @click="toggleFilter">
          <span>筛选</span>
          <img v-if="showFilter" src="../assets/pullup.png" alt=""/>
          <img v-if="!showFilter" src="../assets/dropdown.png" alt=""/>
        </a>
        <router-link class="pull-right" to="/examSearch">
          <img class="search" src="../assets/search.png" alt=""/>
        </router-link>
      </div>
    </Header-fix>
    <div class="container">
      <nav-slide :show="showSlide" @showChange="showChange">
        <div slot="left" class="category">
          <tree :data="examCategory" :on-select="searchExam" :scroll-bottom="getExamList"
                :loading="loading"></tree>
        </div>
        <div slot="right">
          <section v-infinite-scroll="getExamList"
                   infinite-scroll-immediate-check="immediate"
                   infinite-scroll-disabled="loading"
                   infinite-scroll-distance="5">
            <exam-list :exam-data="examData"
                       :no-data-bg="noDataBg"
                       :no-data="noData">
            </exam-list>
          </section>
        </div>
      </nav-slide>
    </div>
    <div class="filter_layer" v-if="showFilter"  @click="toggleFilter"></div>
    <div class="filter_list" :class="{'show':showFilter}">
      <p class="filter_item"><span>筛选条件</span></p>
      <p class="filter_item" @click="filterExam('All')">
        <img src="../assets/default.png" alt="">
        <span>默认</span>
        <img v-if="examType=='All'" src="../assets/gou.png" alt="" class="gou">
      </p>
      <p class="filter_item" @click="filterExam('Finish')">
        <img src="../assets/pass.png" alt="">
        <span>已过</span>
        <img v-if="examType=='Finish'" src="../assets/gou.png" alt="" class="gou">
      </p>
      <p class="filter_item" @click="filterExam('UnFinish')">
        <img src="../assets/unpass.png" alt="">
        <span>未过</span>
        <img v-if="examType=='UnFinish'" src="../assets/gou.png" alt="" class="gou">
      </p>
      <p class="filter_item" @click="filterExam('UnJoin')" >
        <img src="../assets/unexam.png" alt="">
        <span>未考</span>
        <img v-if="examType=='UnJoin'" src="../assets/gou.png" alt="" class="gou">
      </p>
    </div>
    <Footer-fix selected="examCenter"></Footer-fix>
  </div>
</template>
<script>
  import {Indicator} from 'mint-ui';
  import HeaderFix from '../components/header.vue'
  import FooterFix from '../components/footerFix.vue'
  import NavSlide from '../components/navSlide.vue'
  import tree from '../components/tree.vue'
  import examList from '../components/examList.vue'
  import {GetExamType, GetExamList} from '../service/getData'

  export default {
    data() {
      return {
        examTitle: "考试中心",
        showFilter: false, //是否显示筛选
        showSlide: false, //是否显示滑动
        examType: "All", //筛选type
        examCategory: [],
        typeId: 0, //考试typeId
        examData: [], //考试列表数据
        loading: false,
        immediate: true,
        page: 1,
        noData: false,
        noDataBg: false,
      }
    },
    mounted() {
      this.getExamCategory();
//      this.getExamList();
    },
    components: {
      HeaderFix,
      FooterFix,
      NavSlide,
      tree,
      examList,
    },
    methods: {
      toggleNav() {
        this.showSlide = !this.showSlide;
        this.showFilter = false;
      },
      showChange(val) {
        this.showSlide = val;
        this.showFilter = false;
      },
      toggleFilter() {
        this.showFilter = !this.showFilter;
        this.showSlide = false;
      },
      //考试分类
      async getExamCategory() {
        let data = await GetExamType();
        if (data.Type == 1) {
          let list = data.Data.List;
          let category = list.map((item,index)=>{
            return {...item,...{Name:item.TypeName,Nodes:null}}
          })
          this.examCategory = category;
        }
      },
      //考试列表
      async getExamList() {
        this.noData = false;
        this.noDataBg = false;
        this.loading = true;
        Indicator.open();
        let data = await GetExamList({ExamType:this.examType,TypeId: this.typeId, Page: this.page});
        Indicator.close();
        if (data.Type == 1) {
          let list = data.Data.List;
          if (list.length == 0 && this.page > 1) {
            this.noData = true;
            return;
          }
          if (list.length == 0 && this.page == 1) {
            this.noDataBg = true;
            return;
          }
          this.examData = this.examData.concat(list);
          this.loading = false;
          this.page += 1;
        }
      },
      //点击分类搜索
      searchExam(data) {
        this.page = 1;
        this.typeId = data.TypeId;
        this.examTitle = data.Name;
        this.showSlide = false;
        this.showFilter = false;
        this.examData = [];
        this.getExamList();
      },
      //点击筛选搜索
      filterExam(type){
        this.page = 1;
        this.showFilter = false;
        this.showSlide = false;
        this.examType = type;
        this.examData = [];
        this.getExamList();
      }
    },
    watch: {}

  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .examCenter {
    .slide {
      width: toRem(35px);
    }
    .filter {
      @extend %pull-left;
      color: $color-text-reverse;
      font-size: toRem(28px);
      margin-right: toRem(10px);
      width: toRem(110px);
      height: toRem(92px);
      line-height: toRem(92px);
      img {
        width: toRem(32px);
      }
    }
    .search {
      width: toRem(39px);
    }
    .container {
      padding-top: toRem(92px);
      width: 100%;
      height: toRem(1137px);
      overflow: hidden;
    }
    .category {
      padding: toRem(20px) 0;
    }
    .filter_layer {
      position: absolute;
      top: toRem(92px);
      left: 0;
      right: 0;
      height:  toRem(1137px);
      background-color: rgba(0,0,0,.4);
      z-index: 50;
    }
    .filter_list{
      position: absolute;
      max-height: 0;
      overflow: hidden;
      left: 0;
      right: 0;
      top: toRem(92px);
      z-index: 100;
      background-color: $fill-base;
      padding: 0 toRem(30px);
      font-size: toRem(30px);
      transition: max-height ease 0.5s;
      &.show{
        max-height: toRem(430px);
      }
    }
    .filter_item{
      @include ht-lineHt(86px);
      span{
        margin-left: toRem(30px);
      }
      img{
        width: toRem(28px);
      }
      .gou{
        width: toRem(26px);
        @extend %pull-right;
        margin-top: toRem(32px);
      }
    }
  }
</style>
