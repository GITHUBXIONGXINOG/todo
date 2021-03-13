<template>
  <div class="search">
    <nav>
      Searching for "<span>{{ searchKey }}</span
      >"
    </nav>
    <div class="search_part" v-if="searchPage.length">
      <div class="list-wrapper" ref="scroll">
        <div class="list list-content">
          <nav>Tasks</nav>
          <div
            class="list-item"
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
  margin: 20px 0 0 10px;
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
  .search_part {
    height: 95%;
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
    .list {
      nav {
        color: black;
        font-size: 16px;
        margin: 20px 0 10px;
      }
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