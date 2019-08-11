<template>
  <el-tabs v-model="activeTab" type="border-card" @tab-click="handleCheckChange">
    <el-tab-pane label="机构类型" name="type" lazy>
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
                :data="treeOrgTypeData"
                node-key="id"
                accordion
                default-expand-all
                @node-click="handleEdit"
                :expand-on-click-node="false"
              ></el-tree>
            </el-card>
          </el-col>
          <el-col :span="13">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>{{dialogType==='edit'?'编辑机构类型':'新增机构类型'}}</span>
                <el-button style="float: right; " type="primary" @click="confirmDomain">保存</el-button>
              </div>
              <el-form
                style="padding:20px;"
                status-icon
                ref="OrgTypeForm"
                :rules="orgTyperules"
                :model="OrgType"
                label-width="120px"
                label-position="left"
              >
                <el-form-item label="上级机构类型">
                  <el-input disabled="disabled" v-model="OrgType.parentName" name="parentName" />
                </el-form-item>
                <el-form-item label="机构类型编号">
                  <el-input v-model="OrgType.code" name="code" disabled placeholder="请输入机构编号" />
                </el-form-item>
                <el-form-item label="机构类型名称" prop="name">
                  <el-input v-model="OrgType.name" name="name" placeholder="请输入机构类型名称" />
                </el-form-item>
                <el-form-item label="备注" prop="description">
                  <el-input
                    v-model="OrgType.description"
                    name="description"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    type="textarea"
                    placeholder="请输入备注"
                  />
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-tab-pane>
    <el-tab-pane label="机构管理" name="org" lazy>
      <div class="app-container">
        <el-row :gutter="20">
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
              ></el-tree>
            </el-card>
          </el-col>
          <el-col :span="10">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>{{dialogType==='edit'?'编辑机构':'新增机构'}}</span>
                <el-button style="float: right; " type="primary" @click="confirmDomain">保存</el-button>
              </div>
              <el-form
                style="padding:20px;"
                status-icon
                ref="OrgForm"
                :rules="rules"
                :model="Org"
                label-width="120px"
                label-position="left"
              >
                <el-form-item label="上级机构" prop="parentName">
                  <el-input name="parentName" v-model="Org.parentName" disabled />
                </el-form-item>
                <el-form-item label="机构编号">
                  <el-input v-model="Org.code" name="code" disabled placeholder="请输入机构编号" />
                </el-form-item>
                <el-form-item label="机构所在地区" prop="fullIds">
                  <el-cascader
                    v-model="Org.fullIds"
                    @change="handlecascaderChange"
                    :props="{value:'id'}"
                    :options="areaData"
                    clearable
                  ></el-cascader>
                </el-form-item>
                <el-form-item label="机构名称" prop="name">
                  <el-input v-model="Org.name" name="name" placeholder="请输入机构名称" />
                </el-form-item>
                <el-form-item label="部门详细地址" prop="detailAddr">
                  <el-input
                    v-model="Org.detailAddr"
                    name="detailAddr"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    @change="detailAddrChange"
                    type="textarea"
                    placeholder="请输入部门详细地址"
                  />
                </el-form-item>
                <el-form-item label="部门全地址" prop="fullAddr">
                  <el-input
                    v-model="Org.fullAddr"
                    name="fullAddr"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    type="textarea"
                    placeholder="部门全地址"
                  />
                </el-form-item>
                <el-form-item label="机构是否隐藏">
                  <el-switch v-model="Org.status"></el-switch>
                  <!-- <el-checkbox border  v-model="Org.hidden"  size="medium" label="机构是否隐藏"></el-checkbox> -->
                </el-form-item>
                <el-form-item label="备注">
                  <el-input
                    v-model="Org.remark"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    type="textarea"
                    placeholder="请输入备注"
                  />
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import waves from "@/directive/waves"; // waves directive
import { parseTime } from "@/utils";
// import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import { mapActions, mapState } from "vuex";
import { deepClone } from "@/utils";
import * as api from "@/api/system/org";
import { constants } from "crypto";

const defaultOrg = {
  id: "",
  domainId: "",
  code: "",
  parentId: "",
  idPath: "",
  name: "",
  provinceId: "",
  cityId: "",
  districtId: "",
  detailAddr: "",
  fullAddr: "",
  faxNum: "",
  status: "",
  remark: "",
  createUser: "",
  createDate: "",
  updateUser: "",
  updateDate: ""
};
const defaultOrgType = {
  id: "",
  domainId: "",
  code: "",
  parentId: "",
  idPath: "",
  name: "",
  description: "",
  createUser: "",
  createDate: "",
  updateUser: "",
  updateDate: ""
};

