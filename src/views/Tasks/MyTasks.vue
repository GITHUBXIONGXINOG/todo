<template>
  <div class="my_tasks">
    <page-info />
    <!-- task信息 -->
    <task-info v-show="taskInfoFlag.flag"/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import pageInfo from "../../components/page/pageInfo.vue";
import taskInfo from "../../components/task/taskInfo.vue";

export default {
  components: {
    pageInfo,
    taskInfo
  },
  computed:{
    ...mapGetters([
      'taskInfoFlag'
    ])
  }
};
</script>

<style scoped lang="scss">
.my_tasks {
  //  border: 1px solid red;
  height: 100%;
  display: flex;
  .taskInfo{
    box-sizing: border-box;
    width: 360px;
    padding: 10px;
  }
}
</style>