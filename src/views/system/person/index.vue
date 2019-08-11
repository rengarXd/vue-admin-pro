<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="searchData" class="filter-item">
        <el-form-item label="代码">
          <el-input v-model="searchData.code" placeholder="请输入代码查询"></el-input>
        </el-form-item>
        <el-form-item label="人员名称">
          <el-input v-model="searchData.name" placeholder="请输入名称查询"></el-input>
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

      <Button
        v-waves
        type="primary"
        icon="el-icon-plus"
        class="filter-item"
        style="margin-left: 10px;"
        @click="handleCreate"
        name="新增"
      />
      <Butthon v-waves type="primary" icon="el-icon-" />
      <el-table :data="gridData" highlight-current-row @current-change="handleCurrentChange">
        <el-table-column property="code" label="代码">
          <!-- <template slot-scope="scope">{{ scope.row.code }}</template> -->
        </el-table-column>
        <el-table-column property="name" label="名称">
          <!-- <template slot-scope="scope">{{ scope.row.name }}</template> -->
        </el-table-column>
        <el-table-column property="mobile" label="手机">
          <!-- <template slot-scope="scope">{{ scope.row.mobile }}</template> -->
        </el-table-column>
        <el-table-column property="email" label="邮箱">
          <!-- <template slot-scope="scope">{{ scope.row.email }}</template> -->
        </el-table-column>
        <el-table-column property="idcard" label="证件号" >
          <!-- <template slot-scope="scope">{{ scope.row.idcard }}</template> -->
        </el-table-column>
        <el-table-column property="birthday" label="生日" :formatter="dateFormat">
          <!-- <template slot-scope="scope">{{ scope.row.birthday }}</template> -->
        </el-table-column>
        <el-table-column property="gender" label="性别">
          <template
            slot-scope="scope"
          >{{ scope.row.gender=="F"?"男":(scope.row.gender=="M"?"女":"") }}</template>
        </el-table-column>
        <el-table-column property="address" label="地址">
          <!-- <template slot-scope="scope">{{ scope.row.address }}</template> -->
        </el-table-column>
        <el-table-column property="updateDate" label="更新日期" :formatter="dateFormat">
          <!-- <template slot-scope="scope">{{ scope.row.updateDate }}</template> -->
        </el-table-column>
        <el-table-column align="center" width="250" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope)" type="primary" size="small">编辑</el-button>
            <el-button @click="handleDelete(scope)" type="danger" size="small">删除</el-button>
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

      <el-dialog :visible.sync="dialogVisible" :close-on-press-escape="false" :title="dialogType==='edit'?'编辑人员':'新增人员'">
        <el-form
          class="demo-ruleForm"
          style="padding:20px;"
          ref="personForm"
          :rules="rules"
          :model="person"
          label-width="80px"
          label-position="left"
        >
          <el-form-item label="代码">
            <el-input v-model="person.code" disabled name="code" placeholder="请输入代码" />
          </el-form-item>
          <el-form-item label="机构" required prop="organizationId">
            <el-select
              v-model="person.organizationId"
              filterable style="width:100%"
              remote
              reserve-keyword
              placeholder="请选择机构"
              :remote-method="searchOrg"
              :loading="orgloading"
              size="medium"
            >
              <el-option
                v-for="item in orgselector"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="名称" required prop="name">
            <el-input v-model="person.name" name="name" placeholder="请输入名称" />
          </el-form-item>
          <el-form-item label="登陆账户" required prop="userAccountName">
            <el-input v-model="person.userAccountName" name="userAccountName" placeholder="请输入登陆账户" />
          </el-form-item>
          
          <el-form-item label="职位" prop="positionId">
            <el-select  style="width:100%"
              v-model="person.positionId"
              filterable
              remote
              reserve-keyword
              :remote-method="searchPosition"
              :loading="positionloading"
              placeholder="职位"
              size="medium"
            >
              <el-option
                v-for="item in positionselector"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="手机" prop="mobile">
            <el-input v-model="person.mobile" name="mobile" placeholder="请输入手机" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="person.email" name="email" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="证件号" prop="idcard">
            <el-input v-model="person.idcard" name="idcard" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <!-- <el-radio-group v-model="person.gender">
              <el-radio-button label="男"></el-radio-button>
              <el-radio-button label="女"></el-radio-button>
            </el-radio-group>-->
            <el-switch
              v-model="person.gender"
              active-text="男"
              active-value="F"
              inactive-text="女"
              inactive-value="M"
            ></el-switch>
          </el-form-item>
          <el-form-item label="生日" prop="birthday">
            <el-date-picker
              style="width:100%"
              v-model="person.birthday"
              type="date"
              name="birthday"
              :picker-options="pickerOptions"
              placeholder="请选择生日"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="地址" prop="address">
              <el-input  style="width:100%"
                v-model="person.address"
                name="address"
                placeholder="请输入地址"
                :autosize="{ minRows: 2, maxRows: 4}"
                type="textarea"
              />
          </el-form-item>
        </el-form>
        <div style="text-align:right;">
          <el-button type="primary" @click="confirmPerson">确认</el-button>
          <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import waves from "@/directive/waves"; // waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
