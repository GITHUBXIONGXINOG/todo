<template>
  <!-- 固定分类 -->
  <div
    class="slidePage"
    @click="clickToPage"
    v-if="taskClass[0]"
    :class="{ changeSlide: showChange }"
  >
    <div class="show-change">
      <svg
        class="icon"
        aria-hidden="true"
        @click.prevent="showChange = !showChange"
      >
        <use xlink:href="#icon-caidan"></use>
      </svg>
    </div>
    <nav class="myday" :id="taskClass[0]._id">
      <list listClass="Myday" />
    </nav>
    <nav class="important" :id="taskClass[1]._id">
      <list listClass="Important" />

    </nav>
    <nav class="tasks" :id="taskClass[2]._id">
 
      <list listClass="Tasks" />

    </nav>
    <!-- 自定义分类 -->
    <div class="nav-wrap">
      <ul class="nav-ul">
        <li
          v-for="(list, index) in taskClass"
          :key="index"
          :id="list._id"
          v-show="!list.static"
        >
          <!--           <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-caidan1"></use>
          </svg>
          <span>{{ list.taskClass }}</span> -->
          <list :listClass="list.taskClass" />
        </li>
      </ul>
      <create-list />
    </div>
  </div>
</template>
<script>
import createList from "./createList.vue";
import list from "./listClass.vue";
import { mapGetters } from "vuex";
export default {
  components: { createList, list },
  data() {
    return {
      title: "", //输入分类标题
      titleList: [], //分类列表
      showChange: false, //边栏切换
    };
  },
  methods: {
    clickToPage(event) {
      // console.log(event.target);
      if (event.target.nodeName == "LI" || event.target.nodeName == "NAV") {
        //保存当前分类
        this.$store.dispatch("recordCurrentClass", {
          title: event.target.innerText,
          _id: event.target.id,
        });
        //查询当前分类页
        this.$store.dispatch("recordClassPage");
      }
    },
  },
  mounted() {
    this.$store.dispatch("recordTaskClass");
    this.$store.dispatch("recordClassPage");
  },
  computed: {
    ...mapGetters(["taskClass"]),
  },
};
</script>
<style scoped lang="scss">
.slidePage {
  width: 15rem;
  border-right: 1px solid #eaeaea;
  display: flex;
  flex-direction: column;
  background: #f4f4f4;
  box-shadow: -1px 10px 10px #eaeaea;
  margin: 0 30px 0 0;
  transition: width 0.3s;

  > nav {
    height: 36px;
    display: flex;
    align-items: center;
    &:hover {
      background: #fafafa;
      cursor: pointer;
    }
    svg {
      pointer-events: none;
    }
    span {
      color: black;
      pointer-events: none;
    }
    label{
      pointer-events: none;
      
    }
  }
  .icon {
    margin: 0 10px;
    font-size: 20px;
    color: #2e5cdb;
    &:hover {
      cursor: pointer;
    }
    width: 20px;
    height: 100%;
  }
  //边栏切换按钮
  .show-change {
    margin: 20px 0;
    height: 20px;
  }
  //自定义清单
  .nav-wrap {
    // border: 1px solid red;
    margin: 20px 0 0 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
    ul {
      li {
        // border: 1px solid red;
        height: 36px;
        display: flex;
        align-items: center;
        &:hover {
          background: #fafafa;
          cursor: pointer;
        }
        svg {
          pointer-events: none;
        }
        label{
          pointer-events: none;

        }
        span {
          width: 100%;
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          pointer-events: none;
        }
      }
    }
  }
}
.changeSlide {
  transition: width 0.3s;
  width: 2.5rem;
  span {
    display: none;
    transition: width 0.3s;

    // width: 0 !important;
  }
  .nav-ul{
    label span{
    border: 1px solid red;

      width: 0;
    }
  }
}
</style>