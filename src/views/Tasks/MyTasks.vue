<template>
  <div class="my_tasks">
       <page-info />
  </div>
</template>
<script>
import pageInfo from '../../components/page/pageInfo.vue'
 export default{
   components:{
     pageInfo
   }
 }
</script>

<style scoped lang="scss">
  .my_tasks{
  //  border: 1px solid red;
   height: 100%;
 
  }
</style>