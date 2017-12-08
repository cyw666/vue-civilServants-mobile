<template>
  <div class="exam">
    <!--头部-->
    <header-fix :title="examTitle" fixed>
      <router-link to="/" slot="left"><img class="back_img" src="../assets/arrow.png" alt=""></router-link>
      <router-link slot="right" to="/courseSearch"><img class="search" src="../assets/search.png" alt=""></router-link>
    </header-fix>
    <div class="exam_header">
      <img src="../assets/time_ico.png" alt="">
      <span>剩余时间：{{timeLimit ? timeLimt + "分钟" : "不限时"}}</span>
    </div>
    <div class="exam_content" v-for="(list,index) in exam" v-show="(itemNum-1)==index">
      <p class="exam_name">
        <span class="red" v-if="list.ThemeType==0">【判断题】</span>
        <span class="red" v-if="list.ThemeType==1">【单选题】</span>
        <span class="red" v-if="list.ThemeType==2">【多选题】</span>
        <span>{{index + 1 + "." + list.ThemeTitle}}</span>
        <!--<span class="red">({{list.ThemeScore}}分)</span>-->
      </p>
      <ul class="exam_list">
        <p v-if="list.ThemeType == 2">
          <mb-checklist :options="list.ItemInfo" v-model="choosedItem[list.ThemeId]"></mb-checklist>
        </p>
        <p v-else>
          <mb-radio :options="list.ItemInfo" v-model="choosedItem[list.ThemeId]"></mb-radio>
        </p>
      </ul>
    </div>
    <div class="exam_footer">
      <mt-button class="prev" type="primary" plain @click.native='preItem'>上一题</mt-button>
      <span class="itemNum">{{itemNum}}/{{allItem}}</span>
      <mt-button v-if="itemNum<allItem" type="primary" class="next" @click.native="nextItem">下一题</mt-button>
      <mt-button v-else type="primary" class="next" @click.native="submitExam">提交</mt-button>
    </div>
  </div>
</template>
<script>
  import {MessageBox} from 'mint-ui';
  import {headerFix, mbChecklist, mbRadio} from '../components'
  import {GetExam, UpdateUserExam} from '../service/getData'

  export default {
    data() {
      return {
        exam: [],
        examTitle: '',//标题
        examId: '',
        timeLimit: 0, //时间限制
        itemData: null, //当前显示题目data
        itemNum: 1,//第几题
        allItem: 0,
        userInfo: null,
        choosedItem: {},
        sendData: [],
        startDate: "",//考试开始时间
      }
    },
    created() {
      this.examId = this.$route.query.id;
      this.startDate = new Date();
    },
    mounted() {
      this.getExam();
    },
    props: [],
    components: {
      headerFix,
      mbChecklist,
      mbRadio
    },
    computed: {},
    updated() {

    },
    methods: {
      async getExam() {
        let data = await GetExam({Id: this.examId});
        let exam = data.Data;
        this.exam = exam.ThemeInfoList;
        this.examTitle = exam.ExamTitle;
        this.timeLimit = exam.TimeLimit;
        this.allItem = exam.ThemeCount;
        this.itemData = exam.ThemeInfoList[0];
        //初始化choosedItem
        this.exam.forEach((item, index) => {
          let themeID = item.ThemeId;
          let examType = item.ThemeType;
          if (examType == 2) {
            this.choosedItem[themeID] = []; //多选model类型为数组
          } else {
            this.choosedItem[themeID] = '';
          }
        });
      },
      //点击下一题
      nextItem() {
        let key = this.itemData.ThemeId;
        if (this.choosedItem[key]) {
          this.itemNum++;
        } else {
          MessageBox('提示', '请选择选项！');
        }
      },
      //点击上一题
      preItem() {
        if (this.itemNum > 1) {
          this.itemNum--;
        } else {
          this.itemNum = 1;
        }
      },
      //提交考试
      async submitExam() {
        let params = this.changeSendData(this.choosedItem);
        MessageBox.confirm('确定提交试卷?').then(() => {
          let t = this;
          UpdateUserExam({ExamId: this.examId, Data: params})
            .then(function (data) {
              if (data.Type == 1) {
                let endDate = new Date();
                let usedTime = endDate - t.startDate;
                let queryData = {...data.Data, ...{usedTime}, ...{examId: t.examId}};
                t.$router.push({path: "examResult", query: {data: JSON.stringify(queryData)}});
              }
            })
        });
      },
      choseItem(id) {
        this.itemId = id;
      },
      changeSendData(data) {
        if (data) {
          let params = [];
          for (let key in data) {
            let list = {};
            list.QuestionId = key;
            if (data[key] instanceof Array) {
              list.Answer = data[key].join();
            } else {
              list.Answer = data[key];
            }
            params.push(list);
          }
          return params;
        }
      },
    },
    watch: {
      itemNum: function (val) {
        this.itemData = this.exam[val - 1];
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../style/mixin';

  .exam {
    .exam_header {
      padding-top: toRem(92px);
      margin: 0 toRem(30px);
      border-bottom: 1px solid $border-color-base;
      text-align: center;
      font-size: toRem(32px);
      line-height: toRem(62px);
      img {
        width: toRem(29px);
      }
    }
    .exam_content {
      padding: 0 toRem(30px);
      .exam_name {
        margin: toRem(30px) 0 toRem(100px) 0;
        span {
          font-size: toRem(32px);
        }
        .red {
          color: $brand-primary;
        }
      }
      .exam_list {
        margin-top: toRem(20px);
        li {
          border-bottom: 1px solid $fill-tap;
          /*height: torem(40px);*/
          line-height: toRem(80px);
          input:focus {
            outline: none;
          }
          label {
            display: inline-block;
            width: 85%;
            font-size: toRem(32px);
          }
          padding: 0 toRem(20px);
        }
      }
    }
    .exam_footer {
      position: fixed;
      width: 100%;
      bottom: toRem(20px);
      text-align: center;
      left: 0;
      /*line-height: 73px;*/
      .mint-button {
        @include wh(150px, 73px);
        padding: 0;
      }
      .prev {
        margin-left: toRem(30px);
      }
      .itemNum {
        display: inline-block;
        width: toRem(350px);
        font-size: toRem(30px);
        line-height: toRem(73px);
      }
      .next {
        margin-right: toRem(30px);
      }
    }
  }
</style>
