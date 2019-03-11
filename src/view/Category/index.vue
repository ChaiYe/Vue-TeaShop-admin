<template>
  <div>

    <div class="btn-group">
      <el-button type="primary" icon="el-icon-edit" @click="handleAdd">添加</el-button>
      <el-button type="primary" icon="el-icon-delete" @click="handleDelete">删除</el-button>
      <el-button type="primary" icon="el-icon-refresh" @click="search">刷新</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%;" :height="tableHeight" tooltip-effect="dark" @selection-change="handleSelectionChange"  ref="table" v-loading="loading">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="id"
        label="id">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="name"
        label="分类名称">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="pic"
        label="图片">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="type"
        label="类型">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes=" pageSizesList"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>
  </div>
  </div>
</template>

<script>
    export default {
        name: "index",
      data() {
        return {
          /*表格数据*/
          tableData: [
            /*{
              "id": 1,
              "name": "乌龙茶",
              "pic": "/pic/1.jpg",
              "type": 1,
            },
            {
              "id": 2,
              "name": "红茶",
              "pic": "/pic/1.jpg",
              "type": 1,
            },
            {
              "id": 3,
              "name": "绿茶",
              "pic": "/pic/1.jpg",
              "type": 1,
            },
            {
              "id": 4,
              "name": "黑茶",
              "pic": "/pic/1.jpg",
              "type": 1,
            },
            {
              "id": 5,
              "name": "白茶",
              "pic": "/pic/1.jpg",
              "type": 1,
            },
            {
              "id": 6,
              "name": "花茶",
              "pic": "/pic/1.jpg",
              "type": 1,
            },
            {
              "id": 7,
              "name": "茶器",
              "pic": "/pic/1.jpg",
              "type": 2,
            }*/
          ],
          /*选择的对象*/
          multipleSelection: [],
          /*请求页面*/
          currentPage:1,
          /*页面大小*/
          pageSize:5,
          /*页面可供选择的大小*/
          pageSizesList: [10, 15, 20, 30, 50],
          /*总记录数*/
          totalCount:0,
          /*查询条件*/
          searchEntity:{},
          /*正在加载*/
          loading:true,
          /*设置table的高度*/
          tableHeight:500,
        }
      },
      methods:{
        handleSelectionChange(val) {
          console.log(val);
          this.multipleSelection = val;
        } ,
        handleEdit(index, row) {
          console.log(index, row);
        },
        handleSizeChange(val) {
         this.pageSize=val;
          this.search();
        },
        handleCurrentChange(val) {
          this.currentPage=val;
          this.search();
        },
        /*处理删除*/
        handleDelete() {
          console.log(this.multipleSelectionIds);
          if (this.multipleSelectionIds.length==0) {
            this.$message({
              type: 'info',
              message: `请选择一行`
            });
          }else{
            this.$confirm('确定删除?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$http.get(this.HOST+"/sys/category/delete?ids="+this.multipleSelectionIds).then((response)=>{
                console.log(response);
              }).catch((error)=>{
                alert("删除失败");
              });
            })
          }
        },

        /*分页查询*/
        search() {
          this.$http.get(this.HOST + "/sys/category/findByPage?currentPage="+this.currentPage+"&pageSize="+this.pageSize, {
            params:this.searchEntity
          }).then((response)=> {
            console.log(response);
            this.tableData=response.data.rows;
            this.totalCount=response.data.totalCount;
            this.loading=false;
            this.tableHeight=this.pageSize*65;
          })
        },


      },
      mounted() {
          this.search();
      },
      computed:{
        multipleSelectionIds() {
          var multipleSelectionIdList = [];
          this.multipleSelection.forEach((item)=>{
            multipleSelectionIdList.push(item.id);
          });
          return multipleSelectionIdList;
        }
      }
    }
</script>

<style scoped>

</style>
