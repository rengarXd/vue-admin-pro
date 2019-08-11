<template>
  <div class="dashboard-container">
    <h1 style="text-align:center">欢迎使用后台管理系统</h1>
    <div class="dashboard-text">用户名: {{ name }}</div>
    <aside style="margin-top:10px;">对于一些首次进入项目的人来说，指南页面非常有用。您可以简要介绍项目的特性。</aside>
    <el-button
      style="margin-top:10px;"
      icon="el-icon-question"
      type="primary"
      @click.prevent.stop="guide"
    >展示引导</el-button>
  </div>
</template>

<script>
import Driver from "driver.js"; // import driver.js
import "driver.js/dist/driver.min.css"; // import driver.js css
import steps from "./steps";
import { mapGetters } from "vuex";

export default {
  name: "Guide",
  data() {
    return {
      driver: null
    };
  },
  computed: {
    ...mapGetters(["name"])
  },
  mounted() {
    this.driver = new Driver();
  },
  methods: {
    guide() {
      this.driver.defineSteps(steps);
      this.driver.start();
    }
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