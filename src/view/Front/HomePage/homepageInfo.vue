<template>
  <div>
    <div style="font-size:24px;margin:12px 42px">{{header}} </div>
   <!-- <div class="wrapper">

      <div style="background-color: #cccccc;margin:12px" class=" one">One</div>
      <div style="background-color: #cccccc;margin:12px" class=" two">
        <el-card class="el-card" :body-style="{ padding: '0px' }" shadow="hover">
          <img src="http://element-cn.eleme.io/static/hamburger.50e4091.png" class="image">
          <div style="text-align: center">
            <p>【邹炳良殿堂级作品】老同志普洱茶 古树茶王 2016年 生茶 乔木茶王 400g/饼</p>
            <p class="fontColorLight" style="color:#e6e6e6;font-size: small">高端礼品，有收藏价值</p>
            <p style="color: #c00000;">￥6860</p>

          </div>
        </el-card>
      </div>
      <div style="background-color: #cccccc;margin:12px" class=" three">
        <el-card class="el-card" :body-style="{ padding: '0px' }" shadow="hover">
          <img src="http://element-cn.eleme.io/static/hamburger.50e4091.png" class="image">
          <div style="text-align: center">
            <p>【邹炳良殿堂级作品】老同志普洱茶 古树茶王 2016年 生茶 乔木茶王 400g/饼</p>
            <p class="fontColorLight" style="color:#e6e6e6;font-size: small">高端礼品，有收藏价值</p>
            <p style="color: #c00000;">￥6860</p>
          </div>
        </el-card>
      </div>
      <div style="background-color: #cccccc;margin:12px" class=" four">
        <h3>送礼锦囊</h3>
        <hr style="height: 1px;border:none;background-color: #cccccc">
      </div>
      <div style="background-color: #cccccc;margin:12px;padding:36px" class="five">
        <div style="display:flex;align-items: center;justify-content: center">
          <div style="height: 100px;margin: 24px 12px;">
            <h3 style="font-size: 22px;margin-bottom: 12px">浏览更多</h3>
            <span>不懂如何送礼，让你头疼这里有一只锦囊！</span>
          </div>
          <div>
            <i class="el-icon-third-swap-right" style="font-size:24px"></i>
          </div>
        </div>
      </div>
      <div style="background-color: #cccccc;margin:12px" class=" six">
        <el-card class="el-card" :body-style="{ padding: '0px' }" shadow="hover">
          <img src="http://element-cn.eleme.io/static/hamburger.50e4091.png" class="image">
          <div style="text-align: center">
            <p>【邹炳良殿堂级作品】老同志普洱茶 古树茶王 2016年 生茶 乔木茶王 400g/饼</p>
            <p class="fontColorLight" style="color:#e6e6e6;font-size: small">高端礼品，有收藏价值</p>
            <p style="color: #c00000;">￥6860</p>

          </div>
        </el-card>
      </div>
      <div style="background-color: #cccccc;margin:12px" class=" seven">
        <el-card class="el-card" :body-style="{ padding: '0px' }" shadow="hover">
          <img src="http://element-cn.eleme.io/static/hamburger.50e4091.png" class="image">
          <div style="text-align: center">
            <p>【邹炳良殿堂级作品】老同志普洱茶 古树茶王 2016年 生茶 乔木茶王 400g/饼</p>
            <p class="fontColorLight" style="color:#e6e6e6;font-size: small">高端礼品，有收藏价值</p>
            <p style="color: #c00000;">￥6860</p>

          </div>
        </el-card>
      </div>
      <div style="background-color: #cccccc;margin:12px;padding:36px" class=" eight">
        <div style="display:flex;align-items: center;justify-content: center">
          <div style="height: 100px;margin: 24px 12px;">
            <h3 style="font-size: 22px;margin-bottom: 12px">浏览更多</h3>
            <span>不懂如何送礼，让你头疼这里有一只锦囊！</span>
          </div>
          <div>
            <i class="el-icon-third-swap-right" style="font-size:24px"></i>
          </div>
        </div>
      </div>
    </div>-->
    <div style="display: flex;flex-flow: row wrap;justify-content: center;" :class="{loading:infoList==null||infoList.length==0}" v-loading="infoList==null||infoList.length==0">
       <div v-for="item in infoList" style="flex: 0 0 18%;margin:24px">
      <el-card class="el-card card" :body-style="{ padding: '0px' }" shadow="hover" @click.native="queryForItem(item.id)">
        <img :src="item.largerPic" width="200px" style="margin: 32px" >
        <a style="text-align: center;display: block">
          <p v-html="item.title" style="margin:14px" class="overhiddenTwo"></p>
          <p class="fontColorLight overhiddenOne" style="color:#e6e6e6;font-size: small;margin:12px 18px" >{{item.subTitle}}</p>
          <p style="color: #c00000;margin: 14px">￥{{item.salePrice}}</p>
        </a>
      </el-card>
    </div>
    </div>
  </div>

</template>

<script>
  import '@/assets/base.css'
  import '@/assets/css/custom.scss'
  export default {
    name: 'HelloWorld',
    data () {
      return {

      }
    },
    methods:{

      handleScroll () {

      },
      queryForItem(id){
        alert(id);
        this.$router.push({path:'/front/goods/queryForGoodsItem/detail/'+id})
      }
    },
    mounted:function () {
    },
    computed: {

    },
    props:{
      infoList: Array,
      header:String,
    },
    watch:{
      infoList(curVal,oldVal) {
        if(curVal){
          this.infoList=curVal;
        }
      }
    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import "../../../assets/css/custom";
  .loading{
    height: 500px;
  }
   .wrapper{
     display: grid;
     grid-template-columns: repeat(4, 1fr);
     grid-gap: 10px;
     grid-auto-rows: minmax(100px, auto);
   }
  .one {
    grid-column: 1 ;
    grid-row:1/4;
  }
  .two {
    grid-column: 2;
    grid-row: 1/3;
  }
  .three {
    grid-column: 3;
    grid-row: 1/3;
  }
  .four {
    grid-column: 4;
    grid-row: 1/4;
  }
  .five {
    grid-column:1 ;
    grid-row: 4;
  }
  .six {
    grid-column: 2;
    grid-row: 3/5;
  }
  .seven {
    grid-column: 3;
    grid-row: 3/5;
  }
  .eight{
    grid-column:4/5;
    grid-column: 4;
  }
  .image {
    width: 100%;
    display: block;
  }
  .overhiddenTwo{
    height: 3em;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .overhiddenOne{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  .card{
    cursor: pointer;
  }
</style>
