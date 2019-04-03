<template>
  <div>
    <Header></Header>
    <div class="wrapperItem">
      <div>
        <div v-if="addressList.length==0">{{addressStatus}}</div>
        <el-dialog :visible.sync="dialogVisible" :title="type">
          {{address}}
          <el-form ref="form" :model="address" label-width="80px">
            <el-form-item label="收货人">
              <el-input v-model="address.username" class="input" ></el-input>
            </el-form-item>
            <el-form-item label="手机号码" >
              <el-input v-model="address.phoneNumber" class="input"></el-input>
            </el-form-item>
            <el-form-item label="所在地区">
              <el-cascader
                size="large"
                :options="options"
                v-model="address.selectedOptions"
                filterable
                change-on-select>
              </el-cascader>
            </el-form-item>
            <el-form-item label="详细地址"  >
              <el-input type="textarea" placeholder="详细地址" v-model="address.detail">
              </el-input>
            </el-form-item>
            <el-form-item label="邮政编码" >
              <el-input v-model="address.code"></el-input>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="address.checked">设为默认地址</el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit" v-if="type=='新建'">保存</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <el-row>
          <span class="settlementTitle">收货地址</span>
          <el-col :span="6"  v-if="addressList.length>0" v-for="entity in addressList" :key="entity.id">
            <div class="item addressItem" :class="{addressActive:entity.id==orderItem.selectAddress.id}" @click="selectAddressMethod(entity)">
              <h3 class="username"  >{{entity.consignee}}</h3>
              <p class="phoneNumber">{{entity.phoneNumber}}</p>
              <p class="address">{{entity.provinceName+" "+entity.cityName+" "+entity.areaName}}</p>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item" @click="showCreate()" style="display:flex;justify-content: center;align-items: center">
              <i class="el-icon-third-plus-circle-fill" style="font-size: 48px;color: lightgray"></i>
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
  import { regionDataPlus } from 'element-china-area-data'
    import Header from  '@/view/Front/Header/header.vue'
    import  Footer  from  '@/view/Front/Footer/footer.vue'
    export default {
      name: "settlement",
      data(){
        return{
          dialogVisible:false,
          type:'新建',
          address:{
            id:"",
            username:'贝壳',
            phoneNumber:'152195712000',
            selectedOptions: ["130000", "130200", "130203"],
            detail:'黄埔街道',
            code:'520033',
            checked:true
          },
          options: regionDataPlus,
          addressStatus: "加载地址中",
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
        showCreate(){
          this.dialogVisible = true;
          this.type='新建';
        },
        onSubmit:function () {
          var  addressItem={
            consignee:this.address.username,
            phoneNumber:this.address.phoneNumber,
            provinceId: this.address.selectedOptions[0],
            cityId:this.address.selectedOptions[1],
            areaId: this.address.selectedOptions[2],
            detail:this.address.detail,
            isDefaultAddr:this.address.checked,

            zipCode:this.address.code
          }
          this.$http.post(this.HOST + "/sys/address/save", addressItem).then(res=>{
            this.queryAddress();
          }).catch(err=>{
            console.log(err);
          });
          this.dialogVisible = false;
        },
        selectAddressMethod(item){
          this.orderItem.selectAddress = item;
        },
        queryAddress(){
         this.$http.get(this.HOST + "/sys/address/userAddress",this.orderItem).then( (res)=> {
           this.addressList= res.data;
           if (this.addressList.length > 0) {
             this.orderItem.selectAddress = this.addressList[0];
           }else{
             this.addressStatus="请先添加地址"
           }


          }).catch((err)=> {
            console.log(err);
          });
        },
        toPay(){
          if (this.orderItem.selectAddress!=null) {
            this.$http.post(this.HOST + "/sys/mainOrder/saveOrder",this.orderItem).then(res => {
              /* this.$router.push({path:'/front/pay/'+res.data});*/
              let routeData = this.$router.resolve({path:'/front/pay/'+res.data});
              window.open(routeData.href, '_blank');
            }).catch(err => {
              console.log(err);
            })}else{
            this.$message({
              type: 'info',
              message: `您还没勾选地址,请选择地址后继续`
            });
          }

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
