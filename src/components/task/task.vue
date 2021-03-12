<template>
  <div class="task">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-danxuanxiangweixuanzhong"></use>
    </svg>
    <div class="content">{{taskinfo.task}}</div>
  </div>
</template>
<script>
export default {
  props:['taskinfo']

};
</script>
<style scoped lang="scss">
.task {
  height: 52px;
  width: 97%;
  //   border: 1px solid transparent;
  border: 2px solid #e5e5e5;
  border-left: none;
  border-right: none;

  background-color: #fff;

  //   border-bottom: 1px solid red;

  // position:absolute;
  // top: 50px;
  //   z-index: 10;
  display: flex;
  align-items: center;
  .icon {
    width: 20px;
    height: 20px;
    position: absolute;
    fill: #0078d7;
  }
  .content {
    padding-left: 30px;
      display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
  }
}
</style>