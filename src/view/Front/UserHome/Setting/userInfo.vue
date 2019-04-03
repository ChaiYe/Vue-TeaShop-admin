<template>
    <div>
      <el-form ref="userInfo" :model="form" label-width="80px">
        <el-form-item label="昵称">
          <el-input v-model="form.nickname" :disabled="status"></el-input>
        </el-form-item>
        <el-form-item label="邮件" >
          <el-input v-model="form.email" :disabled="status"></el-input>
        </el-form-item>
        <el-form-item label="手机号" >
          <el-input v-model="form.phoneNumber" :disabled="status"></el-input>
        </el-form-item>
        <el-form-item label="性别" >
          <el-radio-group v-model="form.gender" :disabled="status" >
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="生日" >
            <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday" style="width: 100%;"  :disabled="status"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="change" v-if="status">修改</el-button>
          <el-button type="primary" @click="onSubmitUser" v-if="!status">保存</el-button>
          <el-button @click="change" v-if="!status">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
    export default {
        name: "userInfo",
      data(){
          return{
            status:true,
            form:{
              nickname:"",
              phoneNumber:"",
              email:"",
              gender:null,
              birthday:''
            },
          }
      },
      methods:{
          change(){
            if(!this.status) {
              this.queryUser();
            }
            this.status=!this.status;
          },
        queryUser() {
            this.$http.get(this.HOST + "/sys/user/getUserInfo").then(res => {
              this.form = res.data;
                    console.log(res.data);
                }).catch(err => {
                      console.log(err);
              });
        },
        onSubmitUser(){
            this.$http.post(this.HOST + "/sys/user/update",this.form).then(res => {
              this.queryUser();
              console.log(res.data);
                }).catch(err => {
                      console.log(err);
              });
        }
      },
      mounted(){
        this.queryUser();
      }
    }
</script>

<style scoped>

</style>
