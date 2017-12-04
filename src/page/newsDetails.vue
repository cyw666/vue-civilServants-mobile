/**
* 文章内容
*/
<template>
  <div class="article_container">
    <!--头部-->
    <header-fix title="文章详情" fixed>
      <a @click="goBack" slot="left"><img class="back_img" src="../assets/arrow.png" alt=""></a>
      <span slot="right" class="read_count">{{articleDetails.Click}}阅读</span>
    </header-fix>
    <section class="article_details_title">
      <h2>{{articleDetails.Name}}</h2>
      <div>
        <span>发布时间：{{articleDetails.CreatedDate | dateFilter}}</span>
        <span class="article_details_author">作者：{{articleDetails.Author}}</span>
        <span class="article_details_resource">来源：{{articleDetails.Resource}}</span>
      </div>
    </section>
    <article class="article_details_content" v-html="articleDetails.Content"></article>
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
        articleId:'',
        articleDetails:{

        }
      }
    },
    created() {
      this.articleId = this.$route.query.id || "";
    },
    mounted() {
      this.getArticleDetail();
    },
    props: [],
    components: {
      headerFix
    },
    computed: {},
    updated() {
      
    },
    methods: {
      //文章分类
      async getArticleDetail() {
        let data = await ArticleDetail({Id:this.articleId});
        if (data.Type == 1) {
          this.articleDetails = data.Data;
        }
      },
    },
    watch: {}
    
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";
  .article_container{
    padding: toRem(92px) toRem(30px) toRem(30px) toRem(30px);
    .read_count{
      display: inline-block;
      @include wh(104px,40px);
      line-height: toRem(40px);
      text-align: center;
      @include border-left-radius(20px);
      @include border-right-radius(20px);
      background-color: #fff;
      color: $brand-primary;
      font-size: toRem(24px);
    }
  }
  .article_details_title{
    text-align: center;
    color: $color-text-secondary;
    border-bottom: 1px dashed $border-color-base;
    h2{
      font-weight: 500;
      font-size: toRem(38px);
      color: $color-text-base;
    }
    span{
      margin-right: toRem(25px);
    }
  }
  .article_details_content{
    padding-top: toRem(20px);
  }
</style>
