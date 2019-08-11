<template>
  <el-form :model="accountForm" status-icon :rules="rules" ref="accountForm" label-width="100px">
    <!-- <el-form-item label="账号" prop="userAccount">
      <el-input disabled type="text" v-model="accountForm.userAccount"></el-input>
    </el-form-item>-->
    <el-form-item label="原密码" prop="oldPwd">
      <el-input type="password" v-model="accountForm.oldPwd"></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="newPwd">
      <el-input type="password" v-model="accountForm.newPwd" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input type="password" v-model="accountForm.checkPass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('accountForm')">提交</el-button>
      <el-button @click="resetForm('accountForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { changePwd } from "@/api/system/usermanager";
import { deepClone } from "@/utils";
import md5 from "js-md5";

export default {
  props: ["user"],
  data() {
    let checkoldPwd = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("原密码不能为空"));
      } else {
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.accountForm.checkPass !== "") {
          this.$refs.accountForm.validateField("checkPass");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.accountForm.newPwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    let userAccount = this.user.userAccount;
    return {
      accountForm: {
        userAccount,
        newPwd: "",
        checkPass: "",
        oldPwd: ""
      },
      rules: {
        newPwd: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        oldPwd: [{ validator: checkoldPwd, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(value => {
        // console.log(valid);
        if (value) {
          let req = deepClone(this.accountForm);
          req.oldPwd = md5(md5(this.accountForm.oldPwd));
          req.newPwd = md5(md5(this.accountForm.newPwd));
          delete req.checkPass;
          console.log(req);
          changePwd(req)
            .then(result => {
              this.$message.success("修改成功！");
            })
            .catch(err => {
              this.$message.success("修改失败！" + err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>