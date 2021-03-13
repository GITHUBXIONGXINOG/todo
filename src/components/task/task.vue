<template>
  <div class="task">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-danxuanxiangweixuanzhong"></use>
    </svg>
    <div class="content">
      <div class="text">{{ taskinfo.task }}</div>
      <div class="title">{{ taskinfo.title }}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["taskinfo"],
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
  display: flex;
  align-items: center;
  line-height: 100%;
  position: relative;
  .icon {
    width: 20px;
    height: 20px;
    position: absolute;
    fill: #0078d7;
  }
  //内容
  .content {
    font-size: 18px;
    padding-left: 30px;

    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 80%;
    box-sizing: border-box;
    // justify-content: center;
    justify-content: space-evenly;
    //文字
    .text {
      text-align: start;
          //多余文字显示省略号
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    }
    //标题
    .title {
      color: #767678;
      font-size: 10px;
      // line-height: 80%;
      // position: absolute;
      // height: 10px;
      // bottom: -100%;
      width: 0;
      z-index: 1;
      line-height: 100%;
    }
  }
}
</style>