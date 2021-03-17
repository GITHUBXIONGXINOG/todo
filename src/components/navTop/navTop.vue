<template>
  <div class="navTop">
    <!-- 主页按钮 -->
    <router-link to="/" class="toMain">
      <span>To Do</span>
    </router-link>
    <!-- 搜索框 -->
    <div
      class="search-wrap"
      @click.prevent="intoSearch"
      :class="{ floatStyle: searchFlag }"
    >
      <button class="searchButton" @click="searchTask">
        <svg class="icon icon-search" aria-hidden="true">
          <use xlink:href="#icon-sousuo_huaban1"></use>
        </svg>
      </button>
      <input
        type="text"
        class="searchInfo"
        placeholder="Search"
        v-model="searchInput"
        @keydown.enter="searchTask"
        @keyup="searchTask"
        @blur="changeSearch"
        ref="searchInfo"
      />
      <button class="clearInput" @click="clearInput()">
        <svg class="icon icon-close" aria-hidden="true">
          <use xlink:href="#icon-cha"></use>
        </svg>
      </button>
    </div>
    <!-- 右侧设置区域 -->
    <div class="right_part">
      <!-- 设置按钮 -->
      <!--      <div class="settingWrap">
        <svg class="icon setting" aria-hidden="true">
          <use xlink:href="#icon-shezhi"></use>
        </svg>
      </div> -->
      <!-- 个人信息 -->
      <div
        class="userInfoWrap"
        id="userInfoWrap"
        @click.prevent="showUserPanel = !showUserPanel"
        :class="{ clickStyle: showUserPanel }"
      >
        <svg class="icon userInfo" aria-hidden="true">
          <use xlink:href="#icon-yonghu1"></use>
        </svg>
      </div>
      <!-- 个人信息面板 -->
      <div class="user-info-panel" v-show="showUserPanel" id="userInfoPanel">
        <user-panel />
      </div>
    </div>
  </div>
</template>
<script>
import UserPanel from "../Panel/UserPanel.vue";
import { reqSearchTask } from "../../utils/api";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      searchInput: "", //输入
      searchFlag: true, //输入flag
      showUserPanel: false, //显示个人信息面板
    };
  },
  computed: {
    ...mapGetters(["slideFlag"]),
  },
  methods: {
    //清除输入
    clearInput() {
      //清空输入框
      this.searchInput = "";
      //如果在搜索页面,回退到之前的页面
      if (this.$route.path === "/home/search") {
        //回退
        this.$router.back();
      }
    },

    //搜索函数
    searchTask() {
      debugger
      //防抖
      let timer = null;
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        //设置搜索
        this.$store.dispatch("setSlideFlag", { slideFlag: false });
        let keyword = this.searchInput.trim();
        //存储搜索词
        this.$store.dispatch("setSearchKey", keyword);
        if (keyword) {
          await reqSearchTask({ keyword }).then((req, res) => {
            //存储搜索页
            this.$store.dispatch("setSearchPage", req.data);
          });
        } else {
          //搜索词为空直接返回空数组
          this.$store.dispatch("setSearchPage", []);
        }
        if (this.$route.path != "/home/search") {
          this.$router.push("/home/search");
        }
      }, 1000);
    },
    //进入搜索框,input获取焦点
    intoSearch() {
      if (this.searchFlag) {
        this.searchFlag = false;
        this.$refs.searchInfo.focus();
      }
    },
    //改变搜索框上的鼠标flag
    changeSearch() {
      this.searchFlag = !this.searchFlag;
    },
  },
  components: {
    UserPanel,
  },
  mounted() {
    //进入搜索 设置slideflag为false
    this.$store.dispatch("setSlideFlag", { slideFlag: false });
    //点击其它部分隐藏信息面板
    document.addEventListener("click", (e) => {
      let bDom = document.querySelector("#userInfoWrap");
      var cDom = document.querySelector("#userInfoPanel");
      var tDom = e.target;
      if (cDom == tDom || cDom.contains(tDom) || bDom.contains(tDom)) {
        this.showUserPanel = true;
      } else {
        this.showUserPanel = false;
      }
      /*     console.log(e.target);
     let userInfo =  document.getElementById('userInfoWrap')      
     if (userInfo) {
       if (!userInfo.contains(e.target)) {
         this.showUserPanel = false
       }
     } */
    });
  },
  watch: {
    slideFlag: {
      handler(val) {
        if (val.slideFlag) {
          this.searchInput = "";
        }
      },
      immedate: true,
    },
  },
};
</script>
<style scoped lang="scss">
.navTop {
  width: 100%;
  height: 50px;
  display: fixed;
  color: #333333;
  font-size: 14px;
  background: #0078d7;
  border-width: 1px 0px solid #e7e7e7;
  border-radius: 0 0 0 3px;
  box-shadow: 5px 2px 3px #888888;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
//主页按钮
.toMain {
  background: transparent;
  font-size: 18px;
  color: #ffffff;
  margin-left: 1rem;
  //文字垂直居中
  display: flex;
  align-items: center;
  &:focus {
    cursor: pointer;
  }
}
//搜索外框
.search-wrap {
  position: relative;
  display: flex;
}
//搜索外框悬浮样式
.floatStyle {
  &::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
  }
  &:hover::before {
    cursor: pointer !important;
  }
}
//搜索框
.searchInfo {
  width: 400px;
  height: 35px;
  background: #c3ddf7;
  border-radius: 3px;
  padding: 0 30px;
  box-sizing: border-box;
}
//搜索图标
.icon-search,
.icon-close {
  width: 20px;
  height: 20px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}

.searchButton,
.clearInput {
  height: 35px;
  width: 35px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
}

.searchButton {
  left: 0;
}
.clearInput {
  right: 0;
}
//右侧区域
.right_part {
  width: 100px;
  height: 100%;
  display: flex;
  align-items: center;
  // justify-content: space-around;
  justify-content: flex-end;
  position: relative;
}

//设置
.settingWrap {
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
    background: #005a9e;
  }
}
//设置图标
.setting {
  height: 50%;
}
//用户
.userInfoWrap {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
    background: #005a9e;
  }
  //图标背景
  &::after {
    content: "";
    position: absolute;
    width: 30px;
    height: 30px;
    background: #e6e6e6;
    border-radius: 50%;
    z-index: 1;
  }
}
//图标背景
.userInfoWrap::after {
  content: "";
  position: absolute;
  width: 30px;
  height: 30px;
  background: #e6e6e6;
  border-radius: 50%;
  z-index: 1;
}
//用户图标
.userInfo {
  font-size: 20px;
  background: transparent;
  z-index: 2;
  height: 50%;
}
//点击后显示样式
.clickStyle {
  background: #005a9e;
  position: relative;
  &::after {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    position: absolute;
    bottom: 0;
  }
}
//用户信息面板
.user-info-panel {
  width: 130px;
  // height: 180px;
  position: absolute;
  top: 50px;
  right: 0px;
}
</style>