export default {
  name: "Org",
  components: {},
  directives: { waves },
  data() {
    const validateOrg = (rule, value, callback) => {
      if (!value) {
        callback(new Error("Name不能为空！"));
      } else {
        callback();
      }
    };
    return {
      Org: Object.assign({}, defaultOrg),
      OrgType: Object.assign({}, defaultOrgType),
      rules: {
        name: [{ required: true, trigger: "blur", message: "请输入机构名称" }],
        parentId: [{ required: true, message: "请选择上级机构" }]
      },
      orgTyperules: {
        name: [
          { required: true, trigger: "blur", message: "请输入机构类型名称" }
        ]
      },
      propers: {},
      listLoading: false,
      searchSelectorItem: [],
      dialogType: "new",
      activeTab: "type",
      treeData: [],
      treeOrgTypeData: [],
      areaData: []
    };
  },
  computed: {},
  created() {
    this.initTree();
  },
  methods: {
    initTree() {
      if (this.activeTab == "org") {
        api.treeOrg({}).then(res => {
          this.treeData = res[0].children;
        });
        // this.handleSearchSelector("", this.Org.id);
        if (this.areaData && this.areaData.length == 0) {
          api.areaTrees({}).then(res => {
            if (res) {
              this.areaData = this.setAreaChildren(res[0].children);
            }
          });
        }
      } else if (this.activeTab == "type") {
        this.areaData = [];
        api.treeOrgtypes({}).then(res => {
          if (res) this.treeOrgTypeData = res.children;
        });
      }
    },
    setAreaChildren(arr) {
      let nr = [];
      arr.forEach(cr => {
        if (cr.children.length > 0) {
          nr.push({
            label: cr.label,
            id: cr.id,
            children: this.setAreaChildren(cr.children)
          });
        } else {
          nr.push({
            label: cr.label,
            id: cr.id
          });
        }
      });
      return nr;
    },
    getAreaName(arr,id, level) {
      let name = "";
      arr.forEach(ir => {
        if (level == 0) {
          if (ir.id == id) {
            name = ir.label;
            return;
          }
        }else if(ir.children&&ir.children.length>0)
            name=this.getAreaName(ir.children,id,level-1);
      });
      return name;
    },

    handleEdit(scope) {
      this.dialogType = "edit";
      if (this.activeTab == "org") {
        this.Org = deepClone(scope.data);
        this.setFullIds();
      }
      else if (this.activeTab == "type") {
        this.OrgType = deepClone(scope.data);
      } else this.handleCreate(0);
    },
    handleCheckChange(tab, event) {
      if (tab.name == "type") {
      } else if (tab.name == "org") {
      }
      this.initTree();
    },
    handleDelete() {
      this.$confirm(
        "此操作将永久删除该" +
          (this.activeTab == "type" ? "机构类型" : "机构") +
          ", 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          if (this.activeTab == "org") {
            api.deletor({ id: this.Org.id }).then(res => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.initTree();
            });
          } else {
            api.deleteOrgType({ id: this.OrgType.id }).then(res => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.initTree();
            });
          }
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
      debugger;
      if (this.activeTab == "org") {
        let pid = scope == 0 ? "0" : this.Org.id || "0";
        let pname = scope == 0 ? "" : this.Org.name || "";
        this.Org = Object.assign({}, defaultOrg);
        this.Org.parentId = pid;
        this.Org.parentName = pname;
        // this.handleSearchSelector("");
      } else {
        let pid = scope == 0 ? "0" : this.OrgType.id || "0";
        let pname = scope == 0 ? "" : this.OrgType.name || "";
        this.OrgType = Object.assign({}, defaultOrgType);
        this.OrgType.parentId = pid;
        this.OrgType.parentName = pname;
      }
      this.dialogType = "new";
    },
    handlecascaderChange(val, e) {
      if (val && val.length > 0) {
        this.Org.provinceId = val[0];
        this.Org.cityId = val.length > 1 ? val[1] : "";
        this.Org.districtId = val.length > 2 ? val[2] : "";
        this.setFullAddr(val);
      }
    },
    setFullIds(){
        this.Org.fullIds=[];
        if(this.Org.provinceId)
        {
          this.Org.fullIds.push(this.Org.provinceId);
          if(this.Org.cityId)
            {
              this.Org.fullIds.push(this.Org.cityId);
              if(this.Org.districtId)
              this.Org.fullIds.push(this.Org.districtId);
            }
        }
    },
    setFullAddr(val){
      if (val && val.length > 0){
        let fulladdr=this.getAreaName(this.areaData,val[0],0);
        if(val.length > 1)
        fulladdr+=(this.getAreaName(this.areaData,val[1],1));
        if(val.length > 2)
        fulladdr+=(this.getAreaName(this.areaData,val[2],2));
        this.Org.fullAddr=fulladdr;
        }
    },
    detailAddrChange(val){
      this.setFullIds();
      this.setFullAddr(this.Org.fullIds);
      this.Org.fullAddr+=val;
    },
    // handleSearchSelector(item, id) {
    //   api.searchSelector({ name: item, id: id }).then(res => {
    //     this.searchSelectorItem = res;
    //   });
    // },
    async confirmDomain() {
      if (this.activeTab == "org") {
        this.$refs["OrgForm"].validate(valid => {
          if (valid) {
            this.listLoading = true;
            // let { id, name, code, description } = this.Org;
            if (this.dialogType === "new") {
              api
                .insert(this.Org)
                .then((res) => {
                  this.Org.id = res.id;
                  this.$message.success("新增成功！");
                  this.initTree();
                  this.listLoading = false;
                  this.dialogType = "edit";
                })
                .catch(() => {
                  this.listLoading = false;
                });
            } else {
              api
                .update(this.Org)
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
      } else {
        this.$refs["OrgTypeForm"].validate(valid => {
          if (valid) {
            this.listLoading = true;
            // let { id, name, code, description } = this.Org;
            if (this.dialogType === "new") {
              api
                .insertOrgType(this.OrgType)
                .then(res => {
                  this.OrgType.id = res.id;
                  this.$message.success("新增成功！");
                  this.initTree();
                  this.listLoading = false;
                  this.dialogType = "edit";
                })
                .catch(() => {
                  this.listLoading = false;
                });
            } else {
              api
                .updateOrgType(this.OrgType)
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
  }
};
</script>

<style lang="scss" scoped>
.border-card{
  padding: 20px;
}
</style>