<template>
    <div>
      <el-row>
        <el-dialog :visible.sync="dialogVisible">
        <el-form ref="adminForm" :model="adminForm"  :rules="adminRules" label-width="80px" >
          <el-form-item label="账号" prop="account">
            <el-input v-model="adminForm.account" placeholder="账号"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" v-if="type=='新建'">
            <el-input type="password" v-model="adminForm.password" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPassword" v-if="type=='新建'">
            <el-input  type="password" v-model="adminForm.checkPassword" placeholder="请再次输入密码"></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="adminForm.nickname" placeholder="昵称"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="adminForm.name" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="adminForm.gender">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="类别" prop="type">
            <el-radio-group v-model="adminForm.type">
              <el-radio :label="0">超级管理员</el-radio>
              <el-radio :label="1">管理员</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="editForm('adminForm')" v-if="type=='编辑'">修改</el-button>
            <el-button type="primary" @click="submitForm('adminForm')" v-if="type=='新建'">提交</el-button>
            <el-button @click="resetForm('adminForm')" v-if="type=='新建'">重置</el-button>
          </el-form-item>
        </el-form>
          {{adminForm}}
        </el-dialog>
      </el-row>
      <el-row class="header">
        <el-col :span="22" >
          <el-form :inline="true" :model="administrator">
            <el-row justify="start">
            <el-form-item>
              <el-input v-model="administrator.nickname" placeholder="昵称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="administrator.name" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item >
              <el-select v-model="administrator.gender" placeholder="性别">
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item >
              <el-select v-model="administrator.type" placeholder="类别">
                <el-option label="超级管理员" value="0"></el-option>
                <el-option label="管理员" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
              <el-button type="primary" @click="reset">重置</el-button>
            </el-form-item>
            </el-row>
          </el-form>
        </el-col>
        <el-col :span="2"><el-button round @click.native="addDialog">添加</el-button></el-col>
      </el-row>
      <el-row class="main" v-cloak>
        <el-table
          :data="AdministratorList"
          border
          style="width: 100%">
          <el-table-column
            prop="id"
            label="编号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="nickname"
            label="昵称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="gender"
            label="性别"
            :formatter="formatGender">
          </el-table-column>
          <el-table-column
            prop="name"
            label="名字">
          </el-table-column>
          <el-table-column
            prop="account"
            label="账号">
          </el-table-column>
          <el-table-column
            prop="type"
            label="类型"
          :formatter="formatType">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
            :total="total">
          </el-pagination>
        </div>
      </el-row>
    </div>
</template>

