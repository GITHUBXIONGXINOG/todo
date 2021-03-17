<template>
  <div id="app">
    <img src="@/assets/img/welcome-left.png" alt="" class="welcome_left" />
    <router-view />
    <img src="@/assets/img/welcome-right.png" alt="" class="welcome_right" />
  </div>
</template>

<style lang="scss">
#app {
  /*   font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50; */
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  .loginView {
    align-self: center;
    margin-left: -12%;
  }

}
</style>
