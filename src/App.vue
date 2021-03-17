<template>
  <div id="app">
    <!-- <loading /> -->
    <main-page />


  </div>
</template>

<script>
import MainPage from './components/page/MainPage.vue'
export default {
  components:{
    MainPage
  }
};
</script>



<style lang="scss">
#app {
  /*   font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50; */

  height: 100%;
  width: 100%;
  overflow: hidden;
  // display: flex;
  // justify-content: space-between;
  // .loginView {
  //   position: fixed;
  //   left: 0;
  //   right: 0;
  //   margin: auto;
  // }
  // .welcome_left,
  // .welcome_right {
  //   height: 100%;
  //   display: none;
  // }
  // .showBackground {
  //   display: initial;
  // }
}
</style>
