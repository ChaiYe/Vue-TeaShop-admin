<template>
 <!-- <el-row type="flex" align="middle"  style="height: 100px;background-color: #eee">
    <el-col :span="6"  push="1" class="brand-icon">
      <img src="/static/img/logo.png" alt="茶城" style="height: 80px">
    </el-col>
    <el-col :span="8">
      <el-row :gutter="10" type="flex" >
       <el-col :span="6">首页</el-col>
       <el-col :span="6">首页</el-col>
       <el-col :span="6">首页</el-col>
      </el-row>
    </el-col>
    <el-col :span="9" >
      <div style="display: flex;align-items: center">
        <el-input v-model="search" placeholder="请输入商品信息" suffix-icon="el-icon-search"></el-input>
      </div>
    </el-col>
    <el-col :span="4" style="display: flex;align-items: center" >
      <i class="el-icon-third-user" style="margin-left: 36px;font-size: 22px"></i>
      <i class="el-icon-goods" style="margin-left: 36px;font-size: 22px"></i>
    </el-col>
  </el-row>-->
  <div>
      <div style="background: rgb(238, 238, 238);padding:12px 0">
        <el-row type="flex" align="middle">
          <el-col :span="10"  :push="1" class="brand-icon"><img src="/static/img/logo.png" alt="茶城" style="height: 80px"></el-col>
          <el-col :span="8" >
            <div style="display: flex;align-items: center">
              <el-input v-model="keywords" placeholder="请输入商品信息" suffix-icon="el-icon-search" @keyup.enter.native="handleSearch"></el-input>
            </div>
          </el-col>

          <el-col :span="8" style="display: flex;align-items: center">
            <div style="margin-left:24px">欢迎光临</div>
            <span v-if="username!=null&&username!=''">
               <i class="el-icon-third-user" style="margin:0 36px;font-size: 22px;cursor: pointer" @click="toUserHome()" v-if="username!=null"><span style="font-size: 16px">{{username}}</span></i>
              <span v-if="username==null">您好，欢迎光临</span>
            </span>
            <span> <i class="el-icon-circle-close-outline" style="cursor: pointer"  @click="logout()" v-if="username!=null&&username!=''"><span>注销</span></i></span>
            <span v-if="username==null||username==''">
              <span @click="login()" style="margin:24px;cursor: pointer">登录</span>
               <span @click="regist()" style="cursor: pointer">注册</span>
            </span>
            <i class="el-icon-goods" style="margin-left: 36px;font-size: 22px" v-if="username!=null&&username!=''" @click="goShoppingCar()"></i>
          </el-col>
        </el-row>
        <div style="margin-left: 42px">
          <i class="el-icon-menu" @click="indexVisible=!indexVisible">全部商品分类</i>
        </div>
      </div>
      <div  style="position:absolute;z-index: 10000;margin-left: 24px" :class="{ indexVisible: indexVisible }">
        <Index @indexVisible="handleVisible"></Index>
      </div>
  </div>


</template>

<script>
  import  Index from "@/view/Front/Index/Index.vue"
    export default {
        name: "header.vue",
      data () {
        return {
          keywords:'',
          indexVisible: true,
          username:null,
        }
      },
      methods:{
        toUserHome(){
          this.$router.push("/front/userHome");
        },
        /*跳转搜索*/
        handleSearch() {
          this.$router.push({path:'/front/searchResult/'+this.keywords})
        },
        handleVisible(){
          this.indexVisible = true;
        },
        login(){
          this.$router.push("/front/userLogin");
        },
        logout(){
          localStorage.removeItem("token");
          this.$router.push("/front");
        },
        regist(){
          this.$router.push("/front/register");
        },
        goShoppingCar(){
          this.$router.push("");
        },
        getLoginUserName(){
          alert("获取登录用户名");
          this.$http.get(this.HOST + "/sys/userLogin/getLoginUserName").then(res => {
            this.username=res.data;
          }).catch(err=>{
            console.log(err);
          });
        }
      },
      mounted(){
        this.getLoginUserName();
      },
      components:{
          Index
      },

    }
</script>

<style scoped>
    .indexVisible{
      display: none;
    }
</style>
