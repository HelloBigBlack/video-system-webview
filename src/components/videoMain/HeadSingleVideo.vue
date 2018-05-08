<template>
  <div id="head-single-video" @click="openVideo(video.videoId)">
    <div class="img">
      <img :src="'http://localhost:3000/' + video.imgUrl"/>
    </div>
    <div class="title">
      <h4>{{video.videoTitle}}</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: 'head-single-video',
  props: {
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
  #head-single-video{
    cursor: pointer;
    width: 208px;
    margin-left: 10px;
    float: left;
    border-style: solid;
    border-width: 1px;
    border-color: #d1d8d9;
    border-radius: 5px;
    margin-bottom: 9px;
    position: relative;
  }
  .img{
    width: 100%;
    height: 144px;
    overflow: hidden;
    background-color: black;
    display:flex;/*Flex布局*/
    display: -webkit-flex; /* Safari */
    align-items:center;/*指定垂直居中*/
  }
  .img img{
    width: 100%;
  }
  .title{
    position: absolute;
    top: 90px;
    left: 8px;
    color: white;
    font-size: 18px;
    height: 35px;
  }
</style>
