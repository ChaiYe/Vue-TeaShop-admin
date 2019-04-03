<template>
  <div>
    <Header></Header>
    <div>
    </div>
    <div style="margin: 42px 42px;border: 1px solid #ccc;border-radius: 1px;">
      <el-table :data="shoppingCart" ref="shoppingCart" @selection-change="count" style="border: 24px">
        <template slot="empty">
          <div v-if="shoppingCart.length==0" style="font-size:32px;text-align:center;color:#ccc">{{status}}</div>
        </template>
        <el-table-column
          type="selection"
          width="55"
          @selection-change="handleSelectionChange"
        >
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          width="100"
        >
          <template slot-scope="scope">
           <!-- {{scope.row.largerPic}}-->
            <img :src="scope.row.largerPic" width="100px" height="100px"/>
          </template>
        </el-table-column>

        <el-table-column
          header-align="center"
          align="center"

          label="商品名称"
          width="350"
        >
          <!-- prop="goodsTitle"-->
          <template slot-scope="scope">
           <span v-html="scope.row.goodsTitle"></span>
          </template>
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="unitPrice"
          label="价格"
        >
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          label="数量"
        >
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.unitNum" :min="1" @change="count" style="width: 80%"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          label="小计"
        >
          <template slot-scope="scope">
            {{scope.row.unitPrice*scope.row.unitNum}}
          </template>
        </el-table-column>
        <el-table-column
          align="right">
          <template slot-scope="scope">
            <el-button icon="el-icon-close" circle size="mini" @click="remove(scope.$index,scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" style="height: 100px;background: #f2f2f2;width: 100%;line-height:100px;" justify="space-between">
        <div style="margin-left: 14px">
        <span>已选择{{this.$refs.shoppingCart==undefined?0:this.$refs.shoppingCart.selection.length}}件商品</span>
      </div>
      <div style="margin-right: 14px">
        总计(不含运费):
        {{total}}
        <el-button type="danger" @click="onSubmit">结算</el-button>
      </div>
    </el-row>
    </div>
    <Footer></Footer>
  </div>

</template>

<script>
  import { mapActions } from 'vuex'
  import Header from  '@/view/Front/Header/header.vue'
  import  Footer from '@/view/Front/Footer/footer.vue'
  import '@/assets/base.css'
export default {
  name: 'HelloWorld',
  data () {
    return {
      status:'数据加载中...',
      shoppingCart:[

      ],
      total:0,
      multipleSelection:null
    }
  },
  methods:{
    ...mapActions({
      addDataMsg: 'AddDataMsg',
    }),
    remove(index,rows){
      console.log(rows,index);
        this.$http.get(this.HOST + "/sys/cart/deleteFormCart?itemId="+rows.goodsId).then(res => {
          this.queryData();
            }).catch(err => {
                  console.log(err);
          });
      rows.splice(index,1);
      this.count();
    },
    count:function () {
      let num=0;
      this.$refs.shoppingCart.selection.forEach(function(item){
        num+=item.unitPrice*item.unitNum;
      });
      this.total=num;
    },
    onSubmit(){
      console.log(this.$store);
      if (this.$refs.shoppingCart.selection.length < 1) {
        this.$notify({
          title: '提示',
          message: '请先勾选要结算的商品',
          offset: 150,
          duration:2000
        });
      }else{
        this.addDataMsg(this.$refs.shoppingCart.selection);
        //this.$refs.shoppingCart.selection;
        this.$router.push("/front/settlement");
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    queryData() {
      this.$http.get(this.HOST+"/sys/cart/getCart",{withCredentials:true}).then(res=>{
        this.shoppingCart=res.data.subOrderList;
        if (this.shoppingCart.length == 0) {
          this.status = "空空如也";
        }
      }).catch(err=>{
        console.log(err);
      });
    }
  },
  mounted:function () {
    this.queryData();
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
