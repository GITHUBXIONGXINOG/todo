<template>
  <div class="menu_task" id="contextMenuBox" @click="deleteTask">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-lajixiang"></use>
    </svg>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { reqTaskDelete, reqSearchTask } from "../../utils/api";
export default {
  props: ["currentTask"],
  methods: {
    async deleteTask() {
      console.log("删除task");
      console.log(this.currentTask);
      let type = this.currentTask.taskClass ? "class" : "task";
      let params = {
        type, //种类,class是分类,task是小task
        _id: this.currentTask._id, //删除id
      };
      await reqTaskDelete({ keyword: JSON.stringify(params) }).then(
        async (req, res) => {
          if (req.status === "1000" && type === "class") {
            this.$store.dispatch("recordTaskClass"); //更新分类
          } else if (req.status === "1000" && type === "task") {
            this.$store.dispatch("recordClassPage"); //更新页面
            if (this.$route.path === "/home/search") {
              //搜索页面还要更新搜索
              await reqSearchTask({ keyword: this.searchKey }).then(
                (req, res) => {
                  //存储搜索页
                  this.$store.dispatch("setSearchPage", req.data);
                  this.$store.dispatch("recordClassPage");
                }
              );
            }
          }
        }
      );
    },
  },
  computed:{
      ...mapGetters([
          'searchKey'
      ])
  }
};
</script>
<style scoped lang="scss">
.menu_task {
  position: absolute;
  z-index: 10;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #38383a;
  right: 10px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  transition: all 0.1s;

  .icon {
    width: 20px;
    height: 20px;
  }
  &:hover {
    box-shadow: 1px 1px 10px #1110102a;
    border-bottom: 1px solid #f5f5f5;
  }
}
</style>