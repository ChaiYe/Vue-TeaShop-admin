<template>
  <!--获取菜单数据-->
  <div style="display: flex;z-index:1000;cursor: pointer" @mouseleave="hidden">
    <ul class="indexitem">
      <li href="#" v-for="(obj,key) in category"   @mouseenter="visible(obj)">
        {{obj.label}}
      </li>
    </ul>
    <ul v-show="context.length>0" class="indexitem">
      <li v-for="(obj,key) in  context" class="subitemindex" @click="searchByTeaTeast(obj.value)">
        {{obj.label}}
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "Index",
        data(){
          return{
            category:[],
            context:[]
          }
        },
      methods:{
        visible(val){
          this.category.forEach((item)=>{
            if (item.label == val.label) {
                this.context=item.children;
              }
            })
        },
        hidden(){
            this.context=[]
        },
        /*获取数据*/
        getData(){
          this.$http.get(this.HOST + "/sys/teaCategory/findAllForFront").then((res)=>{
            console.log("index的数据回来");
            console.log(res);
            this.category = res.data;
          }).catch(function (error) {
            console.log(error);
          })
        },
        searchByTeaTeast(id) {
          /*通知父组件关闭显示Index*/
          this.$emit('indexVisible', false);
          this.$router.push({path:'/front/searchByTeaTeast/'+id})
        }
      },
      directives:{
        'mtfoucus':{
            bind:function (el, binding, vnode) {
              el.onmouseenter = function () {
                console.log("111111")
              };
              el.onmouseleave=function () {
                console.log("22222");
              };
            }
        }

      },
      mounted(){
        this.getData();
      }
    }
</script>

<style lang="scss">
.indexitem{
  li{
    cursor: pointer;
    line-height: 32px;
    background: #ffffff;
    padding: 12px;
    padding-left: 52px;
    width: 200px;
    box-shadow: 1px 1px 1px 1px #ccc;
    &:hover{
      background: #f2f2f2;
    }
    .subitemindex{
      background: #fff;
      &:hover{
        background: #f2f2f2;
        .subitemindex{
          background: #f2f2f2;
        }
      }
    }
}
}
</style>
