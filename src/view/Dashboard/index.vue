<template>
  <div>
    <el-row>
      <GroupInfo></GroupInfo>
    </el-row>
    <el-row>
      <LineChart></LineChart>
    </el-row>
  </div>
</template>

<script>
  import LineChart from './components/LineChart'
  import GroupInfo from './components/GroupInfo'
    export default {
        name: "仪表盘",
        components:{
          LineChart,
          GroupInfo,
        }
    }
</script>

<style scoped>

</style>
