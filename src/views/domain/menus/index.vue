<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="searchData" class="filter-item">
        <!-- <el-form-item label="Code">
          <el-input v-model="searchData.code" placeholder="请输入Code查询"></el-input>
        </el-form-item>-->
        <el-form-item label="Name">
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
          ></el-button>
        </el-form-item>
        <el-form-item>
          <Button
            v-waves
            type="primary"
            icon="el-icon-edit"
            class="filter-item"
            style="margin-left: 10px;"
            @click="handleCreate"
            name="新增"
          />
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="gridData" highlight-current-row @current-change="handleCurrentChange">
      <el-table-column property="name" label="名称">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column property="code" label="编号">
        <template slot-scope="scope">{{ scope.row.code }}</template>
      </el-table-column>
      <el-table-column property="menuImg" label="图标">
        <template slot-scope="scope">{{ scope.row.menuImg }}</template>
      </el-table-column>
      <el-table-column property="menuLevel" label="等级">
        <template slot-scope="scope">{{ scope.row.menuLevel }}</template>
      </el-table-column>
      <el-table-column property="menuUrl" label="地址">
        <template slot-scope="scope">{{ scope.row.menuUrl }}</template>
      </el-table-column>
      <!-- <el-table-column property="name" label="名称">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
       <el-table-column property="name" label="名称">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
       <el-table-column property="name" label="名称">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
       <el-table-column property="name" label="名称">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
       <el-table-column property="name" label="名称">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>-->
      <el-table-column align="center" width="160" label="操作">
        <template slot-scope="scope">
          <el-row>
            <el-button type="primary" size="mini" @click="handleEdit(scope)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope)">删除</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑菜单':'新增菜单'">
      <el-form
        style="padding:20px;"
        ref="domainForm"
        :rules="rules"
        :model="menu"
        label-width="100px"
        label-position="left"
      >
        <el-form-item label="上级菜单">
          <el-select v-model="menu.parentId" filterable reserve-keyword placeholder="请输入关键词">
            <!-- remote
            :remote-method="handleSearchSelector"-->
            <el-option
              v-for="item in searchSelectorItem"
              :key="item.id"
              :label="item.menuImg+item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单路由地址">
          <el-input v-model="menu.menuUrl" name="menuUrl" placeholder="请输入菜单路由地址" />
        </el-form-item>
        <el-form-item label="菜单名称">
          <el-input v-model="menu.name" name="name" placeholder="请输入菜单名称" />
        </el-form-item>
        <el-form-item label="菜单编号">
          <el-input v-model="menu.code" name="code" placeholder="请输入菜单编号" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="menu.description"
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
  </div>
</template>

<script>
import waves from "@/directive/waves"; // waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import { mapActions, mapState } from "vuex";
import { deepClone } from "@/utils";
import { searchSelector, insert, update, deletor, treeMenu } from "@/api/system/menu";

const defaultMenu = {
  id: "",
  code: "",
  menuUrl: "",
  menuImg: "",
  menuLevel: "",
  name: "",
  description: "",
  parentId: null,
  component: "",
  redirect: "",
  hidden: "",
  createDate: "",
  createUser: "",
  updateUser: ""
};

export default {
  name: "Menu",
  components: { Pagination },
  directives: { waves },
  data() {
    const validateMenu = (rule, value, callback) => {
      if (!value) {
        callback(new Error("Name不能为空！"));
      } else {
        callback();
      }
    };
    return {
      menu: Object.assign({}, validateMenu),
      rules: {
        code: [{ required: true, trigger: "blur", validator: validateMenu }],
        name: [{ required: true, trigger: "blur", validator: validateMenu }]
      },
      searchData: {
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
      searchSelectorItem: [],
      dialogVisible: false,
      dialogType: "new"
    };
  },
  computed: {
    ...mapState({
      total: state => state.menu.total,
      gridData: state => state.menu.Lists
    })
  },
  created() {
    this.initList().then(res => {
      if (this.gridData.length) {
        this.propers = this.gridData[0];
      }
    });
  },
  methods: {
    ...mapActions({
      getList: "menu/getLists"
    }),

    async initList(name) {
      await this.getList({
        page: this.listQuery.page,
        pageSize: this.listQuery.limit,
        name: name || ""
      });
    },
    async handlePage(val) {
      // console.log(val);
      this.listQuery["page"] = val;
    },

    handleEdit(scope) {
      this.dialogType = "edit";
      this.dialogVisible = true;

      this.menu = deepClone(scope.row);
      this.handleSearchSelector("", this.menu.id);
    },
    handleDelete(scope) {
      this.$confirm("此操作将永久删除该菜单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deletor({ id: scope.row.id }).then(res => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.initList(this.searchData.name);
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
    handleCreate() {
      this.menu = Object.assign({}, defaultMenu);
      this.dialogType = "new";
      this.dialogVisible = true;
      this.handleSearchSelector("");
      console.log("新增");
    },
    handleCurrentChange(val) {
      console.log(val);
    },
    handleSearch({ name } = this.searchData) {
      console.log(this.searchData);
      this.initList(name);
    },
    handleSearchSelector(item, id) {
      console.log(item);
      searchSelector({ name: item, id: id }).then(res => {
        this.searchSelectorItem = res;
      });
    },

    async confirmDomain() {
      this.$refs.domainForm.validate(valid => {
        if (valid) {
          this.listLoading = true;
          let { id, name, code, description } = this.menu;
          if (this.dialogType === "new") {
            insert(this.menu)
              .then(() => {
                this.$message.success("新增成功！");
                this.initList();
                this.listLoading = false;
                this.dialogVisible = false;
              })
              .catch(() => {
                this.listLoading = false;
                this.dialogVisible = false;
              });
          } else {
            update({ id, name, code, description })
              .then(() => {
                this.$message.success("修改成功！");
                this.initList();
                this.listLoading = false;
                this.dialogVisible = false;
              })
              .catch(() => {
                this.listLoading = false;
                this.dialogVisible = false;
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