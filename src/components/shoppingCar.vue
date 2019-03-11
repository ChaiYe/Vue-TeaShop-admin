<template>
  <div>
    <Header></Header>
    <div style="margin: 42px 42px;border: 1px solid #ccc;border-radius: 1px;">
      <el-table :data="shoppingCart" ref="shoppingCart" @selection-change="count" style="border: 24px">

        <template slot="empty">
          空空如也
        </template>

        <el-table-column
          type="selection"
          width="55"
        >
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="itemPic"
          width="100"
        >
        </el-table-column>


        <el-table-column
          header-align="center"
          align="center"
          prop="itemName"
          label="商品名称"
          width="350"
        >
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="itemPrice"
          label="价格"
        >
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          label="数量"
        >
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.itemNum" :min="1" @change="count" style="width: 80%"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          label="小计"
        >
          <template slot-scope="scope">
            {{scope.row.itemPrice*scope.row.itemNum}}
          </template>
        </el-table-column>
        <el-table-column
          align="right">
          <template slot-scope="scope">
            <el-button icon="el-icon-close" circle size="mini" @click="remove(scope.$index,shoppingCart)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" style="height: 100px;background: #f2f2f2;width: 100%;line-height:100px;" justify="space-between">
        <div style="margin-left: 14px">
        <el-checkbox>全选</el-checkbox>
        <a href="#">批量删除</a>
        <span>已选择{{this.$refs.shoppingCart==undefined?0:this.$refs.shoppingCart.selection.length}}件商品</span>
      </div>
      <div style="margin-right: 14px">
        总计(不含运费):
        {{total}}
      </div>
    </el-row>
    </div>
    <Footer></Footer>
  </div>

</template>

<script>
  import Header from  '@/components/header'
  import  Footer from '@/components/footer'
  import '@/assets/base.css'
export default {
  name: 'HelloWorld',
  data () {
    return {
      shoppingCart:[
        {
          itemPic:'#',
          itemPrice:1000,
          itemName:'【制茶状元黄勇亲制】两袖 武夷岩茶 锡罐特制大红袍 中火 特级 100g 单罐',
          itemNum:2
        },
        {
          itemPic:'#',
          itemPrice:20,
          itemName:'醉品朴茶·醇朴 2018年秋茶 安溪铁观音 经典口碑款 清香型 NGY0840-250gZONGY0840-250',
          itemNum:1
        },{
          itemPic:'#',
          itemPrice:20,
          itemName:'醉品朴茶·醇朴 2018年秋茶 安溪铁观音 经典口碑款 清香型 NGY0840-250gZONGY0840-250',
          itemNum:1
        }
      ],
      total:0
    }
  },
  methods:{
    remove(index,rows){
      rows.splice(index,1);
      this.count();
    },
    count:function () {
      let num=0;
      this.$refs.shoppingCart.selection.forEach(function(item){
        num+=item.itemPrice*item.itemNum;
      });
      this.total=num;
    }
  },
  mounted:function () {
  },
  computed: {
  },
  components:{
    Header,
    Footer
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
 .el-row{
   margin: 0px;
 }
</style>
