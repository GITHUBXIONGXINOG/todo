<template>
  <div class="pageInfo">
    <nav>
      {{ currentClass.title }}
    </nav>
    <create-task />
    <div class="list-wrapper" ref="scroll">
      <div
        class="list-item"
        v-for="(item, index) in classPage"
        :key="index"
        v-show="index != 0 || item.task"
      >
        <!-- @click="clickHandler(item)" -->
        <task :taskinfo="item" />
      </div>
    </div>
  </div>
</template>
<script>
import Task from "../task/task.vue";
import CreateTask from "../task/createTask.vue";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      tabelLength: 20,
    };
  },
  computed: {
    ...mapGetters([
      "currentClass", //当前分类
      "classPage", //分类页内容
    ]),
  },
  components: {
    Task,
    CreateTask,
  },

  mounted() {},
  methods: {
    clickHandler(item) {
      // window.alert(item);
      console.log(item);
    },
  },
};
</script>
<style scoped lang="scss">
.pageInfo {
  flex: 1;
  width: 100%;
  height: 84%;

  position: relative;
  //标题
  nav {
    color: #0078d7;
    font-size: 25px;
    margin: 12px 0;
  }

  .list-wrapper {
    height: 100%;
    width: 97%;
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    .list-item {
      height: 52px;
      line-height: 52px;
      font-size: 24px;
      border-bottom: 1px solid #e5e5e5;
      text-align: center;
      &:last-child {
        border-bottom: none;
      }
      &:hover{
        background-color: #f5f5f5;
        width: 100%;
        cursor: pointer;
      }
 
    }

    &::after {
      display: inline-block;
      width: 100%;
      flex: 1;
      overflow: hidden;
      content: "";
      // margin: 0 24px;
      flex: 1;
      //颜色渐变
      background: linear-gradient(
        180deg,
        white,
        white 52px,
        #e5e5e5 52px,
        #e5e5e5 52px
      );
      background-size: 100% 53px;
      box-shadow: inset 0 1px 0 0 #e5e5e5;
    }
  }

  //导航条样式
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    display: none;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-track {
    background: 0 0;
  }
}
</style>