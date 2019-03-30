<template>
  <div>
    <el-row class="goodsDescWrapper">
      <el-col :span="8" class="goodsDescItem" v-if="productItem.netContent"><div>净含量:{{productItem.netContent}}</div></el-col>
      <el-col :span="8" class="goodsDescItem" v-if="productItem.netContent"><div>规格:{{productItem.netContent}}</div></el-col>
      <el-col :span="8" class="goodsDescItem" v-if="productItem.shelflife"><div>保质期:{{productItem.shelflife}}</div></el-col>
      <el-col :span="8" class="goodsDescItem" v-if="productItem.origin"><div>产地:{{productItem.origin}}</div></el-col>
      <el-col :span="8" class="goodsDescItem" v-if="productItem.process"><div>等级:{{productItem.process}}</div></el-col>
      <el-col :span="8" class="goodsDescItem" v-if="productItem.scLicence"><div>生产许可证:{{productItem.scLicence}}</div></el-col>
      <el-col :span="8" class="goodsDescItem" v-if="productItem.storageMethods"><div>存储方法:{{productItem.storageMethods}}</div></el-col>
      <el-col :span="8" class="goodsDescItem" v-if="productItem.packingSpecification"><div>包装规格:{{productItem.packingSpecification}}</div></el-col>
      <el-col :span="8" class="goodsDescItem" v-if="productItem.material"><div>材质:{{productItem.material}}</div></el-col>
      <el-col :span="8" class="goodsDescItem" v-if="productItem.applicableScenario"><div>适用场景:{{productItem.applicableScenario}}</div></el-col>
    </el-row>
    <el-row type="flex" align-="middle" justify="center">
      <div v-html="productItem.detailed" style="width: 900px;margin: 0 auto"></div>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "goodsDesc",
        data(){
          return{
            productItem: [100]
          }
        },
        methods:{
          getGoodsData() {
            this.productItem=this.$store.state.goodsData.goodsData;
          }
        },
      mounted(){
        this.getGoodsData();
      }
    }
</script>

<style scoped>
  .goodsDescWrapper{
    width: 1240px;
    margin: 0 auto;
    margin-top: 45px;
  }
.goodsDescItem{
  margin-bottom: 24px;
  padding-left: 24px ;
  color: #888;
}
</style>
