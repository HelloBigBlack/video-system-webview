<template>
  <div id="single-video">
    <div class="img-div" @click="playVideoById">
      <img :src="'http://localhost:3000/' + video.imgUrl"/>
    </div>
    <div class="message-div">
      <div class="msg-title"><span @click="playVideoById" style="cursor: pointer;">{{video.videoTitle}}</span></div>
      <div class="msg-brief">{{video.videoBrief}}</div>
      <div class="msg-bottom">
        <div class="msg-bottom-visited"><i class="el-icon-view"></i>{{video.videoVisited}}</div>
        <div class="msg-bottom-video-time">
          <i class="el-icon-time"></i>
          {{secondToMinute(video.videoTime)}}
        </div>
        <div class="msg-bottom-video-upload-time"><i class="el-icon-upload"></i>{{video.uploadTime}}</div>
        <div class="msg-bottom-video-messageCount"><i class="el-icon-tickets" @click="dialogMessageBoxVisible = true">{{video.messageCount}}</i></div>
        <div class="msg-bottom-button">
          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="el-icon-arrow-down el-icon-more"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><span @click="openEditDialog">编辑</span></el-dropdown-item>
              <el-dropdown-item><span @click="deleteVideo">删除</span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="the-horizon-of-love"></div>
    <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
      <el-form :model="editVideo">
        <el-form-item label="标题" label-width="80px">
          <el-input v-model="editVideo.videoTitle"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="brief" label-width="80px">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="editVideo.videoBrief">
          </el-input>
        </el-form-item>
        <el-form-item label="视频类别" label-width="80px">
          <el-select v-model="editVideo.videoClass" placeholder="请选择">
            <el-option
              v-for="item in video_Classes"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="视频标签" label-width="80px">
          <el-tag
            :key="tag.index"
            v-for="tag in editVideo.videoLabel"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">添加</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editVideoById">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="视频留言"
      :visible.sync="dialogMessageBoxVisible"
      @open="getMessageBox"
      width="800px">
      <jar-of-message-box ref="jarOfMessageBox" :video-id="video.videoId"></jar-of-message-box>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogMessageBoxVisible = false">收起留言</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import httpclient from '../../../utils/httpclient'
