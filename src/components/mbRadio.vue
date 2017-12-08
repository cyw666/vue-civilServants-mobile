<template>
  <div class="mbRadio" @change="$emit('change', currentValue)">
    <div class="radioList" v-for="option in options">
      <label class="mint-radiolist-label">
        <span class="mint-radio">
          <input
              class="mint-radio-input"
              type="radio"
              v-model="currentValue"
              :disabled="option.disabled"
              :value="option.ThemeItemFlag || option"/>
          <span class="mint-radio-core"></span>
        </span>
        <!--&nbsp;&nbsp;{{option.ThemeItemFlag+'.'+option.ThemeItemTitle}}-->
        <span class="mint-radio-label" v-text="option.ThemeItemFlag+'.'+option.ThemeItemTitle"></span>
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
        type:Array,
        required: true
      },
      value: String
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
      .mint-radiolist-label{
        display: block;
        padding: 0 toRem(20px);
        @include ht-lineHt(84px);
        font-size: toRem(28px);
      }
      padding: 0 toRem(20px);
    }
  }

</style>
