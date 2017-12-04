/**
* error
*/
<template>
  <div class="error">
    <h1>
      <span>404 没有此页面！</span>
    </h1>
  </div>
</template>
<script>
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import "../style/mixin";

  .error {
    width: 100vw;
    height: 100vh;
    margin: 0 auto;
    h1 {
      padding: toRem(150px) toRem(20px);
      font-size: toRem(50px);
      text-align: center;
      line-height: 100px;
    }
  }
</style>
