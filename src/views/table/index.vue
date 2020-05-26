<!--
 * @Description:
 * @Author: lxc
 * @Date: 2020-05-06 20:11:06
 * @LastEditTime: 2020-05-26 10:11:40
 * @LastEditors: lxc
-->
<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="目录名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import { getAllConfig } from '@/api/itemconfig'
import { getItemCategoryConfigByName } from '@/api/categoryconfig'

export default {
  data() {
    return {
      list: null,
      listLoading: false
    }
  },
  created() {
    this.getCategoryList()
    this.fetchData()
  },
  methods: {
    fetchData() {
      // this.listLoading = true
      // getAllConfig().then(res => {
      //   this.listLoading = false
      //   this.list = res.data
      // })
    },
    getCategoryList() {
      getItemCategoryConfigByName('实验室指标').then(res => {
        this.list = res.data
      })
    }
  }
}
</script>
