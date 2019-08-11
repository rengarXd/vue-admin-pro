<template>
  <div class="app-container">
    <el-row :gutter="24">
      <el-col :span="10">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <div>
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-plus"
                @click="() => handleCreate(0)"
              >新增节点</el-button>
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-plus"
                @click="() => handleCreate(1)"
              >新增子节点</el-button>
              <!-- <el-button
            type="info"
            size="mini"  icon="el-icon-edit"
            @click="() => handleEdit(data)">
            修改节点
              </el-button>-->
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                @click="() => handleDelete()"
              >删除</el-button>
            </div>
          </div>
          <el-tree
            :data="treeData"
            node-key="id"
            accordion
            default-expand-all
            @node-click="handleEdit"
            :expand-on-click-node="false"
          >
            <!-- <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span v-if="data.data!=null" >
          <el-button
            type="text"
            size="mini"
            @click="() => handleCreate(data)">
            <i class="el-icon-plus"></i>
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => handleDelete(node, data)">
            <i class="el-icon-delete"></i>
          </el-button>
        </span>
            </span>-->
          </el-tree>
        </el-card>
      </el-col>
      <el-col :span="14">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{dialogType==='edit'?'编辑菜单':'新增菜单'}}</span>
            <el-button style="float: right; " type="primary" @click="confirmDomain">保存</el-button>
          </div>
          <el-form
            style="padding:20px;"
            status-icon
            ref="menuForm"
            :rules="rules"
            :model="menu"
            label-width="120px"
            label-position="left"
          >
            <el-form-item label="上级菜单" prop="parentId">
              <el-select
                v-model="menu.parentId"
                filterable
                reserve-keyword
                placeholder="请输入关键词"
                disabled
              >
                <el-option
                  v-for="item in searchSelectorItem"
                  :key="item.id"
                  :label="item.menuImg+item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="菜单级别">
              <el-select v-model="menu.menuLevel">
                <el-option label="地址" value></el-option>
                <el-option label="1级菜单" value="1"></el-option>
                <el-option label="2级菜单" value="2"></el-option>
                <el-option label="3级菜单" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="菜单名称" prop="name">
              <el-input v-model="menu.name" name="name" placeholder="请输入菜单名称" />
            </el-form-item>
            <el-form-item label="菜单路由地址" prop="menuUrl">
              <el-input v-model="menu.menuUrl" name="menuUrl" placeholder="请输入菜单路由地址" />
            </el-form-item>

            <el-form-item label="菜单编号">
              <el-input v-model="menu.code" name="code" disabled placeholder="请输入菜单编号" />
            </el-form-item>
            <el-form-item label="路由组件">
              <el-input v-model="menu.component" name="component" placeholder="请输入路由组件" />
            </el-form-item>
            <el-form-item label="重定向路径" prop="redirect">
              <el-input v-model="menu.redirect" name="redirect" placeholder="请输入重定向路径" />
            </el-form-item>

            <el-form-item label="一级菜单排序号">
              <el-input-number
                v-model="menu.menuOrderNum1"
                name="menuOrderNum1"
                :min="1"
                :max="10"
                placeholder="请输入菜单序号"
              />
            </el-form-item>
            <el-form-item label="二级菜单排序号">
              <el-input-number
                v-model="menu.menuOrderNum2"
                name="menuOrderNum2"
                :min="1"
                :max="10"
                placeholder="请输入菜单序号"
              />
            </el-form-item>
            <el-form-item label="三级菜单排序号">
              <el-input-number
                v-model="menu.menuOrderNum3"
                name="menuOrderNum3"
                :min="1"
                :max="10"
                placeholder="请输入菜单序号"
              />
            </el-form-item>
            <el-form-item label="菜单图标">
              <el-input v-model="menu.menuImg" name="menuImg" placeholder="请输入菜单图标" />
            </el-form-item>
            <el-form-item label="菜单是否隐藏">
              <el-switch v-model="menu.hidden" active-text="是" inactive-text="否" active-value="1" inactive-value="0"></el-switch>
              <!-- <el-checkbox border  v-model="menu.hidden"  size="medium" label="菜单是否隐藏"></el-checkbox> -->
            </el-form-item>
            <!-- component 路由组件
        redirect 重定向路径
        hidden 是否隐藏
        menuLevel 菜单级别
        menuOrderNum1 一级菜单排序号
        menuOrderNum2 二级菜单排序号
        menuOrderNum3 三级菜单排序号
            menuImg 菜单图标-->
            <el-form-item label="描述">
              <el-input
                v-model="menu.description"
                :autosize="{ minRows: 2, maxRows: 4}"
                type="textarea"
                placeholder="请输入角色描述"
              />
            </el-form-item>
          </el-form>
        </el-card>
        <el-tooltip placement="top" content="返回顶部">
          <back-to-top :custom-style="myBackToTopStyle" :visibility-height="100" :back-position="0" transition-name="fade" />
        </el-tooltip>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import waves from "@/directive/waves"; // waves directive
