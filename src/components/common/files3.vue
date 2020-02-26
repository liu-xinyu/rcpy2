<template name="component-name">
  <div>
    <fieldset style="border:1px solid #e2e2e2;padding:20px 10px">
      <legend style="font-size:20px">文件详情</legend>
      <el-table :data="fileListData" border style="width: 100%">
        <el-table-column prop="fileName" label="日期" width="280"></el-table-column>
        <el-table-column prop="filePath" label="姓名"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="success" size="small" @click="previewFile(scope.row.filePath)">浏览</el-button>
            <el-button type="danger" size="small" @click="delFile(scope.row.filePath)">删除</el-button>
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
      fileListData: []
    }
  },
  created() {
    this.getFileList()
  },
  methods: {
    getFileList() {
      this.axios.get("/rcpy/fileServlet?operation=getZyPdfFiles").then(
        res => {
          this.fileListData = res.data.list
        },
        err => {
          alert(err)
        }
      )
    },
    delFile(filePath) {
      console.log(filePath)
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
          if (res.data !== 1) return this.$message.error("删除失败")
          this.$message.success("删除成功")
          this.getFileList()
        })
    },
    previewFile(filePath) {
      window.open(
        "/rcpy/fileServlet?operation=viewPdf&filePath=" +
          encodeURI(encodeURI(filePath))
      )
    }
  }
}
</script>

<style>
</style>