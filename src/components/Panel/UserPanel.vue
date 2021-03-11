<template>
  <div class="user_panel">
    <!-- <router-link to="/login" @click="signOut" class="sign-out-button">Sign out</router-link> -->
    <div to="/login" @click="signOut" class="sign-out-button">Sign out</div>

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
    //退出登录
    async signOut() {
      let result = await reqLogout();
      localStorage.setItem("userInfo", null);
      // console.log(result);
      //清空state
      this.$store.dispatch('clearState')
      console.log(this.$store.state);
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