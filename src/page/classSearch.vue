/**
* 班级搜索
*/
<template>
  <div class="classSearch container_top">
    <!--头部-->
    <header-fix title="搜索" fixed>
      <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
    </header-fix>
    <search v-model="keyword" :search="clickSearch">
      <section v-infinite-scroll="getClassList"
               infinite-scroll-immediate-check="immediate"
               infinite-scroll-disabled="loading"
               infinite-scroll-distance="10">
        <class-list :data="classData" :no-data-bg="noDataBg"></class-list>
      </section>
    </search>
  </div>
</template>
<script>
  import {Indicator} from 'mint-ui';
  import {headerFix, search, classList} from '../components'
  import {GetTrainingClass} from '../service/getData'
  import {goBack} from '../service/mixins'

  export default {
    mixins: [goBack],
    data() {
      return {
        keyword: '',
        oldKeyword: '',
        classData: [],
        loading: false,
        immediate: false,
        page: 1,
        noDataBg: false,
      }
    },
    components: {
      search,
      headerFix,
      classList,
    },
    methods: {
      async getClassList() {
        this.noDataBg = false;
        this.loading = true;
        this.oldKeyword = this.keyword; //记录搜索keyword
        Indicator.open();
        let data = await GetTrainingClass({
          TrainName: this.keyword,
          Page: this.page
        });
        Indicator.close();
        if (data.Type == 1) {
          let list = data.Data.List;
          if (list.length == 0 && this.page == 1) {
            this.noDataBg = true;
            return;
          }
          this.classData = this.classData.concat(list);
          this.loading = false;
          this.page += 1;
        }
      },
      clickSearch() {
        if (this.keyword != this.oldKeyword && !!this.keyword) {
          this.classData = [];
          this.page = 1;
          this.getClassList();
        }
      }
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .classSearch {
    background-color: $fill-body;
    overflow: hidden;
  }
</style>
