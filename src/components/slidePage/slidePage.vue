<template>
  <div class="slidePage" @click="setTitle">
    <div class="show-change">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-caidan"></use>
      </svg>
    </div>
    <router-link to="/home/myday" class="myday">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-taiyang"></use>
      </svg>
      <span>Myday</span>
    </router-link>
    <router-link to="/home/important" class="important">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xingxing1"></use>
      </svg>
      <span>Important</span>
    </router-link>
    <router-link to="/home/tasks" class="tasks">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fangzi"></use>
      </svg>
      <span>Tasks</span>  
      </router-link>
  </div>
 <!--  -->
</template>
<script>
 export default {
   data(){
     return{
       title:'',
     }
   },
   methods: {
     setTitle(event){
       if (event.target.text) {
          this.title = event.target.text;
       }
     }
   }
 }
</script>
<style scoped lang="scss">
.slidePage {
  width: 18rem;
  border-right: 1px solid #eaeaea;
  display: flex;
  flex-direction: column;
  background: #f4f4f4;
  box-shadow: -1px 10px 10px #eaeaea;
  margin: 0 30px 0 0;
  a {
    height: 36px;
    display: flex;
    align-items: center;
    &:hover {
      background: #fafafa;
    }
    span {
      color: black;
    }
  }
  .icon {
    margin: 0 10px;
    font-size: 20px;
    color: #2e5cdb;
    &:hover {
      cursor: pointer;
    }
    width: 20px;
    height: 100%;
  }
  .show-change {
    margin: 20px 0;
    height: 20px;
  }
}
</style>