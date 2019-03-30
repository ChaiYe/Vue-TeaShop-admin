<template>
  <div>
    <Header></Header>
    <el-row :gutter="20" style="margin-top: 24px">
      <el-col :span="12">
        <el-carousel :interval="5000" style="height: 400px;margin: 32px" >
          <el-carousel-item v-for="(item,o) in picList"  :key="o" style="height: 400px">
            <img :src="item.largerPic" :alt="item.largerPic">
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col :span="12" v-loading="getGoodsData==null">
        <h1 class="title" v-html="product.title"></h1>
        <p class="sub-title">{{product.subTitle}}</p>
        <hr>
        <!--价格等信息-->
        <div>
          <el-row :gutter="10">
            <el-col :span="3" class="tag-font">市场价</el-col>
            <el-col :span="21" >¥<span class="market-price left-space">{{product.marketPrice}}</span></el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="3" class="tag-font">商城价</el-col>
            <el-col :span="21">¥<span class="sale-price left-space">{{product.salePrice}}</span></el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="3" class="tag-font">促销</el-col>
            <el-col :span="21">

              <ul>
             <!--   <li  v-for="item in JSON.parse(product.salesPromotionIds)" class="promotion-item">
                  <span class="tip-text">{{ item.message }}</span>
                  {{item.content}}
                </li>-->
                <li v-if="product.salesPromotionIds==null">
                  <span class="tip-text">更多优惠敬请期待</span>
                </li>
              </ul>
            </el-col>
          </el-row>
        </div>
        <!--销售等信息-->
        <hr>
        <el-row :gutter="10">
          <el-col :span="4" class="tag-font">品牌</el-col>
          <el-col :span="4">{{product.brandName}}</el-col>
          <el-col :span="4" class="tag-font">净含量</el-col>
          <el-col :span="4">{{product.netContent}}</el-col>
          <el-col :span="4" class="tag-font">商品编号</el-col>
          <el-col :span="4">{{product.id}}</el-col>
        </el-row>
        <hr>
        <el-row :gutter="10">
          <el-col :span="3"  class="tag-font">数量</el-col>
          <el-col :span="21">
            <el-input-number v-model="num"  :min="1" label="数量"></el-input-number>
          </el-col>
        </el-row>

        <el-row type="flex" align="middle">
          <div  class="add-shopping-trolley" @click="addToCart(product.id)">加入购物车</div>
          <div >
            <i class="el-icon-star-off"  style="cursor: pointer;font-size: 36px;color:orangered;" v-if="!collectionStatus" @click="addCollection(product.id)"><span style="font-size: 24px">收藏</span></i>
            <i class="el-icon-star-on"  style="cursor: pointer;font-size: 36px;color:orangered;" v-if="collectionStatus" @click="removeCollection(product.id)"><span style="font-size: 24px">已收藏</span></i>
          </div>

        </el-row>
        <hr>
        <el-row :gutter="10">
          <el-col :span="5" class="tag-font small-tag-font">服务</el-col>
          <el-col :span="5" class="tag-font small-tag-font">90天商品保价</el-col>
          <el-col :span="5" class="tag-font small-tag-font">30天无理由退货</el-col>
          <el-col :span="5" class="tag-font small-tag-font">10分钟极速退款</el-col>
        </el-row>
      </el-col>
    </el-row>
    <hr>
    <div class="selectMode">
    <router-link :to="'/front/goods/queryForGoodsItem/detail/'+product.id" class="selectModeItem">详情描述</router-link>
    <router-link :to="'/front/goods/queryForGoodsItem/comment/'+product.id" class="selectModeItem">评论</router-link>
    </div>
    <router-view></router-view>
    <Footer></Footer>
  </div>

</template>

<script>
  import { mapActions } from 'vuex'
  import Footer  from  '@/view/Front/Footer/footer.vue'
  import Header from '@/view/Front/Header/header.vue'
  import Comment from '@/view/Front/GoodsDetails/comment.vue'
  import '@/assets/base.css'
