<template>
  <div class="taskInfo">
    <div class="detailHeader">
      <task-edit :taskinfo="currentTask" />
    </div>
    <div
      class="addMyday"
      @click="updataTask(0)"
      :class="{ addStyle: mydayFlag }"
    >
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-taiyang"></use>
      </svg>
      <span>{{ MydayText[mydayFlag] }} to My Day</span>
    </div>
    <!-- 添加图片 -->
    <div
      class="thumbnail-waper"
      v-for="(item, index) in currentTask.imgList"
      :key="index"
    >
      <img class="img-thumbnail" :src="item" ref="preview" />
    </div>
    <!-- style="display: none" -->
    <!-- 内联框架 -->
    <!-- <iframe id="myIframe" name="hideIframe" style="display: none" ref="myIframe"></iframe>
    <form
      class="form-container"
      action="/api/img_upload"
      method="post"
      enctype="multipart/form-data"
      target="hideIframe"
    >
      <div class="form-group">
        <input
          name="currentTaskId"
         type="text"
          ref="currentTaskId"
          v-model="currentTask._id"
        /> 
        {{ currentId }}
      </div>
      <div class="form-group">
        <input type="file" name="userImage" id="userImage" ref="file" />
 
      </div>
      <input
        type="submit"
        class="btn btn-primary"
        ref="submitBt"
        style="display: none"
      />
    </form>
    
    <div class="picWrapper" @click="clickAddPic">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-image"></use>
      </svg>
      <span>Add Picture</span>
    </div> -->

    <!-- <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="活动时间">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.date1"
            style="width: 100%"
          ></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="活动形式">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
       <el-form-item label="上传图片" ref="uploadElement" prop="imageUrl">
            <el-input v-model="ruleForm.imageUrl" v-if="false"></el-input>
            <el-upload
                    class="avatar-uploader"
                    ref="upload"
                    :show-file-list="false"
                    action="/index/upload"
                    :before-upload="beforeUpload"
                    :on-change="handleChange"
                    :auto-upload="false"
                    :data="ruleForm">
                <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
       
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form> -->
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="100px"
      class="el-form"
      v-show="formFlag"
    >
      <!-- <el-form-item>
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="ruleForm.date"
            style="width: 100%"
          ></el-date-picker>
        </el-col>
      </el-form-item> -->
      <el-form-item ref="uploadElement" prop="imageUrl">
        <el-input v-model="ruleForm.imageUrl" v-if="false"></el-input>
        <el-upload
          class="avatar-uploader"
          ref="upload"
          :show-file-list="false"
          action="/api/img_upload"
          :before-upload="beforeUpload"
          :on-change="handleChange"
          :auto-upload="false"
          :data="ruleForm"
          list-type="picture-card"
        >
          <img
            v-if="ruleForm.imageUrl"
            :src="ruleForm.imageUrl"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >上传</el-button
        >
        <el-button @click="resetForm('ruleForm')">取消</el-button>
      </el-form-item>
    </el-form>
    <div class="picWrapper" @click="formFlag = true" v-show="!formFlag">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-image"></use>
      </svg>
      <span>Add Picture</span>
    </div>

    {{ currentTask.imgList }}
    <!-- 备注 -->
    <div class="contentArea">
      <div
        class="textarea"
        contenteditable="true"
        @blur="saveContent"
        ref="textarea"
        v-text="contentText"
      ></div>
    </div>
    <!-- {{ currentTask }} -->
    <!-- 底部操作 -->
    <div class="detailFooter">
      <svg class="icon" aria-hidden="true" @click="hiddenInfo">
        <use xlink:href="#icon-jiantou-you"></use>
      </svg>
      <div class="timeinfo">
        <span>创建于</span>
        <span>{{ createTime }}</span>
      </div>
      <svg class="icon" aria-hidden="true" @click="deleteTask">
        <use xlink:href="#icon-lajixiang"></use>
      </svg>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import axios from 'axios'
import {
  reqTaskUpdate,
  reqSearchTask,
  reqTaskDelete,
  reqTaskInfo,
  reqImgInfo,
} from "../../utils/api";
import taskEdit from "../task/taskEdit.vue";
import moment from "moment";
import "moment/locale/zh-cn";

