<template>
  <el-row>
    <div style="background: #ccc;padding:12px 0">
      <el-row type="flex" align="middle">
        <el-col :span="12"  :push="1" class="brand-icon">你好</el-col>
        <el-col :span="9" >
          <div style="display: flex;align-items: center">
            <el-input v-model="search" placeholder="请输入商品信息" suffix-icon="el-icon-search"></el-input>
          </div>
        </el-col>

        <el-col :span="6" style="display: flex;align-items: center">
          <div style="margin-left:24px">全部商品</div>
          <i class="el-icon-third-user" style="margin-left: 36px;font-size: 22px"></i>
          <i class="el-icon-goods" style="margin-left: 36px;font-size: 22px"></i>
        </el-col>
      </el-row>
    </div>
    <div :class="{active:scrolled>150}" class="top">
      <el-row type="flex" align="middle" justify="center" style="height: 42px">
      <el-col :span="18" >
         <el-row style="margin: 0 32px" type="flex">
        <el-col>首页</el-col>
        <el-col>全部商品</el-col>
        <el-col>推荐</el-col>
        <el-col>自饮</el-col>
        <el-col>送礼</el-col>
        <el-col>茶器</el-col>
      </el-row>
      </el-col>
     <el-col :span="6" :push="2" style="display: flex;align-items: center">
        <i class="el-icon-third-user" style="margin-left: 36px;font-size: 22px"></i>
        <i class="el-icon-goods" style="margin-left: 36px;font-size: 22px"></i>
      </el-col>
    </el-row>
    </div>
    <el-row style="margin: 24px 32px 45px">
      <el-row>
        <el-carousel>
          <el-carousel-item v-for="(item,index) in imageList"  :key="index" >
           <img :src="item.url" >
          </el-carousel-item>
        </el-carousel>
      </el-row>
      <el-row :gutter="10" style="margin-top:24px">
        <el-col :span="6">
          <img src="/static/img/20190216列表广告.jpg" alt="" style="width: 100%;">
        </el-col>
        <el-col :span="6">
          <img src="/static/img/20190216列表广告.jpg" alt="" style="width: 100%;">
        </el-col>
        <el-col :span="6">
          <img src="/static/img/20190216列表广告.jpg" alt="" style="width: 100%;">
        </el-col>
        <el-col :span="6">
          <img src="/static/img/20190216列表广告.jpg" alt="" style="width: 100%;">
        </el-col>
      </el-row>
      <HomePageInfo></HomePageInfo>
      <HomePageInfo></HomePageInfo>
      <HomePageInfo></HomePageInfo>
    </el-row>
    <Footer></Footer>
  </el-row>
</template>

<script>
  import HomePageInfo  from  '@/components/homepageInfo'
  import Footer  from  '@/components/footer'
  import '@/assets/base.css'
  import '@/assets/css/custom.scss'
  export default {
    name: 'HelloWorld',
    data () {
      return {
        show:true,
        search:'',
        scrolled: '',
        imageList:[{
          url:'/static/img/20190216列表广告.jpg',
          desc:'描述'
        },{
          url:'/static/img/名匠馆.jpg',
          desc:'描述'
        }, {
            url:'/static/img/品牌集成馆.jpg',
            desc:'描述'
          }
        ]
      }
    },
    methods:{
      handleScroll (e) {
        this.scrolled = window.scrollY;
          console.log(this.scrolled);
      }
    },
    mounted:function () {
      window.addEventListener('scroll', this.handleScroll,true);
    },
    computed: {

    },
    ready(){
      //window.addEventListener('scroll', this.handleScroll,true);
    },
    components:{
      Footer,
      HomePageInfo
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import "../assets/css/custom.scss";
  i{
    font-size: 18px;
  }
  .active{
    position: fixed;
    top: 0px;
    right: 0px;
    z-index: 100;
  }
  .disabled{
    position: static;
  }
  .top{
    background: #f7f7f7;
    padding:12px;
  }

</style>
