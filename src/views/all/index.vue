<!--
 * @Description:
 * @Author: lxc
 * @Date: 2020-06-06 23:31:11
 * @LastEditTime: 2020-06-16 10:31:16
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
        no-data-text="暂无随访信息"
        class="select-view"
        @change="handleChangeSelcetSf"
      >
        <el-option
          v-for="(item,index) in sfData"
          :key="item.id"
          :label="item.name"
          :value="index"
        />
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
import { EventBus } from '@/utils/eventBus'
import { getByPatientId } from '@/api/followup.js'
export default {
  name: 'All',
  components: {
    PatInfo,
    SfManage,
    ZbManage
  },
  data() {
    return {
      sfmc: '',
      activeName: 'first',
      sfData: []
    }
  },
  created() {
    EventBus.$on('sf-refresh', () => {
      this.getSfList()
    })
    this.getSfList()
  },
  destroyed() {
    EventBus.$off('sf-refresh')
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    handleChangeSelcetSf(value) {
      console.log('handleChangeSelcetSf value->', value)
      EventBus.$emit('sf-select', this.sfData[value])
    },
    getSfList() {
      getByPatientId(this.$store.state.patient.info.id).then(result => {
        if (result.data) {
          this.sfData = result.data
          console.log('getSfList', this.sfData)
        }
      })
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
