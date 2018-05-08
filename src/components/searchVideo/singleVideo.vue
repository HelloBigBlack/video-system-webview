<template>
  <div id="single-video">
    <el-card :body-style="{ padding: '0px' }">
      <div class="img" @click="openVideo(video.videoId)">
        <img :src="'http://localhost:3000/' + video.imgUrl"/>
      </div>
      <div style="padding: 10px;height: 50px">
        <span style="cursor: pointer" @click="openVideo(video.videoId)">{{video.videoTitle}}</span>
        <!--<div class="bottom clearfix">-->
          <!--<time class="time">{{video.uploadTime}}</time>-->
        <!--</div>-->
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
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
  methods: {
    openVideo (videoId) {
      window.open('http://localhost:9090/videoPlay.html#/videoPlay/' + videoId, '_blank')
    }
  }
}
</script>

<style scoped>
  #single-video{
    overflow: hidden;
    height: 210px;
    width: 233px;
    float: left;
    clear: none;
    margin-right: 15px;
    margin-bottom: 15px;
  }
.el-card{
  width: 100%;
}
.el-card:nth-child(4){
  margin-right: 0px;
}
.img{
  width: 100%;
  height: 135px;
  overflow: hidden;
  cursor: pointer;
}
  img{
    width: 100%;
  }
  span{
    font-size: 12px;
  }
</style>
