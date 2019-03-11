<template>
  <div>
    <Header></Header>
    <Conditions></Conditions>
    <GoodListItem></GoodListItem>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from  '@/components/header'
  import Conditions from  '@/components/conditions'
  import  GoodListItem from '@/components/goodListItem'
  import  Footer from '@/components/footer'
    export default {
        name: "goodList",
      components:{
        Header,
        Conditions,
        GoodListItem,
        Footer
      }
    }
</script>

<style scoped>

</style>
