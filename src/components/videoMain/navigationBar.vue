<template>
 <div id="navigation-bar">
   <div class="bar-item" v-for="item in videoClasses" :key="item.id">
     <a :href="'#'+item.name"><span>{{item.name}}</span></a>
   </div>
 </div>
</template>

<script>
export default {
  name: 'navigation-bar',
  props: {
    videoClasses: []
  }
}
</script>

<style scoped>
  #navigation-bar{
    width: 1000px;
    height: 40px;
    margin-left: auto;
    margin-right: auto;
    background-color: #d7d1d9;
    border-radius: 7px;
    padding-left: 10px;
  }
  .bar-item{
    float: left;
    font-size: 18px;
    line-height: 40px;
    width: 60px;
    text-align: center;
  }
  a{
    color: #333333;
    text-decoration: none;
  }
</style>
