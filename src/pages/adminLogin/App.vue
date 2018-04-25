<template>
  <div id="app">
    <el-row class="login-form">
      <el-col :span="6" :offset="9">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>管理员登录</span>
          </div>
          <el-form :label-position="labelPosition" label-width="50px" :model="user">
            <el-form-item label="账号">
              <el-input v-model="user.id"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input type="password" v-model="user.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button v-on:click="login()" type="primary">登录</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/* eslint-disable eqeqeq */

import httpclient from '../../utils/httpclient'

export default {
  name: 'App',
  data () {
    return {
      labelPosition: 'right',
      user: {
        id: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      console.table(this.user)
      httpclient({
        url: 'admin/login',
        params: this.user,
        method: 'post'
      })
        .then(response => {
          if (response.data.code == '520') {
            sessionStorage.setItem('userId', response.data.extend.user.id)
            window.location.href = 'admin.html'
          } else {
            this.$message.error('密码错误')
          }
        })
    }
  }
}
</script>

<style>
#app{
  background-color: #fab6b6;
  height: 100%;
  width: 100%;
  position: fixed;
  margin: 0px;
  padding: 0px;
}
.login-form{
  margin-top: 150px;
}
span{
  font-family: PingFang SC;
}
  body{
    padding: 0px;
    margin: 0px;
  }
</style>
