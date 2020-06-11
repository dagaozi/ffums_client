<!--
 * @Description:
 * @Author: lxc
 * @Date: 2020-06-06 23:31:11
 * @LastEditTime: 2020-06-10 21:58:21
 * @LastEditors: lxc
-->
<template>
  <div class="container">
    <pat-info />

    <div class="select-sf">
      <h3 class="select-tip">当前随访名称:</h3>

      <el-select
        v-model="sfmc"
        placeholder="请选择随访名称"
        class="select-view"
      >
        <el-option label="第一次随访" value="第一次随访" />

        <el-option label="第二次随访" value="第二次随访" />

        <el-option label="第三次随访" value="第三次随访" />

        <el-option label="第四次随访" value="第四次随访" />
      </el-select>
    </div>

    <el-tabs
      v-model="activeName"
      type="card"
      class="tab-view"
      @tab-click="handleClick"
    >
      <el-tab-pane label="随访管理" name="first">
        <sf-manage />
      </el-tab-pane>
      <el-tab-pane label="指标管理" name="second">
        <zb-manage />
      </el-tab-pane>
      <el-tab-pane label="标本管理" name="third">标本管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import PatInfo from '@/components/Patinfo/index.vue'
import SfManage from '@/components/SfManage/index.vue'
import ZbManage from '@/components/ZbManage/index.vue'
export default {
  name: 'All',
  components: {
    PatInfo,
    SfManage,
    ZbManage
  },
  data() {
    return {
      sfmc: '第一次随访',
      activeName: 'first'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang="stylus" scoped>
.container {
  margin: 30px;

  .select-sf{
    height 40px
    width 100%

    .select-tip{
      float left
      height 40px
      line-height 40px
      margin 0
    }

    .select-view{
      float left
      line-height 40px
      margin-left 10px
    }
  }

  .tab-view{
   margin 10px
  }
}
</style>
