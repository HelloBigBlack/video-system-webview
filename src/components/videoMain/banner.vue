<template>
  <div id="banner">
    <div class="banner-content">
      <div class="left"><span><a href="videoMain.html">SuperC动漫网站</a></span></div>
      <div class="right">
        <el-input v-model="input" placeholder="请输入内容" style="width: 300px"></el-input>
        <el-button @click="search">搜索</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'banner',
  data () {
    return {
      input: ''
    }
  },
  methods: {
    search () {
      window.open('searchVideo.html#/msg=' + this.input)
    }
  }
}
</script>

<style scoped>
  a{
    color: black;
    text-decoration: none;
  }
  #banner{
    width: 100%;
    height: 50px;
    background-color: #3a8ee6;
  }
  .banner-content{
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
    height: 100%;
  }
  .banner-content .left{
    float: left;
    font-size: 34px;
  }
  .banner-content .right{
    margin-top: 5px;
    float: right;
  }
</style>
