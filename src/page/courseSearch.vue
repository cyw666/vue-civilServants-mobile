/**
* 课程搜索
*/
<template>
  <div class="courseSearch">
    <search v-model="keyword" :search="clickSearch">
      <section slot v-infinite-scroll="getCourseList"
               infinite-scroll-immediate-check="immediate"
               infinite-scroll-disabled="loading"
               infinite-scroll-distance="5">
        <course-list :course-data="courseData"
                     :no-data-bg="noDataBg"
                     :no-data="noData"
                     :loading="loading">
        </course-list>
      </section>
    </search>
  </div>
</template>
<script>
  import {Indicator} from 'mint-ui';
  import search from '../components/search.vue'
  import courseList from '../components/courseList.vue'
  import {GetCourseInfoList} from '../service/getData'

  export default {
    data() {
      return {
        keyword: '',
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
    },
    methods: {
      async getCourseList() {
        this.noData = false;
        this.noDataBg = false;
        this.loading = true;
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
        this.courseData = [];
        this.page = 1;
        this.getCourseList();
      }
    },
    watch: {}
  }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
