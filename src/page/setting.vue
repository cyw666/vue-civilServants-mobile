/**
* 设置
*/
<template>
  <div class="setting">
    <!--头部-->
    <header-fix title="设置" fixed>
      <a @click="goBack" slot="left"><img class="back_img" src="../assets/arrow.png" alt=""></a>
    </header-fix>
    <div class="cell_list_one">
      <mt-cell title="个人信息修改" is-link to="/userInfoEdit"></mt-cell>
      <mt-cell title="修改手机号码" is-link to="/changeMobile"></mt-cell>
      <mt-cell title="修改密码" is-link to="/changePwd"></mt-cell>
    </div>
    <div class="cell_list_two">
      <mt-cell is-link>
        <a class="callUs" slot="title" href="tel://0571-28990788">联系我们</a>
      </mt-cell>
    </div>
  </div>
</template>
<script>
  import {headerFix} from '../components'
  import {goBack} from '../service/mixins'

  export default {
    mixins: [goBack],
    components: {
      headerFix
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .setting{
    height: 92vh;
    background-color: $fill-body;
    padding-top: toRem(92px);
    .cell_list_two{
      margin-top: toRem(20px);
      .callUs{
        margin-left: toRem(30px);
        display: inline-block;
        width: 100%;
      }
    }
  }
</style>
