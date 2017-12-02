<template>
  <div class="mbChecklist" @change="$emit('change', currentValue)">
    <div class="checkList" v-for="option in options">
      <label class="checklist-label">
        <input
          class="checklist-input"
          type="checkbox"
          v-model="currentValue"
          :disabled="option.disabled"
          :value="option.ThemeItemFlag || option"/>
        {{option.ThemeItemFlag+'.'+option.ThemeItemTitle}}
        <!--<span class="checkbox-label" v-text="option.ThemeItemFlag+'.'+option.ThemeItemTitle || option"></span>-->
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
    computed: {},
    updated(){

    },
    methods: {},
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
      .checklist-label {
        display: inline-block;
        width: 100%;
        font-size: toRem(32px);
        height: toRem(84px);
        line-height: toRem(84px);
        /*.checklist-input{
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
