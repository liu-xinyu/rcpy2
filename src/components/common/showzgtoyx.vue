<template>
  <div>
    
    <fieldset style="border:1px solid #e2e2e2;padding:10px 15px">
      <legend>职业资格列表</legend>
      <el-table :data="jobList" border style="width: 100%" :header-cell-style="{background:'#f5f7fa',color:'#000'}">
        <el-table-column prop="number" label="编号" width="40px"></el-table-column>
        <el-table-column prop="zwmc" label="专业名称"></el-table-column>
        <el-table-column prop="fzdw" label="资格证名称"></el-table-column>
        <el-table-column prop="grade" label="等级"></el-table-column>
        <el-table-column prop="fzdw" label="发证单位"></el-table-column>
        <el-table-column prop="hgbz" label="合格标准"></el-table-column>
        <el-table-column prop="bz1" label="备注1"></el-table-column>
        <el-table-column prop="bz2" label="备注2"></el-table-column>
        <el-table-column prop="bz3" label="备注3"></el-table-column>
        <el-table-column prop="bz4" label="备注3"></el-table-column>
      </el-table>
    </fieldset>
    <pagination :page="page" @func="show"></pagination>
  </div>
</template>
<script>
import pagination from "./pagination"

export default {
  data() {
    return {
      // 参数信息 第几页信息 几条信息
      listMajorParams: {
        pageIndex: 1,
        pageSize: 10
      },
      jobList: [],
       //   分页 页数
      page: {
        pageCount: null, //   第几页
        pageValue: null,
        pageSize: 10
      }
    }
  },
  components: {
    //   分页组件
    pagination
  },
  methods: {
    getList() {
      this.axios
        .post(
          "/rcpy/zhiYeZiGeServlet?operation=ListZhiYeZiGeMessageToYx",
          this.$qs.stringify(this.listMajorParams)
        )
        .then(res => {
          console.log(res)
          this.page.pageCount=res.data.count
          this.page.pageValue=res.data.count>10?false:true
          this.jobList = res.data.list
        })
    },
     show(msg) {
      this.listMajorParams.pageIndex = msg
      this.getList()
    }
  },
  created() {
    this.getList()
  }
}
</script>

<style scoped>
fieldset {
  font-size: 20px;
}
.el-table,
.hidden-columns {
  color: black;
}
.el-icon-upload{
    font-size: 16px;
}
</style>