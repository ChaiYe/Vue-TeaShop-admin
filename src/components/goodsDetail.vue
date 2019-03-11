<template>

  <el-row :gutter="20">
    <el-col :span="12">
      <img src="http://element-cn.eleme.io/static/hamburger.50e4091.png" alt="茶叶商城" width="80%" >
    </el-col>
    <el-col :span="12">
      <h1 class="title">{{product.title}}</h1>
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
              <li v-for="item in product.salesPromotionId" class="promotion-item">
                <span class="tip-text">{{ item.message }}</span>
                {{item.content}}
              </li>
            </ul>
          </el-col>
        </el-row>
      </div>
      <!--销售等信息-->
      <hr>
      <el-row :gutter="10">
        <el-col :span="4" class="tag-font">品牌</el-col>
        <el-col :span="4">{{product.brandId}}</el-col>
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

      <el-row>
        <a href="#" class="add-shopping-trolley">加入购物车</a>
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
</template>

<script>
  import '@/assets/base.css'
export default {
  name: 'HelloWorld',
  data () {
    return {
      product: {
          "id": 1,
          "title": "【邹炳良殿堂级作品】老同志普洱茶古树茶王2016年生茶乔木茶王400g/饼",
          "subTitle": "高端礼品，有收藏价值",
          "marketPrice": 6860.00,
          "salePrice": 6860.00,
          "salesPromotionId": [
            {
                "message":"包邮",
                "content":"全场在线支付满59元免运费",
            },
            {
              "message":"直降",
              "content":"已优惠0.00元",
            },
          ],
          "brandId": "老同志",
          "netContent": "400克",
          "inventory": null,
          "specifications": "400g/饼",
          "shelflife": "在符合贮存条件下，适宜长期保存",
          "origin": "云南勐海",
          "process": "生普",
          "level": "特级",
          "scLicence": "NULL",
          "storageMethods": "清洁、通风、避光、干燥、无污染的环境",
          "packingSpecification": "长26.5cm*宽26.5cm*高4.3cm",
          "material": "NULL",
          "season": "NULL",
          "applicableScenario": "NULL",
          "detailed": "NULL",
          "largerPic": "NULL",
          "thumbnailPic": "NULL",
          "freight": "DEFAULT",
          "type": "DEFAULT",
          "recommended": "DEFAULT",
          "addTime": null,
          "addAdminId": null,
          "modifyTime": "NULL",
          "modifyAdminId": "NULL",
          "state": "DEFAULT"
        },
      num:1
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
$primaryColor:#ccc;
  $secondaryColor:#ccc;
  $tagFontColor:#ccc;
$space:3px;

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
    cursor: pointer;
    width: 266px;
    background-color: #ff3600;
    text-align: center;
    line-height: 50px;
    color: #e9e9e9;
    font-size: 16px;
    padding:12px 92px;
    &:hover{
      background-color: #f22c00;
      transition: all .2s;
    }

  }

</style>
