<template>
  <div>

    <el-row class="header">
      <el-col :span="22" >
        <el-form :inline="true" :model="searchEntity" >
          <el-form-item>
            <el-input v-model="searchEntity.username" placeholder="操作人员"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="searchEntity.ip" placeholder="ip"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="searchEntity.method" placeholder="方法"></el-input>
          </el-form-item>

            <el-date-picker
              v-model="searchEntity.startTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择开始时间">
            </el-date-picker>



            <el-date-picker
              v-model="searchEntity.endTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择结束时间">
            </el-date-picker>


          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>

      </el-col>
    </el-row>

    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :height="tableHeight"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange"
      v-loading="loading"
    >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="id"
        label="日志编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="username"
        label="操作人员"
        width="180">
      </el-table-column>
      <el-table-column
        prop="ip"
        label="主机">
      </el-table-column>
      <el-table-column
        prop="method"
        label="操作方法">
      </el-table-column>
      <el-table-column
        prop="visitTime"
        label="访问时间"
        :formatter="dateFormat"
      >
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
  </div>

</template>

<script>
  import { dateFormat } from '@/utils/formatUtils'
    export default {
        name: "index",
        data() {
          return {
            /*页面数据*/
            tableData:[],
            searchEntity:{
              /*查询条件*/
              username:null,
              ip:null,
              method:null,
              startTime:null,
              endTime:null
            },
            /*当前页*/
            currentPage: 1,
            /*页面大小*/
            pageSize: 10,
            /*记录总条数*/
            totalCount: 0,
            /*页面可供选择的大小*/
            pageSizesList: [10, 15, 20, 30, 50],

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
            this.$http.get(this.HOST + "/sys/log/findByPage?currentPage="+this.currentPage+"&pageSize="+this.pageSize, {
                params:this.searchEntity
              }
            ).then((response) => {
              this.loading=false;
              this.tableData= response.data.rows;
              this.totalCount=response.data.totalCount;
            }).catch((error)=>{
              console.log(error);
            })
          },
          dateFormat,
      },
      mounted(){
          this.search();
      }
    }
</script>

<style scoped>

</style>
