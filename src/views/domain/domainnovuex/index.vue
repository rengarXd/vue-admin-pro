<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="searchData" class="filter-item">
        <el-form-item label="域编号">
          <el-input v-model="searchData.code" placeholder="请输入Code查询"></el-input>
        </el-form-item>
        <el-form-item label="域名称">
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
      @click="handleRoleSet"
      name="设置角色"
    />
    <el-table
      ref="multipleRoleTable"
      :data="gridData"
      highlight-current-row
      @current-change="handleCurrentChange"
    >
      <el-table-column property="name" label="域名称">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column property="code" label="域编号">
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
      <!-- <el-table-column
        v-for="(value,name) in propers"
        :key="name"
        :property="name"
        :label="name"
      >
        <template slot-scope="scope">{{ scope.row[name] }}</template>
      </el-table-column>-->
      <el-table-column align="center" width="100" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
          <!-- <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button> -->
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
        ref="domainForm"
        :rules="rules"
        :model="role"
        label-width="80px"
        label-position="left"
      >
        <el-form-item label="域Code">
          <el-input v-model="role.code" name="code" placeholder="请输入域Code" />
        </el-form-item>
        <el-form-item label="域名称">
          <el-input v-model="role.name" name="name" placeholder="请输入域名称" />
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
        <el-button type="primary" @click="confirmDomain">确认</el-button>
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogRoleVisible" title="设置角色">
      <el-table
        ref="multipleRoleTable"
        :data="allRoles"
        tooltip-effect="dark"
        style="width: 100%  "
        row-key="id"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="名称" prop="name" width="120">
          <!-- {{ scope.row.name }} -->
        </el-table-column>
        <el-table-column prop="code" label="Code" width="120"></el-table-column>
        <el-table-column prop="createDate" label="创建时间">
          <template slot-scope="scope">{{ scope.row.createDate }}</template>
        </el-table-column>
      </el-table>
      <div style="text-align:right;padding:20px 0;">
        <el-button type="primary" @click="confirmDomainRole">确认</el-button>
        <el-button type="danger" @click="dialogRoleVisible=false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from "@/directive/waves"; // waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import { deepClone } from "@/utils";
import * as api from "@/api/domain/domain";
import {
  searchSelector,
  getDomainRoles,
  setDomainRoles
} from "@/api/domain/domainrole";
import { debuglog } from "util";
import { constants } from "crypto";

const defaultDomain = {
  id: "",
  code: "",
  name: "",
  description: ""
};
const defaultNameId = {
  name: "",
  id: ""
};
const defaultDomainRoles = {
  id: "",
  roles: [] //Object.assign([],defaultNameId)
};

export default {
  name: "Domain",
  components: { Pagination },
  directives: { waves },
  data() {
    const validateDomain = (rule, value, callback) => {
      if (!value) {
        callback(new Error("Code或Name不能为空！"));
      } else {
        callback();
      }
    };
    return {
      role: Object.assign({}, defaultDomain),
      rules: {
        code: [{ required: true, trigger: "blur", validator: validateDomain }],
        name: [{ required: true, trigger: "blur", validator: validateDomain }]
      },
      searchData: {
        code: "",
        name: ""
      },
      propers: {},
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id"
      },
      dialogRoleVisible: false,
      dialogVisible: false,
      dialogType: "new",
      domainRole: Object.assign({}, defaultDomainRoles),
      gridData: [],
      allRoles: [],
      total: 0
    };
  },
  created() {
    this.initList().then(res => {
      // console.log()
      if (this.gridData.length) {
        this.propers = this.gridData[0];
      }
    });
  },
  mounted() {
    this.getAllRoles();
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
    async getRoles(roleId) {
      let res = await getDomainRoles({ id: roleId });
      if (res) return res;
    },
    async getAllRoles() {
      let res = await searchSelector({});
      this.allRoles = res;
    },
    handlePageChange({ page, limit }) {
      this.listQuery.page = page;
      this.listQuery.limit = limit;
      this.initList();
    },
    handleEdit(scope) {
      this.dialogType = "edit";
      this.dialogVisible = true;
    },
    handleCreate() {
      this.role = Object.assign({}, defaultDomain);
      this.dialogType = "new";
      this.dialogVisible = true;
      console.log("新增");
    },
    handleRoleSet() {
      if (!this.role.id) {
        this.$message.warning("请选择域信息");
        return;
      }
      if (this.allRoles.length == 0) {
        this.getAllRoles();
      }
      this.domainRole = Object.assign({}, defaultDomainRoles);
      this.domainRole.roles = [];
      this.domainRole.id = this.role.id;
      var checkRows = [];
      if (this.role.id) {
        getDomainRoles({ id: this.role.id }).then(res => {
          let checkeds = res;
          if (checkeds.length) {
            for (let i = 0; i < checkeds.length; i++) {
              // this.domainRole.roles.push(checkeds[i].id);
              this.allRoles.forEach(ro => {
                if (ro.id == checkeds[i].roleId) checkRows.push(ro);
                // if (this.$refs.multipleRoleTable)
                // this.$refs.multipleRoleTable.toggleRowSelection(ro);
              });
            }
          }
          if (this.$refs.multipleRoleTable) {
            this.$refs.multipleRoleTable.clearSelection();
            checkRows.forEach(ii => {
              this.$refs.multipleRoleTable.toggleRowSelection(ii);
            });
          }
        });
      }
      // console.log(this);
      // console.log(checkeds);

      this.dialogRoleVisible = true;
      console.log("设置角色");
    },
    handleCurrentChange(val) {
      console.log(val);
      this.role = deepClone(val);
    },
    handleSearch() {
      this.listLoading = true;
      this.initList(this.searchData.code, this.searchData.name);
    },
    handleSelectionChange(val) {
      this.domainRole.roles = [];
      if (val && val.length) {
        for (let i = 0; i < val.length; i++) {
          this.domainRole.roles.push(val[i].id);
        }
      }
    },
    setChecked(row, index) {
      console.log(row);
      if (this.domainRole.roles.indexOf(row.id) > -1) {
        return true;
      }
      return false;
    },
    async confirmDomain() {
      this.$refs.domainForm.validate(valid => {
        if (valid) {
          this.listLoading = true;
          let { id, name, code, description } = this.role;
          if (this.dialogType === "new") {
            api
              .insert({ id, name, code, description })
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
    },
    async confirmDomainRole() {
      setDomainRoles(this.domainRole)
        .then(res => {
          this.$message.success("设置成功！");
          this.dialogRoleVisible = false;
          this.domainRole = Object.assign({}, defaultDomainRoles);
        })
        .catch(() => {
          this.listLoading = false;
          this.dialogRoleVisible = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>