<!--
 * @Description:
 * @Author: lxc
 * @Date: 2020-05-06 20:11:06
 * @LastEditTime: 2020-05-26 09:35:43
 * @LastEditors: lxc
 -->
<template>
  <div class="dashboard-container">
    <el-dialog title="编辑随访记录" :visible.sync="dialogFormVisible">
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
        <el-button
          type="primary"
          @click="handleDialogSave"
        >保存</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column property="name" label="随访名称" />
      <el-table-column property="dateTime" label="随访时间" />
      <el-table-column property="type" label="随访形式" />
      <el-table-column property="pathologicalNumber" label="病理号" />
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
import { mapGetters } from 'vuex'
import { getByPatientId } from '@/api/followup'

export default {
  name: 'FollowUp',
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
      formLabelWidth: '120px'
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  created() {
    getByPatientId(this.$store.state.patient.info.id).then(
      this._getByPatientId
    )
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
      this.dialogFormVisible = true
      this.form = this._.cloneDeep(row)
    },
    handleDelete(index, row) {
      console.log(index, row)
      this.$message('删除')
    },
    _getByPatientId(res) {
      if (res.data) {
        this.tableData = res.data
      }
    },
    handleDialogSave() {
      this.$message('保存更新随访记录')
      this.dialogFormVisible = false
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
</style>
