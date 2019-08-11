<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="searchData" class="filter-item">
        <el-form-item label="编号">
          <el-input v-model="searchData.code" placeholder="请输入Code查询"></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="searchData.name" placeholder="请输入Name查询"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            v-waves
            type="primary"
            icon="el-icon-search"
            class="filter-item"
            style="margin-left: 10px;"
            @click="handleSearch"
            :loading="listLoading"
          >搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <Button
      v-waves
      type="primary"
      icon="el-icon-edit"
      class="filter-item"
      style="margin-left: 10px;"
      @click="handleCreate"
      name="新增"
    />
    <Button
      v-waves
      type="primary"
      icon="el-icon-edit"
      class="filter-item"
      style="margin-left: 10px;"
      @click="handleEditMenus"
      name="设置菜单"
    />
    <el-table :data="gridData" highlight-current-row @current-change="handleCurrentChange">
      <el-table-column property="name" label="名称">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column property="code" label="code">
        <template slot-scope="scope">{{ scope.row.code }}</template>
      </el-table-column>
      <el-table-column property="createUser" label="创建人">
        <template slot-scope="scope">{{ scope.row.createUser }}</template>
      </el-table-column>
      <el-table-column property="createDate" label="创建时间">
        <template slot-scope="scope">{{ scope.row.createDate }}</template>
      </el-table-column>
      <el-table-column property="description" label="描述">
        <template slot-scope="scope">{{ scope.row.description }}</template>
      </el-table-column>
      <el-table-column property="updateUser" label="更新人">
        <template slot-scope="scope">{{ scope.row.createDate }}</template>
      </el-table-column>
      <el-table-column property="updateDate" label="更新时间">
        <template slot-scope="scope">{{ scope.row.updateDate }}</template>
      </el-table-column>

      <el-table-column align="center" width="100" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="handlePageChange"
    />
    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑角色':'新增角色'">
      <el-form
        style="padding:20px;"
        ref="RoleForm"
        :rules="rules"
        :model="role"
        label-width="80px"
        label-position="left"
      >
        <el-form-item label="角色Code">
          <el-input v-model="role.code" disabled="disabled" name="code" placeholder="请输入角色Code" />
        </el-form-item>
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="role.name" name="name" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item v-if="role.id!=''" label="所属域" prop="domainId">
          <el-select v-model="role.domainId" disabled placeholder="请输入关键词">
            <el-option
              v-for="item in searchSelectorItem"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="role.description"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="请输入角色描述"
          />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="primary" @click="confirmRole">确认</el-button>
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogMenusVisible" title="设置菜单">
      <!-- <div slot="header" class="clearfix">
        <span>菜单列表</span>
        <el-button style="float: right; " type="primary" @click="handSaveRoleMenu">保存</el-button>
      </div>-->
      <el-tree
        ref="menuTree"
        :data="treeData"
        node-key="id"
        accordion
        show-checkbox
        default-expand-all
        @node-click="treeClick"
        :expand-on-click-node="false"
      ></el-tree>
      <div style="text-align:right;">
        <el-button type="primary" @click="handSaveRoleMenu">确认</el-button>
        <el-button type="danger" @click="dialogMenusVisible=false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from "@/directive/waves"; // waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
// import { mapActions, mapState } from "vuex";
import { deepClone } from "@/utils";
import * as api from "@/api/system/role";
import { searchSelector } from "@/api/domain/domainrole";
import { domainTreeMenu as treeMenu } from "@/api/system/menu";
import { async } from "q";

const defaultRole = {
  id: "",
  code: "",
  domainId: "",
  name: "",
  description: ""
};

