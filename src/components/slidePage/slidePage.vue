<template>
<!-- 固定分类 -->
  <div class="slidePage" @click="clickToPage" v-if="taskClass[0]">
    <div class="show-change">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-caidan"></use>
      </svg>
    </div>
    <nav class="myday" :id="taskClass[0]._id">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-taiyang"></use>
      </svg>
      <span>Myday</span>
    </nav>
    <nav  class="important" :id="taskClass[1]._id">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xingxing1"></use>
      </svg>
      <span>Important</span>
    </nav>
    <nav class="tasks" :id="taskClass[2]._id">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fangzi"></use>
      </svg>
      <span>Tasks</span>
    </nav>
    <!-- 自定义分类 -->
    <div class="nav-wrap">
      <ul class="nav-ul" @click="clickToPage">
        <li v-for="(list,index) in taskClass" :key="index" :id="list._id" v-show="!list.static">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-caidan1"></use>
          </svg>
          <span>{{list.taskClass}}</span>
        </li>
      </ul>
      <create-list />
    </div>
  </div>
</template>
<script>
import createList from "../task/createList.vue";
import {reqTaskClass} from "../../utils/api";
import {mapGetters} from 'vuex'
export default {
  components: { createList },
  data() {
    return {
      title: "",//输入分类标题
      titleList: [],//分类列表
    };
  },
  methods: {
    // setTitle(event) {
    //   if (event.target.text) {
    //     this.title = event.target.text;
    //   }
    // },
    clickToPage(event){
      // console.log(event.target.id);
      // console.log(event.target.text);
      // console.log(event.target.nodeName);
      // if (event.target.nodeName == "SPAN" || event.target.nodeName == "LI" || event.target.nodeName == "SVG" ) {
      if (event.target.nodeName == "LI" || event.target.nodeName == "NAV") {
        
        // console.log(event.target.innerText)
        //保存当前分类
        this.$store.dispatch('recordCurrentClass',{
          title: event.target.innerText,
          _id: event.target.id
          })
          //查询当前分类页
        this.$store.dispatch('recordClassPage')

        this.$router.push('/home/mytasks')
      }
    }
  },
  mounted (){
      this.$store.dispatch('recordTaskClass')
      this.$store.dispatch('recordClassPage')
  },
  computed:{
    ...mapGetters([
      'taskClass'
    ])
  },
 
 
};
</script>
<style scoped lang="scss">
.slidePage {
  width: 18rem;
  border-right: 1px solid #eaeaea;
  display: flex;
  flex-direction: column;
  background: #f4f4f4;
  box-shadow: -1px 10px 10px #eaeaea;
  margin: 0 30px 0 0;
  >nav {
    height: 36px;
    display: flex;
    align-items: center;
    &:hover {
      background: #fafafa;
      cursor: pointer;
    }
    span {
      color: black;
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
      }
    }
  }
}
</style>