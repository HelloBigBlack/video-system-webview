<template>
  <div id="banner">
    <div class="content">
      <div class="banner-left">SuperC视频网站</div>
      <div class="banner-right">
        <div class="userMessage" v-if="alreadyLogged === false">
          <span @click="dialogLoginVisible = true">登录</span>
          <span @click="dialogRegisterVisible = true">注册</span>
        </div>
        <div class="userMessage" v-if="alreadyLogged === true">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link" style="color: black">
              {{user.userName}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item><span @click="logout">退出登录</span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <el-dialog title="登录" :visible.sync="dialogLoginVisible" width="400px">
      <el-form :model="loginUser">
        <el-form-item label="邮箱" label-width="60px">
          <el-input v-model="loginUser.userEmail"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="60px">
          <el-input type="password" v-model="loginUser.userPassword"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogLoginVisible = false">取 消</el-button>
        <el-button type="primary" @click="login">登 录</el-button>
      </div>
    </el-dialog>
    <el-dialog title="注册" :visible.sync="dialogRegisterVisible" width="400px">
      <el-form :model="registerUser" :rules="registerRules" ref="registerForm">
        <el-form-item label="邮箱" label-width="60px" prop="email">
          <el-input v-model="registerUser.email"></el-input>
        </el-form-item>
        <el-form-item label="昵称" label-width="60px" prop="name">
          <el-input v-model="registerUser.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="60px" prop="password">
          <el-input type="password" v-model="registerUser.password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogRegisterVisible = false">取 消</el-button>
        <el-button type="primary" @click="register">注 册</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import httpclient from '../../utils/httpclient'
export default {
  name: 'banner',
  data () {
    return {
      dialogLoginVisible: false,
      dialogRegisterVisible: false,
      alreadyLogged: false,
      user: {
        userEmail: '',
        userName: ''
      },
      loginUser: {
        userEmail: '',
        userPassword: ''
      },
      registerUser: {
        email: '',
        name: '',
        sex: '',
        password: '',
        register: '',
        noMessage: ''
      },
      registerRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.beforeCreate()
  },
  methods: {
    beforeCreate () {
      // localStorage.removeItem('userEmail')
      // localStorage.removeItem('userName')
      let userEmail = localStorage.getItem('userEmail')
      if (userEmail === null || userEmail === '' || userEmail === undefined) {
        this.alreadyLogged = false
        this.user.userEmail = ''
        this.user.userName = ''
      } else {
        this.alreadyLogged = true
        this.user.userEmail = userEmail
        this.user.userName = localStorage.getItem('userName')
      }
    },
    beforeRegisterFormSubmit () {
      let formTest
      this.$refs['registerForm'].validate((valid) => {
        if (valid) {
          formTest = true
        } else {
          console.log('error submit!!')
          formTest = false
        }
      })
      return formTest
    },
    register () {
      if (this.beforeRegisterFormSubmit() === false) {
        this.$message.error('请输入正确的值')
        return
      }
      let user = {
        email: this.registerUser.email,
        name: this.registerUser.name,
        sex: '男',
        password: this.registerUser.password,
        register: '0',
        noMessage: '0'
      }
      httpclient({
        url: 'user/register',
        method: 'post',
        data: user
      })
        .then(response => {
          if (response.data.code === 520) {
            this.$message.success('注册成功')
            this.dialogRegisterVisible = false
            this.registerUser = {
              email: '',
              name: '',
              sex: '',
              password: '',
              register: '',
              noMessage: ''
            }
          }
          if (response.data.code === 530) {
            this.$message.error('该邮箱已被注册')
          }
        })
    },
    logout () {
      localStorage.clear()
      // localStorage.removeItem('userEmail')
      // localStorage.removeItem('userName')
      this.user.userName = ''
      this.user.userEmail = ''
      this.alreadyLogged = false
    },
    login () {
      let user = {
        email: this.loginUser.userEmail,
        password: this.loginUser.userPassword
      }
      httpclient({
        url: 'user/login',
        method: 'post',
        data: user
      })
        .then(response => {
          if (response.data.code === 520) {
            this.$message.success('登录成功')
            this.dialogLoginVisible = false
            this.alreadyLogged = true
            localStorage.setItem('userEmail', response.data.extend.userInfo.email)
            localStorage.setItem('userName', response.data.extend.userInfo.name)
            localStorage.setItem('userId', response.data)
            this.user.userName = localStorage.getItem('userName')
            this.user.userEmail = localStorage.getItem('userEmail')
            this.loginUser.userEmail = ''
            this.loginUser.userPassword = ''
          }
          if (response.data.code === 530) {
            this.$message.error('用户名或密码错误')
          }
        })
    }
  }
}
</script>

<style scoped>
  #banner{
    height: 50px;
    width: 100%;
    background-color: rgba(206, 224, 255, 0.6);
    /*background-color: #009fe6;*/
  }
  .content{
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
    height: 100%;
  }
  .content .banner-left{
    width: 500px;
    float: left;
    height: 100%;
    font-size: 32px;
  }
  .content .banner-right{
    width: 500px;
    float: right;
    height: 100%;
  }
  .content .banner-right .userMessage{
    float: right;
    width: auto;
    height: 100%;
    line-height: 100%;
    display:flex;/*Flex布局*/
    display: -webkit-flex; /* Safari */
    align-items:center;/*指定垂直居中*/
  }
  .content .banner-right .userMessage span{
    margin-left: 8px;
    cursor: pointer;
  }
</style>
