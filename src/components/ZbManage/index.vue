<!--
 * @Description:
 * @Author: lxc
 * @Date: 2020-06-08 22:28:23
 * @LastEditTime: 2020-06-17 19:17:00
 * @LastEditors: lxc
-->
<template>
  <div>
    <div v-show="sfInfo">
      <el-tabs
        v-model="activeName"
        tab-position="left"
        type="border-card"
        style="height: 400px;"
        @tab-click="handleTabClick"
      >
        <el-tab-pane label="实验室指标" name="实验室指标">
          <el-button
            class="btn"
            type="primary"
            @click="handleSaveInfo"
          >保存指标信息</el-button>
          <el-table
            v-if="activeName === '实验室指标'"
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
        <el-tab-pane label="特检指标" name="特检指标">
          <el-button
            class="btn"
            type="primary"
            @click="handleSaveInfo"
          >保存指标信息</el-button>
          <el-table
            v-if="activeName === '特检指标'"
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
        <el-tab-pane label="人体成分" name="人体成分">
          <el-button
            class="btn"
            type="primary"
            @click="handleSaveInfo"
          >保存指标信息</el-button>
          <el-table
            v-if="activeName === '人体成分'"
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
        <el-tab-pane label="其它信息" name="其它信息">
          <el-button
            class="btn"
            type="primary"
            @click="handleSaveInfo"
          >保存指标信息</el-button>
          <el-table
            v-if="activeName === '其它信息'"
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
      </el-tabs>
    </div>
    <div v-show="!sfInfo">请先选择随访信息</div>
  </div>
</template>

<script>
import { getItemCategoryConfigByName } from '@/api/categoryconfig'
import InputConfig from '@/components/InputConfig'
import { addOrUpdate, findByFollowId } from '@/api/record'
import axios from 'axios'
import { EventBus } from '@/utils/eventBus'
import { isEmpty } from '@/utils/ToolUtil.js'
import { getAllConfig } from '@/api/itemconfig'
export default {
  name: 'ZbManage',
  components: {
    InputConfig
  },
  data() {
    return {
      list: [],
      listLoading: false,
      activeName: '实验室指标',
      sfInfo: null
    }
  },
  created() {
    EventBus.$on('sf-select', value => {
      console.log('随访选择 value->', value)
      this.sfInfo = value
      this.getAll()
    })
    // this.getData()
  },
  destroyed() {
    EventBus.$off('sf-select')
  },
  methods: {
    handleTabClick(tab, event) {
      console.log('handleTabClick')
      this.getAll()
    },
    getRowClassName({ row, rowIndex }) {
      console.log('getRowClassName row', row)
      if (row.configList && row.configList.length === 0) {
        return 'row-expand-cover'
      }
    },
    handleSaveInfo() {
      console.log('handleSaveInfo list->', this.list)
      const vm = this
      this.list.forEach(item => {
        item.configList.forEach(sonItem => {
          console.log('sonItem', sonItem)
          if (sonItem.id) {
            const data = {
              followId: vm.sfInfo.id,
              itemId: sonItem.id,
              itemValue: isEmpty(sonItem.itemValue) ? '' : sonItem.itemValue
            }
            addOrUpdate(data).then(res => {})
          }
        })
      })
    },
    getAll() {
      this.listLoading = true
      const vm = this
      axios
        .all([
          getItemCategoryConfigByName(this.activeName),
          getAllConfig(),
          findByFollowId(this.sfInfo.id)
        ])
        .then(
          axios.spread(function(CategoryRes, configRes, recordRes) {
            vm.listLoading = false
            const recodeList = recordRes.data
            const configList = configRes.data
            const categoryList = CategoryRes.data
            recodeList.forEach(recodeItem => {
              configList.some(configItem => {
                if (configItem.id === recodeItem.itemId) {
                  configItem.itemValue = recodeItem.itemValue
                  return true
                }
              })
            })
            vm.list = categoryList
            categoryList.forEach((item, index) => {
              const array = vm._.filter(configList, configItem => {
                return configItem.categoryName === item.name
              })
              array.forEach(item => {
                if (item.inputType === '2') {
                  item.selectList = item.typeOption.split('^')
                }
              })
              vm.list[index].configList = array
            })
          })
        )
    }
  }
}
</script>

<style>
.row-expand-cover .el-table__expand-icon {
  visibility: hidden;
}

.btn {
  margin: 10px;
}
</style>
