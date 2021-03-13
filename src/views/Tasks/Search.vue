<template>
  <div class="search">
    <nav>
      Searching for "<span>{{ searchKey }}</span
      >"
    </nav>
    <div class="search_part" v-if="searchPage.length">
      <div class="scroll-wrapper" ref="scroll">
        <div class="list scroll-content">
          <nav>Tasks</nav>
          <div
            class="scroll-item"
            v-for="(item, index) in searchPage"
            :key="index"
            @click="clickHandler(item)"
            v-show="index != 0 || item.task"
          >
            <task :taskinfo="item" />
          </div>
        </div>
      </div>
    </div>
    <div class="search_null" v-else>
      <null-task />
      <span
        >We searched high and low but couldn’t find what you’re looking for.
      </span>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import BScroll from "better-scroll";
import Task from "../../components/task/task";

import nullTask from "./nullTask";
export default {
  computed: {
    ...mapGetters([
      "searchKey", //搜索词
      "searchPage", //搜索页
    ]),
  },
  components: {
    nullTask,
    Task,
  },
  methods: {
    clickHandler(item) {
      // window.alert(item);
      console.log(item);
    },
  },
};
</script>
<style scoped lang="scss">
.search {
  font-size: 20px;
  margin: 20px 10px;
  span {
    font-weight: bold;
  }
  nav {
  color: #3e69e4;
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 30px;
  }
  .scroll-wrapper {
    // height: 400px;
    height: 600px;
    width: 100%;
    position: relative;
    overflow: hidden;
    .scroll-item:nth-child(2){
        .task{
             border-top: none;
        }
    }
    .scroll-item {
      height: 52px;
      line-height: 52px;
      font-size: 24px;
      // font-weight: bold;
      // border-bottom: 1px solid #eee;
      text-align: center;
    }
    .list {
      nav {
        color: black;
        font-size: 16px;
        margin: 20px 0 10px ;
      }
    }
  }
}
.search_null {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: center;

  span {
    max-width: 350px;
    padding: 0 16px;
    text-align: center;
    font-size: 1rem;
    color: #767678;
    font-family: "Segoe UI", "Segoe", "Arial", "sans-serif";
    line-height: 28px;
  }
}
</style>