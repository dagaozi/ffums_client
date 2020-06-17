<!--
 * @Description:
 * @Author: lxc
 * @Date: 2020-06-06 23:31:11
 * @LastEditTime: 2020-06-17 20:39:08
 * @LastEditors: lxc
-->
<template>
  <div class="head">
    <el-form
      ref="form"
      :model="form"
      :inline="true"
      label-width="80px"
      :disabled="formDisable"
    >
      <el-form-item label="姓名：" class="from-item">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="年龄：" class="from-item">
        <el-input v-model="form.age" />
      </el-form-item>
      <el-form-item label="性别：" class="from-item">
        <el-select v-model="form.gender" placeholder="请选择性别">
          <el-option label="男" value="男" />
          <el-option label="女" value="女" />
        </el-select>
      </el-form-item>
      <el-form-item label="归属：" class="from-item">
        <el-select v-model="form.department" placeholder="请选择归属">
          <el-option label="内科" value="内科" />
          <el-option label="外科" value="外科" />
        </el-select>
      </el-form-item>
      <el-form-item label="身份证：" class="from-item">
        <el-input v-model="form.idCard" />
      </el-form-item>
      <el-form-item label="住院号：" class="from-item">
        <el-input v-model="form.inPatientId" />
      </el-form-item>
      <el-form-item label="门诊号：" class="from-item">
        <el-input v-model="form.mzId" />
      </el-form-item>
      <el-form-item label="电话1：" class="from-item">
        <el-input v-model="form.phone1" />
      </el-form-item>
      <el-form-item label="电话2：" class="from-item">
        <el-input v-model="form.phone2" />
      </el-form-item>
      <el-form-item label="地址：" class="form-item-address">
        <el-input
          v-model="form.address"
          type="textarea"
          maxlength="50"
          show-word-limit
        />
      </el-form-item>
    </el-form>

    <el-button
      v-show="!changeInfo"
      class="btn"
      type="primary"
      @click="onSubmit"
    >修改患者信息</el-button>
    <div v-show="changeInfo" class="btn">
      <el-button type="primary" @click="saveInfo">保存</el-button>
      <el-button @click="onCancel">取消</el-button>
    </div>
  </div>
</template>

<script>
import { updatePatient } from '@/api/patient.js'
export default {
  name: 'PatInfo',
  data() {
    return {
      form: {
        name: '',
        address: '',
        age: '',
        gender: '',
        department: '',
        idCard: '',
        inPatientId: '',
        mzId: '',
        phone1: '',
        phone2: ''
      },
      changeForm: {},
      changeInfo: false,
      formDisable: true
    }
  },
  created() {
    this.form = this.$store.state.patient.info
  },
  methods: {
    onSubmit() {
      this.changeForm = this._.cloneDeep(this.form)
      this.changeInfo = true
      this.formDisable = false
    },
    onCancel() {
      this.form = this.changeForm
      this.changeInfo = false
      this.formDisable = true
    },
    saveInfo() {
      // this.$message('保存用户信息')
      updatePatient(this.form).then(this._updatePatient)
    },
    _updatePatient(res) {
      console.log('_updatePatient res->', res)
      if (res.data.resultCode === 0) {
        this.formDisable = true
        this.changeInfo = false
        this.$message({
          message: res.data.resultMsg,
          type: 'success'
        })
        this.$store.commit('patient/setInfo', this.form)
      }
    }
  }
}
</script>

<style lang="stylus">
.head {
  width: 100%;
  height: 20%;
  margin 10px;

  .btn{
    margin 10px
  }
}

.el-form-item {
  margin: 2px;
  width: 30%;
}

</style>
