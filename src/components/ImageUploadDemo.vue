<template>
  <vue-core-image-upload
    :class="['btn', 'btn-primary']"
    :crop="false"
    @imageuploaded="imageuploaded"
    :data="data"
    :max-file-size="5242880"
    url="your server url"
    text="你好世界"
    extensions="png,jpg,gif">
  </vue-core-image-upload>
</template>

<script>
  import VueCoreImageUpload  from 'vue-core-image-upload';
    export default {
      name: "ImageUploadDemo",
      methods: {
        imageuploaded(res) {
          if (res.errcode == 0) {
            this.src = 'http://img1.vued.vanthink.cn/vued751d13a9cb5376b89cb6719e86f591f3.png';
          }
        }
      },
      components: {
        'vue-core-image-upload': VueCoreImageUpload
      },
      data(){
          return {
            data: {
              src: 'http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png',
            }
          }
      }
    }
</script>

<style scoped>

</style>
