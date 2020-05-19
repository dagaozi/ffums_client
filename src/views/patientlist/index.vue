<!--
 * @Description:
 * @Author: lxc
 * @Date: 2020-05-06 20:11:06
 * @LastEditTime: 2020-05-19 09:27:26
 * @LastEditors: lxc
 -->
<template>
  <div class="dashboard-container">
    <div class="title">
      <el-button
        class="add"
        type="primary"
        @click="dialogFormVisible = true"
      >新增患者</el-button>
      <el-dialog
        v-loading="dialogLoading"
        title="新增患者"
        :visible.sync="dialogFormVisible"
      >
        <el-form ref="form" :model="form" label-width="120px">
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
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAddPatient">确 定</el-button>
        </div>
      </el-dialog>
      <div class="tip">
        当前选中的患者：{{ this.$store.state.patient.info.name }}
      </div>
    </div>

    <el-table
      ref="singleTable"
      v-loading="loading"
      :data="tableData"
      highlight-current-row
      style="width: 100%"
      :default-sort="{ prop: 'id', order: 'ascending' }"
      :empty-text="empty_text"
      @current-change="handleCurrentChange"
    >
      <el-table-column property="name" label="姓名" />
      <el-table-column property="id" label="病人ID" />
      <el-table-column property="mzId" label="住院号" />
      <el-table-column property="blId" label="病理号" />
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="setCurrent(tableData[1])">选中第二行</el-button>
      <el-button @click="setCurrent()">取消选择</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { addPatient, getPatientList } from '@/api/patient.js'

export default {
  name: 'PatientList',
  data() {
    return {
      tableData: [],
      currentRow: null,
      dialogFormVisible: false,
      dialogLoading: false,
      loading: false,
      form: {
        name: '',
        address: '',
        age: '',
        gender: '',
        department: '',
        idCard: '',
        zyId: '',
        mzId: '',
        phone1: '',
        phone2: ''
      },
      empty_text: '暂无数据',
      formLabelWidth: '120px'
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  created() {
    this.loading = true
    getPatientList().then(this._getPatientList)
  },
  methods: {
    setCurrent(row) {
      console.log('setCurrent row->', row)
      this.$refs.singleTable.setCurrentRow(row)
      this.$store.commit('patient/setInfo', row)
    },
    handleCurrentChange(val) {
      this.currentRow = val
    },
    handleAddPatient() {
      addPatient(this.form).then(this._addPatient)
    },
    _addPatient(res) {
      if (res.data) {
        this.dialogFormVisible = false
        this.$message({
          message: res.data,
          type: 'success'
        })
        this.form = {
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
        }
        getPatientList().then(this._getPatientList)
      }
    },
    _getPatientList(res) {
      this.loading = false
      if (res.data) {
        this.tableData = res.data
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.add{
  float left
}

.tip{
  float left
  margin 11px;
}

.from-item {
  width: 60%;
}
</style>
