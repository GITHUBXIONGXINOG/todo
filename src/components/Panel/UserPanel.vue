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
    <form
      class="form-container"
      action="/admin/article-add"
      method="post"
      enctype="multipart/form-data"
    >
      <div class="form-group">
        <label>标题</label>
        <input
          type="text"
          class="form-control"
          placeholder="请输入文章标题"
          name="title"
        />
      </div>
      <div class="form-group">
        <label>作者</label>
      </div>
      <div class="form-group">
        <label>发布时间</label>
        <input name="publishDate" type="date" class="form-control" />
      </div>

      <div class="form-group">
        <label for="exampleInputFile">文章封面</label>
        <!--
                        multiple 允许用户一次性选择多个文件
                   -->
        <input type="file" name="cover" id="file" />
        <div class="thumbnail-waper">
          <img class="img-thumbnail" src="" id="preview" />
        </div>
      </div>
      <div class="form-group">
        <label>内容</label>
        <textarea name="content" class="form-control" id="editor"></textarea>
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
import { reqLogout } from "../../utils/api";

export default {
  data() {
    return {
      loginname: "",
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  mounted() {
    // this.loginname = this.cookie.getCookie("user")
  },
  methods: {
    imgSet() {
      debugger;
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
</style>