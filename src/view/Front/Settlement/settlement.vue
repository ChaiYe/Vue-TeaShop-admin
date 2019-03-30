<template>
  <div>
    <Header></Header>
    <div class="wrapperItem">
      <div>
        {{orderItem}}
        <div v-if="addressList.length==0">请添加地址</div>
        <el-row>
          <span class="settlementTitle">收货地址</span>

          <el-col :span="6"  v-if="addressList.length>0" v-for="entity in addressList" :key="entity.id">

            <div class="item addressItem" :class="{addressActive:entity.id==orderItem.selectAddress.id}" @click="selectAddressMethod(entity)">
              <h3 class="username"  >{{entity.consignee}}</h3>
              <p class="phoneNumber">{{entity.phoneNumber}}</p>
              <p class="address">{{entity.provinceName+" "+entity.cityName+" "+entity.areaName}}</p>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <span class="settlementTitle">支付方式</span>
          <span></span>
          <el-row>
            <div>
              <div class="paytype" :class="{paytypeActive:payType=='online'}" @click="selectPayType('online')">在线支付</div>
              <div class="paytype" :class="{paytypeActive:payType=='offline'}" @click="selectPayType('offline')"> 货到付款</div>
            </div>

          </el-row>
        </el-row>

        <el-row>
          <span class="settlementTitle">商品信息</span>
          <el-row>
            <el-table :data="orderItem.orderdata" ref="shoppingCart" style="border: 24px">
              <template slot="empty">
                空空如也
              </template>
              <el-table-column
                header-align="center"
                align="center"
                width="100"
              >
                <template slot-scope="scope">
                  <!-- {{scope.row.largerPic}}-->
                  <img :src="scope.row.largerPic" width="100px" height="100px"/>
                </template>
              </el-table-column>

              <el-table-column
                header-align="center"
                align="center"

                label="商品名称"
                width="350"
              >
                <!-- prop="goodsTitle"-->
                <template slot-scope="scope">
                  <span v-html="scope.row.goodsTitle"></span>
                </template>
              </el-table-column>
              <el-table-column
                header-align="center"
                align="center"
                prop="unitPrice"
                label="价格"
              >
              </el-table-column>
              <el-table-column
                header-align="center"
                align="center"
                label="数量"
              >
                <template slot-scope="scope">
                  <span>{{scope.row.unitNum}}</span>
                </template>
              </el-table-column>
              <el-table-column
                header-align="center"
                align="center"
                label="小计"
              >
                <template slot-scope="scope">
                  {{scope.row.unitPrice*scope.row.unitNum}}
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </el-row>
      </div>
      <el-row style="margin-top: 20px;margin-bottom: 20px">
        <el-col :offset="18" :span="6">
          <div >
            <span class="cartRight" >金额总计</span>
            <span class="redStyle">￥ {{countPrice}}</span>
          </div>
          <div >
            <span class="cartRight">运费</span>
            <span class="redStyle">￥{{freight}}</span>
          </div>
          <div >
            <span class="cartRight">应付金额</span>
            <span class="redStyle" style="font-size: 22px;color:red">￥{{countPrice+freight}}</span>
          </div>
        </el-col>
      </el-row>
      <hr>
      <el-row >
        <el-col :offset="18" :span="6" >
          <div @click="toPay" class="payButton">支付</div>
        </el-col>
      </el-row>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
    import Header from  '@/view/Front/Header/header.vue'
    import  Footer  from  '@/view/Front/Footer/footer.vue'
    export default {
      name: "settlement",
      data(){
        return{
          addressList:[],
          orderItem:{
            orderdata:null,
            selectAddress: null,
            price:null,
          },
          payType: 'online',
          freight:10,
        }
      },
      methods:{
        selectAddressMethod(item){
          this.orderItem.selectAddress = item;
        },
        queryAddress(){
          alert("获取地址");
         this.$http.get(this.HOST + "/sys/address/userAddress",this.orderItem).then( (res)=> {
            console.log(res.data);
           this.addressList= res.data;
           this.orderItem.selectAddress = this.addressList[0];
          }).catch((err)=> {
            console.log(err);
          });
        },
        toPay(){
          this.$http.post(this.HOST + "/sys/mainOrder/saveOrder",this.orderItem).then(res => {
            this.$router.push({path:'/front/pay/'+res.data});
          }).catch(err => {
            console.log(err);
          });
        },
        selectPayType(value) {
          this.payType = value;
        }
      },
      created(){
        this.orderItem.orderdata=this.$store.state.orderData.datamsg;

        this.queryAddress();
      },
      beforeCreate(){


      },
      computed:{
          countPrice:function () {
             let result = this.orderItem.orderdata.map(x=>x.unitPrice*x.unitNum).reduce((total, num)=>{return total+num});
            this.orderItem.price = result;
            return result;
          }
      },
      components:{
        Header,
        Footer
      }
    }
</script>

<style scoped lang="scss">
.paytype{
  border: 1px  solid #cccccc;
  padding: 12px 76px;
  color: #cccccc;
  display: inline;
  width: 120px;
  margin-right: 12px;
  cursor: pointer;
  &:hover{
    border: 1px  solid orangered;
    color: orangered;
  }
}
.paytypeActive{
  border: 1px  solid orangered;
  color: orangered;
}
.addressItem{
  cursor: pointer;
  margin-right: 12px;
}
.cartRight{
color: #666;
line-height: 2;
}
.payButton{
  width: 200px;
  line-height: 50px;
  color: #fff;
  text-align: center;
  background-color: #ff3600;
  font-size: 20px;
  margin: 20px 50px 50px 0;
  cursor: pointer;
}
  .settlementTitle{
    display: block;
    margin-top: 27px;
    margin-bottom:  21px;
    font-size:22px;
    font-weight: normal;
  }
  .title{
    font-size: 30px;
    font-weight: 400;
    line-height: 68px;
    color: #757575;
  }
  .total{
    .el-col{
      margin-bottom: 24px;
    }
  }
  .item {
    height: 210px;
    border: 1px solid lightgray;
    padding: 15px 24px 0;
    .username {
      font-size: 18px;
      color: #333;
      margin-bottom: 10px;
    }
    .address {
      line-height: 22px;
      color: #757575;
      font-size: 14px;

    }
    .phoneNumber {
      line-height: 22px;
      color: #757575;
    }
    .operator {
      visibility: hidden;
    }
    &:hover {
      border-color: orangered;
      .operator {
        visibility: visible;
        color: orangered;
      }
    }

  }
.redStyle{
  color: #ff3600;
}
  .wrapperItem{
    width: 1226px;
    margin: 0 auto;
  }
.addressActive {
  border: 1px  solid orangered;
}
</style>
