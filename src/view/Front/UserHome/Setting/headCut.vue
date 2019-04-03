<template>
    <div>
      <my-upload field="file"
                 @crop-success="cropSuccess"
                 @crop-upload-success="cropUploadSuccess"
                 @crop-upload-fail="cropUploadFail"
                 v-model="show"
                 :width="100"
                 :height="100"
                 url="/api/sys/uploadUserHead"
                 :params="params"
                 :headers="headers"
                 img-format="png"></my-upload>

      <div style="position:relative;">
      <img :src="imgDataUrl" @click="toggleShow" width="200" height="200" style="border: 1px solid #ccc;padding: 5px">
        <div style="position:absolute; z-index:2; left:60px; bottom:10px;max-width:200px; max-height:200px">点击更换头像</div>
      </div>
    </div>
</template>

<script>
  import 'babel-polyfill';
  import myUpload from 'vue-image-crop-upload';
  export default {
        name: "headCut",
      data () {
        return {
          show: false,
          params: {
            username:''
          },
          headers: {
            smail: '*_~'
          },
          imgDataUrl: '/static/img/photo.jpg' // the datebase64 url of created image
        }
      },
      components: {
        'my-upload': myUpload
      },
      methods: {
        toggleShow() {
          this.show = !this.show;
        },
        /**
         * crop success
         *
         * [param] imgDataUrl
         * [param] field
         */
        cropSuccess(imgDataUrl, field){
          console.log('--------裁剪成功 --------');
          this.imgDataUrl = imgDataUrl;
        },
        /**
         * upload success
         *
         * [param] jsonData   服务器返回数据，已进行json转码
         * [param] field
         */
        cropUploadSuccess(jsonData, field){
          this.imgDataUrl=jsonData.url;
        },
        /**
         * upload fail
         *
         * [param] status    server api return error status, like 500
         * [param] field
         */
        cropUploadFail(status, field){
          console.log('-------- upload fail --------');
          console.log(status);
          console.log('field: ' + field);
        },

        quertHeadCut(){
              this.$http.get(this.HOST + "/sys/user/getUserInfo").then(res => {
                    console.log(res.data)
                    this.imgDataUrl=res.data.headPortrait;
                    console.log(res.data);
                }).catch(err => {
                      console.log(err);
              });
        },
        getUid(){
            this.$http.get(this.HOST + "/sys/userLogin/getLoginUserName").then(res => {
              console.log("头像用户名");
              console.log(res.data);
              this.params.username = res.data;
                }).catch(err => {
                      console.log(err);
              });

        }
      },
    mounted(){
      this.quertHeadCut();
      this.getUid();
    }
    }
</script>

<style scoped>

</style>
