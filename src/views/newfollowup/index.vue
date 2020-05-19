<!--
 * @Description:
 * @Author: lxc
 * @Date: 2020-05-08 08:04:53
 * @LastEditTime: 2020-05-19 10:39:14
 * @LastEditors: lxc
 -->
<template>
  <div class="dashboard-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="随访名称：" class="from-item" prop="name">
        <el-select v-model="form.name" placeholder="请选择随访名称">
          <el-option label="第一次随访" value="第一次随访" />
          <el-option label="第二次随访" value="第二次随访" />
          <el-option label="第三次随访" value="第三次随访" />
          <el-option label="第四次随访" value="第四次随访" />
        </el-select>
      </el-form-item>

      <el-form-item label="随访形式：" class="from-item" prop="type">
        <el-select v-model="form.type" placeholder="请选择随访形式">
          <el-option label="门诊" value="门诊" />
          <el-option label="住院" value="住院" />
          <el-option label="电话" value="电话" />
          <el-option label="网络" value="网络" />
        </el-select>
      </el-form-item>
      <el-form-item label="随访时间：" class="from-item" prop="dateTime">
        <el-date-picker
          v-model="form.dateTime"
          type="date"
          placeholder="选择日期"
          style="width: 100%;"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>

      <el-form-item label="病理号：" class="from-item" prop="pathologicalNumber">
        <el-input v-model="form.pathologicalNumber" />
      </el-form-item>
      <el-form-item label="随访注意事项：" prop="note">
        <el-input v-model="form.note" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">新增随访</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { addFollowUp } from '@/api/followup.js'

export default {
  name: 'NewFollowUp',
  data() {
    return {
      form: {
        patientId: this.$store.state.patient.info.id,
        name: '',
        dateTime: '',
        type: '',
        note: '',
        pathologicalNumber: ''
      }
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  created() {
    console.log('patinentInfo', this.$store.state.patient.info)
  },
  methods: {
    onSubmit() {
      this.form.patientId = this.$store.state.patient.info.id
      addFollowUp(this.form).then(this._addFollowUp)
    },
    _addFollowUp(res) {
      if (res.data) {
        console.log(this.$refs.form)
        this.$refs.form.resetFields()
        this.$message({
          message: res.data,
          type: 'success'
        })
      }
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
