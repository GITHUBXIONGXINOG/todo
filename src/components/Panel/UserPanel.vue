<template>
  <div class="user_panel">
    <!-- <router-link to="/login" @click="signOut" class="sign-out-button">Sign out</router-link> -->
    <div to="/login" @click="signOut" class="sign-out-button">Sign out</div>

    <!--
                enctype 指定表单数据的编码类型
                    application/x-www-form-urlencoded
                        name=zhangsan&age=20
                    multipart/form-data 将表单数据编码成二进制类型
            -->
    <!-- /分类标题 -->
    <!-- <div class="item">
      <a class="btn" @click="toggleShow1">设置头像</a>
      <img
        class="avatar"
        v-if="avatarUrl1"
        :src="avatarUrl1"
        v-show="true"
        style="display: none"
      />
      <my-upload
        url="/api/img_upload"
        img-format="jpg"
        img-bgc="#fff"
        v-model="show1"
        field="avatar1"
        ki="0"
        @crop-success="cropSuccess"
        @crop-upload-success="cropUploadSuccess"
        @crop-upload-fail="cropUploadFail"
        :no-rotate="false"
        :headers="headers"
        :params="otherParams"
      ></my-upload>
    </div> -->

    <!--
                enctype 指定表单数据的编码类型
                    application/x-www-form-urlencoded
                        name=zhangsan&age=20
                    multipart/form-data 将表单数据编码成二进制类型
            -->
    <!-- /分类标题 -->
    <iframe id="myIframe" name="hideIframe" style="display: none"></iframe>
    <form
      class="form-container"
      action="/api/img_upload"
      method="post"
      enctype="multipart/form-data"
      target="hideIframe"
    >
      <div class="form-group">
        <label for="exampleInputFile">头像</label>
        <input type="file" name="userImage" ref="file" />
        <div class="thumbnail-waper">
          <img class="img-thumbnail" src="" ref="preview" />
        </div>
      </div>

      <div class="buttons">
        <input type="submit" class="btn btn-primary" />
      </div>
    </form>

    <h2>{{ userInfo.account }}</h2>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { reqLogout, reqImgInfo } from "../../utils/api";

import myUpload from "vue-image-crop-upload";

export default {
  data() {
    return {
      imageUrl: "",
    };
  },
  components: {
    myUpload,
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  mounted() {
    //存储图片
    let preview = this.$refs.preview;
    //当用户选择完文件后读取文件
    this.$refs.file.onchange = function () {
      //1.创建文件读取对象,reader变量就是文件读取对象
      let reader = new FileReader();
      //用户选择的文件列表,this表示该标签
      //2.读取文件,参数就是读取的文件
      reader.readAsDataURL(this.files[0]);
      //3.监听onload事件
      reader.onload = function () {
        // console.log(reader.result)
        //修改img的src
        preview.src = reader.result;
      };
    };
  },
  methods: {
    async imgSubmit() {
      let file = this.$refs.imgupload.files[0];

      debugger;
      //  getBase64(imgURL)
      // await reqImgInfo({data:formData})
    },

    //退出登录
    async signOut() {
      let result = await reqLogout();
      localStorage.setItem("userInfo", null);
      // console.log(result);
      //清空state
      this.$store.dispatch("clearState");
      this.$router.replace("/login");
    },
  },
};
</script>
<style scoped lang="scss">
@keyframes panelMove {
  0% {
    transform: opacity(0);
  }
  30% {
    transform: opacity(0.3);
  }
  60% {
    transform: opacity(0.6);
  }
  80% {
    transform: opacity(0.9);
  }
  100% {
    transform: opacity(1);
  }
}
.user_panel {
  background: #fff;
  border: 1px solid #ddd;
  width: 100%;
  height: 100%;
  box-shadow: 5px 10px 15px #ddd;
  animation: panelMove 0.1s;
  z-index: 999;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
}
//退出登录
.sign-out-button {
  align-self: flex-end;
  font-size: 16px;
  color: #5a5753;
}
//用户姓名
h2 {
  font-size: 18px;
  color: black;
  font-weight: bold;
}
//表格
.form-container{
  img{
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
}
</style>