export default {
  name: "role",
  components: { Pagination },
  directives: { waves },
  data() {
    const validateRole = (rule, value, callback) => {
      if (!value) {
        callback(new Error("Code或Name不能为空！"));
      } else {
        callback();
      }
    };
    return {
      role: Object.assign({}, defaultRole),
      rules: {
        name: [{ required: true, trigger: "blur", validator: validateRole }],
        domainId: [{ required: true, trigger: "blur", message: "所属域必填" }]
      },
      searchData: {
        code: "",
        name: ""
      },
      activeName: "roles",
      propers: {},
      searchSelectorItem: [],
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id"
      },
      dialogVisible: false,
      dialogMenusVisible: false,
      dialogType: "new",
      selectRoleId: "",
      gridData: [],
      tableData: [],
      treeData: [],
      currentRow: {},
      total: 0
    };
  },
  created() {
    this.initList().then(res => {
      if (this.gridData.length) {
        this.propers = this.gridData[0];
      }
    });
  },
  methods: {
    async initList(code, name) {
      let res = await api.getLists({
        page: this.listQuery.page,
        pageSize: this.listQuery.limit,
        code: code || "",
        name: name || ""
      });
      //   console.log(res);
      this.total = Number(res.total);
      this.gridData = res.items;
      this.listLoading = false;
    },

    setCurrRows(val) {
      if (!val) return;
      this.currentRow = val;
      // this.$refs.singleTable.setCurrentRow(val);
      this.selectRoleId = this.currentRow.id;
    },
    getDomains() {
      searchSelector({}).then(res => (this.searchSelectorItem = res));
    },
    treeClick(node) {},
    handlePageChange({ page, limit }) {
      this.listQuery.page = page;
      this.listQuery.limit = limit;
      this.initList();
    },
    handleEdit(scope) {
      this.dialogType = "edit";
      this.dialogVisible = true;
      this.getDomains();
      this.role = deepClone(scope.row);
    },
    handleCreate() {
      this.getDomains();
      this.role = Object.assign({}, defaultRole);
      console.log(this.role);
      this.dialogType = "new";
      this.dialogVisible = true;

      console.log("新增");
    },
    handleEditMenus() {
      if ((!this.selectRoleId) || this.selectRoleId == 0) {
        this.$message.warning("请选择角色");
        return;
      }
      treeMenu({}).then(res => {
        this.treeData = res;
      });
      if(this.selectRoleId)
        this.setRoleMenuTreeChecked(this.selectRoleId);
      this.dialogMenusVisible = true;
    },
    setRoleMenuTreeChecked(id) {
      api.getRoleMenus({ id: id }).then(res => {
        if (res) {
          this.$refs.menuTree.setCheckedKeys(res.menuIds);
        }
      });
    },
    handleCurrentChange(val) {
      //   console.log(val);
      this.setCurrRows(val);
      // this.setRoleMenuTreeChecked(val.id);
    },
    handleSearch() {
      this.listLoading = true;
      this.initList(this.searchData.code, this.searchData.name);
    },
    async handSaveRoleMenu() {
      if (!this.selectRoleId || this.selectRoleId == 0) {
        this.$message.warning("请选择角色");
        return;
      }
      let menuIds = this.$refs.menuTree.getCheckedKeys();
      api
        .setRoleMenus({ id: this.selectRoleId, menuIds: menuIds })
        .then(res => {
          this.$message.success("保存成功！");
          this.dialogMenusVisible = false;
        });
    },

    async confirmRole() {
      this.$refs.RoleForm.validate(valid => {
        if (valid) {
          this.listLoading = true;
          let { id, name, code, domainId, description } = this.role;
          if (this.dialogType === "new") {
            api
              .insert({ id, name, code, domainId, description })
              .then(() => {
                this.$message.success("新增成功！");
                this.initList();
                this.dialogVisible = false;
              })
              .catch(() => {
                this.listLoading = false;
                this.dialogVisible = false;
              });
          } else {
            api
              .update({ id, name, code, description })
              .then(() => {
                this.$message.success("修改成功！");
                this.initList();
                this.dialogVisible = false;
              })
              .catch(() => {
                this.listLoading = false;
                this.dialogVisible = false;
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