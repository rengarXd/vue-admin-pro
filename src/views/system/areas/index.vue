<template>
 <el-container>
  <el-aside width="50%">
    <el-table
      ref="singleTable"
      :data="provinceData"
      highlight-current-row
      @current-change="provincehandleCurrentChange"
      style="width: 100%">
      <el-table-column property="code" label="编号" width="120">
          <template slot-scope="scope">{{ scope.row.code }}</template>
      </el-table-column>
      <el-table-column property="name" label="区域名称" width="120">
         <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column property="parentId" label="上级id" width="120" >
         <template slot-scope="scope">{{ scope.row.parentId }}</template>
      </el-table-column>
      <el-table-column property="areasType" label="区域类型" width="120" >
         <template slot-scope="scope">{{areasTypeformatter(scope.row.areasType) }}</template>
      </el-table-column>
      <el-table-column align="center" width="250" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope)" type="text" size="small">编辑</el-button>
            <el-button  @click="handleDelete(scope)" type="text" size="small">删除</el-button>
          </template>
      </el-table-column>
      </el-table>
        <el-pagination
        v-show="provincetotal>0"
        :total="provincetotal"
        :page.sync="provincelistQuery.page"
        :limit.sync="provincelistQuery.limit"
        @pagination="provincehandlePageChange"
        />
        </el-pagination>
   </el-aside>
  <el-main width="50%" >
   <el-table
      ref="singleTable"
      :data="cityData"
      highlight-current-row
      @current-change="cityhandleCurrentChange"
      style="width: 100%">
      <el-table-column property="code" label="编号" width="120">
          <template slot-scope="scope">{{ scope.row.code }}</template>
      </el-table-column>
      <el-table-column property="name" label="区域名称" width="120">
         <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column property="parentId" label="上级id" width="120" >
         <template slot-scope="scope">{{ scope.row.parentId }}</template>
      </el-table-column>
      <el-table-column property="areasType" label="区域类型" width="120" >
         <template slot-scope="scope">{{areasTypeformatter(scope.row.areasType) }}</template>
      </el-table-column>
      <el-table-column align="center" width="250" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope)" type="text" size="small">编辑</el-button>
            <el-button  @click="handleDelete(scope)" type="text" size="small">删除</el-button>
          </template>
      </el-table-column>
   </el-table>
      <el-pagination
            v-show="citytotal>0"
            :total="citytotal"
            :page.sync="citylistQuery.page"
            :limit.sync="citylistQuery.limit"
            @pagination="cityhandlePageChange"
        />
      </el-pagination>

    <el-table
      ref="singleTable"
      :data="districtData"
      highlight-current-row
      style="width: 100%">
      <el-table-column property="code" label="编号" width="120">
          <template slot-scope="scope">{{ scope.row.code }}</template>
      </el-table-column>
      <el-table-column property="name" label="区域名称" width="120">
         <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column property="parentId" label="上级id" width="120">
         <template slot-scope="scope">{{ scope.row.parentId }}</template>
      </el-table-column>
      <el-table-column property="areasType" label="区域类型" width="120">
         <template slot-scope="scope">{{areasTypeformatter(scope.row.areasType) }}</template>
      </el-table-column>
      <el-table-column align="center" width="250" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope)" type="text" size="small">编辑</el-button>
            <el-button  @click="handleDelete(scope)" type="text" size="small">删除</el-button>
          </template>
      </el-table-column>
    </el-table>
      <el-pagination
        v-show="districttotal>0"
        :total="districttotal"
        :page.sync="districtlistQuery.page"
        :limit.sync="districtlistQuery.limit"
        @pagination="districthandlePageChange"
      />
      </el-pagination>
   <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑地理信息':'新增地理信息'">
        <el-form
          style="padding:20px;"
          ref="areasForm"
          :rules="rules"
          :model="areas"
          label-width="80px"
          label-position="left"
        >
        <el-form-item label="code">
            <el-input v-model="areas.code" :disabled="true">
            </el-input>
        </el-form-item>
        <el-form-item label="类别">
            <el-input v-model="areas.areasType" :disabled="true">
            </el-input>
        </el-form-item>
        <el-form-item label="父id">
            <el-input v-model="areas.parentId" :disabled="true">
            </el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="areas.name" name="name" placeholder="请输入名称" />
        </el-form-item>
        </el-form>
        <div style="text-align:right;">
          <el-button type="primary" @click="confirmareas">确认</el-button>
          <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        </div>
      </el-dialog>
  </el-main>
