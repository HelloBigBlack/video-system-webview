<template>
  <div class="myApp">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  body{
    margin: 0px;
    padding: 0px;
    background-image: url(./../../assets/background2.jpg);
    background-size: 100%;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
</style>
<style scoped>
  body{
    margin: 0px;
    padding: 0px;
  }
  .myApp{
    overflow: hidden;
  }
</style>
