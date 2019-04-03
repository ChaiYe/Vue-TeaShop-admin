<template>
  <div>
    {{statisData}}
  <ve-line :data="amountchartData"></ve-line>
  </div>
</template>

<script>
    export default {
        name: "AmountLineChart",
      data(){
          return{
            amountchartData: {
              columns: ['日期', '交易额'],
              rows: [
              ]
            }
          }
      },
      methods:{
       /* queryStatistical(){
          this.$http.get(this.HOST+"/sys/statistical/statisticalDataAmount").then(res=>{
            console.log("line的数据回来");
            console.log(res.data);
            this.chartData.rows=res.data;
            console.log(res.data);
          }).catch(err=>{
            console.log(err);
          });
        }*/
      },
      mounted(){
        this.amountchartData.rows = this.statisAmountData;
      },
      computed:{
        statisAmountData(){
          let data=[];
          for(var {'交易额':amount,'日期':date} of this.$store.state.statisData.statisData){
            data.push({ '日期': date,'交易额': amount});
          }
          return data;
        }
      },
    }
</script>

<style scoped>

</style>
