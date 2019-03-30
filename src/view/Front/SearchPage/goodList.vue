<template>
  <div>
    <Header></Header>
    <GoodListItem :dataList="dataList"></GoodListItem>
    <div class="pagination" v-show="total>20">
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page.sync="currentPage"
        @current-change="search"
        :page-size="20"
        :total="total"
      >
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
            total:null,
            currentPage:1,
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
            let keywords = this.$route.params.keywords;

            this.$http.post(this.HOST + "/sys/search",{'keywords':keywords,'page':this.currentPage}).then(response =>{
-
              console.log(response.data);
              this.dataList=response.data.rows;
              this.total=response.data.total;
              /*设置滚动条回滚到最顶部*/
              var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
              document.documentElement.scrollTop=0;
              document.body.scrollTop=0;
            }).catch(function (error) {
              console.log(error);
            });
          }
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
