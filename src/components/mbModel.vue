/**
* Created by admin on 2017/12/4.
*/
<template>
  <div class="mb-model_container">
    <transition name="fade">
      <div v-if="showModel" class="mb-model_content">
        <img class="cancel" src="../assets/cancel.png" @click="close" alt="关闭">
        <slot></slot>
      </div>
    </transition>
    <div v-if="showModel" class="mb-model" @click="close"></div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        showModel:this.isShow
      }
    },
    mounted() {
      
    },
    props: {
      isShow: {
        type: Boolean,
        default: false
      },
    },
    computed: {
    },
    methods: {
      close(){
        this.showModel = false;
      },
      open(){
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
  .mb-model_container{
    background-color: $fill-body;
  }
  .mb-model_content{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    z-index: 1200;
    @include borderRadius(10px);
    min-height: toRem(60px);
    width: toRem(580px);
    overflow: hidden;
    .cancel {
      position: absolute;
      right: toRem(20px);
      top: toRem(20px);
      @include square(26px);
    }
  }
</style>
