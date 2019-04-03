<template>
  <div>
    <el-row>
      <GroupInfo></GroupInfo>
    </el-row>
    <el-row type="flex" justify="center" align-="middle">
      <el-col :span="10">
        <LineChart></LineChart>
      </el-col>
     <el-col :span="10" :offset="2">
       <AmountLineChart></AmountLineChart>
     </el-col>
    </el-row>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import LineChart from './components/LineChart'
  import GroupInfo from './components/GroupInfo'
  import  AmountLineChart  from './components/AmountLineChart'
  import Wordcloud from './components/Wordcloud'
    export default {
        name: "仪表盘",
        components:{
          LineChart,
          GroupInfo,
          AmountLineChart,
          Wordcloud
        },
        methods:{
          ...mapActions({
            getstatisData: 'getstatisData',
          }),
        },
        created(){
          this.getstatisData();
        }
    }
</script>

<style scoped>

</style>
