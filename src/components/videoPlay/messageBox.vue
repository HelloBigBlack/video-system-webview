<template>
  <div id="message-box">
    <div class="name">
      <span>{{'#' + messageBox.userName + '# :'}}</span>
    </div>
    <div class="content">
      <span>{{messageBox.messageText}}</span>
    </div>
    <div class="the-horizon-of-love"></div>
  </div>
</template>

<script>
export default {
  name: 'message-box',
  props: {
    messageBox: {
      userName: '',
      messageText: ''
    }
  }
}
</script>

<style scoped>
  .the-horizon-of-love{
    height: 1px;
    margin-top: 8px;
    margin-bottom: 8px;
    border-top-style: solid;
    border-top-color: #ffccc0;
    border-top-width: 1px;
    float: left;
    width: 600px;
    clear: right;
  }
  .content{
    margin-left: 10px;
    clear: both;
  }
  .name{
    clear: both;
  }
</style>
