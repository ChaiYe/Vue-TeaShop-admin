<template>
    <div>
     <!-- <el-timeline :reverse="reverse">
        <el-timeline-item v-for="(activity, index) in footprintList" :timestamp="activity.time" placement="top"  :key="index">
          <div style="display: flex;align-content: center;align-items: center;justify-content: space-between;box-shadow: #ccc 1px 1px 5px;border-radius: 3px 3px 3px;padding: 24px 42px;margin-top: 24px ">
            <h4>{{activity.goods[0].title}}</h4>
            <img :src="activity.goods[0].largerPic" alt="activity.goods[0].largerPic" width="100px" height="100">
            <i class="el-icon-d-arrow-right">详情</i>
          </div>
        </el-timeline-item>
      </el-timeline>-->
      <div style="height: 680px;overflow: scroll">
        <light-timeline :items='footprintList'>
            <template slot='tag' slot-scope='{ item }'>
              {{item.time|dateformat('YYYY-MM-DD HH:mm:ss')}}
            </template>
            <template slot='symbol' slot-scope='{ item }'>
             <!-- <div class="my_icon_class"><i :class="item.class"></i></div>-->
            </template>
            <template slot='content' slot-scope='{ item }'>
              <div style="display: flex;align-content: center;align-items: center;justify-content: space-between;box-shadow: #ccc 1px 1px 5px;border-radius: 3px 3px 3px;padding: 24px 42px;margin-top: 24px ">
                <h4>{{item.goods[0].title}}</h4>
                <img :src="item.goods[0].largerPic" alt="activity.goods[0].largerPic" width="100px" height="100">
                <i class="el-icon-d-arrow-right" style="cursor: pointer" @click="toGoods(item.goods[0].id)">详情</i>
              </div>
            </template>
        </light-timeline>
      </div>
    </div>
</template>

<script>
  export default {
        name: "footprint",
      data(){
          return{
            footprintList: null,
            reverse:true,
            items: [
              {
                tag: '2018-01-12',
                content: 'hallo',
                class: 'el-icon-star-off'
              },
              {
                tag: '2018-01-13',
                content: 'world',
                class: 'el-icon-star-off'
              },
              {
                tag: '2018-01-14',
                content: 'other',
                class: 'el-icon-star-off'
              }
            ]
          }
      },
      methods:{
        queryFootPrint() {
            this.$http.get(this.HOST + "/sys/userLog/getUserLogByUid").then(res => {
                    console.log(res);
                    console.log(res.data.rows);
                    this.footprintList=res.data.rows;

                }).catch(err => {
                      console.log(err);
              });
        },
        toGoods(goodsId){
          this.$router.push({path: '/front/goods/queryForGoodsItem/detail/' + goodsId})
         }
  },
      mounted(){
        this.queryFootPrint();
      },

    }
</script>

<style scoped>
.my_icon_class{

}
</style>
