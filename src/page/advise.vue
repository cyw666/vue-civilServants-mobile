/**
* 信息反馈
*/
<template>
  <div class="advise">
    <!--头部-->
    <header-fix title="反馈中心" fixed>
      <a @click="goBack" slot="left"><img class="back_img" src="../assets/arrow.png" alt=""></a>
    </header-fix>
    <div class="advise_type">
      <a v-for="(item,index) in typeData" class="advise_type_item"
         :class="{'active':item.ClassCode == adviseType}"
         @click="changeType(item.ClassCode)">
        {{item.ClassName}}
      </a>
    </div>
    <div class="advise_title">
      <input type="text" v-model="adviseTitle" placeholder="输入标题"/>
    </div>
    <div class="advise_content">
      <textarea type="text" rows="10" placeholder="输入您想要反馈的内容" v-model="adviseContent"></textarea>
    </div>
    <div class="advise_submit">
      <mt-button type="primary" size="large" @click.native="addAdvise">提交</mt-button>
    </div>
  </div>
</template>
<script>
  import {headerFix} from '../components'
  import {CommentType, AddMessage} from '../service/getData'
  import {goBack} from '../service/mixins'

  export default {
    mixins: [goBack],
    data() {
      return {
        adviseType: '',
        adviseTitle: '',
        adviseContent: '',
        typeData: []
      }
    },
    created() {
      
    },
    mounted() {
      this.getAdviseType();
    },
    props: [],
    components: {
      headerFix
    },
    computed: {},
    updated() {
      
    },
    methods: {
      //留言类型
      async getAdviseType() {
        let data = await CommentType();
        if (data.Type == 1) {
          this.typeData = data.Data.List;
        }
      },
      //添加留言
      async addAdvise() {
        if(!this.adviseTitle){alert("标题不能为空！");return;}
        if(!this.adviseContent){alert("反馈内容不能为空！");return;}
        if(!this.adviseType){alert("请选择反馈类型！");return;}
        let data = await AddMessage({Title: this.adviseTitle, Content: this.adviseContent, ClassCode: this.adviseType});
        if (data.Type == 1) {
          alert('提交成功');
          this.$router.push('personalCenter');
        }else if(data.Type != 401){
          alert(data.Message);
        }
      },
      changeType(type) {
        this.adviseType = type;
      }
    },
    watch: {}
    
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .advise {
    padding-top: toRem(92px);
    height: 92vh;
    background-color: $fill-body;
    .advise_type {
      background-color: $fill-base;
      @include flex(center);
      height: toRem(190px);
      align-items: center;
    }
    .advise_type_item {
      display: inline-block;
      width: toRem(160px);
      height: toRem(75px);
      line-height: toRem(75px);
      text-align: center;
      border: 2px solid #999;
      border-radius: 0.133333rem;
      font-size: 0.346667rem;
      color: #666;
      margin: 0 toRem(30px);
      &.active {
        border: 2px solid $brand-primary;
        color: $brand-primary;
      }
    }
    .advise_title {
      padding: 0 toRem(20px);
      margin: toRem(20px) 0;
      background-color: $fill-base;
      input{
        display: block;
        width: 100%;
        height: toRem(80px);
        line-height: toRem(80px);
        font-size: toRem(28px);
      }
    }
    .advise_content{
      padding: toRem(20px);
      background-color: $fill-base;
      textarea{
        display: block;
        width: 100%;
        font-size: toRem(28px);
        resize: none;
      }
    }
    .advise_submit{
      text-align: center;
      padding: toRem(40px) toRem(30px);
    }
  }
</style>
