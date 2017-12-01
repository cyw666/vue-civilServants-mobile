/**
* 树节点
*/
<template>
  <li class="tree_node">
    <div class="tree_title">
      <span v-if="hasNodes" class="red_line pull-left"></span>
      <span v-if="!hasNodes" class="tran_line pull-left"></span>
      <a class="tree_name" @click="nodeClick(dataList)">{{dataList.Name}}</a>
      <div class="tree_toggle_icon" v-if="hasNodes">
        <img v-if="!open" @click="toggle" src="../assets/dropdown.png" alt="">
        <img v-if="open" @click="toggle" src="../assets/pullup.png" alt="">
      </div>
    </div>
    <ul class="tree_container" v-show="open" v-if="hasNodes">
      <node v-for="item in dataList.Nodes" :data-list="item" @itemClick="selectedNode" :on-select="onSelect" key="$index"></node>
    </ul>
  </li>
</template>
<script>
  export default {
    name: "node",
    data() {
      return {
        open: false,
      }
    },
    created() {
      
    },
    mounted() {
      
    },
    props: ["dataList","onSelect"],
    components: {},
    computed: {
      hasNodes: function () {
        return this.dataList.Nodes && this.dataList.Nodes.length;
      }
    },
    updated() {
      
    },
    methods: {
      toggle() {
        this.open = !this.open;
      },
      nodeClick(data){
        this.$emit("itemClick",data)
      },
      selectedNode(data){
        this.onSelect(data);
      }
    },
    watch: {}
    
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .tree_container {
    padding: 0 0 0 toRem(20px);
  }

  .tree_node {
    font-size: toRem(30px);
  }

  .tree_title {
    /*border-bottom: 2px solid $border-color-base;*/
    @include ht-lineHt(90px);
    @extend %clearFix;
    .tree_name {
      display: inline-block;
      width: 70%;
      @extend %ellipsis;
      line-height: toRem(90px);
    }
    .tree_toggle_icon {
      @extend %pull-right;
      padding-right: toRem(20px);
      img {
        width: toRem(32px);
      }
    }
    .tran_line {
      display: inline-block;
      width: toRem(6px);
      height: toRem(28px);
      margin-right: toRem(20px);
      background-color: transparent;
    }
    .red_line, .tran_line {
      margin-top: toRem(30px);
    }
  }
</style>
