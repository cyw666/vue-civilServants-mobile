/**
* 图书章节
*/
<template>
  <div class="ebook_chapter">
    <!--头部-->
    <header-fix :title="bookName" fixed>
      <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
    </header-fix>
    <section v-infinite-scroll="getChapter"
             infinite-scroll-immediate-check="immediate"
             infinite-scroll-disabled="loading"
             infinite-scroll-distance="10">
      <ul class="ebook_chapter_list">
        <li class="ebook_chapter_item" v-for="(item,index) in bookChapterData" :key="index">
          <router-link :to="{path:'/ebookDetail',query:{id:item.BookTitelId,index:index+1}}">{{item.Title}}
          </router-link>
        </li>
      </ul>
    </section>
    <div class="noDataBg" v-if="noDataBg"></div>
    <div class="no-data" v-if="noData">没有更多内容了...</div>
  </div>
</template>
<script>
  import {Indicator} from 'mint-ui'
  import {GetBookChapterInfoList} from '../service/getData'
  import {headerFix} from '../components'
  import {goBack} from '../service/mixins'
  import {getStore} from '../plugins/utils'

  export default {
    mixins: [goBack],
    data() {
      return {
        bookId: '',
        bookName: '',
        bookChapterData: [],
        page: 1,
        immediate: false,
        loading: false,
        noDataBg: false,
        noData: false,
      }
    },
    created() {
      this.bookId = this.$route.query.id;
      this.bookName = getStore("bookName");
    },
    mounted() {
      this.getChapter();
    },
    components: {
      headerFix
    },
    methods: {
      //图书章节
      async getChapter() {
        this.noData = false;
        this.noDataBg = false;
        this.loading = true;
        Indicator.open();
        let data = await GetBookChapterInfoList({Page: this.page, BookId: this.bookId});
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
          this.bookChapterData = this.bookChapterData.concat(list);
          this.loading = false;
          this.page += 1;
        }
      },
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .ebook_chapter {
    padding-top: toRem(92px);
    .ebook_chapter_list {
      padding: 0 toRem(30px);
    }
    .ebook_chapter_item {
      line-height: toRem(90px);
      border-bottom: 1px solid $border-color-base;
      font-size: 14px;
    }
  }
</style>
