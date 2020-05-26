<!--
 * @Description:
 * @Author: lxc
 * @Date: 2020-05-18 08:47:24
 * @LastEditTime: 2020-05-26 10:13:34
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
  },
  methods: {
    getCategoryList() {
      getItemCategoryConfigByName('人体成分').then(res => {
        this.list = res.data
      })
    }
  }
}
</script>
