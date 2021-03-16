<template>
  <div class="taskInfo">
    <div class="detailHeader">
      <task-edit :taskinfo="currentTask" />
    </div>
    <div
      class="addMyday"
      @click="updataTask(0)"
      :class="{ addStyle: mydayFlag }"
    >
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-taiyang"></use>
      </svg>
      <span>{{ MydayText[mydayFlag] }} to My Day</span>
    </div>
    <!-- 备注 -->
    <div class="contentArea">
      <div
        class="textarea"
        contenteditable="true"
        @blur="saveContent"
        ref="textarea"
        v-text="contentText"
      >
      </div>
    </div>
    <!-- {{ currentTask }} -->
    <!-- 底部操作 -->
    <div class="detailFooter">
      <svg class="icon" aria-hidden="true" @click="hiddenInfo">
        <use xlink:href="#icon-jiantou-you"></use>
      </svg>
      <div class="timeinfo">
        <span>创建于</span>
        <span>{{ createTime }}</span>
      </div>
      <svg class="icon" aria-hidden="true" @click="deleteTask">
        <use xlink:href="#icon-lajixiang"></use>
      </svg>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import {
  reqTaskUpdate,
  reqSearchTask,
  reqTaskDelete,
  reqTaskInfo,
} from "../../utils/api";
import taskEdit from "../task/taskEdit.vue";
import moment from "moment";
import "moment/locale/zh-cn";

export default {
  data() {
    return {
      MydayText: ["Add", "Added"],
      mydayFlag: 0,
      // current: {},
      contentText: "", //文本备注内容
      tipFlag:false,//备注提示
    };
  },
  computed: {
    ...mapGetters(["currentTask"]),
    //创建时间
    createTime() {
      return moment(this.currentTask.publishDate).startOf().fromNow();
    },
  },
  components: {
    taskEdit,
  },
  methods: {
    //备注更改
    tipChange(){

    },
    //隐藏面板
    hiddenInfo() {
      this.$store.dispatch("setTaskInfoFlag", {
        // flag:this.taskInfoFlag,
        _id: this.currentTask._id,
      });
    },
    //删除task
    async deleteTask() {
      console.log("删除task");
      console.log(this.currentTask);
      let type = this.currentTask.taskClass ? "class" : "task";
      let params = {
        type, //种类,class是分类,task是小task
        _id: this.currentTask._id, //删除id
      };
      await reqTaskDelete({ keyword: JSON.stringify(params) }).then(
        async (req, res) => {
          if (req.status === "1000" && type === "class") {
            this.$store.dispatch("recordTaskClass"); //更新分类
          } else if (req.status === "1000" && type === "task") {
            this.$store.dispatch("recordClassPage"); //更新页面
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
      this.hiddenInfo();
    },
    //存储content
    saveContent() {
      let text = this.$refs.textarea.textContent;
      let params = {
        ...this.currentTask,
        content: text,
      };
      this.updateFn(params);
    },
    //更新函数
    async updateFn(params) {
      await reqTaskUpdate({ data: JSON.stringify(params) }).then(
        async (req, res) => {
          if (req.status == "1000") {
            this.$store.dispatch("recordClassPage");
            this.$store.dispatch("updateCurrentTask");

            if (this.$route.path === "/home/search") {
              //搜索页面还要更新搜索
              await reqSearchTask({ keyword: this.searchKey }).then(
                (req, res) => {
                  //存储搜索页
                  this.$store.dispatch("setSearchPage", req.data);
                  this.$store.dispatch("recordClassPage");
                  this.$store.dispatch("updateCurrentTask");
                }
              );
            }
          }
        }
      );
    },
    async updataTask(index) {
      /* 
            index: 0 添加到Myday
          */

      let setTime = "";
      if (index == "0") {
        //点击按钮后,如果创建时间和提醒时间一样
        if (this.currentTask.time == this.currentTask.publishDate) {
          setTime = Date.now();
        } else {
          //如果不一样(再次点击),将提醒时间改回创建时间
          setTime = this.currentTask.publishDate;
        }
      }
      let params = {
        ...this.currentTask,
        // _id: this.taskinfo._id,
        time: index == 0 ? setTime : this.currentTask.time,
      };
      console.log(params);

      await reqTaskUpdate({ data: JSON.stringify(params) }).then(
        async (req, res) => {
          if (req.status == "1000") {
            this.$store.dispatch("recordClassPage");
            this.$store.dispatch("updateCurrentTask");
          }
        }
      );
    },
  },
  watch: {
    currentTask: {
      handler(val) {
        if (val) {
          if (val.time == val.publishDate) {
            this.mydayFlag = 0;
          } else {
            this.mydayFlag = 1;
          }
          //文本备注内容
          this.contentText = val.content;
        }
      },
      immediate: true,
    },
  },
};
</script>
<style scoped lang="scss">
.taskInfo {
  // width: 360px;
  // height: 100px;
  height: 100%;
  // border: 1px solid red;
  padding: 0 10px 16px;
  background-color: #f5f5f5;
  color: #767678;
  position: relative;
  box-shadow: -1px 10px 10px #eaeaea;

  > div {
    margin: 0 0 10px 0;
  }
  .icon {
    width: 20px;
    height: 20px;
    fill: #767678;
  }
  .detailHeader,
  .addMyday {
    width: 100%;
    // height: 100px;
    background-color: #fff;
  }
  //添加到myday
  .addMyday {
    height: 52px;
    display: flex;
    align-items: center;
    line-height: 100%;
    position: relative;
    transition: all 0.1s;

    .icon {
      margin: 0 10px;
    }
    span {
      padding: 0 6px;
    }
    &:hover {
      background-color: #fafbfc;
      cursor: pointer;
      // box-shadow: 1px 1px 4px rgb(90, 90, 90);
    }
  }
}
//添加的样式
.addStyle {
  color: #465efc;
  .icon {
    fill: #465efc;
  }
}
//备注
.contentArea {
  align-items: flex-start;
  //   padding: 16px;
  height: auto;
  border: 1px solid #eaeaea;
  border-width: 1px;
  border-radius: 2px;
  position: relative;
  //文本框
  .textarea {
    background: #fff;
    min-height: 100px;
    max-height: 300px;
    padding: 5px 10px;
    outline: 0;
    font-size: 14px;
    line-height: 24px;
    word-wrap: break-word;
    overflow-x: hidden;
    overflow-y: auto;
    border-radius: 4px;
    border-color: rgba(82, 168, 236, 0.8);
    &:focus {
      border: 1px solid #346fef;
    }
    &:empty::before{
      content: '添加备注';
    }
    &:focus::before{
      content: none;
    }
  }

  //文字提醒
  .textTip{
    position:absolute;
    top: 0;
    margin: 10px;
  }
}
//底部操作
.detailFooter {
  display: flex;
  position: absolute;
  // width: 340px;
  // width: 370px;
  width: 100%;
  height: 50px;
  // padding: 10px;
  background: #fff;
  bottom: 0;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0px !important;
  box-shadow: -1px 10px 1px #eaeaea46;

  left: 0;
  .icon {
    // margin: 10px;
    padding: 13px;
    // fill: red;
    &:hover {
      background: #fafbfc;
    }
  }
}
</style>