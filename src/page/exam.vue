<template>
  <div class="exam container_both">
    <!--头部-->
    <header-fix :title="examTitle" fixed>
      <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
      <router-link slot="right" to="/examSearch"><i class="webapp webapp-search"></i></router-link>
    </header-fix>
    <div class="exam_header">
      <i class="webapp webapp-time" style="color: #00aeff"></i>
      <span v-if="timeLimit">倒计时：{{timeLimit | formatTime}}</span>
      <span v-else>倒计时：不限时</span>
    </div>
    <div class="exam_content" v-for="(list,index) in exam" :key="index">
      <transition name="slide-left">
        <div v-if="itemNum == index + 1">
          <p class="exam_name">
            <span class="red" v-if="list.ThemeType==0">【判断题】</span>
            <span class="red" v-if="list.ThemeType==1">【单选题】</span>
            <span class="red" v-if="list.ThemeType==2">【多选题】</span>
            <span class="red" v-if="list.ThemeType==3">【简答题】</span>
            <span class="topic_name">{{index + 1 + "." + list.ThemeTitle}}</span>
            <span class="red">({{Number(list.ThemeScore).toFixed(1)}}分)</span>
          </p>
          <div class="exam_list">
            <div v-if="list.ThemeType == 0||list.ThemeType == 1">
              <mb-radio :options="list.ItemInfo" v-model="choosedItem[list.ThemeId]"></mb-radio>
            </div>
            <div v-else-if="list.ThemeType == 2">
              <mb-checklist :options="list.ItemInfo" v-model="choosedItem[list.ThemeId]"></mb-checklist>
            </div>
            <div v-else-if="list.ThemeType == 3">
          <textarea class="answerInput" v-model="choosedItem[list.ThemeId]" rows="15"
                    placeholder="在此处出入答案内容"></textarea>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="exam_footer">
      <mt-button class="prev" type="primary" plain @click.native='preItem'>上一题</mt-button>
      <span class="itemNum"><span>试题</span> （{{itemNum}}/{{allItem}}）</span>
      <mt-button v-if="itemNum<allItem" type="primary" class="next" @click.native="nextItem">下一题</mt-button>
      <mt-button v-else type="primary" class="next" @click.native="submitExam">提交</mt-button>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {MessageBox, Button} from 'mint-ui';
  import {goBack} from '../service/mixins'
  import {headerFix, mbChecklist, mbRadio} from '../components'
  import {GetExam, UpdateUserExam} from '../service/getData'
  import {formatTime} from '../plugins/utils'

  Vue.component(Button.name, Button);
  export default {
    mixins: [goBack],
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
    methods: {
      async getExam() {
        let data = await GetExam({Id: this.examId});
        if (data.Type == 1) {
          let exam = data.Data;
          this.exam = exam.ThemeInfoList;
          this.examTitle = exam.ExamTitle;
          this.timeLimit = exam.TimeLimit * 60;
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
          this.countDown();
        }
      },
      //点击下一题
      nextItem() {
        let key = this.itemData.ThemeId;
        if (this.choosedItem[key]) {
          this.itemNum++;
        } else {
          MessageBox('提示', '请选择选项');
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
      async upDateExam() {
        let t = this;
        let params = t.changeSendData(t.choosedItem);
        UpdateUserExam({ExamId: t.examId, Data: params})
          .then(function (data) {
            if (data.Type == 1) {
              let endDate = new Date();
              let usedTime = endDate - t.startDate;
              let queryData = {...data.Data, ...{usedTime}, ...{examId: t.examId}};
              t.$router.push({path: "examResult", query: {data: JSON.stringify(queryData)}});
            } else if (data.Type != 401) {
              MessageBox('警告', data.Message);
            }
          })
      },
      //提交考试
      submitExam() {
        MessageBox.confirm('确定提交试卷?').then(() => {
          this.upDateExam();
        });
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
      countDown() {
        let time = parseInt(this.timeLimit);
        let limitTimer = setInterval(() => {
          time -= 1;
          this.timeLimit = time;
          if (time <= 0) {
            clearInterval(limitTimer);
            MessageBox.alert('考试时间已到').then(action => {
              this.upDateExam();
            });
          }
        }, 1000);
      }
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
    background-color: $fill-base;
    font-size: 15px;
    .exam_header {
      padding: 0 toRem(30px);
      border-bottom: 1px solid $border-color-base;
      text-align: center;
      line-height: toRem(62px);
      img {
        width: toRem(29px);
      }
    }
    .exam_content {
      position: absolute;
      left: 0;
      padding: 0 toRem(40px);
      .exam_name {
        padding: toRem(30px) 0 toRem(100px) 0;
        .red {
          color: $brand-primary;
        }
      }
      .topic_name {
        line-height: toRem(50px);
      }
      .exam_list {
        .answerInput {
          width: 100%;
          padding: toRem(10px);
          resize: none;
          border: 1px solid $border-color-base;
          @include borderRadius(10px);
          font-size: 14px;
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
        line-height: toRem(73px);
        span {
          color: $color-text-secondary;
          font-size: 14px;
        }
      }
      .next {
        margin-right: toRem(30px);
      }
    }
  }
</style>
