<template>
  <div class="dashboard-container">
      
    <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="随访名称：" class="from-item">
        <el-select v-model="form.sfmc" placeholder="请选择随访名称">
          <el-option label="第一次随访" value="1"/>
          <el-option label="第二次随访" value="2"/>
          <el-option label="第三次随访" value="3"/>
          <el-option label="第四次随访" value="4"/>
        </el-select>
      </el-form-item>
      <el-form-item label="随访时间：" class="from-item">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.sfsj" style="width: 100%;"></el-date-picker>
      </el-form-item>
  

      <el-form-item label="随访形式：" class="from-item">
        <el-select v-model="form.sfxs" placeholder="请选择随访形式">
          <el-option label="门诊" value="门诊"/>
          <el-option label="住院" value="住院"/>
          <el-option label="电话" value="电话"/>
          <el-option label="网络" value="网络"/>
        </el-select>
      </el-form-item>
      <el-form-item label="随访注意事项：">
        <el-input v-model="form.zysx" type="textarea"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">新增随访</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "NewFollowUp",
  computed: {
    ...mapGetters(["name"])
  },
  data() {
    return {
      form: {
        sfmc:"",  
        sfsj: "",
        sfxs: "",
        zysx: "",
      }
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
