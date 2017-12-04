/**
* 新闻中心
*/
<template>
  <div class="newsCenter">
    <header-fix :title="articleTitle" fixed>
      <div slot="left">
        <a @click="goBack"><img class="back_img" src="../assets/arrow.png" alt=""></a>
        <a @click="toggleNav"><img class="slide" src="../assets/slide.png"></a>
      </div>
      <router-link slot="right" to="/newsSearch"><img class="search" src="../assets/search.png" alt=""></router-link>
    </header-fix>
    <div class="news_container">
      <nav-slide :show="showSlide" @showChange="showChange">
        <div slot="left" class="category">
          <tree :data="articleCategory" :on-select="searchArticle"></tree>
        </div>
        <div slot="right">
          <section v-infinite-scroll="getArticleList"
                   infinite-scroll-immediate-check="immediate"
                   infinite-scroll-disabled="loading"
                   infinite-scroll-distance="5">
            <news-list :news-data="articleData" :no-data-bg="noDataBg" :no-data="noData"></news-list>
          </section>
        </div>
      </nav-slide>
    </div>
  </div>
</template>
<script>
  import {Indicator} from 'mint-ui';
  import {headerFix, navSlide, tree, newsList} from '../components'
  import {GetArticleChannelInfoList,GetArticleInfoList} from '../service/getData'
  import {goBack} from '../service/mixins'
  export default {
    mixins:[goBack],
    data() {
      return {
        articleTitle: "咨询中心",
        showSlide: false,
        articleCategory: [],
        categoryId: 0,
        articleData: [],
        loading: false,
        immediate: true,
        page: 1,
        noData: false,
        noDataBg: false,
      }
    },
    mounted() {
      this.getArticleCategory();
//      this.getCourseList();
    },
    components: {
      headerFix,
      navSlide,
      tree,
      newsList,
    },
    methods: {
      toggleNav() {
        this.showSlide = !this.showSlide;
      },
      showChange(val) {
        this.showSlide = val;
      },
      //文章分类
      async getArticleCategory() {
        let data = await GetArticleChannelInfoList();
        if (data.Type == 1) {
          this.articleCategory = data.Data.ArticleCategoryResult;
        }
      },
      //文章列表
      async getArticleList() {
        this.noData = false;
        this.noDataBg = false;
        this.loading = true;
        Indicator.open();
        let data = await GetArticleInfoList({CategoryId: this.categoryId, Page: this.page});
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
          this.articleData = this.articleData.concat(list);
          this.loading = false;
          this.page += 1;
        }
      },
      searchArticle(data) {
        this.page = 1;
        this.categoryId = data.Id;
        this.articleTitle = data.Name;
        this.showSlide = false;
        this.articleData = [];
        this.getArticleList();
      },
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .newsCenter {
    .slide {
      width: toRem(35px);
      margin-left: toRem(30px);
    }
    .search {
      width: toRem(39px);
    }
    .news_container {
      padding-top: toRem(92px);
      width: 100%;
      height: 93vh;
      overflow: scroll;
    }
    .category {
      padding: toRem(20px) 0;
    }
  }
</style>
