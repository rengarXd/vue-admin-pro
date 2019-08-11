<template>
  <el-form :inline="true" class="search" :model="userSearchInfo">
    <el-form-item label="帐号">
      <el-input type="text" v-model="userSearchInfo.userAccount"></el-input>
    </el-form-item>
    <el-form-item label="名称">
      <el-input type="text" v-model="userSearchInfo.userName"></el-input>
    </el-form-item>
    <el-form-item label="选择日期">
      <el-date-picker
        unlink-panels
        v-model="date"
        type="daterange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd"
        :default-time="['00:00:00', '23:59:59']"
      ></el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-button v-waves type="primary" @click="handleSearch">查询</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import waves from '@/directive/waves/index.js' // 水波纹指令
export default {
  directives: { waves },
  props: {
    page: {
      type: Object,
      default: {
        page: 1,
        pageSize: 20
      }
    }
  },
  data() {
    return {
      date: [],
      userSearchInfo: {
        userName: "",
        userAccount: "",
        createDateStart: "",
        createDateEnd: ""
      }
    };
  },
  methods: {
    async handleSearch() {
      this.userSearchInfo.createDateStart = this.date[0];
      this.userSearchInfo.createDateEnd = this.date[1];
      let req = Object.assign(this.page, this.userSearchInfo);
      await this.$store.dispatch("usermanager/getLists", req);
    }
  }
};
</script>
<style lang="scss" scoped>
.search {
  border-bottom: 1px dashed #ccc;
  margin-bottom: 20px;
}
</style>