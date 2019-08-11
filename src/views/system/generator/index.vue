<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="searchData" class="filter-item">
        <el-form-item label="表名称">
          <el-input v-model="searchData.tableName" placeholder="请输入表名称查询"></el-input>
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

      <!-- <Button
        v-waves
        type="primary"
        icon="el-icon-plus"
        class="filter-item"
        style="margin-left: 10px;"
        @click="handleCreate"
        name="生成"
      /> -->
      <Butthon v-waves type="primary" icon="el-icon-" />
      <el-table :data="gridData"  ref="multipleTable"
       tooltip-effect="dark"
        style="width: 100%"
       highlight-current-row >
        <el-table-column
      type="selection"
      width="55">
    </el-table-column>
        <el-table-column property="tableName" label="表名">
          <!-- <template slot-scope="scope">{{ scope.row.code }}</template> -->
        </el-table-column>
        <el-table-column property="engine" label="engine">
          <!-- <template slot-scope="scope">{{ scope.row.name }}</template> -->
        </el-table-column>
        <el-table-column property="tableComment" label="备注">
          <!-- <template slot-scope="scope">{{ scope.row.mobile }}</template> -->
        </el-table-column>
        
        <el-table-column property="createTime" label="更新日期" :formatter="dateFormat">
        </el-table-column>
        <el-table-column align="center" width="250" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope)" type="primary" size="small">生成</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog :visible.sync="dialogVisible" 
      :close-on-press-escape="false" title="生成">
        <el-form
          class="demo-ruleForm"
          style="padding:20px;"
          ref="generatorForm"
          :model="generator"
          label-width="80px"
          label-position="left"
        >
          <el-form-item label="表名称">
            <el-input v-model="generator.tableName" disabled name="tableName" placeholder="请输入表名称" />
          </el-form-item>
          <el-form-item label="文件包名">
            <el-input v-model="generator.packageName"  name="packageName" placeholder="请输入文件包名" />
          </el-form-item>
          <el-form-item label="作者">
            <el-input v-model="generator.author"  name="author" placeholder="请输入作者" />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="generator.email"  name="email" placeholder="请输入邮箱" />
          </el-form-item>
          <el-form-item label="项目名称">
            <el-input v-model="generator.moduleName"  name="moduleName" placeholder="请输入项目名称" />
          </el-form-item>
          <el-form-item label="api接口地址">
            <el-input v-model="generator.resfulPath"  name="resfulPath" placeholder="请输入接口地址，只需尾缀Control定义路由" />
          </el-form-item>
          <el-form-item label="字符过滤">
            <el-input v-model="generator.tablePrefix"  name="tablePrefix" placeholder="请输入字符过滤" />
          </el-form-item>
        </el-form>
        <div style="text-align:right;">
          <el-button type="primary" @click="confirmGenerator">确认</el-button>
          <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import waves from "@/directive/waves"; // waves directive
import { parseTime } from "@/utils";
import { deepClone } from "@/utils";
import * as api from "@/api/generator";
const defaultgenerator = {
  tables: [],
  packageName: "com.tc.tip.training.courses",
  author: "yayun.jiang",
  email: "yayun.jiang@techcreate.net",
  moduleName:"tip-admin",
  resfulPath:"",
  tableName:"",
  tablePrefix:"sys_"
};
export default {
  name: "generator",
  directives: { waves },
  data() {
    return {
      generator: Object.assign({}, defaultgenerator),
      listLoading: false,
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
        tableName: ""
      },
      dialogVisible: false,
      gridData: []
    };
  },
  created() {
    this.initList().then(res => {
      if (this.gridData.length) {
      }
    });
  },
  methods: {
    async initList(name) {
      let res = await api.getLists({
        page: this.listQuery.page,
        pageSize: this.listQuery.limit,
        tableName: name || ""
      });
        this.gridData=res;
      this.listLoading = false;
    },
    
    handleSearch() {
      this.listLoading = true;
      this.initList(this.searchData.name);
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
    //   this.generator=Object.assign({}, defaultgenerator);
      this.generator.tables.push(scope.row.tableName);
      this.generator.tableName=scope.row.tableName;
    },
   
   
    //时间格式化
      dateFormat(row, column, cellValue, index){
          const daterc = row[column.property]
          if(daterc!=null)
          return daterc.substr(0,10);
        return "";
       
      },
    async confirmGenerator() {
      this.$refs.generatorForm.validate(valid => {
        if (valid) {
          this.listLoading = true;
          api
              .generatorCode(this.generator)
              .then(res => {
                this.$message.success("生成成功！文件地址："+res);
                console.log(res);
                this.dialogVisible = false;
              })
              .catch(() => {
                this.listLoading = false;
                // this.dialogVisible = false;
              });
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