/**
* 个人信息修改
*/
<template>
  <div class="user_info_edit">
    <!--头部-->
    <header-fix title="个人信息修改" fixed>
      <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
    </header-fix>
    <div class="setting_1">
      <div class="setting_item">
        <span class="label">姓名</span>
        <div class="right"><span class="user">{{userInfo.Username}}</span></div>
      </div>
      <div class="setting_item">
        <span class="label">部门</span>
        <div class="right"><span class="department">{{userInfo.GroupName}}</span></div>
      </div>
      <div class="setting_item">
        <span class="label">身份证号</span>
        <div class="right"><input v-model="infoSend.IdCard" type="text" maxlength="18"/></div>
      </div>
    </div>
    <div class="setting_2">
      <div class="setting_item">
        <span class="label">电子邮箱</span>
        <div class="right">
          <input v-model="infoSend.Email" type="text"/>
        </div>
      </div>
      <div class="setting_item">
        <span class="label">职级</span>
        <div class="right"><p @click="openGradeList">{{userInfo.GradeName}} &nbsp;></p></div>
      </div>
      <div class="setting_item">
        <span class="label">职务</span>
        <div class="right"><input v-model="infoSend.Business" type="text"/></div>
      </div>

    </div>
    <div class="setting_3">
      <div class="setting_item">
        <span class="label">性别</span>
        <div class="right">
          <mt-radio v-model="infoSend.Sex" :options="sexList"></mt-radio>
        </div>
      </div>
      <div class="setting_item">
        <span class="label">民族</span>
        <div class="right"><input v-model="infoSend.Nation" type="text"/></div>
      </div>
      <div class="setting_item">
        <span class="label">学历</span>
        <div class="right"><p @click="openDegreeList">{{userInfo.DegreeName}} &nbsp;></p></div>
      </div>
      <div class="setting_item">
        <span class="label">政治面貌</span>
        <div class="right"><input v-model="infoSend.Party" type="text"/></div>
      </div>
      <div class="setting_item">
        <span class="label">出生日期</span>
        <div class="right"><p @click="openBirthday">{{userInfo.Birthday | dateFilter("yyyy-MM-dd")}} &nbsp;></p></div>
      </div>
      <div class="setting_item">
        <span class="label">办公室电话</span>
        <div class="right"><input v-model="infoSend.Tel" type="text"/></div>
      </div>
    </div>
    <div class="subimt_edit">
      <mt-button type="primary" size="large" @click.native="updateUserInfo">保存</mt-button>
    </div>
    <!--职级选择器-->
    <mt-popup
        v-model="isShowGradeList"
        popup-transition="popup-fade"
        position="bottom">
      <div slot class="grade_list">
        <mt-picker :slots="gradeSlots" show-toolbar value-key="Name" @change="onGradeChange">
          <div class="clearFix">
            <span class="btn pull-left" @click="closeGradeList">取消</span>
            <span class="btn pull-right" @click="confirmGradeList">确定</span>
          </div>
        </mt-picker>
      </div>
    </mt-popup>
    <!--学历选择器-->
    <mt-popup
        v-model="isShowDegreeList"
        popup-transition="popup-fade"
        position="bottom">
      <div slot class="degree_list">
        <mt-picker :slots="degreeSlots" show-toolbar value-key="Name" @change="onDegreeChange">
          <div class="clearFix">
            <span class="btn pull-left" @click="closeDegreeList">取消</span>
            <span class="btn pull-right" @click="confirmDegreeList">确定</span>
          </div>
        </mt-picker>
      </div>
    </mt-popup>
    <!--日期选择器-->
    <mt-datetime-picker
        v-model="birthday"
        type="date"
        ref="birthdayPicker"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        :startDate="new Date(1900,0,1)"
        :endDate="new Date()"
        @confirm="selectedBirthday">
    </mt-datetime-picker>
  </div>
