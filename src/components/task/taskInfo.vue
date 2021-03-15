<template>
  <div class="taskInfo">
    <div class="detailHeader">
      <task-edit :taskinfo="currentTask" />
    </div>
    <div class="addMyday" @click="updataTask(0)">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-taiyang"></use>
      </svg>
      <span>Add to My Day</span>
    </div>
    {{ currentTask }}
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import {reqTaskUpdate} from '../../utils/api'
import taskEdit from "../task/taskEdit.vue";
export default {
  computed: {
    ...mapGetters(["currentTask"]),
  },
  components: {
    taskEdit,
  },
  methods: {
      async updataTask(index){
          /* 
            index: 0 添加到Myday
          */
            let params = {
                ...this.currentTask,
                // _id: this.taskinfo._id,
                time: index ==0 ? Date.now() : this.currentTask.time,
            };
            console.log(params);

      await reqTaskUpdate({ data: JSON.stringify(params) }).then(
        async (req, res) => {
          if (req.status == "1000") {
            this.$store.dispatch("recordClassPage");
          }
        }
      );
      }
  }
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
</style>