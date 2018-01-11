/**
* 电子书搜索
*/
<template>
  <div class="ebookSearch">
    <!--头部-->
    <header-fix title="搜索" fixed>
      <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
    </header-fix>
    <div class="pad_top">
      <search v-model="keyword" :search="clickSearch">
        <section v-infinite-scroll="getEbookList"
                 infinite-scroll-immediate-check="immediate"
                 infinite-scroll-disabled="loading"
                 infinite-scroll-distance="10">
          <ebook-list :data="ebookData" :no-data-bg="noDataBg"></ebook-list>
        </section>
      </search>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {Indicator, InfiniteScroll} from 'mint-ui';
  import {headerFix, search, ebookList} from '../components'
  import {GetBookInfoList} from '../service/getData'
  import {goBack} from '../service/mixins'

  Vue.use(InfiniteScroll);

  export default {
    mixins: [goBack],
    data() {
      return {
        keyword: '',
        oldKeyword: '',
        ebookData: [],
        loading: false,
        immediate: false,
        page: 1,
        noDataBg: false,
      }
    },
    components: {
      search,
      headerFix,
      ebookList,
    },
    methods: {
      async getEbookList() {
        this.noDataBg = false;
        this.loading = true;
        this.oldKeyword = this.keyword; //记录搜索keyword
        Indicator.open();
        let data = await GetBookInfoList({Keyword: this.keyword, Page: this.page});
        Indicator.close();
        if (data.Type == 1) {
          let list = data.Data.List;
          if (list.length == 0 && this.page == 1) {
            this.noDataBg = true;
            return;
          }
          this.ebookData = this.ebookData.concat(list);
          this.loading = false;
          this.page += 1;
        }
      },
      clickSearch() {
        if (this.keyword != this.oldKeyword && !!this.keyword) {
          this.ebookData = [];
          this.page = 1;
          this.getEbookList();
        }
      }
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .ebookSearch {
    height: 100vh;
    overflow: hidden;
    background-color: $fill-body;
    .pad_top {
      padding-top: toRem(92px);
    }
  }
</style>
