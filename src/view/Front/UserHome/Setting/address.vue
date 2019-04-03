<template>
  <div>

    <el-dialog :visible.sync="dialogVisible" :title="type">
      {{address}}
      <el-form ref="form" :model="address" label-width="80px">
        <el-form-item label="收货人">
          <el-input v-model="address.username" class="input" ></el-input>
        </el-form-item>
        <el-form-item label="手机号码" >
          <el-input v-model="address.phoneNumber" class="input"></el-input>
        </el-form-item>
        <el-form-item label="所在地区">
          <el-cascader
            size="large"
            :options="options"
            v-model="address.selectedOptions"
            filterable
            change-on-select>
          </el-cascader>
        </el-form-item>
        <el-form-item label="详细地址"  >
          <el-input type="textarea" placeholder="详细地址" v-model="address.detail">
          </el-input>
        </el-form-item>
        <el-form-item label="邮政编码" >
          <el-input v-model="address.code"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="address.checked">设为默认地址</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" v-if="type=='新建'">保存</el-button>
          <el-button type="primary" @click="onEdit" v-if="type=='编辑'">修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-row>
      <el-row class="title">收货地址</el-row>
      <el-row :gutter="10" class="total">
        <el-col :span="6">
          <el-row class="item" type="flex" align="middle" justify="center" @click.native="showCreate">
            <i class="el-icon-third-plus-circle-fill" style="font-size: 48px;color: lightgray"></i>
          </el-row>
        </el-col>
        <el-col :span="6"  v-for="entity in entityList" :key="entity.id">
          <el-row class="item">
            <h3 class="username">{{entity.consignee}}</h3>
            <p class="phoneNumber">{{entity.phoneNumber}}</p>
            <p class="address">{{entity.provinceName+" "+entity.cityName+" "+entity.areaName+" "+entity.detail}}</p>
            <div class="" v-if="entity.isDefaultAddr==1">默认地址</div>
            <div style="float: right;" class="operator">
              <span href="#" @click="showEdit(entity)">修改</span>
              <span href="#"  @click="removeItem(entity.id)">删除</span>
            </div>
          </el-row>
        </el-col>
      </el-row>
      {{entityList}}
    </el-row>
  </div>

</template>

<script>
  import { regionDataPlus } from 'element-china-area-data'
  export default {
    name: 'Address',
    data () {
      return {
        entityList:null,
        dialogVisible:false,
        type:'新建',
        address:{
          id:"",
          username:'贝壳',
          phoneNumber:'152195712000',
          selectedOptions: ["130000", "130200", "130203"],
          detail:'黄埔街道',
          code:'520033',
          checked:true
        },
        options: regionDataPlus,

      }
    },
    methods:{
      showEdit(entity){
        this.address.id = entity.id;
        this.address.username = entity.consignee;
        this.address.phoneNumber = entity.phoneNumber;
        this.address.selectedOptions = [JSON.stringify(entity.provinceId), JSON.stringify(entity.cityId), JSON.stringify(entity.areaId)];
          this.address.detail = entity.detail;
        this.address.code = entity.zipCode;
        this.address.checked = entity.isDefaultAddr;
        this.dialogVisible = true;
        this.type='编辑';
      },
      removeItem(id){
        this.$confirm('此操作将永久删除该地址, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get(this.HOST + "/sys/address/delete?id=" + id).then(res => {
            this.findAddress();
          }).catch(err => {
            console.log(err);
          });

        }).catch(() => {

        });
      },

      onSubmit:function () {
        var  addressItem={
          consignee:this.address.username,
          phoneNumber:this.address.phoneNumber,
          provinceId: this.address.selectedOptions[0],
          cityId:this.address.selectedOptions[1],
          areaId: this.address.selectedOptions[2],
          detail:this.address.detail,
          isDefaultAddr:this.address.checked,
          zipCode:this.address.code
        }
        console.log(addressItem);
        this.$http.post(this.HOST + "/sys/address/save", addressItem).then(res=>{
          this.findAddress();
        }).catch(err=>{
          console.log(err);
        });
        this.dialogVisible = false;
      },
      showCreate(){
        this.dialogVisible = true;
        this.type='新建';
      },
      onEdit(){
        this.dialogVisible = false;
        var  addressItem={
          id: this.address.id,
          consignee:this.address.username,
          phoneNumber:this.address.phoneNumber,
          provinceId: this.address.selectedOptions[0],
          cityId:this.address.selectedOptions[1],
          areaId: this.address.selectedOptions[2],
          detail:this.address.detail,
          isDefaultAddr:this.address.checked,
          zipCode:this.address.code
        }
          this.$http.post(this.HOST + "/sys/address/update",addressItem).then(res => {
            this.findAddress();
              }).catch(err => {
                    console.log(err);
            });
      },
      findAddress(){
        this.$http.get(this.HOST+"/sys/address/userAddress").then( (res)=> {
          console.log(res);
          this.entityList = res.data;
        }).catch(err=>{
          console.log(err);
        })
      }
    },
    computed: {
    },
    created(){
      this.findAddress();
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    [v-cloak] {
      display: none;
    }
    a{
      text-decoration: none;
      color: gray;
    }
    .title{
      font-size: 30px;
      font-weight: 400;
      line-height: 68px;
      color: #757575;
    }
    .total{
      .el-col{
        margin-bottom: 24px;
      }
    }
  .item{
    height: 210px;
    border: 1px solid lightgray;
    padding: 15px 24px 0;
    .username{
      font-size: 18px;
      color: #333;
      margin-bottom: 10px;
    }
    .address{
      line-height: 22px;
      color: #757575;
      font-size: 14px;

    }
    .phoneNumber{
           line-height: 22px;
           color: #757575;
     }
    .operator{
      visibility: hidden;
    }
    &:hover{

      border-color: darken(lightgray,15%);
      .operator{
        visibility: visible;
        color:#ff3600 ;
      }
    }
  }

</style>
