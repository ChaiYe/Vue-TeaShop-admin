<template>
  <el-row>
    <Header></Header>
   <!-- <div :class="{active:scrolled>150}" class="top">
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
    </div>-->
    <el-row style="margin: 24px 32px 45px">
      <el-row>
        <el-carousel height="500px">
          <el-carousel-item v-for="(item,index) in imageList"  :key="index" v-loading="imageList.length==0">
           <img :src="item.url" width="100%" >
          </el-carousel-item>
        </el-carousel>
      </el-row>
      <el-row :gutter="10" style="margin-top:24px" v-show="imageList.length!=0">
        <el-col :span="6">
          <img src="/static/img/drink.jpg" alt="" style="width: 100%;">
        </el-col>
        <el-col :span="6">
          <img src="/static/img/brand.jpg" alt="" style="width: 100%;">
        </el-col>
        <el-col :span="6">
          <img src="/static/img/select.jpg" alt="" style="width: 100%;">
        </el-col>
        <el-col :span="6">
          <img src="/static/img/m2o.jpg" alt="" style="width: 100%;">
        </el-col>
      </el-row>

      <HomePageInfo :infoList="infoList1" header="自饮"></HomePageInfo>
      <HomePageInfo :infoList="infoList2" header="送礼"></HomePageInfo>
      <HomePageInfo :infoList="infoList3" header="茶器推荐"></HomePageInfo>
    </el-row>
    <Footer></Footer>
  </el-row>
</template>

<script>
  import HomePageInfo  from  '@/view/Front/HomePage/homepageInfo.vue'
  import Footer  from  '@/view/Front/Footer/footer.vue'
  import Header from '@/view/Front/Header/header.vue'
  import '@/assets/base.css'
  import '@/assets/css/custom.scss'
  export default {
    name: 'HelloWorld',
    data () {
      return {
        show:true,

        scrolled: '',
        head3:'茶器',
        imageList:[],
        infoList1:[],
        infoList2:[],
        infoList3:[],
      }
    },
    methods:{
      handleScroll (e) {
        this.scrolled = window.scrollY;
          //console.log(this.scrolled);
      },

      /*获取轮播图*/
      getCarousel(){
        console.log("请求");
        this.$http.get(this.HOST + "/sys/carousel/carouselActive").then(response =>{
          this.imageList=response.data;
          console.log(imageList);
        }).catch(function (error) {
          console.log(error);
        });

      },

      /*获取推荐自饮数据*/
      getRecommendByType1() {
        console.log("请求");
        this.$http.get(this.HOST + "/sys/goods/getRecommend?type="+1).then(response =>{
          this.infoList1=response.data;
        }).catch(function (error) {
          console.log(error);
        });
      },

      /*获取推荐自饮数据*/
      getRecommendByType2() {
        console.log("请求");
        this.$http.get(this.HOST + "/sys/goods/getRecommend?type="+2).then(response =>{
          this.infoList2=response.data;
        }).catch(function (error) {
          console.log(error);
        });
      },

      /*获取推荐茶具数据*/
      getRecommendByType3() {
        console.log("请求");
        this.$http.get(this.HOST + "/sys/goods/getRecommend?type="+3).then(response =>{
          this.infoList3=response.data;
        }).catch(function (error) {
          console.log(error);
        });
      },




    },
    mounted:function () {
      window.addEventListener('scroll', this.handleScroll,true);
      this.getCarousel();
      setTimeout(this.getRecommendByType1(),100);
      setTimeout(this.getRecommendByType2(),100);
      setTimeout(this.getRecommendByType3(),100);
    },
    computed: {

    },
    ready(){

    },
    components:{
      Footer,
      HomePageInfo,
      Header
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import "../../../assets/css/custom";
  i{
    font-size: 18px;
  }
 /* .active{
    position: fixed;
    top: 0px;
    right: 0px;
    z-index: 100;
  }*/
  .disabled{
    position: static;
  }
  .top{
    background: #f7f7f7;
    padding:12px;
  }

</style>
