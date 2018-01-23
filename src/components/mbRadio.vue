<template>
  <div class="mbRadio" @change="$emit('change', currentValue)">
    <div class="radioList" v-for="(option,index) in options" :key="index"
         :class="option.ThemeItemFlag == currentValue&&'radio_checked'">
      <label class="mint-radiolist-label">
        <span class="mint-radio">
          <input
              class="mint-radio-input"
              type="radio"
              v-model="currentValue"
              :disabled="option.disabled"
              :value="option.ThemeItemFlag || option"/>
          <!--<span class="mint-radio-core"></span>-->
        </span>
        <!--&nbsp;&nbsp;{{option.ThemeItemFlag+'.'+option.ThemeItemTitle}}-->
        <span class="mint-radio-label" v-text="option.ThemeItemFlag+'.'"></span>
        <span class="mint-radio-label label_title" v-text="option.ThemeItemTitle"></span>
      </label>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {Radio} from 'mint-ui';

  Vue.component(Radio.name, Radio);
  export default {
    data() {
      return {
        currentValue: this.value
      }
    },
    props: {
      options: {
        type: Array,
        required: true
      },
      value: String
    },
    watch: {
      value(val) {
        this.currentValue = val;
      },
      currentValue(val) {
        this.$emit('input', val);
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../style/mixin';

  .mbRadio {
    .radioList {
      @extend %border-base;
      @include borderRadius(10px);
      background-color: $fill-grey;
      margin-bottom: toRem(30px);
      .radio-input:focus {
        outline: none;
      }
      .mint-radiolist-label {
        display: block;
        padding: toRem(21px) toRem(20px);
        font-size: 15px;
      }
      padding: 0 toRem(20px);
    }
    .radio_checked {
      border: 1px solid $brand-primary;
      background-color: $fill-base;
      color: $brand-primary;
    }
    .label_title {
      margin-left: toRem(50px);
    }
  }

</style>
