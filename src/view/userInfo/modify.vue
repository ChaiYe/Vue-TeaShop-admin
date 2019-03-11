<template>
  <el-form :model="modifyUser" status-icon :rules="modifyRule" ref="modifyUser" label-width="100px" class="demo-ruleForm">
    <el-form-item label="账号">
      {{this.account}}
    </el-form-item>
    <el-form-item label="密码" prop="pass" verify :minLength="6" >
      <el-input type="password" v-model="modifyUser.pass" autocomplete="off" id="modify_password"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass" :verify="verifyPassword" :watch="modifyUser.pass">
      <el-input type="password" v-model="modifyUser.checkPass" autocomplete="off" id="confirm_password"></el-input>
    </el-form-item>
    <!--<el-form-item>
      <el-button type="primary" @click="submitForm('modifyUser')">提交</el-button>
      <el-button @click="resetForm('modifyUser')">重置</el-button>
    </el-form-item>-->
  </el-form>
</template>

<script>
  import axios from 'axios'
    export default {
      name: "modify",
      data() {
        return {
          modifyUser: {
            pass: '',
            checkPass: '',
          },
          modifyRule: {
          }
        };
      },
      methods: {
        verifyPassword (rule, val, callback) {
          if (val !== this.modifyUser.pass) callback(Error('两次输入密码不一致!'));
          else callback()
        },
        /*submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              axios.post(this.HOST+"/sys/user/modifyUserPwd",{
                password:this.modifyUser.pass,
                id:this.id
              }).then((response)=>{
                /!*子组件向父组件传值*!/
                this.$emit("sendparent","success",this.modifyUser.pass);
              }).catch((error)=>{
                this.$emit("sendparent","fail",this.pass);
              })
            } else {
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }*/
      },
      props:["id","account"]
    }
</script>

<style scoped>

</style>
