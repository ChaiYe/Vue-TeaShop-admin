<template>
  <div style="display: flex;background: green" @mouseleave="hidden">
    <ul>
      <li href="#" v-for="(obj,key) in category"   @mouseenter="visible(obj)">
        {{obj.label}}
      </li>
    </ul>
    <ul v-show="context.length>0" >
      <li v-for="(obj,key) in  context" style="background: #eee">
        {{obj.value}}
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "Index",
        data(){
          return{
            category:[{
              value: 'beijing',
              label: '北京',
              children: [{
                value: 'chaoyang',
                label: '朝阳'
              }, {
                value: 'haidian',
                label: '海淀'
              }, {
                value: 'changping',
                label: '昌平'
              }, {
                value: 'shunyi',
                label: '顺义'
              }]
            }, {
              value: 'shanghai',
              label: '上海',
              children: [{
                value: 'baoshan',
                label: '宝山'
              }, {
                value: 'jiading',
                label: '嘉定'
              }, {
                value: 'songjiang',
                label: '松江'
              }, {
                value: 'pudong',
                label: '浦东'
              }]
            }],
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

      }
    }
</script>

<style lang="scss">
li{
  line-height: 32px;
  background:#ccc;
  margin: 12px;
  width: 200px;
}
</style>
