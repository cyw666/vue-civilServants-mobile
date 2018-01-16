/**
* 文章内容
*/
<template>
  <div class="article_container">
    <!--头部-->
    <header-fix title="文章详情" fixed>
      <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
      <span slot="right" class="read_count">{{articleDetails.Click}}阅读</span>
    </header-fix>
    <section class="article_details_title">
      <h2>{{articleDetails.Name}}</h2>
      <div class="article_details_desc">
        <span>发布时间：{{articleDetails.CreatedDate | dateFilter}}</span>
        <span class="article_details_author">作者：{{articleDetails.Author}}</span>
        <span class="article_details_resource">来源：{{articleDetails.Resource}}</span>
      </div>
    </section>
    <article class="article_details_content" v-html="content"></article>
  </div>
</template>
<script>
  import {Indicator} from 'mint-ui';
  import {headerFix} from '../components'
  import {goBack} from '../service/mixins'
  import {ArticleDetail} from '../service/getData'

  export default {
    mixins: [goBack],
    data() {
      return {
        articleId: '',
        articleDetails: {},
        content: ''
      }
    },
    created() {
      this.articleId = this.$route.query.id || "";
    },
    mounted() {
      this.getArticleDetail();
    },
    components: {
      headerFix
    },
    methods: {
      //文章内容
      async getArticleDetail() {
        let data = await ArticleDetail({Id: this.articleId});
        if (data.Type == 1) {
          this.articleDetails = data.Data;
          let content = data.Data.Content;
          this.content = content;
        }
      },
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .article_container {
    padding: toRem(92px) toRem(30px) toRem(30px) toRem(30px);
    background-color: $fill-base;
    .read_count {
      display: inline-block;
      min-width: toRem(130px);
      height: toRem(50px);
      line-height: toRem(50px);
      text-align: center;
      @include border-left-radius(25px);
      @include border-right-radius(25px);
      background-color: #fff;
      color: $brand-primary;
      font-size: 12px;
    }
  }

  .article_details_desc {
    padding: toRem(20px) 0;
  }

  .article_details_title {
    text-align: center;
    color: $color-text-secondary;
    border-bottom: 1px dashed $border-color-base;
    padding-top: toRem(20px);
    h2 {
      font-weight: 600;
      font-size: 18px;
      color: $color-text-base;
      text-align: left;
    }
    span {
      margin-right: toRem(25px);
    }
  }

  .article_details_content {
    padding-top: toRem(20px);
    img {
      width: 100%;
    }
  }
</style>
