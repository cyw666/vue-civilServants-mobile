/**
* 电子书
*/
<template>
  <div class="ebook">
    <!--头部-->
    <header-fix title="电子书" fixed>
      <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
      <router-link slot="right" to="/ebookSearch"><i class="webapp webapp-search"></i></router-link>
    </header-fix>
    <section v-infinite-scroll="getEbookList"
             infinite-scroll-immediate-check="immediate"
             infinite-scroll-disabled="loading"
             infinite-scroll-distance="10">
      <ebook-list :data="ebookData" :no-data-bg="noDataBg" :no-data="noData"></ebook-list>
    </section>
  </div>
</template>
<script>
  import {Indicator} from 'mint-ui'
  import {headerFix, ebookList} from '../components'
  import {GetBookInfoList} from '../service/getData'
  import {goBack} from '../service/mixins'

  export default {
    mixins: [goBack],
    data() {
      return {
        ebookData: [],
        page: 1,
        immediate: false,
        loading: false,
        noDataBg: false,
        noData: false,
      }
    },
    mounted() {
      this.getEbookList();
    },
    components: {
      headerFix,
      ebookList,
    },
    methods: {
      //图书列表
      async getEbookList() {
        this.noData = false;
        this.noDataBg = false;
        this.loading = true;
        Indicator.open();
        let data = await GetBookInfoList({Page: this.page});
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
          this.ebookData = this.ebookData.concat(list);
          this.loading = false;
          this.page += 1;
        }
      },
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .ebook {
    padding-top: toRem(92px);
  }

  .ebook_list {
    @extend %clearFix;
  }

  .ebook_item {
    @extend %pull-left;
    text-align: center;
    width: 33.3%;
    padding-top: toRem(25px);
    img {
      @include wh(176px, 234px);
    }
    .ebook_name {
      line-height: toRem(50px);
    }
    .ebook_author {
      line-height: toRem(40px);

    }
  }
</style>
