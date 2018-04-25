<template>
    <div id="message-box">
      <div class="userName"><span><el-tag size="mini">{{messageBox.userName + ':'}}</el-tag></span></div>
      <div class="messageBox">
        <el-card class="box-card">
          <div class="message-text">
            <span>{{messageBox.messageText}}</span>
          </div>
          <div class="messageBox_bottom">
            <div class="timestep"><span>{{messageBox.timestep}}</span></div>
            <div class="messageBox_button">
              <el-button type="danger" @click="deleteMessageBox" icon="el-icon-delete" size="mini">删除</el-button>
            </div>
          </div>
        </el-card>
      </div>
    </div>
</template>

<script>
import httpclient from '../../../utils/httpclient'
export default {
  name: 'message-box',
  props: {
    messageBox: {
      messageId: '',
      videoId: '',
      userId: '',
      messageText: '',
      timestep: '',
      userName: ''
    }
  },
  methods: {
    deleteMessageBox () {
      httpclient({
        url: 'message/deleteByMessageId',
        params: {
          messageId: this.messageBox.messageId
        }
      })
        .then(response => {
          if (response.data.code === 520) {
            this.$message.success('删除成功')
            this.$emit('deleteMessage')
          }
        })
    }
  }
}
</script>

<style scoped>
  #message-box{
    width: 700px;
  }
  .userName{
    width: 80px;
    float: left;
    padding-right: 10px;
    padding-top: 2px;
  }
  .userName span{
    float: right;
  }
  .messageBox{
    width: 600px;
    float: left;
  }
  .messageBox .box-card{
    width: 570px;
    margin-bottom: 9px;
    padding-bottom: 9px;
  }
  .messageBox .box-card .message-text{
    color: grey;
  }
  .messageBox .box-card .messageBox_bottom{
    color: grey;
    font-size: 12px;
  }
  .messageBox .box-card .messageBox_bottom .timestep{
    width: 200px;
    float: left;
  }
  .messageBox .box-card .messageBox_bottom .messageBox_button{
    float: right;
  }
</style>
