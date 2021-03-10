<template>
  <div class="create_task">
    <svg class="icon" aria-hidden="true" v-show="changeIcon">
      <use xlink:href="#icon-jia"></use>
    </svg>
    <svg class="icon" aria-hidden="true" v-show="!changeIcon">
      <use xlink:href="#icon-danxuanxiangweixuanzhong"></use>
    </svg>
    <input type="text" placeholder="Add a task"  />
  </div>
</template>
<script>
export default {
  data() {
    return {
      changeIcon: true,
    };
  },
  methods: {
    
  },
};
</script>
<style scoped lang="scss">
.create_task {
  height: 52px;
  width: 97%;
  border: 1px solid transparent;
  top: 50px;
  display: flex;
  align-items: center;
  .icon {
    width: 20px;
    height: 20px;
    position: absolute;
    fill: #0078d7;
  }
}
input {
  border: 1px solid redss;
  font-size: 16px;
  width: 100%;
  // height: 20px;
  padding: 17px 0 17px 30px;
  border-bottom: 1px solid #bfc6d1;
  // padding-bottom: 16px;
  &::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #0078d7;
    font-size: 16px;
  }

  &::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #0078d7;
    font-size: 16px;
  }

  &:-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #0078d7;
    font-size: 16px;
  }
  &:focus {
    border-bottom: 1px solid #0078d7;
    // padding-bottom: 16px;
    &::-webkit-input-placeholder {
      /* WebKit browsers */
      color: #bfc6d1;
    }

    &::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: #bfc6d1;
    }
  }
}
</style>