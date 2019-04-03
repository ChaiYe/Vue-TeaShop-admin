<template>
  <el-row >
   <el-row class="margin-bottom-20" type="flex" align="middle">
    <el-col :span="12">
      <el-row type="flex" justify="center" align="middle">
       <el-col :span="6">
         <div >
           <img :src="userInfo.headPortrait" height="120" width="120" style="border-radius: 50%;border: 1px solid #e0e0e0;padding: 4px;" class="img" v-if="userInfo.headPortrait!=null"/>
           <img src="/static/img/photo.jpg" height="120" width="120" style="border-radius: 50%;border: 1px solid #e0e0e0;padding: 4px;" class="img" v-if="userInfo.headPortrait==null"/>
         </div>
       </el-col>
        <el-col :span="6" :offset="1">
          <div class="xxLarger margin-bottom-1">{{userInfo.nickname}}</div>
          <div  class="fontColorLight xSmall margin-bottom-6">下午好~</div>
          <div><a href="#" class="xxSmall linkColor">修改个人信息<i class="el-icon-third-right"></i></a></div>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="12">
      <ul class="action-list">
        <li>账户安全：<span class="level level-3">较高</span></li>
        <li>绑定手机：<span class="tel">{{userInfo.phoneNumber}}</span></li>
        <li>绑定邮箱：<span class="tel">31*******0@q*.com</span></li>
      </ul>
    </el-col>
   </el-row>
    <el-row class="margin-top-20">
        <el-row class="linkHover">
          <el-col :span="12" class="margin-bottom-10">
            <el-row type="flex" justify="center" align="middle">
              <el-col :span="4" >
                <i class="el-icon-third-wallet icon" style="background:rgb(255, 103, 9) "></i>
              </el-col>
              <el-col :span="12" :offset="1">
                  <div style="font-size: larger">待支付的订单：</div>
                  <a href="#" style="font-size: x-small">查看待支付订单<i class="el-icon-third-right"></i></a>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12" class="margin-bottom-10">
            <el-row type="flex" justify="center" align="middle">
              <el-col :span="4">
                <i class="el-icon-third-car icon" style="background:rgb(139, 195, 74) "></i>
              </el-col>
              <el-col :span="12" :offset="1">
                <div style="font-size: larger">待收货的订单：</div>
                <a href="#" style="font-size: x-small">查看待收货订单<i class="el-icon-third-right"></i></a>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row type="flex" justify="center" align="middle">
              <el-col :span="4">
                <i class="el-icon-third-comment icon" style="background:rgb(33, 150, 243) "></i>
              </el-col>
              <el-col :span="12" :offset="1">
                <div style="font-size: larger">待评价商品数：</div>
                <a href="#" style="font-size: x-small">查看待评价商品<i class="el-icon-third-right"></i></a>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row type="flex" justify="center" align="middle">
              <el-col :span="4">
                <i class="el-icon-third-heart icon" style="background:rgb(255, 103, 9) "></i>
              </el-col>
              <el-col :span="12" :offset="1">
                <div style="font-size: larger">喜欢的商品：</div>
                <a href="#" style="font-size: x-small">查看喜欢的商品<i class="el-icon-third-right"></i></a>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
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
        userInfo: null
      }
    },
    methods:{
      queryUserInfo() {
          this.$http.get(this.HOST + "/sys/user/getUserInfo").then(res => {
                  console.log(res.data);
                  this.userInfo= res.data;
              }).catch(err => {
                    console.log(err);
            });
      }

    },
    mounted:function () {
      this.queryUserInfo();
    },
    computed: {
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import "../../../assets/css/custom.scss";
.action-list li{
  color: #757575;
  font: 14px/1.5 "Helvetica Neue",Helvetica,Arial,"Microsoft Yahei","Hiragino Sans GB","Heiti SC","WenQuanYi Micro Hei",sans-serif;
  padding-bottom:12px;
}
  .icon{
    font-size: 45px;
    color: white;
    padding: 24px;
    border-radius: 50%;
  }
</style>
