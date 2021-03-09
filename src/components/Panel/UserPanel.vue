<template>
  <div class="user_panel">
    <router-link to="/login" @click="signOut">Sign out</router-link>
  </div>
</template>
<script>
export default {
    methods: {
      signOut(){
        //  window.localStorage.setItem("token","")

      }
    }
}
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
    .user_panel{
      background: #fff;
      border: 1px solid #ddd;
      width: 100%;
      height: 100%;
      box-shadow: 5px 10px 15px #ddd;
      animation: panelMove 0.1s;
      z-index: 999;
      position: relative;
    }

    
</style>