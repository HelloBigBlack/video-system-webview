<template>
  <div id="video-play">
    <banner></banner>
    <div class="content">
      <div class="video-title">{{video.videoTitle}}</div>
      <div class="video-content">
        <video :src="'http://localhost:3000/' + video.videoUrl" controls="controls"></video>
      </div>
      <div class="video-message">
        <el-card class="message-card">
          <div class="time-and-class">
            <span>上传时间：{{video.uploadTime}}</span>
            <span>视频分类：{{video.videoClass}}</span>
          </div>
          <div class="brief">
            <span>视频简介：{{video.videoBrief}}</span>
          </div>
          <div class="video-tag">
            <span>视频标签：</span>
            <el-tag
              v-for="tag in video.videoLabel"
              :key="tag.index"
              size="mini">
              {{tag}}
            </el-tag>
          </div>
        </el-card>
      </div>
      <div class="messageBox">
        <el-card class="messageBox-messageCard">
          <div slot="header">
            <span>视频留言</span>
          </div>
          <message-box v-for="item in messageBox" :key="item.index" :message-box="item"></message-box>
          <div class="add-message">
            <el-input
              class="my-input"
              type="textarea"
              autosize
              placeholder="写下你的评论"
              v-model="messageText">
            </el-input>
            <el-button size="small" class="my-button" @click="addMessageBox">评 论</el-button>
          </div>
        </el-card>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import httpclient from '../../utils/httpclient'
import Banner from './banner'
import MessageBox from './messageBox'
import MyFooter from './footer'
export default {
  components: {
    MyFooter,
    MessageBox,
    Banner},
  name: 'video-play',
  beforeMount () {
    this.getVideoById()
    this.getMessageBox()
  },
  data () {
    return {
      video: {
        videoId: '',
        videoTitle: '',
        videoBrief: '',
        videoClass: '',
        videoLabel: '',
        imgUrl: '',
        videoUrl: '',
        uploadTime: '',
        videoTime: '',
        videoVisited: ''
      },
      messageBox: [],
      messageText: ''
    }
  },
  methods: {
    addMessageBox () {
      httpclient({
        url: 'message/addMessageBox',
        method: 'post',
        data: {
          userId: localStorage.getItem('userEmail'),
          messageText: this.messageText,
          videoId: this.$route.params.id
        }
      })
        .then(response => {
          if (response.data.code === 520) {
            this.$message.success('评论成功')
            this.messageText = ''
            this.getMessageBox()
          }
        })
    },
    getVideoById () {
      httpclient({
        url: 'video/getVideoById',
        params: {
          id: this.$route.params.id
        }
      })
        .then(response => {
          if (response.data.code === 520) {
            this.video = response.data.extend.video
            this.getVideoLabels()
          } else {
            this.$message.error('网络错误')
          }
        })
    },
    getVideoLabels () {
      this.video.videoLabel = this.video.videoLabel.split(',')
      this.video.videoLabel.pop()
    },
    getMessageBox () {
      httpclient({
        url: 'message/getMessageBoxByVideoId',
        method: 'get',
        params: {
          videoId: this.$route.params.id
        }
      })
        .then(response => {
          if (response.data.code === 520) {
            this.messageBox = response.data.extend.messageBox
          }
        })
    }
  }
}
</script>

<style scoped>
  #video-play{
    width: 100%;
    overflow: hidden;
  }
  .content{
    margin-left: auto;
    margin-right: auto;
    width:1000px;
    padding-top: 10px;
    overflow: hidden;
  }
  .content .video-title{
    font-size: 35px;
  }
  .content .video-content{
    width: 100%;
    border-radius: 10px;
    margin-top: 10px;
  }
  .content .video-content video{
    width: 800px;
    height: 500px;
    background-color: black;
    border-radius: 10px;
  }
  .content .video-message,.messageBox{
    width: 800px;
    float: left;
  }
  .content .video-message .message-card{
    width: 100%;
    font-size: 12px;
    margin-top: 6px;
  }
  .content .video-message .message-card .time-and-class span{
    margin-right: 15px;
  }
  .content .video-message .message-card .time-and-class{
    margin-bottom: 10px;
  }
  .content .video-message .message-card .video-tag{
    margin-top: 10px;
    font-size: 12px;
  }
  .content .messageBox .messageBox-messageCard{
    margin-top: 12px;
    padding-bottom: 12px;
  }
  .content .messageBox .add-message {
    overflow: hidden;
    clear: both;
  }
  .content .messageBox .add-message .my-input{
    width: 670px;
    float: left;
  }
  .content .messageBox .add-message .my-button{
    float: left;
    margin-left: 12px;
  }
</style>
