<template>
  <el-row type="flex">
    <el-col :span="4" style="background: #e6e5ff;padding-bottom:170px;margin-right: 12px" class="menu">
      <el-row type="flex"  justify="center">
        <div>
          <div class="part">
            <div class="item-header">
              <i class="el-icon-third-user"></i>
              <span>账户中心</span>
            </div>
            <ul>
              <li><a href="">我的中心</a></li>
              <li><a>我的收藏</a></li>
              <li><a>我的足迹</a></li>
              <li><a>安全管理</a></li>
            </ul>
          </div>
          <div class="part">
            <div class="item-header">
              <i class="el-icon-third-transaction"></i>
              <span>交易中心</span>
            </div>
            <ul>
              <li><a>我的订单</a></li>
              <li><a href="#">待发货</a></li>
              <li><a href="#">待收货</a></li>
              <li><a href="#">待评价</a></li>
            </ul>
          </div>
          <div class="part">
            <div class="item-header">
              <i class="el-icon-third-transaction"></i>
              <span>设置</span>
            </div>
            <ul>
              <li><a>个人信息</a></li>
              <li><a href="#">地址管理</a></li>
              <li><a href="#">安全管理</a></li>
            </ul>
          </div>
        </div>
      </el-row>
    </el-col>
    <el-col :span="24" style="background: #ffffff">
      <div style="margin-top: 42px;margin-left:24px;margin-right: 24px">
        <Address></Address>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import Address from  '@/components/HelloWorld8'
  import '@/assets/base.css'
  export default {
    name: 'HelloWorld',
    data () {
      return {
      }
    },
    methods:{

    },
    mounted:function () {
    },
    computed: {
    },
    components:{
      Address
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.menu{
  ul{
    li{
      a{
        color: #757575;
        line-height: 32px;
        margin-top: 5px;
        font-size: 14px;
        &:active{
          color: #ff3600;
        }
      }
    }

  }
  .part{
    padding-top: 40px;
    .item-header{
      margin-left: -20px;
    }
  }

}
</style>
