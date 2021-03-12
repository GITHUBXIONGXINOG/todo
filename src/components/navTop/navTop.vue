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
        @click="showUserPanel = !showUserPanel"
        :class="{ clickStyle: showUserPanel }"
      >
        <svg class="icon userInfo" aria-hidden="true">
          <use xlink:href="#icon-yonghu1"></use>
        </svg>
      </div>
      <!-- 个人信息面板 -->
      <div class="user-info-panel" v-show="showUserPanel">
        <user-panel />
      </div>
    </div>
  </div>
</template>
<script>
import UserPanel from "../Panel/UserPanel.vue";
import { reqSearchTask } from "../../utils/api";
export default {
  data() {
    return {
      searchInput: "", //输入
      searchFlag: true, //输入flag
      showUserPanel: false, //显示个人信息面板
    };
  },
  methods: {
    //清除输入
    clearInput() {
      //清空输入框
      this.searchInput = "";
      //如果在搜索页面,回退到之前的页面
      if (this.$route.path ==='/home/search') {
      //回退
      this.$router.back();
      }

    },
    //搜索task
    async searchTask() {
      //存储搜索词
      this.$store.dispatch('setSearchKey',this.searchInput.trim())
      
      await reqSearchTask({ keyword: this.searchInput }).then((req, res) => {
        console.log(req);
        //存储搜索页
        this.$store.dispatch('setSearchPage',req.data)
        this.$router.push("/home/search");
      });
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
  width: 320px;
  height: 180px;
  position: absolute;
  top: 50px;
  right: 0px;
}
</style>