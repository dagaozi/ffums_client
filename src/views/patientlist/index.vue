<!--
 * @Description:
 * @Author: lxc
 * @Date: 2020-05-06 20:11:06
 * @LastEditTime: 2020-05-07 20:38:22
 * @LastEditors: lxc
 -->
<template>
  <div class="dashboard-container">
    患者列表
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PatientList',
  computed: {
    ...mapGetters(['name'])
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="stylus" scoped>

.dashboard-container{
    background red;
}
</style>
