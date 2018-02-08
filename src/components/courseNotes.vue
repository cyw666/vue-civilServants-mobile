/**
* 课程笔记
*/
<template>
  <div class="course_notes">
    <div class="notes_item" @click="goDetail('10')">
      <p class="notes_title">这个视频非常精彩，让我学到了很多东西，特别是讲哲学部分非常深刻，受益匪浅。</p>
      <p class="notes_date">发布时间：2017-12-1</p>
    </div>
    <div class="notes_item">
      <p class="notes_title">这个视频非常精彩，让我学到了很多东西，特别是讲哲学部分非常深刻，受益匪浅。</p>
      <p class="notes_date">发布时间：2017-12-1</p>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { InfiniteScroll } from 'mint-ui'

  Vue.use(InfiniteScroll)
  export default {
    mixins: [],
    data () {
      return {}
    },
    created () {
      
    },
    mounted () {

    },
    props: ['courseId'],
    components: {},
    computed: {},
    updated () {
      
    },
    methods: {
      goDetail (id) {
        this.$router.push({path: 'notesDetail', query: {id}})
      }
    },
    watch: {}
    
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .course_notes {
    .notes_item {
      padding: toRem(20px) toRem(30px);
      background-color: $fill-base;
      margin-bottom: toRem(10px);
    }
    .notes_title {
      font-size: 14px;
      line-height: toRem(50px);

    }
    .notes_date {
      color: $color-text-thirdly;
      padding-top: toRem(30px);
    }
  }
</style>
