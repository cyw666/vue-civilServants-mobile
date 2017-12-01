/**
* 搜索
*/
<template>
  <div class="search">
    <div class="search_bar">
      <input type="text" v-model="currentValue" @keyup.13="search" :placeholder="placeholder"/>
      <mt-button size="small" type="primary" @click.native="search">
        搜索
      </mt-button>
    </div>
    <div class="search-list">
      <slot></slot>
    </div>
  </div>

</template>
<script>
  export default {
    data() {
      return {
        currentValue: this.value
      }
    },
    props: {
      value: String,
      placeholder: {
        default: '输入关键词搜索'
      },
      search: Function
    },
    watch: {
      currentValue(val) {
        this.$emit('input', val);
      },
      value(val) {
        this.currentValue = val;
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";
  .search{
    .search_bar {
      height: 0.8rem;
      padding: 0.266667rem 0.4rem;
      background: #fff;
      @extend %clearFix;
      input {
        @extend %pull-left;
        width: toRem(530px);
        height: toRem(60px);
        line-height: toRem(60px);
        padding-left: toRem(20px);
        margin-right: toRem(30px);
        background: $fill-tap;
        font-size: toRem(28px);
        @include borderRadius(10px);
      }
      .mint-button--primary {
        @extend %pull-left;
        width: toRem(110px);
        height: toRem(60px);
      }
    }
    .search-list{
      margin-top: toRem(20px);
    }
  }
</style>
