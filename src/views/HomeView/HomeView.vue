<template>
  <div class="homeView">
     <nav-top />
     <page />
  </div>
</template>
<script>
import navTop from "../../components/navTop/navTop.vue";
import page from "../../components/page/page";
export default {
    components:{
    navTop,
    page,
    },
    // mounted(){
    //     this.$store.dispatch('getLoginStatus')
    // }
}
</script>
<style scoped lang="scss">
    .homeView{
         width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
</style>