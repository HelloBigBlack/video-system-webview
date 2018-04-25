import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import uploadVideo from '@/components/admin/video/uploadVideo'
import videoManage from '@/components/admin/video/videoManage'
import videoPlay from '@/components/videoPlay/videoPlay'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/admin/uploadVideo',
      name: 'uploadVideo',
      component: uploadVideo
    },
    {
      path: '/admin/videoManage',
      name: 'videoManage',
      component: videoManage
    },
    {
      path: '/videoPlay/:id',
      name: 'videoPlay',
      component: videoPlay
    }
  ]
})
