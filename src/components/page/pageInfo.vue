<template>
  <div class="pageInfo">
    <nav>
      {{ PathTitle }}
    </nav>
    <create-task />
    <div class=" scroll-wrapper" ref="scroll">
      <div class="list scroll-content">
        <div
          class="scroll-item"
          v-for="(item, index) in emojis"
          :key="index"
           @click="clickHandler(item)"
        >
          <task />
        </div>
      </div>
    </div>
<!--     <ul class="list scroll-content">
      <li v-for="(n, index) in tabelLength" :key="index" class="scroll-item">
        <task />
      </li>
    </ul> -->
    <ul class="page-background">
      <li v-for="(n, index) in tabelLength" :key="index"></li>
    </ul>
  </div>
</template>
<script>
import Task from "../task/task.vue";
import CreateTask from "../task/createTask.vue";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      tabelLength: 20,
      emojis: [
        "😀 😁 😂 🤣 😃",
        "😄 😅 😆 😉 😊",
        "😫 😴 😌 😛 😜",
       "😀 😁 😂 🤣 😃",
              "😫 😴 😌 😛 😜",
       "😀 😁 😂 🤣 😃",
              "😫 😴 😌 😛 😜",
       "😀 😁 😂 🤣 😃",
              "😫 😴 😌 😛 😜",
       "😀 😁 😂 🤣 😃",
        
             "😫 😴 😌 😛 😜",
       "😀 😁 😂 🤣 😃",
              "😫 😴 😌 😛 😜",
       "😀 😁 😂 🤣 😃",
        
      ],
    };
  },
  computed: {
    PathTitle() {
      let path = this.$route.path.replace(/\/home\//, "");
      return path.slice(0, 1).toUpperCase().concat(path.slice(1).toLowerCase());
    },
  },
  components: {
    Task,
    CreateTask,
  },
  beforeDestroy() {
    this.bs.destroy();
  },
  mounted() {
    this.init(),
      this.$nextTick(() => {
        if (!this.BScroll) {
          this.BScroll = new BScroll(".list", {
            scrollX: true,
            click: true,
            pullUpLoad: true,
            wheel: true,
            scrollbar: true,
          });
        }
      });
  },
  methods: {
    init() {
      this.bs = new BScroll(this.$refs.scroll, {
        probeType: 3,
        click: true,
        scrollbar: {
          fade: true
        }
      });
    },
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
  position: relative;
  //标题
  nav {
    color: #0078d7;
    font-size: 25px;
    margin: 12px 0;
  }
  //背景
  .page-background {
    position: fixed;
    top: 100px;
    width: 79%;
    z-index: -100;
    li {
      height: 52px;
      border-bottom: 2px solid #e5e5e5;
      margin: 0 30px 0 0;
    }
  }

  // .list {
  //   overflow: auto;
  // }

  .scroll-wrapper {
    // height: 400px;
    height: 600px;
    position: relative;
    overflow: hidden;
    .scroll-item {
      height: 52px;
      line-height: 52px;
      font-size: 24px;
      // font-weight: bold;
      // border-bottom: 1px solid #eee;
      text-align: center;
    }
  }
}
</style>