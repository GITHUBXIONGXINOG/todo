<template>
  <div class="task">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-danxuanxiangweixuanzhong"></use>
    </svg>
    <div class="content">
    task

    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped lang="scss">
.task {
  height: 52px;
  width: 97%;
  border: 1px solid transparent;
  // border: 1px solid red;

  // position:absolute;
  // top: 50px;
  display: flex;
  align-items: center;
  .icon {
    width: 20px;
    height: 20px;
    position: absolute;
    fill: #0078d7;
  }
  .content{
      padding-left: 30px;
  }

}
</style>