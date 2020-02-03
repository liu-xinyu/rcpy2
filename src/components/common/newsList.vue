<template name="component-name">
  <div>
    <fieldset style="border:1px #e2e2e2 solid">
      <legend>文章列表</legend>
      <el-table :data="newsList" border style="width: 100%">
        <el-table-column prop="dname" label="院系" width="180"></el-table-column>
        <el-table-column prop="zwmc" label="专业名称" width="190"></el-table-column>
        <el-table-column prop="uid" label="操作">
          <template>
            <el-button type="primary" size="small">审核</el-button>
            <el-button type="primary" size="small">查看首页</el-button>
            <el-button type="primary" size="small">查看计划安排表</el-button>
            <el-button type="primary" size="small">下载专业计划安排表</el-button>
            <el-button type="primary" size="small">下载学分学时汇总表</el-button>
            <el-button type="primary" size="small">下载专业培养方案</el-button>
          </template>
        </el-table-column>
      </el-table>
    </fieldset>
    <!-- 分页 -->
    <el-pagination background :hide-on-single-page="paginationValue" :total="count" layout="prev, pager, next"></el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      newsList: [],
    //   控制分页的显示
      count: 23,//信息的条数
      paginationValue:true,//是否显示分页条
      paginationCount:null//分页数字 
    }
  },
  methods: {
    getNewsList() {
      console.log("11");
      this.axios
        .post(
          "rcpy/myController?operation=showtoadmin",
          this.$qs.stringify({
            pageIndex: 1,
            pageSize: 10
          })
        )
        .then(data => {
          console.log(data)
          this.newsList = data.data.list
          //this.count = data.data.count
          console.log(this.count)
        });
        this.paginationCount=parseInt(this.count/10)
        console.log(parseInt(this.count/10),this.paginationCount+'分页数字')
        this.count>10?this.paginationValue=false:this.paginationValue=true;
    }
  },
  created() {
    this.getNewsList()
  }
}
</script>

<style>
td,
th {
  color: black;
}
.el-button--small {
  padding: 5px;
}
</style>