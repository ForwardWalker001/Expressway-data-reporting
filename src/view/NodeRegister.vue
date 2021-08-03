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
          <el-button @click="register">注册</el-button>
        </el-form-item>
        <el-form-item>
          <div v-if="showCard" >
            <el-tag type="success" v-if="ledColor">连接成功</el-tag>
            <el-tag type="danger" v-else>连接失败</el-tag>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showCard: false,
      text: "",
      ledColor: false,
      inputData: JSON.parse(localStorage.getItem('inputData')) || {
        ip: "",
        platformname: "",
        username: "",
        password: "",
      },
    };
  },
  mounted(){
    // console.log({...this.inputData})
  },
  beforeDestroy(){
    clearInterval(this.timer)
  },
  methods: {
    preservat() {
      localStorage.setItem('inputData', JSON.stringify(this.inputData))
      this.$axios.get('http://10.11.36.175:8888/Client/saveInfo',{
        params: {
          ...this.inputData
        }
      }).then((res)=>{
        console.log(res.data)
        if(res.data.success){
          // this.ledColor = true
          this.$message({
            type: "success",
            message: "保存成功!",
            duration: 1500,
          });
        }else{
          this.$message({
            type: "error",
            message: "保存失败!",
            duration: 1500,
          });
        }
      }).catch((error)=>{
        this.$message({
            type: "error",
            message: "保存失败!"+error,
            duration: 1500,
          });
      })
    },
    connectTest() {
      this.$axios
        .get(
          `http://10.11.36.175:8888/test/client/isConnected/${this.inputData.ip}`
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
            message: "联通失败!"+error,
            duration: 3000,
          });
        });
    },
    register(){
      this.showCard = true
      // this.heartbeatCon()
      // this.setIntervalData()
      console.log(this.inputData)
      this.$axios.post('http://10.11.36.175:8888/Client/register',{
          ...this.inputData
          // ip: this.inputData.ip,
          // platformname: this.inputData.platformname,
          // username: this.inputData.username,
          // password: this.inputData.password
      }).then((res)=>{
        console.log(res.data)
        if(res.data.data.isConnected){
          // this.ledColor = true
          this.$message({
            type: "success",
            message: "注册成功!",
            duration: 1500,
          });
        }else{
          this.$message({
            type: "error",
            message: "注册失败!",
            duration: 1500,
          });
        }
      }).catch((error)=>{
        console.log(error)
      })
    },
    setIntervalData() {
      let i = 0
      this.timer = setInterval(() => {
        this.heartbeatCon()
        console.log(++i)
      }, 3000);
    },
    heartbeatCon(){
      this.$axios.get('http://10.11.44.74:8080/api/v1/heart')
      .then((res)=>{
        console.log(res.data)
        if(res.data.data.isConnected){
          this.ledColor = true
        }else{
          this.ledColor = false
        }
      }).catch((error)=>{
        console.log(error)
      })
    },
    closeCard(booolens) {
      this.showCard = booolens;
      // clearInterval(this.timer)
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