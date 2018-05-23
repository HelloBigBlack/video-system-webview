<template>
  <div id="app">
    <el-container>
      <el-header height="100px"><a href="videoMain.html">SuperC 后台管理系统</a></el-header>
      <el-container>
        <el-aside width="250px">
          <el-menu
            router='router'
            class="el-menu-vertical-demo"
            background-color="#E0FFFF">
            <el-menu-item index="/admin/uploadVideo">
              <i class="el-icon-menu"></i>
              <span slot="title">上传视频</span>
            </el-menu-item>
            <el-menu-item index="/admin/videoManage">
              <i class="el-icon-document"></i>
              <span slot="title">视频管理</span>
            </el-menu-item>
            <el-menu-item index="/admin/userManage">
              <i class="el-icon-setting"></i>
              <span slot="title">用户管理</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container >
          <el-main width="100%">
            <EasyScrollbar>
              <div id="wrapper" style="height: 100%;">
                <router-view></router-view>
              </div>
            </EasyScrollbar>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  beforeCreate: function () {
    let userId = sessionStorage.getItem('userId')
    if (userId === null || userId === '' || userId === undefined) {
      window.location.href = 'adminLogin.html'
    }
  },
  data () {
    return {
      router: true,
      items: [
        {msg: '部门管理', route: '/departments'},
        {msg: '职务管理', route: '/jobs'},
        {msg: '员工管理', route: '/employees'}
      ]
    }
  }
}
</script>
<style>
  html{
    height: 100%;
  }
  body {
    padding: 0px;
    margin: 0px;
    height: 100%;
  }
</style>
<style scoped>
  /*!*.el-scrollbar__wrap {*!*/
    /*!*!* overflow: scroll; *!*!*/
    /*!*overflow-y: scroll;*!*/
    /*!*overflow-x: hidden;*!*/
    /*!*height: 100%;*!*/
  /*!*}*!*/
  /*.page_scroll{*/
    /*height: 100%;*/
    /*width: 100%;*/
    /*overflow-y: hidden;*/
    /*overflow-x: hidden !important;*/
  /*}*/
  a{
    color: black;
    text-decoration: none;
  }
  #app{
    height: 100%;
    width: 100%;
  }
  .el-header{
    text-align: left;
    font-size: 60px;
    line-height: 100px;
    background-color: #b3d8ff;
  }
  .el-header, .el-footer {
    color: #000;
  }

  .el-aside {
    background-color: #E0FFFF;
    color: #333;
    text-align: center;
  }

  .el-main {
    /*overflow-y: scroll;*/
    padding-right: 0px;
    overflow-y: scroll;
  }
  .el-container{
    height: 100%;
  }
</style>
