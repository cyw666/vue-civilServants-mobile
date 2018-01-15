/**
* 树
*/
<template>
  <ul class="tree_container">
    <tree-node v-for="(item,index) in data"
               :data-list="item"
               @itemClick="selectedNode"
               :on-select="onSelect"
               :key="index">
    </tree-node>
  </ul>
</template>
<script>
  import treeNode from './treeNode.vue'

  export default {
    props: {
      data: Array,
      onSelect: Function,
    },
    components: {
      treeNode,
    },
    methods: {
      selectedNode(data) {
        this.onSelect(data);
      }
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
