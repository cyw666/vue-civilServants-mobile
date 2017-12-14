/**
* 课程介绍
*/
<template>
  <div class="course_introduce">
    <div class="course_detail_name">
      <p class="title">{{courseDetails.CourseName}}</p>
      <div class="clearFix">
        <div class="star_container pull-left">
          <star v-model="courseDetails.CommentCredit" size="small" disabled show-score></star>
        </div>
        <span class="pull-left userCount">{{courseDetails.UserCount}}人学过</span>
        <span class="pull-right">讲师：{{courseDetails.TeacherName}}</span>
      </div>
    </div>
    <div class="course_detail_list">
      <p>
        <span>课程分类：&nbsp;&nbsp;&nbsp;&nbsp;{{courseDetails.ChannelName}}</span><span>学<i>分：&nbsp;&nbsp;&nbsp;{{courseDetails.Credit}}分</i></span>
      </p>
      <p><span>时<i>长：&nbsp;&nbsp;&nbsp;&nbsp;{{courseDetails.Duration}}分钟</i></span><span>进<i>度：&nbsp;&nbsp;&nbsp;&nbsp;{{courseDetails.BrowseScore}}</i></span>
      </p>
    </div>
    <div class="split"></div>
    <div class="course_detail_desc">
      <h4><span class="red_line"></span><span>课程介绍</span></h4>
      <p>{{courseDetails.Description}}</p>
    </div>
  </div>
</template>
<script>
  import star from './star.vue'
  export default {
    mixins: [],
    data() {
      return {}
    },
    created() {
      
    },
    mounted() {
      
    },
    props: ["courseDetails"],
    components: {
      star
    },
    computed: {},
    updated() {
      
    },
    methods: {},
    watch: {}
    
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";
  .course_introduce{
    .course_detail_name {
      margin: 0 toRem(30px);
      border-bottom: 1px solid $border-color-base;
      line-height: toRem(40px);
      font-size: 14px;
      .title {
        font-size: 15px;
        line-height: toRem(84px);
      }
      .userCount {
        margin-left: toRem(30px);
      }
      .clearFix {
        padding: toRem(20px) 0;
      }
    }
    .course_detail_list {
      p {
        line-height: toRem(60px);
        padding: 0 toRem(30px);
        font-size: 14px;
        @extend %clearFix;
      }
      span {
        @extend %pull-left;
        @extend %ellipsis;
        &:first-child {
          width: 50%;
        }
        &:nth-child(2) {
          margin-left: toRem(120px);
        }
      }
    }
    .course_detail_desc {
      padding: toRem(30px);
      h4 {
        font-size: 16px;
      }
      p {
        font-size: 14px;
      }
    }
    .split {
      display: block;
      height: toRem(20px);
      background-color: $fill-body;
    }
  }
</style>
