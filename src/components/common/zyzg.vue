<template name="component-name">
  <div>
    <div class="card">
      <el-button type="primary" @click="addInfo()">
        <i class="iconfont icon-add"></i> 添加职业资格信息
      </el-button>
    </div>
    <fieldset style="border:1px #e2e2e2 solid;padding:20px 10px">
      <legend style="font-size:20px">职业资格填报</legend>
      <el-table :data="majorData" border style="width: 100%">
        <el-table-column prop="number" label="编号" width="50"></el-table-column>
        <el-table-column prop="zgzmc" label="资格证名称"></el-table-column>
        <el-table-column prop="grade" label="等级"></el-table-column>
        <el-table-column prop="fzdw" label="发证单位"></el-table-column>
        <el-table-column prop="hgbz" label="合格标准"></el-table-column>
        <el-table-column prop="bz1" label="备注1"></el-table-column>
        <el-table-column prop="bz2" label="备注2"></el-table-column>
        <el-table-column prop="bz3" label="备注3"></el-table-column>
        <el-table-column prop="bz4" label="备注4"></el-table-column>
        <el-table-column label="操作" width="170">
          <template slot-scope="scope">
            <el-button type="success" size="small" @click="update(scope.row.id)">修改</el-button>
            <el-button type="danger" size="small" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </fieldset>
    <!-- 添加的对话框 -->
    <el-dialog
      title="添加职业资格信息"
      :visible.sync="addDialogVisible"
      width="40%"
      @close="addFormClosed()"
    >
      <el-form :model="addFormDate" ref="addForm" :rules="addFormRules">
        <el-form-item label="资格证名称" label-width="100px" prop="zgzmc">
          <el-input v-model="addFormDate.zgzmc"></el-input>
        </el-form-item>
        <el-form-item label="等级" label-width="90px" prop="grade">
          <el-input v-model="addFormDate.grade"></el-input>
        </el-form-item>
        <el-form-item label="发证单位" label-width="90px" prop="fzdw">
          <el-input v-model="addFormDate.fzdw"></el-input>
        </el-form-item>
        <el-form-item label="合格标椎" label-width="90px" prop="hgbz">
          <el-input v-model="addFormDate.hgbz"></el-input>
        </el-form-item>
        <el-form-item label="备注1" label-width="90px">
          <el-input v-model="addFormDate.bz1"></el-input>
        </el-form-item>
        <el-form-item label="备注1" label-width="90px">
          <el-input v-model="addFormDate.bz2"></el-input>
        </el-form-item>
        <el-form-item label="备注1" label-width="90px">
          <el-input v-model="addFormDate.bz3"></el-input>
        </el-form-item>
        <el-form-item label="备注1" label-width="90px">
          <el-input v-model="addFormDate.bz4"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveAddForm()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改的对话框 -->
    <el-dialog title="修改" :visible.sync="updateDialogVisible" width="40%">
      <el-form :model="updateForm" ref="updateRef" :rules="addFormRules">
        <el-form-item label="资格证名称" label-width="100px" prop="zgzmc">
          <el-input v-model="updateForm.zgzmc"></el-input>
        </el-form-item>
        <el-form-item label="等级" label-width="90px" prop="grade">
          <el-input v-model="updateForm.grade"></el-input>
        </el-form-item>
        <el-form-item label="发证单位" label-width="90px" prop="fzdw">
          <el-input v-model="updateForm.fzdw"></el-input>
        </el-form-item>
        <el-form-item label="合格标椎" label-width="90px" prop="hgbz">
          <el-input v-model="updateForm.hgbz"></el-input>
        </el-form-item>
        <el-form-item label="备注1" label-width="90px">
          <el-input v-model="updateForm.bz1"></el-input>
        </el-form-item>
        <el-form-item label="备注1" label-width="90px">
          <el-input v-model="updateForm.bz2"></el-input>
        </el-form-item>
        <el-form-item label="备注1" label-width="90px">
          <el-input v-model="updateForm.bz3"></el-input>
        </el-form-item>
        <el-form-item label="备注1" label-width="90px">
          <el-input v-model="updateForm.bz4"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveUpdate()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分页 -->
    <!-- 子组件分页  子组件传父组件 @func="show"-->
    <!-- 父组件plan.vue 传递信息给子组件 :page="page" -->
    <pagination :page="page" @func="show"></pagination>
  </div>
</template>
<script>
import pagination from "./pagination"

