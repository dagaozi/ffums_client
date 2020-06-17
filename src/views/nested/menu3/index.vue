<!--
 * @Description:
 * @Author: lxc
 * @Date: 2020-05-19 23:21:51
 * @LastEditTime: 2020-06-17 20:01:33
 * @LastEditors: lxc
-->
<template>
  <div class="dashboard-container">
    <div class="page_title">
      <el-button
        type="primary"
        class="btn"
        @click="handleAddNew"
      >新增指标</el-button>

      <el-dialog :title="showDialogTitle" :visible.sync="dialogFormVisible">
        <el-form ref="form" :model="form">
          <el-form-item
            label="指标名称"
            :label-width="formLabelWidth"
            class="singleinput"
            prop="name"
          >
            <el-input v-model="form.name" autocomplete="off" />
          </el-form-item>

          <el-form-item
            label="指标类型"
            :label-width="formLabelWidth"
            prop="inputType"
          >
            <el-select v-model="form.inputType" placeholder="请选择指标类型">
              <el-option label="输入框" value="1" />

              <el-option label="单选" value="2" />
            </el-select>
          </el-form-item>

          <el-form-item
            v-for="(domain, index) in form.singleArray"
            v-show="isSingleItemShow"
            :key="domain.key"
            :label="index + 1 + '.单选名称'"
            :prop="'singleArray.' + index + '.value'"
            :rules="{
              required: true,
              message: '单选名称不能为空',
              trigger: 'blur'
            }"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="domain.value"
              class="singleinput"
              maxlength="20"
              show-word-limit
              placeholder="请输入单选名称"
              @input="updateInput"
            />

            <el-button @click.prevent="removesingle(domain)">删除</el-button>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            @click="handleClickDialogOk"
          >确 定</el-button>

          <el-button
            v-show="isSingleItemShow"
            @click="addsingle"
          >新增单选</el-button>

          <el-button @click="handledialogcancel">取 消</el-button>
        </div>
      </el-dialog>
      <div class="select-tip">当前目录：{{ showSelectInfo }}</div>
    </div>

    <el-table
      ref="singleTable"
      :data="getThisList"
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column property="name" label="指标名称" />

      <el-table-column property="inputType" label="指标类型">
        <template slot-scope="scope">
          <div>{{ scope.row.inputType == "1" ? "输入框" : "单选" }}</div>
        </template>
      </el-table-column>
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
  getAllConfig,
  addConfig,
  updateConfig,
  deleteConfig
} from '@/api/itemconfig.js'

export default {
  name: 'Menu3',
  data() {
    return {
      activeName: 'first',
      tableData: [],
      currentRow: null,
      dialogFormVisible: false,
      form: {
        name: '',
        inputType: '',
        typeOption: '',
        singleArray: []
      },
      formLabelWidth: '120px',
      mAddNew: false
    }
  },
  computed: {
    isSingleItemShow() {
      return this.form.inputType === '2'
    },
    showSelectInfo() {
      return (
        this.$store.state.category.selectCategory.activeName +
        ' —> ' +
        this.$store.state.category.selectCategory.name
      )
    },
    showDialogTitle() {
      if (this.mAddNew) {
        return '新增指标'
      } else {
        return '更新指标'
      }
    },
    getThisList() {
      let array = []
      const name = this.$store.state.category.selectCategory.name
      array = this._.filter(this.tableData, item => {
        return item.categoryName === name
      })
      return array
    }
  },
  created() {
    getAllConfig().then(this._getAllConfig)
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
      this.mAddNew = false
      this.dialogFormVisible = true
      this.form.categoryId = row.categoryId
      this.form.id = row.id
      this.form.name = row.name
      this.form.inputType = row.inputType
      const tempArray = this._.cloneDeep(row.typeOption)
      const split = tempArray.split('^')
      console.log('split', split.length)
      for (let i = 0; i < split.length; i++) {
        this.form.singleArray.push({ value: split[i], key: i })
      }
    },
    handleDelete(index, row) {
      console.log(index, row)
      deleteConfig(row.id).then(res => {
        if (res.data) {
          getAllConfig().then(this._getAllConfig)
        }
      })
    },
    newZb() {
      this.$message('新增指标')
    },
    addsingle() {
      console.log('addsingle', this.form)
      this.form.singleArray.push({
        value: '',
        key: Date.now()
      })
      this.updateForm()
    },
    updateForm() {
      this.form.inputType = '1'
      this.form.inputType = '2'
    },
    updateInput() {
      this.updateForm()
      console.log('updateInput', this.form)
    },
    removesingle(item) {
      var index = this.form.singleArray.indexOf(item)
      console.log('removesingle index ->', index)
      if (index !== -1) {
        this.form.singleArray.splice(index, 1)
      }
      this.updateForm()
    },
    resetForm() {
      this.form = {
        name: '',
        singleArray: [],
        inputType: ''
      }
    },
    handledialogcancel() {
      this.resetForm()
      this.dialogFormVisible = false
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    _getAllConfig(res) {
      if (res.data) {
        this.tableData = res.data
      }
    },
    handleClickDialogOk() {
      console.log('handleClickDialogOk', this.form)
      const obj = {}
      obj.categoryId = this.$store.state.category.selectCategory.categoryId
      obj.categoryName = this.$store.state.category.selectCategory.name
      obj.inputType = this.form.inputType
      obj.typeOption = this.getSingleSelect()
      obj.name = this.form.name
      console.log('handleClickDialogOk obj->', obj)
      if (this.mAddNew) {
        addConfig(obj).then(this._addConfig)
      } else {
        obj.id = this.form.id
        updateConfig(obj).then(this._updateConfig)
      }
    },
    _addConfig(res) {
      if (res.ok) {
        this.dialogFormVisible = false
        this.$message({
          message: res.data,
          type: 'success'
        })
        this.resetForm()
        getAllConfig().then(this._getAllConfig)
      } else {
         this.$message({
          message: res.msg,
          type: 'error'
        })
      }
    },
    _updateConfig(res) {
      this.dialogFormVisible = false
      this.$message({
        message: res.data,
        type: 'success'
      })
      this.resetForm()
      getAllConfig().then(this._getAllConfig)
    },
    handleAddNew() {
      this.mAddNew = true
      this.dialogFormVisible = true
    },
    getSingleSelect() {
      console.log(this.form.singleArray)
      let content = ''
      for (let i = 0; i < this.form.singleArray.length; i++) {
        if (i === this.form.singleArray.length - 1) {
          content = content + this.form.singleArray[i].value
        } else {
          content = content + this.form.singleArray[i].value + '^'
        }
      }
      return content
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
    float left
}
.select-tip{
    float left
    margin 11px
}
</style>
