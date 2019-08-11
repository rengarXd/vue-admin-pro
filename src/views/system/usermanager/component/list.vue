<template>
  <el-table
    ref="multipleTable"
    tooltip-effect="dark"
    :data="gridData"
    fit
    highlight-current-row
    @current-change="handleCurrentChange"
  >
    <el-table-column v-if="isMulti" type="selection" width="55" />
    <!-- <el-table-column prop="id" label="用户ID" width="80" /> -->
    <el-table-column prop="userName" label="用户名" />
    <el-table-column prop="userAccount" label="用户账号" />
    <el-table-column prop="accessKey" label="accessKey" />
    <el-table-column prop="title" label="签名" show-overflow-tooltip />
    <el-table-column prop="createUser" label="创建人" />
    <el-table-column prop="createDate" sortable label="创建时间" />
    <el-table-column prop="updateUser" label="更新人" />
    <el-table-column prop="updateDate" sortable label="更新时间" />
    <el-table-column align="center" width="220" label="操作">
      <template slot-scope="scope">
        <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
        <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: ["gridData", "isMulti"],
  methods: {
    handleCurrentChange(val) {
      // console.log(val);
      this.$emit('currentselect',val)
    },
    handleEdit(scope) {
      this.$emit("edit", scope.row);
    },
    handleDelete(scope) {
      this.$emit("delet", scope.row);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>