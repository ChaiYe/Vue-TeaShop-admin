<template>
  <div class="category-list" style="text-align: center">
    <el-row :gutter="10"  align="middle" type="flex">
       <el-col :span="2" class="grey">品类:</el-col>
        <el-col :span="22">
          <el-row :gutter="10" >
           <el-col :span="2"><a href="#">全部</a></el-col>
           <el-col :span="2"><a href="#">安溪</a></el-col>
           <el-col :span="2">武夷</el-col>
           <el-col :span="2">单从</el-col>
           <el-col :span="2">水仙</el-col>
           <el-col :span="2">乌龙茶</el-col>
          </el-row>
        </el-col>
      </el-row>
    <hr style="background-color: #eee;height: 1px;border: none">
    <el-row :gutter="10" align="middle" type="flex">
       <el-col :span="2" class="grey">品牌:</el-col>
        <el-col :span="22">
          <el-row :gutter="10">
           <el-col :span="2">10</el-col>
           <el-col :span="2">10</el-col>
           <el-col :span="2">10</el-col>
           <el-col :span="2">10</el-col>
           <el-col :span="2">10</el-col>
          </el-row>
        </el-col>
      </el-row>
    <el-row :gutter="10" align="middle" type="flex">
       <el-col :span="2" class="grey">净含量:</el-col>
        <el-col :span="22">
          <el-row :gutter="10">
           <el-col :span="2">10</el-col>
           <el-col :span="2">10</el-col>
           <el-col :span="2">10</el-col>
           <el-col :span="2">10</el-col>
           <el-col :span="2">10</el-col>
          </el-row>
        </el-col>
      </el-row>
    <el-collapse-transition>
    <div v-show="show" >
      <el-row :gutter="10" align="middle" type="flex">
        <el-col :span="2" class="grey">品牌:</el-col>
        <el-col :span="22">
          <el-row :gutter="10">
            <el-col :span="2">10</el-col>
            <el-col :span="2">10</el-col>
            <el-col :span="2">10</el-col>
            <el-col :span="2">10</el-col>
            <el-col :span="2">10</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="10" align="middle" type="flex">
        <el-col :span="2" class="grey">品牌:</el-col>
        <el-col :span="22">
          <el-row :gutter="10">
            <el-col :span="2">10</el-col>
            <el-col :span="2">10</el-col>
            <el-col :span="2">10</el-col>
            <el-col :span="2">10</el-col>
            <el-col :span="2">10</el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    </el-collapse-transition>
    <el-row align="middle" type="flex">
       <el-col :span="6" :push="18" >
         <el-row>
          <el-col :span="6">销量</el-col>
          <el-col :span="6">新品</el-col>
          <el-col :span="6">价格</el-col>
          <el-col :span="6">评论</el-col>
         </el-row>
       </el-col>
      </el-row>
    <el-row style="background-color: #eee;height: 24px;text-align: center;line-height: 24px">
      <div @click="show=!show"  v-show="!show">
      <i class="el-icon-third-down" ></i>
      </div>

      <div @click="show=!show" v-show="show" >
        <i class="el-icon-third-up"></i>
      </div>
    </el-row>
  </div>
</template>

<script>
  import '@/assets/base.css'
  import '@/assets/css/custom.scss'
  export default {
    name: 'HelloWorld',
    data () {
      return {
        show:true
      }
    },
    methods:{
    },
    mounted:function () {
    },
    computed: {
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import "../assets/css/custom.scss";
  .el-row{
    margin: 12px;
  }
  .grey{
    color:#999;
  }
  a:hover{
    color:#9a6e3a ;
  }

</style>
