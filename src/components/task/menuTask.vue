<template>
  <div class="menu_task" id="contextMenuBox" @click="deleteTask">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-lajixiang"></use>
    </svg>
  </div>
</template>
<script>
import {reqTaskDelete} from '../../utils/api'
export default {
  props: ["currentTask"],
  methods: {
    async deleteTask() {
      console.log("删除task");
      console.log(this.currentTask);
      let params = {
          type: 'task',//种类task
          _id: this.currentTask._id//删除id
      }
      await reqTaskDelete({keyword:JSON.stringify(params)}).then((req,res)=>{
          if (req.status==='1000') {
          this.$store.dispatch("recordClassPage");
              
          }
      })
    },
  },
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
  transition: all .1s;

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