<template>
   <div>{{message}}
     <qriously :value="value" :size="size" :backgroundAlpha="backgroundAlpha"/>
   </div>

</template>

<script>
    export default {
        name: "Test",
      data(){
          return{
            message: "",
            /*二维码*/
            value: 'http://lxchuan12.github.io/',
            size: 250,
            backgroundAlpha:1
          }
      },
     mounted(){
          this.$http.get(this.HOST+"/sys/hello",{withCredentials:true}).then(res=>{
            console.log(res);
            this.message=res.data;
          })
     }
    }
</script>

<style scoped>

</style>
