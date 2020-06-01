<template>
  <div class="container">
    <pat-info></pat-info>
    <div>测试</div>
  </div>
</template>

<script>
import PatInfo from "@/components/Patinfo/index.vue";
export default {
  name: "All",
  components: {
    PatInfo
  },
  data() {
    return {};
  }
};
</script>

<style lang="stylus" >
.container {
  margin: 30px;
}
</style>