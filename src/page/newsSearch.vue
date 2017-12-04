/**
* 课程搜索
*/
<template>
  <div class="newsSearch">
    <!--头部-->
    <header-fix title="搜索" fixed>
      <a @click="goBack" slot="left"><img class="back_img" src="../assets/arrow.png" alt=""></a>
    </header-fix>
    <div class="pad_top">
      <search v-model="keyword" :search="clickSearch">
        <section slot v-infinite-scroll="getArticleList"
                 infinite-scroll-immediate-check="immediate"
                 infinite-scroll-disabled="loading"
                 infinite-scroll-distance="5">
          <news-list :news-data="articleData" :no-data-bg="noDataBg" :no-data="noData"></news-list>
        </section>
      </search>
    </div>
  </div>
</template>
<script>
  import {Indicator} from 'mint-ui';
  import {headerFix, search, courseList, newsList} from '../components'
  import {GetArticleInfoList} from '../service/getData'
  import {goBack} from '../service/mixins'

  export default {
    mixins: [goBack],
    data() {
      return {
        keyword: '',
        oldKeyword: '',
        categoryId: 0,
        articleData: [],
        loading: false,
        immediate: false,
        page: 1,
        noData: false,
        noDataBg: false,
      }
    },
    mounted() {

    },
    props: [],
    components: {
      search,
      headerFix,
      newsList,
    },
    methods: {
      async getArticleList() {
        this.noData = false;
        this.noDataBg = false;
        this.loading = true;
        this.oldKeyword = this.keyword; //记录搜索keyword
        Indicator.open();
        let data = await GetArticleInfoList({Keyword: this.keyword, CategoryId: this.categoryId, Page: this.page});
        if (data.Type == 1) {
          let list = data.Data.List;
          Indicator.close();
          if (list.length == 0 && this.page > 1) {
            this.noData = true;
            return;
          }
          if (list.length == 0 && this.page == 1) {
            this.noDataBg = true;
            return;
          }
          this.articleData = this.articleData.concat(list);
          this.loading = false;
          this.page += 1;
        }
      },
      clickSearch() {
        if (this.keyword != this.oldKeyword) {
          this.articleData = [];
          this.page = 1;
          this.getArticleList();
        }
      }
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .newsSearch {
    height: 100vh;
    background-color: $fill-body;
    .pad_top {
      padding-top: toRem(92px);
    }
  }
</style>