<script>
  import  add from '@/view/adminInfo/add'
  import moment from "moment"
  import  axios from 'axios'
    export default {
        name: "index",
      data() {
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.adminForm.checkPassword !== '') {
              this.$refs.adminForm.validateField('checkPassword');
            }
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.adminForm.password) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
        return {
          AdministratorList: [],
          administrator: {
            nickname: null,
            name:null,
            gender:null,
            type:null
          },
          type:'添加',
          dialogVisible:false,
          pageSizesList: [10, 15, 20, 30, 50],
          currentPage: 1,
          pageSize:10,
          total:0,
          adminForm:{
            id:'',
            account:'',
            password:'',
            checkPassword:'',
            nickname:'',
            name:'',
            gender:'',
            type:''
          },
          adminRules:{
            account:[
              {required:true,message:'请输入账号',trigger:'blur'},
            ],
            nickname:[
              {required:true,message:'请输入昵称',trigger:'blur'},
              {min:2,max:10,message:'长度在2到10个字符',trigger:'blur'}
            ],
            name:[
              {required:true,message:'请输入姓名',trigger:'blur'},
              {min:2,max:10,message:'长度在2到10个字符',trigger:'blur'}
            ],
            gender:[
              {required:true,message:'请选择性别',trigger:'change'}
            ],
            type:[
              {required:true,message:'请选择类别',trigger:'change'}
            ],
            password: [
              { validator: validatePass, trigger: 'blur' }
            ],
            checkPassword: [
              { validator: validatePass2, trigger: 'blur' }
            ],
          }
        }
      },
      methods: {
        submitForm(formName) {
          console.log(this.adminForm.account);
          this.$refs[formName].validate((valid) => {
            if (valid) {
              axios.post(this.HOST+"/sys/admin/add",{
                account:this.adminForm.account,
                password:this.adminForm.password,
                nickname:this.adminForm.nickname,
                name:this.adminForm.name,
                gender:this.adminForm.gender,
                type:this.adminForm.type
              }).then((response)=> {
               this.dialogVisible=false;
                this.request();
              }).catch((error)=> {
                console.log(error);
              });
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        editForm(formName){
          this.$refs[formName].validate((valid) => {
            if(valid){
              axios.post(this.HOST+"/sys/admin/update",{
                id:this.adminForm.id,
                account:this.adminForm.account,
                password:this.adminForm.password,
                nickname:this.adminForm.nickname,
                name:this.adminForm.name,
                gender:this.adminForm.gender,
                type:this.adminForm.type
              }).then((response)=> {
                this.dialogVisible=false;
                this.request();
              }).catch((error)=> {
                console.log(error);
              });
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
          /*页面大小发生改变*/
        handleSizeChange(val) {
          this.pageSize=val;
          this.request(1,val,this.administrator);
        },
        /*当前页面发生改变*/
        handleCurrentChange(val) {
          console.log("当前页面大小"+this.pageSize);
          this.currentPage=val;
          this.request(val,this.pageSize,this.administrator);
        },
        /*查询条件提交*/
        onSubmit() {
          this.request(1,10,this.administrator)
        },
        /*重置查询条件*/
        reset(){
          this.administrator.gender='';
          this.administrator.nickname='';
          this.administrator.name='';
          this.administrator.type='';
        },
        /*打开添加弹框*/
        addDialog() {
          this.type='新建';
          this.dialogVisible = true;
          adminForm = null;
          /*const h = this.$createElement;
          this.$msgbox({
            title: '添加用户',
            message: h('add', null),
            distinguishCancelAndClose: true,
            showCancelButton: false,
            showConfirmButton:false,
            beforeClose: (action, instance, done) => {
                done();
            }
          }).then(action => {
            this.$message({
              type: 'info',
              message: 'action: ' + action
            });
          }).catch(() => {});*/
        },
        /*删除*/
        handleDelete(index,row){
          this.$confirm('此操作将删除管理员, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            console.log(row.id);
            axios.get(this.HOST+"/sys/admin/delete",{
              params:{
                adminId:row.id
              }
            }).then((response)=>{
              this.request();
            }).catch((error)=>{
              this.$message.error('删除失败!请稍后重试');
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        /*编辑*/
        handleEdit(index,row){
          alert("编辑");
          this.adminForm = row;
          this.dialogVisible = true;
          this.type='编辑';
        },
        request(page,size,administrator) {
          axios.get(this.HOST + "/sys/admin/list", {
            params: {
              page: this.currentPage,
              size: this.pageSize,
              gender:this.administrator.gender,
              nickname:this.administrator.nickname,
              name:this.administrator.name,
              type:this.administrator.type,
            }
          }).then((response) => {
            console.log(response);
            this.AdministratorList = response.data.list;
            console.log(this.AdministratorList);
            this.currentPage = response.data.pageNum;
            this.total = response.data.total;
          }).catch((error)=> {
            console.log(error);
          });
        },

        /*格式转换*/
        //性别
        formatGender:function (row, column) {
          return row.gender == '1' ? "男" : row.gender == '2' ? "女" : "性别未知";
        },
        //类型
        formatType:function (row,column) {
          return row.type == '1' ?'普通管理员':row.type=='0'?'超级管理员':'';
        },
        //日期时间
        formateDateTime:function (row,colum) {
          return moment(new Date(row['addTime'])).format('YYYY-MM-DD HH:mm:ss')
        },
        formateModifyTime:function (row,column) {
          return  moment(new Date(row['modifyTime'])).format('YYYY-MM-DD HH:mm:ss')
        }
      },
      mounted:function () {

        /*使用箭头函数解决this的不指向vue,而不是undefined*/
       /* axios.get(this.HOST+"/sys/admin/list").then( (response)=> {
          console.log(response);
          this.AdministratorList=response.data.content;
          console.log(this.AdministratorList);
          this.currentPage=response.data.number;
          this.total=response.data.totalElements;
          console.log(this.total);
        }).catch( (error)=> {
          console.log(error);
        });*/
        this.request(1, 10,this.user);
      },
      components:{
          add
      }
    }
</script>

<style scoped lang="scss">
  $boxShadow:1px  1px  4px lightgray;
  $marginBottom:8px 16px 24px;
  $marginTop:8px 16px 24px;
  $padding:24px 12px;

  [v-cloak] {
    display: none;
  }
  .header{
    padding: $padding;
    margin-bottom: nth($marginBottom,2);
    box-shadow: $boxShadow;
  }
  .main{
    box-shadow: $boxShadow;
    padding: $padding;
  }
  .pagination{
    margin-top: nth($marginTop,2);
    margin-bottom: nth($marginBottom,2);
  }
</style>
