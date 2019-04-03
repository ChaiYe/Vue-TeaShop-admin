<template>
  <div>
    <el-dialog :title="this.dialogStatus == 'create' ?'添加':'修改'"  :visible.sync="this.display.dialogFormVisible" :show-close="false">
      <el-form :model="add" label-width="80px">
        <el-form-item label="名称" verify >
          <el-input v-model="add.name" style="width: 30%"></el-input>
        </el-form-item>
        <el-form-item label="上传图片" verify >
          <el-upload
            class="upload-demo"
            action="api/sys/upload"
            :before-upload="beforeAvatarUpload"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :file-list="fileList"
            :limit="1"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
          </el-upload>
          <el-dialog>
            <img width="100%" :src="add.pic" alt=" ">
          </el-dialog>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="add.type">
            <el-radio :label="1">茶叶</el-radio>
            <el-radio :label="2">茶具</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>

        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="display.dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" v-if="dialogStatus=='create'"  @click="handleSave" >创建</el-button>
        <el-button type="primary" v-else @click="HandleUpdate">修改</el-button>
      </div>
      {{add}}
    </el-dialog>
    <div class="btn-group header">
      <el-button type="primary" icon="el-icon-edit" @click="showCreate">添加</el-button>
      <el-button type="primary" icon="el-icon-delete" @click="handleDelete">删除</el-button>
      <el-button type="primary" icon="el-icon-refresh" @click="search">刷新</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%;" height="500px" tooltip-effect="dark" @selection-change="handleSelectionChange"  ref="table" v-loading="loading">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="id"
        label="id">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="name"
        label="分类名称">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="pic"
        label="图片">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="type"
        label="类型">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="showEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes=" pageSizesList"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>
  </div>
  </div>
</template>

<script>
    export default {
        name: "index",
      data() {
        return {
          /*表格数据*/
          tableData: [
          ],
          /*控制弹窗显示*/
          display:{
            dialogTableVisible: false,
            dialogFormVisible: false,
          },
          dialogStatus: 'create',

          fileList: [],

          add: {
            pic:'',
          },
          /*选择的对象*/
          multipleSelection: [],
          /*请求页面*/
          currentPage:1,
          /*页面大小*/
          pageSize:5,
          /*页面可供选择的大小*/
          pageSizesList: [10, 15, 20, 30, 50],
          /*总记录数*/
          totalCount:0,
          /*查询条件*/
          searchEntity:{},
          /*正在加载*/
          loading:true,
          /*设置table的高度*/
          tableHeight:500,


        }
      },
      methods:{
        handleSelectionChange(val) {
          console.log(val);
          this.multipleSelection = val;
        } ,
        handleEdit(index, row) {
          console.log(index, row);
        },
        handleSizeChange(val) {
         this.pageSize=val;
          this.search();
        },
        handleCurrentChange(val) {
          this.currentPage=val;
          this.search();
        },
        /*处理删除*/
        handleDelete() {
          console.log(this.multipleSelectionIds);
          if (this.multipleSelectionIds.length==0) {
            this.$message({
              type: 'info',
              message: `请选择一行`
            });
          }else{
            this.$confirm('确定删除?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$http.get(this.HOST+"/sys/teaCategory/delete?ids="+this.multipleSelectionIds).then((response)=>{
                console.log(response);
              }).catch((error)=>{
                alert("删除失败");
              });
            })
          }
        },

        /*上传限制*/
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg'||file.type === 'image/png';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传图片只能是 JPG 或PNG格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        },

        /*分页查询*/
        search() {
          this.$http.get(this.HOST + "/sys/category/findByPage?currentPage="+this.currentPage+"&pageSize="+this.pageSize, {
            params:this.searchEntity
          }).then((response)=> {
            console.log(response);
            this.tableData=response.data.rows;
            this.totalCount=response.data.totalCount;
            this.loading=false;
            this.tableHeight=this.pageSize*65;
          })
        },

        /*显示添加*/
        showCreate(){
          this.add={};
          this.dialogStatus = "create";
          this.display.dialogFormVisible = true;
        },

        /*显示编辑*/
        showEdit(index,row){
          this.add.id=row.id;
          this.add.name=row.name;
          this.add.pic=row.pic;
          this.fileList=[{name:row.name,url:row.pic}];
          this.add.type=row.type;
          this.dialogStatus = "update";
          this.display.dialogFormVisible = true;
          console.log(this.add.type);
        },

        /*提交修改*/
        HandleUpdate(){
          this.$http.post(this.HOST+"sys/teaCategory/update",this.add).then((response)=>{
            this.search();
            this.display.dialogFormVisible = false;
          }).catch((error)=>{
            console.log("添加失败");
          });
        },

        /*添加*/
        handleSave(){
          this.$http.post(this.HOST+"sys/teaCategory/add",this.add).then((response)=>{
            console.log(response);
            if (response.data===true) {
              this.request();
              this.display.dialogFormVisible = false;
            }else{
              this.$message('请稍后重试');
            }
          }).catch((error)=>{
              console.log(error);
          });
        },

        /*图片上传成功*/
        handleSuccess(response, file, fileList) {
          console.log(response);
          this.add.pic =response.url;
        },

        /*图片删除*/
        handleRemove(file, fileList) {
          console.log(file.response.url);
          this.$http.get(this.HOST + "/sys/deleteFile?url=" + file.response.url).then((res) => {
            this.pic= '';
          });
        }


      },
      mounted() {
          this.search();
      },
      computed:{
        multipleSelectionIds() {
          var multipleSelectionIdList = [];
          this.multipleSelection.forEach((item)=>{
            multipleSelectionIdList.push(item.id);
          });
          return multipleSelectionIdList;
        }
      }
    }
</script>

<style scoped>
  .header {
    padding: 24px 12px;;
    margin-bottom: 16px;
    box-shadow: 1px 1px 4px lightgray;
  }
</style>
