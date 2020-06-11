<!--
 * @Description:
 * @Author: lxc
 * @Date: 2020-06-08 22:28:23
 * @LastEditTime: 2020-06-11 10:12:41
 * @LastEditors: lxc
-->
<template>
  <div>
    <el-tabs
      v-model="activeName"
      tab-position="left"
      type="border-card"
      style="height: 400px;"
      @tab-click="handleTabClick"
    >
      <el-tab-pane label="实验室指标" name="实验室指标">
        <el-table
          v-loading="listLoading"
          :row-class-name="getRowClassName"
          :data="list"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <div>
                <input-config :config-list="props.row.configList" />
              </div>
            </template>
          </el-table-column>

          <el-table-column label="目录名称">
            <template slot-scope="scope">
              {{ scope.row.name }}
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="特检指标" name="特检指标" />
      <el-tab-pane label="人体成分" name="人体成分" />
      <el-tab-pane label="其它信息" name="其它信息" />
    </el-tabs>
  </div>
</template>

<script>
import { getItemCategoryConfigByName } from '@/api/categoryconfig'
import { getAllConfig } from '@/api/itemconfig'
import InputConfig from '@/components/InputConfig'
export default {
  name: 'ZbManage',
  components: {
    InputConfig
  },
  data() {
    return {
      list: [],
      listLoading: false,
      allConfigList: [],
      activeName: '实验室指标'
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getCategoryList() {},
    getConfig() {
      getAllConfig().then(res => {
        if (res.data) {
          this.allConfigList = res.data
        }
      })
    },
    getData() {
      this.listLoading = true
      getItemCategoryConfigByName(this.activeName).then(res => {
        this.list = res.data
        if (this.list.length > 0) {
          getAllConfig().then(res => {
            this.listLoading = false
            if (res.data) {
              this.allConfigList = res.data
              this.handleData()
            }
          })
        } else {
          this.listLoading = false
        }
      })
    },
    handleTabClick(tab, event) {
      console.log('handleTabClick')
    },
    handleData() {
      this.list.forEach((item, index) => {
        console.log('handleData item name->', item.name)
        const array = this._.filter(this.allConfigList, configItem => {
          return configItem.categoryName === item.name
        })
        array.forEach(item => {
          if (item.inputType === '2') {
            item.selectList = item.typeOption.split('^')
          }
        })
        this.list[index].configList = array
      })
      console.log('handleData end list->', this.list)
    },
    getRowClassName({ row, rowIndex }) {
      console.log('getRowClassName row', row)
      if (row.configList && row.configList.length === 0) {
        return 'row-expand-cover'
      }
    }
  }
}
</script>

<style>
.row-expand-cover .el-table__expand-icon {
  visibility: hidden;
}
</style>
