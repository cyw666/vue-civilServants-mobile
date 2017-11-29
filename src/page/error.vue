/**
* error
*/
<template>
  <div class="error">
    <h1>
      <icon name="times-circle" scale="3"></icon>
      <span>404 没有此页面！</span>
    </h1>
    <!-- basic -->
    <!--<icon name="beer" scale="10"></icon>
    &lt;!&ndash; with options &ndash;&gt;
    <icon name="refresh" scale="10" spin></icon>
    <icon name="comment" scale="10" flip="horizontal"></icon>-->
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    created() {
      
    },
    mounted() {
      
    },
    props: [],
    components: {},
    computed: {},
    updated() {
      
    },
    methods: {},
    watch: {}
    
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import "../style/mixin";
  .error{
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    h1{
      padding: toRem(150px) toRem(20px);
      font-size: toRem(50px);
      text-align: center;
      line-height: 100px;
    }
  }
</style>
