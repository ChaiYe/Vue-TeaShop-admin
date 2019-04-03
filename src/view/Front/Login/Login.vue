<template>
  <div class="loginPage v2">
    <div class="wrapper" style="background: url('/static/img/loginbg.jpg');">
      <div class="dialog dialog-shadow" style="display: block; margin-top: -362px;">
        <div class="title">
          <h4>使用 百草商城 账号 登录</h4>
        </div>
        <div v-if="loginPage" class="content">
          <ul class="common-form">
            <li class="username border-1p">
              <div class="input">
                <el-input type="text" v-model="ruleForm.userName" placeholder="账号"></el-input>
              </div>
            </li>
            <li>
              <div class="input">
                <el-input type="password" v-model="ruleForm.userPwd" @keyup.enter="login" placeholder="密码"></el-input>
              </div>
            </li>
            <li>
              <div id="captcha">
                <Verify @success="verifySuccess" @error="alert('error')" :type="3" :showButton="false" :barSize="{width:'100%',height:'40px'}" id="verfiy"></Verify>
              </div>
            </li>
            <li style="text-align: right" class="pr">
              <a href="javascript:;" class="register" @click="toRegister">注册 茶叶商城 账号</a>
              <a style="padding: 1px 0 0 10px" @click="open('找回密码','请联系管理员')">忘记密码 ?</a>
            </li>
            <li>
              <div style="margin-top: 25px">
                <el-button
                  :classStyle="ruleForm.userPwd&& ruleForm.userName&& logintxt === '登录'?'main-btn':'disabled-btn'"
                  @click="login"
                  style="margin: 0;width: 90%;">{{logintxt}}</el-button>
              </div>
            </li>
          </ul>
          <!--登陆-->

        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Verify from 'vue2-verify'
  export default {
    data () {
      return {
        verifyStatus:false,
        cart: [],
        loginPage: true,
        ruleForm: {
          userName: '',
          userPwd: '',
          errMsg: ''
        },
        registered: {
          userName: '',
          userPwd: '',
          userPwd2: '',
          errMsg: ''
        },
        autoLogin: false,
        logintxt: '登录',
        statusKey: ''
      }
    },

    computed: {
      count () {
        return this.$store.state.login
      },
    },
    methods: {
      open (t, m) {
        this.$notify.info({
          title: t,
          message: m
        })
      },
      messageSuccess () {
        this.$message({
          message: '恭喜您，注册成功！赶紧登录体验吧',
          type: 'success'
        })
      },
      message (m) {
        this.$message.error({
          message: m
        })
      },
      toRegister () {
        this.$router.push({
          path: '/front/register'
        })
      },
      // 登录返回按钮
      login_back () {
        this.$router.go(-1)
      },

      login () {
        if(this.verifyStatus){
          this.logintxt = '登录中...'
          if (!this.ruleForm.userName || !this.ruleForm.userPwd) {
            // this.ruleForm.errMsg = '账号或者密码不能为空!'
            this.message('账号或者密码不能为空!')
            return false
          }

          var params = {
            nickname: this.ruleForm.userName,
            password: this.ruleForm.userPwd,
          }
          this.$http.post(this.HOST+"/sys/userLogin/login",params).then(res => {
            if (res.data.code == 200) {
              localStorage.setItem('token', res.data.data);
              this.$router.push({
                path: '/front'
              })
            }else{
              this.$alert(res.data.msg);
              this.logintxt = '登录';
            }
          })
        }else{
          this.$message("请先验证验证码");
        }

      },
      verifySuccess() {
        this.verifyStatus = true;
      }
    },
    mounted () {
    },

    components: {
      Verify
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  a {
    text-decoration: none;
    color: #ccc;
  }
  * {
    box-sizing: content-box;
  }

  .loginPage {
    /*background: #ebf2e1;*/


    overflow-x: hidden;
    overflow-y: hidden;
    .input {
      height: 50px;
      display: flex;
      align-items: center;
      input {
        font-size: 16px;
        width: 100%;
        height: 100%;
        padding: 10px 15px;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 6px;
      }
    }
    .wrapper {
      background-size: 100px;
      min-height: 800px;
      min-width: 630px;
    }
  }

  .v2 .dialog {
    width: 450px;
    border: 1px solid #dadada;
    border-radius: 10px;
    top: 50%;
    left: 50%;
    margin-left: -225px;
    position: absolute;
    background: #fff;
    .title {
      background-image: url("/static/img/logo.png");
      height: auto;
      overflow: visible;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
      position: relative;
      background-size: 140px;
      background-position: 150px center;
      background-repeat: no-repeat;
      height: 92px;
      margin: 23px 0 50px;
      padding: 75px 0 0;
      box-shadow: none;
      h4 {
        padding: 0;
        text-align: center;
        color: #666;
        border-bottom: 1px solid #dcdcdc;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
        font-weight: 700;
        position: absolute;
        bottom: 0;
        width: 100%;
        text-align: center;
        margin: 0;
        padding: 0;
        border-bottom: 0;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
        line-height: 1em;
        height: auto;
        color: #333;
        font-weight: 400;
      }
    }
    .content {
      padding: 0 40px 22px;
      height: auto;
      .common-form {
        li {
          clear: both;
          margin-bottom: 15px;
          position: relative;
        }
      }
    }
  }


  @media screen and (min-width: 737px),
  screen and (-webkit-max-device-pixel-ratio: 1.9) and (max-width: 736px) and (min-device-width: 737px) {
    .wrapper {

      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
    .dialog {

      border-radius: 12px;
      display: none;
      margin: -163px 0 0 -218px;
      width: 436px;
      position: fixed;
      left: 50%;
      top: 50%;
    }
    .dialog .title h4 {
      border-bottom: #d1d1d1 solid 1px;
      box-shadow: 0 2px 6px #d1d1d1;
      color: #666;
      font-size: 20px;
      height: 61px;
      line-height: 61px;
      padding: 0 0 0 35px;
    }
    .common-form li {
      clear: both;
      margin-bottom: 15px;
      position: relative;
    }
    .auto-login {
      position: absolute;
      top: 0px;
      left: 2px;
      color: #999;
    }
    .register {
      padding: 1px 10px 0;
      border-right: 1px solid #ccc;
    }
    .border {
      margin-top: 10px;
      border-bottom: 1px solid #ccc;
    }
    .other {
      margin: 20px 5px 0 0;
      width: auto;
      color: #bbb;
      font-size: 12px;
      cursor: default;
      color: #999;
    }
    .footer {
      display: flex;
      flex-direction: row;
    }
    .agree {
      margin-bottom: 30px;
      color: #999;
    }
  }

  .registered {
    h4 {
      padding: 0;
      text-align: center;
      color: #666;
      border-bottom: 1px solid #dcdcdc;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      font-weight: 700;
      font-size: 20px;
      height: 60px;
      line-height: 60px;
    }
  }

  #wait {
    text-align: left;
    color: #999;
    margin: 0;
  }
  li{
    list-style: none;
  }

</style>
