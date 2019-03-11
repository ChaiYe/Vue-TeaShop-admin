<template>
  <el-row>
    <el-row>
      <el-table :data="tableData" border :height="tableHeight" tooltip-effect="dark" ref="table" v-loading="loading" @selection-change="handleSelectionChange">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="user_id" label="支付人"></el-table-column>
        <el-table-column prop="phone_number" label="支付人电话"></el-table-column>
        <el-table-column prop="consignee" label="收货人"></el-table-column>
        <el-table-column prop="phone_number" label="收货电话"></el-table-column>
        <el-table-column prop="place_order_time" label="订单时间"></el-table-column>
        <el-table-column prop="payment_time" label="支付时间"></el-table-column>
        <el-table-column prop="order_status" label="订单状态"></el-table-column>
        <el-table-column prop="" label=""></el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="地址">
                <span>{{ props.row.province_name+props.row.city_name+props.row.area_name+props.row.detailed_address }}</span>
              </el-form-item>
              <el-form-item label="邮编">
                <span>{{ props.row.zip_code }}</span>
              </el-form-item>
              <el-form-item label="支付方式">
                <span>{{ props.row.payment_mode }}</span>
              </el-form-item>
               <el-form-item label="支付方式">
                <span>{{ props.row.payment_mode }}</span>
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
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="showEdit(scope.$index, scope.row)">编辑</el-button>
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
    export default {
        name: "Order",
      data() {
        return {
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
          this.$http.get(this.HOST + "/sys/goods/findByPage?currentPage="+this.currentPage+"&pageSize="+this.pageSize, {
              params:this.searchEntity
            }
          ).then((response) => {
            this.loading=false;
            this.tableData= response.data.rows;
            this.totalCount=response.data.totalCount;
          }).catch((error)=>{
          })
        },

      },

      mounted() {
        this.search();
      }
    }
</script>

<style scoped>

</style>
