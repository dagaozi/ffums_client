<!--
 * @Description:
 * @Author: lxc
 * @Date: 2020-05-18 08:47:24
 * @LastEditTime: 2020-05-27 11:04:12
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
  </div>
</template>

<script>
import { getItemCategoryConfigByName } from '@/api/categoryconfig'
import { getAllConfig } from '@/api/itemconfig'
import InputConfig from '@/components/InputConfig'

export default {
  components: {
    InputConfig
  },
  data() {
    return {
      list: [],
      listLoading: false,
      allConfigList: []
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
      getItemCategoryConfigByName('特检指标').then(res => {
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
    }
  }
}
</script>
