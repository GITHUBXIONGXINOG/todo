<template>
  <div class="main_page">
    <img src="@/assets/img/welcome-left.png" alt="" class="welcome_left" :class="{showBackground:showFlag}"/>
    <router-view />
    <img src="@/assets/img/welcome-right.png" alt="" class="welcome_right" :class="{showBackground:showFlag}"/>
  </div>
</template>
<script>
export default {
    computed:{
        showFlag(){
            console.log(this.$route.path);
            if (this.$route.path=='/login' || this.$route.path=='/regist') {
                return true
            }
            return false
        }
    }
};
</script>
<style scoped lang="scss">
.main_page {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  .loginView {
    position: fixed;
    left: 0;
    right: 0;
    margin: auto;
  }
  .welcome_left,
  .welcome_right {
    height: 100%;
    display: none;
  }
  .showBackground {
    display: initial;
  }
}
</style>