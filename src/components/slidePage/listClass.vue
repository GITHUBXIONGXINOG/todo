<template>
  <label class="list-class">
    <svg class="icon" aria-hidden="true">
      <use :xlink:href=iconList[iconflag]></use>
    </svg>
    <span>{{listClass}}</span>
  </label>
</template>
<script>
export default {
  props: ["listClass"],
  data(){
    return{
      iconList:['#icon-taiyang','#icon-xingxing1','#icon-fangzi','#icon-caidan1'],
      // flag:0
    }
  },
  computed:{
    iconflag(){
      let list = this.listClass
      if (list==='Myday') {
           return 0
      }else if(list==='Important'){
        return 1
      }else if(list==='Tasks'){
        return 2
      }
      return 3
    }
  }
};
</script>
<style scoped lang="scss">
.list-class {
  height: 36px;
  width: 100%;
  display: flex;
  // justify-content: center;
  overflow: hidden;
  align-items: center;
  position: relative;
  .icon {
    width: 20px;
    height: 36px;
    position: absolute;
    fill: #8a8a8a;
    margin: 0 10px;
  }
  svg {
    pointer-events: none;
  }
  span {
    width: 100%;
    height: 100%;
    line-height: 36px;
    padding: 0 10px 0 40px;
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    pointer-events: none;
  }
}

</style>