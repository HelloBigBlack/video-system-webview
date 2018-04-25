<!--suppress ALL -->
<template>
<div>
  <el-form :inline="true"  class="demo-form-inline">
    <el-form-item label="搜索">
      <el-input v-model="videoMsg.msg" placeholder="搜索内容"></el-input>
    </el-form-item>
    <el-form-item label="视频类别">
      <el-select v-model="videoMsg.videoClass" placeholder="视频类别">
        <el-option label="全部" value=""></el-option>
        <el-option
          v-for="item in video_Classes"
          :key="item.id"
          :label="item.name"
          :value="item.name">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="时长">
      <el-select v-model="videoTimeOption" placeholder="请选择">
        <el-option label="不限" value=""></el-option>
        <el-option label="小于5分钟" value="1"></el-option>
        <el-option label="5到10分钟" value="2"></el-option>
        <el-option label="10到30分钟" value="3"></el-option>
        <el-option label="大于30分钟" value="4"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="selectVideoByMessage">查询</el-button>
    </el-form-item>
  </el-form>
  <single-video
    v-for="video in videos"
    :key="video.index"
    :video="video"
    v-on:editVideoById="getVideosByMessage"
    v-on:deleteVideo="getVideosByMessage">
  </single-video>
  <div class="block my-pagination">
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="pageInfo.currentPage"
      :page-size="10"
      layout="prev, pager, next, jumper"
      :total="pageInfo.total">
    </el-pagination>
  </div>
</div>
</template>

<script>
import SingleVideo from './singleVideo'
import httpclient from '../../../utils/httpclient'

export default {
  components: {SingleVideo},
  name: 'video-manage',
  mounted () {
    this.getVideosByMessage()
    this.getVideoClass()
  },
  data () {
    return {
      videoTimeOption: '',
      videoMsg: {
        msg: '',
        videoClass: '',
        maxTime: '',
        minTime: '',
        order: 'v.upload_time',
        orderType: 'desc'
      },
      videos: [],
      pageInfo: {
        currentPage: 1,
        total: 0
      },
      video_Classes: []
    }
  },
  methods: {
    selectVideoByMessage () {
      this.pageInfo.currentPage = 1
      this.setTimeMsg()
      this.getVideosByMessage()
    },
    setTimeMsg () {
      switch (this.videoTimeOption) {
        case '1':
          this.videoMsg.minTime = '0'
          this.videoMsg.maxTime = '300'
          break
        case '2':
          this.videoMsg.minTime = '300'
          this.videoMsg.maxTime = '600'
          break
        case '3':
          this.videoMsg.minTime = '600'
          this.videoMsg.maxTime = '1800'
          break
        case '4':
          this.videoMsg.minTime = '1800'
          this.videoMsg.maxTime = '2147483647'
          break
        default:
          this.videoMsg.minTime = ''
          this.videoMsg.maxTime = ''
      }
    },
    getVideoClass () {
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
    handleCurrentChange (val) {
      this.pageInfo.currentPage = val
      this.getVideosByMessage()
    },
    getVideosByMessage () {
      httpclient({
        url: 'video/getByMessage',
        method: 'post',
        data: {
          message: this.videoMsg,
          msg: this.videoMsg.msg,
          videoClass: this.videoMsg.videoClass,
          maxTime: this.videoMsg.maxTime,
          minTime: this.videoMsg.minTime,
          order: this.videoMsg.order,
          orderType: this.videoMsg.orderType
        },
        params: {
          pn: this.pageInfo.currentPage
        }
      })
        .then(response => {
          if (response.data.code === 520) {
            this.videos = response.data.extend.pageInfo.list
            this.pageInfo.currentPage = parseInt(response.data.extend.pageInfo.pageNum)
            this.pageInfo.total = parseInt(response.data.extend.pageInfo.total)
          }
        })
    }
  }
}
</script>

<style scoped>
  .my-pagination{
    clear: both;
  }
</style>
