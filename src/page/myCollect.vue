/**
*我的收藏
*/
<template>
  <div class="my_collect container_top">
    <!--头部-->
    <header-fix title="我的收藏" fixed>
      <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
      <span slot="right" @click="toggleEdit">{{showEdit ? '取消' : '编辑'}}</span>
    </header-fix>
    <div class="date_select clearFix">
      <p class="pull-left">{{selectedTime.startDate}} ~ {{selectedTime.endDate}}</p>
      <p class="pull-right" @click="togglePicker">选择日期：<i class="webapp webapp-calendar"></i></p>
    </div>
    <div class="collect_list">
      <collect-item v-for="(item,index) in collectData"
                    :key="item.id"
                    v-model="deleteData[item.id]"
                    :show-check.sync="showEdit"
                    :delete-item="deleteItem"
                    :option="item"
      >
        <div slot="content" class="clearFix collect_content">
          <div class="left_content">{{sortNum(index + 1)}}.</div>
          <div class="right_content">
            <p class="collect_title">
              <span class="error">看书 | </span>
              <span>{{item.title}}</span>
            </p>
            <p class="collect_date">日期：{{item.date}}</p>
          </div>
        </div>
      </collect-item>
    </div>
    <transition name="slide-top-collect">
      <div class="edit_footer" v-if="showEdit">
        <span class="check_all" @click="toggleCheckedAll">{{checkedAll ? '取消' : '全选'}}</span>
        <span class="del_select" @click="deleteChecked">删除</span>
      </div>
    </transition>
    <!--时间选择器-->
    <transition name="slide-left">
      <date-time-picker
          class="picker_container"
          v-if="showTimerPicker"
          :selected-time.sync="selectedTime"
      >
        <!--头部-->
        <header-fix slot="header" title="日期选择" fixed>
          <span slot="left" @click="togglePicker">取消</span>
          <span slot="right" @click="pickerComplete">完成</span>
        </header-fix>
      </date-time-picker>
    </transition>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { InfiniteScroll } from 'mint-ui'
  import { headerFix, collectItem, dateTimePicker } from '../components'
  import { goBack } from '../service/mixins'
  import { formatDate } from '../plugins/utils'

  Vue.use(InfiniteScroll)
  export default {
    mixins: [goBack],
    data () {
      return {
        showEdit: false, //是否显示编辑
        showTimerPicker: false, //是否显示日期选择
        checkedAll: false, //是否全选
        deleteData: {},
        collectData: [
          {id: '1', title: '《梦想创造辉煌行动改变世界》获得学分2.0个学分', date: '2018-1-5'},
          {id: '2', title: '《从日本看钓鱼岛》获得学分2.0个学分', date: '2017-12-1'},
          {id: '3', title: '《梦想创造辉煌行动改变世界》获得学分2.0个学分', date: '2017-11-5'},
        ],
        selectedTime: {
          startDate: formatDate(new Date('2018-1-1'), 'yyyy-MM-dd'),
          endDate: formatDate(new Date(), 'yyyy-MM-dd'),
        }
      }
    },
    created () {
      
    },
    mounted () {
      this.getCollectList()
    },
    props: [],
    components: {
      headerFix,
      collectItem,
      dateTimePicker,
    },
    computed: {},
    updated () {
      
    },
    methods: {
      getCollectList () {
        console.log('getCollectList', this.selectedTime)
        let deleteData = {}
        this.collectData.forEach((item, index) => {
          deleteData[item.id] = false
        })
        this.deleteData = deleteData
      },
      toggleEdit () {
        this.showEdit = !this.showEdit
      },
      togglePicker () {
        this.showTimerPicker = !this.showTimerPicker
      },
      deleteItem (item) {
        console.log('deleteItem:', item)
      },
      sortNum (num) {
        let index = parseInt(num)
        if (index < 10) {
          return `0${index}`
        }
        return index
      },
      pickerComplete () {
        this.togglePicker()
        this.getCollectList()
      },
      toggleCheckedAll () {
        let checkedAll = !this.checkedAll
        this.checkedAll = checkedAll
        let deleteData = {}
        this.collectData.forEach((item, index) => {
          deleteData[item.id] = checkedAll
        })
        this.deleteData = deleteData
      },
      deleteChecked () {
        console.log('删除')
      }
    },
    watch: {}
    
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .my_collect {
    .date_select {
      color: $color-text-thirdly;
      @include ht-lineHt(60px);
      padding: 0 toRem(25px);
      .webapp {
        color: $color-text-thirdly;
        margin-left: toRem(15px);
      }
    }
    .collect_list {
      background-color: $fill-base;
      width: 100%;
      overflow: hidden;
      .mint-checkbox-input:checked + .mint-checkbox-core {
        background-color: $brand-wait;
        border-color: $brand-wait;
      }
      .collect_content {
        width: toRem(750px);
        padding: toRem(30px) toRem(25px);
      }
      .left_content {
        @extend %pull-left;
        width: toRem(80px);
        line-height: toRem(41px);
      }
      .right_content {
        @extend %pull-left;
        width: toRem(570px);
        .collect_title {
          height: toRem(82px);
          line-height: toRem(41px);
          @include ellipsis_two();
        }
        .collect_date {
          color: $color-text-secondary;
        }
      }
      .error {
        color: $brand-error;
      }
    }
    .picker_container {
      position: fixed;
      z-index: 1000;
      top: 0;
      right: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: #fff;
    }
    .edit_footer {
      position: fixed;
      z-index: 10;
      bottom: 0;
      left: 0;
      width: 100%;
      @include flex(space-between);
      background-color: $fill-base;
      font-size: 16px;
      span {
        padding: toRem(34px) toRem(116px);
      }
      .check_all {
        color: $color-text-secondary;
      }
      .del_select {
        color: $brand-error;
      }
    }
  }

  :global {
    //向上滑动
    .slide-top-collect-enter-active, .slide-top-collect-leave-active {
      transition: all 0.5s;
    }

    .slide-top-collect-enter, .slide-top-collect-leave-to {
      transform: translateY(1.5rem);
      opacity: 0;
    }
  }
</style>
