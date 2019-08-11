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
      <el-input v-model="form.userAccount" />
    </el-form-item>
    <el-form-item label="用户名" prop="userName">
      <el-input v-model="form.userName" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        ref="password"
        v-model="form.password"
        type="password"
        placeholder="密码"
        tabindex="3"
        auto-complete="off"
      />
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input
        ref="password"
        v-model="form.checkPass"
        type="password"
        placeholder="密码"
        tabindex="3"
        auto-complete="off"
      />
    </el-form-item>
    <el-form-item label="签名">
      <el-input maxlength="30" v-model="form.title" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">保存</el-button>
      <el-button @click="onCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { insert } from "@/api/system/usermanager";
import { deepClone } from "@/utils";
import md5 from "js-md5";

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
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
        userAccount: "",
        userName: "",
        password: "",
        checkPass: "",
        title: ""
      },
      rules: {
        userAccount: [
          { required: true, trigger: "blur", message: "请输入用户账号" }
        ],
        userName: [
          { required: true, trigger: "blur", message: "请输入用户名称" }
        ],
        password: [
          { validator: validatePass, required: true, trigger: "blur" }
        ],
        checkPass: [
          { validator: validatePass2, required: true, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      // console.log(this.form);
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let req = deepClone(this.form);
          req.password = md5(md5(this.form.password));
          delete req.checkPass;
          insert(req)
            .then(result => {
              this.$emit("submit");
              this.$emit("complete");
              this.reset();
              this.$message.success("创建成功！");
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
        userAccount: "",
        userName: "",
        password: "",
        checkPass: "",
        title: ""
      };
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

