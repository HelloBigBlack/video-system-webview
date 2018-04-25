<template>
  <div>
    <message-box v-on:deleteMessage="getMessageBoxByVideoId" v-for="message in messageBox" :key="message.messageId" :message-box="message"></message-box>
    <span v-if="messageBox == null || messageBox == '' || messageBox == []">暂无评论...</span>
  </div>
</template>

<script>
import MessageBox from './MessageBox'
import httpclient from '../../../utils/httpclient'
export default {
  components: {MessageBox},
  name: 'jar-of-message-box',
  props: {
    videoId: ''
  },
  data () {
    return {
      messageBox: []
    }
  },
  mounted () {
    this.getMessageBoxByVideoId()
  },
  methods: {
    test () {
      alert(123)
    },
    getMessageBoxByVideoId () {
      httpclient({
        url: 'message/getMessageBoxByVideoId',
        params: {
          videoId: this.videoId
        }
      }).then(response => {
        this.messageBox = response.data.extend.messageBox
      })
    }
  }
}
</script>

<style scoped>

</style>
