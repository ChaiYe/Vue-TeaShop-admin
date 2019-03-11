<template>
  <el-row>
    <el-row :gutter="10" type="flex" justify="space-between">
     <el-col :span="12">
       <el-button type="primary" icon="el-icon-delete" @click="handleDelete">删除</el-button>
       <el-button type="primary" icon="el-icon-download" @click="handleExport">导出</el-button>
       <el-button type="primary" @click="putOnShelves">上架</el-button>
       <el-button type="primary" @click="putDownShelves">下架</el-button>
     </el-col>
      <el-col :span="10">
        <el-form  :model="searchEntity" style="display: flex;" class="form">
          <el-form-item>
            <el-input v-model="searchEntity.title" placeholder="标题" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="searchEntity.brandName" placeholder="品牌" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="searchEntity.type" placeholder="类型" clearable>
              <el-option label="茶叶" value="1"></el-option>
              <el-option label="茶具" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
    <el-table border :data="tableData" :height="tableHeight" tooltip-effect="dark" ref="table" v-loading="loading" @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column type="expand" class="display:flex" label="更多" width="55">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <div style="display: flex">
            <div>
              <el-form-item label="保质期:" v-show="props.row.shelflife">
                <span>{{ props.row.shelflife}}</span>
              </el-form-item>
              <el-form-item label="场地:" v-show="props.row.origin">
                <span>{{props.row.origin}}</span>
              </el-form-item>
              <el-form-item label="等级:" v-show="props.row.level">
                <span>{{props.row.level}}</span>
              </el-form-item>
              <el-form-item label="工艺:" v-show="props.row.process">
                <span>{{props.row.process}}</span>
              </el-form-item>
              <el-form-item label="食品生产许可证:" v-show="props.row.sc_licence">
                <span>{{props.row.sc_licence}}</span>
              </el-form-item>
            </div>
            <div>
          <el-form-item label="存储方法:" v-show="props.row.storage_methods">
            <span>{{props.row.storage_methods}}</span>
          </el-form-item>
          <el-form-item label="包装规格:" v-show="props.row.packing_specification">
            <span>{{props.row.packing_specification}}</span>
          </el-form-item>
          <el-form-item label="材质:" v-show="props.row.material">
            <span>{{props.row.material}}</span>
          </el-form-item>
          <el-form-item label="季节:" v-show="props.row.season">
            <span>{{props.row.season}}</span>
          </el-form-item>
          <el-form-item label="适用场景:" v-show="props.row.application_scenario">
            <span>{{props.row.application_scenario}}</span>
          </el-form-item>
           </div>
            </div>
          </el-form>


         <!-- <el-table-column prop="origin" label="场地"></el-table-column>
          <el-table-column prop="process" label="工艺"></el-table-column>
          <el-table-column prop="level" label="等级"></el-table-column>
          <el-table-column prop="scLicence" label="食品生产许可证"></el-table-column>
          <el-table-column prop="storageMethods" label="存储方法"></el-table-column>
          <el-table-column prop="packingSpecification" label="包装规格"></el-table-column>
          <el-table-column prop="material" label="材质"></el-table-column>
          <el-table-column prop="season" label="季节"></el-table-column>
          <el-table-column prop="applicationScenario" label="适用场景"></el-table-column>
          <el-table-column prop="detailed" label="详情"></el-table-column>-->


        </template>
      </el-table-column>
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="title" label="标题" width="300px">
        <template slot-scope="scope">
          <span v-html="scope.row.title"></span>
        </template>
      </el-table-column>
      <el-table-column prop="sale_price" label="销售价"></el-table-column>
      <el-table-column prop="brandName" label="品牌"></el-table-column>
      <el-table-column prop="inventory" label="库存量"></el-table-column>
      <el-table-column prop="recommended" label="推荐类型">
        <template slot-scope="scope">
          <span>{{recommendType[scope.row.recommended]}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="类型">
        <template slot-scope="scope">
          <span>{{scope.row.type==1?'茶叶':'茶具'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.state === 1 ? 'primary' : 'success'"
            disable-transitions>{{scope.row.state===1?'上架':'下架'}}</el-tag>
        </template>
      </el-table-column>
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
    import {filterValueBySelect} from '@/utils/filterValue.js'
    export default {
        name: "index.vue",
        data() {
        return {
          /*页面数据*/
          tableData:[],
          searchEntity:{
            /*查询条件*/
            title:'',
            brandName:null,
            type:null
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

          recommendType: ['不推荐', '自饮', '送礼', '茶器推荐']
        }
      },

      methods: {
          /*选择发生变化*/
        handleSelectionChange(val) {
          console.log(val);
          this.multipleSelection =  filterValueBySelect(val,'id');
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
          console.log("查询");
          this.loading = true;
          this.$http.get(this.HOST + "/sys/goods/findByPage?pageNum="+this.currentPage+"&pageSize="+this.pageSize, {
              params:this.searchEntity
            }
          ).then((response) => {
            this.loading=false;
            console.log(response);
            this.tableData= response.data.rows;
            this.totalCount=response.data.totalCount;
          }).catch((error)=>{
          })
        },

        /*上架*/
        putOnShelves(){
          this.$http.get(this.HOST + "/sys/goods/putOnShelves?ids="+this.multipleSelection).then( (res)=> {
            console.log(res);
            this.search();
          }).catch(function (error) {
            console.log(error);
          });
        },

        /*下架*/
        putDownShelves(){
          this.$http.get(this.HOST + "/sys/goods/putDownShelves?ids="+this.multipleSelection).then( (res)=> {
            console.log(res);
            this.search();
          }).catch(function (error) {
            console.log(error);
          });
        },

        handleDelete(){
          this.$http.get(this.HOST+"/sys/goods/delete?ids="+this.multipleSelection).then((res)=>{
            this.search();
          }).catch(function (error) {
            console.log(error);
          })
        },
        handleExport(){
        /*  this.$http.post(this.HOST+"/sys/goods/exportExcel", this.searchEntity).then((res)=>{
            console.log(res);
          }).catch(function (error) {
            console.log(error);
          })*/
          window.location.href=this.HOST+"/sys/goods/exportExcel"
        }

      },

      mounted() {
        this.search();
      }
    }
</script>

<style scoped>
  label {
    width: 90px;
    color: #99a9bf;
  }
  .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }
  .form .el-form-item{
    margin-left: 10px;
  }
</style>
