<template>
    <div style="margin: 50px">
      <el-row style="font-size: 32px;color: #ccc;margin-bottom: 24px">{{title}}</el-row>
      <el-row class="orderItemList">
          <el-row style="text-align: center;font-size: 32px;color: #ccc" v-if="orderList.length==0">
            没有数据
          </el-row>
          <el-row  v-for="item  in  orderList" class="orderItem">
            <table border="0" width="100%" align="center">
              <tr>
                <th>{{item.placeOrderTime|formatDateItem}}</th>
                <th>订单号:{{item.id}}</th>
                <th>单价</th>
                <th>数量</th>
                <th>小计</th>
                <th>查看</th>
              </tr>
              <tr v-for="subItem in item.subOrderList" >
                <td> <img :src="subItem.largerPic" alt="" style="width: 100px;height: 100px;padding: 5px;border: 1px solid #ccc"></td>
                <td v-html="subItem.goodsTitle"></td>
                <td>{{subItem.unitPrice}}</td>
                <td>{{subItem.unitNum}}</td>
                <td>{{subItem.unitNum*subItem.unitPrice}}</td>
                <td><a :href="'http://www.baicao.com/front/goods/queryForGoodsItem/detail/'+subItem.goodsId">详情</a></td>
              </tr>

            </table>
          </el-row>
        </el-row>

      <el-row type="flex" justify="center" v-if="orderList.length!=0">
        <el-pagination
          layout="prev, pager, next"
          :total="total">
        </el-pagination>
      </el-row>
    </div>
</template>

<script>
  import  {dateFormatType2} from  '@/utils/formatUtils.js'
    export default {
        name: "OrderItem",
      data(){
          return{
            /*标题*/
            title: null,
            orderStatusList:['waitPay','waitDelivery','waitReceive','waitComment','haveComment'],

            total: null,
            orderList: null,
            condition:{
              pageNum:1,
              pageSize:10,
              userId:24,
              orderStatus:null,
            }
          }
      },
      methods:{
          queryOrder(){
            console.log("订单发起请求");
            let orderStatus = this.$route.params.orderStatus;
            alert("订单状态:"+orderStatus);
            for(let  i=0;i<['waitPay','waitDelivery','waitReceive','waitComment','haveComment'].length;i++){
              if (['waitPay','waitDelivery','waitReceive','waitComment','haveComment'][i] == orderStatus) {
                this.condition.orderStatus = i;
                alert(this.condition.orderStatus);
              }
            }

            this.$http.post(this.HOST+"/sys/mainOrder/selectOrderList",this.condition).then(res=>{
              this.total = res.data.totalCount;
              this.orderList = res.data.rows;
          }).catch(err=>{
              console.log(err);
          })
          },
        dateFormatType2,
      },
      mounted(){

        this.queryOrder();
      },
      filters: {
        formatDateItem(time) {

          let dateFormatType = dateFormatType2(time, 'yyyy-MM-dd');
          console.log("时间格式化:" + dateFormatType);
          return dateFormatType;
        }
      },
      watch:{
        $route() {
          alert("路由变化");
          this.queryOrder();
        }
      }
    }
</script>

<style  lang="scss">
    .orderItem{
      border: 1px  solid  #ccc;
      margin-bottom: 24px;
      .orderItemHeader{
        background-color: #eeeeee;
        line-height: 56px;
        border-bottom: 1px solid #ccc;
      }
    .orderItemDetail{
      padding: 12px;
    }
    }
    table{
      border: 1px solid #ccc;
    }
    table>:nth-child(1){
      text-align: center;
      line-height: 56px;
      background-color: #eeeeee;
      border-bottom: 1px solid #ccc;
    }
  table td{
    padding: 8px 12px;
  }
</style>
