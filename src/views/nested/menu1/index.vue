<template>
  <div class="dashboard-container">
    <el-button type="primary" @click="dialogFormVisible = true">新增指标</el-button>

    <el-dialog title="新增指标" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form">
        <el-form-item label="指标名称" :label-width="formLabelWidth" class="singleinput">
          <el-input v-model="form.zbmc" autocomplete="off" />
        </el-form-item>
        <el-form-item label="上级指标" :label-width="formLabelWidth">
          <el-select v-model="form.sjzb" placeholder="请选择上级指标">
            <el-option label="实验室指标" value="实验室指标" />
            <el-option label="特检指标" value="特检指标" />
            <el-option label="人体成分" value="人体成分" />
            <el-option label="其他信息" value="其他信息" />
          </el-select>
        </el-form-item>

        <el-form-item label="指标类型" :label-width="formLabelWidth">
          <el-select v-model="form.zblx" placeholder="请选择指标类型">
            <el-option label="输入框" value="输入框" />
            <el-option label="单选" value="单选" />
          </el-select>
        </el-form-item>

        <el-form-item
          v-for="(domain, index) in form.singleArray"
          v-show="isSingleItemShow"
          :key="domain.key"
          :label="(index+1)+'.单选名称'"
          :prop="'domains.' + index + '.value'"
          :rules="{required: true, message: '单选名称不能为空', trigger: 'blur'}"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="domain.value"
            class="singleinput"
            maxlength="20"
            show-word-limit
            placeholder="请输入单选名称"
          />
          <el-button @click.prevent="removesingle(domain)">删除</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        <el-button v-show="isSingleItemShow" @click="addsingle">新增单选</el-button>
        <el-button @click="handledialogcancel">取 消</el-button>
      </div>
    </el-dialog>
    <el-table ref="singleTable" :data="tableData" highlight-current-row style="width: 100%">
      <el-table-column property="zbmc" label="指标名称" />
      <el-table-column property="sjzb" label="上级指标" />
      <el-table-column property="zblx" label="指标类型" />
      <el-table-column property="zysx" label="注意事项" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div v-show="!scope.row.edit">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              v-show="!scope.row.edit"
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </div>
          <!-- <div v-show="scope.row.edit">
            <el-button size="mini" @click="handleSave(scope.$index, scope.row)">保存</el-button>
            <el-button
              v-show="scope.row.edit"
              size="mini"
              type="danger"
              @click="handleCancel(scope.$index, scope.row)"
            >取消</el-button>
          </div>-->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Menu1',
  data() {
    return {
      tableData: [
        {
          zbmc: '测试1',
          sjzb: '实验室指标',
          zblx: '单选',
          zysx: '注意事项',
          edit: false
        },
        {
          zbmc: '测试2',
          sjzb: '特检指标',
          zblx: '单选',
          zysx: '注意事项',
          edit: false
        },
        {
          zbmc: '测试3',
          sjzb: '人体成分',
          zblx: '单选',
          zysx: '注意事项',
          edit: false
        },
        {
          zbmc: '测试4',
          sjzb: '其他信息',
          zblx: '单选',
          zysx: '注意事项',
          edit: false
        }
      ],
      currentRow: null,
      dialogFormVisible: false,
      form: {
        name: '',
        sjzb: '',
        zblx: '',
        singleArray: []
      },
      formLabelWidth: '120px'
    }
  },
  computed: {
    isSingleItemShow() {
      return this.form.zblx === '单选'
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
      this.$message('编辑')
      // row.edit = true;
    },
    handleDelete(index, row) {
      console.log(index, row)
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
        sjzb: '',
        zblx: '',
        singleArray: []
      }
    },
    handledialogcancel() {
      this.resetForm()
      this.dialogFormVisible = false
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
</style>
