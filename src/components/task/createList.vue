<template>
  <label class="create_list">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-jia"></use>
    </svg>
    <input type="text" placeholder="Add a task"  v-model="addTaskTitle" @keydown.enter="addTask"/>
  </label>
</template>
<script>
import {reqTaskClassAdd} from '../../utils/api'

export default {
  data() {
    return {
      addTaskTitle:''
    };
  },
  methods: {
    async addTask(){
      console.log(this.addTaskTitle);
      let res = await reqTaskClassAdd({taskClass:'tom'})
      console.log(res);
    }
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
  input{
    height: 100%;
    width: 100%;
    padding: 0 36px;
    box-sizing: border-box;
    background:transparent;
    &:hover {
      background: #fafafa;
    }
  }
}
</style>