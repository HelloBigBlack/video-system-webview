<template>
  <div id="my-head">
    <div class="left">
      <el-carousel :interval="5000" arrow="always">
        <el-carousel-item v-for="item in leftVideos" :key="item.videoId">
          <div class="my-carousel" @click="openVideo(item.videoId)">
            <img :src="'http://localhost:3000/' + item.imgUrl">
            <h3>{{ item.videoTitle }}</h3>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="right">
      <head-single-video v-for="item in rightVideos" :key="item.videoId" :video="item"></head-single-video>
    </div>
  </div>
</template>

<script>
import httpclient from '../../utils/httpclient'
import HeadSingleVideo from './HeadSingleVideo'
export default {
  components: {HeadSingleVideo},
  name: 'my-head',
  methods: {
    openVideo (videoId) {
      window.open('videoPlay.html#/videoPlay/' + videoId, '_blank')
    }
  },
  mounted () {
    httpclient({
      url: 'video/getVideos',
      method: 'post',
      data: {
        videoClass: ''
      },
      params: {
        num: 9
      }
    })
      .then(response => {
        if (response.data.code === 520) {
          this.leftVideos = response.data.extend.pageInfo.list.slice(0, 4)
          this.rightVideos = response.data.extend.pageInfo.list.slice(5, 9)
        }
      })
  },
  data () {
    return {
      leftVideos: [],
      rightVideos: []
    }
  }
}
</script>

<style scoped>
  #my-head{
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
  }
  .left{
    float: left;
    width: 560px;
  }
  .left .my-carousel{
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    cursor: pointer;
  }
  .left .my-carousel img{
    width: 100%;
    z-index: -1;
  }
  .left .my-carousel h3{
    position: absolute;
    left: 0px;
    top: 220px;
    z-index: 1;
    color: white;
    background-color: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 80px;
    padding-left: 8px;
    line-height: 60px;
  }
</style>
