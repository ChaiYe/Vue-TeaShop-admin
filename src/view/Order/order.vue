<template>
  <el-row>

    <el-dialog title="订单详情" :visible.sync="dialogTableVisible" width="70%">
      <el-table :data="orderDetail">
        <el-table-column property="largerPic" label="图片" width="150">
          <template slot-scope="scope">
            <img :src="scope.row.largerPic" width="100px" height="100px"/>
          </template>
        </el-table-column>
        <el-table-column  label="标题" width="150">
          <template slot-scope="scope">
            <span v-html="scope.row.goodsTitle"></span>
          </template>
        </el-table-column>
        <el-table-column label="单价" width="150">
          <template slot-scope="scope">
            <span>￥{{scope.row.unitPrice}}</span>
          </template>
        </el-table-column>

        <el-table-column label="数量" width="150">
          <template slot-scope="scope">
            <span>*{{scope.row.unitNum}}</span>
          </template>
        </el-table-column>
        <el-table-column label="小计" width="150">
          <template slot-scope="scope">
            <span>￥{{scope.row.unitPrice*scope.row.unitNum}}</span>
          </template>
        </el-table-column>
        <el-table-column  label="类型" width="150">
          <template slot-scope="scope">
           <span>{{scope.row.type==0?"茶叶":"茶具"}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-row>
      <el-table :data="tableData" border :height="tableHeight" tooltip-effect="dark" ref="table" v-loading="loading" @selection-change="handleSelectionChange">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="userId" label="支付人"></el-table-column>
        <el-table-column prop="phoneNumber" label="支付人电话" width="120px"></el-table-column>
        <el-table-column prop="consignee" label="收货人"></el-table-column>
        <el-table-column prop="phoneNumber" label="收货电话" width="120px"></el-table-column>
        <el-table-column prop="placeOrderTime" label="订单时间" :formatter="dateFormat"></el-table-column>
        <el-table-column prop="paymentTime" label="支付时间" :formatter="dateFormat"></el-table-column>
        <el-table-column label="订单状态">
          <template slot-scope="props">
            <span>{{orderStatu[props.row.orderStatus]}}</span>
          </template>
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="地址:">
                <span>{{ props.row.provinceName+props.row.cityName+props.row.areaName+props.row.detailedAddress }}</span>
              </el-form-item>
              <el-form-item label="邮编:">
                <span>{{ props.row.zipCode }}</span>
              </el-form-item>
              <el-form-item label="支付方式:">
                <span>{{ paymentMode[props.row.paymentMode] }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <!--id

place_order_time
payment_time
delivery_time
receipt_time
order_status
payment_mode
transaction_id
evaluation_time
total_goods_num
freight
actual_payment-->
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <el-button
              size="mini" @click="delivery(scope.row.id)" :disabled="scope.row.orderStatus==2||scope.row.orderStatus==3">发货</el-button>
            <el-button
              size="mini"
              @click="showDetail(scope.$index, scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizesList"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount">
        </el-pagination>
      </div>
    </el-row>
  </el-row>
</template>

<script>
  import {dateFormat} from '@/utils/formatUtils.js'
    export default {
        name: "Order",
      data() {
        return {
          /*控制弹窗显示*/
          dialogTableVisible:false,
          /*订单详情*/
          orderDetail:null,
          orderStatu:["待付款","待发货","待收货","待评价"],
          paymentMode:["在线支付","货到付款"],
          /*页面数据*/
          tableData:[],
          searchEntity:{
            /*查询条件*/
            name:null,
            type:null,
          },
          /*当前页*/
          currentPage: 1,
          /*页面大小*/
          pageSize: 10,
          /*记录总条数*/
          totalCount: 0,
          /*页面可供选择的大小*/
          pageSizesList: [10, 15, 20, 30, 50],

          /*控制弹窗显示*/
          display:{
            dialogTableVisible: false,
            dialogFormVisible: false,
          },

          multipleSelection: [],

          /*数据加载等待动画*/
          loading: false,
          /*设置table的高度*/
          tableHeight:500,
        }
      },

      methods: {
        dateFormat,
        handleSelectionChange(val) {
          console.log(val);
          this.multipleSelection = val;
        } ,

        /*页面数据大小发生改变*/
        handleSizeChange(val) {
          this.pageSize = val;
          this.search();
        },
        /*当前页面数字发生改变*/
        handleCurrentChange(val) {
          this.currentPage = val;
          this.search();
        },

        /*提交请求*/
        search() {
          this.loading = true;
          this.$http.get(this.HOST + "/sys/mainOrder/selectOrderList?pageNum="+this.currentPage+"&pageSize="+this.pageSize, {
              params:this.searchEntity
            }
          ).then((response) => {
            this.loading=false;
            console.log(response.data);
            this.tableData= response.data.rows;
            this.totalCount=response.data.totalCount;
          }).catch((error)=>{
          })
        },
        showDetail(index,row){
          this.dialogTableVisible = true;
          this.orderDetail=row.subOrderList
        },
        delivery(id) {
          console.log("即刻出发:" + id);
            this.$http.get(this.HOST + "/sys/mainOrder/delivery?id="+id).then(res => {
              this.search();
                }).catch(err => {
                      console.log(err);
              });
        }
      },

      mounted() {
        this.search();
      }
    }
</script>

<style scoped>

</style>
