<template>
  <div class="zhuce_body" style="background:url(/static/img/bg.jpg);width: 1340px;height: 680px;background-size:cover; background-repeat:no-repeat;">
    <div class="zhuce_kong">
      <div class="zc">
        <div class="bj_bai">
          <h3>欢迎注册</h3>
         <div>
           <el-form :model="entity"  ref="entityForm"  :rules="rules">
             <el-form-item prop="phoneNumber">
               <el-input  type="text" class="txt phone" prefix-icon="el-icon-phone" placeholder="手机号" v-model="entity.phoneNumber"></el-input>
             </el-form-item>
           <el-form-item prop="nickname">
              <el-input  type="text" class="txt email"  prefix-icon="el-icon-search" placeholder="用户名" v-model="entity.nickname"></el-input>
           </el-form-item>
           <el-form-item prop="password">
              <el-input name="" type="password" class="txt possword" prefix-icon="el-icon-search" placeholder="密码" v-model="entity.password"></el-input>
           </el-form-item>

           <el-form-item prop="confirmPassword">
             <el-input name="" type="password" class="txt possword" prefix-icon="el-icon-search" placeholder="密码" v-model="entity.confirmPassword"></el-input>
            <!-- <el-input name="" type="password " class="txt possword" prefix-icon="el-icon-search" placeholder="确认密码" v-model="entity.confirmPassword"></el-input>-->
           </el-form-item>
           <el-form-item prop="verifyCode">
             <el-row  type="flex" align="middle">
               <el-input name="" type="text" class="txt yanzm" prefix-icon="el-icon-search"   placeholder="验证码" v-model="entity.verifyCode"></el-input>
               <el-button type="text" @click="getSMSCode" :disabled="!status"> {{status?'获取手机验证码':time+'秒后重新获取'}}</el-button>
             </el-row>
           </el-form-item>


            <div class="checkbox">
              <el-checkbox name="" :checked="checked"></el-checkbox><span>已阅读并同意<a href="javascript:;" target="_blank"><span class="lan">《白草茶城使用协议》</span></a></span>
            </div>
            <input name="注册" type="button" class="btn_zhuce" value="注册" @click="registered">
           </el-form>
         </div>

        </div>
      </div>
    </div>
  </div>

</template>

<script>
    export default {
        name: "registered",
        data(){
          var validatePass = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入密码'));
            } else {
              if (this.entity.password !== '') {
                this.$refs.entityForm.validateField('password');
              }
              callback();
            }
          };
          var validatePass2 = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'));
            } else if (value !== this.entity.confirmPassword) {
              callback(new Error('两次输入密码不一致!'));
            } else {
              callback();
            }
          };
          return{
            checked:true,
            status:true,
            time:5,
            entity:{
              phoneNumber:'15768726472',
              nickname:'陈福铿',
              password:'123456',
              verifyCode:null,
              confirmPassword:'123456'
            },
            rules: {
              phoneNumber: [
                { required: true, message: '请输入手机号', trigger: 'blur' }
              ],
              nickname: [
                { required: true, message: '请输入昵称', trigger: 'blur' }
              ],
              password: [
                { validator: validatePass, trigger: 'blur'}
              ],
              confirmPassword: [
                {validator: validatePass2, trigger: 'blur'}
              ],
              verifyCode: [
                { required: true, message: '请输入验证码', trigger: 'blur' }
              ],
            }
          }
        },
        methods:{
          getSMSCode(){
            if(this.entity.phoneNumber){
              this.status=false;
              let interval = setInterval(this.intervalId ,1000);
              this.$http.get(this.HOST+"/sys/getSMSCode?phoneNumber="+this.entity.phoneNumber).then((res) => {
                console.log(res);
              }).catch((err) => {
                console.log(err);
              });
            }
          },
          intervalId(){
            if(this.time>0){
              this.time--;
            }else{
              this.time=5;
              this.status = true;
            }

          },
          verifyPassword(){
            if (val !== this.model.pass1) callback(Error('两次输入密码不一致!'));
            else callback()
          },
          registered(){
            if (this.checked) {
              this.$http.post(this.HOST+"/sys/user/registered",this.entity).then(res => {
                console.log(res);
              if(res.data==true){
                this.$alert('注册成功即将跳转登录页面', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    this.$router.push("/front/userLogin");
                  }
                });
              }
              if(res.data=='false'){
                  this.$alert('验证码错误', '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                    }
                  });
                }
              }).catch((err) => {
                console.log(err);
              });
            }else{
              this.$message("请先勾选同意百草商城协议");
            }
          /*  this.$refs['entityForm'].validate((valid) => {
              if (valid) {

              } else {
                console.log('error submit!!');
                return false;
              }
            });*/



          },
        }
    }
</script>

<style  lang="scss">
  body{
    background: #cccccc ;
  }
    .zhuce_body{
      //background-image: url('/src/assets/bj.jpg');
      background: #4b4b4b;
      height: 100%;
      width: 100%;
    }
    .zhuce_kong{
      box-shadow: #ccc 5px 5px 5px;
      margin-top:52px;
      position: absolute;
      right: 150px;
      background: #ffffff;
      padding:24px 20px;
    }
    .zc{
      display: flex;
      width: 100%;
      margin: 0 auto;
    }
    .txt {
      margin-top: 14px;

    }
  .btn_zhuce{
    width: 100%;
    background: #abcc0d;
    padding: 12px;
    text-align: center;
    border: none;
    color: white;
    border-radius:4px ;
  }
  .checkbox{
    margin-top:14px ;
    margin-bottom: 14px;
    color: #bfbfbf;
  }
  a{
    color: #bfbfbf;
    &:active{
      color: #bfbfbf;
    }
  }
</style>