export default {
  data() {
    return {
      majorData: [], //表格中所需要的信息
      // 分页
      page: {
        pageCount: null, //   第几页 用来分页页数的绑定
        pageValue: null, //修改的对话框 false对话框隐藏
        pageSize: 10
      },
      // 列表获取的传参
      fillInParams: {
        pageIndex: 1,
        pageSize: 10
      },
      //   添加对话框的显示隐藏
      addDialogVisible: false,
      //   添加对话框中的数据 传给后台的
      addFormDate: {
        zgzmc: null,
        grade: null,
        fzdw: null,
        hgbz: null,
        bz1: null,
        bz2: null,
        bz3: null,
        bz4: null
      },
      //   添加对话框的校验
      addFormRules: {
        zgzmc: [{ required: true, message: "请输入中文名称", trigger: "blur" }],
        grade: [{ required: true, message: "请输入中文名称", trigger: "blur" }],
        fzdw: [{ required: true, message: "请输入中文名称", trigger: "blur" }],
        hgbz: [{ required: true, message: "请输入中文名称", trigger: "blur" }]
      },
      //   修改对话框中的数据
      updateForm: {},
      //   修改对话框的显示隐藏
      updateDialogVisible: false,
      curPage:null
    }
  },
  // 引用分页子组件
  components: {
    pagination
  },
  methods: {
    //   获取列表信息
    fillInList() {
      this.axios
        .get("/rcpy/zhiYeZiGeServlet?operation=ListZhiYeZiGeMessageToZy", {
          params: this.fillInParams
        })
        .then(res => {
          console.log(res)

          if (res.status !== 200) return alert("获取列表失败")
          this.page.pageCount = res.data.count
          this.page.pageValue = res.data.count > 10 ? false : true
          this.majorData = res.data.list
        })
    },
    // 子组件 分页
    show(msg) {
      this.curPage=msg
      this.fillInParams.pageIndex = msg
      this.fillInList()
    },
    // 添加对话框中的显示
    addInfo() {
      this.addDialogVisible = true
    },
    // 添加对话框中的保存
    saveAddForm() {
      this.$refs.addForm.validate(valid => {
        console.log(valid)
        if (!valid) return this.$message.error("请填入信息 o(*￣︶￣*)o")
        this.axios
          .post(
            "/rcpy/zhiYeZiGeServlet?operation=addZhiYeZiGeMessage",
            this.$qs.stringify(this.addFormDate)
          )
          .then(
            res => {
              if (res.data !== 1) return this.$message.error("添加失败")
              this.$message.success("添加成功")
              this.fillInList()
            },
            err => {
              console.log(err)
            }
          )
        this.addDialogVisible = false
      })
      //
    },
    // 添加对话框关闭后，将表单中的信息归空
    addFormClosed() {
      this.$refs.addForm.resetFields()
    },
    // 表格中的删除按钮
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return this.axios.post(
            "/rcpy/zhiYeZiGeServlet?operation=delZhiYeZiGeMessageById",
            this.$qs.stringify({
              id: id
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
          const totalPage=Math.ceil((this.page.pageCount - 1) / this.page.pageSize)
          this.curPage= this.curPage > totalPage ? totalPage : this.curPage
          this.fillInParams.pageIndex = this.curPage
          this.fillInList()
        })
    },
    // 表格中的修改按钮
    update(id) {
      this.updateDialogVisible = true
      this.axios
        .post(
          "/rcpy/zhiYeZiGeServlet?operation=saveZhiYeZiGeMessageId",
          this.$qs.stringify({
            id: id
          })
        )
        .then(
          res => {
            if (res.status !== 200) return alert("网络错误 无法修改")
            return this.axios.post(
              "/rcpy/zhiYeZiGeServlet?operation=findZhiYeZiGeMessageById"
            )
          },
          err => {
            alert("错误" + err)
          }
        )
        .then(res => {
          this.updateForm = res.data
        })
    },
    // 修改对话框中的保存
    saveUpdate() {
      this.$refs.updateRef.validate(valid => {
        if (!valid) return this.$message.error("请输入信息")
        this.axios
          .post(
            "/rcpy/zhiYeZiGeServlet?operation=updateZhiYeZiGeMessage",
            this.$qs.stringify({
              id: this.updateForm.id,
              zgzmc: this.updateForm.zgzmc,
              hgbz: this.updateForm.hgbz,
              grade: this.updateForm.grade,
              fzdw: this.updateForm.fzdw,
              bz1: this.updateForm.bz1,
              bz2: this.updateForm.bz2,
              bz3: this.updateForm.bz3,
              bz4: this.updateForm.bz4
            })
          )
          .then(
            res => {
              if (res.data !== 1) return this.$message.error("修改失敗")
              this.$message.success("修改失成功")
              this.updateDialogVisible = false
              this.fillInList()
            },
            err => {
              alert("修改保存錯誤")
            }
          )
      })
    }
  },
  created() {
    this.fillInList()
  }
}
</script>

<style scoped>
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
/* .el-dialog__body {
  height: 40vh;
  overflow: auto;
} */
</style>