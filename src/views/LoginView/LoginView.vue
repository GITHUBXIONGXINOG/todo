<template>
    <div class="loginView">
        <login-panel :order="1"/>
    </div>
</template>
<script>
import LoginPanel from '../../components/Panel/LoginPanel.vue'
export default {
     components:{
        LoginPanel
    }
}
</script>
<style scoped lang="scss">
     .loginView{
        // background-image: linear-gradient(to bottom right,#e66465, #9198e5);
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    //登录面板  
    .loginPanel{
         
    }
</style>