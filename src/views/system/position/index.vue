<template>
<div class="app-container">
  <div class="filter-container">
    <el-form :inline="true" :model="searchData" class="filter-item">
      <el-form-item label="代码">
        <el-input v-model="searchData.code" placeholder="请输入代码查询"></el-input>
      </el-form-item>
      <el-form-item label="职位名称">
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
      <el-table :data="gridData" highlight-current-row @current-change="handleCurrentChange">
	    <!-- <el-table-column property="id" label="id" >
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column> -->
        <el-table-column property="code" label="代码" >
          <template slot-scope="scope">{{ scope.row.code }}</template>
        </el-table-column>
        <el-table-column property="name" label="名称">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column property="parentCode" label="上级职位代码">
          <template slot-scope="scope">{{ scope.row.parentCode }}</template>
        </el-table-column>
        <el-table-column property="parentName" label="上级职位名称">
          <template slot-scope="scope">{{ scope.row.parentName }}</template>
        </el-table-column>
        <el-table-column property="roleName" label="角色名称">
          <template slot-scope="scope">{{ scope.row.roleName }}</template>
        </el-table-column>
        <el-table-column property="description" label="描述">
          <template slot-scope="scope">{{ scope.row.description }}</template>
        </el-table-column>
        <el-table-column align="center" width="250" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope)" type="text" size="small">编辑</el-button>
            <el-button  @click="handleDelete(scope)" type="text" size="small">删除</el-button>
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

  <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑职位':'新增职位'">
        <el-form
          style="padding:20px;"
          ref="positionForm"
          :rules="rules"
          :model="position"
          label-width="80px"
          label-position="left"
        >
		<el-form-item label="请选择上级职位">
        <el-select v-model="position.parentId" placeholder="请选择上级职位">
          <el-option
            v-for="item in positionselector"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
				</el-form-item>
          <el-form-item label="代码">
            <el-input v-model="position.code" name="code" placeholder="请输入代码" />
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="position.name" name="name" placeholder="请输入名称"/>
          </el-form-item>
					<el-form-item label="默认角色">
					<el-select v-model="position.defaultRoleId" placeholder="默认角色">
						<el-option
							v-for="item in roleSelector"
							:key="item.id"
							:label="item.name"
							:value="item.id">
						</el-option>
						</el-select>
					</el-form-item>
          <el-form-item label="描述">
            <el-input
              v-model="position.description"
              :autosize="{ minRows: 2, maxRows: 4}"
              type="textarea"
              placeholder="请输入角色描述"
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
import * as api from "@/api/system/position";
const defaultPosition = {
  code: "",
  name: "",
	parentId: "",
	defaultRoleId:"",
  description:"",
};
export default {
		name:"position",
		components: { Pagination },
		directives: { waves },
    data() {
			return{
					position: Object.assign({}, defaultPosition),
					listLoading: false,
					rules:{},
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
					code:"",
					},
					total: 0,
					gridData: [],
					role:{},
					positionselector:[],
					roleSelector:[],
					dialogType: "new",
					dialogVisible: false,
				}
		},
	created() {
    this.initList().then(res => {
      if (this.gridData.length) {
        this.propers = this.gridData[0];
      }
    });
  },
		methods :{
		async initList(name,code) {
				let res = await api.getLists({
					page: this.listQuery.page,
					pageSize: this.listQuery.limit,
					name:name||"",
					code:code||"",
				});
				console.log(res);
				this.total = Number(res.total);
				this.gridData = res.items;
				this.listLoading = false
			},
		handleSearch() {
				this.listLoading = true;
				this.initList(this.searchData.name,this.searchData.code);
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
			this.getPositionSelector();
			this.dialogType = "edit";
			this.dialogVisible = true;
			this.position = deepClone(scope.row);
		},
		handleDelete(scope){
		this.$confirm('此操作将永久删除该菜单, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						api.deletor({positionId:scope.row.id}).then(res=>this.$message({
							type: 'success',
							message: '删除成功!',
						})
						)
						this.initList();
					}
					).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						});          
					});
		},
		async getPositionSelector(){
		    await api.positionSelector({}).then(r=>this.positionselector=r.options);
		},
		handleCreate() {
			this.getPositionSelector();
			this.position = Object.assign({}, defaultPosition);
			this.dialogType = "new";
			this.dialogVisible = true;
			//console.log("新增");
		},
			async confirmTimeTask() {
				this.$refs.positionForm.validate(valid => {
					if (valid) {
						this.listLoading = true;
						let { name, code,parentId,defaultRoleId,description } = this.position;
						if (this.dialogType === "new") {
							api.insert({name, code,parentId,defaultRoleId,description})
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
							api.update({ name, code,parentId,defaultRoleId,description })
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
}
</script>
<style lang="scss" scoped>
</style>