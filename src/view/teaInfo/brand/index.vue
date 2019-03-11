<template>
  <div>
    <el-dialog :title="this.dialogStatus == 'create' ?'添加':'修改'"  :visible.sync="this.display.dialogFormVisible">
      <el-form :model="add">
        <el-form-item label="名称" verify >
          <el-input v-model="add.name" style="width: 30%"></el-input>
        </el-form-item>
        <el-form-item label="类型" verify >
          <el-radio  v-model="add.type" label="1">茶叶</el-radio>
          <el-radio  v-model="add.type" label="2">茶器</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="display.dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" v-if="dialogStatus=='create'" @click="createbrand">创建</el-button>
        <el-button type="primary" v-else @click="updatebrand">修改</el-button>
      </div>
    </el-dialog>
    <div>

      <el-row class="header">
        <el-col :span="22" >
          <el-form :inline="true" :model="searchEntity" >
            <el-form-item>
              <el-input v-model="searchEntity.name" placeholder="名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="searchEntity.type" placeholder="请选择">
                <el-option label="茶叶" value="1"></el-option>
                <el-option label="茶具" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="search">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="showCreate">添加</el-button>
        </el-col>
      </el-row>
      <el-row class="main">

        <el-table :data="tableData" border :height="tableHeight" tooltip-effect="dark" ref="table" v-loading="loading" @selection-change="handleSelectionChange">
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="type" label="类型" :formatter="(row,column)=>{ return row.type==1? '茶叶':'茶具'}"></el-table-column>
          <el-table-column  prop="modifyTime" :formatter="dateFormat" label="编辑时间"></el-table-column>
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
          :current-page="currentPage"
          :page-sizes="pageSizesList"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount">
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
        tableData:[],
        searchEntity:{
          /*查询条件*/
            name:null,
            type:null,
        },
        /*当前页*/
        currentPage: 1,
        /*页面大小*/
        pageSize: 10,
        /*记录总条数*/
        totalCount: 0,
        /*页面可供选择的大小*/
        pageSizesList: [10, 15, 20, 30, 50],
        /*添加*/
        add:{
          id:null,
          name:'',
          type:''
        },

        /*控制弹窗显示*/
        display:{
          dialogTableVisible: false,
          dialogFormVisible: false,
        },

        multipleSelection: [],
        /*控制弹窗是添加还是修改*/
        dialogStatus: 'create',

        /*数据加载等待动画*/
        loading: false,
        /*设置table的高度*/
        tableHeight:500,
      }
    },
    methods: {
      handleSelectionChange(val) {
        console.log(val);
        this.multipleSelection = val;
      } ,

      /*页面数据大小发生改变*/
      handleSizeChange(val) {
        this.pageSize = val;
        this.search();
      },
      /*当前页面数字发生改变*/
      handleCurrentChange(val) {
        this.currentPage = val;
        this.search();
      },

      /*删除*/
      handleDelete(index, row){
        console.log(row.id);
        this.$confirm('确定删除此口味?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get(this.HOST+"sys/brand/delete?id="+row.id).then((response)=>{
            this.search();
          }).catch((error)=>{
              alert("删除失败");
          });
        });
      },

      /*显示添加*/
      showCreate(){
        this.add.id=null;
        this.add.name="";
        this.add.type="";
        this.dialogStatus = "create"
        this.display.dialogFormVisible = true;
      },

      /*显示编辑*/
      showEdit(index,row){
        this.add.id=row.id;
        this.add.name=row.name;
        this.add.type=row.type==1?'1':'2';
        this.dialogStatus = "update"
        this.display.dialogFormVisible = true;
        console.log(this.add.type);
      },

      /*提交修改*/
      updatebrand(){
        this.$http.post(this.HOST+"sys/brand/update",this.add).then((response)=>{
          this.search();
          this.display.dialogFormVisible = false;
        }).catch((error)=>{
          console.log("添加失败");
        });
      },

      /*添加*/
      createbrand(){
        this.$http.post(this.HOST+"sys/brand/add",this.add).then((response)=>{
          this.search();
          this.display.dialogFormVisible = false;
        }).catch((error)=>{

        });
      },

      /*提交请求*/
      search() {
        this.loading = true;
        this.$http.get(this.HOST + "/sys/brand/findByPage?currentPage="+this.currentPage+"&pageSize="+this.pageSize, {
              params:this.searchEntity
          }
        ).then((response) => {
          this.loading=false;
          this.tableData= response.data.rows;
          this.totalCount=response.data.totalCount;
        }).catch((error)=>{

        })
      },

      dateFormat,

    },
    mounted() {
      this.search()
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
