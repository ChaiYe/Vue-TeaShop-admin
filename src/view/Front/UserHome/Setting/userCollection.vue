<template>
  <el-row class="orderItemList">
    <el-row style="text-align: center;font-size: 32px;color: #ccc" v-if="collectionList.length==0">
      没有数据
    </el-row>
    <el-row class="orderItem">
      <el-row :gutter="30">
       <el-col :span="8" v-for="goods in collectionList">
         <el-card :body-style="{ padding: '0px' }">
           <img :src="goods[0].largerPic" class="image"  style="margin: 0 auto;width:200px;height: 200px">
           <div style="padding: 14px;">
             <a :href="'http://www.baicao.com/front/goods/queryForGoodsItem/detail/'+goods[0].id">{{goods[0].title}}</a>
             <div class="bottom clearfix">
               <el-button type="text" class="button" @click="deleteCollectionData(goods[0].id)">删除</el-button>
             </div>
           </div>
         </el-card>
       </el-col>
      </el-row>
    </el-row>
  </el-row>
</template>

<script>
    export default {
        name: "userCollection",
        data(){
          return{
            collectionList:[],
            pageNum:1,
            pageSize:10,
          }
        },
      methods:{
        queryCollectionsData() {
              this.$http.get(this.HOST + "/sys/userCollection/getUserCollection?pageNum="+this.pageNum+"&pageSize"+this.pageSize).then(res => {
                      console.log(res.data);
                      this.collectionList=res.data.rows.map(x=>{return x.goods})
                console.log(this.collectionList);
                  }).catch(err => {
                        console.log(err);
                });
        },
        deleteCollectionData(id) {
            this.$http.get(this.HOST + "/sys/userCollection/deleteUserCollection?goodsId="+id).then(res => {
              this.queryCollectionsData();
                }).catch(err => {
                      console.log(err);
              });
        },
      },
      mounted() {
        this.queryCollectionsData();
      }
    }
</script>

<style scoped lang="scss">
  .image {
    padding: 24px;
  }
</style>