</el-container>
</template>
<script>
import waves from "@/directive/waves"; // waves directive
import { parseTime } from "@/utils";
//import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
// import { mapActions, mapState } from "vuex";
import { deepClone } from "@/utils";
// import { getLists, insert, update } from "@/api/domain/domain";
import * as api from "@/api/system/areas";
import { constants } from 'crypto';
const defaultareas = {
      name:"",
      id:"",
      areasType:"",
      parentId:"",
      code:"",
}
export default {
    name:"areas",
    //components: { Pagination },
    directives: { waves },
    data() {
      return {
        rules:{},
        areas: Object.assign({}, defaultareas),
        dialogType: "new",
        dialogVisible: false,
        provincelistQuery: {
          page: 1,
          limit: 20,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: "+id"
        },
        citylistQuery:{
          page: 1,
          limit: 20,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: "+id"
        },
         districtlistQuery:{
          page: 1,
          limit: 20,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: "+id"
        },
        areastype:"",
        parentid:"",
        provinceData: [],
        cityData:[],
        districtData:[],
        provincetotal: 0,
        citytotal:0,
        districttotal:0,
      }
    },
    created() {
      this.initList()
    },
    methods: {
     async initList(code,id,areasType,PageChange) {
        switch(areasType){
          case 1 :{
            if(PageChange==true){
              let provinceID=await this.getprovinceData("","","")[0].id
              let cityData=await this.getcityData(code, provinceID,2)
              console.log("市信息"+cityData)
              await this.getdistrictData(code,cityData[0].id,3)
            }else{
              let cityData=await this.getcityData(code, id,2)
              console.log("市信息"+cityData)
              await this.getdistrictData(code,cityData[0].id,3)
            }
        
            break;
          }
          case 2 :{
            if(PageChange==true){
               let  cityID= this.getcityData("","","")[0].id
               this.getdistrictData(code,cityID,3) 
            }else
            {
              this.getdistrictData(code,id,3)  
            }
            break;
          }
          case 3:{
            this.getdistrictData("","","");
            breask;
          }
          default :{
            let provinceData  = await this.getprovinceData("","",1)
            let cityData= await this.getcityData("", provinceData[0].id,2)
            this.getdistrictData("",cityData[0].id,3)
          }
        }
      },
      async getprovinceData(code,id,areasType){
        let res =await api.getLists({
            page: this.provincelistQuery.page,
            pageSize: this.provincelistQuery.limit,
            code:code||"",
            parentId:String(id)||"",
            areasType:String(areasType) ||"",
          });
          this.provincetotal = Number(res.total);
          this.provinceData = res.items;
          return res.items;
      },
      async getcityData(code,id,areasType){
        let res =await api.getLists({
            page: this.citylistQuery.page,
            pageSize: this.citylistQuery.limit,
            code:code||"",
            parentId:String(id)||"",
            areasType:String(areasType) ||"",
          });
          this.citytotal = Number(res.total);
          this.cityData = res.items;
          return res.items
      },
      async getdistrictData(code,id,areasType){
        let res = await api.getLists({
            page: this.districtlistQuery.page,
            pageSize: this.districtlistQuery.limit,
            code:code||"",
            parentId:String(id)||"",
            areasType:String(areasType) ||"",
          });
          this.districttotal = Number(res.total);
          this.districtData = res.items;
          return res.items
      },
      setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row);
     
      },
      //省级别选中事件
      provincehandleCurrentChange(val) {
        this.initList("",val.id,1)
      },
      //市级别选中事件
      cityhandleCurrentChange(val){
         this.initList("",val.id,2)
      },
      provincehandlePageChange(page, limit ){
        this.provincelistQuery.page = page;
        this.provincelistQuery.limit = limit;
  
        this.initList("","",1)
      },
      cityhandlePageChange(page,limit){
        this.citylistQuery.page = page;
        this.citylistQuery.limit = limit;
        this.initList("","",2)
      },
      districthandlePageChange(page,limit){
        this.districtlistQuery.page = page;
        this.districtlistQuery.limit = limit;
        this.getdistrictData("","",3)
      },
      handleEdit(scope){
        this.dialogType = "edit";
        this.dialogVisible = true;
        this.areas = deepClone(scope.row);
      },
      refreshPage(){
        switch(this.areastype){
            case '1':{
             this.getprovinceData("","",this.areastype);
             break;
            }
            case '2':{
              this.getcityData("",this.parentid,this.areastype);
              break;
            }
            case '3':{
              this.getdistrictData("",this.parentid,this.areastype);
              break;
            }
          }
      },
      areasTypeformatter(item){
      return item == 1 ? "省" : item == 2 ? "市" : "区/县";
    },
      confirmareas(){
this.$refs.areasForm.validate(valid => {
        if (valid) {
          let { id, name,areasType,parentId,code} = this.areas;
          if (this.dialogType === "new") {
            api.insert({id, name ,areasType,parentId,code})
              .then(() => {
               
                this.$message.success("新增成功！");
                this.initList();
                this.dialogVisible = false;
              })
              .catch(() => {
                this.dialogVisible = false;
              });
          } else {
            this.areastype=areasType
            this.parentid=parentId
            api.update({ id, name ,areasType,parentId,code})
              .then((r) => {
                this.$message.success("修改成功！");
                this.refreshPage();
                this.dialogVisible = false;
              })
              .catch(() => {
                this.dialogVisible = false;
              });
          }
        } else {
          console.log("提交错误!!");
          return false;
        }
      });
      },
    }
  }
</Script>
<style>

</style>