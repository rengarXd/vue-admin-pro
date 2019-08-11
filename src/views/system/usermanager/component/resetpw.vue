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
    <el-form-item label="新密码" prop="password">
      <el-input
        ref="password"
        v-model="form.password"
        type="password"
        placeholder="密码"
        name="password"
        tabindex="3"
        auto-complete="on"
      />
    </el-form-item>
    <el-form-item label="确认密码" prop="newPwd">
      <el-input
        ref="password"
        v-model="form.newPwd"
        type="password"
        placeholder="密码"
        name="password"
        tabindex="3"
        auto-complete="on"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">保存</el-button>
      <el-button @click="onCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { resetPwd } from "@/api/system/usermanager";
import { deepClone } from "@/utils";
import md5 from "js-md5";

export default {
  props: ["account"],
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.newPwd !== "") {
          this.$refs.ruleForm.validateField("newPwd");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        userAccount: this.account,
        password: "",
        newPwd: ""
      },
      rules: {
        password: [
          { validator: validatePass, required: true, trigger: "blur" }
        ],
        newPwd: [{ validator: validatePass2, required: true, trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate(value => {
        if (value) {
          let req = deepClone(this.form);
          req.newPwd = md5(md5(this.form.newPwd));
          delete req.password;
          resetPwd(req)
            .then(result => {
              this.$emit("submit");
              this.$emit("complete");
              this.reset();
              this.$message.success("重置成功！");
            })
            .catch(err => {
              this.$emit("complete");
              this.reset();
              this.$message.error("提交失败！");
            });
        } else {
          this.$message.error("提交失败！请检查填写内容");
        }
      });
    },
    onCancel() {
      this.$emit("cancel");
      this.$emit("complete");
      this.reset();
      this.$message.warning("取消编辑！");
    },
    reset() {
      this.form = {
        password: "",
        newPwd: ""
      };
    }
  }
};
</script>

<style lang="scss" scoped>
</style>