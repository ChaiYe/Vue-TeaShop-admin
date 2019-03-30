<template>
    <div style="margin: 50px">
      <el-row>我的订单</el-row>
      <el-row class="orderItemList">
           <el-row :gutter="10" class="orderItem">
           <el-row class="orderItemHeader" :gutter="10" type="flex" align="middle" style="margin: 0">
             <el-col :span="3">2019-02-16</el-col>
             <el-col :span="5">订单号:1551112920193378</el-col>
             <el-col :span="3">单价</el-col>
             <el-col :span="3">数量</el-col>
             <el-col :span="3">商品操作</el-col>
             <el-col :span="3">实付金额</el-col>
             <el-col :span="3">查看详情</el-col>
           </el-row>
           <el-row class="orderItemDetail" :gutter="10" type="flex" align="middle">
             <el-col :span="3">
               <img src="/static/img/商品.jpg" alt="" style="width: 100px;height: 100px;padding: 5px;border: 1px solid #ccc">
             </el-col>
             <el-col :span="5">脖挂蓝牙耳机</el-col>
             <el-col :span="3">$499.00</el-col>
             <el-col :span="3">1</el-col>
             <el-col :span="3"></el-col>
             <el-col :span="3">$499.00</el-col>
             <el-col :span="3">现在付款</el-col>
           </el-row>
         </el-row>
        <el-row :gutter="10" class="orderItem">
          <el-row class="orderItemHeader" :gutter="10" type="flex" align="middle" style="margin: 0">
            <el-col :span="3">2019-02-16</el-col>
            <el-col :span="5">订单号:1551112920193378</el-col>
            <el-col :span="3">单价</el-col>
            <el-col :span="3">数量</el-col>
            <el-col :span="3">商品操作</el-col>
            <el-col :span="3">实付金额</el-col>
            <el-col :span="3">查看详情</el-col>
          </el-row>
          <el-row class="orderItemDetail" :gutter="10" type="flex" align="middle">
            <el-col :span="3">
              <img src="/static/img/商品.jpg" alt="" style="width: 100px;height: 100px;padding: 5px;border: 1px solid #ccc">
            </el-col>
            <el-col :span="5">脖挂蓝牙耳机</el-col>
            <el-col :span="3">$499.00</el-col>
            <el-col :span="3">1</el-col>
            <el-col :span="3"></el-col>
            <el-col :span="3">$499.00</el-col>
            <el-col :span="3">现在付款</el-col>
          </el-row>
        </el-row>
        <el-row  >
          <el-row >
            <table border="0" width="100%" align="center">
              <tr>
                <th>2019-02-16</th>
                <th>订单号:1551112920193378</th>
                <th>单价</th>
                <th>数量</th>
                <th>商品操作</th>
                <th>实付金额</th>
                <th>查看详情</th>
              </tr>
              <tr>
                <td><img src="/static/img/商品.jpg" alt="" style="width: 100px;height: 100px;padding: 5px;border: 1px solid #ccc"></td>
                <td>脖挂蓝牙耳机</td>
                <td>$499.00</td>
                <td>1</td>
                <td>wu</td>
                <td>$499.00</td>
                <td rowspan="2" >现在付款</td>
              </tr>
              <tr>
                <td><img src="/static/img/商品.jpg" alt="" style="width: 100px;height: 100px;padding: 5px;border: 1px solid #ccc"></td>
                <td>脖挂蓝牙耳机</td>
                <td>$499.00</td>
                <td>1</td>
                <td></td>
                <td>$499.00</td>

              </tr>
            </table>
          </el-row>
        </el-row>
      </el-row>
    </div>
</template>

<script>
    export default {
        name: "OrderItem"
    }
</script>

<style  lang="scss">
    .orderItem{
      border: 1px  solid  #ccc;
      margin-bottom: 24px;
      .orderItemHeader{
        background-color: #eeeeee;
        line-height: 56px;
        border-bottom: 1px solid #ccc;
      }
    .orderItemDetail{
      padding: 12px;
    }
    }
    table{
      border: 1px solid #ccc;
    }
    table>:nth-child(1){
      text-align: center;
      line-height: 56px;
      background-color: #eeeeee;
      border-bottom: 1px solid #ccc;
    }
  table td{
    padding: 8px 12px;
  }
</style>
