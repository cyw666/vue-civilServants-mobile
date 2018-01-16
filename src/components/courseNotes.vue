/**
* 课程笔记
*/
<template>
  <div class="course_notes">

  </div>
</template>
<script>
  import Vue from 'vue'
  import {Toast, MessageBox, InfiniteScroll} from 'mint-ui'
  import mbModel from './mbModel.vue'
  import star from './star.vue'
  import {} from '../service/getData'

  Vue.use(InfiniteScroll);
  export default {
    mixins: [],
    data() {
      return {}
    },
    created() {
      
    },
    mounted() {

    },
    props: ['courseId'],
    components: {},
    computed: {},
    updated() {
      
    },
    methods: {

    },
    watch: {}
    
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

</style>
