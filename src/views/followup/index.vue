<template>
  <div class="dashboard-container">
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%"
    >
      <el-table-column property="sfmc" label="随访名称"></el-table-column>
      <el-table-column property="sfsj" label="随访时间"></el-table-column>
      <el-table-column property="sfxs" label="随访形式"></el-table-column>
      <el-table-column property="zysx" label="注意事项"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "FollowUp",
  computed: {
    ...mapGetters(["name"])
  },
  data() {
    return {
      tableData: [
        {
          sfmc: "第一次随访",
          sfsj: "2017-07-18",
          sfxs: "住院",
          zysx: "注意事项"
        },
        {
          sfmc: "第二次随访",
          sfsj: "2017-07-18",
          sfxs: "住院",
          zysx: "注意事项"
        },
        {
          sfmc: "第三次随访",
          sfsj: "2017-07-18",
          sfxs: "住院",
          zysx: "注意事项"
        },
        {
          sfmc: "第四次随访",
          sfsj: "2017-07-18",
          sfxs: "住院",
          zysx: "注意事项"
        }
      ],
      currentRow: null
    };
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
