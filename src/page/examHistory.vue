/**
* 考试记录
*/
<template>
  <div class="exam_history container_top">
    <!--头部-->
    <header-fix title="考试记录" fixed>
      <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
    </header-fix>
    <section v-infinite-scroll="getExamList"
             infinite-scroll-immediate-check="immediate"
             infinite-scroll-disabled="loading"
             infinite-scroll-distance="10">
      <exam-history-list :history-data="examData"
                         :no-data-bg="noDataBg"
                         :no-data="noData">
      </exam-history-list>
    </section>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { Indicator, InfiniteScroll } from 'mint-ui'
  import { headerFix, examHistoryList } from '../components'
  import { goBack } from '../service/mixins'
  import { GetExamList } from '../service/getData'

  Vue.use(InfiniteScroll)

  export default {
    mixins: [goBack],
    data () {
      return {
        typeId: 0, //考试typeId
        examData: [], //考试列表数据
        loading: false,
        immediate: true,
        page: 1,
        noData: false,
        noDataBg: false,
      }
    },
    created () {
      
    },
    mounted () {
      this.getExamList()
    },
    props: [],
    components: {
      headerFix,
      examHistoryList,
    },
    computed: {},
    updated () {
      
    },
    methods: {
      async getExamList () {
        this.noData = false
        this.noDataBg = false
        this.loading = true
        Indicator.open()
        let data = await GetExamList({TypeId: this.typeId, Page: this.page})
        Indicator.close()
        if (data.Type == 1) {
          let list = data.Data.List
          if (list.length == 0 && this.page > 1) {
            this.noData = true
            return
          }
          if (list.length == 0 && this.page == 1) {
            this.noDataBg = true
            return
          }
          this.examData = this.examData.concat(list)
          this.loading = false
          this.page += 1
        }
      },
    },
    watch: {}
    
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

</style>
