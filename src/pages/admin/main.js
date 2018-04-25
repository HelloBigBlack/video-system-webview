// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from '../../router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import EasyScroll from 'easyscroll'

Vue.use(ElementUI)
Vue.use(EasyScroll)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  beforeCreate: function () {
    let userId = sessionStorage.getItem('userId')
    if (userId === null || userId === '' || userId === undefined) {
      window.location.href = 'adminLogin.html'
    }
  },
  components: { App },
  template: '<App/>'
})
