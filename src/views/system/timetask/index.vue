<template>
  <div class="app-container">
  <div class="filter-container">
    <el-form :inline="true" :model="searchData" class="filter-item">
      <el-form-item label="任务名称">
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

      <Button
        v-waves
        type="primary"
        icon="el-icon-plus"
        class="filter-item"
        style="margin-left: 10px;"
        @click="handleCreate"
        name="新增"
      />
      <el-table :data="gridData" highlight-current-row @current-change="handleCurrentChange">
        <!-- <el-table-column property="ID" label="ID" v-if="hideRow">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column> -->
        <el-table-column property="name" label="名称">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column property="schedule" label="调度模式">
          <template slot-scope="scope">{{ scope.row.schedule }}</template>
        </el-table-column>
          <el-table-column property="taskCode" label="taskCode">
          <template slot-scope="scope">{{ scope.row.taskCode }}</template>
        </el-table-column>
        <el-table-column property="scheduleDesc" label="调度模式说明">
          <template slot-scope="scope">{{ scope.row.scheduleDesc }}</template>
        </el-table-column>
        <el-table-column property="description" label="任务状态">
          <template slot-scope="scope">{{ scope.row.taskStatus }}</template>
        </el-table-column>
        <el-table-column property="lastExecuteResult" label="上次执行结果">
          <template slot-scope="scope">{{ scope.row.lastExecuteResult }}</template>
        </el-table-column>
        <el-table-column property="lastExecuteTime" label="上次执行时间">
          <template slot-scope="scope">{{ scope.row.lastExecuteTime }}</template>
        </el-table-column>
          <el-table-column property="lastExecuteElapsed" label="上次执行耗时">
          <template slot-scope="scope">{{ scope.row.lastExecuteElapsed }}</template>
        </el-table-column>
        <el-table-column property="classPath" label="任务类路径">
          <template slot-scope="scope">{{ scope.row.classPath }}</template>
        </el-table-column>
        <el-table-column property="method" label="执行方法">
          <template slot-scope="scope">{{ scope.row.method }}</template>
        </el-table-column>
        <el-table-column property="description" label="任务描述">
          <template slot-scope="scope">{{ scope.row.description }}</template>
        </el-table-column>
          <el-table-column property="lastErrorDesc" label="上次异常描述">
          <template slot-scope="scope">{{ scope.row.lastErrorDesc }}</template>
        </el-table-column>
        <el-table-column align="center" width="250" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope)" type="text" size="small">编辑</el-button>
            <el-button  @click="handleDelete(scope)" type="text" size="small">删除</el-button>
            <el-button  @click="handleEdit(scope)" type="text" size="small">暂停</el-button>
            <el-button  @click="handleEdit(scope)" type="text" size="small">恢复</el-button>
            <el-button  @click="handleEdit(scope)" type="text" size="small">手工执行</el-button>
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

  <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑定时任务':'新增定时任务'">
        <el-form
          style="padding:20px;"
          ref="domainForm"
          :rules="rules"
          :model="timeTask"
          label-width="120px"
          label-position="left"
        >
          <el-form-item label="任务名称">
            <el-input v-model="timeTask.name" name="name" placeholder="请输入任务名称" />
          </el-form-item>
          <el-form-item label="执行类路径">
            <el-input v-model="timeTask.classpath" name="classpath" placeholder="请输入执行任务类路径"/>
          </el-form-item>
          <el-form-item label="执行方法">
            <el-input v-model="timeTask.method" name="method" placeholder="请输入执行方法"/>
          </el-form-item>
          <el-form-item label="任务调度方式">
            <el-input v-model="timeTask.schedule" name="schedule" placeholder="请输入任务调度方式"/>
          </el-form-item>
          <el-form-item label="调度方式说明">
            <el-input v-model="timeTask.scheduleDesc" name="scheduleDesc" placeholder="请输入调度方式说明"/>
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              v-model="timeTask.description"
              :autosize="{ minRows: 2, maxRows: 4}"
              type="textarea"
              placeholder="请输入定时任务描述"
            />
          </el-form-item>
        </el-form>
        <div style="text-align:right;">
          <el-button type="primary" @click="confirmTimeTask">确认</el-button>
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
// import { getLists, insert, update } from "@/api/domain/domain";
import * as api from "@/api/domain/timetask";

const defaultTaskTime = {
  id: "",
  taskCode: "",
  name: "",
	classPath: "",
	method:"",
  schedule:"",
  scheduleDesc:"",
  description:"",
};



export default {
  name:"TimeTask",
  components: { Pagination },
  directives: { waves },
  data() {
    return{
      rules:{},
			timeTask: Object.assign({}, defaultTaskTime),
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id"
      },
      searchData: {
        name: ""
      },
			dialogVisible: false,
			dialogType: "new",
			gridData: [],
      total: 0
    }
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
        name:name||""
      });
      console.log(res);
      this.total = Number(res.total);
      this.gridData = res.items;
      this.listLoading = false
    },
  handleSearch() {
      this.listLoading = true;
      this.initList(this.searchData.name);
    },
  handlePageChange({ page, limit }) {
    this.listQuery.page = page;
    this.listQuery.limit = limit;
    this.initList(this.searchData.name);
   },
  handleCurrentChange(val) {
      console.log(val);
    },
  handleEdit(scope) {
    this.dialogType = "edit";
    this.dialogVisible = true;
    this.timeTask = deepClone(scope.row);
   },
  handleDelete(scope){
   this.$confirm('此操作将永久删除该菜单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.deletor({timeTaskId:scope.row.id}).then(res=>this.$message({
             
            type: 'success',
            message: '删除成功!',
          })
          )
            this.initList(this.searchData.name)
        }
        ).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
  },
  handleCreate() {
    this.timeTask = Object.assign({}, defaultTaskTime);
    this.dialogType = "new";
    this.dialogVisible = true;
    //console.log("新增");
	 },
	   async confirmTimeTask() {
      this.$refs.domainForm.validate(valid => {
        if (valid) {
          this.listLoading = true;
          let { id, name,classPath,method,schedule, scheduleDesc,description } = this.timeTask;
          if (this.dialogType === "new") {
            api.insert({id, name,classPath,method,schedule, scheduleDesc,description })
              .then(() => {
                this.$message.success("新增成功！");
                this.initList(this.searchData.name);
                this.dialogVisible = false;
              })
              .catch(() => {
                this.listLoading = false;
                this.dialogVisible = false;
              });
          } else {
            api.update({ id, name,classPath,method,schedule, scheduleDesc,description })
              .then(() => {
                this.$message.success("修改成功！");
                this.initList(this.searchData.name);
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