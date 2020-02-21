<template name="component-name">
  <div>
    <fieldset style="border:1px solid #e2e2e2">
      <legend>文件</legend>
      <el-table :data="fileTable" border style="width: 100%">
        <el-table-column prop="fileName" label="文件名称"></el-table-column>
        <el-table-column prop="filePath" label="路径"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="previewFile(scope.row.filePath)">预览</el-button>
            <el-button type="primary" @click="delFile(scope.row.filePath)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </fieldset>
    <!-- 删除文件的对话框 -->
    <!-- 分页 -->
    <pagination :page="page" @func="show"></pagination>
  </div>
</template>
<script>
import pagination from "./pagination"

export default {
  data() {
    return {
      // 表格参数
      filesParams: {
        pageIndex: 1,
        pageSize: 15
      },
      //   分页参数
      page: {
        pageCount: null,
        pageValue: null,
        pageSize: 15
      },
      //   表格显示
      fileTable: []
    }
  },
  components: {
    //   分页组件
    pagination
  },
  methods: {
    getFiles() {
      this.axios
        .get("rcpy/fileServlet?operation=getAdminPdfFiles", {
          params: this.filesParams
        })
        .then(res => {
          console.log(res)
          this.fileTable = res.data.list
          this.page.pageCount = res.data.count
          this.page.pageValue = res.data.count > 15 ? false : true
        })
    },
    // 子组件 分页
    show(msg) {
      this.fileParams.pageIndex = msg
      this.getFiles()
    },
    // 删除文件
    delFile(name) {
      //
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(data => {
          console.log(data)
          return this.axios.post(
            "/rcpy/fileServlet?operation=delFile",
            this.$qs.stringify({
              filePath: name
            })
          )
        })
        .catch((res) => {
          console.log(res)
          this.$message({
            type: "info",
            message: "已取消删除"
          })
          throw new Error()
        })
        .then(res => {
          console.log(res)
          if (res.data !== 1) return this.$message.error("删除失败")
          this.$message.success("删除成功")
          this.getFiles()
        })
    },
    // 预览文件
    previewFile(path){
      window.open("rcpy/fileServlet?operation=viewPdf&filePath="+encodeURI(encodeURI(path)))
    }
  },
  created() {
    this.getFiles()
  }
}
</script>

<style>
</style>