import MessageBox from './MessageBox'
import JarOfMessageBox from './JarOfMessageBox'
export default {
  components: {
    JarOfMessageBox,
    MessageBox},
  name: 'single-video',
  props: {
    video: {
      videoId: '',
      videoTitle: '',
      videoBrief: '',
      videoClass: '',
      videoLabel: [],
      imgUrl: '',
      videoUrl: '',
      uploadTime: '',
      videoTime: '',
      videoVisited: '',
      messageCount: ''
    }
  },
  data () {
    return {
      dialogFormVisible: false,
      dialogMessageBoxVisible: false,
      inputVisible: false,
      inputValue: '',
      video_Classes: [],
      editVideo: {
        videoId: '',
        videoTitle: '',
        videoBrief: '',
        videoClass: '',
        videoLabel: [],
        imgUrl: '',
        videoUrl: '',
        uploadTime: '',
        videoTime: '',
        videoVisited: '',
        editVideoLabel: ''
      }
    }
  },
  methods: {
    getMessageBox () {
      this.$nextTick(function () {
        this.$refs.jarOfMessageBox.getMessageBoxByVideoId()
      })
    },
    playVideoById () {
      window.open('videoPlay.html#/videoPlay/' + this.video.videoId, '_blank')
    },
    editVideoById () {
      this.getVideoLabels()
      httpclient({
        url: 'video/updateVideoById',
        method: 'post',
        data: {
          videoId: this.editVideo.videoId,
          videoTitle: this.editVideo.videoTitle,
          videoBrief: this.editVideo.videoBrief,
          videoClass: this.editVideo.videoClass,
          videoLabel: this.editVideo.editVideoLabel
        }
      })
        .then(response => {
          if (response.data.code === 520) {
            this.$message.success('修改成功')
          } else {
            this.$message.error('网络错误')
          }
          this.dialogFormVisible = false
          this.editVideo.editVideoLabel = ''
          this.editVideo.videoLabel = []
          this.$emit('editVideoById')
        })
    },
    openEditDialog () {
      this.dialogFormVisible = true
      this.editVideo.videoId = this.video.videoId
      this.editVideo.videoTitle = this.video.videoTitle
      this.editVideo.videoBrief = this.video.videoBrief
      this.editVideo.videoClass = this.video.videoClass
      this.editVideo.videoLabel = this.video.videoLabel.split(',')
      this.editVideo.videoLabel.pop()
      this.getVideoClasses()
    },
    getVideoClasses () {
      httpclient({
        url: 'video/getVideoClasses',
        method: 'get'
      })
        .then(response => {
          if (response.data.code === 520) {
            this.video_Classes = response.data.extend.videoClasses
          } else {
            this.$message.error('网络错误')
          }
        })
    },
    secondToMinute (time) {
      let minute = parseInt(time / 60)
      if (minute.toString().length === 1) {
        minute = ('0' + minute).slice(-2)
      }
      let second = time % 60
      second = ('0' + second).slice(-2)
      return minute + ':' + second
    },
    deleteVideo () {
      this.$confirm('此操作将永久删除该视频, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteVideoById()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    deleteVideoById () {
      httpclient({
        url: 'video/delVideoById',
        method: 'post',
        params: {
          id: this.video.videoId
        }
      })
        .then(response => {
          if (response.data.code === 520) {
            this.$message.success('删除成功')
          } else {
            this.$message.error('网络错误')
          }
          this.$emit('deleteVideo')
        })
    },
    handleClose (tag) {
      this.editVideo.videoLabel.splice(this.editVideo.videoLabel.indexOf(tag), 1)
    },

    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        this.editVideo.videoLabel.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    getVideoLabels () {
      for (let id in this.editVideo.videoLabel) {
        this.editVideo.editVideoLabel = this.editVideo.editVideoLabel + this.editVideo.videoLabel[id] + ','
      }
    }
  }
}
</script>

<style scoped>
  #single-video{
    width: 975px;
  }
 .img-div{
  float: left;
  width: 160px;
  height: 100px;
  overflow: hidden;
  border-radius: 5px;
   clear: left;
   background-color: black;
   cursor: pointer;
   display:flex;/*Flex布局*/
   display: -webkit-flex; /* Safari */
   align-items:center;/*指定垂直居中*/
 }
 .img-div img{
   width: 100%;
   background-color: black;
   margin-top: auto;
   margin-bottom: auto;
 }
  .message-div{
    float: left;
    margin-left: 15px;
    height: 100px;
    overflow: hidden;
    width: 800px;
  }
  .message-div .msg-title{
    font-size: 18px;
    overflow: hidden;
    width: 100%;
    height: 30px;
  }
  .message-div .msg-title span{
    cursor: pointer;
  }
  .message-div .msg-title span:hover{
    color: #dd3510;
  }
  .message-div .msg-brief{
    float: left;
    width: 100%;
    font-size: 12px;
    color: grey;
    height: 50px;
    overflow: hidden;
  }
  .message-div .msg-bottom{
    height: 20px;
    overflow: hidden;
    float: left;
    font-size: 12px;
  }

  .message-div .msg-bottom .msg-bottom-visited,.msg-bottom-video-time,.msg-bottom-video-messageCount,.msg-bottom-video-upload-time,.msg-bottom-button{
    float: left;
    color: grey;
    height: 15px;
    margin-top: 5px;
    margin-right: 30px;
  }
  .message-div .msg-bottom .msg-bottom-video-messageCount{
    cursor: pointer;
  }
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
  .el-tag{
    margin-right: 10px;
  }
  .button-new-tag {
    margin-right: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-right: 10px;
    vertical-align: bottom;
  }
</style>