// import { mapActions, mapState } from "vuex";
import { deepClone } from "@/utils";
import { searchSelector as orgSearch } from "@/api/system/org";
import { positionselector as positionSearch } from "@/api/system/position";
import * as api from "@/api/system/person";
const defaultperson = {
  id: "",
  domainId: "",
  code: "",
  name: "",
  organizationId: "",
  positionId: "",
  mobile: "",
  email: "",
  idcard: "",
  birthday: "",
  gender: "",
  address: "",
  deleteFlg: "",
  createUser: "",
  createDate: "",
  updateUser: "",
  updateDate: "",
  userAccountName:""
};
export default {
  name: "person",
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      person: Object.assign({}, defaultperson),
      listLoading: false,
      rules: {},
      propers: {},
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id"
      },
      searchData: {
        name: "",
        code: ""
      },
      dialogType: "edit",
      dialogVisible: false,
      orgloading: false,
      positionloading: false,
      total: 0,
      gridData: [],
      orgselector: [],
      positionselector: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
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
    async initList(name) {
      let res = await api.getLists({
        page: this.listQuery.page,
        pageSize: this.listQuery.limit,
        name: name || ""
      });
      console.log(res);
      this.total = Number(res.total);
      this.gridData = res.items;
      this.listLoading = false;
    },
    searchOrg(query) {
      this.orgloading = true;
      orgSearch({ name: query }).then(res => {
        this.orgloading = false;
        this.orgselector = res;
      });
    },
    searchPosition(query) {
      this.positionloading = true;
      positionSearch({ name: query }).then(res => {
        this.positionloading = false;
        this.positionselector = res;
      });
    },
    handleSearch() {
      this.listLoading = true;
      this.initList(this.searchData.name, this.searchData.code);
    },
    initGender(r) {
      console.log(r);
      return r;
    },
    handlePageChange({ page, limit }) {
      this.listQuery.page = page;
      this.listQuery.limit = limit;
      this.initList();
    },
    handleCurrentChange(val) {
      console.log(val);
    },
    handleEdit(scope) {
      this.dialogType = "edit";
      this.dialogVisible = true;
      this.person = deepClone(scope.row);
    },
    handleDelete(scope) {
      this.$confirm("此操作将永久删除该菜单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          api.deletor({ id: scope.row.id }).then(res =>
            this.$message({
              type: "success",
              message: "删除成功!",
              onClose:()=>this.initList()
            })
            
          );
          
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleCreate() {
      this.person = Object.assign({}, this.defaultperson);
      this.dialogType = "new";
      this.dialogVisible = true;
      //console.log("新增");
    },
    //时间格式化
      dateFormat(row, column, cellValue, index){
          const daterc = row[column.property]
          if(daterc!=null)
          return daterc.substr(0,10);
return "";
        //   if(daterc!=null){
        //     const dateMat= new Date(parseInt(daterc.replace("/Date(", "").replace(")/", ""), 10));
        //    const year = dateMat.getFullYear();
        //   let month = dateMat.getMonth() + 1;
        //   month=month<10?"0"+month:month;
        //   let day = dateMat.getDate();
        //   day=day<10?"0"+day:day;
          
        // //   const hh = dateMat.getHours();
        // //   const mm = dateMat.getMinutes();
        // //   const ss = dateMat.getSeconds();
        //   const timeFormat= year + "-" + month + "-" + day ;
        //   return timeFormat;
        //   }
           
      },
    async confirmPerson() {
      this.$refs.personForm.validate(valid => {
        if (valid) {
          this.listLoading = true;
          if (this.dialogType === "new") {
            api
              .insert(this.person)
              .then(res => {
                this.$message.success("新增成功！");
                this.person.id = res.id;
                this.initList();
                this.dialogVisible = false;
              })
              .catch(() => {
                this.listLoading = false;
                // this.dialogVisible = false;
              });
          } else {
            api
              .update(this.person)
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