import { parseTime } from "@/utils";
// import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import { mapActions, mapState } from "vuex";
import { deepClone } from "@/utils";
import { searchSelector, treeMenu, insert, update, deletor } from "@/api/system/menu";
import BackToTop from '@/components/BackToTop'

const defaultMenu = {
  id: "",
  code: "",
  menuUrl: "",
  menuImg: "",
  menuLevel: "",
  name: "",
  description: "",
  parentId: "0",
  component: "",
  redirect: "",
  hidden: "0",
  createDate: "",
  createUser: "",
  updateUser: ""
};

export default {
  name: "Menu",
  components: {
    BackToTop
  },
  directives: { waves },
  data() {
    const validateMenu = (rule, value, callback) => {
      if (!value) {
        callback(new Error("Name不能为空！"));
      } else {
        callback();
      }
    };
    const requiredMenu = (rule, value, callback) => {
      if (this.menu.menuLevel == "" && !value)
        callback(new Error("路由地址不能为空！"));
      else {
        callback();
      }
    };
    return {
      myBackToTopStyle: {
        right: "50px",
        bottom: "50px",
        width: "40px",
        height: "40px",
        "z-index": 10000,
        "border-radius": "4px",
        "line-height": "45px", // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
        background: "#e7eaf1" // 按钮的背景颜色 The background color of the button
      },
      menu: Object.assign({}, validateMenu),
      rules: {
        menuUrl: [
          {
            type: "url",
            trigger: "blur",
            validator: requiredMenu,
            message: "菜单地址必填或输入不正确"
          }
        ],
        redirect: [{ trigger: "blur", message: "重定向地址输入不正确" }],
        name: [{ required: true, trigger: "blur", message: "请输入菜单名称" }],
        parentId: [{ required: true, message: "请选择上级菜单" }]
      },
      propers: {},
      listLoading: false,
      searchSelectorItem: [],
      dialogType: "new",
      treeData: []
    };
  },
  computed: {},
  created() {
    this.initTree();
  },
  methods: {
    initTree() {
      treeMenu({}).then(res => {
        //  debugger;
        this.treeData = res;
        // if (this.treeData.length) {
        //   this.menu = this.treeData[0];
        // }
      });
      this.handleSearchSelector("", this.menu.id);
    },

    handleEdit(scope) {
      this.dialogType = "edit";
      if (scope.data != null) this.menu = deepClone(scope.data);
      else this.handleCreate(0);
    },
    handleCheckChange(scope) {
      this.dialogType = "edit";
      this.menu = deepClone(scope.data);
      // this.handleSearchSelector('',this.menu.id);
    },
    handleDelete() {
      this.$confirm("此操作将永久删除该菜单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deletor({ id: this.menu.id }).then(res => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.initTree();
          });
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleCreate(scope) {
      var pid = scope == 0 ? "0" : this.menu.id || "0";
      this.menu = Object.assign({}, defaultMenu);
      this.menu.parentId = pid;
      this.dialogType = "new";
      this.handleSearchSelector("");
      console.log("新增", this.menu);
    },
    handleCurrentChange(val) {
      console.log(val);
    },

    handleSearchSelector(item, id) {
      searchSelector({ name: item, id: id }).then(res => {
        this.searchSelectorItem = res;
      });
    },
    async confirmDomain() {
      this.$refs["menuForm"].validate(valid => {
        if (valid) {
          this.listLoading = true;
          // let { id, name, code, description } = this.menu;
          if (this.dialogType === "new") {
            insert(this.menu)
              .then(() => {
                this.$message.success("新增成功！");
                this.initTree();
                this.listLoading = false;
              })
              .catch(() => {
                this.listLoading = false;
              });
          } else {
            console.log(this.menu);
            update(this.menu)
              .then(() => {
                this.$message.success("修改成功！");
                this.initTree();
                this.listLoading = false;
              })
              .catch(() => {
                this.listLoading = false;
                this.$message.error("修改失败！");
              });
          }
        } else {
          console.log("提交错误!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>