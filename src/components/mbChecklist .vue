<template>
  <div class="mbChecklist" @change="$emit('change', currentValue)">
    <div class="checkList" v-for="option in options">
      <label class="mint-checklist-label">
        <span class="mint-checkbox">
          <input
              class="mint-checkbox-input"
              type="checkbox"
              v-model="currentValue"
              :disabled="option.disabled"
              :value="option.ThemeItemFlag || option"/>
          <span class="mint-checkbox-core"></span>
        </span>
        <!--&nbsp;&nbsp;{{option.ThemeItemFlag+'.'+option.ThemeItemTitle}}-->
        <span class="mint-checkbox-label" v-text="option.ThemeItemFlag+'.'+option.ThemeItemTitle || option"></span>
      </label>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {Checklist} from 'mint-ui';

  Vue.component(Checklist.name, Checklist);
  export default {
    data() {
      return {
        currentValue: this.value
      }
    },
    props: {
      options: {
        required: true
      },
      value: ''
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

  .mbChecklist {
    .checkList {
      @extend %border-base;
      @include borderRadius(6px);
      background-color: $fill-grey;
      margin-bottom: toRem(30px);
      .checklist-input:focus {
        outline: none;
      }
      .mint-checklist-label {
        display: block;
        padding: 0 toRem(20px);
        @include ht-lineHt(84px);
        font-size: 14px;
      }
      padding: 0 toRem(20px);
    }
  }
</style>
