<template>
  <div>
    <div>

      <el-row class="main">

        <el-table :data="data" border height="250" ref="teaTaste">
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="roleName" label="角色"></el-table-column>
          <el-table-column prop="roleDesc" label="描述"></el-table-column>
          <el-table-column label="操作">

            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="showEdit(scope.$index, scope.row)">编辑权限</el-button>
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
        data:[],
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
        //let number = Number(row.id);

        this.$http.post(this.HOST+"/sys/permission/findPermissionByRole",{
          roleId:row.id
        }).then((response)=>{
          console.log(row.id);
          console.log(response);
        }).catch((error)=>{

          })
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



      /*提交请求*/
      request() {
        this.listLoading = true;
        this.$http.get(this.HOST + "/sys/role/list", {
            params:this.pageInfo
          }
        ).then((response) => {
          console.log(response);
          this.data=response.data.list;
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
