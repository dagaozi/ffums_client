<!--
 * @Description:
 * @Author: lxc
 * @Date: 2020-05-06 20:11:06
 * @LastEditTime: 2020-06-11 15:49:55
 * @LastEditors: lxc
 -->
<template>
  <div class="dashboard-container">
    <div class="title">
      <el-button
        class="add"
        type="primary"
        @click="dialogFormVisible = true"
      >新增患者</el-button>
      <el-dialog
        v-loading="dialogLoading"
        title="新增患者"
        :visible.sync="dialogFormVisible"
      >
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="姓名：" class="from-item">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="年龄：" class="from-item">
            <el-input v-model="form.age" />
          </el-form-item>
          <el-form-item label="性别：" class="from-item">
            <el-select v-model="form.gender" placeholder="请选择性别">
              <el-option label="男" value="1" />
              <el-option label="女" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="病人归属：" class="from-item">
            <el-select v-model="form.department" placeholder="请选择归属">
              <el-option label="内科" value="内科" />
              <el-option label="外科" value="外科" />
            </el-select>
          </el-form-item>
          <el-form-item label="身份证：" class="from-item">
            <el-input v-model="form.idCard" />
          </el-form-item>
          <el-form-item label="住院号：" class="from-item">
            <el-input v-model="form.inPatientId" />
          </el-form-item>
          <el-form-item label="门诊号：" class="from-item">
            <el-input v-model="form.mzId" />
          </el-form-item>
          <el-form-item label="电话1：" class="from-item">
            <el-input v-model="form.phone1" />
          </el-form-item>
          <el-form-item label="电话2：" class="from-item">
            <el-input v-model="form.phone2" />
          </el-form-item>
          <el-form-item label="地址：">
            <el-input v-model="form.address" type="textarea" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAddPatient">确 定</el-button>
        </div>
      </el-dialog>
      <div class="tip">当前选中的患者：{{ selectName }}</div>
      <el-button v-show="selectName" type="danger" icon="el-icon-delete" circle @click="setCurrent()" />
    </div>

    <div class="search">
      <el-input
        v-model="searchContent"
        placeholder="请输入内容"
        class="input-with-select"
      >
        <el-select slot="prepend" v-model="selectType" placeholder="请选择">
          <el-option label="姓名" value="name" />
          <el-option label="病人ID" value="id" />
          <el-option label="住院号" value="mzId" />
          <el-option label="病理号" value="inPatientId" />
        </el-select>
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="handleClickSearch"
        />
      </el-input>
    </div>

    <el-table
      ref="singleTable"
      v-loading="loading"
      :data="searchData"
      highlight-current-row
      style="width: 100%"
      :default-sort="{ prop: 'id', order: 'ascending' }"
      :empty-text="empty_text"
      @row-click="handleRowClick"
      @current-change="handleCurrentChange"
    >
      <el-table-column property="name" label="姓名" />
      <el-table-column property="id" label="病人ID" />
      <el-table-column property="mzId" label="住院号" />
      <el-table-column property="inPatientId" label="病理号" />
    </el-table>

    <el-dialog title="选择患者" :visible.sync="dialogVisible" width="30%">
      <span>是否选中该患者</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="handleClickSelect"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { addPatient, getPatientList } from '@/api/patient.js'

export default {
  name: 'PatientList',
  data() {
    return {
      tableData: [],
      searchData: [],
      currentRow: null,
      dialogFormVisible: false,
      dialogLoading: false,
      dialogVisible: false,
      loading: false,
      clickRow: null,
      form: {
        name: '',
        address: '',
        age: '',
        gender: '',
        department: '',
        idCard: '',
        zyId: '',
        mzId: '',
        phone1: '',
        phone2: ''
      },
      empty_text: '暂无数据',
      formLabelWidth: '120px',
      searchContent: '',
      selectType: ''
    }
  },
  computed: {
    ...mapGetters(['name']),
    selectName() {
      if (this.$store.state.patient.info) {
        return this.$store.state.patient.info.name
      } else {
        return ''
      }
    }
  },
  created() {
    this.loading = true
    getPatientList().then(this._getPatientList)
  },
  methods: {
    setCurrent(row) {
      console.log('setCurrent row->', row)
      this.$refs.singleTable.setCurrentRow(row)
      this.$store.commit('patient/setInfo', row)
    },
    handleRowClick(row, column, event) {
      console.log('handleRowClick row', row)
      this.clickRow = row
      this.dialogVisible = true
    },
    handleCurrentChange(val) {
      this.currentRow = val
    },
    handleClickSelect() {
      this.setCurrent(this.clickRow)
      this.dialogVisible = false
    },
    handleAddPatient() {
      addPatient(this.form).then(this._addPatient)
    },
    _addPatient(res) {
      if (res.data) {
        this.dialogFormVisible = false
        this.$message({
          message: res.data,
          type: 'success'
        })
        this.form = {
          name: '',
          address: '',
          age: '',
          gender: '',
          department: '',
          idCard: '',
          inPatientId: '',
          mzId: '',
          phone1: '',
          phone2: ''
        }
        getPatientList().then(this._getPatientList)
      }
    },
    _getPatientList(res) {
      this.loading = false
      if (res.data) {
        this.tableData = res.data
        this.searchData = res.data
      }
    },
    handleClickSearch() {
      if (!this.selectType) {
        this.$message.error('请先选择搜索类型')
        return
      }
      if (this.searchContent) {
        console.log('handleClickSearch this.searchContent', this.searchContent)
        this.searchData = this.tableData.filter(data => {
          console.log('handleClickSearch filter data', data)
          return !data || this.dealData(data)
        })
      } else {
        this.searchData = this.tableData
      }
    },
    dealData(data) {
      if (this.selectType === 'name') {
        return data.name
          .toLowerCase()
          .includes(this.searchContent.toLowerCase())
      } else if (this.selectType === 'id') {
        return data.id
          .toString()
          .toLowerCase()
          .includes(this.searchContent.toLowerCase())
      } else if (this.selectType === 'mzId') {
        return data.mzId
          .toLowerCase()
          .includes(this.searchContent.toLowerCase())
      } else if (this.selectType === 'inPatientId') {
        return data.inPatientId
          .toLowerCase()
          .includes(this.searchContent.toLowerCase())
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.add{
  float left
}

.tip{
  float left
  margin 11px;
}

.from-item {
  width: 60%;
}

.search{
  float left
  width:100%;
  margin-top: 20px;
}

>>>.el-select .el-input {
    width: 130px;
  }

>>>.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
