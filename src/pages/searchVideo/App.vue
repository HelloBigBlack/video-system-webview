<template>
  <div id="app">
    <div class="search-banner">
      <el-input placeholder="请输入内容" v-model="videoMsg.msg" style="width: 400px;"></el-input>
      <el-button @click="getVideosByMessage">搜索</el-button>
    </div>
    <div class="top">
      <div class="video-classes">
        <el-tabs v-model="activeName" @tab-click="tabHandleClick">
          <el-tab-pane label="全部" name=""></el-tab-pane>
          <el-tab-pane v-for="item in videoClasses" :key="item.index" :label="item.name" :name="item.name"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="videos-content">
      <single-video v-for="item in videos" :key="item.videoId" :video="item"></single-video>
    </div>
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
/* eslint-disable eqeqeq */

import SearchBanner from '../../components/searchVideo/searchBanner'
import httpclient from '../../utils/httpclient'
import SingleVideo from '../../components/searchVideo/singleVideo'

export default {
  components: {
    SingleVideo,
    SearchBanner},
  name: 'App',
  data () {
    return {
      videos: [],
      videoClasses: [],
      videoMsg: {
        msg: '',
        videoClass: '',
        maxTime: '',
        minTime: '',
        order: 'v.upload_time',
        orderType: 'desc'
      },
      pageInfo: {
        currentPage: 1,
        total: 0
      }
    }
  },
  mounted () {
    let msgArg = location.href
    msgArg = msgArg.split('=')[1]
    this.videoMsg.msg = msgArg
    httpclient({
      url: 'video/getVideoClasses',
      method: 'get'
    }).then(response => {
      if (response.data.code === 520) {
        this.videoClasses = response.data.extend.videoClasses
      }
    })
    this.getVideosByMessage()
  },
  methods: {
    handleCurrentChange (val) {
      this.pageInfo.currentPage = val
      this.getVideosByMessage()
    },
    tabHandleClick (tab) {
      this.videoMsg.videoClass = tab.name
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
          pn: this.pageInfo.currentPage,
          num: 12
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

<style>

</style>
<style scoped>
  .top{
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
  }
  .top .video-classes{
    margin-top: 30px;
  }
  .search-banner{
    width: 500px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 40px;
  }
  .videos-content{
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
  }
  .my-pagination{
    margin-right: auto;
    margin-left: auto;
    width: 500px;
  }
</style>