</template>
<script>
  import {Toast, MessageBox} from 'mint-ui'
  import {headerFix} from '../components'
  import {goBack} from '../service/mixins'
  import {formatDate} from '../plugins/utils'
  import {GetUserInfo, UpdateUserInfo, GetGradeList, GetDegreeList} from '../service/getData'

  export default {
    mixins: [goBack],
    data() {
      return {
        userInfo: {}, //用户信息
        infoSend: {
          Account: '', //帐号
          Name: '', //姓名
          DepartmentName: '', //部门名称
          GroupId: '', //单位 编号
          IdCard: '', //身份证
          Email: '', //邮箱
          Grade: '', //职级
          Business: '', //职务
          Sex: '', //性别
          Nation: '', //民族
          Degree: '', //学历
          Party: '', //政治面貌
          Birthday: '', //出生日期
          Tel: '', //办公室电话
          Mobile: '', //手机号码
          SmgCode: '', //验证码
        },//提交数据

        gradeSelected: {},//被选中职级的数据
        gradeList: [],//职级列表
        isShowGradeList: false, //是否显示职级选择器
        gradeSlots: [ //职级数据
          {
            flex: 1,
            values: [],
            defaultIndex: 1,
            className: 'gradeList',
            textAlign: 'center'
          }
        ],
        sexList: ['男', '女'],//性别

        degreeSelected: {},//被选中学历的数据
        degreeList: [],//学历列表
        isShowDegreeList: false,//是否显示学历选择器
        degreeSlots: [ //职级数据
          {
            flex: 1,
            values: [],
            defaultIndex: 1,
            className: 'degreeList',
            textAlign: 'center'
          }
        ],

        birthday: "",//出生日期
        isPassIdCard: true,//身份证号码验证
        isPassEmail: true,//邮箱验证

      }
    },
    created() {
      this.getUserInformation();
      this.getGradeList();
      this.getDegreeList();
    },
    mounted() {
    },
    props: [],
    components: {
      headerFix
    },
    computed: {},
    updated() {
      
    },
    methods: {
      //职级选择器
      onGradeChange(picker, values) {
        let selected = values[0];
        if (selected) {
          this.gradeSelected = selected;
        }
      },
      closeGradeList() {
        this.isShowGradeList = false;
      },
      openGradeList() {
        this.isShowGradeList = true;
      },
      confirmGradeList() {
        this.isShowGradeList = false;
        this.infoSend.Grade = this.gradeSelected.Id;
        this.userInfo.GradeName = this.gradeSelected.Name;
      },
      //学历选择器
      onDegreeChange(picker, values) {
        let selected = values[0];
        if (selected) {
          this.degreeSelected = selected;
        }
      },
      closeDegreeList() {
        this.isShowDegreeList = false;
      },
      openDegreeList() {
        this.isShowDegreeList = true;
      },
      confirmDegreeList() {
        this.isShowDegreeList = false;
        this.infoSend.Degree = this.degreeSelected.Id;
        this.userInfo.DegreeName = this.degreeSelected.Name;
      },
      //生日选择
      selectedBirthday(time) {
        let formate = formatDate(time, "yyyy-MM-dd");
        this.infoSend.Birthday = formate;
        this.userInfo.Birthday = time;
      },
      //打开生日选择器
      openBirthday() {
        this.$refs.birthdayPicker.open();
      },
      //关闭生日选择器
      closeBirthday() {
        this.$refs.birthdayPicker.close();
      },
      async getUserInformation() {
        let data = await GetUserInfo();
        if (data.Type == 1) {
          this.userInfo = data.Data;
          this.birthday = new Date(data.Data.Birthday);
          this.infoSend = {
            Account: data.Data.UserAccount,
            Name: data.Data.Username,
            DepartmentName: data.Data.DepartmentName,
            GroupId: data.Data.GroupId,
            IdCard: data.Data.IdCard,
            Email: data.Data.Email,
            Grade: data.Data.Grade,
            Business: data.Data.UserZW,
            Sex: data.Data.Sex,
            Nation: data.Data.Nation,
            Degree: data.Data.Degree,
            Party: data.Data.Party,
            Birthday: data.Data.Birthday,
            Tel: data.Data.Tel,
//            Mobile: data.Data.Mobile,
            SmgCode: ''
          };
        } else if (data.Type != 401) {
          MessageBox('警告', data.Message);
        }
      },
      async getGradeList() {
        let data = await GetGradeList();
        if (data.Type == 1) {
          this.gradeList = data.Data.GroupInfoList;
          this.gradeSlots[0].values = data.Data.GroupInfoList;
        }
      },
      async getDegreeList() {
        let data = await GetDegreeList();
        if (data.Type == 1) {
          this.degreeList = data.Data.GroupInfoList;
          this.degreeSlots[0].values = data.Data.GroupInfoList;
        }
      },
      //保存修改
      async updateUserInfo() {
        if (this.isPassIdCard && this.isPassEmail) {
          let data = await UpdateUserInfo(this.infoSend);
          if (data.Type == 1) {
            Toast({message: "修改成功！", position: 'bottom'});
            this.$router.push('setting');
          } else if (data.Type != 401) {
            MessageBox('警告', data.Message);
          }
        } else if (!this.isPassIdCard) {
          Toast({message: "请输入18位有效身份证号！", position: 'bottom'});
        } else if (!this.isPassEmail) {
          Toast({message: "邮箱格式错误！", position: 'bottom'});
        }
      },

    },
    watch: {
      'infoSend.IdCard': {
        handler: function (val, oldVal) {
          if (val) {
            let regIdCard = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
            this.isPassIdCard = regIdCard.test(val);
          }
        }
      },
      'infoSend.Email': {
        handler: function (val, oldVal) {
          let regEmail = /^([\w\.\-]+)\@(\w+)(\.([\w^\_]+)){1,2}$/;
          if (val) {
            this.isPassEmail = regEmail.test(val);
          }
        }
      },
    }
    
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .user_info_edit {
    padding-top: toRem(92px);
    height: 92vh;
    background-color: $fill-body;
    .setting_item {
      @extend %clearFix;
      margin: 0 toRem(30px);
      height: toRem(82px);
      line-height: toRem(82px);
      border-bottom: 1px solid $border-color-base;
      font-size: 14px;
      &:last-child {
        border-bottom: transparent;
      }
    }
    .label {
      @extend %pull-left;
      text-align: left;
    }
    .right {
      @extend %pull-right;
      text-align: right;
      input {
        text-align: right;
        line-height: 1.2em;
        padding: toRem(10px) toRem(20px);
      }
    }
    .user, .department {
      display: inline-block;
      background-color: #efefef;
      border: 1px dotted #b8b8b8;
      height: toRem(55px);
      padding: 0 toRem(20px);
      line-height: toRem(55px);
      @include borderRadius(6px);
    }
    .picker-toolbar {
      background-color: $brand-primary;
      color: $color-text-reverse;
      font-size: 16px;
      .btn {
        display: inline-block;
        @include ht-lineHt(80px);
        width: 50%;
        text-align: center;
      }
    }
    .mint-popup-bottom {
      width: 100%;
    }
    .setting_1 {
      background-color: $fill-base;
    }
    .setting_2 {
      background-color: $fill-base;
      margin: toRem(20px) 0;
    }
    .setting_3 {
      background-color: $fill-base;
    }
    .mint-radiolist {
      width: toRem(600px);
      .mint-radiolist-title {
        margin: 0;
      }
      .mint-cell {
        @include ht-lineHt(80px);
        min-height: toRem(30px);
        width: 40%;
        float: left;
        border-bottom: none;
      }
      .mint-cell-wrapper {
        display: inline-block;
        @include ht-lineHt(80px);
        border-bottom: none;
      }
      .mint-radiolist-label {
        display: inline-block;
      }
    }
    .mint-datetime-action {
      color: $color-text-reverse;
    }
    .subimt_edit {
      margin-top: toRem(50px);
      padding: 0 toRem(30px);
    }
  }
</style>
