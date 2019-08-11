<template>
  <el-form
    class="container"
    ref="ruleForm"
    :model="form"
    :rules="rules"
    status-icon
    label-width="120px"
  >
    <el-form-item label="登录账号" prop="userAccount">
      <el-input disabled v-model="form.userAccount" />
    </el-form-item>
    <el-form-item label="用户名" prop="userName">
      <el-input v-model="form.userName" />
    </el-form-item>
    <el-form-item label="签名">
      <el-input :maxlength="30" v-model="form.title" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">保存</el-button>
      <el-button @click="onCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { update } from "@/api/system/usermanager";
export default {
  props: {
    userinfo: Object
  },
  data() {
    return {
      form: Object.assign({},this.userinfo),
      rules: {
        userName: [
          { required: true, trigger: "blur", message: "请输入用户名称" }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate(value => {
        if (value) {
          update(this.form)
            .then(result => {
              this.$emit("submit");
              this.$emit("complete");
              this.reset();
              this.$message.success("保存成功！");
            })
            .catch(err => {
              this.$message.success("提交失败！");
            });
        } else {
          this.$message.success("提交失败！请检查填写内容");
        }
      });
    },
    onCancel() {
      //   this.$emit("cancel");
      this.$emit("complete");
      this.reset();
      this.$message.warning("取消编辑！");
    },
    reset() {
      this.form = Object.assign({ checkPass: "" }, this.userinfo);
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  padding: 10px;
  .line {
    text-align: center;
  }
}
</style>

