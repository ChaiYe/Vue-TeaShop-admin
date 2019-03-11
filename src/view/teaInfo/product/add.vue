<template>
  <section style="width: 800px;margin: 0 auto">
    <el-form :model="product" ref="product" label-width="100px" label-position="right">
            <el-form-item label="标题" prop="title">
                <el-input v-model="product.title" maxlength="120"></el-input>
            </el-form-item>
           <el-form-item label="副标题" prop="subTitle">
              <el-input v-model="product.subTitle" maxlength="100"></el-input>
            </el-form-item>
            <el-form-item label="市场价" prop="marketPrice"  verify can-be-empty number>
              <el-input-number v-model="product.marketPrice" :min="1"></el-input-number>
            </el-form-item>
            <el-form-item label="销售价" prop="salePrice" >
              <el-input-number v-model="product.salePrice" :min="1"></el-input-number>
            </el-form-item>
      <el-form-item label="促销">
       <el-select
         v-model="product.salesPromotionIds"
         multiple
         filterable
         placeholder="请选择促销类型">
         <el-option
           v-for="item in salesPromotionList"
           :key="item.value"
           :label="item.label"
           :value="item.value">
         </el-option>
       </el-select>
     </el-form-item>
     <el-form-item label="推荐类型">
       <el-select v-model="product.recommended">
             <el-option label="不推荐" value="1" ></el-option>
             <el-option label="自饮" value="2"></el-option>
         <el-option label="送礼" value="3"></el-option>
         <el-option label="茶器推荐" value="4"></el-option>
       </el-select>
     </el-form-item>
      <el-form-item label="运费">
        <el-input v-model="product.freight" ></el-input>
      </el-form-item>
      <el-form-item label="库存量">
        <el-input v-model="product.inventory" ></el-input>
      </el-form-item>
      <el-form-item label="净含量">
        <el-input v-model="product.netContent"></el-input>
      </el-form-item>
      <el-form-item label="生成许可证">
        <el-input v-model="product.scLicence"></el-input>
      </el-form-item>
      <el-form-item label="包装规格">
        <el-input v-model="product.packingSpecification" ></el-input>
      </el-form-item>
      <el-form-item label="规格">
        <el-input v-model="product.specifications" ></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-radio v-model="product.type" label="1" @change="requestBrandList">茶叶</el-radio>
        <el-radio v-model="product.type" label="2" @change="requestBrandList">茶具</el-radio>
      </el-form-item>
       <el-form-item label="品牌">
          <el-select
       v-model="product.brandId"
       filterable
       placeholder="请输入品牌">
       <el-option
         v-for="item in brandList"
         :key="item.value"
         :label="item.label"
         :value="item.value">
       </el-option>
     </el-select>
         </el-form-item>
       <el-collapse-transition>
                   <div v-show="product.type==1">
                     <el-form-item label="采摘季节">
                       <el-select v-model="product.session">
                         <el-option label="春" value="1"></el-option>
                         <el-option label="夏" value="2"></el-option>
                         <el-option label="秋" value="3"></el-option>
                         <el-option label="冬" value="4"></el-option>
                       </el-select>
                     </el-form-item>
                     <el-form-item label="保质期">
                       <el-input v-model="product.shelflife" ></el-input>
                     </el-form-item>
                     <el-form-item label="工艺">
                       <el-input v-model="product.process"></el-input>
                     </el-form-item>
                     <el-form-item label="等级">
                       <el-select v-model="product.level">
                         <el-option label="特级" value="1"></el-option>
                         <el-option label="普通" value="2"></el-option>
                         <el-option label="顶级" value="3"></el-option>
                       </el-select>
                     </el-form-item>
                     <el-form-item label="存储方法">
                       <el-input v-model="product.storageMethods"></el-input>
                     </el-form-item>
                   </div>
       </el-collapse-transition>
       <el-collapse-transition>
                   <div v-show="product.type==2">
                     <el-form-item label="材质">
                       <el-input v-model="product.material"></el-input>
                     </el-form-item>
                     <el-form-item label="适用场景">
                       <el-input v-model="product.applicableScenario"></el-input>
                     </el-form-item>
                   </div>
       </el-collapse-transition>
       <el-form-item label="图片">
          <el-upload
              action="api/sys/upload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
              :on-change="handleSuccess"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
       <el-form-item label="状态">
         <el-radio v-model="product.state" label="1">上架</el-radio>
         <el-radio v-model="product.state" label="2">下架</el-radio>
       </el-form-item>
       <el-form-item label="详细">
         <div>
           <quill-editor
             ref="newEditor"
             :options="newOption"
             style="height: 200px; margin-bottom: 54px"
             v-model="product.detailed"
             @change="editorChange">
           </quill-editor>
           <form action="" method="post" enctype="multipart/form-data" id="uploadFormMulti">
             <input style="display: none" :id="uniqueId" type="file" name="avator" multiple accept="image/jpg,image/jpeg,image/png,image/gif" @change="uploadImg('uploadFormMulti')">&lt;!&ndash;style="display: none"&ndash;&gt;
           </form>
         </div>
       </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="save">立即创建</el-button>
              <el-button>取消</el-button>
            </el-form-item>
    </el-form>
    {{this.product}}}
  </section>
</template>

