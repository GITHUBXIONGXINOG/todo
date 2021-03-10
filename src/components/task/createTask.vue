<template>
  <div class="create_task">
    <svg class="icon" aria-hidden="true" v-show="changeIcon">
      <use xlink:href="#icon-jia"></use>
    </svg>
    <svg class="icon" aria-hidden="true" v-show="!changeIcon">
      <use xlink:href="#icon-danxuanxiangweixuanzhong"></use>
    </svg>
    <input
      type="text"
      placeholder="Add a task"
      v-model="article"
      @keydown.enter="sendToTask"
    />
  </div>
</template>
<script>
import { reqTaskAdd } from "../../utils/api";

export default {
  data() {
    return {
      changeIcon: true,
      article: "", //输入task内容
    };
  },
  methods: {
    //提交方法
    async sendToTask() {
      await reqTaskAdd({
        data: {
          author: this.$store.state.userInfo._id,
          task:  this.article,//文字内容
          author: this.$store.state.userInfo._id,//作者id
          classtitle: this.$store.state.currentClass.id,//分类集合id
          pulishDate: Date.now,//创建时间
          content: '',//备注  
          complete: false,//完成状态
          important:false, //重要
        },
      })
        .then(async (req, res) => {
          if (req.status == "1000") {
            // console.log(`创建成功`);
            //向服务器获得分类
            // let result = await reqTaskClass({data:{author:this.$store.state.userInfo._id}})
            //调用action方法,存储分类
            // this.$store.dispatch("recordTaskClass");
            console.log('task创建成功');
            this.$store.dispatch('recordClassPage')

            this.article = "";
            
          }
        })
        .catch((err) => {
          console.log("出现异常,创建失败");
        });
    },
  },
   mounted (){
     //获取当前分类页面
      this.$store.dispatch('recordClassPage')
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