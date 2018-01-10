/**
* 模态框
*/
<template>
  <div class="mb-model_container">
    <transition name="fade">
      <div v-if="showModel" class="mb-model_content">
        <a @click="close" class="cancel">
          <i class="webapp webapp-close"></i>
        </a>
        <div class="slot_content">
          <slot></slot>
        </div>
      </div>
    </transition>
    <div v-if="showModel" class="mb-model" @click="close"></div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        showModel: this.isShow
      }
    },
    props: {
      isShow: {
        type: Boolean,
        default: false
      },
    },
    methods: {
      close() {
        this.showModel = false;
      },
      open() {
        this.showModel = true;
      }
    },
    watch: {
      isShow: function (val) {
        this.showModel = val;
      },
      showModel: function (val) {
        this.$emit('update:isShow', val);
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .mb-model_container {
    background-color: $fill-base;
  }

  .mb-model_content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-51%, -51%);
    z-index: 1200;
    @include borderRadius(10px);
    min-height: toRem(60px);
    width: toRem(580px);
    overflow: hidden;
    background-color: $fill-base;
    .cancel {
      position: absolute;
      right: toRem(20px);
      top: toRem(15px);
      @include square(26px);
      .webapp-close {
        color: #666;
      }
    }
    .slot_content {
      margin-top: toRem(30px);
    }
  }
</style>
