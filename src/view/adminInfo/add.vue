<template>

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
