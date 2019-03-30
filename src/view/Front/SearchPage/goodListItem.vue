<template>

  <el-row :gutter="20" style="margin: 24px 48px">
    <div v-if="dataList.length<1">暂无相关数据,建议切换搜索关键字</div>
    <el-col :xs="12" :sm="12" :md="12" :lg="6"  :span="6" v-for="(item, index) in dataList" :key="item.id" style="margin-bottom: 24px;cursor: pointer">
      <el-card class="el-card" :body-style="{ padding: '0px' }" shadow="hover">
        <img :src="item.largerPic" class="image" @click="queryForItem(item.id)" width="200px" height="200px">
        <div style="text-align: center" @click="queryForItem(item.id)">
          <p style="font-size: 14px;line-height: 24px;margin: 12px 24px;height: 48px" v-html="item.title"></p>
          <p class="fontColorLight" style="color:#e6e6e6;font-size: small;margin:14px;height: 24px">{{item.subTitle}}</p>
          <p style="color: #c00000;margin: 14px">￥{{item.salePrice}}</p>
          <p class="kbs">
            0人好评
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
  },
  methods:{
    //查询商品详情
    queryForItem(id){
      alert(id);
      this.$router.push({path:'/front/goods/queryForGoodsItem/detail/'+id})
    }
  },
  props:{
    dataList:Array,
  },
  watch:{
    dataList(curVal,oldVal) {
      console.log("新数据");
      if(curVal){
        this.dataList=curVal;
      }
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
