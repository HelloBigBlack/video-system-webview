<template>
  <div>
    <el-table
      :data="users"
      style="width: 450px">
      <el-table-column
        label="邮箱"
        width="180">
        <template slot-scope="scope">
          {{scope.row.email}}
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="昵称"
        width="180">
      </el-table-column>
      <el-table-column width="90">
        <template slot-scope="scope">
          <el-button size="mini" @click="beforeDeleteUser(scope.row.email)">注销</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import httpclient from '../../../utils/httpclient'
export default {
  name: 'user-manage',
  data () {
    return {
      users: []
    }
  },
  mounted () {
    this.getUsers()
  },
  methods: {
    beforeDeleteUser (user) {
      this.$confirm('此操作将同时删除该用户在视频中的留言, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteUser(user)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作已取消'
        })
      })
    },
    deleteUser (user) {
      httpclient({
        url: 'user/delete',
        method: 'get',
        params: {
          email: user
        }
      })
        .then(response => {
          if (response.data.code === 520) {
            this.$message.success('注销成功')
            this.getUsers()
          }
        })
    },
    getUsers () {
      httpclient({
        url: 'user/getAll',
        method: 'get'
      })
        .then(response => {
          if (response.data.code === 520) {
            this.users = response.data.extend.users
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
