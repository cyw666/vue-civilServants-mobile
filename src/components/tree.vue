/**
* 树
*/
<template>
  <ul class="tree_container">
    <tree-node v-for="item in data" :data-list="item" @itemClick="selectedNode" :on-select="onSelect" key="$index"></tree-node>
  </ul>
</template>
<script>
  import treeNode from './treeNode.vue'
  export default {
    data() {
      return {}
    },
    created() {
      
    },
    mounted() {
      
    },
    props: {
      data:Array,
      onSelect:Function,
    },
    components: {
      treeNode,
    },
    computed: {},
    updated() {
      
    },
    methods: {
      selectedNode(data){
        this.onSelect(data);
      }
    },
    watch: {}
    
  }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