export default {
  data() {
    return {
      MydayText: ["Add", "Added"],
      mydayFlag: 0,
      // current: {},
      contentText: "", //文本备注内容
      tipFlag: false, //备注提示
      currentId: "", //当前taskid
      imgFlag: 0, //图片标识
      ruleForm: {
        //表单
        date: "",
        imageUrl: "",
        taskId: "",
      },
      formFlag: false, //显示表单
      imgListLen: 0, //图片列表长度
    };
  },
  computed: {
    ...mapGetters(["currentTask", "taskInfoFlag"]),
    //创建时间
    createTime() {
      return moment(this.currentTask.publishDate).startOf().fromNow();
    },
  },
  components: {
    taskEdit,
  },
  methods: {
    //提交表单
    submitForm(formName) {
      let vm = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          vm.$refs.upload.submit();
        } else {
          return false;
        }
        this.$refs[formName].resetFields();
        this.ruleForm.imageUrl = "";
        this.formFlag = false;
      });
    },
    //取消表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.ruleForm.imageUrl = "";
      this.formFlag = false;
    },

    handleChange(file, fileList) {
      this.ruleForm.imageUrl = URL.createObjectURL(file.raw);
    },

    beforeUpload(file) {
      return true;
    },
    onSubmit() {
      console.log("submit!");
      console.log(this.form);
    },
    //点击添加图片
    clickAddPic() {
      this.$refs.file.click();
    },
    //备注更改
    tipChange() {},
    //隐藏面板
    hiddenInfo() {
      this.$store.dispatch("setTaskInfoFlag", {
        // flag:this.taskInfoFlag,
        _id: this.currentTask._id,
      });
    },
    //删除task
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
      this.hiddenInfo();
    },
    //存储content
    saveContent() {
      let text = this.$refs.textarea.textContent;
      let params = {
        ...this.currentTask,
        content: text,
      };
      this.updateFn(params);
    },
    //更新函数
    async updateFn(params) {
      await reqTaskUpdate({ data: JSON.stringify(params) }).then(
        async (req, res) => {
          if (req.status == "1000") {
            this.$store.dispatch("recordClassPage");
            this.$store.dispatch("updateCurrentTask");

            if (this.$route.path === "/home/search") {
              //搜索页面还要更新搜索
              await reqSearchTask({ keyword: this.searchKey }).then(
                (req, res) => {
                  //存储搜索页
                  this.$store.dispatch("setSearchPage", req.data);
                  this.$store.dispatch("recordClassPage");
                  this.$store.dispatch("updateCurrentTask");
                }
              );
            }
          }
        }
      );
    },
    async updataTask(index) {
      /* 
            index: 0 添加到Myday
          */

      let setTime = "";
      if (index == "0") {
        //点击按钮后,如果创建时间和提醒时间一样
        if (this.currentTask.time == this.currentTask.publishDate) {
          setTime = Date.now();
        } else {
          //如果不一样(再次点击),将提醒时间改回创建时间
          setTime = this.currentTask.publishDate;
        }
      }
      let params = {
        ...this.currentTask,
        // _id: this.taskinfo._id,
        time: index == 0 ? setTime : this.currentTask.time,
      };
      console.log(params);

      await reqTaskUpdate({ data: JSON.stringify(params) }).then(
        async (req, res) => {
          if (req.status == "1000") {
            this.$store.dispatch("recordClassPage");
            this.$store.dispatch("updateCurrentTask");
          }
        }
      );
    },
  },
  watch: {
    //当前的task
    currentTask: {
      handler(val) {
        if (val) {
          if (val.time == val.publishDate) {
            this.mydayFlag = 0;
          } else {
            this.mydayFlag = 1;
          }
          //文本备注内容
          this.contentText = val.content;
          this.ruleForm.taskId = val._id;
        }
      },
      immediate: true,
    },
    //表单提交
    formFlag: {
      handler(val) {
        // await reqTaskInfo()
        //  let Flag =  setInterval(()=>{
        //     console.log('------');
        //     //  this.$store.dispatch('updateCurrentTask')

        //   },1000)
        // clearInterval(Flag)
        this.$nextTick(() => {
          setTimeout(() => {
            this.$store.dispatch("updateCurrentTask");
          }, 1000);
        });
      },
      immediate: true,
    },
  },
  mounted() {
    //存储图片
    // let preview = this.$refs.preview;
    //提交按钮
    let submitBt = this.$refs.submitBt;
    let updateCurrent = this.$store.dispatch("updateCurrentTask");
    let updateFile = this.$refs.file;

    //taskid
    // this.currentId =
    if (updateFile) {
      //当用户选择完文件后读取文件
      updateFile.onchange = () => {
        //1.创建文件读取对象,reader变量就是文件读取对象
        let reader = new FileReader();
        //用户选择的文件列表,this表示该标签
        //2.读取文件,参数就是读取的文件
        reader.readAsDataURL(updateFile.files[0]);
        //3.监听onload事件
        reader.onload = () => {
          // console.log(reader.result)
          //修改img的src
          // preview.src = reader.result;
          submitBt.click();
        };
        //调用表单提交
        // submitBt.click();
        // debugger
        // this.imgFlag++
        // console.log(this.imgFlag);
        updateCurrent;
      };
    }
  },
};
</script>
<style scoped lang="scss">
.taskInfo {
  // width: 360px;
  // height: 100px;
  height: 100%;
  // border: 1px solid red;
  padding: 0 10px 16px;
  background-color: #f5f5f5;
  color: #767678;
  position: relative;
  box-shadow: -1px 10px 10px #eaeaea;
  overflow-y: scroll;
  overflow-x: hidden;
  > div {
    margin: 0 0 10px 0;
    // cursor: pointer;
  }
  .icon {
    width: 20px;
    height: 20px;
    fill: #767678;
  }
  .detailHeader,
  .addMyday {
    width: 100%;
    // height: 100px;
    background-color: #fff;
  }
  //添加到myday
  .addMyday {
    height: 52px;
    display: flex;
    align-items: center;
    line-height: 100%;
    position: relative;
    transition: all 0.1s;

    .icon {
      margin: 0 10px;
    }
    span {
      padding: 0 6px;
    }
    &:hover {
      background-color: #fafbfc;
      cursor: pointer;
      // box-shadow: 1px 1px 4px rgb(90, 90, 90);
    }
  }
}
//添加的样式
.addStyle {
  color: #465efc;
  .icon {
    fill: #465efc;
  }
}
//图片
.picWrapper {
  align-items: flex-start;
  //   padding: 16px;
  width: 100%;
  height: 52px;

  // height: 100px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-width: 1px;
  border-radius: 2px;
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  .icon {
    margin: 0 10px;
  }
  span {
    padding: 0 6px;
  }
  &:hover {
    background-color: #fafbfc;
  }
}
//备注
.contentArea {
  align-items: flex-start;
  //   padding: 16px;
  height: auto;
  border: 1px solid #eaeaea;
  border-width: 1px;
  border-radius: 2px;
  position: relative;
  //文本框
  .textarea {
    background: #fff;
    min-height: 100px;
    max-height: 300px;
    padding: 5px 10px;
    outline: 0;
    font-size: 14px;
    line-height: 24px;
    word-wrap: break-word;
    overflow-x: hidden;
    overflow-y: auto;
    border-radius: 4px;
    border-color: rgba(82, 168, 236, 0.8);
    &:focus {
      border: 1px solid #346fef;
    }
    &:empty::before {
      content: "添加备注";
    }
    &:focus::before {
      content: none;
    }
  }

  //文字提醒
  .textTip {
    position: absolute;
    top: 0;
    margin: 10px;
  }
}
//底部操作
.detailFooter {
  // display: flex;
  display: flex;
  position: absolute;
  // width: 340px;
  // width: 370px;
  width: 100%;
  height: 50px;
  // padding: 10px;
  background: #fff;
  // bottom: 0;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0px !important;
  box-shadow: -1px 10px 1px #eaeaea46;

  left: 0;
  .icon {
    // margin: 10px;
    padding: 13px;
    // fill: red;
    &:hover {
      background: #fafbfc;
    }
  }
}
//图片
img {
  width: 100%;
  border-radius: 2px;
}
//表单
.el-form {
  // display: flex;
  .avatar-uploader {
    width: 100%;
    // left: -20%;
    // position: relative;
  }
  img {
    width: 100%;
    // position:absolute;
    // left: 0;
    height: 100%;
  }
}
</style>