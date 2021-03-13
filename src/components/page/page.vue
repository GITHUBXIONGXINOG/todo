<template>
    <div class="page">
      <slide-page />
      <router-view></router-view>
    </div>
</template>
<script>
import SlidePage from '../slidePage/slidePage.vue'

export default {
    components:{
        SlidePage
    }
}
 
</script>
<style scoped lang="scss">
    .page {
        width: 100%;
        height: 100%;
        display: flex;
        overflow: hidden;
        //task页面
        >:nth-child(2) {
            // width: 80%;
            flex: 1;
            overflow: hidden;
        }
    }
</style>