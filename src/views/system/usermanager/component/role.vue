<template>
  <div>
    <el-transfer
      style="padding:0 10px;"
      v-model="value"
      :props="{
        key: 'id',
        label: 'name'
        }"
      :titles="['非用户所属角色','用户所属角色']"
      :data="data"
      @change="handleChange"
    ></el-transfer>
    <div class="btn-group">
      <el-button type="primary" @click="onSubmit">保存</el-button>
      <el-button @click="onCancel">取消</el-button>
    </div>
  </div>
</template>

<script>
import { getUserRoles, addUserRoles } from "@/api/system/usermanager";
export default {
  props: ["userId"],
  data() {
    return {
      data: [],
      value: []
    };
  },
  async created() {
    if (this.userId) {
      let res1 = await getUserRoles(this.userId, 1);
      let res2 = await getUserRoles(this.userId, 0);

      this.data = res1.items.concat(res2.items)
      this.value = res2.items.map(item => item.id);
    } else {
      this.$message.warning("请选择用户");
      this.$emit("complete");
    }
  },
  methods: {
    handleChange(val) {
    },
    onSubmit() {
      addUserRoles(this.userId, this.value)
        .then(result => {
          this.$emit("complete");
          this.$message.success("分配成功！");
        })
        .catch(err => {});
    },
    onCancel() {
      this.$emit("complete");
      this.$message.warning("取消编辑");
    }
  },
};
</script>
<style lang="scss" scoped>
.btn-group {
  padding: 20px;
}
</style>
