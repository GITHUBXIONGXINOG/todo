<template>
  <div
    class="task_edit"
    @contextmenu.prevent="menuPanel"
    @mouseleave="menuFlag = false"
  >
    <div
      class="icon_click"
      @click="mouseSelect(0)"
      @mouseenter="mouseEnter"
      @mouseleave="mouseLeave"
    >
      <svg class="icon" aria-hidden="true">
        <use :xlink:href="icon_info"></use>
      </svg>
    </div>
    <div class="content">
      <!-- <div class="text">{{ taskinfo.task }}</div> -->
      <input type="text" v-model="taskContext" @keydown.enter="changeText" />
    </div>
    <!-- 重要icon -->
    <div class="im_click" @click="mouseSelect(1)">
      <svg class="icon" aria-hidden="true">
        <use :xlink:href="icon_im"></use>
      </svg>
    </div>

    <menu-task :currentTask="taskinfo" v-show="menuFlag" />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { reqTaskUpdate, reqSearchTask } from "../../utils/api";
import menuTask from "./menuTask.vue";
export default {
  components: { menuTask },
  props: ["taskinfo"],
  data() {
    return {
      selectFlag: false, //icon选中flag
      menuFlag: false, //右键菜单flag
      imSelectFlag: false, //重要选中
      taskContext: "", //task文字内容
    };
  },
  methods: {
    //修改文字
    changeText() {
      let params = {
        ...this.taskinfo,
        // _id: this.taskinfo._id,
        task: this.taskContext,
 
      };
      this.updateFn(params);
    },
    //重要选中
    importantSelect() {
      debugger;
    },
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
    //更新函数
    async updateFn(params) {
      await reqTaskUpdate({ data: JSON.stringify(params) }).then(
        async (req, res) => {
          if (req.status == "1000") {
            this.$store.dispatch("recordClassPage");
            if (this.$route.path === "/home/search") {
              //搜索页面还要更新搜索
              await reqSearchTask({ keyword: this.searchKey }).then(
                (req, res) => {
                  //存储搜索页
                  this.$store.dispatch("setSearchPage", req.data);
                  this.$store.dispatch("recordClassPage");
                }
              );
            }
          }
        }
      );
    },
    //鼠标点击icon
    mouseSelect(index) {
      /* 
        index:0 修改完成状态 | 1 修改重要状态
      */

      let params = {
        ...this.taskinfo,
        // _id: this.taskinfo._id,
        complete: index == 0 ? !this.taskinfo.complete : this.taskinfo.complete,
        important:
          index == 1 ? !this.taskinfo.important : this.taskinfo.important,
      };
      this.updateFn(params);
            this.$store.dispatch("updateCurrentTask")

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
    ...mapGetters(["searchKey"]),
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
    //重要的icon
    icon_im() {
      if (this.taskinfo.important) {
        return "#icon-xingxing";
      }
      return "#icon-xingxing1";
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
  watch: {
    taskinfo: {
      handler(val) {
        this.taskContext = val.task;
      },
    },
  },
};
</script>
<style scoped lang="scss">
.task_edit {
  height: 52px;
  //   width: 100%;
  //   box-sizing: border-box;
  background-color: #fff;
  display: flex;
  align-items: center;
  line-height: 100%;
  position: relative;
  transition: all 0.1s;
  padding: 0 10px 2px;
  //   &:hover {
  //     cursor: pointer;
  //     background: #f5f5f5;
  //   }
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
    // font-size: 18px;
    // padding-left: 10px;
    // display: flex;
    // flex-direction: column;
    // position: relative;
    // width: 257px;
    // height: 80%;
    // box-sizing: border-box;
    // justify-content: space-evenly;
    // padding: 4px 0;
    // margin: 10px 0;
    // //文字
    // .text {
    //   text-align: start;
    //   //多余文字显示省略号
    //   display: inline-block;
    //   overflow: hidden;
    //   white-space: nowrap;
    //   text-overflow: ellipsis;
    //   height: 100%;
    // }
    padding: 0 8px;
    input {
      width: 237px;
      padding: 5px 8px 6px;
      font-size: 18px;
      margin: 0 5px 0 0;
      //悬浮样式
      &:hover {
        background-color: #f5f5f5;
        cursor: default;
      }
      //输入样式
      &:focus {
        background-color: #fafafa;
      }
    }
  }

  //重要
  .im_click {
    width: 20px;
    height: 20px;
    display: flex;
    // margin: 0 10px 0 0;
    margin: 0;
    .icon {
      width: 20px;
      height: 20px;
      // fill: #0078d7;
    }
    &:hover {
      .icon {
        fill: #0078d7;
      }
    }
  }
}
</style>