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
      <div class="article_details_desc clearFix">
        <span class="pull-left article_details_resource">{{articleDetails.Resource}}</span>
        <span class="pull-left">{{articleDetails.CreatedDate | dateFilter}}</span>
        <span class="pull-right article_details_author">作者：{{articleDetails.Author}}</span>
      </div>
    </section>
    <article class="article_details_content" v-html="content"></article>
    <div class="article_footer">
      <mt-button size="normal" type="primary" @click.native="collectNews" plain>
        <i class="webapp webapp-favorite"></i>收藏
      </mt-button>
      <mt-button size="normal" type="primary" @click.native="toggleShowShare" plain>
        <i class="webapp webapp-share"></i>分享
      </mt-button>
    </div>
    <transition name="slide-top">
      <div class="share_list" v-if="showShare">
        <div class="share_item">
          <a @click.prevent="shareTimeline"><img src="../assets/weixin.png" alt=""/></a>
          <a @click.prevent="shareAppMessage"><img src="../assets/friends.png" alt=""/></a>
          <a @click.prevent="shareQQ"><img src="../assets/qq.png" alt=""/></a>
        </div>
        <div class="cancel_share" @click="toggleShowShare">取消</div>
      </div>
    </transition>
  </div>
</template>
<script>
  import {MessageBox, Indicator} from 'mint-ui';
  import wx from 'weixin-js-sdk'
  import {headerFix} from '../components'
  import {goBack} from '../service/mixins'
  import {ArticleDetail, GetWechatWxAuthModel} from '../service/getData'

  export default {
    mixins: [goBack],
    data() {
      return {
        articleId: '',
        articleDetails: {},
        content: '',
        showShare:false,
        link:window.location.href
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
      async collectNews(){
        console.log('收藏')
      },
      /*微信签名*/
      async getWechatWxAuthModel() {
        let data = await GetWechatWxAuthModel({Url: this.url});
        if (data.Type == 1) {
          wx.config({
            debug: false,
            appId: 'wxf24d72db02fede73',// 必填，公众号的唯一标识
            timestamp: data.Data.Timestamp,// 必填，生成签名的时间戳
            nonceStr: data.Data.Nonce,// 必填，生成签名的随机串
            signature: data.Data.Signature,// 必填，签名
            jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ']// 必填，需要使用的JS接口列表
          });
        } else if (data.Type != 401) {
          MessageBox('警告', data.Message);
        }
      },
      /*分享朋友圈*/
      shareTimeline() {
        console.log('分享朋友圈')
        wx.onMenuShareTimeline({
          title: this.articleDetails.Name, // 分享标题
          link: this.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: '', // 分享图标
          success: function () {
            // 用户确认分享后执行的回调函数
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        });
      },
      /*分享给朋友*/
      shareAppMessage() {
        console.log('分享给朋友')
        wx.onMenuShareAppMessage({
          title: this.articleDetails.Name, // 分享标题
          desc: this.articleDetails.Name, // 分享描述
          link: this.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: '', // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
            // 用户确认分享后执行的回调函数
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        });
      },
      /*分享到QQ*/
      shareQQ() {
        console.log('分享到QQ')
        wx.onMenuShareQQ({
          title: this.articleDetails.Name, // 分享标题
          desc: this.articleDetails.Name, // 分享描述
          link: this.link, // 分享链接
          imgUrl: '', // 分享图标
          success: function () {
            // 用户确认分享后执行的回调函数
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        });
      },
      toggleShowShare(){
        this.showShare = !this.showShare;
      }
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
    color: $color-text-thirdly;
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

  .article_footer {
    text-align: center;
    padding: toRem(80px) 0;
    .mint-button {
      height: toRem(60px);
    }
    .mint-button--normal, .mint-button--small {
      padding: 0 toRem(60px);
    }
    .mint-button:first-child {
      margin-right: toRem(94px);
    }
    .mint-button:last-child {
      margin-left: toRem(94px);
    }
    .webapp {
      color: $brand-primary;
      margin-right: toRem(5px);
    }
  }
  .share_list{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: $fill-body;
    img{
      width: toRem(108px);
      margin: toRem(10px) 0 toRem(10px) toRem(20px);
    }
    .cancel_share{
      background-color: $fill-base;
      text-align: center;
      line-height: toRem(94px);
      color: $brand-primary;
    }
  }
</style>
