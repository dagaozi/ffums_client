<!--
 * @Description:
 * @Author: lxc
 * @Date: 2020-06-08 22:05:39
 * @LastEditTime: 2020-06-17 22:06:28
 * @LastEditors: lxc
-->
<template>
  <div>
    <el-dialog title="编辑随访记录" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" :label-width="formLabelWidth">
        <el-form-item label="随访名称：" class="from-item" prop="name">
          <!-- <el-select v-model="form.name" placeholder="请选择随访名称">
            <el-option label="第一次随访" value="第一次随访" />
            <el-option label="第二次随访" value="第二次随访" />
            <el-option label="第三次随访" value="第三次随访" />
            <el-option label="第四次随访" value="第四次随访" />
          </el-select> -->
          <el-input
            v-model="form.name"
          /></el-form-item>

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

        <el-form-item
          label="病理号："
          class="from-item"
          prop="pathologicalNumber"
        >
          <el-input v-model="form.pathologicalNumber" />
        </el-form-item>
        <el-form-item label="随访注意事项：" prop="note">
          <el-input v-model="form.note" type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleDialogSave">保存</el-button>
        <el-button @click="handleDialogCancel">取 消</el-button>
      </div>
    </el-dialog>
    <el-button type="primary" @click="addNewSf">新增随访</el-button>

    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column property="name" label="随访名称" />

      <el-table-column
        property="dateTime"
        label="随访时间"
        :formatter="formatter"
      />

      <el-table-column property="type" label="随访形式" />

      <el-table-column property="note" label="注意事项" />

      <el-table-column label="操作">
        <template slot-scope="scope">
          <div v-show="!scope.row.edit">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>

            <el-button
              v-show="!scope.row.edit"
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  addFollowUp,
  getByPatientId,
  updateFollowUp,
  deleteFollowUp
} from '@/api/followup.js'

import { EventBus } from '@/utils/eventBus'

export default {
  name: 'SfManage',
  data() {
    return {
      tableData: [],
      currentRow: null,
      dialogFormVisible: false,
      form: {
        patientId: this.$store.state.patient.info.id,
        name: '',
        dateTime: '',
        type: '',
        note: '',
        pathologicalNumber: ''
      },
      formLabelWidth: '120px',
      mAddNewClick: false
    }
  },
  created() {
    getByPatientId(this.$store.state.patient.info.id).then(
      this._getByPatientId
    )
  },
  methods: {
    addNewSf() {
      this.form = {
        patientId: this.$store.state.patient.info.id,
        name: '',
        dateTime: '',
        type: '',
        note: '',
        pathologicalNumber: ''
      }
      this.form.name = this.getNewSfName()
      this.mAddNewClick = true
      this.dialogFormVisible = true
    },
    handleEdit(index, row) {
      console.log(index, row)
      this.mAddNewClick = false
      this.dialogFormVisible = true
      this.form = this._.cloneDeep(row)
    },
    handleDelete(index, row) {
      console.log(index, row)
      deleteFollowUp(row.id).then(res => {
        if (res.ok) {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          getByPatientId(this.$store.state.patient.info.id).then(
            this._getByPatientId
          )
          EventBus.$emit('sf-refresh')
        }
      })
    },
    _getByPatientId(res) {
      if (res.data) {
        this.tableData = res.data
      }
    },
    handleDialogCancel() {
      this.dialogFormVisible = false
      this.$refs.form.resetFields()
    },
    handleDialogSave() {
      if (this.mAddNewClick) {
        this.form.patientId = this.$store.state.patient.info.id
        addFollowUp(this.form).then(this._addFollowUp)
      } else {
        // 编辑
        this.form.patientId = this.$store.state.patient.info.id
        updateFollowUp(this.form).then(res => {
          if (res.ok) {
            console.log(this.$refs.form)
            this.$refs.form.resetFields()
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.dialogFormVisible = false
            getByPatientId(this.$store.state.patient.info.id).then(
              this._getByPatientId
            )
          }
        })
      }
    },
    _addFollowUp(res) {
      if (res.ok) {
        console.log(this.$refs.form)
        this.$refs.form.resetFields()
        this.$message({
          message: res.resultMsg,
          type: 'success'
        })
        this.dialogFormVisible = false
        getByPatientId(this.$store.state.patient.info.id).then(
          this._getByPatientId
        )
        EventBus.$emit('sf-refresh')
      }
    },
    getNewSfName() {
      return '第' + (this.tableData.length + 1) + '次随访'
    },
    formatter(row, column) {
      if (row.dateTime) {
        var arr1 = row.dateTime.split(' ')
        return arr1[0]
      } else {
        return row.dateTime
      }
    }
  }
}
</script>

<style >
</style>
