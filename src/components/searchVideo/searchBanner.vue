<template>
  <div id="search-banner">
    <el-input placeholder="请输入内容" :v-model="msg" style="width: 400px;"></el-input>
    <el-button @click="searchVideo">搜索</el-button>
  </div>
</template>

<script>
export default {
  name: 'search-banner',
  props: {
    msg: ''
  },
  methods: {
    searchVideo () {
      this.$emit('searchVideo')
    }
  }
}
</script>

<style scoped>
  #search-banner{
    width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
</style>
