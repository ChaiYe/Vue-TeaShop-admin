<template>
  <div>
    <el-row class="header">
      <el-col :span="22">
        <el-form :inline="true" :model="user">
          <el-row justify="start">
            <el-form-item>
              <el-input v-model="user.account" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="user.nickname" placeholder="昵称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="user.phoneNumber" placeholder="电话号码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="user.email" placeholder="邮箱"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="user.state" placeholder="是否启用">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="user.gender" placeholder="性别">
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
              <el-button type="primary" @click="reset">重置</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
    <el-row class="main" v-cloak>
      <el-table
        ref="userTable"
        :data="userList"
        border
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
       <!-- <el-table-column
          prop="id"
          label="编号"
          width="100">
        </el-table-column>-->
        <el-table-column
          label="头像">
          <template slot-scope="scope">
            <img class="head_portrait" :src="scope.row.headPortrait?scope.row.headPortrait:'http://localhost:8080/sys/img/1.jpg'"/>
          </template>
        </el-table-column>
        <el-table-column
          prop="account"
          label="账号">
        </el-table-column>
       <!-- <el-table-column
          prop="password"
          label="密码">
        </el-table-column>-->
        <el-table-column
          prop="email"
          label="邮箱"
          width="180">
        </el-table-column>
        <el-table-column
          prop="phoneNumber"
          label="手机号码">
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="昵称">
        </el-table-column>
        <el-table-column
          prop="gender"
          label="性别"
          :formatter="formatGender">
        </el-table-column>
      <!--  <el-table-column
          prop="birthday"
          label="生日"
          width="100">
        </el-table-column>-->

        <el-table-column
          prop="registeredTime"
          label="注册时间"
        width="100px">
        </el-table-column>
       <!-- <el-table-column
          prop="modifyTime"
          label="修改时间"
          width="100px">
        </el-table-column>-->
        <el-table-column
          label="是否启用">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.state==1?true:false"
              @change=change(scope.$index,scope.row)>
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination" style="display: flex;justify-content: space-between">
        <div>
          <el-button size="small" @click="batchStop()">批量暂停</el-button>
          <el-button size="small" @click="batchDelete()">批量删除</el-button>
        </div>
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
  import modify from '@/view/userInfo/modify'
  import moment from "moment"
  import axios from 'axios'

  export default {
    name: "index", data() {
      return {
        userList: [],
        user: {
          account: '',
          nickname: '',
          gender: '',
          state: '',
          phoneNumber: '',
          email: ''
        },
        pageSizesList: [10, 15, 20, 30, 50],
        currentPage: 1,
        pageSize: 10,
        total: 0,
        multipleSelection:[]
      }
    },
    methods: {
      /*页面数据大小发生改变*/
      handleSizeChange(val) {
        this.pageSize = val;
        this.request(1, val, this.user);
      },
      /*当前页面数字发生改变*/
      handleCurrentChange(val) {
        console.log("当前页面大小" + this.pageSize);
        this.currentPage = val;
        this.request(val, this.pageSize, this.user);
      },
      /*查询条件提交*/
      onSubmit() {
        this.request(1, 10, this.user)
      },
      /*重置查询条件*/
      reset() {
        this.user.gender = '';
        this.user.account = '';
        this.user.nickname = '';
        this.user.phoneNumber = '';
        this.user.email = '';
        this.user.state = '';
      },
      /*打开添加弹框*/
      addDialog() {

      },

      handleDelete(index, row) {
        this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(row.id);
          axios.get(this.HOST + "/sys/user/delete", {
            params: {
              userId: row.id
            }
          }).then((response) => {
            alert("已成功删除");
            this.userList.splice(index, 1);
          }).catch((error) => {
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
      handleEdit(index, row) {
        const h = this.$createElement;
        this.$msgbox({
          title: '修改密码',
          message: h('modify',
            {
              props: {
              id: row.id,
              account:row.account
            },on:{
                sendparent:this.showMag
              }
          }),
          distinguishCancelAndClose: true,
          showCancelButton: true,
          showConfirmButton: true,
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              axios.post(this.HOST+"/sys/user/modifyUserPwd",{
                password:document.getElementById("modify_password").value,
                id:row.id
              }).then((response)=>{
                /*子组件向父组件传值*/
                instance.confirmButtonLoading = false;
                instance.confirmButtonText = '确定';
                document.getElementById("modify_password").value="";
                document.getElementById("confirm_password").value="";
                alert("修改成功");
                done();
              }).catch((error)=>{
                alert("修改失败");
              })
              done();
            } else {
              done();
            }
          }
        }).then(action => {
          console.log(document.getElementById("password").value);
          // this.$message({
          //   type: 'info',
          //   message: 'action: ' + action
          // });
        }).catch(() => {

        });
      },

      /*处理多选*/
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      change(index, row) {
        console.log(row.state);
        axios.get(this.HOST + "/sys/user/stop", {
          params: {
            userId: row.id,
            state: row.state ? 0 : 1
          }
        }).then((response) => {
          row.state=row.state==0 ? 1 : 0
        }).catch((error) => {
          this.$message({
            type: 'info',
            message: '修改失败! 请稍后重试'
          });
        })
      },

      request(page, size, user) {
        axios.get(this.HOST + "/sys/user/list", {
          params: {
            page: page,
            size: size,
            gender: user.gender,
            account: user.account,
            nickname: user.nickname,
            phoneNumber: user.phoneNumber,
            email: user.email,
            state: user.state,
          }
        }).then((response) => {
          console.log(response);
          this.userList = response.data.list;

          this.total = response.data.totalElements;
        }).catch((error) => {
          console.log(error);
        });
      },

      showMag(param1,param2){
        console.log(param1);
        console.log(param2);
      },

      batchStop(){
        var jsonTarget=[];
        var that=this;
        console.log(this.$refs.userTable.selection);
        this.$refs.userTable.selection.map(function(item){
          jsonTarget.push({id:item.id});
        });
        console.log(jsonTarget);
        if(jsonTarget.length==0){
          this.$message('请选择一行');
        }else{
          this.$confirm('即将暂停这些用户', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            axios.post(this.HOST + "/sys/user/batchStop",jsonTarget).then(
             //console.log(that.$refs.userTable.selection)
              that.$refs.userTable.selection.forEach((item)=>{
                console.log(item);
                item.state=0;
              })
            ).catch(
              (error)=>{
                console.log(error);
              }
            );

          }).catch((error) => {
            /*this.$message({
              type: 'info',
              message: '已取消删除'
            });*/
            console.log(error);
          });
        }
      },

      batchDelete(){
        var that=this;
        var jsonTarget=[];
        this.$refs.userTable.selection.map(function(item){
          jsonTarget.push({id:item.id});
        });
        Array.prototype.indexOf = function(val) {
          for (var i = 0; i < this.length; i++) {
            if (this[i] == val)
            {
              console.log("partTwo"+i);
              return i;
            }
          }
          return -1;
        };
        Array.prototype.remove = function(val) {
          var index = this.indexOf(val);
          console.log(index);
          if (index > -1) {
            this.splice(index, 1);
          }
        };
        console.log(jsonTarget);
        if(jsonTarget.length==0){
          this.$message('请选择一行');
        }else{
          this.$confirm('即将暂停这些用户', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            axios.post(this.HOST + "/sys/user/batchDelete",jsonTarget).then(
              that.$refs.userTable.selection.forEach((item)=>{
                console.log(item);
                that.$refs.userTable.remove(item);
              })
            ).catch(
              /*this.$message({
                type: 'error',
                message: '删除失败!'
              })*/
              (error)=>{
                console.log(error);
              }
            );

          }).catch((error)=>{
            console.log(error);
          });
        }
      },



      /*格式转换*/
      //性别
      formatGender: function (row, column) {
        return row.gender == '1' ? "男" : row.gender == '2' ? "女" : "性别未知";
      },
    },
    mounted: function () {
      this.request(1, 10, this.user);
    },
    components: {
      modify,
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
