<template>
  <div>
    <el-row type="flex" :gutter="10" align="middle">
      <el-col :span="6" style="text-align: center;border-right: 1px dashed #e0e0e0;">
        <div>好评率</div>
        <div>{{rate}}</div>
        <el-rate
          v-model="rate"
          disabled
          :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
        </el-rate>
      </el-col>
      <el-col :span="17" class="comment-tag-list">
        <a >全部评论({{total}})</a>
        <a >晒图({{showpic}})</a>
      </el-col>
    </el-row>
    <div v-for="item in comments">
      <el-row type="flex" :gutter="10">
          <el-col :span="6" style="text-align: center;">
            <div><img :src="item.headPortrait" alt="" style="height: 50px;width:50px;"></div>
            <div>{{item.username}}</div>
            <el-rate
              v-model="item.individualRate"
              disabled
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
            </el-rate>
          </el-col>
          <el-col :span="17">
           <div >
              <div>{{item.msg}}</div>
              <div style="margin-bottom: 10px">{{item.commentTime}}</div>
            </div>
          </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import '@/assets/base.css'
export default {
  name: 'HelloWorld',
  data () {
    return {
        rate:4.7,
      total:48,
      showpic:3,
      comments:[{
        username:'低调*',
        headPortrait:"https://m.zuipin.cn/wap/images/%E7%97%B4.png",
        individualRate:4.7,
        msg:'很不错，比想象中要好。',
        commentTime:"2019-01-31"
      }]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .comment-tag-list a{
    color: #ff3600;
    width: 142px;
    display: inline-block;
    font-size: 14px;
    line-height: 38px;
    border: 1px solid  #ff3600;
    text-align: center;
    margin-right: 14px;
    margin-left: 45px;
  }
</style>
