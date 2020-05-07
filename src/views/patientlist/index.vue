<!--
 * @Description:
 * @Author: lxc
 * @Date: 2020-05-06 20:11:06
 * @LastEditTime: 2020-05-07 20:38:22
 * @LastEditors: lxc
 -->
<template>
  <div class="dashboard-container">
    <div>当前选中的患者：{{this.$store.state.patient.info.name}}</div>
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%"
    >
      <el-table-column property="name" label="姓名"></el-table-column>
      <el-table-column property="id" label="病人ID"></el-table-column>
      <el-table-column property="hsId" label="住院号"></el-table-column>
      <el-table-column property="blId" label="病理号"></el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="setCurrent(tableData[1])">选中第二行</el-button>
      <el-button @click="setCurrent()">取消选择</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "PatientList",
  computed: {
    ...mapGetters(["name"])
  },
  data() {
    return {
      tableData: [
        {
          name: "王小虎1",
          id: "1",
          hsId: "2",
          blId: "3"
        },
        {
          name: "王小虎2",
          id: "1222",
          hsId: "2333",
          blId: "34444"
        },
        {
          name: "王小虎3",
          id: "333",
          hsId: "2444",
          blId: "342324"
        },
        {
          name: "王小虎4",
          id: "13423",
          hsId: "2423423",
          blId: "343242"
        }
      ],
      currentRow: null
    };
  },
  methods: {
    setCurrent(row) {
      console.log("setCurrent row->", row);
      this.$refs.singleTable.setCurrentRow(row);
      this.$store.commit("patient/setInfo", row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    }
  }
};
</script>

<style lang="stylus" scoped>
.dashboard-container {
}
</style>
