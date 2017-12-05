/**
* 班级详情
*/
<template>
  <div class="class_detail">
    <div class="sign_bg">
      <img class="arrow" src="../assets/arrow.png" @click="goBack"/>
      <img class="scan" src="../assets/scan.png" alt=""/>
    </div>
    <div class="class_detail_cont">
      <div class="class_detail_item">
        <img src="../assets/date.png" alt="" @click="getCamera()">
        <span class="training_label">(培训日期)</span>
        <span class="training_date">{{classDetail.StartDate | dateFilter}}—{{classDetail.EndDate | dateFilter}}</span>
      </div>
      <div class="class_detail_item">
        <img src="../assets/address.png" alt="">
        <span class="training_label">(培训地点)</span>
        <span class="training_date">{{classDetail.Address}}</span>
      </div>
      <div class="class_detail_item">
        <img src="../assets/person.png" alt="">
        <span class="training_label">(培训对象)</span>
        <span class="training_date">{{classDetail.TrainingObject}}</span>
      </div>
      <div class="class_detail_item">
        <img src="../assets/plan.png" alt="">
        <span class="training_label">(培训计划)</span>
        <span class="training_date">{{classDetail.TeachingPlan || "无"}}</span>
      </div>
    </div>
    <div class="sign_detail">
      <div class="sign_title">
        <span class="red_line"></span>
        <span>签到情况</span>
        <a class="see_sign">(查看所有签到)</a>
      </div>
      <ul>
        <li v-for="item in signData">
          <div>
            <span>上午</span>
            <span class="class_on_off">(上课)</span>
            <span class="sign_or_not sign_in" v-if="item.AmSignIn.SignFlag == true">已签</span>
            <span class="sign_or_not" v-if="item.AmSignIn.SignFlag == false">未签</span>
            <span class="mar_left_96">上午</span>
            <span class="class_on_off">(下课)</span>
            <span class="sign_or_not sign_in" v-if="item.AmSignOut.SignFlag == true">已签</span>
            <span class="sign_or_not" v-if="item.AmSignOut.SignFlag == false">未签</span>
          </div>
          <div>
            <span>下午</span>
            <span class="class_on_off">(上课)</span>
            <span class="sign_or_not sign_in" v-if="item.PmSignIn.SignFlag == true">已签</span>
            <span class="sign_or_not" v-if="item.PmSignIn.SignFlag == false">未签</span>
            <span class="mar_left_96">下午</span>
            <span class="class_on_off">(下课)</span>
            <span class="sign_or_not sign_in" v-if="item.PmSignOut.SignFlag == true">已签</span>
            <span class="sign_or_not" v-if="item.PmSignOut.SignFlag == false">未签</span>
          </div>
        </li>
      </ul>
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
  import {goBack} from '../service/mixins'
  import {GetTrainingDetail,GetClassUserSignList,UpdateTrainingStudentdown,UpdateTrainingStudentup} from '../service/getData'

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
    methods: {
      //班级详情
      async getClassDetail() {
        let data = await GetTrainingDetail({Id: this.classId});
        if (data.Type == 1) {
          this.classDetail = data.Data;
          if(data.Data.Status == "UnJoin"){
            this.isJoinClass = false;
          }else {
            this.isJoinClass = true;
          }
        }
      },
      //签到列表
      async getSignList() {
        let data = await GetClassUserSignList({TodayFlag:this.todayFlag,TrainingId: this.classId});
        if (data.Type == 1) {
          this.signData = data.Data;
        }
      },
      //报名
      async signInClass() {
        let data = await UpdateTrainingStudentup({Id: this.classId});
        if (data.Type == 1) {
          this.isJoinClass = true;
          alert(data.Message);
        }else if(data.Type != 401){
          alert(data.Message);
        }
      },
      //取消报名
      async signOutClass() {
        let data = await UpdateTrainingStudentdown({Id: this.classId});
        if (data.Type == 1) {
          this.isJoinClass = false;
          alert(data.Message);
        }else if(data.Type != 401){
          alert(data.Message);
        }
      },
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .class_detail {
    .sign_bg {
      position: relative;
      height: toRem(471px);
      width: 100vw;
      background: url("../assets/class_bg.png") no-repeat center;
      background-size: toRem(750px) toRem(471px);
      .arrow {
        position: absolute;
        @include wh(18px, 33px);
        left: toRem(30px);
        top: toRem(20px);
      }
      .scan {
        position: absolute;
        @include wh(36px, 36px);
        right: toRem(30px);
        top: toRem(20px);

      }
    }
    .class_detail_cont {
      background-color: $fill-base;
      padding: 0 toRem(30px);
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
        font-size: toRem(28px);
      }
      .training_date {
        margin-left: toRem(60px);
        font-size: toRem(28px);

      }
    }
    .sign_detail {
      &::before{
        content: '';
        display: block;
        height: toRem(20px);
        background-color: $fill-tap;
      }
      &::after{
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
      .class_course_detail{
        padding: 0 toRem(30px);
        text-indent: 2em;
        font-size: toRem(28px);
      }
    }
    .cancel{
      margin-top: toRem(50px);
    }

  }
</style>
