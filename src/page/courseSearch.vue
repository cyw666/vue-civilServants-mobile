/**
* 课程搜索
*/
<template>
  <div class="courseSearch container_top">
    <!--头部-->
    <header-fix title="搜索" fixed>
      <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
    </header-fix>
    <search v-model="keyword" :search="clickSearch">
      <section slot v-infinite-scroll="getCourseList"
               infinite-scroll-immediate-check="immediate"
               infinite-scroll-disabled="loading"
               infinite-scroll-distance="10">
        <course-list :course-data="courseData"
                     :no-data-bg="noDataBg"
                     :no-data="noData">
        </course-list>
      </section>
    </search>
  </div>
</template>
<script>
  import {Indicator} from 'mint-ui';
  import {headerFix, search, courseList} from '../components'
  import {GetCourseInfoList} from '../service/getData'
  import {goBack} from '../service/mixins'

  export default {
    mixins: [goBack],
    data() {
      return {
        keyword: '',
        oldKeyword: '',
        channelId: 0,
        courseData: [],
        loading: false,
        immediate: false,
        page: 1,
        noData: false,
        noDataBg: false,
      }
    },
    mounted() {

    },
    props: [],
    components: {
      search,
      courseList,
      headerFix,
    },
    methods: {
      async getCourseList() {
        this.noData = false;
        this.noDataBg = false;
        this.loading = true;
        this.oldKeyword = this.keyword; //记录搜索keyword
        Indicator.open();
        let data = await GetCourseInfoList({Keyword: this.keyword, ChannelId: this.channelId, Page: this.page});
        if (data.Type == 1) {
          let list = data.Data.List;
          Indicator.close();
          if (list.length == 0 && this.page > 1) {
            this.noData = true;
            return;
          }
          if (list.length == 0 && this.page == 1) {
            this.noDataBg = true;
            return;
          }
          this.courseData = this.courseData.concat(list);
          this.loading = false;
          this.page += 1;
        }
      },
      clickSearch() {
        if (this.keyword != this.oldKeyword) {
          this.courseData = [];
          this.page = 1;
          this.getCourseList();
        }
      }
    },
    watch: {}
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .courseSearch {
    background-color: $fill-body;
    overflow: hidden;
  }
</style>
