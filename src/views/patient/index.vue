<!--
 * @Description:
 * @Author: lxc
 * @Date: 2020-05-06 20:11:06
 * @LastEditTime: 2020-05-06 22:55:13
 * @LastEditors: lxc
 -->
<template>
  <div class="dashboard-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="姓名：" class="from-item">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="年龄：" class="from-item">
        <el-input v-model="form.age" />
      </el-form-item>
      <el-form-item label="性别：" class="from-item">
        <el-select v-model="form.sex" placeholder="请选择性别">
          <el-option label="男" value="男" />
          <el-option label="女" value="女" />
        </el-select>
      </el-form-item>
      <el-form-item label="病人归属：" class="from-item">
        <el-select v-model="form.brgs" placeholder="请选择归属">
          <el-option label="内科" value="内科" />
          <el-option label="外科" value="外科" />
        </el-select>
      </el-form-item>
      <el-form-item label="身份证：" class="from-item">
        <el-input v-model="form.idcard" />
      </el-form-item>
      <el-form-item label="住院号：" class="from-item">
        <el-input v-model="form.zyId" />
      </el-form-item>
      <el-form-item label="门诊号：" class="from-item">
        <el-input v-model="form.mzId" />
      </el-form-item>
      <el-form-item label="电话1：" class="from-item">
        <el-input v-model="form.tel1" />
      </el-form-item>
      <el-form-item label="电话2：" class="from-item">
        <el-input v-model="form.tel2" />
      </el-form-item>
      <el-form-item label="地址：">
        <el-input v-model="form.address" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">创建</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Patient',
  computed: {
    ...mapGetters(['name'])
  },
  data() {
    return {
      form: {
        name: '',
        address: '',
        age: '',
        sex: '',
        brgs: '',
        idcard: '',
        zyId: '',
        mzId: '',
        tel1: '',
        tel2: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.from-item {
  width: 40%;
}
</style>
