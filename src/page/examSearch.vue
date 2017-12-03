/**
* 课程搜索
*/
<template>
  <div class="examSearch">
    <!--头部-->
    <Header-fix title="搜索" fixed>
      <a @click="goBack" slot="left"><img class="back_img" src="../assets/arrow.png" alt=""></a>
    </Header-fix>
    <div class="pad_top">
      <search v-model="keyword" :search="clickSearch">
        <section v-infinite-scroll="getExamList"
                 infinite-scroll-immediate-check="immediate"
                 infinite-scroll-disabled="loading"
                 infinite-scroll-distance="5">
          <exam-list :exam-data="examData"
                     :no-data-bg="noDataBg"
                     :no-data="noData">
          </exam-list>
        </section>
      </search>
    </div>
  </div>
</template>
<script>
  import {Indicator} from 'mint-ui';
  import HeaderFix from '../components/header.vue'
  import search from '../components/search.vue'
  import examList from '../components/examList.vue'
  import {GetExamList} from '../service/getData'
  import { goBack } from '../service/mixins'
  export default {
    mixins:[goBack],
    data() {
      return {
        keyword: '',
        typeId: 0,
        examType:'All',
        examData: [],
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
      examList,
      HeaderFix,
    },
    methods: {//考试列表
      async getExamList() {
        this.noData = false;
        this.noDataBg = false;
        this.loading = true;
        Indicator.open();
        let data = await GetExamList({Keyword:this.keyword,ExamType:this.examType,TypeId: this.typeId, Page: this.page});
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
          this.examData = this.examData.concat(list);
          this.loading = false;
          this.page += 1;
        }
      },

      clickSearch() {
        this.examData = [];
        this.page = 1;
        this.getExamList();
      }
    },
    watch: {}
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";
  .examSearch {
    height: 100vh;
    background-color: $fill-body;
    .pad_top{
      padding-top: toRem(92px);
    }
  }
</style>
