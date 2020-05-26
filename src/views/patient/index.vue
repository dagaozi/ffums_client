<!--
 * @Description:
 * @Author: lxc
 * @Date: 2020-05-06 20:11:06
 * @LastEditTime: 2020-05-25 08:06:57
 * @LastEditors: lxc
 -->
<template>
  <div class="dashboard-container">
    <el-form
      ref="form"
      :model="form"
      label-width="120px"
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
          <el-option label="男" value="1" />
          <el-option label="女" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="病人归属：" class="from-item">
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
      <el-form-item label="地址：">
        <el-input v-model="form.address" type="textarea" />
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
import { mapGetters } from 'vuex'
import { updatePatient } from '@/api/patient.js'

export default {
  name: 'PatientInfo',
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
  computed: {
    ...mapGetters(['name'])
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

    }
  }
}
</script>

<style lang="scss">
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

.btn {
  margin-left: 30px;
}
</style>
