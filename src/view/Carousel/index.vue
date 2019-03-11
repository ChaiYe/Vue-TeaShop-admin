<template>
    <el-row>
      <el-dialog :title="this.dialogStatus == 'create' ?'添加':'修改'"  :visible.sync="this.display.dialogFormVisible">
        <el-form :model="add" label-width="80px">
          <el-form-item label="标题" verify >
            <el-input v-model="add.title" style="width: 30%"></el-input>
          </el-form-item>
          <el-form-item label="上传图片" verify >
            <el-upload
              class="upload-demo"
              action="api/sys/upload"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :file-list="fileList"
              :limit="1"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <el-dialog>
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item label="转态">
            <el-radio-group v-model="add.state">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="2">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="排序">
            <el-input-number v-model="add.picSort" :min="1" :max="8"></el-input-number>
          </el-form-item>
          <el-form-item>

          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="display.dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" v-if="dialogStatus=='create'"  @click="save" >创建</el-button>
          <el-button type="primary" v-else @click="HandleUpdate">修改</el-button>
        </div>
        {{add}}
      </el-dialog>
      <el-row>
        <el-row :gutter="10" type="flex" justify="space-between">
          <el-col :span="12">
            <el-button type="primary"  @click="handleDelete">删除</el-button>
            <el-button type="primary" @click="showCreate">新建</el-button>
            <el-button type="primary" @click="search">刷新</el-button>
          </el-col>
        </el-row>
      </el-row>
      <el-row>
        <el-table border :data="tableData" :height="tableHeight" tooltip-effect="dark" ref="table" v-loading="loading" @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="title" label="标题" width="100px">
            <template slot-scope="scope">
              <span v-html="scope.row.title"></span>
            </template>
          </el-table-column>
          <el-table-column prop="largerPic" label="url" width="300px"></el-table-column>
          <el-table-column prop="largerPic" label="图片">
              <template slot-scope="scope">
                <img :src="scope.row.largerPic" :alt="scope.row.title" style="height: 100px;width: 100px">
              </template>
          </el-table-column>
          <el-table-column prop="picSort" label="排序"></el-table-column>
          <el-table-column prop="state" label="状态">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.state == '1' ? 'primary' : 'success'"
                disable-transitions>{{scope.row.state==1?'启用':'停用'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="showEdit(scope.$index, scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row>
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
    </el-row>
</template>

<script>
  import {filterValueBySelect} from '@/utils/filterValue.js'
    export default {
        name: "index",
        data() {
        return {
          /*页面数据*/
          tableData:[],
          searchEntity:{
            /*查询条件*/
            title:'',
            brandId:null,
            type:null
          },
          /*当前页*/
          currentPage: 1,
          /*页面大小*/
          pageSize: 10,
          /*记录总条数*/
          totalCount: 0,
          /*页面可供选择的大小*/
          pageSizesList: [10, 15, 20, 30, 50],

          /*控制弹窗显示*/
          display:{
            dialogTableVisible: false,
            dialogFormVisible: false,
          },
          dialogStatus: 'create',

          multipleSelection: [],

          /*数据加载等待动画*/
          loading: false,
          /*设置table的高度*/
          tableHeight:500,

          recommendType: ['不推荐', '自饮', '送礼', '茶器推荐'],

          fileList: [{name: 'one.jpeg', url: ''}],
          /*添加实体*/
          add:{
            id:'',
            title:'',
            largerPic: '',
            picSort:'',
            state:null
          }
        }
      },
        methods:{

          HandleUpdate(){
            this.$http.post(this.HOST + "/sys/carousel/update", this.add).then(res => {
              this.display.dialogFormVisible = false;
              this.search();
            }).catch(error => {
              console.log(error);
            });
          },

          /*选择发生变化*/
          handleSelectionChange(val) {
            console.log(val);
            this.multipleSelection =  filterValueBySelect(val,'id');
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


          handleDelete() {
            this.$confirm('确定删除?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$http.get(this.HOST+"sys/carousel/delete?ids="+this.multipleSelection).then((response)=>{
                this.search();
              }).catch((error)=>{
                alert("删除失败");
              });
            });
          },
          /*提交请求*/
          search() {
            this.loading = true;
            this.$http.get(this.HOST + "/sys/carousel/findByPage?pageNum="+this.currentPage+"&pageSize="+this.pageSize).then((response) => {
              this.loading=false;
              console.log(response);
              this.tableData= response.data.rows;
              this.totalCount=response.data.totalCount;
            }).catch((error)=>{
            })
          },


          /*显示添加*/
          showCreate(){
            this.add = {largerPic: ''};
            this.fileList=[];
            this.dialogStatus = "create";
            this.display.dialogFormVisible = true;
          },
          /*添加*/
          save(){
            console.log("请求发生");
            this.$http.post(this.HOST+"/sys/carousel/save",this.add).then(res=>{
              this.display.dialogFormVisible = false;
              this.search();
            }).catch(error=>{
              console.log(error);
            })
          },

          /*显示编辑*/
          showEdit(index,row){
            console.log(row);
            this.add.id=row.id;
            this.add.title=row.title;
            this.add.largerPic=row.largerPic;
            this.add.state=row.state;
            this.add.picSort=row.picSort;
            this.fileList=[{name:row.title,"url":row.largerPic}];
            this.dialogStatus="update"
            this.display.dialogFormVisible = true;

          },

          /*图片上传成功*/
          handleSuccess(response, file, fileList) {
            console.log(response);
            this.add.largerPic =response.url;
          },

          /*图片删除*/
          handleRemove(file, fileList) {
            console.log(file.response.url);
            this.$http.get(this.HOST + "/sys/deleteFile?url=" + file.response.url).then((res) => {
              this.fileList = [];
            });
          }



        },
        mounted() {
          this.search()
        }
    }
</script>

<style scoped>

</style>
