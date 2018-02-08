/**
* tag
*/
<template>
  <div class="mb_tag"
       :class="{'primary':type=='primary','error':type=='error','info':type=='info','success':type=='success','warn':type=='warn'}">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'mb-tag',
    props: {
      type: String
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .mb_tag {
    display: inline-block;
    width: toRem(122px);
    height: toRem(44px);
    line-height: toRem(44px);
    text-align: center;
    color: #fff;
    font-size: 12px;
    @include borderRadius(10px);
    background-color: #999;
    &.primary {
      background-color: $brand-primary;
    }
    &.error {
      background-color: $brand-error;
    }
    &.info {
      background-color: $brand-info;
    }
    &.success {
      background-color: $brand-success;
    }
    &.warn {
      background-color: $brand-warning;
    }
  }
</style>
