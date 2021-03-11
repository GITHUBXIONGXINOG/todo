<template>
  <div class="loginPanel">
    <!-- <img src="@/assets/img/microsoft_logo.svg" alt="" class="mic_log" /> -->
    <div class="login_show" v-if="order">
      <h2>登入</h2>
      <input
        type="text"
        placeholder="用户名"
        v-model="account"
        autofocus
        maxlength="20"
      />
      <input
        type="password"
        placeholder="密码"
        v-model="password"
        v-if="!showPwd"
        maxlength="20"
        @keydown.enter="clickToLogin"
      />
      <input
        type="text"
        placeholder="密码"
        v-model="password"
        v-else-if="showPwd"
        maxlength="20"
        @keydown.enter="clickToLogin"
      />
      <p>
        <input type="checkbox" id="showPw" @click="showPwd = !showPwd" />
        <label for="showPw">显示密码</label>
      </p>
      <div class="moreOpea">
        沒有账户吗?
        <router-link to="/regist">立即创建新账户!</router-link>
      </div>

      <button @click.prevent="clickToLogin" >登录</button>
    </div>
    <div class="regist_show" v-else>
      <h2>建立账户</h2>
      <input
        type="text"
        placeholder="请输入用户名"
        v-model="account"
        maxlength="20"
        autofocus
      />
      <div class="passwd_wrap">
        <input
          type="password"
          @blur="checkPwd"
          placeholder="请输入密码(6-20位且只能包含字母,数字,下划线)"
          v-model="password"
          minlength="6"
          maxlength="20"
        />
        <font id="passwordMSG"></font>
      </div>
      <div class="passwd_wrap">
        <input
          type="password"
          @keyup="checkPwd2"
          placeholder="请再次输入密码"
          v-model="password2"
          minlength="6"
          maxlength="20"
        /><font id="passwordMSG2"></font>
      </div>

      <router-link to="/login" class="back_login"
        >已有账户,前往登录!</router-link
      >

      <button @click.prevent="clickToRegist">注册</button>
    </div>
    <AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip" />
  </div>
</template>
<script>
import {reqPwdLogin,reqPwdRegist} from '../../utils/api'
import AlertTip from "../../components/AlertTip/AlertTip.vue";
export default {
  props: {
    order: {
      //序列 0为注册,1为登录
      typeof: Number,
      required: true,
    },
  },
  components: {
    AlertTip,
  },
  data() {
    return {
      account: "", //账户名
      password: "", //密码
      password2: "", //确认密码
      showPwd: false, //显示密码
      FlagPwd: false, //密码验证
      FlagPwd2: false, //重复密码验证
      timeoutID: "", //定时器id
      alertText: "", // 提示文本
      alertShow: false, // 是否显示警告框
    };
  },
  methods: {
    //登录
    async clickToLogin() {
      //前台表单验证
      const { account, password } = this;
      if (!account) {
        //用户名必须指定
        this.showAlert("用户名必须指定");
        return;
      } else if (!password) {
        //密码必须指定
        this.showAlert("密码必须指定");
        return;
      }
      let result = await reqPwdLogin({account,password})

       if (result.status===1000) {
            //  console.log("登录成功");
             const user = result.data
             //dispath 调用action的异步方法,存储用户信息
             this.$store.dispatch('recordUser',user)
             debugger
             console.log(user);
             this.$message({//ele注册弹窗
             message: '登录成功!',
             type: 'success'
            });
            this.$router.push({path:'/home'})
         } else if (result.status===1001) {
            this.$message({//ele注册弹窗
             message: '密码错误,请重新输入!',
             type: 'warning'
            });
            this.password = ''
         } else if(result.status===1002) {
            this.$message({//ele注册弹窗
             message: '该账号不存在,请重新输入!',
             type: 'error'
            });
            this.password = ''
            this.account = ''
         }
        //  console.log(result);
    //   console.log(result.data[0].account);
    },
    //注册
    async clickToRegist() {
      if (this.FlagPwd && this.FlagPwd2) {
        const { account, password } = this;
        //生成随机数
        // const salt = await bcrypt.genSalt(10)
        //使用密码和随机数生成hash
        // password = await bcrypt.hash(password,salt)
         let result = await reqPwdRegist({account,password})
         if (result.status===1000) {
            //  console.log("注册成功");
             this.$message({//ele注册弹窗
             message: '恭喜你，注册成功!',
             type: 'success'
            });
            this.$router.replace('/login')
         } else if (result.status===1001) {
               this.$message({
                message: '该用户名已被注册,请重新输入!',
                type: 'warning'
             });

         }
        //  console.log(result);
        //清空输入框
        this.account = ''
        this.password = ''
        this.password2 = ''
        this.FlagPwd = false
        this.FlagPwd2 = false

      }
    },
    showAlert(alertText) {
      this.alertShow = true;
      this.alertText = alertText;
    },
    // 关闭警告框
    closeTip() {
      this.alertShow = false;
      this.alertText = "";
    },
    //验证密码格式
    checkPwd() {
      var passwordMSG = document.getElementById("passwordMSG");

      var reg = /^[a-zA-Z0-9_]\w{5,19}$/;
      var flag = reg.test(this.password);
      if (!flag) {
        passwordMSG.innerHTML = "<font color='red'>密码格式有误！</font>";
        this.FlagPwd = false;
      } else {
        passwordMSG.innerHTML = "<font color='green'><b>√</b></font>";
        this.FlagPwd = true;
      }
    },
    //验证密码重复
    checkPwd2() {
      var passwordMSG2 = document.getElementById("passwordMSG2");
      clearTimeout(this.timeoutID);
      this.timeoutID = setTimeout(() => {
        if (this.password == this.password2) {
          passwordMSG2.innerHTML = "<font color='green'><b>√</b></font>";
          this.FlagPwd2 = true;
        } else {
          passwordMSG2.innerHTML = "<font color='red'>请检查密码！</font>";
          this.FlagPwd2 = false;
        }
      }, 500);
    },
  },

  watch: {},
};
</script>
<style scoped lang="scss">
//登录面板
.login_show,
.regist_show {
  background: #ffffff;
  width: 440px;
  height: 300px;
  border: 1px solid rgb(213, 213, 213);
  box-shadow: 5px 5px 10px #5e5b5b;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  box-sizing: border-box;
  padding: 30px 40px;
  //   position: relative;
  //显示密码按钮
  > P {
    display: flex;
    align-items: center;
    line-height: 22px;
  }
}
//标题
h2 {
  font-size: 24px;
  font-weight: bold;
}
//输入
input {
  border-bottom: 1px solid #000;
  height: 20px;
  font-size: 15px;
  padding: 5px 0;
  &:focus {
    border-color: #0067b8;
  }
}

.back_login {
  width: 40%;
}
//按钮
button {
  width: 108px;
  height: 32px;
  color: #ffffff;
  background: #0067b8;
  margin-top: 10px;
  align-self: flex-end; //设置按钮位置
}
.passwd_wrap {
  // border: 1px solid red;
  position: relative;
  display: flex;
  align-items: center;
  input {
    width: 100%;
  }
}

//密码验证
#passwordMSG,
#passwordMSG2 {
  // border: 1px solid red;
  position: absolute;
  right: 10px;
}
</style>