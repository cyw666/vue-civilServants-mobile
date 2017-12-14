/**
* 图书内容详情
*/
<template>
  <div class="ebook_detail" @click="toggleShowConfig">
    <div class="bg_container" :style="{background: bgColor }">
      <div class="content" :style="{fontSize: fontSize + 'rem' }" v-html="detailData.Content"></div>
      <div class="ebook_footer">
        <mt-button v-if="index>1" class="prev" type="primary" size="small" @click.native.stop="prevChapter()">上一章节
        </mt-button>
        <mt-button class="next" type="primary" size="small" @click.native.stop="nextChapter()">下一章节</mt-button>
      </div>

      <div v-if="showStyleSetting" class="style_setting">
        <div class="font_setting">
          <em>字体</em>
          <span class="font_large" @click.stop="changeFontSize(0.1)">A+</span>
          <span class="font_small" @click.stop="changeFontSize(-0.1)">A-</span>
          <span class="default" @click.stop="defaultFontSize">默认</span>
        </div>
        <div class="bg_setting clearFix">
          <span>背景</span>
          <span class="bg_1" @click.stop="changeBgColor('#fff')"></span>
          <span class="bg_2" @click.stop="changeBgColor('#f7f0e5')"></span>
          <span class="bg_3" @click.stop="changeBgColor('#ccffcb')"></span>
          <span class="bg_4" @click.stop="changeBgColor('#e0a5b4')"></span>
        </div>
      </div>

      <div v-if="showConfig" class="ebook_config">
        <mt-tabbar fixed :class="{'night':isNight}">
          <mt-tab-item id="ebookChapterList" :href="'#/ebookChapterList?id='+detailData.BookContentId">
            <img slot="icon" src="../assets/icon_shelf.png"/>
            目录
          </mt-tab-item>
          <mt-tab-item id="ebook" href="#/ebook">
            <img slot="icon" src="../assets/icon_shelf.png"/>
            电子书
          </mt-tab-item>
          <mt-tab-item id="setting" @click.native.stop="toggleStyleSetting">
            <img slot="icon" src="../assets/icon_cfg.png"/>
            设置
          </mt-tab-item>
          <mt-tab-item id="night" @click.native.stop="toggleNight">
            <img slot="icon" src="../assets/icon_moon.png"/>
            {{isNight ? "白天" : "夜间"}}
          </mt-tab-item>
        </mt-tabbar>
      </div>
    </div>

  </div>
