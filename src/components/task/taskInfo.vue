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
    {{ currentTask }}
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { reqTaskUpdate, reqTaskInfo } from "../../utils/api";
import taskEdit from "../task/taskEdit.vue";
export default {
  data() {
    return {
      MydayText: ["Add", "Added"],
      mydayFlag: 0,
      current: {},
    };
  },
  computed: {
    ...mapGetters(["currentTask"]),
  },
  components: {
    taskEdit,
  },
  methods: {
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

      await reqTaskUpdate({ data: JSON.stringify(params) })
        .then(async (req, res) => {
          if (req.status == "1000") {
            this.$store.dispatch("recordClassPage");
          }
        })
 
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
  border: 1px solid red;
  padding: 0 10px 16px;
  background-color: #f5f5f5;
  color: #767678;
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
      background-color: #f5f5f5;
      cursor: default;
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
</style>