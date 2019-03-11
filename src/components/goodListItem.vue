<template>
  <el-row :gutter="20">
    <el-col :xs="12" :sm="12" :md="12" :lg="6"  :span="6" v-for="(o, index) in 4" :key="o" style="margin-bottom: 24px">
      <el-card class="el-card" :body-style="{ padding: '0px' }" shadow="hover">
        <img src="/static/img/商品.jpg" class="image">
        <div style="text-align: center">
          <p style="font-size: 14px;line-height: 24px;margin: 12px 24px">【邹炳良殿堂级作品】老同志普洱茶 古树茶王 2016年 生茶 乔木茶王 400g/饼</p>
          <p class="fontColorLight" style="color:#e6e6e6;font-size: small;margin:14px">高端礼品，有收藏价值</p>
          <p style="color: #c00000;margin: 14px">￥6860</p>
          <p class="kbs">
            47人好评
          </p>
          <div class="addShoppingCart">加入购物车</div>

        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      currentDate: new Date()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width:  60%;
    margin:0 auto;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .el-card{
      .addShoppingCart{
        height: 0px;
        line-height: 56px;
        background: #ff3600;
        color: #ffffff;
      }
    .kbs{
      height: 56px;
    }
    &:hover{
      transform: translateY(-3px);
      .addShoppingCart{
        height: 56px;
        transition: height .2s;
      }
      .kbs{
        height: 0;
        visibility: hidden;
        transition: height .2s;
      }
    }
  }
</style>
