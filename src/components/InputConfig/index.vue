<!--
 * @Description:
 * @Author: lxc
 * @Date: 2020-05-27 09:20:53
 * @LastEditTime: 2020-05-27 11:30:18
 * @LastEditors: lxc
-->
<template>
  <div>
    <el-table :data="configList" :show-header="false" border>
      <el-table-column prop="name" label="配置项名称" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!--    <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button> -->
          <div v-if="scope.row.inputType === '1'" class="input-content">
            <el-input v-model="scope.row.typeOption" placeholder="请输入内容" class="input-view" />
          </div>
          <div v-if="scope.row.inputType === '2'" class="select-group">
            <el-radio-group v-model="scope.row.itemValue">
              <el-radio v-for="(item) in scope.row.selectList" :key="item" v-model="item.value" :label="item" />
            </el-radio-group>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    configList: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
      return {
      }
  },
  created() {
    console.log('created configList->', this.configList)
  },
  methods: {
      getSelectList(typeOption) {
        return typeOption.split('^')
      }
  }
}
</script>

<style lang="stylus" >

.el-input__inner{
    line-height 30px
    height 30px
}

</style>
