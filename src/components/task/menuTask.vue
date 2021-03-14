<template>
  <div class="menu_task" id="contextMenuBox"  ref="contextMenuBox">
    <ul class="mark_part">
      <li>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-taiyang"></use>
        </svg>
        <span>Add to My Day</span>
      </li>
      <li>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xingxing1"></use>
        </svg>
        <span>Mark as important</span>
      </li>
      <li>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sel"></use>
        </svg>
        <span>Mark as completed</span>
      </li>
    </ul>
    <ul class="delete_part">
      <li>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-lajixiang"></use>
        </svg>
        <span>Delete task</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ["currentTask","menuSite"],
  watch:{
      menuSite:{
          handler(val){
            //   console.log(val);
            //   let box = document.getElementById("contextMenuBox")
            //   if (box&&val.menuSite) {
            //       box.style.top = val.menuSite.top + 'px'
            //       box.style.left = val.menuSite.left + 'px'

            //   }
            let box = this.$refs.contextMenuBox
            // console.log(box);
            box.style.left= val.menuSite.top + 'px'
            box.style.top= val.menuSite.left + 'px'

          }
      }
  },
};
</script>
<style scoped lang="scss">
.menu_task {
  position: absolute;
  width: 236px;
  height: 173px;
  border: 1px solid #e5e5e5;
  z-index: 10;
  background: #fff;
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  font-size: 14px;
  color: #38383a;
  ul {
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    flex-direction: column;
    //   border: 1px solid red;

    // justify-content: center;
    // justify-items: center;
    // border: 1px solid red;
    align-content: space-between;
    padding: 5px 0;
    li {
      //   border: 1px solid #e5e5e5;
      border: 1px solid transparent;

      display: flex;
      height: 36px;
      align-items: center;
      // justify-content: center;
      &:hover {
        background: #f4f4f4;
      }
      &:last-child {
      }
    }
    &:last-child {
      border-bottom: none;
    }
  }
  .icon {
    width: 20px;
  }
}
</style>