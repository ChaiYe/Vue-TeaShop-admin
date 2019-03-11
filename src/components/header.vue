<template>
  <el-row type="flex" align="middle"  style="height: 100px;background-color: #eee">
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
  </el-row>
</template>

<script>
    export default {
        name: "header.vue"
    }
</script>

<style scoped>

</style>
