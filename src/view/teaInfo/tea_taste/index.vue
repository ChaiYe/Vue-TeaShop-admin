<template>
  <div>
    <el-dialog :title="this.dialogStatus == 'create' ?'添加':'修改'"  :visible.sync="this.display.dialogFormVisible">
      <el-form :model="add">
        <el-form-item label="名称" verify >
          <el-input v-model="add.name" style="width: 30%"></el-input>
        </el-form-item>
        <el-form-item label="类型" verify >
          <el-radio  v-model="add.type" label="1" v-bind:checked="add.type==1?true:false">茶叶</el-radio>
          <el-radio  v-model="add.type" label="2" v-bind:checked="add.type==2?true:false">茶器</el-radio>
        </el-form-item>
        <el-form-item label="排序" verify >
          <el-input-number v-model="add.sortNum"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="display.dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" v-if="dialogStatus=='create'" @click="createTeaTaste">创建</el-button>
        <el-button type="primary" v-else @click="updateTeaTaste">修改</el-button>
      </div>
    </el-dialog>
    <div>

      <el-row class="header">
        <el-col :span="22" >
          <el-form :inline="true" :model="pageInfo" >
            <el-form-item>
              <el-input v-model="pageInfo.name" placeholder="名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="showCreate">添加</el-button>
        </el-col>
      </el-row>
      <el-row class="main">

        <el-table :data="teaTaste" border height="500" ref="teaTaste">
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="type" label="类型" :formatter="(row,column)=>{ return row.type==1? '茶叶':'茶具'}"></el-table-column>
          <el-table-column  prop="modifiyTime" :formatter="dateFormat" label="编辑时间"></el-table-column>
          <el-table-column  label="编辑人">
            <template slot-scope="scope" v-if="scope.row.admin!=null">
            <el-popover trigger="hover" placement="top">
              <p>账号: {{ scope.row.admin.account }}</p>
              <p>姓名: {{ scope.row.admin.name }}</p>
              <p>昵称: {{ scope.row.admin.nickname }}</p>
              <p>性别: {{ scope.row.admin.gender==1?'男':'女' }}</p>
              <p>类型: {{ scope.row.admin.type==0?'超级管理员':'普通管理员' }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.admin.name }}</el-tag>
              </div>
            </el-popover>
          </template>
          </el-table-column>
          <el-table-column prop="sortNum" label="排序号"></el-table-column>
          <el-table-column label="操作">

              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="showEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>

          </el-table-column>
        </el-table>

        <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfo.currentPage"
          :page-sizes="pageSizesList"
          :page-size="pageInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
        </div>
      </el-row>
    </div>
  </div>

</template>

<script>
  import { dateFormat } from '@/utils/formatUtils'

  export default {
    name: "index",
    data() {
      return {
        /*页面数据*/
        teaTaste:[],
        pageInfo:{
          /*查询条件*/
            name:null,
          /*分页信息*/
            currentPage: 1,
            pageSize: 10,
        },

        /*记录总条数*/
        total: 0,
        pageSizesList: [10, 15, 20, 30, 50],
        /*添加*/
        add:{
          id:null,
          name:'',
          type:'',
          sortNum:''
        },

        /*控制弹窗显示*/
        display:{
          dialogTableVisible: false,
          dialogFormVisible: false,
        },

        /*控制弹窗是添加还是修改*/
        dialogStatus: 'create',

        /*数据加载等待动画*/
        listLoading: false,
      }
    },
    methods: {
      /*提交查询条件*/
      onSubmit(){
        this.request();
      },
      /*页面数据大小发生改变*/
      handleSizeChange(val) {
        this.pageInfo.pageSize = val;
        this.request();
      },
      /*当前页面数字发生改变*/
      handleCurrentChange(val) {
        this.pageInfo.currentPage = val;
        this.request();
      },

      /*删除*/
      handleDelete(index, row){
        console.log(row);
        console.log(index);
        this.$confirm('确定删除此口味?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(this.HOST+"sys/teaTaste/delete",row).then((response)=>{
              console.log(this.teaTaste);
              console.log(index);
              this.teaTaste.splice(index,1);
          }).catch((error)=>{
              alert("删除失败");
          });
        }).catch((error)=>{
          alert("已取消删除");
        });
      },

      /*显示添加*/
      showCreate(){
        this.add.id=null;
        this.add.name="";
        this.add.sortNum="";
        this.add.type="";
        this.dialogStatus = "create"
        this.display.dialogFormVisible = true;
      },

      /*显示编辑*/
      showEdit(index,row){
        this.add.id=row.id;
        this.add.name=row.name;
        this.add.sortNum=row.sortNum;
        this.add.type=row.type;
        this.dialogStatus = "update"
        this.display.dialogFormVisible = true;
        console.log(this.add.type);
      },

      /*提交修改*/
      updateTeaTaste(){
        this.$http.post(this.HOST+"sys/teaTaste/update",this.add).then((response)=>{
          this.request();
          this.display.dialogFormVisible = false;
        }).catch((error)=>{
          console.log("添加失败");
        });
      },

      /*添加*/
      createTeaTaste(){
        this.$http.post(this.HOST+"sys/teaTaste/add",this.add).then((response)=>{
          this.request();
          this.display.dialogFormVisible = false;
        }).catch((error)=>{

        });
      },

      /*提交请求*/
      request() {
        this.listLoading = true;
        this.$http.get(this.HOST + "/sys/teaTaste/list", {
              params:this.pageInfo
          }
        ).then((response) => {
          console.log(response);
          this.teaTaste= response.data.list;
          this.total=response.data.total;
        }).catch((error)=>{

        })
      },

      dateFormat,

    },
    mounted() {
      this.request()
    }
  }
</script>

<style scoped lang="scss">
  $boxShadow: 1px 1px 4px lightgray;
  $marginBottom: 8px 16px 24px;
  $marginTop: 8px 16px 24px;
  $padding: 24px 12px;

  [v-cloak] {
    display: none;
  }

  .header {
    padding: $padding;
    margin-bottom: nth($marginBottom, 2);
    box-shadow: $boxShadow;
  }


  .main {
    box-shadow: $boxShadow;
    padding: $padding;
    .head_portrait{
      height: 50px;
      width: 50px;
      border-radius: 50%;
    }
  }

  .pagination {
    margin-top: nth($marginTop, 2);
    margin-bottom: nth($marginBottom, 2);
  }


</style>
