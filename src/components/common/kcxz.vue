<template>
  <div>
    <!-- 面包屑 scope.row.id-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>课程性质</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加院系按钮 -->
    <div class="card">
      <el-button type="primary" @click="addCourse()">
        <i class="iconfont icon-add"></i> 添加院系信息
      </el-button>
    </div>
    <!-- 表格 -->
    <fieldset style="border:1px solid #e2e2e2;padding:10px 15px">
      <legend>课程性质</legend>
      <el-table
        :data="courseList"
        border
        style="width: 100%"
        :header-cell-style="{background:'#f5f7fa',color:'#000'}"
      >
        <el-table-column prop="number" label="编号"></el-table-column>
        <el-table-column prop="name" label="课程性质名称"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="success" @click="editCouser(scope.row.id)">修改</el-button>
            <el-button size="small" type="danger" @click="delCourse(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </fieldset>
    <!-- 修改信息 对话框  -->
    <el-dialog title="修改课程性质信息" :visible.sync="dialogCourseVisible" width="30%">
      <el-form>
        <el-form-item label="课程性质名称" label-width="100px">
          <el-input autocomplete="off" v-model="editCourseInfo"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogCourseVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateKcxz()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分页 -->
    <pagination :page="page" @func="show"></pagination>
    <!-- 添加课程性质 对话框 -->
    <el-dialog title="添加课程性质" :visible.sync="addDialogVisible" width="30%">
      <el-form>
        <el-form-item label="课程性质名称" label-width="100px">
          <el-input autocomplete="off" v-model="addCourseName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveCourse()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import pagination from "./pagination"
export default {
  data() {
    return {
      // 发送给服务器的参数，第几页 几条数据

      courseParams: {
        pageIndex: 1,
        pageSize: 5
      },
      //   分页 页数
      page: {
        pageCount: null, //   第几页
        pageValue: null,
        pageSize: 5
      },
      // 表格数据展示
      courseList: [],
      //   删除对话框是否显示
      dialogCourseVisible: false,
      //   添加对话框是否显示
      addDialogVisible: false,
      addCourseName: "",
      // 修改课程信息
      editCourseInfo: null,
      // 修改课程信息 所对应的id
      updateKcxzId: null
    }
  },
  components: {
    //   分页组件
    pagination
  },
  methods: {
    // 获取表格数据
    getCkxzList() {
      this.axios
        .post(
          "rcpy/kcxzServlet?operation=ListKcxz",
          this.$qs.stringify(this.courseParams)//发送参数 第几页信息 返回的信息条数
        )
        .then(res => {
          console.log(res)
          this.courseList = res.data.list
          this.page.pageCount = res.data.count
          this.page.pageValue=res.data.count>5?false:true
        })
    },
    // 子组件 分页
    show(msg) {
      this.courseParams.pageIndex = msg
      this.getCkxzList()
    },
    // 修改按钮 获取所对应id的课程性质名称 两次请求（1.发送当前的用户id 2.返回当前用户的信息（课程性质信息））
    editCouser(id) {
      this.updateKcxzId = id
      this.dialogCourseVisible = true
      this.axios
        .post(
          "rcpy/kcxzServlet?operation=saveKcxzId",
          this.$qs.stringify({
            id: id
          })
        )
        .then(res => {
          console.log(res)
          if (res.status !== 200)
            return this.$message.error("无法获取当前用户信息id")
          return this.axios.post("rcpy/kcxzServlet?operation=findKcxzById")
        })
        .then(res => {
          if(res.status!==200) return this.$message.error("无法获取当前用户的课程性质名称")
          this.editCourseInfo = res.data.name
        })
    },
    // 修改按钮中的 保存           两个参数 一个id 一个修改的名字
    updateKcxz() {
      // KcxzServlet?operation=updateKcxz
      this.dialogCourseVisible = false
      this.axios
        .post(
          "rcpy/kcxzServlet?operation=updateKcxz",
          this.$qs.stringify({
            id: this.updateKcxzId,
            name: this.editCourseInfo
          })
        )
        .then(res => {
          if(res.data!==1) return this.$message.error("更新失败")
          this.$message.success("修改更新成功")
          this.getCkxzList()
        })
    },
    // 删除按钮
    delCourse(id){
      // KcxzServlet?operation=delKcxz
      console.log(id)
      this.axios.post("rcpy/kcxzServlet?operation=delKcxz",this.$qs.stringify({
        id:id
      })).then(res=>{
        console.log(res)
        if(res.data!==1) return this.$message.error("删除失败")
        this.$message.success("删除成功")
        this.getCkxzList()
      })
    },
    // 添加按钮
    addCourse() {
      this.addDialogVisible = true
    },
    // 添加按钮中的保存按钮
    saveCourse() {
      this.addDialogVisible = false
      this.axios
        .post(
          "rcpy/kcxzServlet?operation=addKcxz",
          this.$qs.stringify({
            name: this.addCourseName
          })
        )
        .then(data => {
          console.log(data)
          if(data.data!==1) return this.$message.error("添加失败，请重试")
          // 返回的data为1
          this.$message.success("添加成功")
          this.getCkxzList()
        })
    }
  },
  created() {
    this.getCkxzList()
  }
}
</script>

<style scoped>
fieldset {
  font-size: 20px;
}
/* 表格颜色 */
.el-table,
.hidden-columns {
  color: black;
}
td {
  text-align: left;
}
/* 导航 */
.el-breadcrumb {
  font-size: 16px;
  margin-bottom: 10px;
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