/**
* 电子书列表
*/
<template>
  <div class="ebook_list">
    <div class="ebook_item" v-for="(item,index) in data" :key="index"
         @click="goChapterList(item.BookNameId,item.BookName)">
      <error-img :src="item.BookImg" :error-src="errorBook"></error-img>
      <p class="ebook_name">{{item.BookName}}</p>
      <p class="ebook_author">作者：{{item.AutoName}}</p>
    </div>
    <div class="noDataBg" v-if="noDataBg"></div>
    <div class="no-data" v-if="noData">没有更多内容了...</div>
  </div>
</template>
<script>
  import errorImg from './errorImg.vue'
  import errorBook from '../assets/error_book.png'
  import {setStore} from '../plugins/utils'

  export default {
    data() {
      return {
        errorBook
      }
    },
    props: {
      data: Array,
      noDataBg: Boolean,
      noData: Boolean,
    },
    components: {
      errorImg
    },
    methods: {
      goChapterList(id, bookName) {
        setStore("bookName", bookName);
        this.$router.push({path: '/ebookChapterList', query: {id}})
      }
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .ebook_list {
    @extend %clearFix;
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
  }
</style>
