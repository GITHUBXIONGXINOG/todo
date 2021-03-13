<template>
  <div class="task">
    <svg class="icon" aria-hidden="true" @click="clickSelect()" @mouseenter="mouseHover()">
      <use :xlink:href="icon_info"></use>
    </svg>
    <div class="content">
      <div class="text">{{ taskinfo.task }}</div>
      <div class="title">{{ taskinfo.title }}</div>
    </div>
    {{ taskinfo.complete }}
  </div>
</template>
<script>
export default {
  props: ["taskinfo"],
  data() {
    return {
      selectFlag: false
    };
  },
  methods: {
    clickSelect() {
      debugger;
      console.log('click');

    },
    mouseHover(){
      debugger

    }
  },
  computed: {
    icon_info() {
      if (this.taskinfo.complete) {//选中
        return "#icon-danxuanxiangxuanzhong";
      } else if (this.selectFlag) {//鼠标悬浮
        return "#icon-sel";
      }
      //默认未选中
      return "#icon-danxuanxiangweixuanzhong";
    },
  },
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
  &:hover {
    // cursor: pointer;
  }
  .icon {
    width: 20px;
    height: 20px;
    position: absolute;
    fill: #0078d7;
  &:hover {
    cursor: pointer;
  }
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