export default {
  name: 'goodsDetail',
  data () {
    return {
      picList: [],
      num:1,
      collectionStatus:false
    }
  },
  methods:{
    ...mapActions({
      getGoodsData: 'getGoodsData',
      getCommentsData:'getCommentsData',
    }),
  /*  queryForGoods() {

      const goodsId = this.$route.params.goodsId;
      console.log("获取的商品Id"+goodsId);
      this.$http.get(this.HOST + "/sys/goods/queryForGoodsItem?goodsId="+goodsId).then((res)=> {
        console.log(res.data);
        this.product=res.data;
      }).catch( (error) =>{
        console.log(error);
      })
    },*/
  /*获取商品图片*/
    queryForPic(){
      const goodsId = this.$route.params.goodsId;
      this.$http.get(this.HOST + "/sys/pic/findGoodsPic?goodsId="+goodsId).then((res)=> {
        console.log(res.data);
        this.picList=res.data;
      }).catch( (error) =>{
        console.log(error);
      })
    },
    /*添加至购物车*/
    addToCart(itemId){
      this.$http.get(this.HOST + "/sys/cart/addCart?itemId=" + itemId + "&num=" + this.num).then(res => {
        alert("现已加入购物车,即将跳转");
        this.$router.push("/front/shoppingCart");
      }).catch(err => {
        console.log(err);
      });
    },
    /*获取商品数据*/
    getData() {
      this.product=this.$store.state.goodsData.goodsData;
    },
    addCollection(goodsId) {
      this.$http.get(this.HOST + "/sys/userCollection/saveUserCollection?goodsId=" + goodsId).then(res => {
        this.collectionStatus = true;
        console.log(res.data);
      }).catch(err => {
        console.log(err);
      });
    },
    removeCollection(goodsId) {
          this.$http.get(this.HOST + "/sys/userCollection/removeUserCollection?goodsId="+goodsId).then(res => {
            this.collectionStatus = false;
            console.log(res.data);
              }).catch(err => {
                    console.log(err);
            });
    },
    getCollectionStatus(goodsId) {
        this.$http.get(this.HOST + "/sys/userCollection/getCollectionStatus?goodsId="+goodsId).then(res => {
                this.collectionStatus=res.data;
                console.log(res.data);
            }).catch(err => {
                  console.log(err);
          });
    }
  },
  mounted(){
     this.getGoodsData(this.$route.params.goodsId);
    this.getCollectionStatus(this.$route.params.goodsId);
    this.getCommentsData(this.$route.params.goodsId);
    this.queryForPic();
  },
  computed:{
    product(){
      return this.$store.state.goodsData.goodsData;
    }
  },
  components:{
    Header,
    Footer,
    Comment
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$primaryColor:#ccc;
  $secondaryColor:#ccc;
  $tagFontColor:#ccc;
$space:3px;

.selectMode{
  width: 1240px;
  margin: 0 auto;
  font-size: 28px;
  color: #404040;
  text-align: center;
  .selectModeItem{
    padding: 12px  24px;
  }
  .collectStatus{
    cursor: pointer;
    font-size: 36px;
    color:orangered;
  }
}

  body{
    font-size: 14px;
  }

  .el-row{
    margin:12px 0;
  }

  .tag-font{
    color:$tagFontColor;
  }

  .title{
    font-size: 20px;
    color: #000;
    margin-bottom: 16px;
    font-weight: bold;
  }
  .sub-title{
    margin-bottom: 16px;
    color: #666;
  }

  hr{
    border:0;
    background-color:#ccc;
    height:1px;
  }

  .market-price{
    text-decoration: line-through;
  }

  .sale-price{
    font-weight: bold;
    color: #b60005;
    font-size: 24px;
  }
  .left-space{
    padding-left:$space;
  }

  .tip-text{
    width: 36px;
    height: 20px;
    border: 1px solid red;
    background-color: #fff;
    color: #ff3600;
    text-align: center;
    line-height: 20px;
    padding:$space;
    margin-right: $space*2;
  }

  .promotion-item{
    margin-bottom: $space*3;
  }

  .small-tag-font{
    font-size: small;
  }

  .add-shopping-trolley{
    margin-right: 24px;
    cursor: pointer;
    width: 220px;
    background-color: #ff3600;
    text-align: center;
    line-height: 45px;
    color: #e9e9e9;
    font-size: 16px;
    padding:12px 56px;
    &:hover{
      background-color: #f22c00;
      transition: all .2s;
    }

  }

</style>
