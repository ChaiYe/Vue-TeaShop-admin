<template>
  <ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram>
</template>

<script>
    export default {
        name: "EchartDemo",
      data: function () {
        this.chartSettings = {
          showLine: ['下单数量']
        }
        return {
          chartData: {
            columns: ['日期', '下单数量'],
            rows: [
             /* { '日期': '1/1',  '下单数量': 1093, },
              { '日期': '1/2',  '下单数量': 3230, },
              { '日期': '1/3',  '下单数量': 2623, },
              { '日期': '1/4',  '下单数量': 1423, },
              { '日期': '1/5',  '下单数量': 3492,  },
              { '日期': '1/6',  '下单数量': 4293, }*/
            ]
          }
        }
      },
      methods:{

      },
      mounted(){
        this.chartData.rows = this.statisData;
      },
      computed:{
        statisData(){
          let data=[];
          for(var {'下单数量':num,'日期':date} of this.$store.state.statisData.statisData){
            data.push({ '日期': date,'下单数量': num});
          }
          return data;
        }
      },
    }
</script>

<style scoped>

</style>
