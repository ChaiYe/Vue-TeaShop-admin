<template>
  <el-row style="padding: 42px 32px 32px;background-color: #eee">
    <el-row style="padding: 0 0 32px;" type="flex" align="middle">
    <el-col :span="18">
      <el-row :gutter="10" type="flex ">

        <el-col :span="4">
          <dl>
            <dt>购物指南</dt>
            <dd>购物保障</dd>
            <dd>企业用户</dd>
            <dd>政策</dd>
          </dl>
        </el-col>
        <el-col :span="4">
          <dl>
            <dt>配送方式</dt>
            <dd>快递资费</dd>
            <dd>配送时间</dd>
            <dd>配送范围</dd>
            <dd>验货签收</dd>
          </dl>
        </el-col>
        <el-col :span="4">
          <dl>
            <dt>支付方式</dt>
            <dd>货到付款</dd>
            <dd>在线支付</dd>
            <dd>网银在线</dd>
            <dd>银行转账</dd>
          </dl>
        </el-col>
        <el-col :span="4">
          <dl>
            <dt>售后服务</dt>
            <dd>退换货原则</dd>
            <dd>退换货要求</dd>
            <dd>运费规则</dd>
            <dd>退换货流程</dd>
          </dl>
        </el-col>
        <el-col :span="4">
          <dl>
            <dt>关于我们</dt>
            <dd>动态</dd>
            <dd>合作品牌</dd>
            <dd>媒体</dd>
          </dl>
        </el-col>
        <el-col :span="4">
          <dl>
            <dt>更多</dt>
            <dd>网点</dd>
            <dd>店铺分布</dd>
          </dl>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="6">
      <el-row type="flex" justify="center">
        <el-col offset="2">
          <div style="font-size: x-large;margin-bottom: 12px">15768726472</div>
          <div style="font-size:small;color:#ccc;margin-bottom: 12px">周一到周日10:00-23:00</div>
          <el-button type="primary" >在线帮助</el-button>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
    <hr style="height: 1px;border:none;background-color: #cccccc">
    <el-row style="margin-top: 46px;font-size:small;color:#555">
      Copyright ©2017, exrick.cn Co., Ltd. All Rights Reserved.
    </el-row>
  </el-row>
</template>

<script>
  import '@/assets/base.css'
  import '@/assets/css/custom.scss'
  export default {
    name: 'HelloWorld',
    data () {
      return {
        show:true,
        search:'',
        scrolled: ''
      }
    },
    methods:{
      handleScroll () {

      }
    },
    mounted:function () {
    },
    computed: {

    },
    ready(){


    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import "../assets/css/custom.scss";
  dl {
    font-size: 12px;
    dt{
      line-height: 48px;
      color:#333;
    }
    dd{
      line-height: 24px;
      color: #999;
    }
  }
</style>
