<template>
    <div class="loginView">
        <login-panel :order="0"/>
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
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    //登录面板  
    .loginPanel{
         
    }
</style>