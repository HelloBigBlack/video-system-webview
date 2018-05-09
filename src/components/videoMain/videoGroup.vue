<template>
  <div id="video-group">
    <a :name="videoClass"></a>
    <div class="head"><h3>{{videoClass}}</h3></div>
    <div class="content">
      <div class="left-img" @click="openVideo(leftVideo.videoId)">
        <img :src="'http://localhost:3000/' + leftVideo.imgUrl"/>
        <div class="left-img-title">
          <h4>{{leftVideo.videoTitle}}</h4>
        </div>
      </div>
      <div class="right-imgs">
        <div class="single-img" v-for="item in rightVideos" :key="item.videoId" @click="openVideo(item.videoId)">
          <img :src="'http://localhost:3000/' + item.imgUrl"/>
          <div class="right-img-title">
            <h5>{{item.videoTitle}}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import httpclient from '../../utils/httpclient'
export default {
  name: 'video-group',
  props: {
    videoClass: ''
  },
  methods: {
    openVideo (videoId) {
      window.open('http://localhost:9090/videoPlay.html#/videoPlay/' + videoId, '_blank')
    }
  },
  mounted () {
    httpclient({
      url: 'video/getVideos',
      method: 'post',
      data: {
        videoClass: this.videoClass
      },
      params: {
        num: 7
      }
    })
      .then(response => {
        if (response.data.code === 520) {
          this.leftVideo = response.data.extend.pageInfo.list[0]
          this.rightVideos = response.data.extend.pageInfo.list.slice(1, 7)
        }
      })
  },
  data () {
    return {
      leftVideo: {
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
      rightVideos: []
    }
  }
}
</script>

<style scoped>
  #video-group{
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
  }
  .content{
    overflow: hidden;
  }
  .left-img{
    width: 420px;
    height: 230px;
    overflow: hidden;
    float: left;
    position: relative;
    cursor: pointer;
  }
  .left-img .left-img-title{
    position: absolute;
    top: 170px;
    padding-left: 10px;
    color: white;
    background-color: rgba(0,0,0,0.6);
    width: 100%;
    height: 80px;
  }
  .left-img img{
    width: 100%;
  }
  .right-imgs{
    width: 580px;
    float: left;
    height: 230px;
    overflow: hidden;
  }
  .right-imgs .single-img{
    width: 180px;
    float: left;
    overflow: hidden;
    height: 110px;
    margin-left: 10px;
    margin-bottom: 10px;
    position: relative;
    cursor: pointer;
    background-color: black;
    display:flex;/*Flex布局*/
    display: -webkit-flex; /* Safari */
    align-items:center;/*指定垂直居中*/
  }
  .right-imgs .single-img .right-img-title{
    position: absolute;
    margin: 0px;
    top: 85px;
    left: 10px;
    height: 20px;
    overflow: hidden;
    color: white;
  }
  .right-imgs .single-img .right-img-title h5{
    margin: 0px;
  }
  .right-imgs .single-img img{
    width: 100%;
  }
</style>