</template>
<script>
  import {Toast} from 'mint-ui'
  import {GetBookChapterContent} from '../service/getData'
  import {setStore, getStore} from '../plugins/utils'

  export default {
    mixins: [],
    data() {
      return {
        detailId: '',
        bookName: '',
        index: 1,
        detailData: {},
        showConfig: false,
        showStyleSetting: false,
        isNight: false,//白天夜间
        fontSize: 0.5,//字体大小
        bgColor: "#fff",//切换背景
        nextId: "",
        nextIndex: "",
      }
    },
    created() {
      //初始化设置
      let ebookConfig = getStore("ebookConfig");
      if (ebookConfig) {
        this.isNight = ebookConfig.isNight;
        this.fontSize = ebookConfig.fontSize;
        this.bgColor = ebookConfig.bgColor;
      }
      this.bookName = getStore("bookName") || "";
      this.detailId = this.$route.query.id || "";
      this.index = this.$route.query.index || 1;
    },
    mounted() {
      this.getChapterContent();
    },
    methods: {
      //图书章节
      async getChapterContent() {
        let data = await GetBookChapterContent({Id: this.detailId});
        if (data.Type == 1) {
          this.detailData = data.Data;
        }
      },
      toggleShowConfig() {
        this.showConfig = !this.showConfig;
        this.showStyleSetting = false;
      },
      toggleNight() {
        if (this.isNight) {
          this.bgColor = "#fff";
        } else {
          this.bgColor = "rgba(0, 0, 0, 0.9)";
        }
        this.isNight = !this.isNight;
      },
      toggleStyleSetting() {
        this.showStyleSetting = !this.showStyleSetting;
      },
      changeFontSize(step) {
        let newFontSize = this.fontSize + step;
        if (newFontSize < 0.3) {
          Toast({message: "字体已最小！", position: 'bottom'});
        } else if (newFontSize > 0.7) {
          Toast({message: "字体已最大！", position: 'bottom'});
        } else {
          this.fontSize = newFontSize;
        }
      },
      defaultFontSize() {
        this.fontSize = 0.5;
      },
      changeBgColor(color) {
        this.bgColor = color;
      },
      storeConfig() {
        let config = {
          fontSize: this.fontSize,
          isNight: this.isNight,
          bgColor: this.bgColor,
        }
        setStore("ebookConfig", config);
      },
      nextChapter() {
        this.nextId = parseInt(this.detailId) + 1;
        this.nextIndex = parseInt(this.index) + 1;
        this.$router.push({path: '/ebookDetail', query: {id: this.nextId, index: this.nextIndex}});
        window.location.reload();
      },
      prevChapter() {
        this.nextId = parseInt(this.detailId) - 1;
        this.nextIndex = parseInt(this.index) - 1;
        this.$router.push({path: '/ebookDetail', query: {id: this.nextId, index: this.nextIndex}});
        window.location.reload();
      }
    },
    watch: {
      fontSize: function (val) {
        this.storeConfig();
      },
      bgColor: function (val) {
        this.storeConfig();
      },
    }
    
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .ebook_detail {
    .bg_container {
      padding: toRem(30px);
    }
    .ebook_footer {
      padding-top: toRem(20px);
      padding-bottom: toRem(80px);
      text-align: center;
      @extend %clearFix;
      .prev {
        @extend %pull-left;
        width: toRem(260px);
      }
      .next {
        @extend %pull-right;
        width: toRem(260px);
      }
    }
    .ebook_config {
      .mint-tabbar > .mint-tab-item.is-selected {
        background-color: #eaeaea;
        color: $brand-primary;
      }
      .mint-tab-item {
        padding: toRem(14px) 0;
      }
      .mint-tab-item-icon {
        width: toRem(42px);
        height: toRem(46px);
        margin: 0 auto toRem(5px);
      }
      .mint-tab-item-label {
        font-size: toRem(24px);
      }
    }
    .content {
      font-size: 0.5rem;
    }
    .style_setting {
      position: fixed;
      bottom: toRem(104px);
      width: 100vw;
      left: 0;
      background: rgba(0, 0, 0, 0.82);
      color: $color-text-reverse;
      .font_setting {
        padding: toRem(15px) 0 toRem(15px) toRem(15px);
        border-bottom: 1px solid #444;
        font-size: toRem(28px);
        span {
          display: inline-block;
          width: toRem(150px);
          @include ht-lineHt(60px);
          text-align: center;
          border: 1px solid #fff;
          border-radius: 0.1rem;
          margin: 0 0.4rem;
        }
      }
      .bg_setting {
        padding: toRem(15px) 0 toRem(15px) toRem(15px);
        border-bottom: 1px solid #444;
        font-size: toRem(28px);
        line-height: toRem(75px);
        :first-child {
          margin: 0;
        }
        span {
          float: left;
          @include square(75px);
          line-height: toRem(75px);
          margin: 0 toRem(40px);
          border-radius: 50%;
        }
        .bg_1 {
          background: #fff;
        }
        .bg_2 {
          background: #f7f0e5;
        }
        .bg_3 {
          background: #ccffcb;
        }
        .bg_4 {
          background: #e0a5b4;
        }
      }
    }
  }

  .night {
    background-color: rgba(0, 0, 0, 0.9) !important;
    color: rgba(255, 255, 255, 0.5);
    a {
      color: rgba(255, 255, 255, 0.5);
    }
  }
</style>
