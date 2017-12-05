/**
* 课程列表
*/
<template>
  <div class="course_list">
    <div class="course_item" v-for="item in courseData">
      <div class="course_img">
        <a class="img" @click="toPlay(item.CourseType,item.CourseId)">
          <error-img :src="item.CourseImg" :error-src="noCourse"></error-img>
        </a>
        <img v-if="item.CourseType=='JYAicc'" class="tip" src="../assets/jingpin.png" alt=""/>
        <img v-if="item.CourseType=='Mp4'" class="tip" src="../assets/MP4.png" alt=""/>
        <img v-if="item.CourseType=='h5'" class="tip" src="../assets/H5.png" alt=""/>
      </div>
      <div class="course_desc">
        <div class="course_name" @click="toPlay(item.CourseType,item.CourseId)">{{item.CourseName}}</div>
        <div class="course_teacher">讲师：{{item.TeacherName}}</div>
        <div class="course_bottom">
          <span class="highlight">{{item.Credit}}学分</span>
          <span v-if="!myCourse" class="choose_status" :class="item.SelectFlag=='已选'&&'course_selected'">{{item.SelectFlag}}</span>
          <span v-if="myCourse" class="progress">进度：{{parseInt(item.BrowseScore)}}%</span>
        </div>
      </div>
    </div>
    <div class="noDataBg" v-if="noDataBg"></div>
    <div class="no-data" v-if="noData">没有更多内容了...</div>
  </div>
</template>
<script>
  import noCourse from '../assets/noCourse.png'
  import errorImg from '../components/errorImg.vue'
  import {goBack, toPlay} from '../service/mixins'

  export default {
    mixins: [toPlay],
    data() {
      return {
        noCourse
      }
    },
    props: {
      courseData: Array,
      noDataBg: {
        type: Boolean,
        default: false
      },
      noData: {
        type: Boolean,
        default: false
      },
      myCourse: Boolean,
    },
    components: {
      errorImg
    },
    methods: {
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .course_list {
    padding: 0 toRem(30px);
    .course_item {
      margin: toRem(30px) 0;
      @extend %clearFix;
      background-color: $fill-base;
    }
    .course_img {
      @extend %pull-left;
      position: relative;
      width: toRem(258px);
      .img {
        img {
          width: 100%;
          height: toRem(146px);
        }
      }
      .tip {
        position: absolute;
        right: toRem(5px);
        top: toRem(5px);
        @include wh(50px, 27px);
      }
    }
    .course_desc {
      @extend %pull-left;
      width: toRem(415px);
      padding-left: toRem(15px);
    }
    .course_name {
      @include ellipsis_two(2);
      font-size: toRem(28px);
      font-weight: 500;
      color: $color-text-base;
    }
    .course_teacher {
      color: $color-text-secondary;
      line-height: toRem(48px);
    }
    .choose_status {
      @extend %pull-right;
      @include wh(64px, 36px);
      background-color: $color-icon-base;
      color: $color-text-reverse;
      text-align: center;
      @include borderRadius(5px);
    }
    .course_selected {
      background-color: #00b4ff;
    }
    .progress {
      @extend %pull-right;
      color: $color-text-base;
    }
  }
</style>
