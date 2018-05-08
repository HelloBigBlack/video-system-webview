<template>
  <div>
    <banner></banner>
    <navigation-bar :video-classes="videoClass" style="margin-top: 15px"></navigation-bar>
    <my-head style="margin-top: 10px"></my-head>
    <video-group v-for="item in videoClass" :key="item.id" :video-class="item.name"></video-group>
    <my-footer></my-footer>
  </div>
</template>

<script>
import Banner from '../../components/videoMain/banner'
import MyHead from '../../components/videoMain/MyHead'
import NavigationBar from '../../components/videoMain/navigationBar'
import VideoGroup from '../../components/videoMain/videoGroup'
import httpclient from '../../utils/httpclient'
import MyFooter from '../../components/videoPlay/footer'
export default {
  components: {
    MyFooter,
    VideoGroup,
    NavigationBar,
    MyHead,
    Banner},
  name: 'App',
  data () {
    return {
      videoClass: []
    }
  },
  mounted () {
    httpclient({
      url: 'video/getVideoClasses',
      method: 'get'
    })
      .then(response => {
        if (response.data.code === 520) {
          this.videoClass = response.data.extend.videoClasses
        }
      })
  }
}
</script>

<style>
  body{
    margin: 0;
    /*padding: 0px;*/
    /*background-image: url(./../../assets/background5.jpg);*/
    /*background-size: 100%;*/
    /*background-repeat: no-repeat;*/
    /*background-attachment: fixed;*/
  }
</style>
<style scoped>

</style>
