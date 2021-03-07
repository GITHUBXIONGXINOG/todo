<template>
  <div class="loginPanel">
      <img src="@/assets/img/microsoft_logo.svg" alt="" class="mic_log">
    <h2>{{ title }}</h2>
    <input type="text" placeholder="用户名" />
    <div class="moreOpea" v-show="order">
      沒有账户吗?
      <router-link to="/regist">立即创建新账户!</router-link>
    </div>
    <button>下一步</button>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      //标题
      typeof: String,
      required: true,
    },
    order: {
      //序列 0为注册,1为登录
      typeof: Number,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {},
  watch: {
 
  },
};
</script>
<style scoped lang="scss">
//登录面板
.loginPanel {
  background: #ffffff;
  width: 440px;
  height: 300px;
  border: 1px solid rgb(213, 213, 213);
  box-shadow: 5px 5px 10px #5e5b5b;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  box-sizing: border-box;
  padding: 30px;
  //log
  .mic_log {
      width:  120px;
  }
}
//标题
h2{
    font-size: 24px;
    font-weight: bold;
}
//输入
input{
    border-bottom: 1px solid #000;
    height: 20px;
    font-size: 15px;
    // margin: 20px 0;
    padding: 5px 0;
}
//按钮
button{
    width: 108px;
    height: 32px;
    color: #ffffff;
    background: #0067B8;
    margin-top: 20px;
    align-self: flex-end;//设置按钮位置
}
</style>