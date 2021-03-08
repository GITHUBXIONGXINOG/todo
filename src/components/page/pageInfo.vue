<template>
  <div class="pageInfo">
    <nav>
      {{PathTitle}}
    </nav>
    <create-task />
    <ul class="list">
      <li v-for="(n, index) in tabelLength" :key="index">
        <task />
      </li>
    </ul>
    <ul class="page-background">
      <li v-for="(n, index) in tabelLength" :key="index"></li>
    </ul>
  </div>
</template>
<script>
import Task from '../task/task.vue'
import CreateTask from '../task/createTask.vue'
 export default {
   data(){
     return{
         tabelLength: 20,

     }
   },
   computed:{
     PathTitle(){
       let path = this.$route.path.replace(/\/home\//,'')
       return path.slice(0,1).toUpperCase().concat(path.slice(1).toLowerCase())
     }
   },
   components:{
     Task,
     CreateTask,
   }
 }
 
</script>
<style scoped lang="scss">
.pageInfo {
  flex: 1;
  width: 100%;
  position: relative;
  //标题
  nav{
    color: #0078d7;
    font-size: 25px;
    margin: 12px 0;
  }
  //背景
  .page-background {
    position: fixed;
    top: 100px;
    width: 79%;
    z-index: -100;
    li {
      height: 52px;
      border-bottom: 2px solid #e5e5e5;
      margin: 0 30px 0 0;
    }
  }

  .list{
    overflow: auto;
  }


}
</style>