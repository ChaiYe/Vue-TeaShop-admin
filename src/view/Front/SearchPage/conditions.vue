<template>
  <div class="category-list" style="text-align: center">
    <el-row :gutter="10"  align="middle" type="flex">
       <el-col :span="2" class="grey">品类:</el-col>
        <el-col :span="22">
          <el-row :gutter="10" >
           <el-col :span="2" v-for="item in sameList" :key="item.id"><span class="link" :class="{ activeItem: teaTaste==item.id }" @click="changeSearch(item.id)">{{item.name}}</span></el-col>
          </el-row>
        </el-col>
      </el-row>
    <hr style="background-color: #eee;height: 1px;border: none">
    <div v-if="infoMap!=null">
      <el-row :gutter="10" align="middle" type="flex">
        <el-col :span="2" class="grey">品牌:</el-col>
        <el-col :span="22">
          <el-row :gutter="10">
            <el-col :span="2"><span :class="{ active:  selectInfo.brand==null}" class="link" @click="changState('brand',null)">全部</span></el-col>
            <el-col :span="2"  v-for="item in infoMap['品牌']" :key="item.brandId">
              <span class="link" @click="changState('brand',item.brandId)" :class="{ activeItem: item.brandId== selectInfo.brand}">{{item.brandName}}</span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>

   <!-- <el-row :gutter="10" align="middle" type="flex">
       <el-col :span="2" class="grey">净含量:</el-col>
        <el-col :span="22">
          <el-row :gutter="10">
           <el-col :span="2">10</el-col>
           <el-col :span="2">10</el-col>
           <el-col :span="2">10</el-col>
           <el-col :span="2">10</el-col>
           <el-col :span="2">10</el-col>
          </el-row>
        </el-col>
      </el-row>-->
    <div v-if="infoMap!=null">
    <el-row :gutter="10" align="middle" type="flex">
      <el-col :span="2" class="grey">等级:</el-col>
      <el-col :span="22">
        <el-row :gutter="10">
          <el-col :span="2"><span :class="{ activeItem:  selectInfo.level==null}" class="link" @click="changState('level',null)">全部</span></el-col>
          <el-col :span="2"  v-for="item in infoMap['等级']" :key="item">
            <span class="link" @click="changState('level',item)" :class="{ activeItem: item== selectInfo.level}">{{item}}</span>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    </div>
    <div v-if="infoMap!=null">
      <el-row :gutter="10" align="middle" type="flex">
        <el-col :span="2" class="grey">价格:</el-col>
        <el-col :span="22">
          <el-row :gutter="10">
            <el-col :span="2"><span :class="{ activeItem:  selectInfo.priceLow==null}" class="link" @click="changState2(null,null)">全部</span></el-col>
            <el-col :span="2">
              <span class="link" @click="changState2(0,200)" :class="{ activeItem: 0== selectInfo.priceLow}">0-200</span>
            </el-col>
            <el-col :span="2">
              <span class="link" @click="changState2(201,500)" :class="{ activeItem: 201 == selectInfo.priceLow}">201-500</span>
            </el-col>
            <el-col :span="2">
              <span class="link" @click="changState2(501,1000)" :class="{ activeItem: 501== selectInfo.priceLow}">501-1000</span>
            </el-col>
            <el-col :span="2">
              <span class="link" @click="changState2(1001,2000)" :class="{ active: 1001== selectInfo.priceLow}">1001-2000</span>
            </el-col>
            <el-col :span="2">
              <span class="link" @click="changState2(2000)" :class="{ activeItem: 2000== selectInfo.priceLow}">2000以上</span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>

    <el-collapse-transition>
    <div v-show="show" >
      <el-row :gutter="10" align="middle" type="flex">
        <el-col :span="2" class="grey">品牌:</el-col>
        <el-col :span="22">
          <el-row :gutter="10">
            <el-col :span="2">10</el-col>
            <el-col :span="2">10</el-col>
            <el-col :span="2">10</el-col>
            <el-col :span="2">10</el-col>
            <el-col :span="2">10</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="10" align="middle" type="flex">
        <el-col :span="2" class="grey">品牌:</el-col>
        <el-col :span="22">
          <el-row :gutter="10">
            <el-col :span="2">10</el-col>
            <el-col :span="2">10</el-col>
            <el-col :span="2">10</el-col>
            <el-col :span="2">10</el-col>
            <el-col :span="2">10</el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    </el-collapse-transition>
    <el-row align="middle" type="flex">
       <el-col :span="6" :push="18" >
         <el-row>
          <el-col :span="6">销量</el-col>
          <el-col :span="6">新品</el-col>
          <el-col :span="6">价格</el-col>
          <el-col :span="6">评论</el-col>
         </el-row>
       </el-col>
      </el-row>
    <el-row style="background-color: #eee;height: 24px;text-align: center;line-height: 24px">
      <div @click="show=!show"  v-show="!show">
      <i class="el-icon-third-down" ></i>
      </div>

      <div @click="show=!show" v-show="show" >
        <i class="el-icon-third-up"></i>
      </div>
    </el-row>
  </div>
</template>

<script>
  import '@/assets/base.css'
  import '@/assets/css/custom.scss'
  export default {
    name: 'HelloWorld',
    data () {
      return {
        teaTaste:null,
        show:true,
        /*品类*/
        sameList:null,
        /*筛选信息列表*/
        infoMap:null,
        /*筛选的信息*/
        selectInfo:{
          brand:null,
          level:null,
          priceLow:null,
          priceHigh:null,
        },
      }
    },
    methods:{
      /*该类目下的所有品牌*/
      queryInfo() {
        let teaTasteId = this.$route.params.teaTasteId;

        this.$http.get(this.HOST+"/sys/teaTaste/selectInfo?teaTasteId="+teaTasteId).then((res) => {
          this.infoMap = res.data;
        }).catch((err) => {
          console.log(err);

        });
      },
      /*该类目相同级别的类目*/
      querySame() {
        let teaTasteId = this.$route.params.teaTasteId;
        this.$http.get(this.HOST+"/sys/teaTaste/findSameCategory?id="+teaTasteId).then((res) => {
          this.sameList = res.data
        }).catch((err) => {
          console.log(err);
        });
      },
      changState(prop,value){
        this.selectInfo[prop] = value;
      },
      changState2(low,high){
        this.selectInfo.priceLow = low;
        this.selectInfo.priceHigh = high;
      },
      changeSearch(id){
        this.$router.push(  '/front/searchByTeaTeast/'+id );
      }
    },
    mounted:function () {
      this.teaTaste=this.$route.params.teaTasteId;
      this.queryInfo();
      this.querySame();
    },
    computed: {
    },
    watch:{
      '$route.params': function (newValue) {
        this.teaTaste=this.$route.params.teaTasteId;
        this.queryInfo();
        this.querySame();
      },
      'selectInfo.brand':function(newValue){
        this.$emit("queryCondition",this.selectInfo);
        console.log(this.selectInfo);
      },
      'selectInfo.level':function (newValue) {
        this.$emit("queryCondition",this.selectInfo);
      },
      'selectInfo.priceLow':function (newValue) {
        this.$emit("queryCondition",this.selectInfo)
      }


    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import "../../../assets/css/custom";
  .el-row{
    margin: 12px;
  }
  .grey{
    color:#999;
  }
  a:hover{
    color:#9a6e3a ;
  }
  .link{
    cursor: pointer;
  }
  .activeItem{
    color:#ff3600;
  }

</style>
