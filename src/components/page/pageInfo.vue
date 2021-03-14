<template>
  <div class="pageInfo">
    <nav>
      {{ currentClass.title }}
    </nav>
    <create-task />
    <div class="list-wrapper" ref="scroll">
      <!-- 未完成分类 -->
      <div
        class="list-item"
        v-for="(item, index) in unComClass"
        :key="index"
        v-show="index != 0 || item.task"
        @click="clickHandler(item)"
        
      >
        <task :taskinfo="item" />
        
      </div>
      <!-- 完成分类 -->
      <div
        class="list-item completed"
        v-show="comClass.length"
        @click="changeComClass"
      >
        <svg class="icon" aria-hidden="true" :class="{rotate:comClassFlag}">
          <use
            xlink:href="#icon-jiantou-you"
            ref="right_jiantou"
            class="jiu"
          ></use>
        </svg>
        <div class="text">completed</div>
      </div>
      <div
        class="list-item"
        v-for="item in comClass"
        :key="item._id"
        v-show="comClassFlag"
      >
        <!-- @click="clickHandler(item)" -->
        <task :taskinfo="item" :menuSite="menuSite"/>
      </div>
    </div>
    <!-- <menu-task :currentTask="currentTask" v-show="menuFlag"/> -->

  </div>
</template>
<script>
import Task from "../task/task.vue";
import CreateTask from "../task/createTask.vue";
import { mapGetters } from "vuex";
import MenuTask from '../task/menuTask.vue';
 

export default {
  data() {
    return {
      unComClass: [], //未完成的分类
      comClass: [], //完成的分类
      comClassFlag: false, //显示隐藏完成分类
      menuFlag:false,//右键菜单
      menuSite:{},//位置
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
    MenuTask,
  },

  methods: {
        //右键面板
    menuPanel(event){
      // console.log(this.taskinfo);
      // this.menuFlag = false
      // console.log(item);
      // this.menuFlag = true
      console.log(event);
      console.log(event.offsetX );
      console.log(event.offsetY);
      this.menuSite = {
        top: event.offsetX + 30,
        left: event.offsetY 
      }
      console.log(this.menuSite);
  
      
    },
    clickHandler(item) {
      // window.alert(item);
      console.log(item);
    },
    changeComClass() {
      this.comClassFlag = !this.comClassFlag;
      // this.$refs.right_jiantou.style.transform = "rotate(90deg)";
      // console.log(this.$refs.right_jiantou);
    },
    // menushow(item){
    //   console.log(item);
    // }
  },
  watch: {
    //监视分类页
    classPage: {
      handler(value) {
        this.comClass = [];
        this.unComClass = [];
        value.forEach((item) => {
          if (item.complete) {
            //完成
            this.comClass.push(item);
          } else {
            //未完成
            this.unComClass.push(item);
          }
        });
      },
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
      &:hover {
        background-color: #f5f5f5;
        width: 100%;
        cursor: pointer;
      }
    }
    //完成样式
    .completed {
      display: flex;
      .icon {
        width: 20px;
        transition: transform .1s;
      }
      .rotate{
        transform: rotate(90deg);

      }

      .text {
        padding: 0 0 0 10px;
        font-size: 18px;
      }
      // border-bottom: none;
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

  // //导航条样式
  ::-webkit-scrollbar {
    display: none;
  }

}
</style>