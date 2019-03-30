<template>
  <div style="text-align: center;margin-top: 80px;font-size:48px;color:#ccc">
  即将跳转支付宝支付页面．．．
  </div>
</template>

<script>
    export default {
        name: "pay",
        methods:{
          queryAliPay(){
            let payId = this.$route.params.payId;
              this.$http.get(this.HOST + "/sys/alipay/payPage?tradeNum="+payId).then(res => {
                const div = document.createElement('div');
                div.innerHTML = res.data.body; // html code
                document.body.appendChild(div);
                document.forms.punchout_form.submit();
                  }).catch(err => {
                        console.log(err);
                });
          }
        },
        mounted(){
          this.queryAliPay();
        }
    }
</script>

<style scoped>

</style>
