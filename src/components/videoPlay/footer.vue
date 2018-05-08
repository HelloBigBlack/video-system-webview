<template>
  <div id="my-footer">
    <div class="content">
      <div class="box">
        <div class="message">
          <div class="message-head"><span>SuperC</span></div>
          <div class="message-body">
            <div class="item"><span>关于我们</span></div>
            <div class="item"><span>联系我们</span></div>
            <div class="item"><span>加入我们</span></div>
            <div class="item"><span>友情链接</span></div>
            <div class="item"><span>官方认证</span></div>
            <div class="item"><span>Investor Relations</span></div>
          </div>
        </div>
      </div>
      <div class="box"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-footer'
}
</script>

<style scoped>
  #my-footer{
    margin-top: 30px;
    width: 100%;
    height: 250px;
    background-color: rgba(206, 224, 255, 0.6);
    clear: both;
  }
  .content{
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
    clear: both;
  }
  .content .message{
    margin-top: 40px;
    float: left;
    width: 200px;
  }
  .content .message .message-head{
    font-size: 13px;
    color: #545454;
  }
  .content .message .message-body{
    margin-top: 10px;
    font-size: 15px;
    color: grey;
    width: 200px;
  }
  .content .message .message-body .item{
    height: 30px;
    float: left;
    width: 100px;
  }
</style>
