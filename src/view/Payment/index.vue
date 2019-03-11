<template>
  <el-row class="main">

    <el-table :data="tableData" border :height="tableHeight" tooltip-effect="dark" ref="table" v-loading="loading" @selection-change="handleSelectionChange">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="payment_mode" label="支付方式"></el-table-column>
      <el-table-column prop="pay_amount" label="支付金额"></el-table-column>
      <el-table-column prop="transaction_number" label="支付交易编号"></el-table-column>
      <el-table-column prop="transaction_btime" label="支付发起时间"></el-table-column>
      <el-table-column prop="transaction_stime" label="支付成功时间"></el-table-column>
      <el-table-column prop="pay_user" label="支付人ID"></el-table-column>
      <el-table-column prop="pay_name" label="支付的名称"></el-table-column>
      <el-table-column label="操作">
      </el-table-column>
    </el-table>

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
</template>

<script>
    export default {
        name: "index",
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
            /*添加*/
            add:{
              id:null,
              name:'',
              type:''
            },

            /*控制弹窗显示*/
            display:{
              dialogTableVisible: false,
              dialogFormVisible: false,
            },

            multipleSelection: [],
            /*控制弹窗是添加还是修改*/
            dialogStatus: 'create',

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

          /*删除*/
          handleDelete(index, row){
            console.log(row.id);
            this.$confirm('确定删除此口味?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$http.get(this.HOST+"sys/brand/delete?id="+row.id).then((response)=>{
                this.search();
              }).catch((error)=>{
                alert("删除失败");
              });
            });
          },

          /*显示添加*/
          showCreate(){
            this.add.id=null;
            this.add.name="";
            this.add.type="";
            this.dialogStatus = "create"
            this.display.dialogFormVisible = true;
          },

          /*显示编辑*/
          showEdit(index,row){
            this.add.id=row.id;
            this.add.name=row.name;
            this.add.type=row.type==1?'1':'2';
            this.dialogStatus = "update"
            this.display.dialogFormVisible = true;
            console.log(this.add.type);
          },

          /*提交修改*/
          updatebrand(){
            this.$http.post(this.HOST+"sys/brand/update",this.add).then((response)=>{
              this.search();
              this.display.dialogFormVisible = false;
            }).catch((error)=>{
              console.log("添加失败");
            });
          },

          /*添加*/
          createbrand(){
            this.$http.post(this.HOST+"sys/brand/add",this.add).then((response)=>{
              this.search();
              this.display.dialogFormVisible = false;
            }).catch((error)=>{

            });
          },

          /*提交请求*/
          search() {
            this.loading = true;
            this.$http.get(this.HOST + "/sys/brand/findByPage?currentPage="+this.currentPage+"&pageSize="+this.pageSize, {
                params:this.searchEntity
              }
            ).then((response) => {
              this.loading=false;
              this.tableData= response.data.rows;
              this.totalCount=response.data.totalCount;
            }).catch((error)=>{

            })
          },

          dateFormat,

        },
        mounted() {
          this.search()
        }
    }
</script>

<style scoped>

</style>
