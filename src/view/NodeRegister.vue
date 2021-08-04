<template>
  <div class="nodeRegisterContainer">
    <el-card class="box-card">
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>节点注册配置</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 配置表单 -->
      <el-form label-width="120px">
        <el-form-item label="省平台IP">
          <el-input v-model="inputData.ip"></el-input>
        </el-form-item>
        <el-form-item label="级联平台名称">
          <el-input v-model="inputData.platformname"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="inputData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="inputData.password"></el-input>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="preservat">保存</el-button>
          <el-button @click="connectTest">连通性测试</el-button>
          <el-button @click="register" :disabled="disabled">注册</el-button>
        </el-form-item>
        <el-form-item v-show="showCard">
          <template>
            <el-tag type="success" effect="dark" v-if="ledColor">已连接</el-tag>
            <el-tag type="danger" effect="dark" v-else>未连接</el-tag>
          </template>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      disabled: false,
      tableData: [],
      showCard: false,
      text: "",
      ledColor: false,
      inputData: JSON.parse(localStorage.getItem("inputData")) || {
        ip: "",
        platformname: "",
        username: "",
        password: "",
      },
    };
  },
  mounted() {
    // console.log({...this.inputData})
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    preservat() {
      localStorage.setItem("inputData", JSON.stringify(this.inputData));
      this.$axios
        .get("Client/saveInfo", {
          params: {
            ...this.inputData,
          },
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.success) {
            // this.ledColor = true
            this.$message({
              type: "success",
              message: "保存成功!",
              duration: 1500,
            });
          } else {
            this.$message({
              type: "error",
              message: "保存失败!",
              duration: 1500,
            });
          }
        })
        .catch((error) => {
          this.$message({
            type: "error",
            message: "保存失败!" + error,
            duration: 1500,
          });
        });
    },
    connectTest() {
      this.$axios
        .get(
          `test/client/isConnected/${this.inputData.ip}/${this.inputData.platformname}`,{
          }
        )
        .then((res) => {
          console.log(res);
          if (res.data.data.isConnected) {
            this.$message({
              type: "success",
              message: "联通成功!",
              duration: 3000,
            });
          } else {
            this.$message({
              type: "error",
              message: "联通失败!",
              duration: 3000,
            });
          }
        })
        .catch((error) => {
          // console.log(error);
          this.$message({
            type: "error",
            message: "联通失败!" + error,
            duration: 3000,
          });
        });
    },
    register() {
      this.showCard = true;
      // this.heartbeatCon()
      this.setIntervalData()
      this.$axios
        .post("Client/register", {
            ...this.inputData,
        })
        .then((res) => {
          console.log(res)
          if (res.data.data.connected) {
            // this.ledColor = true
            this.disabled = true
            this.$message({
              type: "success",
              message: "注册成功!",
              duration: 1500,
            });
          } else {
            // this.ledColor = false
            
            this.$message({
              type: "error",
              message: "注册失败!",
              duration: 1500,
            });
          }
        })
        .catch((error) => {
          this.$message({
              type: "error",
              message: "注册失败!"+error,
              duration: 1500,
            });
        });
    },
    setIntervalData() {
      this.timer = setInterval(() => {
        this.heartbeatCon();
      }, 3000);
    },
    heartbeatCon() {
      this.$axios
        .get("test/client/heartStatus", {
          params: {
            ...this.inputData,
          },
        })
        .then((res) => {
          console.log(res)
          if (res.data) {
            this.ledColor = true;
            this.disabled = true;
          } else {
            this.ledColor = false;
            this.disabled = false;
          }
        })
        .catch((error) => {
          console.log(error);
          this.ledColor = false;
          this.disabled = false;
        });
    },
  },
};
</script>

<style lang="less" scoped>
.el-breadcrumb {
  padding-bottom: 15px;
  border-bottom: 1px solid rgb(20, 45, 87);
}
.el-form {
  padding-top: 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .el-form-item {
    width: 40%;
    margin-right: 20px;
  }
}
.cardCla {
  padding: 10px;
  margin: 50px auto;
  height: 60px;
  border-radius: 10px;
  padding-bottom: 50px;
}
.closeIcon {
  position: relative;
  top: -30px;
  right: -10px;
  float: right;
}
</style>