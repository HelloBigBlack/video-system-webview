<template>
  <div id="single-video">
    <img :src="'http://localhost:3000/' + video.imgUrl"/>
    <div class="title">{{video.videoTitle}}</div>
    <div class="bottom">
      <div class="visit-number">{{video.videoVisited}}</div>
      <div class="update-time">{{video.uploadTime}}</div>
    </div>
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
  }
}
</script>

<style scoped>

</style>
