/**
* 笔记详情
*/
<template>
  <div class="notes_detail container_top">
    <!--头部-->
    <header-fix title="笔记内容" fixed>
      <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
      <span slot="right" @click="toggleNotes">修改</span>
    </header-fix>
    <div class="notice_title">网上展厅作品(大型纪录片《走四方》</div>
    <div class="notice_desc">
      <span class="send_person">课程名称：《党的性质》</span>
      <span class="send_date">发布日期：2017-1-4</span>
    </div>
    <div class="articleDet" v-html="messageContent"></div>
    <!--添加笔记-->
    <transition name="slide-left">
      <add-notes
          class="notes_container container_top"
          v-if="showAddNotes"
          :notes-data.sync="addNotesData"
      >
        <!--头部-->
        <header-fix slot="header" title="修改笔记" fixed>
          <span slot="left" @click="toggleNotes">取消</span>
          <span slot="right" @click="saveNotes">保存</span>
        </header-fix>
      </add-notes>
    </transition>
  </div>
</template>
<script>
  import { Indicator } from 'mint-ui'
  import { headerFix, addNotes } from '../components'
  import { goBack } from '../service/mixins'
  import { GetNoticeInfoContent } from '../service/getData'

  export default {
    mixins: [goBack],
    data () {
      return {
        messageContent: '',
        messageId: '',
        showAddNotes: '',
        addNotesData: {
          title: '网上展厅作品(大型纪录片《走四方》',
          content: '各省、自治区、直辖市党委党校，铁道党校，新疆生产建设兵团党委党校，各副省级城市党委党校科研处'
        }
      }
    },
    created () {
      this.messageId = this.$route.query.id || ''
    },
    mounted () {
      this.getMessageContent(this.messageId)
    },
    components: {
      headerFix,
      addNotes,
    },
    methods: {
      async getMessageContent (Id) {
        Indicator.open()
        let data = await GetNoticeInfoContent({Id})
//        Indicator.close();
        let message = data.toString().split('<body>')[1].split('</body>')
        this.messageContent = message[0]
      },
      /*显示、隐藏添加笔记*/
      toggleNotes () {
        this.showAddNotes = !this.showAddNotes
      },
      /*保存笔记*/
      saveNotes () {
        this.toggleNotes()
        console.log('保存笔记', this.addNotesData)
      }
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .notes_detail {
    background-color: $fill-base;
    .articleDet {
      font-size: 16px;
      padding: toRem(40px) toRem(20px) toRem(20px) toRem(20px);
    }
    .notice_title {
      padding: toRem(20px) toRem(20px);
      font-size: 20px;
      font-weight: 600;
    }
    .notice_desc {
      @extend %clearFix;
      color: $color-text-thirdly;
      padding: 0 toRem(20px);
      .send_person {
        @extend %pull-left;
      }
      .send_date {
        @extend %pull-right;
      }
    }
    .notes_container {
      position: fixed;
      z-index: 1000;
      top: 0;
      right: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: #fff;
    }
  }
</style>
