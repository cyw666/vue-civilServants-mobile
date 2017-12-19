/**
* 我的课程
*/
<template>
  <div class="my_course">
    <header-fix fixed>
      <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
      <mb-tab slot="title" v-model="tabType">
        <mb-tab-item id="0">未完成</mb-tab-item>
        <mb-tab-item id="1">已完成</mb-tab-item>
      </mb-tab>
      <router-link slot="right" to="/courseSearch"><img class="search" src="../assets/search.png" alt=""></router-link>
    </header-fix>
    <div class="my_course_container">
      <mt-tab-container v-model="tabType">
        <mt-tab-container-item id="0">
          <section v-infinite-scroll="getMyUnFinishCourse"
                   infinite-scroll-disabled="loading"
                   infinite-scroll-immediate-check="immediate"
                   infinite-scroll-distance="10">
            <course-list :course-data="courseUnFinishData"
                         :no-data-bg="noUfDataBg"
                         :no-data="noUfData"
                         my-course>
            </course-list>
          </section>
        </mt-tab-container-item>
        <mt-tab-container-item id="1">
          <section v-infinite-scroll="getMyFinishCourse"
                   infinite-scroll-disabled="loading"
                   infinite-scroll-immediate-check="immediate"
                   infinite-scroll-distance="10">
            <course-list :course-data="courseFinishData"
                         :no-data-bg="noFDataBg"
                         :no-data="noFData"
                         my-course>
            </course-list>
          </section>
        </mt-tab-container-item>
      </mt-tab-container>
      <!--<transition name="slide-left">
        <section v-if="tabType=='0'"
                 key="0"
                 v-infinite-scroll="getMyUnFinishCourse"
                 infinite-scroll-disabled="loading"
                 infinite-scroll-immediate-check="immediate"
                 infinite-scroll-distance="10">
          <course-list :course-data="courseUnFinishData"
                       :no-data-bg="noUfDataBg"
                       :no-data="noUfData"
                       my-course>
          </course-list>
        </section>
        <section v-else-if="tabType=='1'"
                 key="1"
                 v-infinite-scroll="getMyFinishCourse"
                 infinite-scroll-disabled="loading"
                 infinite-scroll-immediate-check="immediate"
                 infinite-scroll-distance="10">
          <course-list :course-data="courseFinishData"
                       :no-data-bg="noFDataBg"
                       :no-data="noFData"
                       my-course>
          </course-list>
        </section>
      </transition>-->
    </div>
  </div>
</template>
<script>
  import {Indicator} from 'mint-ui'
  import {headerFix, mbTab, mbTabItem, courseList} from '../components'
  import {goBack} from '../service/mixins'
  import {GetUserCourseInfoList} from '../service/getData'

  export default {
    mixins: [goBack],
    data() {
      return {
        tabType: '0',
        courseFinishData: [],
        courseUnFinishData: [],
        noFDataBg: false,
        noFData: false,
        noUfDataBg: false,
        noUfData: false,
        loading: false,
        immediate: false,
        unFinishPage: 1,
        finishPage: 1,
        startX: 0,
        endX: 0,
      }
    },
    mounted() {
      this.getMyFinishCourse();
      this.getMyUnFinishCourse();
      var element = this.$el;
      element.addEventListener('touchstart', (event) => {
        if (this.prevent) event.preventDefault();
        if (this.stopPropagation) event.stopPropagation();
//        this.doOnTouchStart(event);
      });

      element.addEventListener('touchmove', (event) => {
        if (this.prevent) event.preventDefault();
        if (this.stopPropagation) event.stopPropagation();
//        this.doOnTouchMove(event);
      });

      element.addEventListener('touchend', (event) => {
        if (this.prevent) event.preventDefault();
        if (this.stopPropagation) event.stopPropagation();
//        this.doOnTouchEnd(event);
      });
    },
    components: {
      headerFix,
      mbTab,
      mbTabItem,
      courseList,
    },
    methods: {
      //已完成课程
      async getMyFinishCourse() {
        this.noFData = false;
        this.noFDataBg = false;
        this.loading = true;
        Indicator.open();
        let data = await GetUserCourseInfoList({Finish: "1", Page: this.finishPage});
        Indicator.close();
        if (data.Type == 1) {
          let list = data.Data.List;
          if (list.length == 0 && this.finishPage > 1) {
            this.noFData = true;
            return;
          }
          if (list.length == 0 && this.finishPage == 1) {
            this.noFDataBg = true;
            return;
          }
          this.courseFinishData = this.courseFinishData.concat(list);
          this.loading = false;
          this.finishPage += 1;
        }
      },
      //未完成课程
      async getMyUnFinishCourse() {
        this.noUfData = false;
        this.noUfDataBg = false;
        this.loading = true;
        Indicator.open();
        let data = await GetUserCourseInfoList({Finish: "0", Page: this.unFinishPage});
        Indicator.close();
        if (data.Type == 1) {
          let list = data.Data.List;
          if (list.length == 0 && this.unFinishPage > 1) {
            this.noUfData = true;
            return;
          }
          if (list.length == 0 && this.unFinishPage == 1) {
            this.noUfDataBg = true;
            return;
          }
          this.courseUnFinishData = this.courseUnFinishData.concat(list);
          this.loading = false;
          this.unFinishPage += 1;
        }
      },
      doOnTouchStart(event) {
        /*let touches=event.touches;
        let targetTouches=event.targetTouches;
        let changeTouches=event.changeTouches;*/
        let pageX = event.targetTouches[0].pageX;
        let pageY = event.targetTouches[0].pageY;
        this.startX = pageX;
//        console.log("TouchStart" + pageX, pageY);
      },
      doOnTouchMove(event) {
        let pageX = event.targetTouches[0].pageX;
        let pageY = event.targetTouches[0].pageY;
//        console.log("TouchMove" + pageX, pageY);
      },
      doOnTouchEnd(event) {
        let pageX = event.changedTouches[0].pageX;
        let pageY = event.changedTouches[0].pageY;
        this.endX = pageX;
//        console.log("TouchEnd" + pageX, pageY);
        //左滑
        if (this.endX < this.startX - 20) {
          this.tabType = "1";
        }
        //右滑
        if (this.endX > this.startX + 20) {
          this.tabType = "0";
        }
      },
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .my_course {
    .search {
      @include square(39px);
    }
  }

  .my_course_container {
    padding-top: toRem(92px);
  }
</style>
