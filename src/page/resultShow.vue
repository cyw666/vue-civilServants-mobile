/**
* 成果展示
*/
<template>
  <div class="result_show container_top">
    <header-fix :title="articleTitle" fixed>
      <div slot="left">
        <a @click="goBack"><i class="webapp webapp-back"></i></a>
        <a @click="toggleNav" class="category_icon"><i class="webapp webapp-category"></i></a>
      </div>
      <router-link slot="right" to="/resultShowSearch"><i class="webapp webapp-search"></i></router-link>
    </header-fix>
    <nav-slide :show="showSlide" @showChange="showChange">
      <div slot="left" class="category">
        <tree :data="articleCategory" :on-select="searchArticle" :selected-id="categoryId"></tree>
      </div>
      <div slot="right">
        <!--<section v-infinite-scroll="getArticleList"
                 infinite-scroll-immediate-check="immediate"
                 infinite-scroll-disabled="loading"
                 infinite-scroll-distance="10">
          <news-list :news-data="articleData" :no-data-bg="noDataBg" :no-data="noData"></news-list>
        </section>-->
        <mt-navbar v-model="selected">
          <mt-tab-item id="new">最新作品</mt-tab-item>
          <mt-tab-item id="hot">热门作品</mt-tab-item>
        </mt-navbar>

        <!-- tab-container -->
        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="new">
            <result-show-list></result-show-list>
          </mt-tab-container-item>
          <mt-tab-container-item id="hot">
            <result-show-list></result-show-list>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </nav-slide>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { Indicator, InfiniteScroll, Navbar, TabItem, TabContainer, TabContainerItem } from 'mint-ui'
  import { headerFix, navSlide, tree, resultShowList } from '../components'
  import { GetArticleChannelInfoList, GetArticleInfoList } from '../service/getData'
  import { goBack } from '../service/mixins'

  Vue.use(InfiniteScroll)
  Vue.component(Navbar.name, Navbar)
  Vue.component(TabItem.name, TabItem)
  Vue.component(TabContainer.name, TabContainer)
  Vue.component(TabContainerItem.name, TabContainerItem)
  export default {
    mixins: [goBack],
    data () {
      return {
        articleTitle: '成果展示',
        showSlide: false,
        articleCategory: [],
        categoryId: 0,
        selected: 'new',
        articleData: [],
        loading: false,
        immediate: true,
        page: 1,
        noData: false,
        noDataBg: false,
      }
    },
    created () {
      this.categoryId = this.$route.query.id
    },
    mounted () {
      this.getArticleCategory()
    },
    components: {
      headerFix,
      navSlide,
      tree,
      resultShowList,
    },
    methods: {
      toggleNav () {
        this.showSlide = !this.showSlide
      },
      showChange (val) {
        this.showSlide = val
      },
      //文章分类
      async getArticleCategory () {
        let data = await GetArticleChannelInfoList()
        if (data.Type == 1) {
          this.articleCategory = data.Data.ArticleCategoryResult
        }
      },
      //文章列表
      async getArticleList () {
        this.noData = false
        this.noDataBg = false
        this.loading = true
        Indicator.open()
        let data = await GetArticleInfoList({CategoryId: this.categoryId, Page: this.page})
        Indicator.close()
        if (data.Type == 1) {
          let list = data.Data.List
          if (list.length == 0 && this.page > 1) {
            this.noData = true
            return
          }
          if (list.length == 0 && this.page == 1) {
            this.noDataBg = true
            return
          }
          this.articleData = this.articleData.concat(list)
          this.loading = false
          this.page += 1
        }
      },
      searchArticle (data) {
        this.page = 1
        this.categoryId = data.Id
        this.articleTitle = data.Name
        this.showSlide = false
        this.articleData = []
        this.getArticleList()
      },
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .result_show {
    width: 100vw;
    height: 100vh;
    .category_icon {
      margin-left: toRem(10px);
    }
    .mint-navbar {
      .mint-tab-item {
        margin: 0 toRem(120px);
      }
    }
    .tree_title .tran_line {
      background-color: $brand-primary;
    }
  }
</style>
