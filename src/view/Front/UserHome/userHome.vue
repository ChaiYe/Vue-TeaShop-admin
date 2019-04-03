<template>
  <div>
    <Header></Header>
    <el-row type="flex" style="margin:40px 30px">
      <el-col :span="4" style="background: #fdfdfd;padding-bottom:170px;margin-right: 12px;border-radius: 10%;border: 1px solid #ccc" class="menu">
        <el-row type="flex"  justify="center">
          <div>
            <div class="part">
              <div class="item-header">
                <i class="el-icon-third-user"></i>
                <span>账户中心</span>
              </div>
              <ul>
                <li><router-link to="/front/userHome/center">我的中心</router-link></li>
                <li><router-link to="/front/userHome/collection">我的收藏</router-link></li>
                <li><router-link to="/front/userHome/footprint">我的足迹</router-link></li>
              </ul>
            </div>
            <div class="part">
              <div class="item-header">
                <i class="el-icon-third-transaction"></i>
                <span>交易中心</span>
              </div>
              <ul>
                <li><router-link to="/front/userHome/order/waitDelivery">待发货</router-link></li>
                <li><router-link to="/front/userHome/order/waitReceive">待收货</router-link></li>
                <li><router-link to="/front/userHome/order/waitComment">待评价</router-link></li>
              </ul>
            </div>
            <div class="part">
              <div class="item-header">
                <i class="el-icon-third-transaction"></i>
                <span>设置</span>
              </div>
              <ul>
                <li><router-link to="/front/userHome/address">地址管理</router-link></li>
                <li><router-link to="/front/userHome/headCut">头像设置</router-link></li>
                <li><router-link to="/front/userHome/userInfo">信息设置</router-link></li>
              </ul>
            </div>
          </div>
        </el-row>
      </el-col>
      <el-col :span="24" style="background: #ffffff">
        <div style="margin-top: 42px;margin-left:24px;margin-right: 24px">
          <router-view></router-view>
        </div>
      </el-col>
    </el-row>
    <Footer></Footer>
  </div>

</template>

<script>
  import Footer  from  '@/view/Front/Footer/footer.vue'
  import Header from '@/view/Front/Header/header.vue'
  import Address from '@/view/Front/UserHome/Setting/address.vue';
  import '@/assets/base.css';
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
      Header,
      Footer
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
