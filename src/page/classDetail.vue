/**
* 班级详情
*/
<template>
  <div class="class_detail">
    <div class="sign_bg">
      <i class="webapp webapp-back arrow" @click.stop="goBack"></i>
      <i class="webapp webapp-scanning scan"></i>
    </div>
    <div class="class_detail_cont">
      <div class="class_detail_item">
        <i class="webapp webapp-calendar"></i>
        <span class="training_label">(培训日期)</span>
        <span class="training_date">{{classDetail.StartDate | dateFilter}}—{{classDetail.EndDate | dateFilter}}</span>
      </div>
      <div class="class_detail_item">
        <i class="webapp webapp-map"></i>
        <span class="training_label">(培训地点)</span>
        <span class="training_date">{{classDetail.Address}}</span>
      </div>
      <div class="class_detail_item">
        <i class="webapp webapp-account"></i>
        <span class="training_label">(培训对象)</span>
        <span class="training_date">{{classDetail.TrainingObject}}</span>
      </div>
      <div class="class_detail_item">
        <i class="webapp webapp-edit"></i>
        <span class="training_label">(培训计划)</span>
        <span class="training_date">{{classDetail.TeachingPlan || "无"}}</span>
      </div>
    </div>
    <div class="sign_detail">
      <div class="sign_title">
        <span class="red_line"></span>
        <span>签到情况</span>
        <router-link class="see_sign" :to="{path:'/signDetail',query:{Id:classId}}">(查看所有签到)</router-link>
      </div>
      <sign-list></sign-list>
    </div>
    <div class="class_desc">
      <div class="sign_title">
        <span class="red_line"></span>
        <span>课程详情</span>
      </div>
      <div class="class_course_detail">
        <p>{{classDetail.Description}}</p>
      </div>
    </div>
    <div class="cancel">
      <mt-button v-if="isJoinClass" @click.native="signOutClass" type="primary" size="large">取消报名</mt-button>
      <mt-button v-if="!isJoinClass" @click.native="signInClass" type="primary" size="large">报名</mt-button>
    </div>
  </div>
</template>
<script>
  import {Toast, MessageBox} from 'mint-ui'
  import {signList} from '../components'
  import {goBack} from '../service/mixins'
  import {
    GetTrainingDetail,
    GetClassUserSignList,
    UpdateTrainingStudentdown,
    UpdateTrainingStudentup
  } from '../service/getData'

  export default {
    mixins: [goBack],
    data() {
      return {
        classId: "",
        todayFlag: true,
        classDetail: "",
        signData: [],
        isJoinClass: false,
      }
    },
    created() {
      this.classId = this.$route.query.Id || "";
    },
    mounted() {
      this.getClassDetail();
      this.getSignList();
    },
    components: {
      signList
    },
    methods: {
      //班级详情
      async getClassDetail() {
        let data = await GetTrainingDetail({Id: this.classId});
        if (data.Type == 1) {
          this.classDetail = data.Data;
          if (data.Data.Status == "UnJoin") {
            this.isJoinClass = false;
          } else {
            this.isJoinClass = true;
          }
        }
      },
      //签到列表
      async getSignList() {
        let data = await GetClassUserSignList({TodayFlag: this.todayFlag, TrainingId: this.classId});
        if (data.Type == 1) {
          this.signData = data.Data;
        }
      },
      //报名
      async signInClass() {
        let data = await UpdateTrainingStudentup({Id: this.classId});
        if (data.Type == 1) {
          this.isJoinClass = true;
          Toast({message: data.Message, position: 'bottom'});
        } else if (data.Type != 401) {
          MessageBox('警告', data.Message);
        }
      },
      //取消报名
      async signOutClass() {
        let data = await UpdateTrainingStudentdown({Id: this.classId});
        if (data.Type == 1) {
          this.isJoinClass = false;
          Toast({message: data.Message, position: 'bottom'});
        } else if (data.Type != 401) {
          MessageBox('警告', data.Message);
        }
      },
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .class_detail {
    padding-bottom: toRem(90px);
    .sign_bg {
      position: relative;
      height: toRem(471px);
      width: 100vw;
      background: url("../assets/class_bg.png") no-repeat center;
      background-size: toRem(750px) toRem(471px);
      .arrow {
        position: absolute;
        padding: toRem(15px);
        left: 0;
        top: 0;
        font-size: toRem(40px);
        color: $color-text-reverse;
      }
      .scan {
        position: absolute;
        padding: toRem(15px);
        right: 0;
        top: 0;
        font-size: toRem(40px);
        color: $color-text-reverse;
      }
    }
    .class_detail_cont {
      background-color: $fill-base;
      padding: 0 toRem(30px);
      .webapp {
        display: inline-block;
        color: #000;
        font-size: 20px;
        @include ht-lineHt(50px);
        position: relative;
        top: 2px;
      }
    }
    .class_detail_item {
      line-height: toRem(92px);
      border-bottom: 1px solid $border-color-base;
      img {
        width: toRem(40px);
      }
      .training_label {
        color: $color-text-thirdly;
        margin-left: toRem(20px);
        font-size: 14px;
      }
      .training_date {
        margin-left: toRem(60px);
        font-size: 14px;

      }
    }
    .sign_detail {
      &::before {
        content: '';
        display: block;
        height: toRem(20px);
        background-color: $fill-tap;
      }
      &::after {
        content: '';
        display: block;
        height: toRem(20px);
        background-color: $fill-tap;
      }
    }
    .sign_title {
      line-height: toRem(60px);
      padding: 0 toRem(30px);
    }
    .see_sign {
      color: $color-text-thirdly;
      @extend %pull-right;
    }
    .class_desc {
      .class_course_detail {
        padding: 0 toRem(30px);
        text-indent: 2em;
        font-size: 14px;
      }
    }
    .cancel {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      /*margin-top: toRem(50px);*/
      /*padding: 0 toRem(10px) toRem(20px) toRem(10px);*/
      .mint-button--large {
        border-radius: 0;
      }
    }

  }
</style>
