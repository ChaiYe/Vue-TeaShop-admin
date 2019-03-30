<template>
  <div>
    <Header></Header>
    <Conditions @queryCondition="queryConditionMethod"></Conditions>

    <GoodListItem :dataList="dataList"></GoodListItem>
    <div class="pagination" v-show="totalPage!=0">
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page.sync="currentPage"
        @current-change="search"
        :page-size="20"
        :total="totalPage">
      </el-pagination>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from  '@/view/Front/Header/header.vue'
  import Conditions from  '@/view/Front/SearchPage/conditions.vue'
  import  GoodListItem from '@/view/Front/SearchPage/goodListItem.vue'
  import  Footer from '@/view/Front/Footer/footer.vue'
    export default {
        name: "goodList",
        data(){
          return {
            dataList:[],
            totalPage:0,
            currentPage:1,
            queryConditionData:{
              brand:null,
              level:null,
              priceLow:null,
              priceHigh:null,
            }
          }
        },
        components:{
        Header,
        Conditions,
        GoodListItem,
        Footer
      },
      methods:{
        search() {

            let teaTasteId = this.$route.params.teaTasteId;
            this.$http.get(this.HOST + "/sys/searchByTeaTaste?teaTasteId="+teaTasteId,{
              params:{
               brand : this.queryConditionData.brand,
               level  : this.queryConditionData.level,
               priceLow:  this.queryConditionData.priceLow,
               priceHigh: this.queryConditionData.priceHigh,
                page:this.currentPage
              }
            }).then(response =>{
              console.log("数据是是是");
              console.log(response);
              this.dataList=response.data.rows;
              this.totalPage=response.data.totalCount;
            }).catch(function (error) {
              console.log(error);
            });
          },
        queryConditionMethod(selectInfo) {
          this.queryConditionData = selectInfo;
          this.search();
        },

        },
      mounted(){
        this.search();
      },
      watch: {
        '$route.params': function (newValue) {
          this.search();
        }
      }
    }
</script>

<style scoped>
  .pagination{
    display: flex;
    margin: 24px auto;
    justify-content: center;
    align-items: center
  }
</style>
