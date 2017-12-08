/**
* 签到详情
*/
<template>
  <div class="sign_detail">
    <!--头部-->
    <header-fix title="签到详情" fixed>
      <a @click="goBack" slot="left"><img class="back_img" src="../assets/arrow.png" alt=""></a>
    </header-fix>
    <sign-list></sign-list>
  </div>
</template>
<script>
  import {goBack} from '../service/mixins'
  import {signList,headerFix} from '../components'
  export default {
    mixins: [goBack],
    data() {
      return {}
    },
    created() {
      
    },
    mounted() {
      
    },
    props: [],
    components: {
      signList,
      headerFix,
    },
    computed: {},
    updated() {
      
    },
    methods: {},
    watch: {}
    
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";
  .sign_detail{
    padding-top: toRem(92px);
  }
</style>
