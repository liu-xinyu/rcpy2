<template name="component-name">
  <div>
    <fieldset style="border:1px solid #e2e2e2;padding:20px 5px">
      <legend style="font-size:20px">文件预览</legend>
      <el-table :data="departmentList" border style="width: 100%">
        <el-table-column prop="fileName" label="文件名称"></el-table-column>
        <el-table-column prop="filePath" label="路径"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="previewFile(scope.row.filePath)">预览</el-button>
            <el-button type="danger" @click="delFile(scope.row.filePath)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </fieldset>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 表格数据
      departmentList: []
    }
  },
  methods: {
    getDepartmentList() {
      this.axios.get("/rcpy/fileServlet?operation=getYxPdfFiles").then(
        res => {
          console.log(res)
          if (res.status !== 200) return alert("获取信息失败")
          this.departmentList = res.data.list
        },
        err => {
          alert("失败" + err)
        }
      )
    },
    // 删除文件
    delFile(filePath) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return this.axios.post(
            "/rcpy/fileServlet?operation=delFile",
            this.$qs.stringify({
              filePath: filePath
            })
          )
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          })
        })

        .then(res => {
          console.log(res)
          if (res.data !== 1) return this.$message.error("删除失败")
          this.$message.success("删除成功")
          this.getDepartmentList()
        })
    },
    previewFile(filePath) {
      window.open(
        "/rcpy/fileServlet?operation=viewPdf&filePath=" +
          encodeURI(encodeURI(filePath))
      )
    }
  },
  created() {
    this.getDepartmentList()
  }
}
</script>

<style>
</style>