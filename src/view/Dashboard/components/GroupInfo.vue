<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-people">
         <i class="el-icon-third-team card-panel-icon"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">新会员</div>
          <div class="card-panel-num">{{entity.registerNum}}</div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-message">
          <i class="el-icon-third-moneycollect card-panel-icon"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">交易额</div>
         <div class="card-panel-num">{{entity.amount}}</div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-money">
         <i class="el-icon-third-shopping card-panel-icon"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">购买</div>
         <div class="card-panel-num">{{entity.orderNum}}</div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-shopping">
          <i class="el-icon-third-message card-panel-icon"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">访客</div>
          <div class="card-panel-num">{{entity.access}}</div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
    export default {
        name: "GroupInfo",
      data(){
        return{
          entity:{
            registerNum:null,
            amount:null,
            orderNum:null,
            access:null
          }
        }
      },
      methods:{
        queryMainData() {
            this.$http.get(this.HOST + "/sys/statistical/statisMainData").then(res => {
                  this.entity=res.data;
                    console.log(res.data);
                }).catch(err => {
                      console.log(err);
              });
        }
      },
      mounted(){
        this.queryMainData();
      }

    }
</script>

<style scoped lang="scss">
  .panel-group {
    margin-top: 18px;
    .card-panel-col{
      margin-bottom: 32px;
    }
    .card-panel {
      height: 108px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);
      .icon-people {
        color: #40c9c6;
      }
      .icon-message {
        color: #36a3f7;
      }
      .icon-money {
        color: #f4516c;
      }
      .icon-shopping {
        color: #34bfa3
      }
      .card-panel-icon-wrapper {
        float: left;
        margin: 14px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }
      .card-panel-icon {
        float: left;
        font-size: 48px;
      }
      .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 26px;
        margin-left: 0px;
        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          margin-bottom: 12px;
        }
        .card-panel-num {
          font-size: 20px;
        }
      }
    }
  }
</style>
