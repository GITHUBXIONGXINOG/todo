<template>
  <label class="create_list">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-jia"></use>
    </svg>
    <input
      type="text"
      placeholder="Add a task"
      v-model="addTaskTitle"
      @keydown.enter="addTask"
    />
  </label>
</template>
<script>
import { reqTaskClassAdd,reqTaskClass } from "../../utils/api";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      addTaskTitle: "",
    };
  },
  computed: {
    ...mapGetters(["userInfo",""]),
  },
  methods: {
    //提交方法
    async addTask() {
       await reqTaskClassAdd({
        data: {
          taskClass: this.addTaskTitle,
          author: this.$store.state.userInfo._id,
        },
      }).then(async (req,res)=>{
        if (req.status=='1000') {
          console.log(`分类<${this.addTaskTitle}>创建成功`);
          //向服务器获得分类
          // let result = await reqTaskClass({data:{author:this.$store.state.userInfo._id}})
          //调用action方法,存储分类
          this.$store.dispatch('recordTaskClass')
          this.addTaskTitle = '';
       }
      }).catch((err)=>{
        console.log('出现异常,创建失败');
      });
      
    },
  },
};
</script>
<style scoped lang="scss">
.create_list {
  height: 36px;
  display: flex;
  // justify-content: center;
  align-items: center;
  .icon {
    width: 20px;
    height: 36px;
    position: absolute;
    fill: #8a8a8a;
    margin: 0 10px;
  }
  input {
    height: 100%;
    width: 100%;
    padding: 0 36px;
    box-sizing: border-box;
    background: transparent;
    &:hover {
      background: #fafafa;
    }
  }
}
</style>