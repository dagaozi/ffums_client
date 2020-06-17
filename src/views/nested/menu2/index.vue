<!--
 * @Description:
 * @Author: lxc
 * @Date: 2020-05-06 20:11:06
 * @LastEditTime: 2020-06-17 15:04:02
 * @LastEditors: lxc
 -->
<template>
  <div class="page">
    <el-button
      type="primary"
      class="btn"
      @click="dialogFormVisible = true"
    >新增用户</el-button>
    <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form">
        <el-form-item label="账号" :label-width="formLabelWidth" prop="account">
          <el-input v-model="form.account" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="密码1"
          :label-width="formLabelWidth"
          prop="password1"
        >
          <el-input v-model="form.password1" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="密码2"
          :label-width="formLabelWidth"
          prop="password2"
        >
          <el-input v-model="form.password2" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="用户类型"
          :label-width="formLabelWidth"
          prop="grade"
        >
          <el-select v-model="form.grade" placeholder="请选择用户类型">
            <el-option label="普通用户" value="3" />
            <el-option label="管理员" value="9" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClickCancel">取 消</el-button>
        <el-button type="primary" @click="handleOkClick">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { register } from '@/api/user.js'

export default {
  name: 'UserManager',
  data() {
    return {
      dialogFormVisible: false,
      form: {
        account: '',
        password1: '',
        password2: '',
        grade: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    handleClickCancel() {
      this.$refs.form.resetFields()
      this.dialogFormVisible = false
    },
    handleOkClick() {
      register(this.form).then(this._register)
    },
    _register(res) {
      if (res.data) {
        this.dialogFormVisible = false
        this.$message({
          message: res.data,
          type: 'success'
        })
        this.$refs.form.resetFields()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.page{
  margin: 10px;
}
</style>
