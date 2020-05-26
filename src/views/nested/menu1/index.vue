<template>
  <div class="dashboard-container">
    <el-button
      type="primary"
      class="btn"
      @click="handleAddNewClick"
    >新增目录</el-button>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form">
        <el-form-item
          label="目录名称"
          :label-width="formLabelWidth"
          class="singleinput"
          prop="name"
        >
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>

        <el-form-item
          label="上级指标"
          :label-width="formLabelWidth"
          prop="category"
        >
          <el-select v-model="form.category" placeholder="请选择上级指标">
            <el-option label="实验室指标" value="实验室指标" />

            <el-option label="特检指标" value="特检指标" />

            <el-option label="人体成分" value="人体成分" />

            <el-option label="其他信息" value="其他信息" />
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleOk">确 定</el-button>
        <el-button @click="handledialogcancel">取 消</el-button>
      </div>
    </el-dialog>

    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="实验室指标" name="实验室指标">
        <el-table
          ref="singleTable"
          :data="tableData"
          highlight-current-row
          style="width: 100%"
          :show-header="false"
        >
          <el-table-column property="name" label="目录名称" />

          <el-table-column label="操作">
            <template slot-scope="scope">
              <div v-show="!scope.row.edit">
                <el-button
                  size="mini"
                  @click="handleEditZb(scope.$index, scope.row)"
                >编辑指标</el-button>
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
      </el-tab-pane>

      <el-tab-pane label="特检指标" name="特检指标">
        <el-table
          ref="singleTable"
          :data="tableData"
          highlight-current-row
          style="width: 100%"
          :show-header="false"
        >
          <el-table-column property="name" label="目录名称" />

          <el-table-column label="操作">
            <template slot-scope="scope">
              <div v-show="!scope.row.edit">
                <el-button
                  size="mini"
                  @click="handleEditZb(scope.$index, scope.row)"
                >编辑指标</el-button>
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
      </el-tab-pane>

      <el-tab-pane
        label="人体成分"
        name="人体成分"
      ><el-table
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        style="width: 100%"
        :show-header="false"
      >
        <el-table-column property="name" label="目录名称" />

        <el-table-column label="操作">
          <template slot-scope="scope">
            <div v-show="!scope.row.edit">
              <el-button
                size="mini"
                @click="handleEditZb(scope.$index, scope.row)"
              >编辑指标</el-button>
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
      </el-table></el-tab-pane>

      <el-tab-pane
        label="其他信息"
        name="其他信息"
      ><el-table
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        style="width: 100%"
        :show-header="false"
      >
        <el-table-column property="name" label="目录名称" />

        <el-table-column label="操作">
          <template slot-scope="scope">
            <div v-show="!scope.row.edit">
              <el-button
                size="mini"
                @click="handleEditZb(scope.$index, scope.row)"
              >编辑指标</el-button>
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
      </el-table></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  addItemCategoryConfig,
  updateItemCategoryConfig,
  getItemCategoryConfigByName,
  deleteCategory
} from '@/api/categoryconfig.js'
export default {
  name: 'Menu1',
  data() {
    return {
      activeName: '实验室指标',
      mAddNew: false,
      tableData: [],
      currentRow: null,
      dialogFormVisible: false,
      form: {
        name: '',
        category: ''
      },
      formLabelWidth: '120px',
      index: '实验室指标'
    }
  },
  computed: {
    isSingleItemShow() {
      return this.form.zblx === '单选'
    },
    dialogTitle() {
      if (this.mAddNew) {
        return '新增目录'
      } else {
        return '更新目录'
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      getItemCategoryConfigByName(this.activeName).then(
        this._getItemCategoryConfigById
      )
    },
    _getItemCategoryConfigById(res) {
      if (res.data) {
        this.tableData = res.data
      }
    },
    handleEdit(index, row) {
      console.log(index, row)
      this.dialogFormVisible = true
      this.mAddNew = false
      this.form.name = row.name
      this.form.category = row.category
      this.form.id = row.id
      // row.edit = true;
    },
    handleDelete(index, row) {
      console.log(index, row)
      deleteCategory(row.categoryId).then(res => {
        // if (res.data) {
        // } else {
        // }
      })
      this.$message('删除')
    },
    newZb() {
      this.$message('新增指标')
    },
    addsingle() {
      this.form.singleArray.push({
        value: '',
        key: Date.now()
      })
    },
    removesingle(item) {
      var index = this.form.singleArray.indexOf(item)
      console.log('removesingle index ->', index)
      if (index !== -1) {
        this.form.singleArray.splice(index, 1)
      }
    },
    resetForm() {
      this.form = {
        name: '',
        category: ''
      }
    },
    handledialogcancel() {
      this.resetForm()
      this.dialogFormVisible = false
    },
    handleClick(tab, event) {
      console.log('handleClick', tab, event)
      this.getData()
    },
    handleOk() {
      if (this.mAddNew) {
        this.form.categoryId = this.getCateGoryIdByName()
        addItemCategoryConfig(this.form).then(this._addItemCategoryConfig)
      } else {
        this.form.categoryId = this.getCateGoryIdByName()
        updateItemCategoryConfig(this.form).then(res => {
          if (res.data) {
            this.dialogFormVisible = false
            this.$refs.form.resetFields()
            this.$message({
              message: res.data,
              type: 'success'
            })
            this.getData()
          }
        })
      }
    },
    getCateGoryIdByName() {
      if (this.form.category === '实验室指标') {
        return '1'
      } else if (this.form.category === '特检指标') {
        return '2'
      } else if (this.form.category === '人体成分') {
        return '3'
      } else if (this.form.category === '其他信息') {
        return '4'
      }
    },
    _addItemCategoryConfig(res) {
      if (res.data) {
        this.dialogFormVisible = false
        this.$refs.form.resetFields()
        this.$message({
          message: res.data,
          type: 'success'
        })
      }
    },
    handleEditZb(index, row) {
      console.log('handleEditZb', index, row)
      row.activeName = this.activeName
      this.$store.commit('category/setSelectCategory', row)
      this.$router.push({ path: '/nested/menu3' })
    },
    handleAddNewClick() {
      this.dialogFormVisible = true
      this.mAddNew = true
    }
  }
}
</script>

<style lang="stylus" scoped>

.dashboard-container {
  margin: 30px;

  .singleinput {
    width: 50%;
  }
}

.btn{
  margin 10px
}
</style>
