<template>
    <el-card>
        <el-breadcrumb separator-class="el-icon-arrow-right" >
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>威胁情报信息</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button
            type="success"
            size="mini"
            style="float:right;margin:0 0 20px"
            @click="addUnitInfoDialogVisible = true"
            >新增</el-button>
    <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column align='center'
      fixed
      prop="probeId"
      label="ip 所属机构"
      width="120">
    </el-table-column>
    <el-table-column align='center'
      prop="ipDstPort"
      label="目的ip 端口"
      width="120">
    </el-table-column>
    <el-table-column align='center'
      prop="threatNum"
      label="具体威胁的次数"
      width="120">
    </el-table-column>
    <el-table-column align='center'
      prop="enrichmentsIpSrcAddrAssetName"
      label="目的ip 的资产名称"
      width="120">
      </el-table-column><el-table-column align='center'
      prop="enrichmentsIpSrcAddrSsetType"
      label="源ip 的资产类型"
      width="120">
    </el-table-column>
    <el-table-column align='center'
      prop="enrichmentsThreatNameLevel"
      label="威胁名称所属的威胁等级"
      width="120">
    </el-table-column>
    <!-- <el-table-column align='center'
      prop="enrichmensIpDstAddrAssetName"
      label="enrichmensIpDstAddrAssetName"
      width="120"> -->
    <!-- </el-table-column> -->
    <el-table-column align='center'
      prop="enrichmentsThreatTypeLevel"
      label="所属威胁等级"
      width="120">
    </el-table-column>
    <el-table-column align='center'
      prop="classification"
      label="攻击名称id"
      width="120">
    </el-table-column>
    <el-table-column
      prop="sid" align='center'
      label="所属特征id "
      width="120">
    </el-table-column>
    <el-table-column align='center'
      prop="sourceType"
      label="标记日志类型"
      width="120">
    </el-table-column>
    <el-table-column align='center'
      prop="enrichmentsThreatStatus"
      label="具体威胁状态"
      width="120">
    </el-table-column>
    <el-table-column align='center'
      prop="ipDstAddr"
      label="目的ip地址"
      width="120">
    </el-table-column>
    <el-table-column align='center'
      prop="enrichmentsThreatName"
      label="具体威胁名称"
      width="120">
    </el-table-column>
    <el-table-column align='center'
      prop="enrichmentsDirection"
      label="所属威胁方向"
      width="120">
    </el-table-column>
    <el-table-column align='center'
      prop="enrichmentsGeoIpSrcAddrCountryCn"
      label="源ip所属国家名称"
      width="120">
    </el-table-column>
    <el-table-column
      prop="subIp" align='center'
      label="数据上报来源ip"
      width="120">
    </el-table-column>
    <el-table-column align='center'
      prop="enrichmentsIpDstAddrAssetType"
      label="目的 ip的资产类型"
      width="120">
    </el-table-column>
    <el-table-column align='center'
      prop="ipSrcAddr"
      label="威胁源ip"
      width="120">
    </el-table-column>
    <el-table-column align='center'
      prop="enrichmentsGeoIpDstAddrCountryCn"
      label="目的ip所属国家名称"
      width="120">
    </el-table-column>
    <el-table-column align='center'
      prop="enrichmentsThreatTypeAlias"
      label="威胁的具体类型"
      width="120">
    </el-table-column>
    <el-table-column align='center'
      prop="timestamp"
      label="时间"
      width="120">
    </el-table-column>
    <el-table-column align='center'
      fixed="right"
      prop="status"
      label="发布状态"
      width="120">
      <template slot-scope="scope">
        <span v-if="scope.row.staus==1">已发布</span>
        <span v-else>未发布</span>
      </template>
    </el-table-column>
    <el-table-column align='center'
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="medium" v-if="scope.row.staus==0">上传</el-button>
        <el-button type="text" size="medium" @click="remove(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- hide-on-single-page -->
     <div class="paginationContainer">
        <el-pagination
          :current-page="pageInst.currentPage"
          :page-size="pageInst.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="this.AllDatas.length"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    <el-dialog
      title="威胁情报上传"
      :visible.sync="addUnitInfoDialogVisible"
      width="40%"
    >
      <el-form status-icon label-width="100px">
        <el-form-item label="选择文件上传">
          <input type="file"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitUnitInfoForm">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-card>
</template>

<script>
  export default {
    data() {
      return {
        addUnitInfoDialogVisible: false,
        pageInst: {
          "currentPage": 1,
          "pageSizes" : [10, 20, 30, 40],
          "pageSize" : 5
        },
        AllDatas: [],
        tableData: [],
      }
    },
    mounted(){
        this.AllDatas = []
        // this.$axios.get('http://10.11.44.74:8080/test/threatintelligence/selectAllInformation')
        // .then((res) => {
        //     // console.log(res.data.data.InformationList[8])
        //     this.AllDatas = res.data.data.InformationList
        // })
        // .catch((error)=> {
        //   console.log(error);
        // })
        // .then(()=>{
        //   console.log(this.AllDatas)
        //   this.tableData = this.AllDatas.slice(0,this.pageInst.pageSize)
        // })
        this.$axios.get('http://yapi.smart-xwork.cn/mock/81866/test/threatintelligence/selectAllInformation')
        .then((res)=>{
          console.log(res)
          this.AllDatas = res.data.InformationList
        }).catch((error)=> {
          console.log(error);
        }).then(()=>{
          this.tableData = this.AllDatas.slice(0,this.pageInst.pageSize)
        })
        // console.log(this.AllDatas)
    },
    methods: {
      handleClick(row) {
        console.log(row);
        // location.reload()
      },
      remove(row){
        // console.log(row.id);
        this.$confirm('是否删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        //请求内容。。。
        this.$axios.post("http://yapi.smart-xwork.cn/mock/81866/test/threatintelligence/deleteInfromation",{
          id: row.id
        })
        .then((res)=>{
          // console.log(res.data.data.res)
          const status = res.data.data.res
          console.log(res.data.data.removeid)
          if(status == 1){
            this.$message({
              type: 'success',
              message: '删除成功!',
              duration: 1500
            })
            this.$router.go(0)
          }else{
            this.$message({
              type: 'error',
              message: '删除失败!',
              duration: 1500
            })
          }
        }).catch((error)=>{
          console.log(error)
          this.$message({
              type: 'error',
              message: '删除失败!'+error,
              duration: 1500
            })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
          duration: 1500
        });          
      });
      },
      handleCurrentChange(page){
        console.log(page)
        this.tableData = this.AllDatas.slice(this.pageInst.pageSize*(page-1),this.pageInst.pageSize*page)
      },
      submitUnitInfoForm(){
        this.addUnitInfoDialogVisible = !this.addUnitInfoDialogVisible
      },
    },

  }
</script>
<style lang="less" scoped>
.paginationContainer {
    float: right;
    padding-top: 15px;
}
</style>