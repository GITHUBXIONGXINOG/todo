<template>
  <div class="search">
    <nav>
      Searching for "<span>{{ searchKey }}</span
      >"
    </nav>
    {{ searchPage }}
    <div class="search_part" v-if="searchPage.length"></div>
    <div class="search_null" v-else>
      <null-task />
      <span
        >We searched high and low but couldn’t find what you’re looking
        for.</span
      >
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
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
  },
};
</script>
<style scoped lang="scss">
.search {
  font-size: 20px;
  color: #3e69e4;
  margin: 20px 10px;
  span {
    font-weight: bold;
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