<script>
  import {filterValueBySelect} from '@/utils/filterValue.js'
  import {fileupload} from '@/api/fileupload.js'
  import { quillEditor } from 'vue-quill-editor'
  import Quill from 'quill'
  import { ImageImport } from '@/components/modules/ImageImport.js'
  import { ImageResize } from '@/components/modules/ImageResize.js'
  Quill.register('modules/imageImport', ImageImport)
  Quill.register('modules/imageResize', ImageResize)
    export default {
      name: "add",
      data() {
        return {
          product:{
            "id": "",
            "title": "三和 安溪铁观音 2018春茶 乌龙茶 清香型 特级 和清333 250g",
           "subTitle": "库存告急，卖完售罄",
            "marketPrice": 500,
            "salePrice": 500,
            "salesPromotionIds":null,
            "brandId": 20,
            "netContent": "50克",
            "inventory": null,
            "specifications": null,
            "shelflife": "12月",
            "origin": "武夷山",
            "process": null,
            "level": "特级",
            "scLicence": "QS3505 1401 1652",
            "storageMethods": "密封防晒、防异味、冷藏为宜",
            "packingSpecification": "长36.7*宽15.1*高7.2cm",
            "material": null,
            "applicableScenario": null,
            "detailed": null,
            "largerPics": null,
            "thumbnailPic": null,
            "session":"春",
            "freight": 12,
            "type": 1,
            "recommended":"1",
            "state":1
          },
          salesPromotionList:[],
          brandList:[],

          loading: false,
          dialogImageUrl: '',
          dialogVisible: false,

          /*富文本编辑器*/
          editorContent: '',
          uniqueId: '',
          imgPercent: 0,
          imageLoading: false,
          newOption: {
            placeholder: '请填写简介',
            history: {
              delay: 100,
              maxStack: 100,
              userOnly: false
            },
            modules: {
              toolbar: [
                [{ 'size': ['small' ,'large', 'huge'] }],
                ['bold', 'italic', 'underline'],
                ['blockquote'],
                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                [{ 'font': [] }],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['link', 'image']
              ],
              imageImport: true,
              imageResize: {
                displaySize: true
              },
            },
            strict: false,//should be false for ignore unexpected update
          },
          addImgRange: '',//全局参数，每次添加图片时记录当前索引和长度
        }
      },
      methods: {

        //保存商品
        save() {
          this.$http.post(this.HOST+"/sys/goods/save",this.product).then(function (res) {
            console.log(res);
            this.product = {};
          }).catch(function (error) {
            console.log(error);
          })
        },

        //处理删除图片
        handleRemove(file, fileList) {
          console.log(file.response.url);
          this.$http.get(this.HOST + "/sys/deleteFile?url="+file.response.url).then((res)=>{
            console.log(res);
          });
        },
        handleSuccess(file, fileList) {
          console.log(fileList);
          this.product.largerPics = filterValueBySelect(fileList,'response');

        },
        //图片预览
        handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        },
        //查询品牌列表
        requestBrandList() {
          this.$http.get(this.HOST + "/sys/brand/find2Selection?type="+this.product.type).then((res)=>{
            console.log(res);
            console.log("品牌返回消息")
            this.brandList=res.data;
          });

        },
        //查询促销列表
        requestPromotionList() {
          this.$http.get(this.HOST+"/sys/salesPromotion/find2Selection").then((res)=>{
            console.log(res);
            console.log("促销返回消息")
            this.salesPromotionList = res.data;
          });
        },

        /*富文本编辑器*/
        editorChange({ editor, html, text }) {
          var vm = this
          vm.$emit('editorChange', html)
        },
        uploadImg: async function(id) {
          var vm = this
          vm.imageLoading = true

          var formData = new FormData();
          formData.append('file', document.querySelector('#' + id)[0].files[0]);

          try {
            console.log(formData);
            const url = await vm.uploadImgReq(formData)
            console.log(url)
            if (url != null && url.length > 0) {
              var value = url
              value = value.indexOf('http') != -1 ? value : 'http:' + value //返回图片网址中如果没有http自动拼接
              let index = vm.addImgRange != null?vm.addImgRange.index:0 // 获取插入时的位置索引，如果获取失败，则插入到最前面
              vm.$refs.newEditor.quill.insertEmbed(index , 'image', value, Quill.sources.USER)
              var img = new Image()
              img.src = value
              vm.$refs.newEditor.quill.formatText(index, index + 1, 'width', 400 + 'px');
            } else {
            }
            document.getElementById(vm.uniqueId).value=''
          } catch ({message: msg}) {
            document.getElementById(vm.uniqueId).value=''
          }
          vm.imageLoading = false
        },
        uploadImgReq (formData) {
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
          return new Promise((resolve, reject) => {
            this.$http.post(this.HOST+"/sys/upload",formData,config).then(res=>{
              console.log(res);
              let status = res.data.status;
              let url = res.data.url;
              if (status===200) {
                resolve(url);
              } else {
                reject({message: '图片上传失败'})
              }
            }).catch(e=>{
                console.log(e);
              }
            )
          })
        },

      },
      props: ['text', 'editorId'],
      components: {quillEditor},
      created: function () {
        var vm = this
        vm.imgPercent = 0
        vm.editorContent = vm.text
        vm.uniqueId = vm.editorId?vm.editorId:'inputImg'
      },
      watch:{
        text: function () {
          var vm = this
          vm.editorContent = vm.text
        }
      },
      mounted() {
        this.requestPromotionList();
        this.requestBrandList();
        var vm =this
        // you can use current editor object to do something(quill methods)
        var imgHandler = async function(image) {
          vm.addImgRange = vm.$refs.newEditor.quill.getSelection()
          if (image) {
            var fileInput = document.getElementById(vm.uniqueId) //隐藏的file文本ID
            fileInput.click() //加一个触发事件
          }
        }
        vm.$refs.newEditor.quill.getModule("toolbar").addHandler("image", imgHandler)
      }
    }
</script>

<style scoped>

</style>
