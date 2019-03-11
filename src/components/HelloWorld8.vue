<template>
  <el-row>
    <el-row class="title">收货地址</el-row>
    <el-row :gutter="10" class="total">
      <el-col :span="6">
        <el-row class="item" type="flex" align="middle" justify="center">
          <i class="el-icon-third-plus-circle-fill" style="font-size: 32px;color: lightgray"></i>
        </el-row>
      </el-col>
      <el-col :span="6">
        <el-row class="item">
          <h3 class="username">{{username}}</h3>
          <p class="phoneNumber">{{phoneNumber}}</p>
          <p class="address">{{address}}</p>
          <div style="float: right;" class="operator">
            <a href="#">修改</a>
            <a href="#">删除</a>
          </div>
        </el-row>
      </el-col>
      <el-col :span="6">
        <el-row class="item">
          <h3 class="username">{{username}}</h3>
          <p class="phoneNumber">{{phoneNumber}}</p>
          <p class="address">{{address}}</p>
          <div style="float: right;" class="operator">
            <a href="#">修改</a>
            <a href="#">删除</a>
          </div>
        </el-row>
      </el-col>
      <el-col :span="6">
        <el-row class="item">
          <h3 class="username">{{username}}</h3>
          <p class="phoneNumber">{{phoneNumber}}</p>
          <p class="address">{{address}}</p>
          <div style="float: right;" class="operator">
            <a href="#">修改</a>
            <a href="#">删除</a>
          </div>
        </el-row>
      </el-col>
      <el-col :span="6">
        <el-row class="item">
          <h3 class="username">{{username}}</h3>
          <p class="phoneNumber">{{phoneNumber}}</p>
          <p class="address">{{address}}</p>
          <div style="float: right;" class="operator">
            <a href="#">修改</a>
            <a href="#">删除</a>
          </div>
        </el-row>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>

  export default {
    name: 'HelloWorld',
    data () {
      return {
        username:'陈福铿',
        phoneNumber: '157****6472',
        address:'广东 茂名市 茂南区 茂南开发区袂花镇上文礼村 (525011)'
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
    a{
      text-decoration: none;
      color: gray;
    }
    .title{
      font-size: 30px;
      font-weight: 400;
      line-height: 68px;
      color: #757575;
    }
    .total{
      .el-col{
        margin-bottom: 24px;
      }
    }
  .item{
    height: 210px;
    border: 1px solid lightgray;
    padding: 15px 24px 0;
    .username{
      font-size: 18px;
      color: #333;
      margin-bottom: 10px;
    }
    .address{
      line-height: 22px;
      color: #757575;
      font-size: 14px;

    }
    .phoneNumber{
           line-height: 22px;
           color: #757575;
     }
    .operator{
      visibility: hidden;
    }
    &:hover{

      border-color: darken(lightgray,15%);
      .operator{
        visibility: visible;
        color:#ff3600 ;
      }
    }
  }

</style>
