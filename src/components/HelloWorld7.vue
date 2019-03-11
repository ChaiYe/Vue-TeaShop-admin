<template>
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
    <el-form-item label="详细地址"  style="width: 30%">
      <el-input type="textarea" placeholder="详细地址" v-model="address.detail">
      </el-input>
    </el-form-item>
    <el-form-item label="邮政编码"  style="width: 30%">
      <el-input v-model="address.code"></el-input>
    </el-form-item>
    <el-form-item>
      <el-checkbox v-model="address.checked">设为默认地址</el-checkbox>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { regionDataPlus } from 'element-china-area-data'
  import '@/assets/base.css'
  export default {
    name: 'HelloWorld',
    data () {
      return {
        address:{
          username:'',
          phoneNumber:'',
          selectedOptions: [],
          detail:'',
          checked:true
        },
        options: regionDataPlus,

      }
    },
    methods:{
      onSubmit:function () {
        this.$message('这是一条消息提示');
      }
    },
    mounted:function () {
    },
    computed: {
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .input{
      width: 20%;
    }
</style>
