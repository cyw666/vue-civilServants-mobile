/**
* 课程中心
*/
<template>
  <div class="courseCenter">
    <Header-fix :title="courseTitle" fixed>
      <a slot="left" @click="toggleNav"><img class="slide" src="../assets/slide.png"></a>
      <router-link slot="right" to="/courseSearch"><img class="search" src="../assets/search.png" alt=""></router-link>
    </Header-fix>
    <div class="container">
      <nav-slide :show="showSlide" @showChange="showChange">
        <div slot="left" class="category">
          <tree :data="courseCategory" :on-select="searchCourse" :scroll-bottom="getCourseList" :loading="loading"></tree>
        </div>
        <div slot="right">
          <section v-infinite-scroll="getCourseList"
                   infinite-scroll-immediate-check="immediate"
                   infinite-scroll-disabled="loading"
                   infinite-scroll-distance="5">
            <course-list :course-data="courseData" :no-data-bg="noDataBg" :no-data="noData"></course-list>
          </section>
        </div>
      </nav-slide>
    </div>
    <Footer-fix selected="courseCenter"></Footer-fix>
  </div>
</template>
<script>
  import {Indicator} from 'mint-ui';
  import HeaderFix from '../components/header.vue'
  import FooterFix from '../components/footerFix.vue'
  import NavSlide from '../components/navSlide.vue'
  import tree from '../components/tree.vue'
  import courseList from '../components/courseList.vue'
  import {GetChannelInfoList, GetCourseInfoList} from '../service/getData'

  export default {
    data() {
      return {
        courseTitle: "课程中心",
        showSlide: false,
        courseCategory: [],
        channelId: 0,
        courseData: [],
        loading: false,
        immediate: true,
        page: 1,
        noData: false,
        noDataBg: false,
      }
    },
    mounted() {
      this.getChannelInfoList();
//      this.getCourseList();
    },
    components: {
      HeaderFix,
      FooterFix,
      NavSlide,
      tree,
      courseList,
    },
    methods: {
      toggleNav() {
        this.showSlide = !this.showSlide;
      },
      showChange(val) {
        this.showSlide = val;
      },
      //课程分类
      async getChannelInfoList() {
        let data = await GetChannelInfoList();
        if (data.Type == 1) {
          this.courseCategory = data.Data.CourseCategoryResult;
        }
      },
      //课程列表
      async getCourseList() {
        this.noData = false;
        this.noDataBg = false;
        this.loading = true;
        Indicator.open();
        let data = await GetCourseInfoList({ChannelId: this.channelId, Page: this.page});
        Indicator.close();
        if (data.Type == 1) {
          let list = data.Data.List;
          if (list.length == 0 && this.page > 1) {
            this.noData = true;
            return;
          }
          if(list.length == 0 && this.page == 1){
            this.noDataBg = true;
            return;
          }
          this.courseData = this.courseData.concat(list);
          this.loading = false;
          this.page += 1;
        }
      },
      searchCourse(data) {
        this.page = 1;
        this.channelId = data.Id;
        this.courseTitle = data.Name;
        this.showSlide = false;
        this.courseData = [];
        this.getCourseList();
      },
    },
    watch: {}
    
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .courseCenter {
    .slide {
      width: toRem(35px);
    }
    .search {
      width: toRem(39px);
    }
    .container {
      padding-top: toRem(92px);
      width: 100%;
      height: toRem(1137px);
      overflow: hidden;
    }
    .category {
      padding: toRem(20px) 0;
    }
  }
</style>
