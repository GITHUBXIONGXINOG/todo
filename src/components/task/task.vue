<template>
  <div class="task" @contextmenu.prevent="menuPanel" @mouseleave="menuFlag=false">
    <div
      class="icon_click"
      @click="mouseSelect"
      @mouseenter="mouseEnter"
      @mouseleave="mouseLeave"
    >
      <svg class="icon" aria-hidden="true">
        <use :xlink:href="icon_info"></use>
      </svg>
    </div>
    <div class="content">
      <div class="text">{{ taskinfo.task }}</div>
      <div class="title">
        <span>{{ taskinfo.title }}</span>
      </div>
    </div>
    <menu-task :currentTask="taskinfo" v-show="menuFlag" />
  </div>
</template>
<script>
import { reqTaskUpdate } from "../../utils/api";
import menuTask from "./menuTask.vue";
export default {
  components: { menuTask },
  props: ["taskinfo"],
  data() {
    return {
      selectFlag: false, //icon选中flag
      menuFlag: false, //右键菜单flag
    };
  },
  methods: {
    //右键面板
    menuPanel() {
      // console.log(this.taskinfo);
      // this.menuFlag = false
      this.menuFlag = true;
      //  this.menuFlag = ! this.menuFlag
    },
    clickSelect() {
      // debugger;
      console.log("click");
    },
    //鼠标点击icon
    async mouseSelect() {
      // console.log("clickicon");
      // console.log('taskinfo',this.taskinfo);
      let params = {
        ...this.taskinfo,
        // _id: this.taskinfo._id,
        complete: !this.taskinfo.complete,
      };

      await reqTaskUpdate({ data: JSON.stringify(params) }).then((req, res) => {
        // console.log(req);
        if (req.status == "1000") {
          this.$store.dispatch("recordClassPage");
        }
      });
    },
    //鼠标移入
    mouseEnter() {
      this.selectFlag = true;
    },
    //鼠标移出
    mouseLeave() {
      this.selectFlag = false;
    },
  },
  computed: {
    //返回icon对应的iconfont
    icon_info() {
      // console.log(this.taskinfo);
      if (this.taskinfo.complete) {
        //选中
        return "#icon-danxuanxiangxuanzhong";
      } else if (this.selectFlag) {
        //鼠标悬浮
        return "#icon-sel";
      }
      //默认未选中
      return "#icon-danxuanxiangweixuanzhong";
    },
  },
  mounted() {
    document.addEventListener("click", (e) => {
      const contextMenuBox = document.getElementById("contextMenuBox");
      if (contextMenuBox) {
        if (!contextMenuBox.contains(e.target)) {
          this.menuFlag = false;
        }
      }
    });
  },
};
</script>
<style scoped lang="scss">
.task {
  height: 52px;
  // width: 97%;
  background-color: #fff;
  display: flex;
  align-items: center;
  line-height: 100%;
  position: relative;
  transition: all .1s;

  &:hover {
    cursor: pointer;
    background: #f5f5f5;
  }
  //icon外框
  .icon_click {
    width: 20px;
    height: 20px;
    display: flex;
    &:hover {
      cursor: pointer;
    }
    .icon {
      width: 20px;
      height: 20px;
      fill: #0078d7;
    }
  }

  //内容
  .content {
    font-size: 18px;
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 80%;
    box-sizing: border-box;
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
      z-index: 1;
      line-height: 100%;
      display: flex;
    }
  }
}
</style>