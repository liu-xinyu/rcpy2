<template name="component-name">
  <div>
    <!-- 面包屑 scope.row.id-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>专业用户管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 添加用户 -->
    <div class="card">
      <el-button type="primary" size="small" @click="addDepartmentBtn()">
        <i class="iconfont icon-add"></i> 添加院系信息
      </el-button>
    </div>

    <!-- 表格 -->
    <fieldset style="border:1px solid #e2e2e2;padding:20px">
      <legend style="font-size:20px">人才培养方案计划安排表</legend>
      <el-table :data="departmentList" border style="width: 100%">
        <el-table-column prop="number" label="编号" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="delDepartmentUser(scope.row.did)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </fieldset>
    <!-- 分页 -->
    <pagination :page="page" @func="show"></pagination>
    <!-- 添加的对话框 -->
    <el-dialog title="添加院系" :visible.sync="addDepartmentDialogVisible">
      <el-form ref="addNameRef" :model="addForm" :rules="addNameRules">
        <el-form-item label="院系名称" label-width="100px" prop="addDepartmentName">
          <el-input ref="addName" v-model="addForm.addDepartmentName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDepartmentDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDepartmentSaveBtn()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import pagination from "./pagination"
export default {
  data() {
    return {
      // 用于渲染表格的数据存储
      departmentList: [],
      //   参数 用于请求数据
      params: {
        pageIndex: 1,
        pageSize: 10
      },
      //  分页 页数
      page: {
        pageCount: null, //   第几页
        pageValue: null,
        pageSize:10
      },
      addDepartmentDialogVisible: false,
      addForm: {
        addDepartmentName: null
      },

      addNameRules: {
        addDepartmentName: [
          { required: true, message: "请输入院系名称", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ]
      }
    }
  },
  components: {
    //   分页组件
    pagination
  },
  methods: {
    //   获得表格所需要的数据
    getDepartmentList() {
      this.axios
        .post(
          "rcpy/collegeListServlet?operation=selectAlldepartment",
          this.$qs.stringify({
            pageIndex: this.params.pageIndex, //页数
            pageSize: this.params.pageSize //信息条数
          })
        )
        .then(res => {
          this.page.pageCount = res.data.count //页数
          this.departmentList = res.data.list //信息渲染展示
        })
    },
    // 从子组件中获得当前点击的页数，
    show(msg) {
      this.params.pageIndex = msg
      this.getDepartmentList()
    },
    // 删除按钮
    delDepartmentUser(did) {
      console.log(did)
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(data => {
          this.$message({
            type: "success",
            message: "删除成功!"
          })
          return this.axios.post(
            "rcpy/collegeListServlet?operation=deldepartment",
            this.$qs.stringify({
              id: did
            })
          )
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          })
        })
        .then(data => {
          this.getDepartmentList()
        })
    },
    // 添加院系信息按钮 使得对话框出现
    addDepartmentBtn() {
      this.addDepartmentDialogVisible = true
    },
    // 添加按钮中的保存按钮
    addDepartmentSaveBtn() {
      this.$refs.addNameRef.validate(async valid => {
        //当都填入数据 valid为true
        if (!valid) return //如果没有填入则不再执行以下代码
        //以下代码是发请求。。。
        this.axios
          .post(
            "rcpy/collegeListServlet?operation=addDepartment",
            this.$qs.stringify({
              name: this.addForm.addDepartmentName
            })
          )
          .then(res => {
            // 添加成功后重新刷新页面
            this.getDepartmentList()
            this.addDepartmentDialogVisible = false //把对话框关闭
            return res.data
          })
          .then(res2 => {
            if (res2 === 1) {
              this.$message.success("添加成功")
            } else {
              this.$message.error("添加失败")
            }
          })
      })
    }
  },
  created() {
    this.getDepartmentList()
  }
}
</script>

<style scoped>
.el-breadcrumb {
  font-size: 16px;
  margin-bottom: 10px;
}
.el-table,
.hidden-columns {
  color: black;
}
td {
  text-align: left;
}
.iconfont {
  margin-right: 2px;
  font-size: 12px;
}
.card {
  padding: 13px;
  background-color: rgba(122, 122, 122, 0.133);
  width: 97%;
  border-left: 5px green solid;
}
</style>