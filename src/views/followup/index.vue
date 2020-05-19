<!--
 * @Description:
 * @Author: lxc
 * @Date: 2020-05-06 20:11:06
 * @LastEditTime: 2020-05-19 10:33:36
 * @LastEditors: lxc
 -->
<template>
  <div class="dashboard-container">
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column property="name" label="随访名称" />
      <el-table-column property="dateTime" label="随访时间" />
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
          <div v-show="scope.row.edit">
            <el-button
              size="mini"
              @click="handleSave(scope.$index, scope.row)"
            >保存</el-button>
            <el-button
              v-show="scope.row.edit"
              size="mini"
              type="danger"
              @click="handleCancel(scope.$index, scope.row)"
            >取消</el-button>
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
      currentRow: null
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  created() {
    getByPatientId(this.$store.state.patient.info.id).then(this._getByPatientId)
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
      row.edit = true
    },
    handleDelete(index, row) {
      console.log(index, row)
      this.$message('删除')
    },
    handleCancel(index, row) {
      row.edit = false
    },
    handleSave(index, row) {
      this.$message('保存')
    },
    _getByPatientId(res) {
      if (res.data) {
        this.tableData = res.data
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
</style>
