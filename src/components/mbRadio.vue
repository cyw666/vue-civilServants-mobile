<template>
  <div class="mbRadio" @change="$emit('change', currentValue)">
    <div class="radioList" v-for="option in options">
      <label class="radiolist-label">
        <input
          class="radio-input"
          type="radio"
          v-model="currentValue"
          :disabled="option.disabled"
          :value="option.ThemeItemFlag || option"/>
        {{option.ThemeItemFlag+'.'+option.ThemeItemTitle}}
        <!--<span class="radio-label" v-text="option.ThemeItemFlag+'.'+option.ThemeItemTitle || option"></span>-->
      </label>
  </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        currentValue: this.value
      }
    },
    created(){

    },
    mounted(){

    },
    props: {
      options: {
        required: true
      },
      value: ''
    },
    components: {},
    computed: {

    },
    updated(){

    },
    methods: {

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
      @include borderRadius(6px);
      background-color: $fill-grey;
      margin-bottom: toRem(30px);
      .radio-input:focus {
        outline: none;
      }
      .radiolist-label {
        display: inline-block;
        width: 100%;
        font-size: toRem(32px);
        height: toRem(84px);
        line-height: toRem(84px);
        /*.radio-input{
          width: toRem(30px);
          height: toRem(30px);
        }*/
      }
      padding: 0 toRem(20px);
      &:last-child {
        border-bottom: none;
      }
    }
  }

</style>
