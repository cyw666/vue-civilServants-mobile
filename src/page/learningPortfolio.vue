/**
* 学习档案
*/
<template>
  <div class="learning_portfolio container_top">
    <header-fix title="学习档案" fixed>
      <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
      <div slot="right" class="clearFix">
        <span class="filter" @click="toggleFilter">
          <span>排序</span>
          <i v-if="showFilter" class="webapp webapp-less"></i>
          <i v-if="!showFilter" class="webapp webapp-moreunfold"></i>
        </span>
      </div>
    </header-fix>
    <section v-infinite-scroll="getLearningData"
             infinite-scroll-immediate-check="immediate"
             infinite-scroll-disabled="loading"
             infinite-scroll-distance="10">
      <portfolio-list :learning-data="learningData" :no-data-bg="noDataBg" :no-data="noData"></portfolio-list>
    </section>
    <div class="filter_layer" v-if="showFilter" @click="toggleFilter"></div>
    <div class="filter_list" :class="{'show':showFilter}">
      <p class="filter_item filter_title"><span>筛选条件</span></p>
      <p class="filter_item" :class="sort=='All'&&'active'" @click="filterExam('All')">
        <span>时间降序</span>
        <i v-if="sort=='All'" class="webapp webapp-selected"></i>
      </p>
      <p class="filter_item" :class="sort=='Finish'&&'active'" @click="filterExam('Finish')">
        <span>时间升序</span>
        <i v-if="sort=='Finish'" class="webapp webapp-selected"></i>
      </p>
      <p class="filter_item" :class="sort=='UnFinish'&&'active'" @click="filterExam('UnFinish')">
        <span>学分降序</span>
        <i v-if="sort=='UnFinish'" class="webapp webapp-selected"></i>
      </p>
      <p class="filter_item" :class="sort=='UnJoin'&&'active'" @click="filterExam('UnJoin')">
        <span>学分升序</span>
        <i v-if="sort=='UnJoin'" class="webapp webapp-selected"></i>
      </p>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue';
  import {Indicator, InfiniteScroll} from 'mint-ui';
  import {headerFix, portfolioList} from '../components'
  import {GetExamType, GetExamList} from '../service/getData'
  import {goBack} from '../service/mixins'

  Vue.use(InfiniteScroll);
  export default {
    mixins: [goBack],
    data() {
      return {
        showFilter: false,
        sort: 'All',
        learningData: [
          {id: '1', title: '《梦想创造辉煌行动改变世界》获得学分2.0个学分', date: '2018-1-5'},
          {id: '2', title: '《从日本看钓鱼岛》获得学分2.0个学分', date: '2017-12-1'},
          {id: '3', title: '《梦想创造辉煌行动改变世界》获得学分2.0个学分', date: '2017-11-5'},
        ],
        loading: false,
        immediate: false,
        page: 1,
        noData: false,
        noDataBg: false,


        examData: []
      }
    },
    created() {
      
    },
    mounted() {
      this.getLearningData();
    },
    props: [],
    components: {
      headerFix,
      portfolioList,
    },
    computed: {},
    updated() {
      
    },
    methods: {
      async getLearningData() {
        console.log('getLearningData');

        this.noData = false;
        this.noDataBg = false;
        this.loading = true;
        Indicator.open();
        let data = await GetExamList({Page: this.page});
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
      toggleFilter() {
        this.showFilter = !this.showFilter;
      },
      //点击筛选搜索
      filterExam(sort) {
        this.page = 1;
        this.showFilter = false;
        this.sort = sort;
//        this.learningData = [];
        this.getLearningData();
      },
    },
    watch: {}
    
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .learning_portfolio {

  }

</style>
