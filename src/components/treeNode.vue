/**
* 树节点
*/
<template>
  <li class="tree_node">
    <div class="tree_title">
      <span v-if="hasNodes" class="primary_line pull-left"></span>
      <span v-if="!hasNodes" class="tran_line pull-left"></span>
      <a class="tree_name" @click="nodeClick(dataList)">{{dataList.Name}}</a>
      <div class="tree_toggle_icon" v-if="hasNodes">
        <i v-if="open" @click="toggle" class="webapp webapp-less"></i>
        <i v-if="!open" @click="toggle" class="webapp webapp-moreunfold"></i>
      </div>
    </div>
    <ul class="tree_container" v-show="open" v-if="hasNodes">
      <node v-for="(item,index) in dataList.Nodes" :data-list="item" @itemClick="selectedNode" :on-select="onSelect"
            :key="index"></node>
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
    props: ["dataList", "onSelect"],
    components: {},
    computed: {
      hasNodes: function () {
        return this.dataList.Nodes && this.dataList.Nodes.length;
      }
    },
    methods: {
      toggle() {
        this.open = !this.open;
      },
      nodeClick(data) {
        this.$emit("itemClick", data)
      },
      selectedNode(data) {
        this.onSelect(data);
      }
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .tree_container {
    width: 100%;
    padding: 0 0 0 toRem(20px);
  }

  .tree_node {
    font-size: 15px;
  }

  .tree_title {
    @include ht-lineHt(90px);
    @extend %clearFix;
    .tree_name {
      @extend %pull-left;
      width: 80%;
      @extend %ellipsis;
      line-height: toRem(90px);
    }
    .tree_toggle_icon {
      @extend %pull-right;
      padding-right: toRem(20px);
      .webapp {
        color: #999;
      }
    }
    .tran_line {
      display: inline-block;
      width: toRem(6px);
      height: toRem(28px);
      margin-right: toRem(20px);
      background-color: transparent;
    }
    .primary_line, .tran_line {
      margin-top: toRem(30px);
    }
  }
</style>
