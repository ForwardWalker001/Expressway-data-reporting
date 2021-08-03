<template>
  <div class="registContainer">
    <div class="registBox">
      <h1 class="header">REGIST</h1>
      <!-- 登录表单区域 -->
      <el-form
        size="mini"
        :model="registForm"
        :rules="registFormRules"
        ref="registFormRef"
      >
        <!-- 用户名 -->
        <el-form-item prop="userName">
          <el-input
            prefix-icon="el-icon-user"
            placeholder="用户名"
            v-model="registForm.userName"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            placeholder="密码"
            show-password
            v-model="registForm.password"
          ></el-input>
        </el-form-item>
        <!-- 确认密码 -->
        <el-form-item prop="checkedPassword">
          <el-input
            prefix-icon="el-icon-lock"
            placeholder="请再次输入密码"
            show-password
            v-model="registForm.checkedPassword"
          ></el-input>
        </el-form-item>
        <!-- 直属上级级联选择 -->
        <el-form-item prop="phone">
          <el-input
            prefix-icon="el-icon-lock"
            placeholder="请输电话号码"
            v-model="registForm.phone"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btnBox">
          <el-button type="primary" class="registBtn" @click="regist"
            >注册</el-button
          >
          <el-button type="info" class="resetBtn" @click="resetRegistForm"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validateCheckPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    /*     var validateCascaderValue = (rule, value, callback) => {
      if (value.lenght != 0) {
          console.log(value);
        return callback(new Error("请选择直属上级"));
      } else {
        console.log(value);
      }
    }; */
    return {
      registForm: {
        userName: "",
        password: "",
        checkedPassword: "",
        phone: "",
      },
      registFormRules: {
        userName: [
          { required: true, message: "请输入登录名称", trigger: "blur" },
          /*           {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          }, */
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          /*           {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          }, */
          { validator: validatePass, trigger: "blur" },
        ],
        checkedPassword: [
          { required: true, message: "请确认登录密码", trigger: "blur" },
          { validator: validateCheckPass, trigger: "blur" },
        ],
        phone: [
          {
            required: true,
            message: "该选项不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    cascaderChange(val) {
      console.log(val);
      console.log(this.value);
    },
    regist() {
      console.log("注册");
      this.$refs.registFormRef.validate(async (validate) => {
        if (validate) {
          var { data: res } = await this.$axios
            .post(`http://10.11.47.201:18888/datareporting/user/register?
                                                    username=${this.registForm.userName}&
                                                    password=${this.registForm.password}&
                                                    phone=${this.registForm.phone}`);
          if (res.code == 20000) {
            this.$router.push("/indexCom");
          } else {
            return;
          }
          //this.$router.push("/waitPass");
        } else {
          return false;
        }
      });
    },
    resetRegistForm() {
      console.log("重置表单");
      this.$refs.registFormRef.resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.registContainer {
  background-image: linear-gradient(-180deg, #1a1454 0%, #0e81a5 100%);
  background-image: url("../assets/LoginRegist_bg_img.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  height: 680px;
  display: flex;
  justify-content: center;
  align-items: center;
  .registBox {
    width: 300px;
    height: 400px;
    background-color: rgb(20, 45, 88);
    opacity: 0.5;
    h1 {
      padding-left: 33%;
      padding-top: 20px;
      padding-bottom: 20px;
    }
    .el-form {
      padding-left: 20px;
      padding-right: 20px;
      .btnBox {
        .registBtn {
          position: absolute;
          left: 0px;
        }
        .resetBtn {
          position: absolute;
          right: 0px;
        }
      }
      .el-cascader {
        .el-cascader-menu {
          min-width: 150px;
        }
        .el-cascader-menu__wrap {
          height: 200px;
        }
      }
    }
  }
}
</style>