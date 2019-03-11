<template>
  <el-form ref="adminForm" :model="adminForm"  :rules="adminRules" label-width="80px" >
    <el-form-item label="账号" prop="account">
      <el-input v-model="adminForm.account" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="adminForm.password" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPassword">
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
      <el-button type="primary" @click="submitForm('adminForm')">提交</el-button>
      <el-button @click="resetForm('adminForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import axios from 'axios';
    export default {
      name: "add",
        data(){
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
          return{
            adminForm:{
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
                {min:3,max:10,message:'长度在3到10个字符',trigger:'blur'}
              ],
              name:[
                {required:true,message:'请输入姓名',trigger:'blur'},
                {min:3,max:10,message:'长度在3到10个字符',trigger:'blur'}
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
                this.$message({
                  message: '添加成功',
                  type: 'success'
                });
              }).catch((error)=> {
                console.log(error);
              });
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          console.log(formName);
          this.$refs[formName].resetFields();
        }
      }
    }
</script>

<style scoped>

</style>
