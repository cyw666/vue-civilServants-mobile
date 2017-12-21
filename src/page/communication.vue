/**
* 交流评论
*/
<template>
  <div class="communication container_top">
    <!--头部-->
    <header-fix title="交流评论" fixed>
      <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
      <router-link slot="right" to="/addCommunication">
        <i class="webapp webapp-edit"></i>
      </router-link>
    </header-fix>
    <section v-infinite-scroll="getDiscussList"
             infinite-scroll-immediate-check="immediate"
             infinite-scroll-disabled="loading"
             infinite-scroll-distance="10">
      <ul class="info_content">
        <li class="info_item" v-for="(item,index) in discussList" :key="index" @click="closeWrite">
          <div class="left_avatar"><img src="../assets/male.png" alt=""></div>
          <div class="right_content">
            <p class="author_name">{{item.UserName}}</p>
            <p class="date">{{item.CreateDate | dateFilter}}</p>
            <p class="content">{{item.Content}}</p>
            <a class="comment_img" @click.stop="openWrite(item.Id)">
              <i class="webapp webapp-comments" style="color: #89d4ff;"></i>
            </a>
            <ul class="comment">
              <li v-for="(item,index) in item.List" :key="index"><span
                  class="name">{{item.UserName}}：</span>{{item.Content}}
              </li>
            </ul>
          </div>
        </li>
      </ul>
      <div class="noDataBg" v-if="noDataBg"></div>
      <div class="no-data" v-if="noData">没有更多内容了...</div>
    </section>
    <!--编写评论-->
    <transition name="slide-top">
      <div class="write_comment" v-if="isShowWrite">
        <textarea v-model="content" type="text" rows="5" placeholder="写评论"></textarea>
        <mt-button @click.native="addDiscuss" type="primary" size="small">发送</mt-button>
      </div>
    </transition>
  </div>
</template>
<script>
  import {Toast, MessageBox, Indicator} from 'mint-ui'
  import {headerFix} from '../components'
  import {goBack} from '../service/mixins'
  import {DiscussList, AddDiscuss} from '../service/getData'

  export default {
    mixins: [goBack],
    data() {
      return {
        discussList: [],
        isShowWrite: false,
        content: '',
        mainId: '',
        parentId: '',
        immediate: true,
        loading: false,
        page: 1,
        noData: false,
        noDataBg: false,
      }
    },
    created() {
      
    },
    mounted() {
//      this.getDiscussList();
    },
    props: [],
    components: {
      headerFix
    },
    computed: {},
    updated() {
      
    },
    methods: {
      //获取讨论列表
      async getDiscussList() {
        this.noData = false;
        this.noDataBg = false;
        this.loading = true;
        Indicator.open();
        let data = await DiscussList({Page: this.page});
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
          this.discussList = this.discussList.concat(list);
          this.loading = false;
          this.page += 1;
        } else if (data.Type != 401) {
          MessageBox('警告', data.Message);
        }
      },
      //回复
      async addDiscuss() {
        if (!this.content) {
          MessageBox('警告', "请填写评论内容");
        } else {
          let data = await AddDiscuss({MainId: this.mainId, ParentId: this.parentId, Content: this.content});
          if (data.Type == 1) {
            Toast({message: data.Message, position: 'bottom'});
            this.content = "";
            this.getDiscussList();
          } else if (data.Type != 401) {
            MessageBox('警告', data.Message);
          }
        }
      },
      openWrite(id) {
        this.isShowWrite = true;
        this.mainId = id;
        this.parentId = id;
      },
      closeWrite() {
        this.isShowWrite = false;
      },
    },
    watch: {}
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .communication {
    .add_com {
      width: toRem(31px);
    }
    .info_content {
      padding: 0 toRem(30px);
    }
    .info_item {
      padding: toRem(30px) 0;
      border-bottom: 1px solid $border-color-light;
      @extend %clearFix;
      .left_avatar {
        @extend %pull-left;
        width: toRem(90px);
        img {
          width: toRem(65px);
        }
      }
      .right_content {
        @extend %pull-left;
        width: toRem(580px);
        line-height: toRem(38px);
        .author_name {
          font-size: 15px;
          font-weight: 600;
        }
        .date {
          font-size: 12px;
          color: $color-text-thirdly;
        }
        .content {
          font-size: 14px;
          line-height: toRem(44px);
        }
        .comment_img {
          width: toRem(42px);
          @extend %pull-right;
        }
        .comment {
          margin-top: toRem(45px);
          background: $fill-grey;
          padding: toRem(10px);
          li {
            font-size: 14px;
            padding: toRem(5px) toRem(10px);
            color: $color-text-secondary;
          }
          .name {
            color: $brand-info;
          }
        }
      }
    }
    .write_comment {
      width: 10rem;
      position: fixed;
      bottom: 0;
      left: 0;
      background: $fill-body;
      padding-top: toRem(30px);
      textarea {
        display: block;
        resize: none;
        width: 9.2rem;
        margin-left: toRem(20px);
        border: 1px solid #e9e9e9;
        border-radius: toRem(10px);
        padding: toRem(30px);
        font-size: 16px;
      }
      .mint-button--primary {
        background-color: $brand-info;
        @extend %pull-right;
        margin: toRem(10px);
      }
    }
  }
</style>
