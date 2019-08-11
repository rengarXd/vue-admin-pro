<template>
  <div class="app-container">
    <Search :page="page"></Search>
    <div class="filter-container">
      <el-button type="primary" icon="el-icon-plus" @click="handleCreate">新增</el-button>
      <el-button type="primary" icon="el-icon-tickets" @click="handleResetpw">重置密码</el-button>
      <el-button type="primary" icon="el-icon-edit-outline" @click="hanldeRole">角色分配</el-button>
      <el-button-group style="float:right">
        <el-button icon="el-icon-refresh" :loading="loading" @click="refresh"></el-button>
        <!-- <el-button :type="isMulti?'primary':''" icon="el-icon-document" @click="isMulti = !isMulti"></el-button> -->
      </el-button-group>
    </div>
    <el-dialog v-el-drag-dialog :visible.sync="visible" @close="handleComplete" :title="dialogType">
      <Add v-if="dialogType==='新增用户'" @submit="refresh" @complete="handleComplete" />
      <Edit
        v-if="dialogType==='编辑用户'"
        :userinfo="currentUserInfo"
        @submit="refresh"
        @complete="handleComplete"
      />
      <Resetpw
        v-if="dialogType==='重置密码'"
        :account="currentUserInfo.userAccount"
        @complete="handleComplete"
      />
      <Role v-if="dialogType==='角色分配'" :userId="currentUserInfo.id" @complete="handleComplete" />
    </el-dialog>
    <List
      :gridData="gridData"
      :isMulti="isMulti"
      @currentselect="handleSelect"
      @edit="handleEdit"
      @delet="handleDelete"
    />
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="page.page"
      :limit.sync="page.pageSize"
      @pagination="getLists"
    />
  </div>
</template>

<script>
import { del } from "@/api/system/usermanager";
import { parseTime } from "@/utils";
import { mapGetters, mapActions, mapState } from "vuex";
import elDragDialog from "@/directive/el-drag-dialog"; // base on element-ui
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import { Add, Search, Edit, Resetpw, List, Role } from "./component";

export default {
  name: "usermanager",
  components: { Pagination, Add, Search, Edit, Resetpw, List, Role },
  directives: { elDragDialog },
  data() {
    return {
      currentUserInfo: {},
      page: {
        page: 1,
        pageSize: 20
      },
      visible: false,
      dialogType: "",
      isMulti: false,
      loading: false
    };
  },
  computed: {
    ...mapState({
      total: state => state.usermanager.total,
      gridData: state => state.usermanager.Lists
    })
  },
  created() {
    this.getLists();
  },
  methods: {
    ...mapActions({
      listAction: "usermanager/getLists"
    }),

    getLists(pag) {
      let page = {};
      if (pag) {
        page.page = pag.page;
        page.pageSize = pag.limit;
        this.page = page;
      }
      return this.listAction(this.page);
    },
    handleCreate() {
      this.handleComplete();
      this.$nextTick(function() {
        this.dialogType = "新增用户";
        this.visible = true;
      });
      // console.log("新增");
    },
    handleEdit(val) {
      this.currentUserInfo = val;
      this.handleComplete();
      this.$nextTick(function() {
        this.dialogType = "编辑用户";
        this.visible = true;
      });
    },
    handleDelete(val) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await del(val.id);
        // console.log(res);
        this.$message.success("删除成功!");
        this.getLists();
      });
    },
    handleResetpw() {
      if (!this.currentUserInfo.id)
        return this.$message.warning("请选择一个用户");
      this.handleComplete();
      this.$nextTick(function() {
        this.dialogType = "重置密码";
        this.visible = true;
      });
    },
    hanldeRole() {
      if (!this.currentUserInfo.id)
        return this.$message.warning("请选择一个用户");
      this.handleComplete();
      this.$nextTick(function() {
        this.dialogType = "角色分配";
        this.visible = true;
      });
    },
    handleComplete() {
      if (this.visible) this.visible = false;
      if (this.dialogType) this.dialogType = "";
    },
    handleSelect(val) {
      // console.log(val);
      this.currentUserInfo = val;
    },
    refresh() {
      this.page = {
        page: 1,
        pageSize: 20
      };
      this.loading = true;
      this.getLists().then(() => setTimeout(() => (this.loading = false), 500));
    }
  }
};
</script>
<style lang="scss" scoped>
.filter-container {
  margin-bottom: 10px;
}
</style>
