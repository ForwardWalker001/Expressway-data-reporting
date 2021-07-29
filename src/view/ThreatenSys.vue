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
      label="probeId"
      width="120">
    </el-table-column>
    <el-table-column align='center'
      prop="ipDstPort"
      label="ipDstPort"
      width="120">
    </el-table-column>
    <el-table-column align='center'
      prop="threatNum"
      label="threatNum"
      width="120">
    </el-table-column>
    <el-table-column align='center'
      prop="enrichmentsIpSrcAddrAssetName"
      label="enrichmentsIpSrcAddrAssetName"
      width="120">
    </el-table-column>
    <el-table-column align='center'
      prop="enrichmentsThreatNameLevel"
      label="enrichmentsThreatNameLevel"
      width="120">
    </el-table-column>
    <el-table-column align='center'
      prop="enrichmensIpDstAddrAssetName"
      label="enrichmensIpDstAddrAssetName"
      width="120">
    </el-table-column>
    <el-table-column align='center'
      prop="enrichmentsThreatTypeLevel"
      label="enrichmentsThreatTypeLevel"
      width="120">
    </el-table-column>
    <el-table-column align='center'
      prop="classification"
      label="classification"
      width="120">
    </el-table-column>
    <el-table-column
      prop="sid" align='center'
      label="sid"
      width="120">
    </el-table-column>
    <el-table-column align='center'
      prop="sourceType"
      label="sourceType"
      width="120">
    </el-table-column>
    <el-table-column align='center'
      prop="enrichmentsThreatStatus"
      label="enrichmentsThreatStatus"
      width="120">
    </el-table-column>
    <el-table-column align='center'
      prop="ipDstAddr"
      label="ipDstAddr"
      width="120">
    </el-table-column>
    <el-table-column align='center'
      prop="enrichmentsThreatName"
      label="enrichmentsThreatName"
      width="120">
    </el-table-column>
    <el-table-column align='center'
      prop="enrichmentsDirection"
      label="enrichmentsDirection"
      width="120">
    </el-table-column>
    <el-table-column align='center'
      prop="enrichmentsGeoIpSrcAddrCountryCn"
      label="enrichmentsGeoIpSrcAddrCountryCn"
      width="120">
    </el-table-column>
    <el-table-column
      prop="subIp" align='center'
      label="subIp"
      width="120">
    </el-table-column>
    <el-table-column align='center'
      prop="enrichmentsIpDstAddrAssetType"
      label="enrichmentsIpDstAddrAssetType"
      width="120">
    </el-table-column>
    <el-table-column align='center'
      prop="ipSrcAddr"
      label="ipSrcAddr"
      width="120">
    </el-table-column>
    <el-table-column align='center'
      prop="enrichmentsGeoIpDstAddrCountryCn"
      label="enrichmentsGeoIpDstAddrCountryCn"
      width="120">
    </el-table-column>
    <el-table-column align='center'
      prop="enrichmentsThreatTypeAlias"
      label="enrichmentsThreatTypeAlias"
      width="120">
    </el-table-column>
    <el-table-column align='center'
      prop="timestamp"
      label="timestamp"
      width="120">
    </el-table-column>
    <el-table-column align='center'
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">上传</el-button>
        <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
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
          "pageSize" : 10
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
        this.tableData = this.AllDatas.slice(0,this.pageInst.pageSize)
    },
    methods: {
      handleClick(row) {
        console.log(row);
        // location.reload()
      },
      remove(row){
        console.log(row);
        this.$confirm('是否删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        //请求内容。。。
        // ...
        this.$message({
          type: 'success',
          message: '删除成功!',
          duration: 1500
        });
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