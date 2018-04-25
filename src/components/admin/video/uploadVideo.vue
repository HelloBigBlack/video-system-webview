<template>
  <div class="app" v-loading="loading">
    <el-form label-width="80px" :model="video" ref="videoForm" v-bind:rules="videorule">
      <el-form-item label="标题" prop="title">
        <el-input v-model="video.title"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="brief">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入内容"
          v-model="video.brief">
        </el-input>
      </el-form-item>
      <el-form-item label="视频类别">
        <el-select v-model="video.video_class" placeholder="请选择">
          <el-option
            v-for="item in video_Classes"
            :key="item.id"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="添加标签">
        <el-tag
          :key="tag"
          v-for="tag in video_labels"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)">
          {{tag}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">添加</el-button>
      </el-form-item>
      <el-form-item label="视频封面">
        <el-upload
          class="upload-demo"
          action="lovewangchao520"
          :before-upload="beforeImgUpload"
          :limit="limit"
          ref="elImgUpload"
          accept=".jpg,.jpeg,.png"
          list-type="picture"
          :auto-upload="uploadAuto">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/jpeg/png文件</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="选择视频">
        <el-upload
          class="upload-demo"
          action="lovewangchao520"
          :before-upload="beforeVideoUpload"
          :limit="limit"
          accept=".avi,.mp4"
          list-type="picture"
          ref="elVideoUpload"
          :auto-upload="uploadAuto">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传mp4/avi文件</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="uploadVideo">上传视频</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import httpclient from '../../../utils/httpclient'

export default {
  name: 'upload-video',
  data () {
    return {
      loading: false,
      myFormData: new FormData(),
      limit: 1,
      video_labels: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: '',
      video_Classes: [],
      video: {
        title: '',
        brief: '',
        video_class: '其他',
        video_label: '',
        imgFile: null,
        videoFile: null
      },
      formTest: true,
      uploadAuto: false,
      imageUrl: '',
      videorule: {
        title: [
          { required: true, message: '请输入视频标题', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ],
        brief: [
          { required: true, message: '请输入视频简介', trigger: 'blur' },
          { min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    httpclient({
      url: 'video/getVideoClasses',
      method: 'get'
    })
      .then(response => {
        if (response.data.code === 520) {
          this.video_Classes = response.data.extend.videoClasses
        } else {
          this.$message.error('网络错误')
        }
      })
  },
  methods: {
    resetForm () {
      this.video.title = ''
      this.video.brief = ''
      this.video.video_class = '其他'
      this.video.video_label = ''
      this.video.imgFile = null
      this.video.videoFile = null
      this.myFormData = new FormData()
    },
    getVideoLabels () {
      for (let id in this.video_labels) {
        this.video.video_label = this.video.video_label + this.video_labels[id] + ','
      }
    },
    handleClose (tag) {
      this.video_labels.splice(this.video_labels.indexOf(tag), 1)
    },

    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        this.video_labels.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    beforeFormSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formTest = true
        } else {
          console.log('error submit!!')
          this.formTest = false
        }
      })
      return this.formTest
    },
    beforeImgUpload (file) {
      this.video.imgFile = file
      this.myFormData.append('imgFile', file)
      console.log(this.video)
      return false
    },
    beforeVideoUpload (file) {
      this.video.videoFile = file
      this.myFormData.append('videoFile', file)
      return false
    },
    uploadVideo: function () {
      if (!this.beforeFormSubmit('videoForm')) {
        return false
      }
      this.$refs.elImgUpload.submit()
      this.$refs.elVideoUpload.submit()
      this.getVideoLabels()
      this.myFormData.append('videoTitle', this.video.title)
      this.myFormData.append('videoBrief', this.video.brief)
      this.myFormData.append('videoClass', this.video.video_class)
      this.myFormData.append('videoLabel', this.video.video_label)
      this.loading = true
      httpclient({
        url: 'video/add',
        method: 'post',
        data: this.myFormData
      })
        .then(response => {
          this.loading = false
          if (response.data.code === 520) {
            console.log(response.data.extend.video)
            this.$message({
              message: '上传成功',
              type: 'success'
            })
            this.resetForm()
          } else {
            this.loading = false
            this.$message({
              message: '上传失败',
              type: 'error'
            })
          }
        })
        .catch(response => {
          this.loading = false
          this.$message({
            message: '上传失败',
            type: 'error'
          })
        })
    }

  }
}
</script>

<style>
.app{
  width: 600px;
}
.el-tag{
  margin-right: 10px;
}
.button-new-tag {
  margin-right: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-right: 10px;
  vertical-align: bottom;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
