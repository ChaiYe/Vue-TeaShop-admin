<template>
  <div>
    <div>
      <el-dialog :title="this.dialogStatus == 'create' ?'添加':'修改'"  :visible.sync="this.display.dialogFormVisible" :show-close="false" >
        <el-form :model="this.record" :label-position="right" label-width="120px">
          <el-form-item label="权限资源名称" verify style="width: 60%">
            <el-input v-model="this.record.permissionName" ></el-input>
          </el-form-item>
          <el-form-item label="权限资源URL" verify style="width: 60%">
            <el-input v-model="this.record.url" ></el-input>
          </el-form-item>
          <el-form-item label="父菜单" verify  style="width: 60%">
            <el-input v-model="this.record.pid" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="display.dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" v-if="dialogStatus=='create'" >创建</el-button>
          <el-button type="primary" v-else @click="updateslide">修改</el-button>
        </div>
      </el-dialog>
      </div>
    <div>
      <el-row class="main">

        <el-table :data="data" border height="250" ref="teaTaste">
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="permissionName" label="权限名称"></el-table-column>
          <el-table-column prop="url" label="连接"></el-table-column>
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
       record:{
         permissionName:'',
         url:'',
         pid:'',
         pidValue:'',
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

      /*显示编辑*/
      showEdit(index,row){
        this.record.permissionName=row.permissionName;
        this.record.url=row.url;
        this.record.pidValue=row.pid;
        this.dialogStatus = "update";
        this.display.dialogFormVisible = true;
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
      createRecord(){
        this.$http.post(this.HOST+"sys/role/add",this.add).then((response)=>{
          this.request();
          this.display.dialogFormVisible = false;
        }).catch((error)=>{

        });
      },

      /*提交请求*/
      request() {
        this.listLoading = true;
        this.$http.get(this.HOST + "/sys/permission/list", {
            params:this.pageInfo
          }
        ).then((response) => {
          console.log(response);
          this.data=response.data.list;
        }).catch((error)=>{

        })
      },


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
