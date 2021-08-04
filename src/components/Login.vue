<template>
  <div class="login_container">
    <div class="login_box">
      <h1 class="header">LOGIN</h1>
      <!-- 登录表单区域 -->
      <el-form
        size="medium "
        :model="loginForm"
        :rules="loginFormRules"
        ref="loginFormRef"
      >
        <!-- 用户名 -->
        <el-form-item prop="userName">
          <el-input
            prefix-icon="el-icon-user"
            placeholder="用户名"
            v-model="loginForm.userName"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-user"
            placeholder="密码"
            show-password
            v-model="loginForm.password"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item>
          <el-button type="primary" @click="login" class="loginBtn"
            >登录</el-button
          >
          <el-button type="info" @click="resetLoginForm" class="resetBtn"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
      <div class="footer">
        <!-- <el-link class="left" @click="toRegist">没有账号，点击注册</el-link> -->
        <el-link class="right" @click="getPassword">找回密码</el-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  created() {},
  data() {
    return {
      loginForm: {
        userName: "user",
        password: "123456",
      },
      loginFormRules: {
        userName: [
        ],
        password: [
        ],
      },
    };
  },
  methods: {
    //10.11.47.201:18888
    login() {

      this.$refs.loginFormRef.validate(async (validate) => {
        if (validate) {
          var { data:res  } = await this.$axios.post(
            `datareporting/user/login?username=${this.loginForm.userName}&password=${this.loginForm.password}`
          );
          // console.log(res);
          if (res.code == 20000) {
            sessionStorage.setItem("userInfo", JSON.stringify(res.data.user));
            this.$message({
              type: "success",
              message: "登录成功!",
              duration: 1500,
            });
            this.$router.push("/index");
          }else{
             this.$message({
              type: "error",
              message: res.message,
              duration: 1500,
            });
          }
        } else {
    
          return false;
        }
      });
    },
    resetLoginForm() {
      console.log("重置表单");
      this.$refs.loginFormRef.resetFields();
    },
    toRegist() {
      console.log("去往登录组件");
      this.$router.push("/regist");
    },
    getPassword() {
      console.log("找回密码");
      this.$router.push("/getPassword");
    },
  },
};
</script>

<style lang="less" scoped>
//@import "../../public/gloable/init.css";
.login_container {
  background-color: #2fabd2;
  height: 100vh;
  width: 100%;
  .login_box {
    width: 500px;
    height: 290px;
    /* background-color: #fff; */
    background-color:white;
    border-radius: 5px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    // opacity: 0.6;
    .header {
      position: absolute;
      top: 0px;
      left: 50%;
      transform: translateX(-50%);
      opacity: 0.5;
    }
    .el-form {
      padding: 32px;
      position: absolute;
      bottom: 0;
      width: 100%;
      top: 60px;
      box-sizing: border-box;
      .el-button {
        width: 30%;
      }
      .loginBtn {
        position: absolute;
        left: 0px;
      }
      .resetBtn {
        position: absolute;
        right: 0px;
      }
    }
    .footer {
      position: absolute;
      bottom: 30px;
      width: 100%;
      .left {
        position: absolute;
        display: inline;
        left: 10px;
        color: white;
      }
      .right {
        position: absolute;
        display: inline;
        right: 10px;
        color: white;
      }
    }
  }
}
</style>